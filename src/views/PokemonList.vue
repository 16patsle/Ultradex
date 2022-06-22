<template>
  <div class="pokemon-list">
    <h1>PokemonList</h1>
    <ul>
      <RecycleScroller
        v-slot="{ item, active }"
        :items="store.pokemonList"
        :item-size="40"
        key-field="name"
      >
        <li>
          <PokemonLink
            :pokemon="item"
            :loadingPaused="!active"
            showId
            class="is-justify-content-center"
          />
        </li>
      </RecycleScroller>
    </ul>
  </div>
</template>

<script setup lang="ts">
import PokemonLink from "@/components/PokemonLink.vue";
import { onMounted } from "vue";
import { usePokemonStore } from "../stores/pokemonStore";

const store = usePokemonStore();

onMounted(() => {
  store.fetchPokemonSpecies(null).then(() => {
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
