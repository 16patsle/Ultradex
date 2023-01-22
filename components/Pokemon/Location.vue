<template>
  <span class="link-wrapper is-inline-flex is-align-items-center">
    <template v-if="location">
      {{ pokemonNameLocalized(location) }}
      <template v-if="region">
        in
        {{ pokemonNameLocalized(region) }}
      </template>
    </template>
    <template v-else>
      {{ props.location.name }}
    </template>
  </span>
</template>

<script setup lang="ts">
import type { NamedAPIResource } from "@16patsle/pokeapi.js";

const props = defineProps<{
  location: NamedAPIResource;
}>();

const { data: location } = await useLocationData(idFromUrl(props.location.url));
const { data: region } = await useRegionData(
  idFromUrl(location.value?.region.url)
);
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.link-wrapper {
  height: 40px;
}
</style>
