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

  // https://bulbapedia.bulbagarden.net/wiki/Template:DL
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

  // https://bulbapedia.bulbagarden.net/wiki/Template:3v
  "3v": (tmpl, list, parse) => {
    const { version1, version2, version3 } = parse(tmpl, [
      "version1",
      "version2",
      "version3",
    ]);
    const page1 = `Pokémon ${version1} and ${version2} Versions`;
    const page2 = `Pokémon ${version3} Version`;
    const text1 = `${version1}, ${version2}`;
    const text2 = `${version3} Versions`;
    const text = `${text1}, and ${text2}`;
    const obj = {
      template: "3v",
      version1,
      version2,
      version3,
      page1,
      page2,
      text1,
      text2,
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

  // https://bulbapedia.bulbagarden.net/wiki/Template:Game2
  game2: (tmpl, list, parse) => {
    const { version1, version2, version3 } = parse(tmpl, [
      "version1",
      "version2",
      "version3",
    ]);
    const page1 = `Pokémon ${version1} and ${version2} Versions`;
    const page2 = `Pokémon ${version3} Version`;
    const text1 = `Pokémon ${version1}, ${version2}`;
    const text2 = `${version3}`;
    const text = `${text1}, and ${text2}`;
    const obj = {
      template: "game2",
      version1,
      version2,
      version3,
      page1,
      page2,
      text1,
      text2,
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

  // https://bulbapedia.bulbagarden.net/wiki/Template:Pkmn2
  pkmn2: (tmpl, list, parse) => {
    const { text } = parse(tmpl, ["text"]);
    const obj = {
      template: "pkmn2",
      text,
      page: `${text} Pokémon`,
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

  // https://bulbapedia.bulbagarden.net/wiki/Template:AP
  ap: (tmpl, list, parse) => {
    const { pokemon } = parse(tmpl, ["pokemon"]);
    const obj = {
      template: "ap",
      pokemon,
      page: `Ash's ${pokemon}`,
    };
    list.push(obj);
    return pokemon;
  },

  // https://bulbapedia.bulbagarden.net/wiki/Template:Ball
  ball: (tmpl, list, parse) => {
    const { ball } = parse(tmpl, ["ball"]);
    const page = `${ball} Ball`;
    const obj = {
      template: "ball",
      ball,
      page,
    };
    list.push(obj);
    return page;
  },

  // https://bulbapedia.bulbagarden.net/wiki/Template:Gary
  gary: (tmpl, list, parse) => {
    const { text = "Gary" } = parse(tmpl, ["text"]);
    const obj = {
      template: "gary",
      text,
      page: "Gary Oak",
    };
    list.push(obj);
    return text;
  },

  // https://bulbapedia.bulbagarden.net/wiki/Template:Ka
  ka: (tmpl, list, parse) => {
    const { title } = parse(tmpl, ["title"]);
    const obj = {
      template: "ka",
      title,
      page: `${title} (Kanto)`,
    };
    list.push(obj);
    return title;
  },

  // https://bulbapedia.bulbagarden.net/wiki/Template:TRT
  trt: (tmpl, list, parse) => {
    const { text = "Team Rocket" } = parse(tmpl, ["text"]);
    const obj = {
      template: "trt",
      text,
      page: "Team Rocket trio",
    };
    list.push(obj);
    return text;
  },

  // https://bulbapedia.bulbagarden.net/wiki/Template:Tc
  tc: (tmpl, list, parse) => {
    const { title } = parse(tmpl, ["title"]);
    const obj = {
      template: "tc",
      title,
      page: `${title} (Trainer class)`,
    };
    list.push(obj);
    return title;
  },

  // https://bulbapedia.bulbagarden.net/wiki/Template:I
  i: (tmpl, list, parse) => {
    const { title } = parse(tmpl, ["title"]);
    const obj = {
      template: "i",
      title,
      page: `${title} (item)`,
    };
    list.push(obj);
    return title;
  },

  // https://bulbapedia.bulbagarden.net/wiki/Template:Stat
  stat: (tmpl, list, parse) => {
    const { stat, text } = parse(tmpl, ["stat", "text"]);
    const obj = {
      template: "stat",
      page: "Stat",
      section: stat,
      text,
    };
    list.push(obj);
    return text ?? stat;
  },

  // https://bulbapedia.bulbagarden.net/wiki/Template:Type
  type: (tmpl, list, parse) => {
    const { type, text } = parse(tmpl, ["type", "text"]);
    const obj = {
      template: "type",
      type,
      page: `${type} (type)`,
      text: text ?? `${type}-type`,
    };
    list.push(obj);
    return obj.text;
  },

  // https://bulbapedia.bulbagarden.net/wiki/Template:TFG
  tfg: (tmpl, list, parse) => {
    const { title } = parse(tmpl, ["title"]);
    const obj = {
      template: "tfg",
      title,
      page: `${title} (TFG)`,
    };
    list.push(obj);
    return title;
  },

  // https://bulbapedia.bulbagarden.net/wiki/Template:TFG_ID
  "tfg id": (tmpl, list, parse) => {
    const { series, title, id } = parse(tmpl, ["series", "title", "id"]);
    const obj = {
      template: "tfg id",
      series,
      title,
      id,
      page: `${title} (${series} ${id})`,
    };
    list.push(obj);
    return title;
  },

  // https://bulbapedia.bulbagarden.net/wiki/Template:Egg
  egg: (tmpl, list, parse) => {
    const { title } = parse(tmpl, ["title"]);
    const obj = {
      template: "egg",
      title,
      page: `${title} (Egg Group)`,
    };
    list.push(obj);
    return title;
  },

  // https://bulbapedia.bulbagarden.net/wiki/Template:Egg2
  egg2: (tmpl, list, parse) => {
    const { title } = parse(tmpl, ["title"]);
    const text = `${title} Group`;
    const obj = {
      template: "egg2",
      text,
      page: `${title} (Egg Group)`,
    };
    list.push(obj);
    return text;
  },

  // https://bulbapedia.bulbagarden.net/wiki/Template:Gen
  gen: (tmpl, list, parse) => {
    const { title } = parse(tmpl, ["title"]);
    const obj = {
      template: "gen",
      title,
      page: `Generation ${title}`,
    };
    list.push(obj);
    return title;
  },
};
