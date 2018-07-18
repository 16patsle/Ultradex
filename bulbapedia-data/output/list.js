const doList = list => {
  let html = "<ul>\n";
  list.forEach(o => {
    html += "  <li>" + o.text() + "</li>\n";
  });
  html += "<ul>\n";
  return html;
};
module.exports = doList;
