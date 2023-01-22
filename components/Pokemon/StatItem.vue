<template>
  <div class="stat py-1">
    <div class="icon is-medium">
      <fa-icon
        :icon="icon || statIcon(stat?.stat.name)"
        size="lg"
        fixed-width
      />
    </div>
    <p v-if="statData">
      {{ pokemonNameLocalized(statData, store.language) }}:
      {{ stat?.base_stat }}
    </p>
    <p v-else><slot /></p>
  </div>
</template>

<script setup lang="ts">
import type { PokemonStat } from "@16patsle/pokeapi.js";

const props = withDefaults(
  defineProps<{ icon?: string; stat?: PokemonStat }>(),
  {
    icon: "",
    stat: undefined,
  }
);

const store = usePokemonStore();

const statId = computed(() => idFromUrl(props.stat?.stat.url));
const { stats } = await usePokemonStatsData();
const statData = computed(() =>
  statId.value && stats.value ? stats.value[statId.value] : undefined
);

const statIcon = (name = "") => {
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
      return "";
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.stat {
  font-size: 1.1rem;
}

.stat div,
.stat p {
  display: inline-block;
}
</style>
