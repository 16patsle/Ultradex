import type { Mark } from "./Mark";

export type JsonSection = {
  title: string;
  depth: number;
  paragraphs: JsonParagraph[];
  infoboxes: JsonInfobox[];
  lists: JsonList[];
};

export type JsonParagraph = {
  sentences: JsonSentence[];
};

export type JsonSentence = {
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

export type JsonSentenceWithParts = JsonSentence & {
  parts: Mark[];
};

export type JsonTemplate = {
  template: string;
  [key: string]: unknown;
};

export type JsonInfobox = {
  [key: string]: unknown;
};

export type JsonList = {
  text: string;
}[];
