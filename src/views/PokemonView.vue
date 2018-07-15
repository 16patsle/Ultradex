<template>
  <div class="pokemon-view">
    <h1>Pokemon</h1>
    <div v-if="loading" class="loading">
      Loading...
    </div>
    <div v-if="error" class="error">
      {{ error }}
    </div>
    <PokemonDetails v-if="this.$store.state.pokemon[this.$route.params.id]" :pokemon="this.$store.state.pokemon[this.$route.params.id]"/>
  </div>
</template>

<script>
import PokemonDetails from "@/components/PokemonDetails.vue";

export default {
  name: "pokemon-view",
  components: {
    PokemonDetails
  },
  data() {
    return {
      loading: false,
      error: null
    };
  },
  watch: {
    // fetch data again if the route changes
    $route: "fetchPokemon"
  },
  created() {
    // fetch the pokemon data when the view is created
    this.fetchPokemon();
  },
  methods: {
    fetchPokemon() {
      this.loading = true;

      return this.$store
        .dispatch("getPokemon", { id: this.$route.params.id })
        .then(() => {
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
          this.error = err;
        });
    }
  }
};
</script>
