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

const loopSectionChildren = (
  startIndex: number,
  currentPage: ParsedPage,
  level: number,
  parentSection: ParsedSection
) => {
  for (
    let sectionIndexChild = startIndex;
    sectionIndexChild < currentPage.document.sections().length;
    sectionIndexChild++
  ) {
    const section = currentPage.document.sections()[sectionIndexChild];
    const sectionTitleKey =
      makeSectionKey(section.title()) || String(sectionIndexChild);
    if (section.depth() === level) {
      try {
        if (!parentSection.children[sectionTitleKey]) {
          parentSection.children[sectionTitleKey] = makeSection(
            section,
            sectionIndexChild - startIndex
          );
        }
      } catch (err) {
        console.error(
          `Error with section "${section.title()}" (level ${section.depth()}) on page "${currentPage.title.replace(
            " (Pokémon)",
            ""
          )}".`,
          err
        );
      }
    } else if (section.depth() > level) {
      loopSectionChildren(
        sectionIndexChild,
        currentPage,
        level + 1,
        parentSection.children[sectionTitleKey]
      );
    } else {
      break;
    }
  }
};

(async function parseBulbapediaExport() {
  const xml = await fs.readFile(
    path.join(__dirname, "bulbapedia-pokemon-export.xml")
  );

  if (!fs.existsSync(path.join(__dirname, "../public/data"))) {
    fs.mkdirSync(path.join(__dirname, "../public/data"));
  }

  const {
    mediawiki: { page },
  } = parser.toJson(xml, {
    object: true,
    coerce: true,
  }) as BulbapediaExport;

  const parsedPages: ParsedPage[] = [];

  for (const pageIndex in page) {
    parsedPages[pageIndex] = {
      title: page[pageIndex].title.replace(" (Pokémon)", ""),
      document: wtf(page[pageIndex].revision.text.$t),
      text: {},
    };

    const currentPage = parsedPages[pageIndex];

    const rawTemplates = currentPage.document.sections()[0].templates();
    let templates: object[] = [];
    if (!Array.isArray(rawTemplates)) {
      templates = [rawTemplates];
    } else {
      templates = rawTemplates;
    }

    for (const template of templates) {
      // TODO: Figure out this
      if (template.template === "pokémon infobox") {
        parsedPages[pageIndex].id = parseInt(template.data.ndex, 10);
      }
    }
    for (const sectionIndex in currentPage.document.sections()) {
      if (sectionIndex === "0") {
        currentPage.text.introduction = makeSection(
          currentPage.document.sections()[sectionIndex],
          0
        );
      } else if (currentPage.document.sections()[sectionIndex].depth() === 0) {
        const sectionTitleKey =
          makeSectionKey(
            currentPage.document.sections()[sectionIndex].title()
          ) || sectionIndex;
        if (!currentPage.text[sectionTitleKey]) {
          currentPage.text[sectionTitleKey] = makeSection(
            currentPage.document.sections()[sectionIndex],
            sectionIndex
          );
        }

        loopSectionChildren(
          parseInt(sectionIndex),
          currentPage,
          1,
          currentPage.text[sectionTitleKey]
        );
      }
    }
    currentPage.document = undefined;
    fs.writeFile(
      path.join(__dirname, "../public/data", `${currentPage.id}.json`),
      JSON.stringify(page[pageIndex])
    );
  }
})().catch((err) => console.log(err));

// Start reading from stdin so we don't exit.
// process.stdin.resume();
