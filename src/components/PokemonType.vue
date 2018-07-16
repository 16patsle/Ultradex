<template>
  <span>{{ type }}</span>
</template>

<script>
export default {
  name: "PokemonType",
  props: {
    type: { type: String, required: true }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
span {
  border: 1px solid black;
  padding: 5px;
  margin: 5px;
  line-height: 3em;
}
</style>
