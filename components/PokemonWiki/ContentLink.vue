<template>
  <a :href="link">
    <slot />
  </a>
</template>

<script setup lang="ts">
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
