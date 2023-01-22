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
const store = usePokemonStore();

const { data: languages, error } = await useLanguagesData();

const filteredLanguages = computed(() =>
  (languages.value ?? [])
    .filter(Boolean)
    .filter((language) => language.official)
);
</script>

<style scoped>
.full-width {
  width: 100%;
}

.flex-gap {
  gap: 1rem;
}
</style>
