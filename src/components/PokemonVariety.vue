<template>
  <div class="variety-wrapper">
    <o-loading :full-page="false" :active="loading"></o-loading>
    <o-notification v-if="error" variant="danger">
      <h2 class="subtitle">ERROR!</h2>
      <p>{{ error }}</p>
    </o-notification>
    <div
      v-if="!pokemonVariety.is_default && pokemonVariety.pokemonData"
      class="columns"
    >
      <div class="column">
        <div>
          <h3 class="variety-name">
            Variety: {{ $titlecase(pokemonNameLocalized) }}
          </h3>
        </div>
      </div>
    </div>
    <p v-if="defaultForm?.is_mega">Mega evolution form</p>
    <p v-else-if="defaultForm?.is_battle_only">Battle-only form</p>
    <div v-if="pokemonVariety.pokemonData" class="columns">
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
            :pokemonName="$titlecase(pokemonNameLocalized)"
            spriteName="front"
          />
          <PokemonSprite
            v-else
            :sprite="pokemon.sprites.front_default"
            :pokemonName="$titlecase(pokemonNameLocalized)"
            spriteName="missing"
          />
          <PokemonSprite
            v-if="pokemon.sprites.back_default"
            :sprite="pokemon.sprites.back_default"
            :pokemonName="$titlecase(pokemonNameLocalized)"
            spriteName="back"
          />
        </div>
      </div>
      <PokemonStats
        :height="pokemon.height"
        :weight="pokemon.weight"
        :stats="pokemon.stats"
        class="pokemon-stats column is-5"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { usePokemonStore } from "../stores/pokemonStore";
import PokemonSprite from "@/components/PokemonSprite.vue";
import PokemonType from "@/components/PokemonType.vue";
import PokemonStats from "@/components/PokemonStats.vue";
import { pokemonNameLocalizedVariety } from "../utils/pokemonNameLocalized";
import type {
  PokemonSpecies,
  PokemonSpeciesVariety,
} from "@/types/PokemonSpecies";

const props = defineProps<{
  pokemonVariety: PokemonSpeciesVariety;
  pokemonSpecies: PokemonSpecies;
}>();

const emit = defineEmits(["loaded"]);

const loading = ref(false);
const error = ref<any>(null);

const pokemon = computed(() => props.pokemonVariety.pokemonData!);
const defaultForm = computed(
  () =>
    props.pokemonVariety.pokemonData?.forms.find(
      (form) => form.data?.is_default
    )?.data
);

const pokemonNameLocalized = computed(() =>
  pokemonNameLocalizedVariety(
    props.pokemonSpecies,
    props.pokemonVariety.pokemonData
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
  if (!props.pokemonVariety.pokemonData) {
    loading.value = true;
    error.value = null;

    try {
      const store = usePokemonStore();
      const route = useRoute();
      const varietyId = /\S+\/([0-9]+)\//.exec(
        props.pokemonVariety.pokemon.url
      )[1];
      await store.fetchPokemonVariety(route.params.id, varietyId);
      await store.fetchPokemonVarietyForms(route.params.id, varietyId);
      loading.value = false;
      emit("loaded");
    } catch (err) {
      loading.value = false;
      error.value = err;
      console.error(err);
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
