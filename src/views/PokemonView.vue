<template>
  <div class="pokemon-view container">
    <h1>Pokemon</h1>
    <h2>Name: {{getValue($route.params.id,'name')}}</h2>
  </div>
</template>

<script>
export default {
  name: "pokemon-view",
  components: {},
  mounted() {
    this.$store.dispatch("getPokemon", { id: this.$route.params.id });
    console.log("dispatch!");
  },
  methods: {
    getValue(id, property) {
      if (this.$store.state.pokemon[id]) {
        return this.$store.state.pokemon[id][property];
      } else {
        return undefined;
      }
    }
  }
};
</script>
