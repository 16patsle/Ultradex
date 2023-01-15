import type { Mark } from "./Mark";

export type JsonSectionRaw = {
  title: string;
  depth: number;
  paragraphs: JsonParagraphRaw[];
  infoboxes: JsonInfobox[];
  lists: JsonListRaw[];
};

export type JsonSection = JsonSectionRaw & {
  paragraphs: JsonParagraph[];
  lists: JsonList[];
};

export type JsonParagraphRaw = {
  sentences: JsonSentenceRaw[];
};

export type JsonParagraph = {
  sentences: JsonSentenceWithParts[];
};

export type JsonSentenceRaw = {
  text: string;
  formatting: {
    bold?: string[];
    italic?: string[];
  };
  links: {
    text: string;
    type: "internal" | "external";
    page: string;
  }[];
};

export type JsonSentenceWithParts = JsonSentenceRaw & {
  parts: Mark[];
};

export type JsonTemplate = {
  template: string;
  [key: string]: unknown;
};

export type JsonInfobox = {
  [key: string]: unknown;
};

export type JsonListRaw = JsonSentenceRaw[];

export type JsonList = JsonSentenceWithParts[];
