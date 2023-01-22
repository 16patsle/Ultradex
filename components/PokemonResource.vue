<template>
  <slot v-if="resourceData" :resource="resourceData" />
  <slot v-else name="else">&nbsp;</slot>
  <slot v-if="error" name="error" :error="error" />
</template>

<script setup lang="ts">
import type { APIResource } from "@16patsle/pokeapi.js";

const props = defineProps<{
  resource: APIResource;
  fetch: (id: number) => Promise<unknown>;
}>();

const resourceId = computed(() => idFromUrl(props.resource.url));

const { data: resourceData, error } = await useAsyncData(
  props.resource.url,
  () =>
    resourceId.value
      ? props.fetch(resourceId.value)
      : Promise.reject("Missing id")
);
</script>
