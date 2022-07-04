<template>
  <span>
    <span v-for="(part, i) in content.parts" :key="i">
      <span v-if="part.type === 'bold'" class="text">
        <b>{{ part.text }}</b>
      </span>
      <span v-else-if="part.type === 'italic'" class="text">
        <i>{{ part.text }}</i>
      </span>
      <span v-else-if="part.type === 'link'" class="text">
        <ContentLink :linktype="part.linktype" :page="part.page">{{
          part.text
        }}</ContentLink>
      </span>
      <span v-else-if="part.type === 'link-bold'" class="text">
        <ContentLink :linktype="part.linktype" :page="part.page">
          <b>{{ part.text }}</b>
        </ContentLink>
      </span>
      <span v-else-if="part.type === 'link-italic'" class="text">
        <ContentLink :linktype="part.linktype" :page="part.page">
          <i>{{ part.text }}</i>
        </ContentLink>
      </span>
      <span v-else>{{ part.text }}</span>

      <!--<span v-if="part.type === 'link'" class="link">
        <a :href="part.url" target="_blank">{{ part.text }}</a>
      </span>--> </span
    >&nbsp;</span
  >
</template>

<script setup lang="ts">
import ContentLink from "./ContentLink.vue";

defineProps<{
  content: any;
}>();
</script>
