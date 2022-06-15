import { defineStore } from "pinia";
import PokeApi from "@16patsle/pokeapi.js/dist/pokeapi.esm.js";
import { idFromUrl } from "../utils/idFromUrl";

export const usePokemonStore = defineStore("pokemon", {
  state: () => ({
    pokemonData: [],
    pokemon: [],
    pokemonEvolutionChains: [],
    pokemonWikiEntries: [],
  }),
  actions: {
    async fetchPokemonSpecies({ id }) {
      if (id) {
        const data = await PokeApi.getPokemonSpecies(id);
        this.pokemon[id] = data;
      } else {
        const data = await PokeApi.getPokemonSpecies("?limit=1000");
        this.pokemonData = data.results;
      }
    },
    async fetchPokemonVariety({ speciesId, varietyId }) {
      const data = await PokeApi.getPokemon(varietyId);
      if (this.pokemon[speciesId]) {
        for (let varietyIndex in this.pokemon[speciesId].varieties) {
          if (
            this.pokemon[speciesId].varieties[varietyIndex].pokemon.name ===
            data.name
          ) {
            this.pokemon[speciesId].varieties[varietyIndex].pokemonData = data;
          }
        }
      }
    },
    async fetchPokemonVarietyForms({ speciesId, varietyId }) {
      const pokemon = this.pokemon[speciesId];
      for (let varietyIndex in pokemon.varieties) {
        const variety = pokemon.varieties[varietyIndex];
        if (idFromUrl(variety.pokemon.url) === varietyId) {
          for (let formIndex in variety.pokemonData.forms) {
            const form = variety.pokemonData.forms[formIndex];
            const formId = idFromUrl(form.url);
            form.data = await PokeApi.getPokemonForm(formId);
          }
        }
      }
    },
    async fetchPokemonEvolutionChain(chainId) {
      const data = await PokeApi.getEvolutionChain(chainId);
      this.pokemonEvolutionChains[chainId] = data;
    },
    async fetchPokemonWikiEntry({ pokemonId }) {
      const response = await fetch(`/data/${pokemonId}.json`);
      if (
        response.headers.get("Content-Type").split(";")[0] == "application/json"
      ) {
        const data = await response.json();
        if (pokemonId && data) {
          this.pokemonWikiEntries[pokemonId] = data;
        }
      } else {
        throw `Data has wrong type. Expected application/json, got ${
          response.headers.get("Content-Type").split(";")[0]
        }`;
      }
    },
  },
});
