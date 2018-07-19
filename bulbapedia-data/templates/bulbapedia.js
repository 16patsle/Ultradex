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
  //https://bulbapedia.bulbagarden.net/wiki/Template:P
  p: tmpl => {
    const obj = pipeList(tmpl);
    const pageName = obj.data[0] || "";
    const displayName = obj.data[1] || pageName;
    return linkify(pageName + " (Pokémon)", displayName);
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
  },
  //https://bulbapedia.bulbagarden.net/wiki/Template:An
  an: tmpl => {
    return linkTemplate(tmpl, "", " (anime)");
  },
  //https://bulbapedia.bulbagarden.net/wiki/Template:TP
  tp: tmpl => {
    const obj = pipeList(tmpl);
    const trainer = obj.data[0] || "";
    const pokemon = obj.data[1] || "";
    return linkify(`${trainer}'s ${pokemon}`, pokemon);
  },
  //https://bulbapedia.bulbagarden.net/wiki/Template:Pkmn
  pkmn: tmpl => {
    return linkTemplate(tmpl, "Pokémon ");
  },
  //https://bulbapedia.bulbagarden.net/wiki/Template:OBP
  obp: tmpl => {
    const obj = pipeList(tmpl);
    const title = obj.data[0] || "";
    const parenthetical = obj.data[1] || "";
    return linkify(`${title} (${parenthetical})`, title);
  },
  //https://bulbapedia.bulbagarden.net/wiki/Template:Adv
  adv: tmpl => {
    return linkTemplate(tmpl, "", " (Adventures)");
  }
};

module.exports = bulbapedia;
