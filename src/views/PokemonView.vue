<template>
  <div class="pokemon-view">
    <h1 v-if="pokemon && !loading && !error" class="title">
      Pokémon Species: {{ pokemonNameLocalized }}
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

<script setup>
import PokemonDetails from "@/components/PokemonDetails.vue";
import PokemonWikiEntry from "@/components/PokemonWikiEntry.vue";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { usePokemonStore } from "../stores/pokemonStore";

const loading = ref(false);
const error = ref(null);
const pokemon = ref(null);

const pokemonNameLocalized = computed(() => {
  for (let name of pokemon.value.names) {
    if (name.language.name === "en") {
      return name.name;
    }
  }
  return pokemon.value.name;
});

const fetchPokemon = async () => {
  loading.value = true;
  error.value = null;

  try {
    const store = usePokemonStore();
    const route = useRoute();
    await store.fetchPokemonSpecies({ id: route.params.id });
    loading.value = false;
    pokemon.value = store.pokemon[route.params.id];
  } catch (err) {
    loading.value = false;
    error.value = err;
  }
};

fetchPokemon();
</script>

<style>
div.pokemon-view {
  position: relative;
  min-height: 300px;
}
</style>
