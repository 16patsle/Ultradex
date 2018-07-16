<template>
  <span><div v-if="loading" class="loading">
      Loading...
    </div>
    <div v-if="error" class="error">
      {{ error }}
    </div>
    <div v-if="pokemon && !loading">
      <p>Genus: {{ pokemonGenusLocalized }}</p>
      <p>Color: {{ pokemon.color.name  | capitalize }}</p>
      <p v-if="pokemon.evolves_from_species">Evolves from: {{ pokemon.evolves_from_species.name | capitalize }}</p>
      <h3>Description:</h3>
      <p>{{ pokemonFlavorTextLocalized }}</p>
      <PokemonDefaultVariety :pokemonVariety="pokemonDefaultVariety" :pokemonSpecies="pokemon" @loaded="defaultVarietyLoaded = true"/>
      <h2 v-if="pokemonOtherVarieties.length > 0" class="subtitle">Other varieties: {{ pokemonOtherVarieties.length }}</h2>
      <PokemonVariety v-for="pokemonVariety in pokemonOtherVarieties" v-if="defaultVarietyLoaded" :key="pokemonVariety.pokemon.name" :pokemonVariety="pokemonVariety" :pokemonSpecies="pokemon" :pokemonDefaultVariety="pokemonDefaultVariety"/>
    </div>
  </span>
</template>

<script>
import PokemonVariety from "@/components/PokemonVariety.vue";
import PokemonDefaultVariety from "@/components/PokemonDefaultVariety.vue";

export default {
  name: "PokemonDetails",
  components: {
    PokemonVariety,
    PokemonDefaultVariety
  },
  props: {
    pokemon: {
      type: Object,
      default() {
        return null;
      }
    }
  },
  data() {
    return {
      loading: false,
      error: null,
      defaultVarietyLoaded: false
    };
  },
  computed: {
    pokemonNameLocalized() {
      for (let name of this.pokemon.names) {
        if (name.language.name === "en") {
          return name.name;
        }
      }
      return this.pokemon.name;
    },
    pokemonGenusLocalized() {
      for (let genus of this.pokemon.genera) {
        if (genus.language.name === "en") {
          return genus.genus;
        }
      }
    },
    pokemonFlavorTextLocalized() {
      for (let flavorText of this.pokemon.flavor_text_entries) {
        if (flavorText.language.name === "en") {
          return flavorText.flavor_text;
        }
      }
    },
    pokemonDefaultVariety() {
      return this.pokemon.varieties.reduce((acc, variety) => {
        if (variety.is_default) {
          acc = variety;
        }
        return acc;
      });
    },
    pokemonOtherVarieties() {
      return this.pokemon.varieties.reduce((acc, variety) => {
        if (!variety.is_default) {
          acc.push(variety);
        }
        return acc;
      }, []);
    }
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
