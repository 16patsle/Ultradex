<template>
  <div v-if="iconData.src" :class="iconData.type">
    <img :src="iconData.src" alt="" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { Pokemon } from "@/types/Pokemon";

const props = defineProps<{
  pokemonData: Pokemon;
}>();

const iconData = computed(() => {
  const icon =
    props.pokemonData?.sprites.versions["generation-vii"].icons.front_default;
  if (icon) {
    return {
      src: icon,
      type: "icon",
    };
  } else {
    return {
      src: props.pokemonData?.sprites.front_default,
      type: "default",
    };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.icon,
.icon img {
  width: 40px;
  height: 30px;
}

.default,
.default img {
  width: 30px;
  height: 30px;
}

img {
  image-rendering: pixelated;
  image-rendering: crisp-edges;
}
</style>
