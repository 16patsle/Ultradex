<template>
  <router-link
    :to="'/pokemon/' + pokemonId"
    class="link-wrapper is-flex is-align-items-center"
  >
    <slot />
    <PokemonSpriteIcon v-if="variety" :pokemonData="variety" :lazy="lazyIcon" />
    <div v-else class="icon-placeholder" />
    <div>{{ pokemonName }}</div>
  </router-link>
</template>

<script setup lang="ts">
import type { NamedAPIResource } from "@16patsle/pokeapi.js";
import { handleError } from "@/utils/handleError";
import { idFromUrl } from "@/utils/idFromUrl";
import { computed, ref, watch } from "vue";
import { usePokemonStore } from "../stores/pokemonStore";
import { pokemonNameLocalized } from "../utils/pokemonNameLocalized";
import PokemonSpriteIcon from "./PokemonSpriteIcon.vue";

const props = withDefaults(
  defineProps<{
    pokemon: NamedAPIResource;
    loadingPaused?: boolean;
    lazyIcon?: boolean;
  }>(),
  {
    loadingPaused: false,
    lazyIcon: false,
  }
);

const store = usePokemonStore();

const error = ref("");

const pokemonId = computed(() => idFromUrl(props.pokemon.url));
const pokemonName = computed(() => {
  if (!pokemonId.value) {
    return props.pokemon.name;
  }
  const pokemon = store.pokemonSpecies[pokemonId.value];
  if (pokemon) {
    return pokemonNameLocalized(pokemon);
  }
  const name = store.pokemonList[pokemonId.value - 1]?.name;
  return name ? name.charAt(0).toUpperCase() + name.slice(1) : "";
});
const varietyId = ref<number | undefined>(undefined);

const variety = computed(() => {
  if (varietyId.value) {
    return store.pokemonVarieties[varietyId.value];
  } else {
    return undefined;
  }
});

const fetchPokemonVariety = async () => {
  if (!variety.value && !props.loadingPaused) {
    error.value = "";

    try {
      requestIdleCallback(async () => {
        if (pokemonId.value) {
          varietyId.value = await store.fetchDefaultPokemonVariety(
            pokemonId.value
          );
        }
      });
    } catch (err) {
      error.value = handleError(err);
    }
  }
};

watch(props, () => {
  varietyId.value = undefined;
  fetchPokemonVariety();
});

fetchPokemonVariety();
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.link-wrapper {
  height: 40px;
}

.icon-placeholder {
  width: 40px;
  height: 40px;
}
</style>
