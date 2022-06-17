<template>
  <div class="link-wrapper is-flex is-align-items-center">
    <PokemonSpriteIcon
      v-if="store.pokemon[pokemonId]?.varieties[0].pokemonData"
      :pokemonData="store.pokemon[pokemonId].varieties[0].pokemonData"
    />
    <div>
      <router-link :to="'/pokemon/' + pokemonId">{{ pokemonName }}</router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { usePokemonStore } from "../stores/pokemonStore";
import { pokemonNameLocalized } from "../utils/pokemonNameLocalized";
import PokemonSpriteIcon from "./PokemonSpriteIcon.vue";

const props = defineProps({
  pokemon: { type: Object, required: true },
});

const store = usePokemonStore();

const pokemonId = computed(() => /\S+\/([0-9]+)\//.exec(props.pokemon.url)[1]);
const pokemonName = computed(() => {
  const pokemon = store.pokemon[pokemonId.value];
  if (pokemon) {
    return pokemonNameLocalized(pokemon);
  }
  const name = store.pokemonData[pokemonId.value - 1]?.name;
  return name ? name.charAt(0).toUpperCase() + name.slice(1) : "";
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.link-wrapper {
  height: 40px;
}
</style>
