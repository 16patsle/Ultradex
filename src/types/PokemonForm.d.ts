export type PokemonForm = {
  /**
   * The identifier for this resource.
   */
  id: number;
  /**
   * The name for this resource.
   */
  name: string;
  /**
   * True for exactly one form used as the default for each Pokémon.
   */
  is_default: boolean;
  /**
   * Whether or not this form can only happen during battle.
   */
  is_battle_only: boolean;
  /**
   * Whether or not this form requires mega evolution.
   */
  is_mega: boolean;
  /**
   * The name of this form.
   */
  form_name: string;
  /**
   * The Pokémon that can take on this form.
   */
  pokemon: NamedAPIResource;
};
