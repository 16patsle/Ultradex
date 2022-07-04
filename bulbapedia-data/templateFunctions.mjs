export default {
  // https://bulbapedia.bulbagarden.net/wiki/Template:P
  p: (tmpl, list, parse) => {
    const { pokemon, text } = parse(tmpl, ["pokemon", "text"]);
    const obj = {
      template: "p",
      pokemon,
      text,
      page: `${pokemon} (Pokémon)`,
    };
    list.push(obj);
    return text ?? pokemon;
  },

  // https://bulbapedia.bulbagarden.net/wiki/Template:2t
  "2t": (tmpl, list, parse) => {
    const { type1, type2 } = parse(tmpl, ["type1", "type2"]);
    const text = `${type1}/${type2}`;
    const obj = {
      template: "2t",
      type1,
      type2,
      text,
    };
    list.push(obj);
    return text;
  },

  // https://bulbapedia.bulbagarden.net/wiki/Template:P
  obp: (tmpl, list, parse) => {
    const { title, parenthetical } = parse(tmpl, ["title", "parenthetical"]);
    const obj = {
      template: "obp",
      title,
      parenthetical,
      page: `${title} (${parenthetical})`,
    };
    list.push(obj);
    return title;
  },

  // https://bulbapedia.bulbagarden.net/wiki/Template:Wp
  dl: (tmpl, list, parse) => {
    const { page, section, text } = parse(tmpl, ["page", "section", "text"]);
    const obj = {
      template: "dl",
      page,
      section,
      text,
    };
    list.push(obj);
    return text ?? section;
  },

  // https://bulbapedia.bulbagarden.net/wiki/Template:Wp
  wp: (tmpl, list, parse) => {
    const { page } = parse(tmpl, ["page"]);
    const obj = {
      template: "wp",
      page,
    };
    list.push(obj);
    return page;
  },

  // https://bulbapedia.bulbagarden.net/wiki/Template:V2
  v2: (tmpl, list, parse) => {
    const { version } = parse(tmpl, ["version"]);
    const obj = {
      template: "v2",
      version,
      page: `Pokémon ${version} Version`,
    };
    list.push(obj);
    return version;
  },

  // https://bulbapedia.bulbagarden.net/wiki/Template:2v2
  "2v2": (tmpl, list, parse) => {
    const { version1, version2 } = parse(tmpl, ["version1", "version2"]);
    const page = `Pokémon ${version1} and ${version2} Versions`;
    const text = `${version1} and ${version2}`;
    const obj = {
      template: "2v2",
      version1,
      version2,
      page,
      text,
    };
    list.push(obj);
    return text;
  },

  // https://bulbapedia.bulbagarden.net/wiki/Template:2v
  "2v": (tmpl, list, parse) => {
    const { version1, version2 } = parse(tmpl, ["version1", "version2"]);
    const page = `Pokémon ${version1} and ${version2} Versions`;
    const text = `${version1} and ${version2} Versions`;
    const obj = {
      template: "2v",
      version1,
      version2,
      page,
      text,
    };
    list.push(obj);
    return text;
  },

  // https://bulbapedia.bulbagarden.net/wiki/Template:Game
  game: (tmpl, list, parse) => {
    const { version } = parse(tmpl, ["version"]);
    const page = `Pokémon ${version} Version`;
    const text = `Pokémon ${version}`;
    const obj = {
      template: "game",
      version,
      page,
      text,
    };
    list.push(obj);
    return text;
  },

  // https://bulbapedia.bulbagarden.net/wiki/Template:Adv
  adv: (tmpl, list, parse) => {
    const { title } = parse(tmpl, ["title"]);
    const obj = {
      template: "adv",
      title,
      page: `${title} (Adventures)`,
    };
    list.push(obj);
    return title;
  },

  // https://bulbapedia.bulbagarden.net/wiki/Template:Pkmn
  pkmn: (tmpl, list, parse) => {
    const { text } = parse(tmpl, ["text"]);
    const obj = {
      template: "pkmn",
      text,
      page: `Pokémon ${text}`,
    };
    list.push(obj);
    return text;
  },

  // https://bulbapedia.bulbagarden.net/wiki/Template:M
  m: (tmpl, list, parse) => {
    const { title } = parse(tmpl, ["title"]);
    const obj = {
      template: "m",
      title,
      page: `${title} (move)`,
    };
    list.push(obj);
    return title;
  },

  // https://bulbapedia.bulbagarden.net/wiki/Template:An
  an: (tmpl, list, parse) => {
    const { title } = parse(tmpl, ["title"]);
    const obj = {
      template: "an",
      title,
      page: `${title} (anime)`,
    };
    list.push(obj);
    return title;
  },

  // https://bulbapedia.bulbagarden.net/wiki/Template:Ash
  ash: (tmpl, list, parse) => {
    const { text = "Ash" } = parse(tmpl, ["text"]);
    const obj = {
      template: "ash",
      text,
      page: "Ash Ketchum",
    };
    list.push(obj);
    return text;
  },

  // https://bulbapedia.bulbagarden.net/wiki/Template:Ashfr
  ashfr: (tmpl, list, parse) => {
    const { text = "his friends" } = parse(tmpl, ["text"]);
    const obj = {
      template: "ashfr",
      text,
      page: "Ash's friends",
    };
    list.push(obj);
    return text;
  },

  // https://bulbapedia.bulbagarden.net/wiki/Template:TP
  tp: (tmpl, list, parse) => {
    const { trainer, pokemon } = parse(tmpl, ["trainer", "pokemon"]);
    const obj = {
      template: "tp",
      trainer,
      pokemon,
      page: `${trainer}'s ${pokemon}`,
    };
    list.push(obj);
    return pokemon;
  },
};
