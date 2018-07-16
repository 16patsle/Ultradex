<template>
  <img :src="sprite" :alt="'Default ' + spriteName + ' sprite for ' + pokemonName">
</template>

<script>
export default {
  name: "PokemonSprite",
  props: {
    sprite: { type: String, required: true },
    pokemonName: { type: String, required: true },
    spriteName: { type: String, required: true }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
  width: 96px;
  height: 96px;
}
</style>
