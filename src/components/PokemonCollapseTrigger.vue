<template>
  <PokemonHeading class="subtitle" :level="level">
    <fa-icon
      :icon="open ? 'caret-down' : 'caret-right'"
      fixed-width
      :title="title"
    /><slot />
  </PokemonHeading>
</template>

<script setup lang="ts">
import PokemonHeading from "@/components/PokemonHeading.vue";

withDefaults(
  defineProps<{
    level?: number;
    open?: boolean;
    title?: string;
  }>(),
  {
    level: 2,
    open: false,
    title: "Show/hide",
  }
);
</script>
