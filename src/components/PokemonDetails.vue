<template>
  <span><div v-if="loading" class="loading">
      Loading...
    </div>
    <div v-if="error" class="error">
      {{ error }}
    </div>
    <div v-if="pokemon">
      <p>Species name: {{ pokemonNameLocalized }}</p>
      <p>Genus: {{ pokemonGenusLocalized }}</p>
      <p>Color: {{ pokemon ? pokemon.color.name : '' | capitalize }}</p>
      <p>Evolves from: {{ pokemon ? pokemon.evolves_from_species.name : '' | capitalize }}</p>
      <PokemonVariety v-for="pokemonVariety in pokemon.varieties" :key="pokemonVariety.pokemon.name" :pokemonVariety="pokemonVariety" :pokemonSpecies="pokemon"/>
    </div>
  </span>
</template>

<script>
import PokemonVariety from "@/components/PokemonVariety.vue";

export default {
  name: "PokemonDetails",
  components: {
    PokemonVariety
  },
  props: {
    pokemon: {
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
    }
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
