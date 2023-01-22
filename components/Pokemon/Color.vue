<template>
  <template v-if="color">
    {{ pokemonNameLocalized(color) }}
  </template>
</template>

<script setup lang="ts">
import type { NamedAPIResource } from "@16patsle/pokeapi.js";

const props = defineProps<{ color: NamedAPIResource }>();

const { data: color } = await usePokemonColorData(idFromUrl(props.color.url));
</script>
