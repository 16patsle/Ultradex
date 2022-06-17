/* eslint-env node */
// const findRecursive = require('../../lib/recursive_match');
const getName = require("wtf_wikipedia/src/templates/parsers/_getName");
const getTemplates = require("wtf_wikipedia/src/templates/parsers/_getTemplates");

const dates = require("wtf_wikipedia/src/templates/dates");
const geo = require("wtf_wikipedia/src/templates/geo");
const inline = require("wtf_wikipedia/src/templates/inline");
const currencies = require("wtf_wikipedia/src/templates/currencies");
const misc = require("wtf_wikipedia/src/templates/misc");
const generic = require("wtf_wikipedia/src/templates/generic");
const links = require("wtf_wikipedia/src/templates/links");
const formatting = require("wtf_wikipedia/src/templates/formatting");
const pronounce = require("wtf_wikipedia/src/templates/pronounce");
const external = require("wtf_wikipedia/src/templates/external");
const ignore = require("wtf_wikipedia/src/templates/ignore");
const bulbapedia = require("./bulbapedia.js");

//put them all together
const inlineParsers = Object.assign(
  {},
  dates,
  inline,
  currencies,
  links,
  formatting,
  bulbapedia
);
const bigParsers = Object.assign({}, geo, pronounce, misc, external);

const doTemplate = function (tmpl, wiki, r) {
  const name = getName(tmpl);
  //we explicitly ignore these templates
  if (Object.prototype.hasOwnProperty.call(ignore, name) === true) {
    wiki = wiki.replace(tmpl, "");
    return wiki;
  }
  //string-replacement templates
  if (
    Object.prototype.hasOwnProperty.call(inlineParsers, name) === true &&
    inlineParsers[name]
  ) {
    const str = inlineParsers[name](tmpl, r);
    wiki = wiki.replace(tmpl, str);
    return wiki;
  }
  //section-template parsers
  if (Object.prototype.hasOwnProperty.call(bigParsers, name) === true) {
    const obj = bigParsers[name](tmpl);
    if (obj) {
      r.templates.push(obj);
    }
    wiki = wiki.replace(tmpl, "");
    return wiki;
  }

  const regex = /{{[a-zA-Z0-9é ]+\|(?:[a-zA-Z0-9é ]*\|)*([a-zA-Z0-9é♀♂ ]+)}}/;
  //fallback parser
  const obj = generic(tmpl, name);
  if (obj) {
    r.templates.push(obj);
    if (regex.test(tmpl)) {
      const newTmpl = tmpl.replace(regex, "$1");
      wiki = wiki.replace(tmpl, newTmpl);
    } else {
      wiki = wiki.replace(tmpl, "");
    }

    return wiki;
  }
  //bury this template, if we don't know it
  // console.log(`  - no parser for '${name}' -`);
  // console.log('');
  const newTmpl = tmpl.replace(regex, "$1");
  wiki = wiki.replace(tmpl, newTmpl);

  return wiki;
};

//reduce the scary recursive situations
const allTemplates = function (r, wiki, options) {
  let templates = getTemplates(wiki);
  // console.log(templates);
  //first, do the nested ones
  templates.nested.forEach((tmpl) => {
    wiki = doTemplate(tmpl, wiki, r, options);
  });
  // console.log(wiki);
  //then, reparse wiki for the top-level ones
  templates = getTemplates(wiki);
  templates.top.forEach((tmpl) => {
    wiki = doTemplate(tmpl, wiki, r, options);
  });
  return wiki;
};

module.exports = allTemplates;
