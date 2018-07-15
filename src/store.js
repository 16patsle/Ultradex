import Vue from "vue";
import Vuex from "vuex";
import PokeApi from "@16patsle/pokeapi.js/dist/pokeapi.esm.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pokemonData: null,
    pokemon: []
  },
  mutations: {
    getPokemon(state, { id, data }) {
      if (id) {
        state.pokemon[id] = data;
      } else {
        state.pokemonData = data.results;
      }
    }
  },
  actions: {
    getPokemon({ commit }, { id }) {
      if (id) {
        return PokeApi.getPokemonSpecies(id).then(data => {
          commit("getPokemon", {
            id,
            data
          });
        });
      } else {
        return PokeApi.getPokemonSpecies("?limit=1000").then(data => {
          commit("getPokemon", {
            id: null,
            data
          });
        });
      }
    }
  }
});
