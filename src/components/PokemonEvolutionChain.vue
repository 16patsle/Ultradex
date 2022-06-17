<template>
  <div class="evolution-chain-wrapper">
    <o-loading :full-page="false" :active="!chain"></o-loading>
    <o-notification v-if="error" variant="danger">
      <h2 class="subtitle">ERROR!</h2>
      <p>{{ error }}</p>
    </o-notification>
    <div v-if="chain" class="notification">
      <PokemonEvolutionStep :evolutionStep="chain.chain" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { usePokemonStore } from "../stores/pokemonStore";
import PokemonEvolutionStep from "./PokemonEvolutionStep.vue";

const props = defineProps<{
  chainId: number;
  speciesId: number;
}>();

const store = usePokemonStore();

const error = ref("");

const chain = computed(() => store.pokemonEvolutionChains[props.chainId]);

const fetchEvolutionChain = async () => {
  if (!store.pokemonEvolutionChains[props.chainId]) {
    error.value = "";

    try {
      await store.fetchPokemonEvolutionChain(props.chainId);
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message;
      } else {
        error.value = JSON.stringify(err);
      }
      console.error(err);
    }
  }
};

fetchEvolutionChain();
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
