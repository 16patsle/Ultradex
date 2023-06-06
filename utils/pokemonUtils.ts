import type {
  PokemonSpecies,
  Pokemon,
  PokemonForm,
} from "@16patsle/pokeapi.js";

export function getDefaultPokemonVariety(pokemon: PokemonSpecies) {
  return pokemon.varieties.find((variety) => variety.is_default);
}

export function getOtherPokemonVarieties(pokemon: PokemonSpecies) {
  return pokemon.varieties.filter((variety) => !variety.is_default);
}

export function getDefaultPokemonVarietyForm(
  pokemonVariety: Pokemon,
  pokemonForms: PokemonForm[]
): PokemonForm | undefined {
  const formResource = pokemonVariety.forms.find((form) => {
    const formId = idFromUrl(form?.url);
    return formId ? pokemonForms[formId]?.is_default : false;
  });
  const formId = idFromUrl(formResource?.url);
  return formId ? pokemonForms[formId] : undefined;
}

type ResourceWithLanguage = { language: { name: string } };

/**
 * Find a resource in an array with a given language.
 * @param array An array of objects with a language property
 * @param language The language to look for
 * @returns An object with a matching language, or undefined if not found
 */
export function findWithLanguage<T extends ResourceWithLanguage>(
  array: T[],
  language = "en"
) {
  return array.find((item) => item.language.name === language);
}

export const formatPokemonId = (id: number | string = 0) =>
  id.toString().padStart(3, "0");

/**
 * Normalized a string for comparison by lowercasing and removing non-alphanumeric (non-word) characters.
 * @param text A string to normalize
 * @returns The normalized string
 */
export const normalizeTextForComparison = (text: string) =>
  text.toLowerCase().replace(/\W+/g, "");