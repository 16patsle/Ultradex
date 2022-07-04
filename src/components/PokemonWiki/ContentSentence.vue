<template>
  <span>
    <span v-for="(part, i) in parts" :key="i">
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
import { computed } from "vue";
import ContentLink from "./ContentLink.vue";

const props = defineProps<{
  content: any;
}>();

type TextMark = {
  type: "text";
  text: string;
};
type FormattingMark = {
  type: "bold" | "italic";
  text: string;
};
type LinkMark = {
  type: "link" | "link-bold" | "link-italic";
  text: string;
  linktype: "internal" | "external";
  page: string;
};
type Mark = TextMark | FormattingMark | LinkMark;

//console.log(props.content.formatting ?? props.content.links);

const parts = computed(() => {
  const parts: Mark[] = [];
  const formatting: Mark[] = [];
  const links: LinkMark[] = [];

  if (props.content.formatting) {
    Object.entries(props.content.formatting).forEach(
      ([formattingType, text]: [string, string[]]) => {
        text.forEach((text: string) => {
          if (text.length > 0) {
            formatting.push({
              type: formattingType,
              text: text,
            });
          }
        });
      }
    );
  }

  if (props.content.links) {
    props.content.links.forEach(
      (link: { text: string; type: string; page: string }) => {
        const text = link.text ?? link.page;
        if (text.length > 0) {
          const formattingItem = formatting.find(
            (formatting) => formatting.text === text
          );
          if (formattingItem) {
            formattingItem.type = "link-" + formattingItem.type;
            formattingItem.linktype = link.type;
            formattingItem.page = link.page;
          } else {
            links.push({
              type: "link",
              text: text,
              linktype: link.type,
              page: link.page,
            });
          }
        }
      }
    );
  }

  const marks: Mark[] = [];
  let formattingMark: Mark | undefined = undefined;
  let linkMark: Mark | undefined = undefined;
  let count = 0;

  /* eslint-disable-next-line no-constant-condition */
  while (true) {
    if (count >= 100) {
      console.log(
        "END",
        formattingMark,
        linkMark,
        formatting.length,
        links.length
      );
      break;
    }
    if (!formattingMark) {
      formattingMark = formatting.shift();
    }
    if (!linkMark) {
      linkMark = links.shift();
    }

    if (formattingMark) {
      const formattingIndex = props.content.text.indexOf(formattingMark.text);

      if (linkMark) {
        const linkIndex = props.content.text.indexOf(linkMark.text);

        if (linkIndex < formattingIndex) {
          marks.push(linkMark);
          linkMark = undefined;
        } else {
          marks.push(formattingMark);
          formattingMark = undefined;
        }
      } else {
        marks.push(formattingMark);
        formattingMark = undefined;
      }
    } else if (linkMark) {
      marks.push(linkMark);
      linkMark = undefined;
    } else {
      break;
    }
    count++;
  }

  let rest: string = props.content.text;

  marks.forEach((mark) => {
    const split = rest.split(mark.text);
    parts.push({ text: split[0], type: "text" });
    parts.push(mark);
    rest = split[1];
  });
  parts.push({ text: rest, type: "text" });

  return parts;
});
</script>
