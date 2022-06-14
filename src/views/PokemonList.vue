<template>
  <div class="pokemon-list">
    <h1>PokemonList</h1>
    <ul>
      <li v-for="pokemon in pokemonData" :key="pokemon.name">
        <PokemonLink :pokemon="pokemon" />
      </li>
    </ul>
  </div>
</template>

<script>
import PokemonLink from "@/components/PokemonLink.vue";
import { usePokemonStore } from "../stores/pokemonStore";

export default {
  name: "pokemonList",
  components: {
    PokemonLink,
  },
  computed: {
    pokemonData() {
      const store = usePokemonStore();
      return store.pokemonData;
    },
  },
  mounted() {
    const store = usePokemonStore();
    store.fetchPokemonSpecies({ id: null }).then(() => {
      /*let requests = [];
      for (let pokemon of store.pokemonData) {
        let pokemonId = /\S+\/([0-9]+)\//.exec(pokemon.url)[1];
        if (!store.pokemon[pokemonId]) {
          requests.push(
            store.fetchPokemonSpecies({
              id: pokemonId
            })
          );
        }
      }
      return Promise.all(requests);*/
    });
  },
};
</script>
