export const pokemonNameLocalized = (pokemonSpecies) => {
  for (let name of pokemonSpecies.names) {
    if (name.language.name === "en") {
      return name.name;
    }
  }
  return pokemonSpecies.name;
};

export const pokemonNameLocalizedVariety = (pokemonSpecies, pokemonVariety) => {
  let localizedName = pokemonNameLocalized(pokemonSpecies);
  if (pokemonVariety.name === pokemonSpecies.name) {
    return localizedName;
  } else if (pokemonVariety.name.includes(pokemonSpecies.name)) {
    return (
      pokemonVariety.name
        .toLowerCase()
        .replace(pokemonSpecies.name, "")
        .replace("-", " ")
        .replace("-", " ") +
      " " +
      localizedName
    );
  } else {
    localizedName = pokemonVariety.name;
    return localizedName.charAt(0).toUpperCase() + localizedName.slice(1);
  }
};
