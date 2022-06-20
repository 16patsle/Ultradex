import type { PokemonSpecies, Pokemon } from "@16patsle/pokeapi.js";
import { capitalize } from "@/utils/capitalize";
import { findWithLanguage, getDefaultPokemonVarietyForm } from "./pokemonUtils";

export const pokemonNameLocalized = (pokemonSpecies: PokemonSpecies) =>
  findWithLanguage(pokemonSpecies.names, "en")?.name || pokemonSpecies.name;

export const pokemonNameLocalizedVariety = (
  pokemonSpecies: PokemonSpecies,
  pokemonVariety: Pokemon
) => {
  const localizedName = pokemonNameLocalized(pokemonSpecies);
  if (pokemonVariety.name === pokemonSpecies.name) {
    // Default variety, use the species name
    return localizedName;
  } else {
    // Other variety, try finding the name in the form data
    const form = getDefaultPokemonVarietyForm(pokemonVariety);
    if (form) {
      // The .names array is preferred, but not always available, fall back on .form_names
      const name = findWithLanguage(form.names, "en");
      const formName = findWithLanguage(form.form_names, "en");
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
      return capitalize(pokemonVariety.name);
    }
  }
};
