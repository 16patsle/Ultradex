<template>
  <div class="sprite-wrapper">
    <img :src="sprite" :alt="spriteName + ' sprite for ' + pokemonName | capitalize">
  </div>
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
div.sprite-wrapper {
  position: relative;
  display: inline-block;
  width: 96px;
  height: 96px;
  margin: 0 auto;
}

img {
  width: 96px;
  height: 96px;
}

img:after {
  content: attr(alt);

  font-size: 12px;
  color: rgb(100, 100, 100);
  line-height: 2;

  display: block;
  position: absolute;
  width: 96px;
  height: 96px;
  left: 50%;
  margin-left: -48px;
  top: 50%;
  margin-top: -48px;
  padding-top: 15px;
  z-index: 2;
  background-color: #eee;
  border: 2px solid white;
}
</style>
