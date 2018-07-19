const getInside = require("wtf_wikipedia/src/templates/parsers/inside");
const pipeList = require("wtf_wikipedia/src/templates/parsers/pipeList");
const linkTemplate = require("./linkTemplate");
const { linkify } = require("./linkify");

const bulbapedia = {
  //https://bulbapedia.bulbagarden.net/wiki/Template:Ash
  ash: () => {
    return "Ash";
  },
  //https://bulbapedia.bulbagarden.net/wiki/Template:Ashfr
  ashfr: () => {
    return "his friends";
  },
  main: tmpl => {
    const obj = getInside(tmpl);
    return `<div class="main-article-link">${linkify(
      obj.data,
      `Read about ${obj.data} on Bulbapedia.`
    )}</div>`;
  },
  //https://bulbapedia.bulbagarden.net/wiki/Template:Game
  game: tmpl => {
    const obj = pipeList(tmpl);
    const name = obj.data[0] || "";
    const s = obj.data[1] || "";
    return linkify(`Pokémon ${name} Version${s}`, `Pokemon ${name}`);
  },
  //https://bulbapedia.bulbagarden.net/wiki/Template:M
  m: tmpl => {
    return linkTemplate(tmpl, "", " (move)");
  },
  //https://bulbapedia.bulbagarden.net/wiki/Template:TCG
  tcg: tmpl => {
    return linkTemplate(tmpl, "", " (TCG)");
  },
  //https://bulbapedia.bulbagarden.net/wiki/Template:TFG
  tfg: tmpl => {
    return linkTemplate(tmpl, "", " (TFG)");
  },
  "tfg id": tmpl => {
    const obj = pipeList(tmpl);
    const tfg = obj.data[0] || "";
    const name = obj.data[1] || "";
    const id = obj.data[2] || "";
    return linkify(`${name} (${tfg} ${id})`, name);
  }
};

module.exports = bulbapedia;
