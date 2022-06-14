import Vue from "vue";
import Vuex from "vuex";
import PokeApi from "@16patsle/pokeapi.js/dist/pokeapi.esm.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pokemonData: null,
    pokemon: [],
    pokemonWikiEntries: [],
  },
  mutations: {
    getPokemonSpecies(state, { id, data }) {
      if (id) {
        state.pokemon[id] = data;
      } else {
        state.pokemonData = data.results;
      }
    },
    getPokemonVariety(state, { speciesId, data }) {
      if (state.pokemon[speciesId]) {
        for (let varietyIndex in state.pokemon[speciesId].varieties) {
          if (
            state.pokemon[speciesId].varieties[varietyIndex].pokemon.name ===
            data.name
          ) {
            state.pokemon[speciesId].varieties[varietyIndex].pokemonData = data;
          }
        }
      }
    },
    getPokemonWikiEntry(state, { pokemonId, data }) {
      if (pokemonId && data) {
        state.pokemonWikiEntries[pokemonId] = data;
      }
    },
  },
  actions: {
    getPokemonSpecies({ commit }, { id }) {
      if (id) {
        return PokeApi.getPokemonSpecies(id).then((data) => {
          commit("getPokemonSpecies", {
            id,
            data,
          });
        });
      } else {
        return PokeApi.getPokemonSpecies("?limit=1000").then((data) => {
          commit("getPokemonSpecies", {
            id: null,
            data,
          });
        });
      }
    },
    getPokemonVariety({ commit }, { speciesId, varietyId }) {
      return PokeApi.getPokemon(varietyId).then((data) => {
        commit("getPokemonVariety", {
          speciesId,
          varietyId,
          data,
        });
      });
    },
    getPokemonWikiEntry({ commit }, { pokemonId }) {
      return fetch(`./data/${pokemonId}.json`)
        .then((response) => {
          if (
            response.headers.get("Content-Type").split(";")[0] ==
            "application/json"
          ) {
            return response.json();
          } else {
            throw `Data has wrong type. Expected application/json, got ${
              response.headers.get("Content-Type").split(";")[0]
            }`;
          }
        })
        .then((data) => {
          commit("getPokemonWikiEntry", {
            pokemonId,
            data,
          });
        });
    },
  },
});
