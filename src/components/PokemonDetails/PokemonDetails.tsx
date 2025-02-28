import styled from "styled-components";
import { PokemonDetailed } from "../../interfaces/Pokemon";

interface PokemonDetailsProps {
  pokemon: PokemonDetailed | null;
}

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: 20px auto;
`;

const PokemonImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 50%;
  border: 5px solid #dee2e6;
  margin-bottom: 20px;
`;

const PokemonName = styled.h2`
  font-size: 2rem;
  color: #343a40;
  text-transform: capitalize;
  margin-bottom: 10px;
`;

const PokemonNumber = styled.span`
  font-size: 2rem;
  color: #343a40;
`;

const TypeBadge = styled.span`
  background-color: #6c757d;
  color: #fff;
  padding: 5px 10px;
  border-radius: 20px;
  margin: 0 5px;
  text-transform: capitalize;
`;

const StatsContainer = styled.div`
  width: 100%;
  margin-top: 20px;
`;

const StatRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
`;

const StatName = styled.span`
  color: #495057;
`;

const StatValue = styled.span`
  font-weight: bold;
  color: #212529;
`;

const AbilitiesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const AbilitiesTittle = styled.h3`
  font-size: 1.5rem;
  color: #343a40;
  margin-bottom: 10px;
`;

const Ability = styled.span`
  display: inline-block;
  background-color: #e9ecef;
  color: #495057;
  padding: 5px 10px;
  border-radius: 15px;
  margin: 5px;
  text-transform: capitalize;
`;

const MovesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  width: 100%;
`;

const MovesTitle = styled.h3`
  font-size: 1.5rem;
  color: #343a40;
  margin-bottom: 10px;
`;

const MovesList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
`;

const MoveItem = styled.li`
  background-color: #e9ecef;
  color: #495057;
  padding: 5px 10px;
  border-radius: 15px;
  text-transform: capitalize;
`;

export const PokemonDetails: React.FC<PokemonDetailsProps> = ({ pokemon }) => {
  if (!pokemon) {
    return <p>No Pokémon data available.</p>;
  }

  return (
    <DetailsContainer>
      <PokemonImage src={pokemon.image} alt={pokemon.name} />
      <PokemonNumber data-testid="pokemon-number">{pokemon.id}</PokemonNumber>
      <PokemonName data-testid="pokemon-name">{pokemon.name}</PokemonName>
      <div>
        {pokemon.types.map((type) => (
          <TypeBadge key={type}>{type}</TypeBadge>
        ))}
      </div>
      <StatsContainer>
        {pokemon.stats.map((stat) => (
          <StatRow key={stat.name}>
            <StatName>{stat.name}</StatName>
            <StatValue>{stat.value}</StatValue>
          </StatRow>
        ))}
      </StatsContainer>
      <AbilitiesContainer>
        <AbilitiesTittle>Abilities</AbilitiesTittle>
        <div>
          {pokemon.abilities.map((ability) => (
            <Ability key={ability}>{ability}</Ability>
          ))}
        </div>
      </AbilitiesContainer>
      <MovesContainer>
        <MovesTitle>Moves</MovesTitle>
        <MovesList>
          {pokemon.moves.map((move) => (
            <MoveItem key={move}>{move}</MoveItem>
          ))}
        </MovesList>
      </MovesContainer>
    </DetailsContainer>
  );
};
