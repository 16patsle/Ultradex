<template>
  <div class="wiki-wrapper">
    <b-loading :is-full-page="false" :active="loading"></b-loading>
    <b-notification v-if="error" type="is-danger">
      <h2 class="subtitle">ERROR!</h2>
      <p>{{ JSON.stringify(error) }}</p>
    </b-notification>
    <div v-if="$store.state.pokemonWikiEntries[pokemonId]" class="columns">
      <div class="column">
        <b-collapse class="wiki-collapse">
          <h2 slot="trigger" slot-scope="props" class="subtitle wiki-entry-header"><fa-icon :icon="props.open ? 'caret-down' : 'caret-right'" fixed-width title="Show/hide wiki entry"/>Wiki entry</h2>
          <p v-html="$store.state.pokemonWikiEntries[pokemonId].text.introduction.html"></p>
          <b-collapse :open="false" class="wiki-collapse">
            <h3 slot="trigger" slot-scope="biologyProps"><fa-icon :icon="biologyProps.open ? 'caret-down' : 'caret-right'" fixed-width title="Show/hide section"/>{{ $store.state.pokemonWikiEntries[pokemonId].text.biology.title }}</h3>
            <p v-html="$store.state.pokemonWikiEntries[pokemonId].text.biology.html"></p>
          </b-collapse>
          <p class="copyright">&copy; Bulbapedia contributors, licensed under <a href="https://creativecommons.org/licenses/by-nc-sa/2.5/" target="_blank" rel="noopener">CC BY-NC-SA 2.5</a></p>
        </b-collapse>
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
div.wiki-wrapper {
  position: relative;
  min-height: 250px;
}

.copyright {
  padding-top: 8px;
  padding-left: 10px;
  font-size: 0.8rem;
}

h2.wiki-entry-header {
  padding-bottom: 10px;
}

.wiki-collapse p,
.wiki-collapse .wiki-collapse {
  padding-left: 31px;
}

.wiki-wrapper h3,
.wiki-wrapper h4,
.wiki-wrapper h5,
.wiki-wrapper h6 {
  color: #4a4a4a;
  font-weight: 400;
  line-height: 1.125;
  margin-bottom: 0.6666em;
}
</style>
