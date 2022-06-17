<template>
  <div class="pokemon-view">
    <h1 v-if="pokemon && !loading && !error" class="title">
      Pokémon Species: {{ pokemonName }}
    </h1>
    <h1 v-else class="title">Pokémon Species</h1>
    <o-loading :full-page="false" :active="loading"></o-loading>
    <o-notification v-if="error" variant="danger">
      <h2 class="subtitle">ERROR!</h2>
      <p>{{ error.message }}</p>
    </o-notification>
    <div v-if="pokemon && !loading && !error" style="padding-bottom: 50px">
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

const loading = ref(false);
const error = ref<any>(null);
const pokemon = ref(null);

const pokemonName = computed(() => pokemonNameLocalized(pokemon.value));

const route = useRoute();

const fetchPokemon = async () => {
  loading.value = true;
  error.value = null;

  try {
    const store = usePokemonStore();
    await store.fetchPokemonSpecies(route.params.id);
    loading.value = false;
    pokemon.value = store.pokemon[route.params.id];
  } catch (err) {
    loading.value = false;
    error.value = err;
  }
};

watch(
  () => route.params.id,
  () => fetchPokemon()
);

fetchPokemon();
</script>

<style>
div.pokemon-view {
  position: relative;
  min-height: 300px;
}
</style>
