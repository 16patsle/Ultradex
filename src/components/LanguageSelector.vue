<template>
  <div class="language-selector field is-inline-block full-width">
    <div class="field-label">
      <label class="label is-flex is-align-items-center flex-gap">
        <p>Language</p>
        <div class="control has-icons-left is-flex-grow-1">
          <div class="select is-rounded is-small full-width">
            <select v-model="store.language" class="full-width">
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

<style scoped>
.full-width {
  width: 100%;
}

.flex-gap {
  gap: 1rem;
}
</style>
