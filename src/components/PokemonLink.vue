<template>
  <router-link :to="'/pokemon/' + pokemonId">{{
    pokemonNameLocalized
  }}</router-link>
</template>

<script>
import { usePokemonStore } from "../stores/pokemonStore";

export default {
  name: "PokemonLink",
  props: {
    pokemon: { type: Object, required: true },
  },
  computed: {
    pokemonId() {
      return /\S+\/([0-9]+)\//.exec(this.pokemon.url)[1];
    },
    pokemonNameLocalized() {
      const store = usePokemonStore();
      let pokemon = store.pokemon[this.pokemonId];
      if (pokemon) {
        for (let name of pokemon.names) {
          if (name.language.name === "en") {
            return name.name;
          }
        }
      }
      let name = store.pokemonData[this.pokemonId - 1].name;
      return name.charAt(0).toUpperCase() + name.slice(1);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
