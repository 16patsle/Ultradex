<template>
  <span><div v-if="loading" class="loading">
      Loading...
    </div>
    <div v-if="error" class="error">
      {{ error }}
    </div>
    <div v-if="pokemonVariety.pokemonData">
      <h2 v-if="pokemon.name !== pokemonSpecies.name">Variety: {{pokemonNameLocalized | titlecase}}</h2>
      <h3>Types: {{pokemonTypes}}</h3>
      <h3>Height: {{pokemon.height / 10}} m</h3>
      <h3>Weight: {{pokemon.weight / 10}} kg</h3>
      <PokemonSprite v-if="pokemon.sprites.front_default" :sprite="pokemon.sprites.front_default" :pokemonName="pokemonNameLocalized | titlecase" spriteName="front"/>
      <PokemonSprite v-if="pokemon.sprites.back_default" :sprite="pokemon.sprites.back_default" :pokemonName="pokemonNameLocalized | titlecase" spriteName="back"/>
    </div>
  </span>
</template>

<script>
import PokemonSprite from "@/components/PokemonSprite.vue";

export default {
  name: "PokemonDefaultVariety",
  components: {
    PokemonSprite
  },
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
      } else if (this.pokemon.name.includes(this.pokemonSpecies.name)) {
        return (
          this.pokemon.name
            .toLowerCase()
            .replace(this.pokemonSpecies.name, "")
            .replace("-", " ")
            .replace("-", " ") +
          " " +
          localizedName
        );
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
</style>
