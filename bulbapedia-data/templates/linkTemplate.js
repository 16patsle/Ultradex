const pipeList = require("wtf_wikipedia/src/templates/parsers/pipeList");
const { linkify } = require("./linkify");

module.exports = (tmpl, prefix = "", suffix = "") => {
  const obj = pipeList(tmpl);
  const pageName = obj.data[0] || "";
  return linkify(prefix + pageName + suffix, pageName);
};
