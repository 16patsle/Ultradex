/* eslint-env node */
import parser from "xml2json";
import fs from "fs-extra";
import path from "path";

import wtf, { type Document, type Section } from "wtf_wikipedia";

import type { Mark, LinkMark, FormattingMark } from "./Mark";
import type { JsonSection, JsonSentence } from "./JsonSection";

type BulbapediaExport = {
  mediawiki: {
    page: BulbapediaPage[];
  };
};

type BulbapediaPage = {
  title: string;
  revision: BulbapediaRevision;
};

type BulbapediaRevision = {
  text: {
    $t: string;
  };
};

type ParsedPage = {
  title: string;
  document: Document;
  id?: number;
  text: {
    [key: string]: ParsedSection;
  };
};

type ParsedSection = {
  json: JsonSection;
  title: string;
  index: number;
  depth: number;
  children: {
    [key: string]: ParsedSection;
  };
};

const makeSentenceParts = (sentence: JsonSentence) => {
  const parts: Mark[] = [];
  const formatting: Mark[] = [];
  const links: LinkMark[] = [];

  if (sentence.formatting) {
    Object.entries(sentence.formatting).forEach(([formattingType, text]) => {
      text.forEach((text) => {
        if (text.length > 0) {
          formatting.push({
            type: formattingType as "bold" | "italic",
            text: text,
          });
        }
      });
    });
  }

  if (sentence.links) {
    sentence.links.forEach((link) => {
      const text = link.text ?? link.page;
      if (text?.length > 0) {
        const formattingItem = formatting.find(
          (formatting) => formatting.text === text
        );
        if (formattingItem) {
          const linkItem = formattingItem as LinkMark;
          linkItem.type = `link-${(formattingItem as FormattingMark).type}`;
          linkItem.linktype = link.type;
          linkItem.page = link.page;
        } else {
          links.push({
            type: "link",
            text: text,
            linktype: link.type,
            page: link.page,
          });
        }
      }
    });
  }

  const marks: Mark[] = [];
  let formattingMark: Mark | undefined = undefined;
  let linkMark: Mark | undefined = undefined;
  let count = 0;

  /* eslint-disable-next-line no-constant-condition */
  while (true) {
    if (count >= 100) {
      console.log(
        "END",
        formattingMark,
        linkMark,
        formatting?.length,
        links?.length
      );
      break;
    }
    if (!formattingMark) {
      formattingMark = formatting.shift();
    }
    if (!linkMark) {
      linkMark = links.shift();
    }

    if (formattingMark) {
      const formattingIndex = sentence.text.indexOf(formattingMark.text);

      if (linkMark) {
        const linkIndex = sentence.text.indexOf(linkMark.text);

        if (linkIndex < formattingIndex) {
          marks.push(linkMark);
          linkMark = undefined;
        } else {
          marks.push(formattingMark);
          formattingMark = undefined;
        }
      } else {
        marks.push(formattingMark);
        formattingMark = undefined;
      }
    } else if (linkMark) {
      marks.push(linkMark);
      linkMark = undefined;
    } else {
      break;
    }
    count++;
  }

  let rest = sentence.text;

  marks.forEach((mark) => {
    const split = rest.split(mark.text);
    parts.push({ text: split[0], type: "text" });
    parts.push(mark);
    // Join the rest of the sentence together using the mark text
    // This handles cases where the text occurs multiple times in the sentence
    rest = split.slice(1).join(mark.text);
  });
  parts.push({ text: rest, type: "text" });

  return parts;
};

const makeSectionJSON = (section: Section) => {
  const json = section.json({
    tables: true,
    references: true,
    paragraphs: true,
    templates: true,
    infoboxes: true,
  }) as JsonSection;

  const paragraphs = (json.paragraphs || []).map((paragraph) => {
    const sentences = (paragraph.sentences || []).map((sentence) => {
      const parts = makeSentenceParts(sentence);
      return {
        ...sentence,
        parts,
      };
    });
    return {
      ...paragraph,
      sentences,
    };
  });
  const lists = (json.lists || []).map((list) => {
    return list.map((sentence) => {
      const parts = makeSentenceParts(sentence);
      return {
        ...sentence,
        parts,
      };
    });
  });

  return {
    ...json,
    paragraphs,
    lists,
  };
};

const makeSection = (
  section: Section,
  sectionIndex: number | string
): ParsedSection => {
  const index =
    typeof sectionIndex === "number" ? sectionIndex : parseInt(sectionIndex);
  return {
    json: makeSectionJSON(section),
    index: index,
    title: section.title(),
    depth: section.depth(),
    children: {},
  };
};

const makeSectionKey = (title: string) =>
  title.toLowerCase().replace(new RegExp(" ", "g"), "_");

/**
 * Add sections as children to their parent.
 *
 * Loosely based on https://www.tutorialspoint.com/build-tree-array-from-flat-array-in-javascript
 * @param array - array of sections
 * @returns An object with the sections keyed by their title, and children added to their parents.
 */
const listToTree = (array: Section[]) => {
  const result: { [key: string]: ParsedSection } = {};

  const parsedSectionArray = array.map((section) => {
    const sectionIndex = section.index() || 0;
    return makeSection(section, sectionIndex);
  });

  for (let i = 0; i < array.length; i += 1) {
    const section = array[i];
    const parentIndex = section.parent()?.index();
    const parsedSection = parsedSectionArray[i];
    const sectionTitleKey =
      makeSectionKey(section.title()) || (i === 0 ? "introduction" : String(i));
    if (parentIndex) {
      parsedSectionArray[parentIndex].children[sectionTitleKey] = parsedSection;
    } else {
      result[sectionTitleKey] = parsedSection;
    }
  }
  return result;
};

(async function parseBulbapediaExport() {
  const xml = await fs.readFile(
    path.join(__dirname, "bulbapedia-pokemon-export.xml")
  );

  if (!fs.existsSync(path.join(__dirname, "../public/data"))) {
    await fs.mkdir(path.join(__dirname, "../public/data"));
  }

  const {
    mediawiki: { page },
  } = parser.toJson(xml, {
    object: true,
    coerce: true,
  }) as BulbapediaExport;

  const parsedPages: ParsedPage[] = [];

  //let count = 1;
  const promises: Promise<any>[] = [];

  for (const pageIndex in page) {
    parsedPages[pageIndex] = {
      title: page[pageIndex].title.replace(" (Pokémon)", ""),
      document: wtf(page[pageIndex].revision.text.$t),
      text: {},
    };

    // For debugging
    //if (count > 1) {
    //  break;
    //}
    //count++;

    const currentPage = parsedPages[pageIndex];

    for (const infobox of currentPage.document.infoboxes()) {
      if (infobox.type() === "pokémon infobox") {
        // @ts-expect-error ndex does exist on data
        parsedPages[pageIndex].id = infobox.data.ndex.json().number;
        break;
      }
    }

    currentPage.text = listToTree(currentPage.document.sections());

    const { document, ...completedPage } = currentPage;

    promises.push(
      fs.writeFile(
        path.join(__dirname, "../public/data", `${currentPage.id}.json`),
        JSON.stringify(completedPage)
      )
    );
  }

  await Promise.all(promises);
})().catch((err) => console.log(err));

// Start reading from stdin so we don't exit.
// process.stdin.resume();
