<template>
  <div class="stat py-1">
    <div class="icon is-medium">
      <fa-icon :icon="icon || statIcon(stat.stat.name)" size="lg" fixed-width />
    </div>
    <p v-if="statData">
      {{ pokemonNameLocalized(statData, store.language) }}: {{ stat.base_stat }}
    </p>
    <p v-else><slot /></p>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { usePokemonStore } from "@/stores/pokemonStore";
import type { PokemonStat } from "@16patsle/pokeapi.js";
import { idFromUrl } from "@/utils/idFromUrl";
import { pokemonNameLocalized } from "@/utils/pokemonNameLocalized";

const props = withDefaults(
  defineProps<{ icon?: string; stat?: PokemonStat }>(),
  {
    icon: "",
    stat: undefined,
  }
);

const store = usePokemonStore();

const statId = computed(() => idFromUrl(props.stat?.stat.url));
const statData = computed(() =>
  statId.value ? store.stats[statId.value] : undefined
);

const statIcon = (name: string) => {
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
