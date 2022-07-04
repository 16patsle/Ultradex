<template>
  <div>
    <!-- Headers -->
    <!-- Images -->
    <!-- Tables -->
    <!-- Lists -->
    <ul v-for="(list, i) in content.lists" :key="i">
      <li v-for="(item, j) in list" :key="j">
        <ContentSentence :content="item" />
      </li>
    </ul>
    <!-- Paragraphs -->
    <div v-if="content.paragraphs?.length > 0">
      <ContentParagraph
        v-for="(paragraph, i) in content.paragraphs"
        :key="i"
        :content="paragraph"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ContentParagraph from "./PokemonWiki/ContentParagraph.vue";
import type { JsonSection } from "../../bulbapedia-data/JsonSection";
import ContentSentence from "./PokemonWiki/ContentSentence.vue";

defineProps<{
  content: JsonSection;
}>();
</script>
