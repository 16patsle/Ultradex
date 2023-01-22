<template>
  <PokemonResource
    v-slot="{ resource }"
    :resource="color"
    :storeArray="store.pokemonColors"
    :fetch="store.fetchPokemonColor"
  >
    {{ pokemonNameLocalized(resource, store.language) }}
  </PokemonResource>
</template>

<script setup lang="ts">
import type { NamedAPIResource } from "@16patsle/pokeapi.js";

defineProps<{ color: NamedAPIResource }>();

const store = usePokemonStore();
</script>
