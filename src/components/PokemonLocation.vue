<template>
  <span class="link-wrapper is-inline-flex is-align-items-center">
    <PokemonResource
      :resource="location"
      :storeArray="store.locations"
      :fetch="store.fetchLocation"
    >
      <template #default="{ resource }">
        {{ pokemonNameLocalized(resource, store.language) }}
        <PokemonResource
          v-slot="slotProps"
          :resource="resource.region"
          :storeArray="store.regions"
          :fetch="store.fetchRegion"
        >
          in {{ pokemonNameLocalized(slotProps.resource, store.language) }}
        </PokemonResource>
      </template>
      <template #else>
        {{ location.name }}
      </template>
    </PokemonResource>
  </span>
</template>

<script setup lang="ts">
import type { NamedAPIResource } from "@16patsle/pokeapi.js";
import { usePokemonStore } from "@/stores/pokemonStore";
import { pokemonNameLocalized } from "@/utils/pokemonNameLocalized";
import PokemonResource from "./PokemonResource.vue";

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
