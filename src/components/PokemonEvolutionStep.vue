<template>
  <div class="evolution-step-wrapper">
    <p>Evolves from: <PokemonLink :pokemon="evolutionStep.species" /></p>

    <PokemonEvolutionStep
      v-for="step in evolutionStep.evolves_to"
      :key="step.species.name"
      :evolutionStep="step"
    />
  </div>
</template>

<script setup>
import { computed } from "vue";
import PokemonLink from "./PokemonLink.vue";

const props = defineProps({
  evolutionStep: {
    type: Object,
    required: true,
  },
});

const details = computed(() => props.evolutionStep.evolution_details?.[0]);
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
