<template>
  <div class="evolution-chain-wrapper">
    <div v-if="chainData" class="notification">
      <PokemonEvolutionStep :evolutionStep="chainData.chain" />
    </div>
    <o-loading v-else :full-page="false" active></o-loading>
    <o-notification v-if="error" variant="danger">
      <h2 class="subtitle">ERROR!</h2>
      <p>{{ error }}</p>
    </o-notification>
  </div>
</template>

<script setup lang="ts">
import type { APIResource } from "@16patsle/pokeapi.js";

const props = defineProps<{
  chain: APIResource;
}>();

const { data: chainData, error } = await usePokemonEvolutionChainData(
  idFromUrl(props.chain.url)
);
</script>
