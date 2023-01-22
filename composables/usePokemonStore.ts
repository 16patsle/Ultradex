import { defineStore } from "pinia";
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
import type {
  PokemonSpecies,
  Pokemon,
  PokemonForm,
  EvolutionChain,
  NamedAPIResource,
  Item,
  Location,
  Move,
  Region,
  Language,
  Stat,
  Type,
  Version,
  PokemonColor,
} from "@16patsle/pokeapi.js";

interface State {
  pokemonList: NamedAPIResource[];
  pokemonSpecies: PokemonSpecies[];
  pokemonVarieties: Pokemon[];
  pokemonForms: PokemonForm[];
  pokemonEvolutionChains: EvolutionChain[];
  pokemonColors: PokemonColor[];
  items: Item[];
  locations: Location[];
  moves: Move[];
  regions: Region[];
  pokemonWikiEntries: any[];
  currentlyShowingId: number;
  language: string;
  languages: Language[];
  stats: Stat[];
  types: Type[];
  gameVersions: Version[];
}

export const usePokemonStore = defineStore("pokemon", {
  state: (): State => {
    const route = useRoute();
    return {
      pokemonList: [],
      pokemonSpecies: [],
      pokemonVarieties: [],
      pokemonForms: [],
      pokemonEvolutionChains: [],
      pokemonColors: [],
      items: [],
      locations: [],
      moves: [],
      regions: [],
      pokemonWikiEntries: [],
      currentlyShowingId: Number(route.params.id),
      language: "en",
      languages: [],
      stats: [],
      types: [],
      gameVersions: [],
    };
  },
  getters: {
    currentPokemon: (state) => state.pokemonSpecies[state.currentlyShowingId],
  },
  actions: {
    async fetchPokemonSpecies(id: number | null) {
      if (id) {
        const data = await getPokemonSpecies(id);
        this.pokemonSpecies[id] = data;
        return data;
      } else {
        const data = await getPokemonSpecies("?limit=1000");
        this.pokemonList = data.results;
      }
    },
    async fetchPokemonVariety(speciesId: number, varietyId: number) {
      const data = await getPokemon(varietyId);
      if (this.pokemonSpecies[speciesId]) {
        for (const varietyIndex in this.pokemonSpecies[speciesId].varieties) {
          if (
            this.pokemonSpecies[speciesId].varieties[varietyIndex].pokemon
              .name === data.name
          ) {
            this.pokemonVarieties[varietyId] = data;
            return data;
          }
        }
      }
    },
    async fetchDefaultPokemonVariety(
      speciesId: number
    ): Promise<number | undefined> {
      if (!this.pokemonSpecies[speciesId]) {
        await this.fetchPokemonSpecies(speciesId);
      }
      for (const varietyIndex in this.pokemonSpecies[speciesId].varieties) {
        const variety = this.pokemonSpecies[speciesId].varieties[varietyIndex];
        if (variety.is_default) {
          const varietyId = idFromUrl(variety.pokemon.url);
          if (varietyId) {
            this.pokemonVarieties[varietyId] = await getPokemon(varietyId);
            return varietyId;
          }
        }
      }
    },
    async fetchPokemonVarietyForms(varietyId: number) {
      const variety = this.pokemonVarieties[varietyId];
      if (!variety) {
        throw new Error(`No variety loaded with id ${varietyId}`);
      }
      const formValues: PokemonForm[] = [];
      for (const formIndex in variety.forms) {
        const form = variety.forms[Number(formIndex)];
        const formId = idFromUrl(form.url);
        if (formId) {
          this.pokemonForms[formId] = await getPokemonForm(formId);
          formValues.push(this.pokemonForms[formId]);
        }
      }
      return formValues;
    },
    async fetchPokemonEvolutionChain(chainId: number) {
      const data = await getEvolutionChain(chainId);
      this.pokemonEvolutionChains[chainId] = data;
      return data;
    },
    async fetchItem(itemId: number) {
      const data = await getItem(itemId);
      this.items[itemId] = data;
      return data;
    },
    async fetchLocation(locationId: number) {
      const data = await getLocation(locationId);
      this.locations[locationId] = data;
      return data;
    },
    async fetchMove(moveId: number) {
      const data = await getMove(moveId);
      this.moves[moveId] = data;
      return data;
    },
    async fetchRegion(regionId: number) {
      const data = await getRegion(regionId);
      this.regions[regionId] = data;
      return data;
    },
    async fetchLanguages() {
      const languages = (await getLanguage("")).results;
      const promises = [];

      for (const languageIndex in languages) {
        const language = languages[Number(languageIndex)];
        const languageId = idFromUrl(language.url);
        if (languageId) {
          promises[languageId] = getLanguage(languageId);
        }
      }

      (await Promise.all(promises)).forEach((language, i) => {
        this.languages[i] = language;
      });

      // TODO: Should probably fix missing names in the API instead of this hack
      this.languages[11].names.push({
        language: {
          name: "en",
          url: "/api/v2/language/9/",
        },
        name: "Japanese",
      });
      this.languages[12].names.push({
        language: {
          name: "en",
          url: "/api/v2/language/9/",
        },
        name: "Simplified Chinese",
      });

      return this.languages;
    },
    async fetchPokemonStats() {
      const stats = (await getStat("")).results;
      const promises = [];

      for (const statIndex in stats) {
        const stat = stats[Number(statIndex)];
        const statId = idFromUrl(stat.url);
        if (statId) {
          promises[statId] = getStat(statId);
        }
      }

      (await Promise.all(promises)).forEach((stat, i) => {
        this.stats[i] = stat;
      });
    },
    async fetchPokemonType(typeId: number) {
      const data = await getType(typeId);
      this.types[typeId] = data;
      return data;
    },
    async fetchGameVersion(versionId: number) {
      const data = await getVersion(versionId);
      this.gameVersions[versionId] = data;
      return data;
    },
    async fetchPokemonColor(colorId: number) {
      const data = await getPokemonColor(colorId);
      this.pokemonColors[colorId] = data;
      return data;
    },
    async fetchPokemonWikiEntry(pokemonId: number) {
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
    },
  },
});
