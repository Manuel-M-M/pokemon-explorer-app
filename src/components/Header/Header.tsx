import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useFavoritesStore } from "../../store/PokemonFavoritesStore/PokemonFavoritesStore";

const Navbar = styled.nav`
  align-items: center;
  background-color: black;
  display: flex;
  height: 100%;
  justify-content: space-between;
  overflow-x: hidden;
  padding: 16px 48px;
`;

const Logo = styled.img`
  cursor: pointer;
  height: 52px;
  width: 52px;
`;

const FavoritesContainer = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  gap: 8px;
`;

const StarIconContainer = styled.div`
  align-items: center;
  display: flex;
  height: 22px;
  justify-content: center;
  width: 24px;

  svg {
    fill: #ffd700;
    height: 22px;
    stroke: #ffd700;
    width: 24px;
  }
`;

const FavoritesCount = styled.span`
  color: white;
  font-family: "Roboto Condensed", sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 18.75px;
`;

export const Header = () => {
  const navigate = useNavigate();
  const favoritesCount = useFavoritesStore(
    (state) => state.favorites?.length ?? 0
  );

  return (
    <Navbar>
      <Logo
        data-testid="logo"
        src="/images/pokemon-icon.png"
        alt="Pokémon Logo"
        onClick={() => navigate("/")}
      />
      <FavoritesContainer onClick={() => navigate("/favorites")}>
        <StarIconContainer>
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" />
          </svg>
        </StarIconContainer>
        <FavoritesCount data-testid="favorites-count">
          {favoritesCount}
        </FavoritesCount>
      </FavoritesContainer>
    </Navbar>
  );
};
