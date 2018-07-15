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
    this.$store.dispatch("getPokemon", { id: null }).then(() => {
      /*let requests = [];
      for (let pokemon of this.$store.state.pokemonData) {
        let pokemonId = /\S+\/([0-9]+)\//.exec(pokemon.url)[1];
        if (!this.$store.state.pokemon[pokemonId]) {
          requests.push(
            this.$store.dispatch("getPokemon", {
              id: pokemonId
            })
          );
        }
      }
      return Promise.all(requests);*/
    });
  }
};
</script>
