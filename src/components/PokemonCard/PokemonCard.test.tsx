import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { PokemonCard } from "./PokemonCard";

describe("PokemonCard", () => {
  const mockPokemon = {
    id: 1,
    name: "bulbasaur",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    types: ["grass", "poison"],
  };

  const renderWithRouter = (ui: React.ReactElement) => {
    return render(<MemoryRouter>{ui}</MemoryRouter>);
  };

  test("renders Pokémon id, name, image, and types", () => {
    renderWithRouter(
      <PokemonCard
        id={mockPokemon.id}
        name={mockPokemon.name}
        image={mockPokemon.image}
        types={mockPokemon.types}
      />
    );

    expect(screen.getByTestId("pokemon-name")).toBeInTheDocument();
    expect(screen.getByTestId("pokemon-number")).toHaveTextContent(
      `${mockPokemon.id}`
    );

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", mockPokemon.image);
    expect(img).toHaveAttribute("alt", mockPokemon.name);

    expect(screen.getByText(mockPokemon.types[0])).toBeInTheDocument();
    expect(screen.getByText(mockPokemon.types[1])).toBeInTheDocument();
  });

  test("renders a favorite icon", () => {
    renderWithRouter(
      <PokemonCard
        id={mockPokemon.id}
        name={mockPokemon.name}
        image={mockPokemon.image}
        types={mockPokemon.types}
      />
    );

    expect(screen.getByTestId("favorite-icon")).toBeInTheDocument();
  });
});
