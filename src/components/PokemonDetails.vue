<template>
  <div class="details-wrapper">
    <div v-if="pokemon">
      <p class="subtitle">{{ pokemonFlavorTextLocalized }}</p>
      <p>Genus: {{ pokemonGenusLocalized }}</p>
      <p>Color: {{ $capitalize(pokemon.color.name) }}</p>
      <hr />
      <PokemonVariety
        :pokemonVariety="pokemonDefaultVariety"
        :pokemonSpecies="pokemon"
        @loaded="defaultVarietyLoaded = true"
      />
      <o-collapse
        v-if="pokemon.evolution_chain.url"
        :open="false"
        class="details-collapse"
      >
        <template #trigger="props">
          <PokemonCollapseTrigger
            :open="props.open"
            class="details-collapse-header"
            title="Show/hide evolution chain"
          >
            Evolution chain
          </PokemonCollapseTrigger>
        </template>
        <PokemonEvolutionChain
          :chainId="idFromUrl(pokemon.evolution_chain.url)"
          :speciesId="route.params.id"
        />
      </o-collapse>
      <o-collapse
        v-if="pokemonOtherVarieties.length > 0"
        :open="false"
        class="details-collapse"
      >
        <template #trigger="props">
          <PokemonCollapseTrigger
            :open="props.open"
            class="details-collapse-header"
            title="Show/hide other varieties"
          >
            Other varieties: {{ pokemonOtherVarieties.length }}
          </PokemonCollapseTrigger>
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
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import PokemonVariety from "@/components/PokemonVariety.vue";
import PokemonEvolutionChain from "@/components/PokemonEvolutionChain.vue";
import PokemonCollapseTrigger from "@/components/PokemonCollapseTrigger.vue";
import { idFromUrl } from "@/utils/idFromUrl";

const props = defineProps({
  pokemon: {
    type: Object,
    default() {
      return null;
    },
  },
});

const defaultVarietyLoaded = ref(false);
const route = useRoute();

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
.details-collapse,
.details-collapse-header {
  padding-bottom: 10px;
}
</style>
