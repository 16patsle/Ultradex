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
    // Default variety, use the species name
    return localizedName;
  } else {
    // Other variety, try finding the name in the form data
    const form = pokemonVariety.forms.find((form) => form.data?.is_default);
    if (form) {
      // The .names array is preferred, but not always available, fall back on .form_names
      const name = form.data.names.find((name) => name.language.name === "en");
      const formName = form.data.form_names.find(
        (formName) => formName.language.name === "en"
      );
      return (name ?? formName)?.name || "";
    } else if (pokemonVariety.name.includes(pokemonSpecies.name)) {
      // Try creating a fallback name from the variety and species name
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
      // If all else fails, just capitalize the species name
      localizedName = pokemonVariety.name;
      return localizedName.charAt(0).toUpperCase() + localizedName.slice(1);
    }
  }
};
