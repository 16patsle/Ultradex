<template>
  <div class="evolution-step-wrapper">
    <p>Evolves from: <PokemonLink :pokemon="evolutionStep.species" /></p>

    <PokemonEvolutionStep
      v-for="step in evolutionSteps"
      :key="step.species.name"
      :evolutionStep="step"
    />
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { mapEvolutionStep } from "@/utils/mapEvolutionStep";
import PokemonLink from "./PokemonLink.vue";

const props = defineProps({
  evolutionStep: {
    type: Object,
    required: true,
  },
});

// Create array of arrays with evolution_details and evolves_to
const evolutionSteps = computed(() =>
  mapEvolutionStep(props.evolutionStep.evolves_to)
);
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
