<template>
  <o-tab-item
    v-if="text && versions?.length > 0"
    :value="versions[1]?.name ?? versions[0]?.name"
    :label="label"
  >
    <p>{{ text }}</p>
  </o-tab-item>
</template>

<script setup lang="ts">
import type {
  FlavorText,
  NamedAPIResource,
  Version,
} from "@16patsle/pokeapi.js";

const props = defineProps<{
  versions: NamedAPIResource[];
  flavorText: FlavorText;
}>();

const store = usePokemonStore();

const versionIds = computed(() =>
  props.versions.reduce((acc, version) => {
    const id = idFromUrl(version.url);
    if (id) {
      acc.push(id);
    }
    return acc;
  }, [] as number[])
);

const versionData = computed(() =>
  versionIds.value
    ? versionIds.value.reduce((acc, versionId) => {
        const version = store.gameVersions[versionId];
        if (version) {
          acc.push(version);
        }
        return acc;
      }, [] as Version[])
    : null
);

const versionNamesLocalized = computed(() =>
  versionData.value
    ? versionData.value.map(
        (version) => findWithLanguage(version.names, store.language)?.name
      )
    : null
);

const label = computed(() =>
  versionNamesLocalized.value ? versionNamesLocalized.value.join(" / ") : ""
);
const text = computed(() => props.flavorText.flavor_text);

const fetchVersions = async () => {
  if (
    versionData.value &&
    versionData.value.length < 1 &&
    versionIds.value?.length > 1
  ) {
    const promises = [];
    for (const versionId of versionIds.value) {
      promises.push(store.fetchGameVersion(versionId));
    }
    await Promise.all(promises);
  }
};

fetchVersions();
</script>
