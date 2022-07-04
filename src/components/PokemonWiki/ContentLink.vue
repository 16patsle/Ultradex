<template>
  <a :href="link">
    <slot />
  </a>
</template>

<script setup lang="ts">
import { capitalize } from "@/utils/capitalize";
import { computed } from "vue";

const props = defineProps<{
  linktype: "internal" | "external";
  page: string;
}>();

const link = computed(() => {
  if (props.linktype === "internal") {
    const page = capitalize(props.page.replaceAll(" ", "_"));
    return `https://bulbapedia.bulbagarden.net/wiki/${page}`;
  } else {
    return props.page;
  }
});
</script>
