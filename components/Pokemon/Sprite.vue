<template>
  <div class="sprite-wrapper">
    <img
      :src="sprite"
      :alt="capitalize(spriteName + ' sprite for ' + pokemonName)"
      loading="lazy"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  sprite: string;
  pokemonName: string;
  spriteName: string;
}>();
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.sprite-wrapper {
  position: relative;
  display: inline-block;
  width: 192px;
  height: 192px;
  margin: 0 auto;
}

img {
  width: 192px;
  height: 192px;
  image-rendering: pixelated;
  image-rendering: crisp-edges;
}

img:after {
  content: attr(alt);

  font-size: 1rem;
  color: rgb(100, 100, 100);
  line-height: 2;

  display: block;
  position: absolute;
  width: 192px;
  height: 192px;
  padding: 5px;
  left: 50%;
  margin-left: -96px;
  top: 50%;
  margin-top: -96px;
  padding-top: 15px;
  z-index: 2;
  background-color: #eee;
  border: 2px solid white;
}
</style>
