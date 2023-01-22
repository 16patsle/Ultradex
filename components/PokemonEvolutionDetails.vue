<template>
  <li>
    <div
      v-if="details.trigger.name === 'use-item'"
      class="is-flex is-align-items-center"
    >
      After using <PokemonItem v-if="details.item" :item="details.item" />
    </div>
    <div
      v-if="details.trigger.name === 'trade'"
      class="is-flex is-align-items-center"
    >
      After trading while holding
      <PokemonItem v-if="details.held_item" :item="details.held_item" />
    </div>
    <div v-if="details.trigger.name === 'level-up'">
      After level up when:
      <ul>
        <li v-if="details.gender">gender is {{ genders[details.gender] }}</li>
        <li v-if="details.known_move_type">
          knowing a {{ details.known_move_type.name }} type move
        </li>
        <li v-if="details.location">
          location is
          <PokemonLocation
            v-if="details.location"
            :location="details.location"
          />
        </li>
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
        <li v-if="details.held_item">
          holding <PokemonItem :item="details.held_item" />
          <span v-if="details.time_of_day">
            during {{ details.time_of_day }}
          </span>
        </li>
      </ul>
    </div>
    <div
      v-if="details.trigger.name === 'recoil-damage'"
      class="is-flex is-align-items-center"
    >
      After receiving recoil damage
    </div>
    <div
      v-if="details.trigger.name === 'strong-style-move'"
      class="is-flex is-align-items-center"
    >
      After using
      <PokemonMove v-if="details.known_move" :move="details.known_move" /> in
      the strong style
    </div>
  </li>
</template>

<script setup lang="ts">
import type { EvolutionDetail } from "@16patsle/pokeapi.js";

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
