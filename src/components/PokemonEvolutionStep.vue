<template>
  <div class="evolution-step-wrapper">
    <div class="block">
      <p><PokemonLink :pokemon="evolutionStep.species" /></p>
      <ul v-if="evolutionStep.evolution_details">
        <PokemonEvolutionDetails
          v-for="(details, i) in evolutionStep.evolution_details"
          :key="i"
          :details="details"
        />
      </ul>
    </div>

    <div class="block ml-5">
      <PokemonEvolutionStep
        v-for="step in evolutionStep.evolves_to"
        :key="step.species.name"
        :evolutionStep="step"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ChainLink } from "@16patsle/pokeapi.js";
import PokemonLink from "./PokemonLink.vue";
import PokemonEvolutionDetails from "./PokemonEvolutionDetails.vue";

defineProps<{
  evolutionStep: ChainLink;
}>();
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  list-style: disc;
  padding-left: 1.5em;
}
</style>
