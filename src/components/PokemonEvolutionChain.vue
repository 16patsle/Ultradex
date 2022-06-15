<template>
  <div class="evolution-chain-wrapper">
    <o-loading :full-page="false" :active="loading"></o-loading>
    <o-notification v-if="error" variant="danger">
      <h2 class="subtitle">ERROR!</h2>
      <p>{{ error }}</p>
    </o-notification>
    <div v-if="chain">
      <PokemonEvolutionStep :evolutionStep="chain.chain" />
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { usePokemonStore } from "../stores/pokemonStore";
import PokemonEvolutionStep from "./PokemonEvolutionStep.vue";

const props = defineProps({
  chainId: {
    type: String,
    required: true,
  },
  speciesId: {
    type: String,
    required: true,
  },
});

const store = usePokemonStore();

const loading = ref(false);
const error = ref(false);

const chain = computed(() => store.pokemonEvolutionChains[props.chainId]);

const fetchEvolutionChain = async () => {
  if (!store.pokemonEvolutionChains[props.chainId]) {
    loading.value = true;
    error.value = null;

    try {
      await store.fetchPokemonEvolutionChain(props.chainId);
      loading.value = false;
    } catch (err) {
      loading.value = false;
      error.value = err;
      console.error(err);
    }
  }
};

fetchEvolutionChain();
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
