/* eslint-env node */
const smartReplace = require("wtf_wikipedia/src/lib/smartReplace");
const helpers = require("wtf_wikipedia/src/lib/helpers");

// create links, bold, italic in html
const doSentence = function (sentence) {
  let text = sentence.text();
  //console.log(sentence);
  //turn links into <a href>
  sentence.links().forEach((link) => {
    let href = "";
    let classNames = "link";
    if (link.site) {
      //use an external link
      href = link.site;
      classNames += " external";
    } else {
      //otherwise, make it a relative internal link
      href = helpers.capitalise(link.page);
      href =
        "https://bulbapedia.bulbagarden.net/wiki/" + href.replace(/ /g, "_");
    }
    const str = link.text || link.page;
    const tag = `<a class="${classNames}" href="${href}" target="_blank" rel="noopener">${str}</a>`;
    text = smartReplace(text, str, tag);
  });
  //support bolds
  sentence.bold().forEach((str) => {
    const tag = "<b>" + str + "</b>";
    text = smartReplace(text, str, tag);
  });
  //do italics
  sentence.italic().forEach((str) => {
    const tag = "<i>" + str + "</i>";
    text = smartReplace(text, str, tag);
  });

  return '<span class="sentence">' + text + "</span>";
};
module.exports = doSentence;
