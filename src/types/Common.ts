export type APIResource = {
  /**
   * The URL of the referenced resource.
   */
  url: string;
};

export type Description = {
  /**
   * The localized description for an API resource in a specific language.
   */
  description: string;
  /**
   * The language this description is in.
   */
  language: NamedAPIResource;
};

export type FlavorText = {
  /**
   * The localized flavor text for an API resource in a specific language.
   */
  flavor_text: string;
  /**
   * The language this flavor text is in.
   */
  language: NamedAPIResource;
  /**
   * The game version this flavor text is extracted from.
   */
  version: NamedAPIResource;
};

export type GenerationGameIndex = {
  /**
   * The internal id of an API resource within game data.
   */
  game_index: number;
  /**
   * The generation relevent to this game index.
   */
  generation: NamedAPIResource;
};

export type MachineVersionDetail = {
  /**
   * The machine that teaches a move from an item.
   */
  machine: APIResource;
  /**
   * The version group of this specific machine.
   */
  version_group: NamedAPIResource;
};

export type Name = {
  /**
   * The localized name for an API resource in a specific language
   */
  name: string;
  /**
   * The language this name is in.
   */
  language: NamedAPIResource;
};

export type NamedAPIResource = {
  /**
   * The name of the referenced resource.
   */
  name: string;
  /**
   * The URL of the referenced resource.
   */
  url: string;
};

export type VerboseEffect = {
  /**
   * The localized effect text for an API resource in a specific language.
   */
  effect: string;
  /**
   * The localized effect text in brief.
   */
  short_effect: string;
  /**
   * The language this effect is in.
   */
  language: NamedAPIResource;
};

export type VersionGameIndex = {
  /**
   * The internal id of an API resource within game data.
   */
  game_index: number;
  /**
   * The version relevent to this game index.
   */
  version: NamedAPIResource;
};

export type VersionGroupFlavorText = {
  /**
   * The localized name for an API resource in a specific language.
   */
  text: string;
  /**
   * The language this name is in.
   */
  language: NamedAPIResource;
  /**
   * The version group which uses this flavor text.
   */
  version_group: NamedAPIResource;
};
