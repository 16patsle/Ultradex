<template>
  <div class="details-wrapper">
    <div v-if="pokemon">
      <PokemonFlavorText
        v-if="pokemon.flavor_text_entries.length"
        :flavorTextEntries="pokemon.flavor_text_entries"
      />
      <p v-if="pokemonGenusLocalized">Genus: {{ pokemonGenusLocalized }}</p>
      <p>Color: <PokemonColor :color="pokemon.color" /></p>
      <hr />
      <PokemonVariety
        :pokemonVarietyId="idFromUrl(pokemonDefaultVariety.pokemon.url)"
        isDefault
      />
      <o-collapse
        v-if="pokemon.evolution_chain?.url"
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
        <PokemonEvolutionChain :chain="pokemon.evolution_chain" />
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
import PokemonFlavorText from "./PokemonFlavorText.vue";
import PokemonColor from "./PokemonColor.vue";
import { usePokemonStore } from "@/stores/pokemonStore";
import { idFromUrl } from "@/utils/idFromUrl";
import {
  getDefaultPokemonVariety,
  getOtherPokemonVarieties,
  findWithLanguage,
} from "@/utils/pokemonUtils";

const store = usePokemonStore();

const pokemon = computed(() => store.currentPokemon);

const pokemonGenusLocalized = computed(
  () => findWithLanguage(pokemon.value.genera, store.language)?.genus ?? ""
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
