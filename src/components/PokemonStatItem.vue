<template>
  <div class="stat py-1">
    <div class="icon is-medium">
      <fa-icon :icon="icon" size="lg" fixed-width />
    </div>
    <p><slot /></p>
  </div>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    required: true,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.stat {
  font-size: 1.1rem;
}

.stat div,
.stat p {
  display: inline-block;
}
</style>
