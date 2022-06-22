<template>
  <div class="language-selector">
    <div>
      <span>Language:</span>
    </div>
    <div>
      <select v-model="store.language">
        <LanguageSelectorOption
          v-for="language in filteredLanguages"
          :key="language.name"
          :language="language"
        />
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePokemonStore } from "@/stores/pokemonStore";
import { computed } from "vue";
import LanguageSelectorOption from "./LanguageSelectorOption.vue";

const store = usePokemonStore();

const filteredLanguages = computed(() =>
  store.languages.filter(Boolean).filter((language) => language.official)
);

const fetchLanguages = async () => {
  if (!store.languages.length) {
    await store.fetchLanguages();
  }
};

fetchLanguages();
</script>
