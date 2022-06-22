<template>
  <div class="stats-wrapper notification">
    <PokemonStatItem v-if="pokemon.height" icon="arrows-alt-v">
      Height: {{ pokemon.height / 10 }} m
    </PokemonStatItem>
    <PokemonStatItem v-if="pokemon.weight" icon="weight-hanging">
      Weight: {{ pokemon.weight / 10 }} kg
    </PokemonStatItem>
    <PokemonStatItem
      v-for="stat in pokemon.stats"
      :key="stat.stat.name"
      :stat="stat"
      :class="'order-' + statOrder(stat.stat.name)"
    />
  </div>
</template>

<script setup lang="ts">
import type { Pokemon } from "@16patsle/pokeapi.js";
import PokemonStatItem from "@/components/PokemonStatItem.vue";
import { usePokemonStore } from "@/stores/pokemonStore";

defineProps<{
  pokemon: Pokemon;
}>();

const store = usePokemonStore();

// Use the order CSS property to improve the layout
const statOrder = (name: string) => {
  switch (name) {
    case "speed":
      return 1;
    case "hp":
      return 2;
    case "special-defense":
    case "special-attack":
    case "defense":
    case "attack":
      return 3;
    default:
      return null;
  }
};

const fetchStats = async () => {
  if (!store.stats.length) {
    await store.fetchPokemonStats();
  }
};

fetchStats();
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.stats-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.25rem;
  align-items: center;
}

.order-1 {
  order: 1;
}
.order-2 {
  order: 2;
}
.order-3 {
  order: 3;
}
</style>
