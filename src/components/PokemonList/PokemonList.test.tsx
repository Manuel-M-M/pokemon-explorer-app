import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { PokemonList } from "./PokemonList";
import { MemoryRouter } from "react-router-dom";

describe("PokemonList", () => {
  const mockPokemons = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `Pokemon ${i + 1}`,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
      i + 1
    }.png`,
    types: ["grass"],
  }));

  test("renders a list of 50 Pokémon cards", () => {
    render(
      <MemoryRouter>
        <PokemonList pokemons={mockPokemons} />
      </MemoryRouter>
    );

    expect(screen.getAllByRole("img")).toHaveLength(50);
    expect(screen.getAllByTestId("pokemon-card")).toHaveLength(50);
  });

  test("renders a message when the list is empty", () => {
    render(
      <MemoryRouter>
        <PokemonList pokemons={[]} />
      </MemoryRouter>
    );

    expect(screen.getByText("No Pokémon available")).toBeInTheDocument();
  });
});
