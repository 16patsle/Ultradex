<template>
  <div class="pokemon-list">
    <h1>PokemonList</h1>
    <ul>
      <li v-for="pokemon in $store.state.pokemonData" :key="pokemon.name"><PokemonLink :pokemon="pokemon"/></li>
    </ul>
  </div>
</template>

<script>
import PokemonLink from "@/components/PokemonLink.vue";

export default {
  name: "pokemonList",
  components: {
    PokemonLink
  },
  mounted() {
    this.$store.dispatch("getPokemon", { id: null });
  }
};
</script>
