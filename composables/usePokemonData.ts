import { getEvolutionChain } from "@16patsle/pokeapi.js/src/getEvolution";
import { getVersion } from "@16patsle/pokeapi.js/src/getGame";
import { getItem } from "@16patsle/pokeapi.js/src/getItem";
import { getLanguage } from "@16patsle/pokeapi.js/src/getLanguage";
import { getLocation, getRegion } from "@16patsle/pokeapi.js/src/getLocation";
import { getMove } from "@16patsle/pokeapi.js/src/getMove";
import {
  getPokemon,
  getPokemonColor,
  getPokemonForm,
  getPokemonSpecies,
  getStat,
  getType,
} from "@16patsle/pokeapi.js/src/getPokemon";
import type { Pokemon, PokemonForm } from "@16patsle/pokeapi.js";

export const usePokemonSpeciesData = async (id?: number) =>
  id !== undefined
    ? useAsyncData(`pokemon-species/${id}`, () => getPokemonSpecies(id))
    : Promise.reject("Missing id");

export const usePokemonSpeciesListData = async () => {
  const { data: pokemonList, error } = await useAsyncData(
    `pokemon-species`,
    () => getPokemonSpecies("?limit=2000")
  );
  return { pokemonList, error };
};

const fetchPokemonVariety = async (speciesId: number, varietyId: number) => {
  const data = await getPokemon(varietyId);
  const speciesData = await getPokemonSpecies(speciesId);
  if (
    speciesData.varieties.find((variety) => variety.pokemon.name === data.name)
  ) {
    return data;
  }
};

export const usePokemonVarietyData = async (
  speciesId?: number,
  varietyId?: number
) => {
  const { data: pokemon, error } = await useAsyncData(
    `pokemon/${varietyId}`,
    () =>
      speciesId !== undefined && varietyId !== undefined
        ? fetchPokemonVariety(speciesId, varietyId)
        : Promise.reject("Missing id(s)")
  );
  return { pokemon, error };
};

const fetchDefaultPokemonVariety = async (
  speciesId: number
): Promise<Pokemon | undefined> => {
  const speciesData = await getPokemonSpecies(speciesId);
  const variety = speciesData.varieties.find((variety) => variety.is_default);
  if (variety) {
    const varietyId = idFromUrl(variety.pokemon.url);
    if (varietyId) {
      return getPokemon(varietyId);
    }
  }
};

export const useDefaultPokemonVarietyData = async (id?: number) =>
  id !== undefined
    ? useAsyncData(`pokemon-default-variety/${id}`, () =>
        fetchDefaultPokemonVariety(id)
      )
    : Promise.reject("Missing id");

const fetchPokemonVarietyForms = async (varietyId: number) => {
  const variety = await getPokemon(varietyId);
  const formValues: Promise<PokemonForm>[] = [];
  for (const formIndex in variety.forms) {
    const form = variety.forms[Number(formIndex)];
    const formId = idFromUrl(form.url);
    if (formId) {
      formValues.push(getPokemonForm(formId));
    }
  }
  return Promise.all(formValues);
};

export const usePokemonVarietyFormsData = async (id?: number) => {
  const { data: pokemonForms, error } = await useAsyncData(
    `pokemon-variety-forms/${id}`,
    () =>
      id !== undefined
        ? fetchPokemonVarietyForms(id)
        : Promise.reject("Missing id")
  );
  return { pokemonForms, error };
};

export const usePokemonEvolutionChainData = async (id?: number) =>
  useAsyncData(`evolution-chain/${id}`, () =>
    id !== undefined ? getEvolutionChain(id) : Promise.reject("Missing id")
  );

export const useItemData = async (id?: number) =>
  id !== undefined
    ? useAsyncData(`item/${id}`, () => getItem(id))
    : Promise.reject("Missing id");

export const useLocationData = async (id?: number) =>
  id !== undefined
    ? useAsyncData(`location/${id}`, () => getLocation(id))
    : Promise.reject("Missing id");

export const useMoveData = async (id?: number) =>
  id !== undefined
    ? useAsyncData(`move/${id}`, () => getMove(id))
    : Promise.reject("Missing id");

export const useRegionData = async (id?: number) =>
  id !== undefined
    ? useAsyncData(`region/${id}`, () => getRegion(id))
    : Promise.reject("Missing id");

const fetchLanguages = async () => {
  const languages = (await getLanguage("")).results;
  const promises = [];

  for (const languageIndex in languages) {
    const language = languages[Number(languageIndex)];
    const languageId = idFromUrl(language.url);
    if (languageId) {
      promises[languageId] = getLanguage(languageId);
    }
  }

  const languageValues = await Promise.all(promises);

  // TODO: Should probably fix missing names in the API instead of this hack
  languageValues[11].names.push({
    language: {
      name: "en",
      url: "/api/v2/language/9/",
    },
    name: "Japanese",
  });
  languageValues[12].names.push({
    language: {
      name: "en",
      url: "/api/v2/language/9/",
    },
    name: "Simplified Chinese",
  });

  return languageValues;
};

export const useLanguagesData = async () =>
  await useAsyncData(`languages`, () => fetchLanguages());

const fetchPokemonStats = async () => {
  const stats = (await getStat("")).results;
  const promises = [];

  for (const statIndex in stats) {
    const stat = stats[Number(statIndex)];
    const statId = idFromUrl(stat.url);
    if (statId) {
      promises[statId] = getStat(statId);
    }
  }

  return Promise.all(promises);
};

export const usePokemonStatsData = async () => {
  const { data: stats, error } = await useAsyncData(`stats`, () =>
    fetchPokemonStats()
  );
  return { stats, error };
};

export const usePokemonTypeData = async (id?: number) =>
  id !== undefined
    ? useAsyncData(`type/${id}`, () => getType(id))
    : Promise.reject("Missing id");

export const useGameVersionData = async (id?: number) =>
  id !== undefined
    ? useAsyncData(`version/${id}`, () => getVersion(id))
    : Promise.reject("Missing kode");

export const usePokemonColorData = async (id?: number) =>
  id !== undefined
    ? useAsyncData(`pokemon-color/${id}`, () => getPokemonColor(id))
    : Promise.reject("Missing id");

const fetchPokemonWikiEntry = async (pokemonId: number) => {
  /* const response = await fetch(`/data/${pokemonId}.json`);
  if (
    response.headers.get("Content-Type")?.split(";")[0] ==
    "application/json"
  ) {
    const data = await response.json();
    if (pokemonId && data) {
      this.pokemonWikiEntries[pokemonId] = data;
    }
  } else {
    throw `Data has wrong type. Expected application/json, got ${
      response.headers.get("Content-Type")?.split(";")[0]
    }`;
  } */
};
