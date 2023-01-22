<template>
  <span class="link-wrapper is-inline-flex is-align-items-center">
    <PokemonResource
      :resource="item"
      :storeArray="store.items"
      :fetch="store.fetchItem"
    >
      <template v-slot="slotProps">
        <!-- sprites.default can be null (example #900 Kleavor) -->
        <PokemonIcon
          v-if="slotProps.resource.sprites.default"
          :src="slotProps.resource.sprites.default"
          alt=""
          type="default"
        />
        {{ pokemonNameLocalized(slotProps.resource, store.language) }}
      </template>
      <template #else>
        {{ item.name }}
      </template>
    </PokemonResource>
  </span>
</template>

<script setup lang="ts">
import type { NamedAPIResource } from "@16patsle/pokeapi.js";

defineProps<{
  item: NamedAPIResource;
}>();

const store = usePokemonStore();
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.link-wrapper {
  height: 40px;
}
</style>
