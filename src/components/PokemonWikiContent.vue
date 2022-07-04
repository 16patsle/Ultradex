<template>
  <div>
    <!-- Headers -->
    <!-- Images -->
    <!-- Tables -->
    <!-- Lists -->
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

defineProps<{
  content: JsonSection;
}>();
</script>
