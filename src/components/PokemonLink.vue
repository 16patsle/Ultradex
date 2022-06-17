<template>
  <div class="link-wrapper is-flex is-align-items-center">
    <PokemonSpriteIcon v-if="variety" :pokemonData="variety" />
    <div>
      <router-link :to="'/pokemon/' + pokemonId">{{ pokemonName }}</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NamedAPIResource } from "@/types/PokeApi";
import { handleError } from "@/utils/handleError";
import { idFromUrl } from "@/utils/idFromUrl";
import { computed, ref, watch } from "vue";
import { usePokemonStore } from "../stores/pokemonStore";
import { pokemonNameLocalized } from "../utils/pokemonNameLocalized";
import PokemonSpriteIcon from "./PokemonSpriteIcon.vue";

const props = defineProps<{
  pokemon: NamedAPIResource;
}>();

const store = usePokemonStore();

const error = ref("");

const pokemonId = computed(() => idFromUrl(props.pokemon.url));
const pokemonName = computed(() => {
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
  if (!variety.value) {
    error.value = "";

    try {
      requestIdleCallback(async () => {
        varietyId.value = await store.fetchDefaultPokemonVariety(
          pokemonId.value
        );
      });
    } catch (err) {
      error.value = handleError(err);
    }
  }
};

watch(props, fetchPokemonVariety);

fetchPokemonVariety();
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.link-wrapper {
  height: 40px;
}
</style>
