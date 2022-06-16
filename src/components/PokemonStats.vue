<template>
  <div class="stats-wrapper notification">
    <PokemonStatItem v-if="height" icon="arrows-alt-v">
      Height: {{ height / 10 }} m
    </PokemonStatItem>
    <PokemonStatItem v-if="weight" icon="weight-hanging">
      Weight: {{ weight / 10 }} kg
    </PokemonStatItem>
    <PokemonStatItem
      v-for="stat in stats"
      :key="stat.stat.name"
      :icon="statIcon(stat.stat.name)"
    >
      {{ $titlecase(stat.stat.name.replace("-", " ").replace("hp", "HP")) }}:
      {{ stat.base_stat }}
    </PokemonStatItem>
  </div>
</template>

<script setup>
import PokemonStatItem from "@/components/PokemonStatItem.vue";

defineProps({
  height: { type: Number, required: false, default: null },
  weight: { type: Number, required: false, default: null },
  stats: { type: Array, required: true },
});

const statIcon = (name) => {
  switch (name) {
    case "speed":
      return "feather-alt";
    case "special-defense":
      return "shield-alt";
    case "special-attack":
      return "bolt";
    case "defense":
      return "shield-alt";
    case "attack":
      return "bolt";
    case "hp":
      return "heart";
    default:
      return null;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.stats-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.25rem;
  align-items: center;
}
</style>
