<template>
  <PokemonHeading class="subtitle" :level="level">
    <fa-icon
      :icon="open ? 'caret-down' : 'caret-right'"
      fixed-width
      :title="title"
    /><slot />
  </PokemonHeading>
</template>

<script setup>
import PokemonHeading from "@/components/PokemonHeading.vue";

defineProps({
  level: { type: Number, default: 2 },
  open: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "Show/hide",
  },
});
</script>
