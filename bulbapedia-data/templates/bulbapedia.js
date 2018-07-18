const getInside = require("wtf_wikipedia/src/templates/parsers/inside");
const pipeList = require("wtf_wikipedia/src/templates/parsers/pipeList");

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
    return `<a class="link" href="https://bulbapedia.bulbagarden.net/wiki/${obj.data.replace(
      new RegExp(" ", "g"),
      "_"
    )}" target="_blank" rel="noopener">Read about ${
      obj.data
    } on Bulbapedia</a>`;
  },
  game: tmpl => {
    const obj = pipeList(tmpl);
    const name = obj.data[0] || "";
    const s = obj.data[1] || "";
    return `<a class="link" href="https://bulbapedia.bulbagarden.net/wiki/${(
      "Pokémon " +
      name +
      " Version" +
      s
    ).replace(
      new RegExp(" ", "g"),
      "_"
    )}" target="_blank" rel="noopener">Pokemon ${obj.data[0]}</a>`;
  }
};

module.exports = bulbapedia;
