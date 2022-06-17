import type { PokemonForm } from "./PokemonForm";

export type Pokemon = {
  /**
   * The identifier for this resource.
   */
  id: number;
  /**
   * The name for this resource.
   */
  name: string;
  /**
   * The height of this Pokémon in decimetres.
   */
  base_experience: number;
  /**
   * The height of this Pokémon in decimetres.
   */
  height: number;
  /**
   * True for exactly one form used as the default for each Pokémon.
   */
  is_default: boolean;
  /**
   * Order for sorting. Almost national order, except families are grouped together.
   */
  order: number;
  /**
   * The weight of this Pokémon in hectograms.
   */
  weight: number;

  /**
   * A list of forms this Pokémon can take on.
   */
  forms: (NamedAPIResource & {
    data: PokemonForm;
  })[];

  /**
   * A set of sprites used to depict this Pokémon in the game.
   * A visual representation of the various sprites can be found at {@link https://github.com/PokeAPI/sprites#sprites PokeAPI/sprites}
   */
  sprites: PokemonSprites;

  /**
   * A list of base stat values for this Pokémon.
   */
  stats: PokemonStat[];
};

type PokemonSprites = {
  /**
   * The default depiction of this Pokémon from the front in battle.
   */
  front_default: string;
  /**
   * The shiny depiction of this Pokémon from the front in battle.
   */
  front_shiny: string;
  /**
   * The female depiction of this Pokémon from the front in battle.
   */
  front_female: string;
  /**
   * The shiny female depiction of this Pokémon from the front in battle.
   */
  front_shiny_female: string;
  /**
   * The default depiction of this Pokémon from the back in battle.
   */
  back_default: string;
  /**
   * The shiny depiction of this Pokémon from the back in battle.
   */
  back_shiny: string;
  /**
   * The female depiction of this Pokémon from the back in battle.
   */
  back_female: string;
  /**
   * The shiny female depiction of this Pokémon from the back in battle.
   */
  back_shiny_female: string;
};

type PokemonStat = {
  /**
   * The stat the Pokémon has.
   */
  stat: NamedAPIResource;
  /**
   * The effort points (EV) the Pokémon has in the stat.
   */
  effort: number;
  /**
   * The base value of the stat.
   */
  base_stat: number;
};
