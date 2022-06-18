import { defineStore } from "pinia";
import { useRoute } from "vue-router";
import * as PokeApi from "@16patsle/pokeapi.js";
import { idFromUrl } from "../utils/idFromUrl";
import type {
  PokemonSpecies,
  Pokemon,
  PokemonForm,
  EvolutionChain,
  NamedAPIResource,
  Item,
  Location,
  Region,
} from "@16patsle/pokeapi.js";

interface State {
  pokemonList: NamedAPIResource[];
  pokemonSpecies: PokemonSpecies[];
  pokemonVarieties: Pokemon[];
  pokemonForms: PokemonForm[];
  pokemonEvolutionChains: EvolutionChain[];
  items: Item[];
  locations: Location[];
  regions: Region[];
  pokemonWikiEntries: any[];
  currentlyShowingId: number;
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
      items: [],
      locations: [],
      regions: [],
      pokemonWikiEntries: [],
      currentlyShowingId: Number(route.params.id),
    };
  },
  getters: {
    currentPokemon: (state) => state.pokemonSpecies[state.currentlyShowingId],
  },
  actions: {
    async fetchPokemonSpecies(id: number | null) {
      if (id) {
        const data = await PokeApi.getPokemonSpecies(id);
        this.pokemonSpecies[id] = data;
      } else {
        const data = await PokeApi.getPokemonSpecies("?limit=1000");
        this.pokemonList = data.results;
      }
    },
    async fetchPokemonVariety(speciesId: number, varietyId: number) {
      const data = await PokeApi.getPokemon(varietyId);
      if (this.pokemonSpecies[speciesId]) {
        for (const varietyIndex in this.pokemonSpecies[speciesId].varieties) {
          if (
            this.pokemonSpecies[speciesId].varieties[varietyIndex].pokemon
              .name === data.name
          ) {
            this.pokemonVarieties[varietyId] = data;
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
            this.pokemonVarieties[varietyId] = await PokeApi.getPokemon(
              varietyId
            );
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
      for (const formIndex in variety.forms) {
        const form = variety.forms[Number(formIndex)];
        const formId = idFromUrl(form.url);
        if (formId) {
          this.pokemonForms[formId] = await PokeApi.getPokemonForm(formId);
        }
      }
    },
    async fetchPokemonEvolutionChain(chainId: number) {
      const data = await PokeApi.getEvolutionChain(chainId);
      this.pokemonEvolutionChains[chainId] = data;
    },
    async fetchItem(itemId: number) {
      const data = await PokeApi.getItem(itemId);
      this.items[itemId] = data;
    },
    async fetchLocation(locationId: number) {
      const data = await PokeApi.getLocation(locationId);
      this.locations[locationId] = data;
    },
    async fetchRegion(regionId: number) {
      const data = await PokeApi.getRegion(regionId);
      this.regions[regionId] = data;
    },
    async fetchPokemonWikiEntry(pokemonId: number) {
      const response = await fetch(`/data/${pokemonId}.json`);
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
      }
    },
  },
});
