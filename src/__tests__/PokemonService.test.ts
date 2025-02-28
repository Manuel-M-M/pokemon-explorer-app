import { PokemonService } from "../application/PokemonService";
import { getPokemonList } from "../infrastructure/PokemonRepository";

const pokemonNames: Record<number, string> = {
  1: "bulbasaur",
  4: "charmander",
  16: "pidgey",
  19: "rattata",
};

const pokemonTypes: Record<number, string> = {
  1: "grass",
  4: "fire",
  16: "normal",
  19: "normal",
};

jest.mock("../infrastructure/PokemonRepository", () => ({
  getPokemonList: jest.fn(),
}));

global.fetch = jest.fn();

const pokemonService = new PokemonService();

describe("PokemonService", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (fetch as jest.Mock).mockImplementation((url: string) => {
      const id = Number(url.split("/").filter(Boolean).pop());

      return Promise.resolve(
        new Response(
          JSON.stringify({
            id,
            name: pokemonNames[id] || `unknown-${id}`,
            sprites: {
              front_default: `https://pokeapi.co/api/v2/sprite/${id}`,
            },
            types: [{ type: { name: pokemonTypes[id] || "unknown" } }],
          }),
          { status: 200, headers: { "Content-Type": "application/json" } }
        )
      );
    });
  });

  test("fetches the first page of Pokémon successfully", async () => {
    (getPokemonList as jest.Mock).mockResolvedValue([
      { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1" },
      { name: "charmander", url: "https://pokeapi.co/api/v2/pokemon/4" },
    ]);

    const pokemons = await pokemonService.fetchPokemonList(1);

    expect(getPokemonList).toHaveBeenCalledWith(0);
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenCalledWith("https://pokeapi.co/api/v2/pokemon/1");
    expect(fetch).toHaveBeenCalledWith("https://pokeapi.co/api/v2/pokemon/4");

    expect(pokemons).toHaveLength(2);
    expect(pokemons[0]).toEqual({
      id: 1,
      name: "bulbasaur",
      image: "https://pokeapi.co/api/v2/sprite/1",
      types: ["grass"],
    });
  });

  test("fetches Pokémon for a different page correctly", async () => {
    (getPokemonList as jest.Mock).mockResolvedValue([
      { name: "pidgey", url: "https://pokeapi.co/api/v2/pokemon/16" },
      { name: "rattata", url: "https://pokeapi.co/api/v2/pokemon/19" },
    ]);

    const pokemons = await pokemonService.fetchPokemonList(2);

    expect(getPokemonList).toHaveBeenCalledWith(20);
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenCalledWith("https://pokeapi.co/api/v2/pokemon/16");
    expect(fetch).toHaveBeenCalledWith("https://pokeapi.co/api/v2/pokemon/19");

    expect(pokemons).toHaveLength(2);
    expect(pokemons[0]).toEqual({
      id: 16,
      name: "pidgey",
      image: "https://pokeapi.co/api/v2/sprite/16",
      types: ["normal"],
    });
  });

  test("handles API failure correctly", async () => {
    (getPokemonList as jest.Mock).mockRejectedValue(new Error("API error"));

    await expect(pokemonService.fetchPokemonList(1)).rejects.toThrow(
      "API error"
    );
  });
});
