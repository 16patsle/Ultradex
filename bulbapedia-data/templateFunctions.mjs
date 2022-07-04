export default (parse) => ({
  // https://bulbapedia.bulbagarden.net/wiki/Template:P
  p: (tmpl, list) => {
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
  "2t": (tmpl, list) => {
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
  obp: (tmpl, list) => {
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
  dl: (tmpl, list) => {
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
  wp: (tmpl, list) => {
    const { page } = parse(tmpl, ["page"]);
    const obj = {
      template: "wp",
      page,
    };
    list.push(obj);
    return page;
  },

  // https://bulbapedia.bulbagarden.net/wiki/Template:V2
  v2: (tmpl, list) => {
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
  "2v2": (tmpl, list) => {
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
  "2v": (tmpl, list) => {
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
  game: (tmpl, list) => {
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
  adv: (tmpl, list) => {
    const { title } = parse(tmpl, ["title"]);
    const obj = {
      template: "adv",
      title,
      page: `${title} (Adventures)`,
    };
    list.push(obj);
    return title;
  },
});
