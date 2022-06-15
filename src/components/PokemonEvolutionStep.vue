<template>
  <div class="evolution-step-wrapper">
    <p><PokemonLink :pokemon="evolutionStep.species" /></p>
    <div v-if="details">
      <p v-if="details.trigger.name === 'use-item'">
        Using {{ details.item?.name }}
      </p>
      <p v-if="details.trigger.name === 'level-up'">After level up when</p>
      <p v-if="details.min_level">level > {{ details.min_level }}</p>
      <p v-if="details.min_happiness">
        happiness > {{ details.min_happiness }}
      </p>
      <p v-if="details.location">location is {{ details.location.name }}</p>
    </div>

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
<style scoped>
.evolution-step-wrapper {
  display: flex;
  flex-wrap: wrap;
}
</style>
