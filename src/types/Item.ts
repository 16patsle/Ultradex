import type {
  APIResource,
  GenerationGameIndex,
  MachineVersionDetail,
  Name,
  NamedAPIResource,
  VerboseEffect,
  VersionGroupFlavorText,
} from "./Common";

export type Item = {
  /**
   * The identifier for this resource.
   */
  id: number;
  /**
   * The name for this resource.
   */
  name: string;
  /**
   * The price of this item in stores.
   */
  cost: string;
  /**
   * The power of the move Fling when used with this item.
   */
  fling_power: number;
  /**
   * The effect of the move Fling when used with this item.
   */
  fling_effect: NamedAPIResource;
  /**
   * A list of attributes this item has.
   */
  attributes: NamedAPIResource[];
  /**
   * The category of items this item falls into.
   */
  category: NamedAPIResource;
  /**
   * The effect of this ability listed in different languages.
   */
  effect_entries: VerboseEffect[];
  /**
   * The flavor text of this ability listed in different languages.
   */
  flavor_text_entries: VersionGroupFlavorText[];
  /**
   * A list of game indices relevant to this item by generation.
   */
  game_indices: GenerationGameIndex[];
  /**
   * The name of this item listed in different languages.
   */
  names: Name[];
  /**
   * A set of sprites used to depict this item in the game.
   */
  sprites: ItemSprites;
  /**
   * A list of Pokémon that might be found in the wild holding this item.
   */
  held_by_pokemon: ItemHolderPokemon;
  /**
   * An evolution chain this item requires to produce a baby during mating.
   */
  baby_trigger_for: APIResource;
  /**
   * A list of the machines related to this item.
   */
  machines: MachineVersionDetail[];
};

type ItemSprites = {
  /**
   * The default depiction of this item.
   */
  default: string;
};

type ItemHolderPokemon = {
  /**
   * The Pokémon that holds this item.
   */
  pokemon: NamedAPIResource;
  /**
   * The details for the version that this item is held in by the Pokémon.
   */
  version_details: ItemHolderPokemonVersionDetail[];
};

type ItemHolderPokemonVersionDetail = {
  /**
   * How often this Pokémon holds this item in this version.
   */
  rarity: number;
  /**
   * The version that this item is held in by the Pokémon.
   */
  version: NamedAPIResource;
};
