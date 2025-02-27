import { PokemonService } from "../application/PokemonService";
import { getPokemonList } from "../infrastructure/PokemonRepository";

jest.mock("../infrastructure/PokemonRepository", () => ({
  getPokemonList: jest.fn(),
}));

const pokemonService = new PokemonService();

describe("PokemonService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("fetches the first page of Pokémon successfully", async () => {
    (getPokemonList as jest.Mock).mockResolvedValue([
      { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1" },
      { name: "charmander", url: "https://pokeapi.co/api/v2/pokemon/4" },
    ]);

    const pokemons = await pokemonService.fetchPokemonList(1);

    expect(getPokemonList).toHaveBeenCalledWith(0);
    expect(pokemons).toHaveLength(2);
    expect(pokemons[0].name).toBe("bulbasaur");
  });

  test("fetches Pokémon for a different page correctly", async () => {
    (getPokemonList as jest.Mock).mockResolvedValue([
      { name: "pidgey", url: "https://pokeapi.co/api/v2/pokemon/16" },
      { name: "rattata", url: "https://pokeapi.co/api/v2/pokemon/19" },
    ]);

    const pokemons = await pokemonService.fetchPokemonList(2);

    expect(getPokemonList).toHaveBeenCalledWith(20);
    expect(pokemons).toHaveLength(2);
    expect(pokemons[0].name).toBe("pidgey");
  });

  test("handles API failure correctly", async () => {
    (getPokemonList as jest.Mock).mockRejectedValue(new Error("API error"));

    await expect(pokemonService.fetchPokemonList(1)).rejects.toThrow(
      "API error"
    );
  });
});
