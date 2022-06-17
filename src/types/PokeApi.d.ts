declare module "@16patsle/pokeapi.js/dist/pokeapi.esm.js" {
  import type { PokemonSpecies } from "./PokemonSpecies";
  import type { NamedAPIResource } from "./Common";
  import type { Pokemon } from "./Pokemon";
  import type { EvolutionChain } from "./EvolutionChain";
  import type { PokemonForm } from "./PokemonForm";
  import type { Item } from "./Item";
  import type { Location } from "@/types/Location";
  import type { Region } from "@/types/Region";

  interface PokeApi {
    getPokemonSpecies(id: number): Promise<PokemonSpecies>;
    getPokemonSpecies(id: string): Promise<{ results: NamedAPIResource[] }>; // TODO: Resolve this hack
    getPokemon(id: number): Promise<Pokemon>;
    getEvolutionChain(id: number): Promise<EvolutionChain>;
    getPokemonForm(id: number): Promise<PokemonForm>;
    getItem(itemId: number): Promise<Item>;
    getLocation(locationId: number): Promise<Location>;
    getRegion(regionId: number): Promise<Region>;
  }

  const PokeApi: PokeApi;
  export default PokeApi;
}
