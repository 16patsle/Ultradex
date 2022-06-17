declare module "@16patsle/pokeapi.js/dist/pokeapi.esm.js" {
  interface PokeApi {
    getPokemonSpecies(id: number): Promise<PokemonSpecies>;
    getPokemonSpecies(id: string): Promise<{ results: NamedAPIResource[] }>; // TODO: Resolve this hack
    getPokemon(id: number): Promise<Pokemon>;
    getEvolutionChain(id: number): Promise<any>;
    getPokemonForm(id: number): Promise<PokemonForm>;
    getItem(itemId: number) :Promise<Item>;
  }

  const PokeApi: PokeApi;
  export default PokeApi;
}
