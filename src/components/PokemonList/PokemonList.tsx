import { PokemonBasic } from "../../interfaces/Pokemon";
import { PokemonCard } from "../PokemonCard/PokemonCard";
import styled from "styled-components";

interface PokemonListProps {
  pokemons: PokemonBasic[];
}

const PokemonListWrapper = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(188px, 1fr));
  margin: 0 auto;
  max-width: 1512px;
  padding: 0 48px;
  width: 100%;
`;

const NoPokemons = styled.p`
  color: gray;
  font-size: 18px;
  margin-top: 20px;
  text-align: center;
`;

export const PokemonList: React.FC<PokemonListProps> = ({ pokemons }) => {
  if (!pokemons.length) {
    return <NoPokemons>No Pokémon available</NoPokemons>;
  }

  return (
    <PokemonListWrapper>
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} {...pokemon} />
      ))}
    </PokemonListWrapper>
  );
};
