<template>
  <div class="wiki-wrapper">
    <o-loading :full-page="false" :active="!pokemonWikiEntry"></o-loading>
    <o-notification v-if="error" variant="danger">
      <h2 class="subtitle">ERROR!</h2>
      <p>{{ error.toString() }}</p>
    </o-notification>
    <div v-if="pokemonWikiEntry" class="columns">
      <div class="column">
        <o-collapse class="wiki-collapse">
          <template #trigger="props">
            <PokemonCollapseTrigger
              :open="props.open"
              class="wiki-entry-header"
              title="Show/hide wiki entry"
            >
              Wiki entry
            </PokemonCollapseTrigger>
          </template>
          <div
            class="content"
            v-html="pokemonWikiEntry.text.introduction.html"
          ></div>
          <o-collapse
            v-for="section in makeSortedArray(pokemonWikiEntry.text)"
            :key="section.title"
            :open="false"
            class="wiki-collapse"
          >
            <template #trigger="props">
              <PokemonCollapseTrigger
                :level="3 + parseInt(section.depth)"
                :open="props.open"
                title="Show/hide section"
              >
                {{ section.title }}
              </PokemonCollapseTrigger>
            </template>
            <div class="content" v-html="section.html"></div>
            <o-collapse
              v-for="section2 in section.children"
              :key="section2.title"
              :open="false"
              class="wiki-collapse"
            >
              <template #trigger="props">
                <PokemonCollapseTrigger
                  :level="3 + parseInt(section2.depth)"
                  :open="props.open"
                  title="Show/hide section"
                >
                  {{ section2.title }}
                </PokemonCollapseTrigger>
              </template>
              <div class="content" v-html="section2.html"></div>
              <o-collapse
                v-for="section3 in section2.children"
                :key="section3.title"
                :open="false"
                class="wiki-collapse"
              >
                <template #trigger="props">
                  <PokemonCollapseTrigger
                    :level="3 + parseInt(section3.depth)"
                    :open="props.open"
                    title="Show/hide section"
                  >
                    {{ section3.title }}
                  </PokemonCollapseTrigger>
                </template>
                <div class="content" v-html="section3.html"></div>
              </o-collapse>
            </o-collapse>
          </o-collapse>
          <p class="copyright">
            &copy; Bulbapedia contributors, licensed under
            <a
              href="https://creativecommons.org/licenses/by-nc-sa/2.5/"
              target="_blank"
              rel="noopener"
              >CC BY-NC-SA 2.5</a
            >
          </p>
        </o-collapse>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { usePokemonStore } from "../stores/pokemonStore";
import PokemonCollapseTrigger from "@/components/PokemonCollapseTrigger.vue";
import { handleError } from "@/utils/handleError";

const props = defineProps({
  pokemonId: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["loaded"]);

const store = usePokemonStore();

const error = ref("");
const pokemonWikiEntry = computed(
  () => store.pokemonWikiEntries[props.pokemonId]
);

const makeSortedArray = (object) => {
  const array = [];
  for (const section in object) {
    array[object[section].index] = object[section];
  }
  return array
    .slice(1)
    .filter(Object)
    .filter((section) => {
      switch (section.title) {
        case "Game data":
        case "In other languages":
        case "Notes":
        case "Related articles":
        case "External links":
        case "References":
          return false;
        default:
          return true;
      }
    });
};

const fetchPokemonWikiEntry = async () => {
  if (!store.pokemonWikiEntries[props.pokemonId]) {
    error.value = "";

    try {
      await store.fetchPokemonWikiEntry(props.pokemonId);
      emit("loaded");
    } catch (err) {
      error.value = handleError(err);
    }
  } else {
    emit("loaded");
  }
};

fetchPokemonWikiEntry();
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.wiki-wrapper {
  position: relative;
  min-height: 250px;
}

.copyright {
  padding-top: 8px;
  padding-left: 10px;
  margin-bottom: 2rem;
  font-size: 0.8rem;
}

h2.wiki-entry-header {
  padding-bottom: 10px;
}

.wiki-collapse p,
.wiki-collapse .wiki-collapse {
  padding-left: 31px;
}

.wiki-wrapper h3,
.wiki-wrapper h4,
.wiki-wrapper h5,
.wiki-wrapper h6 {
  color: #4a4a4a;
  font-weight: 400;
  line-height: 1.125;
  margin-bottom: 0.6666em;
}

.wiki-wrapper .content {
  margin-bottom: 1.5rem;
}
</style>
<style>
.wiki-wrapper .content .main-article-link {
  padding-bottom: 10px;
}
</style>
