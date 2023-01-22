<template>
  <div :class="type">
    <img
      :src="src"
      :alt="alt"
      :loading="lazy ? 'lazy' : 'eager'"
      :decoding="lazy ? 'async' : 'sync'"
    />
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    src: string;
    alt: string;
    type: "icon" | "default";
    lazy?: boolean;
  }>(),
  {
    lazy: true,
  }
);
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.icon,
.icon img {
  width: 40px;
  height: 30px;
}

.default,
.default img {
  width: 30px;
  height: 30px;
}

img {
  image-rendering: pixelated;
  image-rendering: crisp-edges;
}
</style>
