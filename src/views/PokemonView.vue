<template>
  <div class="pokemon-view">
    <h1 v-if="pokemon && !loading && !error" class="title">Pokémon Species: {{ pokemonNameLocalized }}</h1>
    <h1 v-else class="title">Pokémon Species</h1>
    <b-loading :is-full-page="false" :active="loading"></b-loading>
    <b-notification v-if="error" type="is-danger">
      <h2 class="subtitle">ERROR!</h2>
      <p>{{ error }}</p>
    </b-notification>
    <div v-if="pokemon && !loading && !error" style="padding-bottom: 50px;">
      <PokemonDetails :pokemon="pokemon"/>
      <PokemonWikiEntry :pokemonId="pokemon.id"/>
    </div>
  </div>
</template>

<script>
import PokemonDetails from "@/components/PokemonDetails.vue";
import PokemonWikiEntry from "@/components/PokemonWikiEntry.vue";

export default {
  name: "pokemon-view",
  components: {
    PokemonDetails,
    PokemonWikiEntry
  },
  data() {
    return {
      loading: false,
      error: null,
      pokemon: null
    };
  },
  computed: {
    /*pokemon() {
      return this.$store.state.pokemon[this.$route.params.id];
    },*/
    pokemonNameLocalized() {
      if (this.pokemon) {
        for (let name of this.pokemon.names) {
          if (name.language.name === "en") {
            return name.name;
          }
        }
        return this.pokemon.name;
      }
    },
    pokemonGenusLocalized() {
      if (this.pokemon) {
        for (let genus of this.pokemon.genera) {
          if (genus.language.name === "en") {
            return genus.genus;
          }
        }
      }
    }
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
      this.error = null;

      return this.$store
        .dispatch("getPokemonSpecies", { id: this.$route.params.id })
        .then(() => {
          this.loading = false;
          this.pokemon = this.$store.state.pokemon[this.$route.params.id];
        })
        .catch(err => {
          this.loading = false;
          this.error = err;
        });
    }
  }
};
</script>

<style>
div.pokemon-view {
  position: relative;
}
</style>
