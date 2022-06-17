import type { GenerationGameIndex, Name, NamedAPIResource } from "./Common";

export type Location = {
  /**
   * The identifier for this resource.
   */
  id: number;
  /**
   * The name for this resource.
   */
  name: string;
  /**
   * The region this location can be found in.
   */
  region: NamedAPIResource;
  /**
   * The name of this resource listed in different languages.
   */
  names: Name[];
  /**
   * A list of game indices relevent to this location by generation.
   */
  game_indices: GenerationGameIndex[];
  /**
   * Areas that can be found within this location.
   */
  areas: NamedAPIResource[];
};

export type Region = {
  /**
   * The identifier for this resource.
   */
  id: number;
  /**
   * A list of locations that can be found in this region.
   */
  name: string;
  /**
   * The name for this resource.
   */
  locations: NamedAPIResource[];
  /**
   * The name of this resource listed in different languages.
   */
  names: Name[];
  /**
   * The generation this region was introduced in.
   */
  main_generation: NamedAPIResource;
  /**
   * A list of pokédexes that catalogue Pokémon in this region.
   */
  pokedexes: NamedAPIResource[];
  /**
   * A list of version groups where this region can be visited.
   */
  version_groups: NamedAPIResource[];
};
