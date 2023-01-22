<template>
  <span class="is-inline-flex is-align-items-center">
    <PokemonResource :resource="move" :fetch="store.fetchMove">
      <template v-slot="slotProps">
        {{ pokemonNameLocalized(slotProps.resource as Move, store.language) }}
      </template>
      <template #else>
        {{ move.name }}
      </template>
    </PokemonResource>
  </span>
</template>

<script setup lang="ts">
import type { Move, NamedAPIResource } from "@16patsle/pokeapi.js";

defineProps<{
  move: NamedAPIResource;
}>();

const store = usePokemonStore();
</script>
