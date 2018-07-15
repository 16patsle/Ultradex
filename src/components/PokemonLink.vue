<template>
  <router-link :to="'/pokemon/'+ pokemonId">{{pokemon.name}}</router-link>
</template>

<script>
export default {
  name: "PokemonLink",
  props: {
    pokemon: { type: Object, required: true }
  },
  computed: {
    pokemonId() {
      return /\S+\/([0-9]+)\//.exec(this.pokemon.url)[1];
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
