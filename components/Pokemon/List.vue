<template>
  <div class="pokemon-list">
    <h1>PokemonList</h1>
    <ul>
      <RecycleScroller
        v-slot="{ item, active }"
        :items="pokemonList?.results ?? []"
        :item-size="40"
        key-field="name"
      >
        <li>
          <PokemonLink
            :pokemon="item"
            :loadingPaused="true || active"
            showId
            class="is-justify-content-center"
          />
        </li>
      </RecycleScroller>
    </ul>
  </div>
</template>

<script setup lang="ts">
const { pokemonList } = await usePokemonSpeciesListData();
if (pokemonList.value) {
  const store = usePokemonStore();
  store.pokemonList = pokemonList.value.results;
}
</script>
