import { defineStore } from "pinia";
import type { NamedAPIResource } from "@16patsle/pokeapi.js";

interface State {
  pokemonList: NamedAPIResource[];
  pokemonWikiEntries: any[];
  language: string;
}

export const usePokemonStore = defineStore("pokemon", {
  state: (): State => {
    return {
      pokemonList: [],
      pokemonWikiEntries: [],
      language: "en",
    };
  },
  getters: {
    currentlyShowingId: () => {
      const route = useRoute();
      return Number(route.params.id);
    },
  },
  actions: {
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
