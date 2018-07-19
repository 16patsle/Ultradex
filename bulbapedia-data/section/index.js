const Section = require("wtf_wikipedia/src/section/Section");
const find_recursive = require("wtf_wikipedia/src/lib/recursive_match");

//interpret ==heading== lines
const parse = {
  heading: require("wtf_wikipedia/src/section/heading"),
  list: require("wtf_wikipedia/src/section/list"),
  image: require("wtf_wikipedia/src/image"),
  interwiki: require("wtf_wikipedia/src/section/interwiki"),
  table: require("wtf_wikipedia/src/section/table"),
  references: require("wtf_wikipedia/src/section/references"),
  templates: require("../templates"),
  eachSentence: require("../sentence").eachSentence
};
const section_reg = /[\n^](={1,5}[^=]{1,200}?={1,5})/g;

const doSection = function(section, wiki, options) {
  // //parse the <ref></ref> tags
  wiki = parse.references(section, wiki, options);
  //parse-out all {{templates}}
  wiki = parse.templates(section, wiki, options);
  // //parse the tables
  wiki = parse.table(section, wiki);
  // //parse the lists
  wiki = parse.list(section, wiki);
  // //parse+remove scary '[[ [[]] ]]' stuff
  //second, remove [[file:...[[]] ]] recursions
  let matches = find_recursive("[", "]", wiki);
  wiki = parse.image(matches, section, wiki, options);
  wiki = parse.interwiki(matches, section, wiki, options);
  //do each sentence
  wiki = parse.eachSentence(section, wiki);
  // section.wiki = wiki;
  section = new Section(section, wiki);
  return section;
};

const splitSections = function(wiki, options) {
  let split = wiki.split(section_reg); //.filter(s => s);
  let sections = [];
  for (let i = 0; i < split.length; i += 2) {
    let heading = split[i - 1] || "";
    let content = split[i] || "";
    let section = {
      title: "",
      depth: null,
      templates: []
    };
    //figure-out title/depth
    section = parse.heading(section, heading);
    //parse it up
    section = doSection(section, content, options);
    sections.push(section);
  }
  return sections;
};

module.exports = splitSections;
