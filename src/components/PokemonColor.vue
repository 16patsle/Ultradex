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
import { usePokemonStore } from "@/stores/pokemonStore";
import type { NamedAPIResource } from "@16patsle/pokeapi.js";
import { pokemonNameLocalized } from "@/utils/pokemonNameLocalized";
import PokemonResource from "./PokemonResource.vue";

defineProps<{ color: NamedAPIResource }>();

const store = usePokemonStore();
</script>
