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
  }
}

type BulbapediaPage = {
  title: string;
  revision: BulbapediaRevision;
}

type BulbapediaRevision = {
  text: {
    $t: string;
  };
}

type ParsedPage = {
  title: string;
  document: Document;
  id?: number;
  text: {
    [key: string]: ParsedSection;
  };
}

type ParsedSection = {
  html: string;
  title: string;
  index: number;
  depth: number;
  children: {
    [key: string]: ParsedSection;
  };
}

const doTitle = (title: string) => title;

const makeSection = (section: Section, sectionIndex: number | string) => {
  const index = typeof sectionIndex === "number" ? sectionIndex : parseInt(sectionIndex);
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
  }
}

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

    let rawTemplates = currentPage.document.sections()[0].templates();
    let templates: object[] = []
    if (!Array.isArray(rawTemplates)) {
      templates = [rawTemplates]
    } else {
      templates = rawTemplates
    }

    for (const template of templates) {
      // TODO: Figure out this
      if (template.template === "pokémon infobox") {
        parsedPages[pageIndex].id = parseInt(template.data.ndex, 10);
      }
    }
    for (const sectionIndex in currentPage.document.sections()) {
      if (sectionIndex === "0") {
        currentPage.text.introduction = makeSection(currentPage.document.sections()[sectionIndex], 0);
      } else if (
        currentPage.document.sections()[sectionIndex].depth() === 0
      ) {
        const sectionTitleKey =
          doTitle(currentPage.document.sections()[sectionIndex].title())
            .toLowerCase()
            .replace(new RegExp(" ", "g"), "_") || sectionIndex;
        if (!currentPage.text[sectionTitleKey]) {
          /*console.log(
            sectionIndex,
            currentPage.document.sections()[sectionIndex].data.depth,
            sectionIndex,
            currentPage.document.sections()[sectionIndex].title()
          );*/

          currentPage.text[sectionTitleKey] = makeSection(currentPage.document.sections()[sectionIndex], sectionIndex);
        }

        let sectionTitleKeyChild = "";
        let sectionTitleKeyChild2 = "";
        let sectionTitleKeyChild3 = "";
        for (
          let sectionIndexChild = parseInt(sectionIndex) + 1;
          sectionIndexChild < currentPage.document.sections().length;
          sectionIndexChild++
        ) {
          if (
            currentPage.document.sections()[sectionIndexChild].depth() === 1
          ) {
            sectionTitleKeyChild =
              doTitle(
                currentPage.document.sections()[sectionIndexChild].title()
              )
                .toLowerCase()
                .replace(new RegExp(" ", "g"), "_") || sectionIndexChild;
            if (
              !currentPage.text[sectionTitleKey].children[
                sectionTitleKeyChild
              ]
            ) {
              /*console.log(
                sectionIndexChild,

                page[pageIndex].document.sections()[sectionIndexChild].data
                  .depth,
                sectionIndexChild - sectionIndex,
                page[pageIndex].document.sections()[sectionIndexChild].title()
              );*/

              currentPage.text[sectionTitleKey].children[
                sectionTitleKeyChild
              ] = makeSection(currentPage.document.sections()[sectionIndexChild], sectionIndexChild - parseInt(sectionIndex) - 1)
            }
          } else if (
            currentPage.document.sections()[sectionIndexChild].depth() > 1
          ) {
            for (
              let sectionIndexChild2 = sectionIndexChild;
              sectionIndexChild2 < currentPage.document.sections().length;
              sectionIndexChild2++
            ) {
              if (
                currentPage.document.sections()[sectionIndexChild2]
                  .depth() === 2
              ) {
                sectionTitleKeyChild2 =
                  doTitle(
                    currentPage.document
                      .sections()
                      [sectionIndexChild2].title()
                  )
                    .toLowerCase()
                    .replace(new RegExp(" ", "g"), "_") || sectionIndexChild2;
                try {
                  if (
                    !currentPage.text[sectionTitleKey].children[
                      sectionTitleKeyChild
                    ].children[sectionTitleKeyChild2]
                  ) {
                    /*console.log(
                      sectionIndexChild2,

                      page[pageIndex].document.sections()[sectionIndexChild2].data
                        .depth,
                      sectionIndexChild2 - sectionIndexChild,
                      page[pageIndex].document
                        .sections()
                        [sectionIndexChild2].title()
                    );*/

                    currentPage.text[sectionTitleKey].children[
                      sectionTitleKeyChild
                    ].children[sectionTitleKeyChild2] = 
                    makeSection(currentPage.document.sections()[sectionIndexChild2], sectionIndexChild2 - sectionIndexChild);
                  }
                } catch (err) {
                  console.error(
                    `Error with section "${currentPage.document
                      .sections()
                      [sectionIndexChild2].title()}" on page "${page[
                      pageIndex
                    ].title.replace(" (Pokémon)", "")}".`,
                    err
                  );
                }
              } else if (
                currentPage.document.sections()[sectionIndexChild2].depth() >
                2
              ) {
                for (
                  let sectionIndexChild3 = sectionIndexChild2;
                  sectionIndexChild3 <
                  currentPage.document.sections().length;
                  sectionIndexChild3++
                ) {
                  if (
                    currentPage.document.sections()[sectionIndexChild3]
                      .depth() === 3
                  ) {
                    sectionTitleKeyChild3 =
                      doTitle(
                        currentPage.document
                          .sections()
                          [sectionIndexChild3].title()
                      )
                        .toLowerCase()
                        .replace(new RegExp(" ", "g"), "_") ||
                      sectionIndexChild3;
                    try {
                      if (
                        !currentPage.text[sectionTitleKey].children[
                          sectionTitleKeyChild
                        ].children[sectionTitleKeyChild2].children[
                          sectionTitleKeyChild3
                        ]
                      ) {
                        /*console.log(
                          sectionIndexChild3,
                          page[pageIndex].document.sections()[sectionIndexChild3]
                            .data.depth,
                          sectionIndexChild3 - sectionIndexChild2,
                          page[pageIndex].document
                            .sections()
                            [sectionIndexChild3].title(),
                          sectionIndexChild3 - sectionIndexChild2
                        );*/

                        currentPage.text[sectionTitleKey].children[
                          sectionTitleKeyChild
                        ].children[sectionTitleKeyChild2].children[
                          sectionTitleKeyChild3
                        ] = makeSection(currentPage.document.sections()[sectionIndexChild3], sectionIndexChild3 - sectionIndexChild2);
                      }
                    } catch (err) {
                      console.error(
                        `Error with section "${currentPage.document
                          .sections()
                          [sectionIndexChild3].title()}" on page "${page[
                          pageIndex
                        ].title.replace(" (Pokémon)", "")}".`,
                        err
                      );
                    }
                  } else {
                    break;
                  }
                }
              } else {
                break;
              }
            }
          } else {
            break;
          }
        }
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
