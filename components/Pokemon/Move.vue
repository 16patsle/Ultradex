<template>
  <span class="is-inline-flex is-align-items-center">
    <template v-if="move">
      {{ pokemonNameLocalized(move) }}
    </template>
    <template v-else>
      {{ props.move.name }}
    </template>
  </span>
</template>

<script setup lang="ts">
import type { NamedAPIResource } from "@16patsle/pokeapi.js";

const props = defineProps<{
  move: NamedAPIResource;
}>();

const { data: move } = await useMoveData(idFromUrl(props.move.url));
</script>
