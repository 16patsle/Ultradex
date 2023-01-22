<template>
  <NuxtLink
    :to="'/pokemon/' + pokemonId"
    class="link-wrapper is-flex is-align-items-center"
  >
    <slot />
    <PokemonSpriteIcon v-if="variety" :pokemonData="variety" :lazy="lazyIcon" />
    <div v-else class="icon-placeholder" />
    <div v-if="showId">#{{ pokemonIdFormatted }}</div>
    &nbsp;
    <div>
      {{ pokemonName }}
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { NamedAPIResource } from "@16patsle/pokeapi.js";

const props = withDefaults(
  defineProps<{
    pokemon: NamedAPIResource;
    loadingPaused?: boolean;
    lazyIcon?: boolean;
    showId?: boolean;
  }>(),
  {
    loadingPaused: false,
    lazyIcon: false,
    showId: false,
  }
);

const pokemonId = computed(() => idFromUrl(props.pokemon.url));
const { data: variety } = await useDefaultPokemonVarietyData(pokemonId.value);
const { data: pokemon } = await usePokemonSpeciesData(pokemonId.value);
const { pokemonList } = await usePokemonSpeciesListData();
const pokemonName = computed(() => {
  if (!pokemonId.value) {
    return props.pokemon.name;
  }
  if (pokemon.value) {
    return pokemonNameLocalized(pokemon.value);
  }
  const name = pokemonList.value?.results[pokemonId.value - 1]?.name;
  return name ? name.charAt(0).toUpperCase() + name.slice(1) : "";
});
const pokemonIdFormatted = computed(() =>
  pokemonId.value ? formatPokemonId(pokemonId.value) : "000"
);
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.link-wrapper {
  height: 40px;
}

.icon-placeholder {
  width: 40px;
  height: 40px;
}
</style>
