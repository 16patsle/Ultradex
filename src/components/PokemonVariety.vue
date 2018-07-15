<template>
  <span><div v-if="loading" class="loading">
      Loading...
    </div>
    <div v-if="error" class="error">
      {{ error }}
    </div>
    <div v-if="pokemonVariety.pokemonData">
      <h2 v-if="pokemon.name !== pokemonSpecies.name">Variety: {{pokemonNameLocalized}}</h2>
      <h3>Types: {{pokemonTypes}}</h3>
      <h3>Height: {{pokemon.height}}</h3>
      <h3>Weight: {{pokemon.weight}}</h3>
      <h3>Description: </h3>
      <img v-if="pokemon.sprites.front_default" :src="pokemon.sprites.front_default" :alt="'Default front sprite for' + pokemon.name">
    </div>
  </span>
</template>

<script>
export default {
  name: "PokemonVariety",
  props: {
    pokemonVariety: {
      type: Object,
      default() {
        return {};
      }
    },
    pokemonSpecies: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      loading: false,
      error: null
    };
  },
  computed: {
    pokemon() {
      return this.pokemonVariety.pokemonData;
    },
    pokemonNameLocalized() {
      let localizedName;
      for (let name of this.pokemonSpecies.names) {
        if (name.language.name === "en") {
          localizedName = name.name;
          break;
        }
      }
      if (this.pokemon.name === this.pokemonSpecies.name) {
        return localizedName;
      } else if (this.pokemon.name === this.pokemonSpecies.name + "-mega") {
        return "Mega " + localizedName;
      } else {
        localizedName = this.pokemon.name;
        return localizedName.charAt(0).toUpperCase() + localizedName.slice(1);
      }
    },
    pokemonTypes() {
      let typesArray = [];
      for (let type of this.pokemon.types) {
        typesArray[type.slot - 1] =
          type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1);
      }
      return typesArray.join(", ");
    }
  },
  watch: {
    // fetch data again if the route changes
    pokemonVariety: "fetchPokemonVariety"
  },
  created() {
    // fetch the pokemon data when the view is created
    this.fetchPokemonVariety();
  },
  methods: {
    fetchPokemonVariety() {
      if (!this.pokemonVariety.pokemonData) {
        this.loading = true;

        return this.$store
          .dispatch("getPokemonVariety", {
            speciesId: this.$route.params.id,
            varietyId: /\S+\/([0-9]+)\//.exec(
              this.pokemonVariety.pokemon.url
            )[1]
          })
          .then(() => {
            this.loading = false;
          })
          .catch(err => {
            this.loading = false;
            this.error = err;
          });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
