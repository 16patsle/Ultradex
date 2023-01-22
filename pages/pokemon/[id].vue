<template>
  <div class="pokemon-view">
    <PokemonPreviousNext :id="pokemon?.id" />
    <h1 v-if="pokemon && !error" class="title">
      #{{ idFormatted }} {{ pokemonName }}
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
const route = useRoute();
const store = usePokemonStore();

const { data: pokemon, error } = await usePokemonSpeciesData(
  Number(route.params.id)
);
const pokemonName = computed(
  () => pokemon.value && pokemonNameLocalized(pokemon.value, store.language)
);
const idFormatted = computed(() =>
  pokemon.value?.id ? formatPokemonId(pokemon.value.id) : formatPokemonId()
);
</script>

<style>
div.pokemon-view {
  position: relative;
  min-height: 300px;
}
</style>
