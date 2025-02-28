import {
  PokemonByIdResponse,
  PokemonListResponse,
} from "../interfaces/Pokemon";

export const getPokemonList = async (
  offset: number
): Promise<PokemonListResponse["results"]> => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch Pokémon");
  }
  const data: PokemonListResponse = await response.json();

  return data.results;
};

export const getPokemonById = async (
  id: number
): Promise<PokemonByIdResponse> => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (!response.ok) throw new Error(`Failed to fetch Pokémon with ID: ${id}`);
  return response.json();
};
