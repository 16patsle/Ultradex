<template>
  <PokemonIcon
    v-if="iconData.src"
    :src="iconData.src"
    alt=""
    :type="iconData.type"
  />
</template>

<script setup lang="ts">
import type { Pokemon } from "@16patsle/pokeapi.js";

const props = defineProps<{
  pokemonData: Pokemon;
}>();

const iconData = computed(
  (): { src: string | null; type: "icon" | "default" } => {
    const icon =
      props.pokemonData?.sprites.versions["generation-vii"].icons.front_default;
    if (icon) {
      return {
        src: icon,
        type: "icon",
      };
    } else {
      return {
        src: props.pokemonData?.sprites.front_default,
        type: "default",
      };
    }
  }
);
</script>
