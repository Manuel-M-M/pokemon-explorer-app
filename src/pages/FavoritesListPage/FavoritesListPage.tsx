import { useFavoritesStore } from "../../store/PokemonFavoritesStore/PokemonFavoritesStore";
import { PokemonList } from "../../components/PokemonList/PokemonList";
import styled from "styled-components";

const FavoritesListPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin: 0 auto;
  max-width: 1416px;
  padding: 84px 0;
  padding-top: 48px;
  width: 100%;
`;

const Title = styled.h2`
  font-family: "Roboto Condensed", sans-serif;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 16px;
  padding-left: 48px;
  text-transform: uppercase;
`;

const NoFavoritesMessage = styled.p`
  color: #999;
  font-family: "Roboto Condensed", sans-serif;
  font-size: 18px;
  font-weight: 600;
  margin-top: 200px;
  text-align: center;
`;

export const FavoritesListPage = () => {
  const { favorites } = useFavoritesStore();

  return (
    <FavoritesListPageContainer>
      <Title>FAVORITES</Title>
      {favorites.length > 0 ? (
        <PokemonList pokemons={favorites} />
      ) : (
        <NoFavoritesMessage data-testid="no-favorites-message">
          No favorite Pokémon selected.
        </NoFavoritesMessage>
      )}
    </FavoritesListPageContainer>
  );
};
