<template>
  <p v-if="content.sentences?.length > 0" class="paragraph">
    <PokemonWikiContentSentence
      v-for="(sentence, i) in content.sentences"
      :key="i"
      :content="(sentence as JsonSentenceWithParts)"
    />
  </p>
</template>

<script setup lang="ts">
import type {
  JsonParagraph,
  JsonSentenceWithParts,
} from "bulbapedia-data/JsonSection";

defineProps<{
  content: JsonParagraph;
}>();
</script>
