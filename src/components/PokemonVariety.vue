<template>
  <div class="variety-wrapper">
    <o-loading :full-page="false" :active="!pokemon"></o-loading>
    <o-notification v-if="error" variant="danger">
      <h2 class="subtitle">ERROR!</h2>
      <p>{{ error }}</p>
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
            v-for="type in pokemonTypes"
            :key="type"
            :type="type"
            class="has-text-centered"
          />
        </div>
        <div class="has-text-centered">
          <PokemonSprite
            v-if="pokemon.sprites.front_default"
            :sprite="pokemon.sprites.front_default"
            :pokemonName="titlecase(pokemonNameLocalized)"
            spriteName="front"
          />
          <PokemonSprite
            v-else
            sprite=""
            :pokemonName="titlecase(pokemonNameLocalized)"
            spriteName="missing"
          />
          <PokemonSprite
            v-if="pokemon.sprites.back_default"
            :sprite="pokemon.sprites.back_default"
            :pokemonName="titlecase(pokemonNameLocalized)"
            spriteName="back"
          />
        </div>
      </div>
      <PokemonStats :pokemon="pokemon" class="pokemon-stats column is-5" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { usePokemonStore } from "../stores/pokemonStore";
import PokemonSprite from "@/components/PokemonSprite.vue";
import PokemonType from "@/components/PokemonType.vue";
import PokemonStats from "@/components/PokemonStats.vue";
import { pokemonNameLocalizedVariety } from "../utils/pokemonNameLocalized";
import { handleError } from "@/utils/handleError";
import { titlecase } from "@/utils/titlecase";
import { getDefaultPokemonVarietyForm } from "@/utils/pokemonUtils";

const props = withDefaults(
  defineProps<{
    pokemonVarietyId: number;
    isDefault?: boolean;
  }>(),
  { isDefault: false }
);

const emit = defineEmits(["loaded"]);

const store = usePokemonStore();

const error = ref("");

const pokemon = computed(() => store.pokemonVarieties[props.pokemonVarietyId]);
const defaultForm = computed(() => getDefaultPokemonVarietyForm(pokemon.value));

const pokemonNameLocalized = computed(() =>
  pokemonNameLocalizedVariety(
    store.currentPokemon,
    pokemon.value,
    store.language
  )
);
const pokemonTypes = computed(() => {
  const typesArray = [];
  for (const type of pokemon.value.types) {
    typesArray[type.slot - 1] =
      type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1);
  }
  return typesArray;
});

const fetchPokemonVariety = async () => {
  if (!pokemon.value) {
    error.value = "";

    try {
      await store.fetchPokemonVariety(
        store.currentlyShowingId,
        props.pokemonVarietyId
      );
      await store.fetchPokemonVarietyForms(props.pokemonVarietyId);
      emit("loaded");
    } catch (err) {
      error.value = handleError(err);
    }
  } else {
    emit("loaded");
  }
};

fetchPokemonVariety();
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
