<template>
  <div class="is-flex">
    <div class="column">
      <PokemonLink
        v-if="previousPokemon"
        :pokemon="previousPokemon"
        :lazyIcon="false"
        showId
        title="Previous pokémon"
      >
        &lt;
      </PokemonLink>
    </div>
    <div class="column">
      <PokemonLink
        v-if="nextPokemon"
        :pokemon="nextPokemon"
        :lazyIcon="false"
        showId
        class="is-flex-direction-row-reverse is-justify-content-end"
        title="Next pokémon"
      >
        &gt;
      </PokemonLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const store = usePokemonStore();

const props = defineProps<{
  id: number | undefined;
}>();

const currentIndex = computed(() => (props.id ?? 0) - 1); // pokemonList is 0-indexed
const previousPokemon = computed(
  () => props.id && store.pokemonList[currentIndex.value - 1]
);
const nextPokemon = computed(
  () => props.id && store.pokemonList[currentIndex.value + 1]
);
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
