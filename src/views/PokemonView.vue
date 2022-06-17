<template>
  <div class="pokemon-view">
    <h1 v-if="pokemon && !error" class="title">
      Pokémon Species: {{ pokemonName }}
    </h1>
    <h1 v-else class="title">Pokémon Species</h1>
    <o-loading :full-page="false" :active="!pokemon"></o-loading>
    <o-notification v-if="error" variant="danger">
      <h2 class="subtitle">ERROR!</h2>
      <p>{{ error }}</p>
    </o-notification>
    <div v-if="pokemon && !error" style="padding-bottom: 50px">
      <PokemonDetails :pokemon="pokemon" />
      <PokemonWikiEntry :pokemonId="pokemon.id" />
    </div>
  </div>
</template>

<script setup lang="ts">
import PokemonDetails from "@/components/PokemonDetails.vue";
import PokemonWikiEntry from "@/components/PokemonWikiEntry.vue";
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { usePokemonStore } from "../stores/pokemonStore";
import { pokemonNameLocalized } from "@/utils/pokemonNameLocalized";
import { handleError } from "@/utils/handleError";

const route = useRoute();
const store = usePokemonStore();

const error = ref("");

const pokemon = computed(() => store.currentPokemon);
const pokemonName = computed(() => pokemonNameLocalized(pokemon.value));

const fetchPokemon = async () => {
  if (!store.currentlyShowingId) {
    return;
  }
  error.value = "";

  try {
    await store.fetchPokemonSpecies(store.currentlyShowingId);
  } catch (err) {
    error.value = handleError(err);
  }
};

watch(
  () => route.params.id,
  (newId) => {
    store.currentlyShowingId = Number(newId);
    fetchPokemon();
  }
);

fetchPokemon();
</script>

<style>
div.pokemon-view {
  position: relative;
  min-height: 300px;
}
</style>
