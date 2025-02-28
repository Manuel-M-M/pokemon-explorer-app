import { useFavoritesStore } from "../../store/PokemonFavoritesStore/PokemonFavoritesStore";
import styled from "styled-components";
import { useCallback } from "react";
import { PokemonBasic } from "../../interfaces/Pokemon";

const StarIconContainer = styled.div<{ $isFavorite: boolean }>`
  align-items: center;
  cursor: pointer;
  display: flex;
  height: 22px;
  justify-content: center;
  width: 24px;

  svg {
    fill: ${(props) => (props.$isFavorite ? "#FFD700" : "none")};
    stroke: ${(props) => (props.$isFavorite ? "#FFD700" : "#FFFFFF")};
    transition: fill 0.2s ease-in-out, stroke 0.2s ease-in-out;
  }
`;

export const PokemonStarIcon: React.FC<PokemonBasic> = ({
  id,
  name,
  image,
  types,
}) => {
  const addFavorite = useFavoritesStore((state) => state.addFavorite);
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);
  const isFavorite = useFavoritesStore((state) => state.isFavorite(id));

  const toggleFavorite = useCallback(() => {
    if (isFavorite) {
      removeFavorite(id);
    } else {
      addFavorite({ id, name, image, types });
    }
  }, [isFavorite, id, name, image, types, addFavorite, removeFavorite]);

  return (
    <StarIconContainer
      data-testid="favorite-icon"
      $isFavorite={isFavorite}
      onClick={toggleFavorite}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" />
      </svg>
    </StarIconContainer>
  );
};
