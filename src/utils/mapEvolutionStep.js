export const mapEvolutionStep = (chain) => {
  // When last in the chain
  if (!chain) {
    return [];
  }
  // For the first evolution, only evolves_to exist
  // For the last evolution, only evolution_details exist
  // This finds the right length of the array
  const length = Math.max(
    chain.evolution_details.length,
    chain.evolves_to.length
  );
  const steps = [];
  for (let i = 0; i < length; i++) {
    // Combine evolution_details and evolves_to
    steps.push({
      evolution_details: chain.evolution_details[i],
      evolves_to: chain.evolves_to[i],
      is_baby: chain.is_baby,
      species: chain.species,
    });
  }
  return steps;
};
