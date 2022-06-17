<template>
  <div :class="type.toLowerCase()">{{ type }}</div>
</template>

<script setup lang="ts">
defineProps<{ type: string }>();
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div {
  display: inline-block;
  border: 1.5px solid black;
  border-radius: 5px;
  padding: 5px;
  margin: 5px;
  color: white;
  font-weight: 500;
  width: 75px;
}

.normal {
  background-color: #a8a878;
  border-color: #6d6d4e;
}
.fire {
  background-color: #f08030;
  border-color: #9c531f;
}
.fighting {
  background-color: #c03028;
  border-color: #7d1f1a;
}
.water {
  background-color: #6890f0;
  border-color: #445e9c;
}
.flying {
  background-color: #a890f0;
  border-color: #6d5e9c;
}
.grass {
  background-color: #78c850;
  border-color: #4e8234;
}
.poison {
  background-color: #a040a0;
  border-color: #682a68;
}
.electric {
  background-color: #f8d030;
  border-color: #a1871f;
}
.ground {
  background-color: #e0c068;
  border-color: #927d44;
}
.psychic {
  background-color: #f85888;
  border-color: #a13959;
}
.rock {
  background-color: #b8a038;
  border-color: #786824;
}
.ice {
  background-color: #98d8d8;
  border-color: #638d8d;
}
.bug {
  background-color: #a8b820;
  border-color: #6d7815;
}
.dragon {
  background-color: #7038f8;
  border-color: #4924a1;
}
.ghost {
  background-color: #705898;
  border-color: #493963;
}
.dark {
  background-color: #705848;
  border-color: #49392f;
}
.steel {
  background-color: #b8b8d0;
  border-color: #787887;
}
.fairy {
  background-color: #ee99ac;
  border-color: #9b6470;
}
</style>
