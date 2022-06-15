<template>
  <div class="details-wrapper">
    <div v-if="pokemon">
      <p class="subtitle">{{ pokemonFlavorTextLocalized }}</p>
      <p>Genus: {{ pokemonGenusLocalized }}</p>
      <p>Color: {{ $capitalize(pokemon.color.name) }}</p>
      <p v-if="pokemon.evolves_from_species">
        Evolves from: <PokemonLink :pokemon="pokemon.evolves_from_species" />
      </p>
      <hr />
      <PokemonDefaultVariety
        :pokemonVariety="pokemonDefaultVariety"
        :pokemonSpecies="pokemon"
        @loaded="defaultVarietyLoaded = true"
      />
      <o-collapse
        v-if="pokemonOtherVarieties.length > 0"
        :open="false"
        class="other-varieties-collapse"
      >
        <template #trigger="props">
          <h2 class="subtitle other-varieties-header">
            <fa-icon
              :icon="props.open ? 'caret-down' : 'caret-right'"
              fixed-width
              title="Show/hide other varieties"
            />Other varieties: {{ pokemonOtherVarieties.length }}
          </h2>
        </template>
        <div v-if="defaultVarietyLoaded">
          <PokemonVariety
            v-for="pokemonVariety in pokemonOtherVarieties"
            :key="pokemonVariety.pokemon.name"
            :pokemonVariety="pokemonVariety"
            :pokemonSpecies="pokemon"
            :pokemonDefaultVariety="pokemonDefaultVariety"
          />
        </div>
      </o-collapse>
    </div>
  </div>
</template>

<script setup>
import PokemonVariety from "@/components/PokemonVariety.vue";
import PokemonDefaultVariety from "@/components/PokemonDefaultVariety.vue";
import PokemonLink from "./PokemonLink.vue";
import { computed, ref } from "vue";

const props = defineProps({
  pokemon: {
    type: Object,
    default() {
      return null;
    },
  },
});

const defaultVarietyLoaded = ref(false);

const pokemonGenusLocalized = computed(() => {
  for (let genus of props.pokemon.genera) {
    if (genus.language.name === "en") {
      return genus.genus;
    }
  }
  return "";
});
const pokemonFlavorTextLocalized = computed(() => {
  for (let flavorText of props.pokemon.flavor_text_entries) {
    if (flavorText.language.name === "en") {
      return flavorText.flavor_text;
    }
  }
  return "";
});
const pokemonDefaultVariety = computed(() => {
  return props.pokemon.varieties.reduce((acc, variety) => {
    if (variety.is_default) {
      acc = variety;
    }
    return acc;
  });
});
const pokemonOtherVarieties = computed(() => {
  return props.pokemon.varieties.reduce((acc, variety) => {
    if (!variety.is_default) {
      acc.push(variety);
    }
    return acc;
  }, []);
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.other-varieties-collapse,
h2.other-varieties-header {
  padding-bottom: 10px;
}
</style>
