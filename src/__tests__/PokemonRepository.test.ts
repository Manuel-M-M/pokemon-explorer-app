import { getPokemonList } from "../infrastructure/PokemonRepository";

global.fetch = jest.fn();

describe("PokemonRepository", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("fetches the first 20 Pokémon successfully", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          results: Array.from({ length: 20 }, (_, i) => ({
            name: `pokemon-${i + 1}`,
            url: `https://pokeapi.co/api/v2/pokemon/${i + 1}`,
          })),
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      )
    );

    const pokemonList = await getPokemonList(0);

    expect(fetch).toHaveBeenCalledWith(
      "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0"
    );
    expect(pokemonList).toHaveLength(20);
    expect(pokemonList[0].name).toBe("pokemon-1");
  });

  test("fetches the next 20 Pokémon using pagination", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          results: Array.from({ length: 20 }, (_, i) => ({
            name: `pokemon-${21 + i}`,
            url: `https://pokeapi.co/api/v2/pokemon/${21 + i}`,
          })),
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      )
    );

    const pokemonList = await getPokemonList(20);

    expect(fetch).toHaveBeenCalledWith(
      "https://pokeapi.co/api/v2/pokemon?limit=20&offset=20"
    );
    expect(pokemonList).toHaveLength(20);
    expect(pokemonList[0].name).toBe("pokemon-21");
  });

  test("handles API failure gracefully", async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(
      new Error("Failed to fetch Pokémon")
    );

    await expect(getPokemonList(0)).rejects.toThrow("Failed to fetch Pokémon");
  });
});
