<template>
  <div class="wrapper">
    <b-loading :is-full-page="false" :active="loading"></b-loading>
    <b-notification v-if="error" type="is-danger">
      <h2 class="subtitle">ERROR!</h2>
      <p>{{ error }}</p>
    </b-notification>
    <div v-if="pokemonVariety.pokemonData">
      <h2 v-if="pokemon.name !== pokemonSpecies.name">Variety: {{pokemonNameLocalized | titlecase}}</h2>
      <h3 v-if="JSON.stringify(pokemon.types) !== JSON.stringify(pokemonDefault.types)">Types:</h3>
      <PokemonType v-for="type in pokemonTypes" v-if="JSON.stringify(pokemon.types) !== JSON.stringify(pokemonDefault.types)" :key="type" :type="type"/>
      <h3 v-if="pokemon.height !== pokemonDefault.height"><fa-icon icon="arrows-alt-v"></fa-icon> Height: {{pokemon.height / 10}} m</h3>
      <h3 v-if="pokemon.weight !== pokemonDefault.weight"><fa-icon icon="weight-hanging"></fa-icon> Weight: {{pokemon.weight / 10}} kg</h3>
      <PokemonSprite v-if="pokemon.sprites.front_default" :sprite="pokemon.sprites.front_default" :pokemonName="pokemonNameLocalized | titlecase" spriteName="front"/>
      <PokemonSprite v-if="pokemon.sprites.back_default" :sprite="pokemon.sprites.back_default" :pokemonName="pokemonNameLocalized | titlecase" spriteName="back"/>
    </div>
  </div>
</template>

<script>
import PokemonSprite from "@/components/PokemonSprite.vue";
import PokemonType from "@/components/PokemonType.vue";

export default {
  name: "PokemonVariety",
  components: {
    PokemonSprite,
    PokemonType
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
    },
    pokemonDefaultVariety: {
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
    pokemonDefault() {
      return this.pokemonDefaultVariety.pokemonData;
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
      return typesArray;
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
        this.error = null;

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
div.wrapper {
  position: relative;
  min-height: 50px;
}
</style>
