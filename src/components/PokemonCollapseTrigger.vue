<template>
  <h2 class="subtitle">
    <fa-icon
      :icon="open ? 'caret-down' : 'caret-right'"
      fixed-width
      :title="title"
    /><slot />
  </h2>
</template>

<script setup>
defineProps({
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
