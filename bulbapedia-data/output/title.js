/* eslint-env node */
const smartReplace = require("wtf_wikipedia/src/lib/smartReplace");
const { parseLine } = require("wtf_wikipedia/src/sentence");

const parseTitle = function (title) {
  const parsedTitle = parseLine(title);

  return {
    text() {
      return parsedTitle.text;
    },
    links() {
      return parsedTitle.links || [];
    },
    bold() {
      return [];
    },
    italic() {
      return [];
    },
  };
};

// sanitize links, bold, italic
const doTitle = function (title) {
  title = parseTitle(title);
  let text = title.text();
  //turn links into plain text
  title.links().forEach((link) => {
    const str = link.text || link.page;
    text = smartReplace(text, str, str);
  });
  //sanitize bolds
  title.bold().forEach((str) => {
    text = smartReplace(text, str, str);
  });
  //sanitize italics
  title.italic().forEach((str) => {
    text = smartReplace(text, str, str);
  });
  // remove simple templates
  text = text.replace(/{{[a-z]*\|([a-z]*)}}/, "$1");

  return text;
};
module.exports = doTitle;
