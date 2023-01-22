import type {
  Name,
  PokemonSpecies,
  Pokemon,
  PokemonForm,
} from "@16patsle/pokeapi.js";

type ResourceWithNames = {
  names: Name[];
  name: string;
};

/**
 * Attempt to localize the name of a resource.
 * @param pokemonSpecies An object with names in multiple languages
 * @param language A language supported by the API, default "en" (English)
 * @param fallback A fallback language to use if the requested language is not supported, or false to fall bck to the name property
 * @returns The name of the pokemon in the requested language or the fallback language, or the name property if fallback is disabled
 */
export const pokemonNameLocalized = <T extends ResourceWithNames>(
  pokemonSpecies: T,
  language = usePokemonStore().language ?? "en",
  fallback: string | false = "en"
) =>
  pokemonSpecies
    ? findWithLanguage(pokemonSpecies.names, language)?.name ??
      (fallback
        ? findWithLanguage(pokemonSpecies.names, fallback)?.name
        : undefined) ??
      titlecase(pokemonSpecies.name.split("-").join(" "))
    : "";

export const pokemonFormNameLocalized = (
  pokemonForm: PokemonForm,
  language = "en"
) => {
  // The .names array is preferred, but not always available, fall back on .form_names
  const name = findWithLanguage(pokemonForm.names, language);
  const formName = findWithLanguage(pokemonForm.form_names, language);
  return (name ?? formName)?.name || "";
};

export const pokemonNameLocalizedVariety = (
  pokemonSpecies: PokemonSpecies,
  pokemonVariety: Pokemon,
  pokemonForms: PokemonForm[],
  language = usePokemonStore().language ?? "en"
) => {
  const localizedName = pokemonNameLocalized(pokemonSpecies);
  if (pokemonVariety.name === pokemonSpecies.name) {
    // Default variety, use the species name
    return localizedName;
  } else {
    // Other variety, try finding the name in the form data
    const form = getDefaultPokemonVarietyForm(pokemonVariety, pokemonForms);
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
