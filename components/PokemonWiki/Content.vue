<template>
  <div>
    <!-- Headers -->
    <!-- Images -->
    <!-- Tables -->
    <!-- Lists -->
    <ul v-for="(list, i) in content.lists" :key="i">
      <li v-for="(item, j) in list" :key="j">
        <PokemonWikiContentSentence :content="item" />
      </li>
    </ul>
    <!-- Paragraphs -->
    <div v-if="content.paragraphs?.length > 0">
      <PokemonWikiContentParagraph
        v-for="(paragraph, i) in content.paragraphs"
        :key="i"
        :content="paragraph"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { JsonSection } from "../bulbapedia-data/JsonSection";

defineProps<{
  content: JsonSection;
}>();
</script>
