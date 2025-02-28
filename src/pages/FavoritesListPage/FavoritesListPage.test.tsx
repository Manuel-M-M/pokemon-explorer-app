import "@testing-library/jest-dom";
import { render, screen, act } from "@testing-library/react";
import { FavoritesListPage } from "../../pages/FavoritesListPage/FavoritesListPage";
import { useFavoritesStore } from "../../store/PokemonFavoritesStore/PokemonFavoritesStore";
import { MemoryRouter } from "react-router-dom";

jest.mock("../../store/PokemonFavoritesStore/PokemonFavoritesStore", () => ({
  useFavoritesStore: jest.fn(),
}));

describe("FavoritesListPage", () => {
  test("should display favorite Pokémon", async () => {
    const mockFavorites = [
      { id: 1, name: "Bulbasaur", image: "bulbasaur.png", types: ["grass"] },
      { id: 2, name: "Charmander", image: "charmander.png", types: ["fire"] },
    ];

    (useFavoritesStore as unknown as jest.Mock).mockReturnValue({
      favorites: mockFavorites,
    });

    render(
      <MemoryRouter>
        <FavoritesListPage />
      </MemoryRouter>
    );

    expect(screen.getByText("Bulbasaur")).toBeInTheDocument();
    expect(screen.getByText("Charmander")).toBeInTheDocument();
  });

  test("should display a message if there are no favorites", async () => {
    (useFavoritesStore as unknown as jest.Mock).mockReturnValue({
      favorites: [],
    });

    render(
      <MemoryRouter>
        <FavoritesListPage />
      </MemoryRouter>
    );

    expect(screen.getByTestId("no-favorites-message")).toBeInTheDocument();
  });

  test("should call useFavoritesStore correctly", async () => {
    (useFavoritesStore as unknown as jest.Mock).mockReturnValue({
      favorites: [],
    });

    await act(async () => {
      render(
        <MemoryRouter>
          <FavoritesListPage />
        </MemoryRouter>
      );
    });

    expect(useFavoritesStore).toHaveBeenCalled();
  });
});
