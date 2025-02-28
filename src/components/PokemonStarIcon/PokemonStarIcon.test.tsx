import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { PokemonStarIcon } from "./PokemonStarIcon";

describe("PokemonStarIcon", () => {
  const mockPokemon = {
    pokemonId: 1,
    name: "Bulbasaur",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    types: ["grass", "poison"],
  };

  test("renders correctly with the given props", () => {
    render(<PokemonStarIcon {...mockPokemon} />);

    const starIconContainer = screen.getByTestId("favorite-icon");
    expect(starIconContainer).toBeInTheDocument();
  });
});
