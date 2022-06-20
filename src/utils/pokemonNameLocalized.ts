import type { PokemonSpecies, Pokemon } from "@16patsle/pokeapi.js";
import { usePokemonStore } from "@/stores/pokemonStore";
import { capitalize } from "@/utils/capitalize";
import { idFromUrl } from "./idFromUrl";

export const pokemonNameLocalized = (pokemonSpecies: PokemonSpecies) => {
  for (const name of pokemonSpecies.names) {
    if (name.language.name === "en") {
      return name.name;
    }
  }
  return pokemonSpecies.name;
};

export const pokemonNameLocalizedVariety = (pokemonSpecies: PokemonSpecies, pokemonVariety: Pokemon) => {
  const localizedName = pokemonNameLocalized(pokemonSpecies);
  if (pokemonVariety.name === pokemonSpecies.name) {
    // Default variety, use the species name
    return localizedName;
  } else {
    const store = usePokemonStore();
    // Other variety, try finding the name in the form data
    const form = pokemonVariety.forms.find((form) => {
      const formId = idFromUrl(form?.url);
      return formId ? store.pokemonForms[formId]?.is_default : false;
    });
    
    const formId = idFromUrl(form?.url);
    if (formId) {
      const formData = store.pokemonForms[formId]
      // The .names array is preferred, but not always available, fall back on .form_names
      const name = formData.names.find((name) => name.language.name === "en");
      const formName = formData.form_names.find(
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
      return capitalize(pokemonVariety.name);
    }
  }
};
