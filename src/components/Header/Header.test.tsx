import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Header } from "./Header";

jest.mock("../../store/PokemonFavoritesStore/PokemonFavoritesStore", () => ({
  useFavoritesStore: jest.fn(),
}));

describe("Header Component", () => {
  test("renders the logo and favorites counter", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByTestId("logo")).toBeInTheDocument();
    expect(screen.getByTestId("favorites-count")).toBeInTheDocument();
  });
});
