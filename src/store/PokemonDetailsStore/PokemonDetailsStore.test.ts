import { act, waitFor } from "@testing-library/react";
import { usePokemonDetailsStore } from "../../store/PokemonDetailsStore/PokemonDetailsStore";
import { PokemonService } from "../../application/PokemonService";
import { PokemonDetailed } from "../../interfaces/Pokemon";

jest.mock("../../application/PokemonService");

const mockPokemon: PokemonDetailed = {
  id: 1,
  name: "Bulbasaur",
  image:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
  types: ["grass", "poison"],
  height: 7,
  weight: 69,
  stats: [
    { name: "HP", value: 45 },
    { name: "Attack", value: 49 },
  ],
  abilities: ["overgrow"],
  moves: ["tackle", "vine-whip"],
};

describe("PokemonDetailsStore", () => {
  beforeEach(() => {
    usePokemonDetailsStore.setState({
      pokemon: null,
      loading: false,
      error: "",
    });

    jest.clearAllMocks();
  });

  const store = usePokemonDetailsStore.getState();

  test("should fetch Pokémon details and update the store", async () => {
    (PokemonService as jest.Mock).mockImplementation(() => ({
      fetchPokemonDetails: jest.fn().mockResolvedValue(mockPokemon),
    }));

    await act(async () => {
      await store.fetchPokemonDetails(1);
    });

    await waitFor(() => {
      expect(usePokemonDetailsStore.getState().pokemon).toEqual(mockPokemon);
    });
  });

  test("should set loading state while fetching and then set it to false", async () => {
    (PokemonService as jest.Mock).mockImplementation(() => ({
      fetchPokemonDetails: jest.fn().mockResolvedValue(mockPokemon),
    }));

    await act(async () => {
      store.fetchPokemonDetails(1);
      expect(usePokemonDetailsStore.getState().loading).toBe(true);
    });

    await waitFor(() => {
      expect(usePokemonDetailsStore.getState().loading).toBe(false);
    });
  });

  test("should set an error message if fetching fails", async () => {
    (PokemonService as jest.Mock).mockImplementation(() => ({
      fetchPokemonDetails: jest
        .fn()
        .mockRejectedValue(new Error("Network error")),
    }));

    await act(async () => {
      await store.fetchPokemonDetails(1);
    });

    await waitFor(() => {
      expect(usePokemonDetailsStore.getState().error).toBe(
        "Failed to fetch Pokémon details"
      );
    });
  });

  test("should clear the Pokémon details when calling clearPokemon", async () => {
    usePokemonDetailsStore.setState({ pokemon: mockPokemon });

    act(() => {
      store.clearPokemon();
    });

    await waitFor(() => {
      expect(usePokemonDetailsStore.getState().pokemon).toBeNull();
    });
  });
});
