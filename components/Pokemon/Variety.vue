<template>
  <div class="variety-wrapper">
    <o-loading :full-page="false" :active="!pokemon"></o-loading>
    <o-notification v-if="error || errorForms" variant="danger">
      <h2 class="subtitle">ERROR!</h2>
      <p>{{ error || errorForms }}</p>
    </o-notification>
    <div v-if="!isDefault && pokemon" class="columns">
      <div class="column">
        <div>
          <h3 class="variety-name">
            Variety: {{ titlecase(pokemonNameLocalized) }}
          </h3>
        </div>
      </div>
    </div>
    <p v-if="defaultForm?.is_mega">Mega evolution form</p>
    <p v-else-if="defaultForm?.is_battle_only">Battle-only form</p>
    <div v-if="pokemon" class="columns">
      <div class="column">
        <div class="has-text-centered">
          <PokemonType
            v-for="type in pokemon.types"
            :key="type.type.name"
            :type="type.type"
            class="has-text-centered"
          />
        </div>
        <div class="has-text-centered">
          <PokemonSprite
            v-if="pokemon.sprites.front_default"
            :sprite="pokemon.sprites.front_default"
            :pokemonName="pokemonNameLocalized"
            spriteName="front"
          />
          <PokemonSprite
            v-else
            sprite=""
            :pokemonName="pokemonNameLocalized"
            spriteName="missing"
          />
          <PokemonSprite
            v-if="pokemon.sprites.back_default"
            :sprite="pokemon.sprites.back_default"
            :pokemonName="pokemonNameLocalized"
            spriteName="back"
          />
        </div>
      </div>
      <PokemonStats :pokemon="pokemon" class="pokemon-stats column is-5" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { PokemonSpecies } from "@16patsle/pokeapi.js";

const props = withDefaults(
  defineProps<{
    currentPokemon: PokemonSpecies;
    pokemonVarietyId: number | undefined;
    isDefault?: boolean;
  }>(),
  { isDefault: false }
);

const store = usePokemonStore();

const { pokemon, error } = await usePokemonVarietyData(
  props.currentPokemon.id,
  props.pokemonVarietyId
);
const { pokemonForms, error: errorForms } = await usePokemonVarietyFormsData(
  props.pokemonVarietyId
);
const defaultForm = computed(() =>
  pokemon.value && pokemonForms.value
    ? getDefaultPokemonVarietyForm(pokemon.value, pokemonForms.value)
    : undefined
);

const pokemonNameLocalized = computed(
  () =>
    (pokemon.value && pokemonForms.value
      ? pokemonNameLocalizedVariety(
          props.currentPokemon,
          pokemon.value,
          pokemonForms.value,
          store.language
        )
      : undefined) ?? ""
);
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.variety-wrapper {
  position: relative;
  min-height: 250px;
  margin-bottom: 1rem;
}
.pokemon-stats {
  margin: 0.5rem;
}
.variety-name {
  padding-left: 31px;
}
</style>
