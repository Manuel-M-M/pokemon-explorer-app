import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { PokemonDetails } from "../../components/PokemonDetails/PokemonDetails";

describe("PokemonDetails", () => {
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

  test("renders Pokémon details correctly", () => {
    render(<PokemonDetails pokemon={mockPokemon} />);

    expect(screen.getByTestId("pokemon-name")).toHaveTextContent(
      mockPokemon.name
    );
    expect(screen.getByTestId("pokemon-number")).toHaveTextContent(
      `${mockPokemon.id}`
    );
    expect(screen.getByRole("img")).toHaveAttribute("src", mockPokemon.image);
    expect(screen.getByRole("img")).toHaveAttribute("alt", mockPokemon.name);

    mockPokemon.types.forEach((type) => {
      expect(screen.getByText(type)).toBeInTheDocument();
    });

    mockPokemon.stats.forEach((stat) => {
      expect(screen.getByText(stat.name)).toBeInTheDocument();
      expect(screen.getByText(`${stat.value}`)).toBeInTheDocument();
    });

    mockPokemon.abilities.forEach((ability) => {
      expect(screen.getByText(ability)).toBeInTheDocument();
    });

    mockPokemon.moves.forEach((move) => {
      expect(screen.getByText(move)).toBeInTheDocument();
    });
  });

  test("renders fallback message when no Pokémon data is available", () => {
    render(<PokemonDetails pokemon={null} />);

    expect(screen.getByText("No Pokémon data available.")).toBeInTheDocument();
  });
});
