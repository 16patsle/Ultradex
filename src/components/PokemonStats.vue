<template>
  <div class="stats-wrapper notification">
    <div v-if="height" class="stat py-1">
      <div class="icon is-medium">
        <fa-icon icon="arrows-alt-v" size="lg" fixed-width />
      </div>
      <p>Height: {{ height / 10 }} m</p>
    </div>
    <div v-if="weight" class="stat py-1">
      <div class="icon is-medium">
        <fa-icon icon="weight-hanging" size="lg" fixed-width />
      </div>
      <p>Weight: {{ weight / 10 }} kg</p>
    </div>
    <div v-for="stat in stats" :key="stat.stat.name" class="stat py-1">
      <div class="icon is-medium">
        <fa-icon
          v-if="statIcon(stat.stat.name)"
          :icon="statIcon(stat.stat.name)"
          size="lg"
          fixed-width
        />
      </div>
      <p>
        {{ $titlecase(stat.stat.name.replace("-", " ").replace("hp", "HP")) }}:
        {{ stat.base_stat }}
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  height: { type: Number, required: false, default: null },
  weight: { type: Number, required: false, default: null },
  stats: { type: Array, required: true },
});

const statIcon = (name) => {
  switch (name) {
    case "speed":
      return "feather-alt";
    case "special-defense":
      return "shield-alt";
    case "special-attack":
      return "bolt";
    case "defense":
      return "shield-alt";
    case "attack":
      return "bolt";
    case "hp":
      return "heart";
    default:
      return null;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.stats-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.25rem;
  align-items: center;
}

.stat {
  font-size: 1.1rem;
}

.stat div,
.stat p {
  display: inline-block;
}
</style>
