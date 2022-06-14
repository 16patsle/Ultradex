<template>
  <button aria-label="Toggle Menu" class="button" @click="emit('click')">
    <div class="icon is-medium">
      <fa-icon
        :icon="open ? 'times' : 'bars'"
        aria-hidden
        title="Toggle Menu"
        size="lg"
        fixed-width
      />
    </div>
  </button>
</template>

<script setup>
defineProps({
  open: { type: Boolean, required: true },
});

const emit = defineEmits(["click"]);
</script>
