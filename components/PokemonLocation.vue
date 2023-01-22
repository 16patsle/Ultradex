<template>
  <span class="link-wrapper is-inline-flex is-align-items-center">
    <PokemonResource :resource="location" :fetch="store.fetchLocation">
      <template #default="{ resource }">
        {{ pokemonNameLocalized(resource as Location, store.language) }}
        <PokemonResource
          v-slot="slotProps"
          :resource="(resource as Location).region"
          :fetch="store.fetchRegion"
        >
          in
          {{
            pokemonNameLocalized(slotProps.resource as Region, store.language)
          }}
        </PokemonResource>
      </template>
      <template #else>
        {{ location.name }}
      </template>
    </PokemonResource>
  </span>
</template>

<script setup lang="ts">
import type { Location, NamedAPIResource, Region } from "@16patsle/pokeapi.js";

defineProps<{
  location: NamedAPIResource;
}>();

const store = usePokemonStore();
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.link-wrapper {
  height: 40px;
}
</style>
