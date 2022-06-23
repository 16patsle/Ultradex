<template>
  <div v-if="flavorTextEntries" class="subtitle">
    <p>{{ pokemonFlavorTextLocalized }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { usePokemonStore } from "@/stores/pokemonStore";
import { findWithLanguage } from "@/utils/pokemonUtils";
import type { FlavorText } from "@16patsle/pokeapi.js";

const props = defineProps<{
  flavorTextEntries: FlavorText[];
}>();

const gameVersion = ref("red");

const store = usePokemonStore();

const pokemonFlavorTextLocalized = computed(() => {
  const filteredFlavorTextEntries = props.flavorTextEntries.filter(
    (text) => text.version.name === gameVersion.value
  );
  const flavorText = findWithLanguage(
    filteredFlavorTextEntries,
    store.language
  );
  if (flavorText) {
    return flavorText.flavor_text;
  } else {
    return findWithLanguage(filteredFlavorTextEntries)?.flavor_text ?? "";
  }
});
</script>
