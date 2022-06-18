<template>
  <span class="link-wrapper is-inline-flex is-align-items-center">
    <PokemonIcon
      v-if="itemData"
      :src="itemData.sprites.default"
      alt=""
      type="default"
    />
    <span v-if="itemData">
      {{ pokemonNameLocalized(itemData) }}
    </span>
    <span v-else>
      {{ item.name }}
    </span>
  </span>
</template>

<script setup lang="ts">
import type { NamedAPIResource } from "@16patsle/pokeapi.js";
import { handleError } from "@/utils/handleError";
import { idFromUrl } from "@/utils/idFromUrl";
import { computed, ref } from "vue";
import { usePokemonStore } from "../stores/pokemonStore";
import { pokemonNameLocalized } from "../utils/pokemonNameLocalized";
import PokemonIcon from "./PokemonIcon.vue";

const props = defineProps<{
  item: NamedAPIResource;
}>();

const store = usePokemonStore();

const error = ref("");

const itemId = computed(() => idFromUrl(props.item.url));

const itemData = computed(() =>
  itemId.value ? store.items[itemId.value] : null
);

const fetchItem = async () => {
  if (!itemData.value && itemId.value) {
    error.value = "";

    try {
      await store.fetchItem(itemId.value);
    } catch (err) {
      error.value = handleError(err);
    }
  }
};

fetchItem();
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.link-wrapper {
  height: 40px;
}
</style>
