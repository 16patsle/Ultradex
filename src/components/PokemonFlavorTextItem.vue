<template>
  <o-tab-item
    v-if="text && versionNames?.length > 0"
    :value="versionNames[1] ?? versionNames[0]"
    :label="label"
  >
    <p>{{ text }}</p>
  </o-tab-item>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { FlavorText } from "@16patsle/pokeapi.js";

const props = defineProps<{
  versionNames: string[];
  flavorText: FlavorText;
}>();

const label = computed(() => {
  return props.versionNames.join(", ");
});
const text = computed(() => props.flavorText.flavor_text);
</script>
