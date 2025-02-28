import {
  getPokemonById,
  getPokemonList,
} from "../infrastructure/PokemonRepository";

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

  test("fetches details of a specific Pokémon by ID", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          id: 1,
          name: "bulbasaur",
          sprites: {
            front_default: "https://pokeapi.co/api/v2/sprite/1",
            other: {
              "official-artwork": {
                front_default: "https://pokeapi.co/api/v2/artwork/1",
              },
            },
          },
          types: [{ type: { name: "grass" } }],
          height: 7,
          weight: 69,
          stats: [
            { stat: { name: "hp" }, base_stat: 45 },
            { stat: { name: "attack" }, base_stat: 49 },
          ],
          abilities: [{ ability: { name: "overgrow" } }],
          moves: [{ move: { name: "tackle" } }],
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      )
    );

    const pokemon = await getPokemonById(1);

    expect(fetch).toHaveBeenCalledWith("https://pokeapi.co/api/v2/pokemon/1");
    expect(pokemon.id).toBe(1);
    expect(pokemon.name).toBe("bulbasaur");
    expect(pokemon.sprites.front_default).toBe(
      "https://pokeapi.co/api/v2/sprite/1"
    );
    expect(pokemon.types[0].type.name).toBe("grass");
    expect(pokemon.height).toBe(7);
    expect(pokemon.weight).toBe(69);
    expect(pokemon.stats[0].stat.name).toBe("hp");
    expect(pokemon.stats[0].base_stat).toBe(45);
    expect(pokemon.abilities[0].ability.name).toBe("overgrow");
    expect(pokemon.moves[0].move.name).toBe("tackle");
  });

  test("handles API failure when fetching Pokémon by ID", async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(
      new Error("Failed to fetch Pokémon")
    );

    await expect(getPokemonById(1)).rejects.toThrow("Failed to fetch Pokémon");
  });
});
