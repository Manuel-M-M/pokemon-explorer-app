import fetchMock from "jest-fetch-mock";
import { getPokemonList } from "../infrastructure/PokemonRepository";

beforeEach(() => {
  fetchMock.resetMocks();
});

describe("PokemonRepository", () => {
  test("fetches the first 20 Pokémon successfully", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        results: Array.from({ length: 20 }, (_, i) => ({
          name: `pokemon-${i + 1}`,
          url: `https://pokeapi.co/api/v2/pokemon/${i + 1}`,
        })),
      })
    );

    const pokemonList = await getPokemonList(0);
    expect(pokemonList).toHaveLength(20);
    expect(pokemonList[0].name).toBe("pokemon-1");
  });

  test("fetches the next 20 Pokémon using pagination", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        results: Array.from({ length: 20 }, (_, i) => ({
          name: `pokemon-${21 + i}`,
          url: `https://pokeapi.co/api/v2/pokemon/${21 + i}`,
        })),
      })
    );

    const pokemonList = await getPokemonList(20);
    expect(pokemonList).toHaveLength(20);
    expect(pokemonList[0].name).toBe("pokemon-21");
  });

  test("handles API failure gracefully", async () => {
    fetchMock.mockReject(new Error("Failed to fetch Pokémon"));

    await expect(getPokemonList(0)).rejects.toThrow("Failed to fetch Pokémon");
  });
});
