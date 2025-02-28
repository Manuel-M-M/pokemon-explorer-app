import { act, waitFor } from "@testing-library/react";
import { useFavoritesStore } from "../../store/PokemonFavoritesStore/PokemonFavoritesStore";

describe("PokemonFavoritesStore", () => {
  beforeEach(() => {
    useFavoritesStore.setState({
      favorites: [],
    });

    localStorage.clear();
  });

  const store = useFavoritesStore.getState();

  test("should add a Pokémon to favorites", async () => {
    const pokemon = {
      id: 1,
      name: "Bulbasaur",
      image: "bulbasaur.png",
      types: ["grass"],
    };

    act(() => {
      store.addFavorite(pokemon);
    });

    await waitFor(() => {
      expect(useFavoritesStore.getState().favorites).toContainEqual(pokemon);
    });

    expect(
      JSON.parse(localStorage.getItem("pokemonFavorites") || "[]")
    ).toContainEqual(pokemon);
  });

  test("should remove a Pokémon from favorites", async () => {
    const pokemon = {
      id: 1,
      name: "Bulbasaur",
      image: "bulbasaur.png",
      types: ["grass"],
    };

    act(() => {
      store.addFavorite(pokemon);
      store.removeFavorite(1);
    });

    await waitFor(() => {
      expect(useFavoritesStore.getState().favorites).not.toContainEqual(
        pokemon
      );
    });

    expect(
      JSON.parse(localStorage.getItem("pokemonFavorites") || "[]")
    ).not.toContainEqual(pokemon);
  });

  test("should return true if a Pokémon is a favorite", async () => {
    const pokemon = {
      id: 1,
      name: "Bulbasaur",
      image: "bulbasaur.png",
      types: ["grass"],
    };

    act(() => {
      store.addFavorite(pokemon);
    });

    await waitFor(() => {
      expect(useFavoritesStore.getState().isFavorite(1)).toBe(true);
    });
  });

  test("should return false if a Pokémon is not a favorite", async () => {
    await waitFor(() => {
      expect(useFavoritesStore.getState().isFavorite(99)).toBe(false);
    });
  });
});
