/* eslint-env node */
const doSentence = require("./sentence");
const doList = require("./list");
const doTable = require("wtf_wikipedia/src/output/html/table");
const makeImage = require("wtf_wikipedia/src/output/html/image");

const doSection = (section, options) => {
  let html = "";
  //make the header
  if (options.title === true && section.title()) {
    const num = 1 + section.depth;
    html += "  <h" + num + ">" + section.title() + "</h" + num + ">";
    html += "\n";
  }
  //put any images under the header
  if (options.images === true) {
    const imgs = section.images();
    if (imgs.length > 0) {
      html += imgs.map((image) => makeImage(image)).join("\n");
      html += "\n";
    }
  }
  //make a html table
  if (options.tables === true) {
    html += section
      .tables()
      .map((t) => doTable(t, options))
      .join("\n");
  }
  // //make a html bullet-list
  if (section.lists() && options.lists === true) {
    html += section
      .lists()
      .map((list) => doList(list, options))
      .join("\n");
  }
  //finally, write the sentence text.
  if (options.sentences === true && section.sentences().length) {
    html += '  <p class="text">\n    ';
    html += section
      .sentences()
      .map((s) => doSentence(s, options))
      .join(" ")
      .replace(/NEWPARAGRAPH<\/span>/g, '</span></p><p class="text">');
    html += "\n  </p>\n";
  }
  return '<div class="wiki-section">\n' + html + "</div>\n";
};
module.exports = doSection;
