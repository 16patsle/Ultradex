<template>
  <div class="language-selector field is-inline-block">
    <div class="field-label">
      <label class="label is-flex">
        <p class="mr-2">Language</p>
        <div class="control has-icons-left">
          <div class="select is-rounded is-small">
            <select v-model="store.language">
              <LanguageSelectorOption
                v-for="language in filteredLanguages"
                :key="language.name"
                :language="language"
              />
            </select>
          </div>
          <span class="icon is-small is-left">
            <fa-icon icon="globe" size="lg" />
          </span>
        </div>
      </label>
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
