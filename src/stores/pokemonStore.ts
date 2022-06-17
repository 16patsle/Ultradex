import { defineStore } from "pinia";
import { useRoute } from "vue-router";
import PokeApi from "@16patsle/pokeapi.js/dist/pokeapi.esm.js";
import { idFromUrl } from "../utils/idFromUrl";
import type { PokemonSpecies } from "@/types/PokemonSpecies";
import type { Pokemon } from "@/types/Pokemon";
import type { PokemonForm } from "@/types/PokemonForm";

interface State {
  pokemonList: NamedAPIResource[];
  pokemonSpecies: PokemonSpecies[];
  pokemonVarieties: Pokemon[];
  pokemonForms: PokemonForm[];
  pokemonEvolutionChains: any[];
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
      pokemonWikiEntries: [],
      currentlyShowingId: Number(route.params.id),
    };
  },
  getters: {
    currentPokemon: (state) => state.pokemonSpecies[state.currentlyShowingId],
    findDefaultVariety: (state) => (speciesId: number) => {
      try {
        const species = state.pokemonSpecies[speciesId];
        const varietyData = species.varieties.find(
          (variety) => variety.is_default
        );
        const varietyId = idFromUrl(varietyData?.pokemon.url);
        return state.pokemonVarieties[varietyId];
      } catch {
        return undefined;
      }
    },
  },
  actions: {
    async fetchPokemonSpecies(id: number) {
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
    async fetchPokemonVarietyForms(varietyId: number) {
      const variety = this.pokemonVarieties[varietyId];
      if (!variety) {
        throw new Error(`No variety loaded with id ${varietyId}`);
      }
      for (const formIndex in variety.forms) {
        const form = variety.forms[Number(formIndex)];
        const formId = idFromUrl(form.url);
        this.pokemonForms[formId] = await PokeApi.getPokemonForm(formId);
      }
    },
    async fetchPokemonEvolutionChain(chainId: number) {
      const data = await PokeApi.getEvolutionChain(chainId);
      this.pokemonEvolutionChains[chainId] = data;
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
