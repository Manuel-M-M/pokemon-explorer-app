import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { PokemonListPage } from "./PokemonListPage";
import { usePokemonListStore } from "../../store/PokemonListStore/PokemonListStore";
import { MemoryRouter } from "react-router-dom";

jest.mock("../../store/PokemonListStore/PokemonListStore");

describe("PokemonListPage", () => {
  const mockPokemons = [
    {
      id: 1,
      name: "Bulbasaur",
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
      types: ["grass", "poison"],
    },
    {
      id: 2,
      name: "Ivysaur",
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
      types: ["grass", "poison"],
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders loading state initially", () => {
    (usePokemonListStore as unknown as jest.Mock).mockReturnValue({
      pokemons: [],
      loading: true,
      error: "",
      fetchNextPage: jest.fn(),
      hasMore: true,
    });

    render(
      <MemoryRouter>
        <PokemonListPage />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
  });

  test("renders Pokémon list when API call succeeds", async () => {
    (usePokemonListStore as unknown as jest.Mock).mockReturnValue({
      pokemons: mockPokemons,
      loading: false,
      error: "",
      fetchNextPage: jest.fn(),
      hasMore: true,
    });

    render(
      <MemoryRouter>
        <PokemonListPage />
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText("Bulbasaur")).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(screen.getByText("Ivysaur")).toBeInTheDocument()
    );
  });

  test("renders error message when API call fails", async () => {
    (usePokemonListStore as unknown as jest.Mock).mockReturnValue({
      pokemons: [],
      loading: false,
      error: "Failed to fetch Pokémon",
      fetchNextPage: jest.fn(),
      hasMore: true,
    });

    render(
      <MemoryRouter>
        <PokemonListPage />
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText(/failed to fetch pokémon/i)).toBeInTheDocument()
    );
  });
});
