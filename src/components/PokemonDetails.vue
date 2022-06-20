<template>
  <div class="details-wrapper">
    <div v-if="pokemon">
      <p class="subtitle">{{ pokemonFlavorTextLocalized }}</p>
      <p>Genus: {{ pokemonGenusLocalized }}</p>
      <p>Color: {{ capitalize(pokemon.color.name) }}</p>
      <hr />
      <PokemonVariety
        :pokemonVarietyId="idFromUrl(pokemonDefaultVariety.pokemon.url)"
        isDefault
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
          :speciesId="store.currentlyShowingId"
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
        <div>
          <PokemonVariety
            v-for="pokemonVariety in pokemonOtherVarieties"
            :key="pokemonVariety.pokemon.name"
            :pokemonVarietyId="idFromUrl(pokemonVariety.pokemon.url)"
          />
        </div>
      </o-collapse>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import PokemonVariety from "@/components/PokemonVariety.vue";
import PokemonEvolutionChain from "@/components/PokemonEvolutionChain.vue";
import PokemonCollapseTrigger from "@/components/PokemonCollapseTrigger.vue";
import { usePokemonStore } from "@/stores/pokemonStore";
import { idFromUrl } from "@/utils/idFromUrl";
import { capitalize } from "@/utils/capitalize";
import {
  getDefaultPokemonVariety,
  getOtherPokemonVarieties,
  findWithLanguage,
} from "@/utils/pokemonUtils";

const store = usePokemonStore();

const pokemon = computed(() => store.currentPokemon);

const pokemonGenusLocalized = computed(
  () => findWithLanguage(pokemon.value.genera, "en")?.genus ?? ""
);
const pokemonFlavorTextLocalized = computed(
  () =>
    findWithLanguage(pokemon.value.flavor_text_entries, "en")?.flavor_text ?? ""
);
const pokemonDefaultVariety = computed(() =>
  getDefaultPokemonVariety(pokemon.value)
);
const pokemonOtherVarieties = computed(() =>
  getOtherPokemonVarieties(pokemon.value)
);
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.details-collapse,
.details-collapse-header {
  padding-bottom: 10px;
}
</style>
