<template>
  <router-link :to="'/pokemon/' + pokemonId">{{ pokemonName }}</router-link>
</template>

<script setup>
import { computed } from "vue";
import { usePokemonStore } from "../stores/pokemonStore";
import { pokemonNameLocalized } from "../utils/pokemonNameLocalized";

const props = defineProps({
  pokemon: { type: Object, required: true },
});

const pokemonId = computed(() => /\S+\/([0-9]+)\//.exec(props.pokemon.url)[1]);
const pokemonName = computed(() => {
  const store = usePokemonStore();
  let pokemon = store.pokemon[pokemonId.value];
  if (pokemon) {
    return pokemonNameLocalized(pokemon);
  }
  let name = store.pokemonData[pokemonId.value - 1].name;
  return name.charAt(0).toUpperCase() + name.slice(1);
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
