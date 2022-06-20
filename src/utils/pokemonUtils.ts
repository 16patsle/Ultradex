import type {
  PokemonSpecies,
  Pokemon,
  PokemonForm,
} from "@16patsle/pokeapi.js";
import { usePokemonStore } from "../stores/pokemonStore";
import { idFromUrl } from "./idFromUrl";

export function getDefaultPokemonVariety(pokemon: PokemonSpecies) {
  return pokemon.varieties.find((variety) => variety.is_default);
}

export function getOtherPokemonVarieties(pokemon: PokemonSpecies) {
  return pokemon.varieties.filter((variety) => !variety.is_default);
}

export function getDefaultPokemonVarietyForm(
  pokemonVariety: Pokemon
): PokemonForm | undefined {
  const store = usePokemonStore();
  const formResource = pokemonVariety.forms.find((form) => {
    const formId = idFromUrl(form?.url);
    return formId ? store.pokemonForms[formId]?.is_default : false;
  });
  const formId = idFromUrl(formResource?.url);
  return formId ? store.pokemonForms[formId] : undefined;
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
  language: string
) {
  return array.find((item) => item.language.name === language);
}
