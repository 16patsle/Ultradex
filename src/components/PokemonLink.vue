<template>
  <router-link :to="'/pokemon/' + pokemonId">{{
    pokemonNameLocalized
  }}</router-link>
</template>

<script setup>
import { computed } from "vue";
import { usePokemonStore } from "../stores/pokemonStore";

const props = defineProps({
  pokemon: { type: Object, required: true },
});

const pokemonId = computed(() => /\S+\/([0-9]+)\//.exec(props.pokemon.url)[1]);
const pokemonNameLocalized = computed(() => {
  const store = usePokemonStore();
  let pokemon = store.pokemon[pokemonId.value];
  if (pokemon) {
    for (let name of pokemon.names) {
      if (name.language.name === "en") {
        return name.name;
      }
    }
  }
  let name = store.pokemonData[pokemonId.value - 1].name;
  return name.charAt(0).toUpperCase() + name.slice(1);
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
