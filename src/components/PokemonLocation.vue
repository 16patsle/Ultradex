<template>
  <span class="link-wrapper is-inline-flex is-align-items-center">
    {{ locationData ? pokemonNameLocalized(locationData) : location.name
    }}{{ regionData ? " in " + pokemonNameLocalized(regionData) : "" }}
  </span>
</template>

<script setup lang="ts">
import type { NamedAPIResource } from "@/types/Common";
import { handleError } from "@/utils/handleError";
import { idFromUrl } from "@/utils/idFromUrl";
import { computed, ref } from "vue";
import { usePokemonStore } from "../stores/pokemonStore";
import { pokemonNameLocalized } from "../utils/pokemonNameLocalized";

const props = defineProps<{
  location: NamedAPIResource;
}>();

const store = usePokemonStore();

const error = ref("");

const locationId = computed(() => idFromUrl(props.location.url));
const regionId = computed(() =>
  locationId.value
    ? idFromUrl(store.locations[locationId.value]?.region.url)
    : null
);

const locationData = computed(() =>
  locationId.value ? store.locations[locationId.value] : null
);
const regionData = computed(() =>
  regionId.value ? store.regions[regionId.value] : null
);

const fetchLocation = async () => {
  if (!locationData.value && locationId.value) {
    error.value = "";

    try {
      await store.fetchLocation(locationId.value);
      const regionId = idFromUrl(store.locations[locationId.value].region.url);
      if (regionId) {
        await store.fetchRegion(regionId);
      }
    } catch (err) {
      error.value = handleError(err);
    }
  }
};

fetchLocation();
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.link-wrapper {
  height: 40px;
}
</style>
