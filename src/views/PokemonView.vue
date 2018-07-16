<template>
  <div class="pokemon-view">
    <h1 v-if="pokemon && !loading" class="title">Pokémon Species: {{ pokemonNameLocalized }}</h1>
    <h1 v-else class="title">Pokémon Species</h1>
    <div v-if="loading" class="loading">
      Loading...
    </div>
    <div v-if="error" class="error">
      {{ error }}
    </div>
    <div v-if="pokemon && !loading">
      <PokemonDetails :pokemon="pokemon"/>
    </div>
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
