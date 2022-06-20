<template>
  <div class="is-flex">
    <div class="column">
      <PokemonLink v-if="previousPokemon" :pokemon="previousPokemon" />
    </div>
    <div class="column">
      <PokemonLink
        v-if="nextPokemon"
        :pokemon="nextPokemon"
        class="is-flex-direction-row-reverse is-justify-content-end"
      />
    </div>
  </div>
</template>

<script setup>
import { usePokemonStore } from "@/stores/pokemonStore";
import { computed } from "vue";
import PokemonLink from "./PokemonLink.vue";

const store = usePokemonStore();

const currentIndex = computed(() => store.currentlyShowingId - 1); // pokemonList is 0-indexed
const previousPokemon = computed(
  () => store.pokemonList[currentIndex.value - 1]
);
const nextPokemon = computed(() => store.pokemonList[currentIndex.value + 1]);
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
