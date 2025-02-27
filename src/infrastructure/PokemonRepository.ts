export const getPokemonList = async (offset: number) => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch Pokémon");
  }
  const data = await response.json();
  return data.results;
};
