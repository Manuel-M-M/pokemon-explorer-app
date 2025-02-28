import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { PokemonDetailsPage } from "./PokemonDetailsPage";
import { usePokemonDetailsStore } from "../../store/PokemonDetailsStore/PokemonDetailsStore";
import { MemoryRouter } from "react-router-dom";

jest.mock("../../store/PokemonDetailsStore/PokemonDetailsStore", () => ({
  usePokemonDetailsStore: jest.fn(),
}));

describe("PokemonDetailsPage", () => {
  const mockPokemon = {
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

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders loading state initially", () => {
    (usePokemonDetailsStore as unknown as jest.Mock).mockReturnValue({
      pokemon: null,
      loading: true,
      error: "",
      fetchPokemonDetails: jest.fn(),
    });

    render(
      <MemoryRouter>
        <PokemonDetailsPage />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
  });

  test("renders Pokémon details when API call succeeds", async () => {
    (usePokemonDetailsStore as unknown as jest.Mock).mockReturnValue({
      pokemon: mockPokemon,
      loading: false,
      error: "",
      fetchPokemonDetails: jest.fn(),
    });

    render(
      <MemoryRouter>
        <PokemonDetailsPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Bulbasaur")).toBeInTheDocument();
      expect(screen.getByText("1")).toBeInTheDocument();
      expect(screen.getByText("HP")).toBeInTheDocument();
      expect(screen.getByText("Attack")).toBeInTheDocument();
      expect(screen.getByText("overgrow")).toBeInTheDocument();
      expect(screen.getByText("tackle")).toBeInTheDocument();
    });
  });

  test("renders error message when API call fails", async () => {
    (usePokemonDetailsStore as unknown as jest.Mock).mockReturnValue({
      pokemon: null,
      loading: false,
      error: "Failed to fetch Pokémon details",
      fetchPokemonDetails: jest.fn(),
    });

    render(
      <MemoryRouter>
        <PokemonDetailsPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByText(/failed to fetch pokémon details/i)
      ).toBeInTheDocument();
    });
  });
});
