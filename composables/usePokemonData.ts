export const usePokemonSpeciesData = async (id: number) => {
  const store = usePokemonStore();
  const { data: pokemon, error } = await useAsyncData(
    `pokemon-species/${id}`,
    () => store.fetchPokemonSpecies(id)
  );
  return { pokemon, error };
};

export const usePokemonSpeciesListData = async () => {
  const store = usePokemonStore();
  const { data: pokemonList, error } = await useAsyncData(
    `pokemon-species`,
    () => store.fetchPokemonSpecies(null)
  );
  return { pokemonList, error };
};

export const usePokemonVarietyData = async (
  speciesId?: number,
  varietyId?: number
) => {
  const store = usePokemonStore();
  const { data: pokemon, error } = await useAsyncData(
    `pokemon/${speciesId}/${varietyId}`,
    () =>
      speciesId !== undefined && varietyId !== undefined
        ? store.fetchPokemonVariety(speciesId, varietyId)
        : Promise.reject("Missing id(s)")
  );
  return { pokemon, error };
};

export const usePokemonVarietyFormsData = async (id?: number) => {
  const store = usePokemonStore();
  const { data: pokemonForms, error } = await useAsyncData(
    `pokemon-variety-forms/${id}`,
    () =>
      id !== undefined
        ? store.fetchPokemonVarietyForms(id)
        : Promise.reject("Missing id")
  );
  return { pokemonForms, error };
};
