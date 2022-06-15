<template>
  <div class="variety-wrapper">
    <o-loading :full-page="false" :active="loading"></o-loading>
    <o-notification v-if="error" variant="danger">
      <h2 class="subtitle">ERROR!</h2>
      <p>{{ error }}</p>
    </o-notification>
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
        class="pokemon-stats column is-half is-one-third-desktop is-one-fourth-widescreen"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { usePokemonStore } from "../stores/pokemonStore";
import PokemonSprite from "@/components/PokemonSprite.vue";
import PokemonType from "@/components/PokemonType.vue";
import PokemonStats from "@/components/PokemonStats.vue";

const props = defineProps({
  pokemonVariety: {
    type: Object,
    default() {
      return {};
    },
  },
  pokemonSpecies: {
    type: Object,
    default() {
      return {};
    },
  },
});

const emit = defineEmits(["loaded"]);

const loading = ref(false);
const error = ref(false);

const pokemon = computed(() => props.pokemonVariety.pokemonData);

const pokemonNameLocalized = computed(() => {
  let localizedName;
  for (let name of props.pokemonSpecies.names) {
    if (name.language.name === "en") {
      localizedName = name.name;
      break;
    }
  }
  if (pokemon.value.name === props.pokemonSpecies.name) {
    return localizedName;
  } else if (pokemon.value.name.includes(props.pokemonSpecies.name)) {
    return (
      pokemon.value.name
        .toLowerCase()
        .replace(props.pokemonSpecies.name, "")
        .replace("-", " ")
        .replace("-", " ") +
      " " +
      localizedName
    );
  } else {
    localizedName = pokemon.value.name;
    return localizedName.charAt(0).toUpperCase() + localizedName.slice(1);
  }
});
const pokemonTypes = computed(() => {
  let typesArray = [];
  for (let type of pokemon.value.types) {
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
      await store.fetchPokemonVariety({
        speciesId: route.params.id,
        varietyId: /\S+\/([0-9]+)\//.exec(props.pokemonVariety.pokemon.url)[1],
      });
      loading.value = false;
      emit("loaded");
    } catch (err) {
      loading.value = false;
      error.value = err;
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
</style>
