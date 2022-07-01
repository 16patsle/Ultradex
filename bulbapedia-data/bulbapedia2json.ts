/* eslint-env node */
const parser = require("xml2json");
const fs = require("fs-extra");
const path = require("path");

const Document = require("./document/Document");
const doSection = require("./output/section");
const doTitle = require("./output/title");

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
  });

  for (const pageIndex in page) {
    page[pageIndex] = {
      title: page[pageIndex].title.replace(" (Pokémon)", ""),
      document: new Document(page[pageIndex].revision.text.$t),
      text: {},
    };

    for (const template of page[pageIndex].document.sections()[0].data
      .templates) {
      if (template.template === "pokémon infobox") {
        page[pageIndex].id = parseInt(template.data.ndex, 10);
      }
    }
    for (const sectionIndex in page[pageIndex].document.sections()) {
      if (sectionIndex === "0") {
        page[pageIndex].text.introduction = {
          html: doSection(page[pageIndex].document.sections()[sectionIndex], {
            title: false,
            sentences: true,
            tables: true,
            lists: true,
          }),
          index: 0,
        };
      } else if (
        page[pageIndex].document.sections()[sectionIndex].depth === 0
      ) {
        const sectionTitleKey =
          doTitle(page[pageIndex].document.sections()[sectionIndex].title())
            .toLowerCase()
            .replace(new RegExp(" ", "g"), "_") || sectionIndex;
        if (!page[pageIndex].text[sectionTitleKey]) {
          /*console.log(
            sectionIndex,
            page[pageIndex].document.sections()[sectionIndex].data.depth,
            sectionIndex,
            page[pageIndex].document.sections()[sectionIndex].title()
          );*/

          page[pageIndex].text[sectionTitleKey] = {
            html: doSection(page[pageIndex].document.sections()[sectionIndex], {
              title: false,
              sentences: true,
              tables: true,
              lists: true,
            }),
            index: sectionIndex,
            title: doTitle(
              page[pageIndex].document.sections()[sectionIndex].title()
            ),
            depth: page[pageIndex].document.sections()[sectionIndex].data.depth,
            children: {},
          };
        }

        let sectionTitleKeyChild = "";
        let sectionTitleKeyChild2 = "";
        let sectionTitleKeyChild3 = "";
        for (
          let sectionIndexChild = parseInt(sectionIndex) + 1;
          sectionIndexChild < page[pageIndex].document.sections().length;
          sectionIndexChild++
        ) {
          if (
            page[pageIndex].document.sections()[sectionIndexChild].depth === 1
          ) {
            sectionTitleKeyChild =
              doTitle(
                page[pageIndex].document.sections()[sectionIndexChild].title()
              )
                .toLowerCase()
                .replace(new RegExp(" ", "g"), "_") || sectionIndexChild;
            if (
              !page[pageIndex].text[sectionTitleKey].children[
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

              page[pageIndex].text[sectionTitleKey].children[
                sectionTitleKeyChild
              ] = {
                html: doSection(
                  page[pageIndex].document.sections()[sectionIndexChild],
                  {
                    title: false,
                    sentences: true,
                    tables: true,
                    lists: true,
                  }
                ),
                index: sectionIndexChild - sectionIndex - 1,
                title: doTitle(
                  page[pageIndex].document.sections()[sectionIndexChild].title()
                ),
                depth:
                  page[pageIndex].document.sections()[sectionIndexChild].data
                    .depth,
                children: {},
              };
            }
          } else if (
            page[pageIndex].document.sections()[sectionIndexChild].depth > 1
          ) {
            for (
              let sectionIndexChild2 = parseInt(sectionIndexChild);
              sectionIndexChild2 < page[pageIndex].document.sections().length;
              sectionIndexChild2++
            ) {
              if (
                page[pageIndex].document.sections()[sectionIndexChild2]
                  .depth === 2
              ) {
                sectionTitleKeyChild2 =
                  doTitle(
                    page[pageIndex].document
                      .sections()
                      [sectionIndexChild2].title()
                  )
                    .toLowerCase()
                    .replace(new RegExp(" ", "g"), "_") || sectionIndexChild2;
                try {
                  if (
                    !page[pageIndex].text[sectionTitleKey].children[
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

                    page[pageIndex].text[sectionTitleKey].children[
                      sectionTitleKeyChild
                    ].children[sectionTitleKeyChild2] = {
                      html: doSection(
                        page[pageIndex].document.sections()[sectionIndexChild2],
                        {
                          title: false,
                          sentences: true,
                          tables: true,
                          lists: true,
                        }
                      ),
                      index: sectionIndexChild2 - sectionIndexChild,
                      title: doTitle(
                        page[pageIndex].document
                          .sections()
                          [sectionIndexChild2].title()
                      ),
                      depth:
                        page[pageIndex].document.sections()[sectionIndexChild2]
                          .data.depth,
                      children: {},
                    };
                  }
                } catch (err) {
                  console.error(
                    `Error with section "${page[pageIndex].document
                      .sections()
                      [sectionIndexChild2].title()}" on page "${page[
                      pageIndex
                    ].title.replace(" (Pokémon)", "")}".`,
                    err
                  );
                }
              } else if (
                page[pageIndex].document.sections()[sectionIndexChild2].depth >
                2
              ) {
                for (
                  let sectionIndexChild3 = parseInt(sectionIndexChild2);
                  sectionIndexChild3 <
                  page[pageIndex].document.sections().length;
                  sectionIndexChild3++
                ) {
                  if (
                    page[pageIndex].document.sections()[sectionIndexChild3]
                      .depth === 3
                  ) {
                    sectionTitleKeyChild3 =
                      doTitle(
                        page[pageIndex].document
                          .sections()
                          [sectionIndexChild3].title()
                      )
                        .toLowerCase()
                        .replace(new RegExp(" ", "g"), "_") ||
                      sectionIndexChild3;
                    try {
                      if (
                        !page[pageIndex].text[sectionTitleKey].children[
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

                        page[pageIndex].text[sectionTitleKey].children[
                          sectionTitleKeyChild
                        ].children[sectionTitleKeyChild2].children[
                          sectionTitleKeyChild3
                        ] = {
                          html: doSection(
                            page[pageIndex].document.sections()[
                              sectionIndexChild3
                            ],
                            {
                              title: false,
                              sentences: true,
                              tables: true,
                              lists: true,
                            }
                          ),
                          index: sectionIndexChild3 - sectionIndexChild2,
                          title: doTitle(
                            page[pageIndex].document
                              .sections()
                              [sectionIndexChild3].title()
                          ),
                          depth:
                            page[pageIndex].document.sections()[
                              sectionIndexChild3
                            ].data.depth,
                        };
                      }
                    } catch (err) {
                      console.error(
                        `Error with section "${page[pageIndex].document
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
    page[pageIndex].document = undefined;
    fs.writeFile(
      path.join(__dirname, "../public/data", `${page[pageIndex].id}.json`),
      JSON.stringify(page[pageIndex])
    );
  }
})().catch((err) => console.log(err));

// Start reading from stdin so we don't exit.
// process.stdin.resume();
