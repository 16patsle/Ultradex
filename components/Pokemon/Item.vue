<template>
  <span class="link-wrapper is-inline-flex is-align-items-center">
    <template v-if="item">
      <!-- sprites.default can be null (example #900 Kleavor) -->
      <PokemonIcon
        v-if="item.sprites.default"
        :src="item.sprites.default"
        alt=""
        type="default"
      />
      {{ pokemonNameLocalized(item) }}
    </template>
    <template v-else>
      {{ props.item.name }}
    </template>
  </span>
</template>

<script setup lang="ts">
import type { NamedAPIResource } from "@16patsle/pokeapi.js";

const props = defineProps<{
  item: NamedAPIResource;
}>();

const { data: item } = await useItemData(idFromUrl(props.item.url));
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.link-wrapper {
  height: 40px;
}
</style>
