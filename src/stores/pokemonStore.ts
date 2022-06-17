import { defineStore } from "pinia";
import PokeApi from "@16patsle/pokeapi.js/dist/pokeapi.esm.js";
import { idFromUrl } from "../utils/idFromUrl";
import type { PokemonSpecies } from "@/types/PokemonSpecies";

interface State {
  pokemonData: NamedAPIResource[];
  pokemon: PokemonSpecies[];
  pokemonEvolutionChains: any[];
  pokemonWikiEntries: any[];
}

export const usePokemonStore = defineStore("pokemon", {
  state: (): State => ({
    pokemonData: [],
    pokemon: [],
    pokemonEvolutionChains: [],
    pokemonWikiEntries: [],
  }),
  actions: {
    async fetchPokemonSpecies(id: number) {
      if (id) {
        const data = await PokeApi.getPokemonSpecies(id);
        this.pokemon[id] = data;
      } else {
        const data = await PokeApi.getPokemonSpecies("?limit=1000");
        this.pokemonData = data.results;
      }
    },
    async fetchPokemonVariety(speciesId: number, varietyId: number) {
      const data = await PokeApi.getPokemon(varietyId);
      if (this.pokemon[speciesId]) {
        for (const varietyIndex in this.pokemon[speciesId].varieties) {
          if (
            this.pokemon[speciesId].varieties[varietyIndex].pokemon.name ===
            data.name
          ) {
            this.pokemon[speciesId].varieties[varietyIndex].pokemonData = data;
          }
        }
      }
    },
    async fetchPokemonVarietyForms(speciesId: number, varietyId: number) {
      const pokemon = this.pokemon[speciesId];
      for (const varietyIndex in pokemon.varieties) {
        const variety = pokemon.varieties[varietyIndex];
        if (idFromUrl(variety.pokemon.url) === varietyId) {
          for (const formIndex in variety.pokemonData?.forms) {
            const form = variety.pokemonData?.forms[formIndex];
            const formId = idFromUrl(form.url);
            form.data = await PokeApi.getPokemonForm(formId);
          }
        }
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
