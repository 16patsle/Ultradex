<template>
  <h2>Name: {{pokemonNameLocalized}}</h2>
</template>

<script>
export default {
  name: "PokemonDetails",
  props: {
    pokemon: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    pokemonNameLocalized() {
      for (let name of this.pokemon.names) {
        if (name.language.name === "en") {
          return name.name;
        }
      }
      return this.pokemon.name;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
