<template>
  <div class="link-wrapper is-flex is-align-items-center">
    <PokemonSpriteIcon v-if="defaultVariety" :pokemonData="defaultVariety" />
    <div>
      <router-link :to="'/pokemon/' + pokemonId">{{ pokemonName }}</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { idFromUrl } from "@/utils/idFromUrl";
import { computed } from "vue";
import { usePokemonStore } from "../stores/pokemonStore";
import { pokemonNameLocalized } from "../utils/pokemonNameLocalized";
import PokemonSpriteIcon from "./PokemonSpriteIcon.vue";

const props = defineProps({
  pokemon: { type: Object, required: true },
});

const store = usePokemonStore();

const pokemonId = computed(() => idFromUrl(props.pokemon.url));
const pokemonName = computed(() => {
  const pokemon = store.pokemonSpecies[pokemonId.value];
  if (pokemon) {
    return pokemonNameLocalized(pokemon);
  }
  const name = store.pokemonList[pokemonId.value - 1]?.name;
  return name ? name.charAt(0).toUpperCase() + name.slice(1) : "";
});
const defaultVariety = computed(() =>
  store.findDefaultVariety(pokemonId.value)
);
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.link-wrapper {
  height: 40px;
}
</style>
