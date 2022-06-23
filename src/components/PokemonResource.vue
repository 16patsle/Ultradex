<template>
  <slot v-if="resourceData" :resource="resourceData" />
  <slot v-else name="else">&nbsp;</slot>
  <slot v-if="error" name="error" :error="error" />
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import type { APIResource } from "@16patsle/pokeapi.js";
import { idFromUrl } from "@/utils/idFromUrl";
import { handleError } from "@/utils/handleError";

const props = defineProps<{
  resource: APIResource;
  storeArray: any[];
  fetch: (id: number) => Promise<void>;
}>();

const error = ref("");

const resourceId = computed(() => idFromUrl(props.resource.url));

const resourceData = computed(() =>
  resourceId.value ? props.storeArray[resourceId.value] : null
);

const fetchResource = async () => {
  if (!resourceData.value && resourceId.value) {
    try {
      await props.fetch(resourceId.value);
    } catch (err) {
      error.value = handleError(err);
    }
  }
};

watch(() => props.resource, fetchResource);

fetchResource();
</script>
