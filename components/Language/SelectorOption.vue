<template>
  <option :value="language.name">
    {{ nameInCurrentLanguage
    }}{{
      showNameInSpecifiedLanguage ? ` / ${nameInSpecifiedLanguage}` : ""
    }}
    ({{ language.name }})
  </option>
</template>

<script setup lang="ts">
import type { Language } from "@16patsle/pokeapi.js";

const props = defineProps<{
  language: Language;
}>();

const store = usePokemonStore();

const nameInCurrentLanguage = computed(() =>
  pokemonNameLocalized(props.language, store.language)
);
const nameInSpecifiedLanguage = computed(() =>
  pokemonNameLocalized(props.language, props.language.name, false)
);
const showNameInSpecifiedLanguage = computed(
  () =>
    nameInSpecifiedLanguage.value !== props.language.name &&
    nameInCurrentLanguage.value !== nameInSpecifiedLanguage.value
);
</script>
