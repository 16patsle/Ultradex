<template>
  <div class="evolution-step-wrapper">
    <div>
      <p><PokemonLink :pokemon="evolutionStep.species" /></p>
      <ul v-if="props.evolutionStep.evolution_details">
        <PokemonEvolutionDetails
          v-for="(details, i) in props.evolutionStep.evolution_details"
          :key="i"
          :details="details"
        />
      </ul>
    </div>

    <PokemonEvolutionStep
      v-for="step in evolutionStep.evolves_to"
      :key="step.species.name"
      :evolutionStep="step"
    />
  </div>
</template>

<script setup>
import PokemonLink from "./PokemonLink.vue";
import PokemonEvolutionDetails from "./PokemonEvolutionDetails.vue";

const props = defineProps({
  evolutionStep: {
    type: Object,
    required: true,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.evolution-step-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
}

ul {
  list-style: disc;
  padding-left: 1.5em;
}
</style>
