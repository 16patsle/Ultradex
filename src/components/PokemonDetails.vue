<template>
  <div class="details-wrapper">
    <div v-if="pokemon">
      <p class="subtitle">{{ pokemonFlavorTextLocalized }}</p>
      <p>Genus: {{ pokemonGenusLocalized }}</p>
      <p>Color: {{ pokemon.color.name | capitalize }}</p>
      <p v-if="pokemon.evolves_from_species">
        Evolves from: {{ pokemon.evolves_from_species.name | capitalize }}
      </p>
      <hr />
      <PokemonDefaultVariety
        :pokemonVariety="pokemonDefaultVariety"
        :pokemonSpecies="pokemon"
        @loaded="defaultVarietyLoaded = true"
      />
      <b-collapse
        v-if="pokemonOtherVarieties.length > 0"
        :open="false"
        class="other-varieties-collapse"
      >
        <h2
          slot="trigger"
          slot-scope="props"
          class="subtitle other-varieties-header"
        >
          <fa-icon
            :icon="props.open ? 'caret-down' : 'caret-right'"
            fixed-width
            title="Show/hide other varieties"
          />Other varieties: {{ pokemonOtherVarieties.length }}
        </h2>
        <div v-if="defaultVarietyLoaded">
          <PokemonVariety
            v-for="pokemonVariety in pokemonOtherVarieties"
            :key="pokemonVariety.pokemon.name"
            :pokemonVariety="pokemonVariety"
            :pokemonSpecies="pokemon"
            :pokemonDefaultVariety="pokemonDefaultVariety"
          />
        </div>
      </b-collapse>
    </div>
  </div>
</template>

<script>
import PokemonVariety from "@/components/PokemonVariety.vue";
import PokemonDefaultVariety from "@/components/PokemonDefaultVariety.vue";

export default {
  name: "PokemonDetails",
  components: {
    PokemonVariety,
    PokemonDefaultVariety,
  },
  props: {
    pokemon: {
      type: Object,
      default() {
        return null;
      },
    },
  },
  data() {
    return {
      defaultVarietyLoaded: false,
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
      return "";
    },
    pokemonFlavorTextLocalized() {
      for (let flavorText of this.pokemon.flavor_text_entries) {
        if (flavorText.language.name === "en") {
          return flavorText.flavor_text;
        }
      }
      return "";
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
    },
  },
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.other-varieties-collapse,
h2.other-varieties-header {
  padding-bottom: 10px;
}
</style>
