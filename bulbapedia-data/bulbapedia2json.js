const parser = require("xml2json");
const fs = require("fs-extra");
const path = require("path");
const wtf = require("wtf_wikipedia");

const doSection = require("./section");

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
      title: page[pageIndex].title,
      document: wtf(page[pageIndex].revision.text.$t),
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
        page[pageIndex].text.introduction = doSection(
          page[pageIndex].document.sections()[sectionIndex],
          {
            title: false,
            sentences: true,
            tables: true,
            lists: true
          }
        );
      } else {
        page[pageIndex].text[
          page[pageIndex].document
            .sections()
            [sectionIndex].data.title.toLowerCase()
            .replace(new RegExp(" ", "g"), "_") || sectionIndex
        ] = doSection(page[pageIndex].document.sections()[sectionIndex], {
          title: false,
          sentences: true,
          tables: true,
          lists: true
        });
      }
    }
    page[pageIndex].document = undefined;
    fs.writeFile(
      path.join(__dirname, "../public/data", `${page[pageIndex].id}.json`),
      JSON.stringify(page[pageIndex])
    );
  }
})().catch(err => console.log(err));
