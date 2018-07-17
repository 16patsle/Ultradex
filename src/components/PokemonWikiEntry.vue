<template>
  <div class="wrapper">
    <b-loading :is-full-page="false" :active="loading"></b-loading>
    <b-notification v-if="error" type="is-danger">
      <h2 class="subtitle">ERROR!</h2>
      <p>{{ error }}</p>
    </b-notification>
    <div v-if="$store.state.pokemonWikiEntries[pokemonId]" class="columns">
      <div class="column">
        <div>
          <h2 class="subtitle">Wiki entry</h2>
          <p v-html="$store.state.pokemonWikiEntries[pokemonId].text.introduction"></p>
          <p class="copyright">&copy; Bulbapedia contributors, licensed under <a href="https://creativecommons.org/licenses/by-nc-sa/2.5/" target="_blank" rel="noopener">CC BY-NC-SA 2.5</a></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PokemonWikiEntry",
  props: {
    pokemonId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      error: null
    };
  },
  computed: {},
  watch: {
    // fetch data again if the route changes
    pokemonId: "fetchPokemonWikiEntry"
  },
  created() {
    // fetch the pokemon data when the view is created
    this.fetchPokemonWikiEntry();
  },
  methods: {
    fetchPokemonWikiEntry() {
      if (!this.pokemonEntry) {
        this.loading = true;
        this.error = null;

        return this.$store
          .dispatch("getPokemonWikiEntry", {
            pokemonId: this.pokemonId
          })
          .then(() => {
            this.loading = false;
            this.$emit("loaded");
          })
          .catch(err => {
            this.loading = false;
            this.error = err;
          });
      } else {
        this.$emit("loaded");
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.wrapper {
  position: relative;
  min-height: 250px;
}

.copyright {
  padding-top: 8px;
  padding-left: 10px;
  font-size: 0.8rem;
}
</style>
