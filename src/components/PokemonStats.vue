<template>
  <div class="stats-wrapper">
    <div v-if="height" class="stat"><div class="icon is-medium"><fa-icon icon="arrows-alt-v" size="lg" fixed-width/></div>
      <p>Height: {{height / 10}} m</p>
    </div>
    <div v-if="weight" class="stat"><div class="icon is-medium"><fa-icon icon="weight-hanging" size="lg" fixed-width/></div>
      <p>Weight: {{weight / 10}} kg</p>
    </div>
    <div v-for="stat in stats" :key="stat.stat.name" class="stat"><div class="icon is-medium"><fa-icon v-if="statIcon(stat.stat.name)" :icon="statIcon(stat.stat.name)" size="lg" fixed-width/></div>
      <p>{{ stat.stat.name.replace('-', ' ').replace('hp','HP') | titlecase }}: {{ stat.base_stat }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "PokemonStats",
  props: {
    height: { type: Number, required: false, default: null },
    weight: { type: Number, required: false, default: null },
    stats: { type: Array, required: true }
  },
  methods: {
    statIcon(name) {
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
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.stats-wrapper {
  background-color: #eee;
}

.stat {
  padding: 5px 0;
  font-size: 1.1rem;
}

.stat div,
.stat p {
  display: inline-block;
}
</style>
