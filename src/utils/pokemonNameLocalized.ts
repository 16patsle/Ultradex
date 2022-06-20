import type { PokemonSpecies, Pokemon, PokemonForm } from "@16patsle/pokeapi.js";
import { capitalize } from "@/utils/capitalize";
import { findWithLanguage, getDefaultPokemonVarietyForm } from "./pokemonUtils";

export const pokemonNameLocalized = (pokemonSpecies: PokemonSpecies, language = "en") =>
  findWithLanguage(pokemonSpecies.names, language)?.name || pokemonSpecies.name;

export const pokemonFormNameLocalized = (pokemonForm: PokemonForm, language = "en") => {
  // The .names array is preferred, but not always available, fall back on .form_names
  const name = findWithLanguage(pokemonForm.names, language);
  const formName = findWithLanguage(pokemonForm.form_names, language);
  return (name ?? formName)?.name || "";
}

export const pokemonNameLocalizedVariety = (
  pokemonSpecies: PokemonSpecies,
  pokemonVariety: Pokemon,
  language = "en"
) => {
  const localizedName = pokemonNameLocalized(pokemonSpecies);
  if (pokemonVariety.name === pokemonSpecies.name) {
    // Default variety, use the species name
    return localizedName;
  } else {
    // Other variety, try finding the name in the form data
    const form = getDefaultPokemonVarietyForm(pokemonVariety);
    if (form) {
      // Try getting with the right language, but fall back on English
      let name = pokemonFormNameLocalized(form, language);
      if (!name) {
        name = pokemonFormNameLocalized(form, "en");
      }
      return name;
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
