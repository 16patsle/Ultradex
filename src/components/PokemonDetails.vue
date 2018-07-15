<template>
  <h2>Name: {{pokemon.name}}</h2>
</template>

<script>
export default {
  name: "PokemonLink",
  props: {
    pokemon: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
