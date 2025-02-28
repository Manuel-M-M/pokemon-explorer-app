import { act, waitFor } from "@testing-library/react";
import { usePokemonListStore } from "../../store/PokemonListStore/PokemonListStore";
import { PokemonService } from "../../application/PokemonService";
import { PokemonBasic } from "../../interfaces/Pokemon";

jest.mock("../../application/PokemonService");

const mockPokemons: PokemonBasic[] = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  name: `Pokemon-${i + 1}`,
  image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
    i + 1
  }.png`,
  types: ["grass", "poison"],
}));

describe("PokemonListStore", () => {
  beforeEach(() => {
    usePokemonListStore.setState({
      pokemons: [],
      loading: false,
      error: "",
      page: 1,
      hasMore: true,
    });

    jest.clearAllMocks();
  });

  const store = usePokemonListStore.getState();

  test("should fetch Pokémon from the API and update the store", async () => {
    (PokemonService as jest.Mock).mockImplementation(() => ({
      fetchPokemonList: jest.fn().mockResolvedValue(mockPokemons),
    }));

    await act(async () => {
      await store.fetchNextPage();
    });

    await waitFor(() => {
      expect(usePokemonListStore.getState().pokemons).toEqual(mockPokemons);
    });
  });

  test("should set loading state while fetching and then set it to false", async () => {
    (PokemonService as jest.Mock).mockImplementation(() => ({
      fetchPokemonList: jest.fn().mockResolvedValue(mockPokemons),
    }));

    await act(async () => {
      const store = usePokemonListStore.getState();
      store.fetchNextPage();

      expect(usePokemonListStore.getState().loading).toBe(true);
    });

    await waitFor(() => {
      expect(usePokemonListStore.getState().loading).toBe(false);
    });
  });

  test("should set an error message if fetching fails", async () => {
    (PokemonService as jest.Mock).mockImplementation(() => ({
      fetchPokemonList: jest.fn().mockRejectedValue(new Error("Network error")),
    }));

    await act(async () => {
      await store.fetchNextPage();
    });

    await waitFor(() => {
      expect(usePokemonListStore.getState().error).toBe(
        "Failed to fetch Pokémon"
      );
    });
  });

  test("should not fetch again if initial Pokémon are already loaded", async () => {
    usePokemonListStore.setState({ pokemons: mockPokemons });

    await act(async () => {
      await store.fetchInitialPokemons();
    });

    expect(usePokemonListStore.getState().pokemons).toHaveLength(
      mockPokemons.length
    );
  });

  test("should increment the page number after a successful fetch", async () => {
    (PokemonService as jest.Mock).mockImplementation(() => ({
      fetchPokemonList: jest.fn().mockResolvedValue(mockPokemons),
    }));

    await act(async () => {
      await store.fetchNextPage();
    });

    await waitFor(() => {
      expect(usePokemonListStore.getState().page).toBe(2);
    });
  });

  test("should set `hasMore` to false when no more Pokémon are fetched", async () => {
    (PokemonService as jest.Mock).mockImplementation(() => ({
      fetchPokemonList: jest.fn().mockResolvedValue([]),
    }));

    await act(async () => {
      await store.fetchNextPage();
    });

    await waitFor(() => {
      expect(usePokemonListStore.getState().hasMore).toBe(false);
    });
  });
});
