export type TextMark = {
  type: "text";
  text: string;
};
export type FormattingMark = {
  type: "bold" | "italic";
  text: string;
};
export type LinkMark = {
  type: "link" | "link-bold" | "link-italic";
  text: string;
  linktype: "internal" | "external";
  page: string;
};
export type Mark = TextMark | FormattingMark | LinkMark;
