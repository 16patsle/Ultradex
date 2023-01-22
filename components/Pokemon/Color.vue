<template>
  <PokemonResource
    v-slot="{ resource }"
    :resource="color"
    :fetch="store.fetchPokemonColor"
  >
    {{ pokemonNameLocalized(resource as PokemonColor, store.language) }}
  </PokemonResource>
</template>

<script setup lang="ts">
import type { NamedAPIResource, PokemonColor } from "@16patsle/pokeapi.js";

defineProps<{ color: NamedAPIResource }>();

const store = usePokemonStore();
</script>
