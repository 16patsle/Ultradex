<template>
  <div v-if="flavorTextEntries" class="subtitle">
    <o-tabs v-model="gameVersion" multiline>
      <PokemonFlavorTextItem
        v-for="entryVersion in pokemonVersions"
        :key="entryVersion.versions.map((v) => v.name).join(', ')"
        :versions="entryVersion.versions"
        :flavorText="pokemonFlavorTextObject[entryVersion.value]"
      />
    </o-tabs>
  </div>
</template>

<script setup lang="ts">
import type { FlavorText, NamedAPIResource } from "@16patsle/pokeapi.js";

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
  type EntryVersion = { versions: NamedAPIResource[]; flavorText: FlavorText };
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
      previous.versions.push(entry.version);
    } else {
      entryVersions.push({
        versions: [entry.version],
        flavorText: entry,
      });
    }
  });

  return entryVersions.map((entryVersion) => {
    return {
      versions: entryVersion.versions,
      // Prefer using the second version, since the first one has weird formatting.
      value: (entryVersion.versions[1] ?? entryVersion.versions[0]).name,
    };
  });
});

const setVersion = ([newVersion]: typeof pokemonVersions.value) => {
  gameVersion.value = (newVersion.versions[1] ?? newVersion.versions[0]).name;
};

watch(pokemonVersions, setVersion);
setVersion(pokemonVersions.value);
</script>
