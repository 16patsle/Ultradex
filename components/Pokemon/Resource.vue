<template>
  <slot v-if="resource.data" :resource="resource.data" />
  <slot v-else name="else">&nbsp;</slot>
  <slot v-if="resource.error" name="error" :error="resource.error" />
</template>

<script setup lang="ts">
defineProps<{
  resource: ReturnType<typeof useAsyncData>;
}>();
</script>
