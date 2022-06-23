<template>
  <div v-if="flavorTextEntries" class="subtitle">
    <o-tabs v-model="gameVersion" multiline>
      <PokemonFlavorTextItem
        v-for="version in pokemonVersions"
        :key="version.value"
        :versionNames="version.versionNames"
        :flavorText="pokemonFlavorTextObject[version.value]"
      />
    </o-tabs>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import type { FlavorText } from "@16patsle/pokeapi.js";
import PokemonFlavorTextItem from "./PokemonFlavorTextItem.vue";
import { usePokemonStore } from "@/stores/pokemonStore";
import { normalizeTextForComparison } from "@/utils/pokemonUtils";

const props = defineProps<{
  flavorTextEntries: FlavorText[];
}>();

const gameVersion = ref("red");

const store = usePokemonStore();

const pokemonFlavorTextLocalized = computed(() => {
  let flavorText = props.flavorTextEntries.filter(
    (flavorText) => flavorText.language.name === store.language
  );
  if (flavorText.length === 0) {
    flavorText = props.flavorTextEntries.filter(
      (flavorText) => flavorText.language.name === "en"
    );
  }
  return flavorText;
});

const pokemonFlavorTextObject = computed(() => {
  const flavorTextObject: { [key: string]: FlavorText } = {};
  pokemonFlavorTextLocalized.value.forEach((flavorText) => {
    flavorTextObject[flavorText.version.name] = flavorText;
  });
  return flavorTextObject;
});

const pokemonVersions = computed(() => {
  type EntryVersion = { versionNames: string[]; flavorText: FlavorText };
  const entryVersions: EntryVersion[] = [];

  pokemonFlavorTextLocalized.value.forEach((entry) => {
    const entryFlavorText = normalizeTextForComparison(entry.flavor_text);
    const previous = entryVersions.find((version) => {
      const versionFlavorText = normalizeTextForComparison(
        version.flavorText.flavor_text
      );
      return versionFlavorText === entryFlavorText;
    });

    // If a previous entry with the same flavor text exists, add the version to the list of versions for that entry.
    if (previous) {
      previous.versionNames.push(entry.version.name);
    } else {
      entryVersions.push({
        versionNames: [entry.version.name],
        flavorText: entry,
      });
    }
  });

  return entryVersions.map((entryVersion) => {
    return {
      versionNames: entryVersion.versionNames,
      // Prefer using the second version, since the first one has weird formatting.
      value: entryVersion.versionNames[1] ?? entryVersion.versionNames[0],
    };
  });
});

const setVersion = ([newVersion]: typeof pokemonVersions.value) => {
  gameVersion.value = newVersion.versionNames[1] ?? newVersion.versionNames[0];
};

watch(pokemonVersions, setVersion);
setVersion(pokemonVersions.value);
</script>
