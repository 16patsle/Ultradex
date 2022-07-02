/* eslint-env node */
import parser from "xml2json";
import fs from "fs-extra";
import path from "path";

import wtf, { Document, Section } from "wtf_wikipedia";
import wtfPluginHtml from "wtf-plugin-html";

wtf.extend(wtfPluginHtml);

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
  html: string;
  title: string;
  index: number;
  depth: number;
  children: {
    [key: string]: ParsedSection;
  };
};

const makeSection = (section: Section, sectionIndex: number | string) => {
  const index =
    typeof sectionIndex === "number" ? sectionIndex : parseInt(sectionIndex);
  return {
    html: section.html({
      title: false,
      sentences: true,
      tables: true,
      lists: true,
    }),
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
