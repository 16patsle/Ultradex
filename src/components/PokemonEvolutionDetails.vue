<template>
  <li>
    <p v-if="details.trigger.name === 'use-item'">
      After using {{ details.item?.name }}
    </p>
    <div v-if="details.trigger.name === 'level-up'">
      After level up when:
      <ul>
        <li v-if="details.gender">gender is {{ genders[details.gender] }}</li>
        <li v-if="details.known_move_type">
          knowing a {{ details.known_move_type.name }} type move
        </li>
        <li v-if="details.location">location is {{ details.location.name }}</li>
        <li v-if="details.min_affection">
          affection is {{ details.min_affection }} or more
        </li>
        <li v-if="details.min_level">
          level is {{ details.min_level }} or more
        </li>
        <li v-if="details.min_happiness">
          happiness is {{ details.min_happiness }} or more
          <span v-if="details.time_of_day">
            during {{ details.time_of_day }}
          </span>
        </li>
      </ul>
    </div>
  </li>
</template>

<script setup lang="ts">
import type { EvolutionDetail } from "@/types/EvolutionChain";

defineProps<{
  details: EvolutionDetail;
}>();

const genders = {
  1: "female",
  2: "male",
  3: "genderless",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  list-style: disc;
  padding-left: 1.5em;
}
</style>
