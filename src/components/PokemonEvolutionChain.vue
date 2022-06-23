<template>
  <div class="evolution-chain-wrapper">
    <PokemonResource
      :resource="chain"
      :storeArray="store.pokemonEvolutionChains"
      :fetch="store.fetchPokemonEvolutionChain"
    >
      <template #default="{ resource }">
        <div class="notification">
          <PokemonEvolutionStep :evolutionStep="resource.chain" />
        </div>
      </template>
      <template #else>
        <o-loading :full-page="false" active></o-loading>
      </template>
      <template #error="{ error }">
        ><o-notification variant="danger">
          <h2 class="subtitle">ERROR!</h2>
          <p>{{ error }}</p>
        </o-notification>
      </template>
    </PokemonResource>
  </div>
</template>

<script setup lang="ts">
import type { APIResource } from "@16patsle/pokeapi.js";
import { usePokemonStore } from "@/stores/pokemonStore";
import PokemonEvolutionStep from "./PokemonEvolutionStep.vue";
import PokemonResource from "./PokemonResource.vue";

defineProps<{
  chain: APIResource;
}>();

const store = usePokemonStore();
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
