<template>
  <div class="pokemon-list">
    <h1>PokemonList</h1>
    <ul>
      <li v-for="pokemon in store.pokemonData" :key="pokemon.name">
        <PokemonLink :pokemon="pokemon" class="is-justify-content-center" />
      </li>
    </ul>
  </div>
</template>

<script setup>
import PokemonLink from "@/components/PokemonLink.vue";
import { onMounted } from "vue";
import { usePokemonStore } from "../stores/pokemonStore";

const store = usePokemonStore();

onMounted(() => {
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
});
</script>
