const parser = require("xml2json");
const fs = require("fs-extra");
const path = require("path");

const Document = require("./document/Document");
const doSection = require("./output/section");
const doTitle = require("./output/title");

(async function() {
  const xml = await fs.readFile(
    path.join(__dirname, "bulbapedia-pokemon-export.xml")
  );

  if (!fs.existsSync(path.join(__dirname, "../public/data"))) {
    fs.mkdirSync(path.join(__dirname, "../public/data"));
  }

  const {
    mediawiki: { page }
  } = parser.toJson(xml, {
    object: true,
    coerce: true
  });

  for (let pageIndex in page) {
    page[pageIndex] = {
      title: page[pageIndex].title.replace(" (Pokémon)", ""),
      document: new Document(page[pageIndex].revision.text.$t),
      text: {}
    };

    for (let template of page[pageIndex].document.sections()[0].data
      .templates) {
      if (template.template === "pokémon infobox") {
        page[pageIndex].id = parseInt(template.data.ndex, 10);
      }
    }
    for (let sectionIndex in page[pageIndex].document.sections()) {
      if (sectionIndex === "0") {
        page[pageIndex].text.introduction = {
          html: doSection(page[pageIndex].document.sections()[sectionIndex], {
            title: false,
            sentences: true,
            tables: true,
            lists: true
          }),
          index: 1
        };
      } else {
        page[pageIndex].text[
          doTitle(page[pageIndex].document.sections()[sectionIndex].title())
            .toLowerCase()
            .replace(new RegExp(" ", "g"), "_") || sectionIndex
        ] = {
          html: doSection(page[pageIndex].document.sections()[sectionIndex], {
            title: false,
            sentences: true,
            tables: true,
            lists: true
          }),
          index: sectionIndex,
          title: doTitle(
            page[pageIndex].document.sections()[sectionIndex].title()
          ),
          depth: page[pageIndex].document.sections()[sectionIndex].data.depth
        };
      }
    }
    page[pageIndex].document = undefined;
    fs.writeFile(
      path.join(__dirname, "../public/data", `${page[pageIndex].id}.json`),
      JSON.stringify(page[pageIndex])
    );
  }
})().catch(err => console.log(err));

// Start reading from stdin so we don't exit.
// process.stdin.resume();
