<template>
  <span v-if="colorData">{{
    pokemonNameLocalized(colorData, store.language)
  }}</span>
</template>

<script setup lang="ts">
import { computed, watch } from "vue";
import { usePokemonStore } from "@/stores/pokemonStore";
import { idFromUrl } from "@/utils/idFromUrl";
import type { NamedAPIResource } from "@16patsle/pokeapi.js";
import { pokemonNameLocalized } from "@/utils/pokemonNameLocalized";

const props = defineProps<{ color: NamedAPIResource }>();

const store = usePokemonStore();

const colorId = computed(() => idFromUrl(props.color.url));

const colorData = computed(() =>
  colorId.value ? store.pokemonColors[colorId.value] : null
);

const fetchColor = async () => {
  if (!colorData.value && colorId.value) {
    await store.fetchPokemonColor(colorId.value);
  }
};

watch(() => props.color, fetchColor);

fetchColor();
</script>
