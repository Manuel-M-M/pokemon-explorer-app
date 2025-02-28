import styled from "styled-components";
import { Link } from "react-router-dom";
import { PokemonStarIcon } from "../PokemonStarIcon/PokemonStarIcon";
import { PokemonBasic } from "../../interfaces/Pokemon";

const Card = styled.div`
  align-items: center;
  background: black;
  display: flex;
  flex-direction: column;
  height: 280px;
  min-width: 172.5px;
  padding: 10px;
  position: relative;
  width: 188.57px;
`;

const ImageLink = styled(Link)`
  cursor: pointer;
  display: block;
  height: 189.97px;
  width: 188.57px;
`;

const Image = styled.img`
  border-bottom: 4px solid yellow;
  height: 189.97px;
  width: 188.57px;
`;

const InfoContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 8px;
  width: 100%;
`;

const Name = styled.p`
  display: flex;
  flex-direction: row;
  gap: 10px;
  color: white;
  font-family: "Roboto Condensed", sans-serif;
  font-size: 14px;
  margin: 0;
  font-weight: bold;
`;

const PokemonNumber = styled.span`
  font-size: 14px;
  color: white;
`;

const TypesContainer = styled.div`
  display: flex;
  gap: 6px;
  margin-top: 4px;
`;

const TypeBadge = styled.span`
  color: white;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  font-size: 12px;
  padding: 4px 8px;
  text-transform: capitalize;
`;

export const PokemonCard: React.FC<PokemonBasic> = ({
  id,
  name,
  image,
  types,
}) => {
  return (
    <Card data-testid="pokemon-card" className="Card">
      <ImageLink to={`/pokemon/${id}`}>
        <Image src={image} alt={name} />
      </ImageLink>
      <InfoContainer className="InfoContainer">
        <Name data-testid="pokemon-name" className="Name">
          <PokemonNumber data-testid="pokemon-number" className="Number">
            {id}
          </PokemonNumber>{" "}
          {name}
        </Name>
        <TypesContainer>
          {types.length > 0 ? (
            types.map((type) => <TypeBadge key={type}>{type}</TypeBadge>)
          ) : (
            <span style={{ color: "#888" }}>No type</span>
          )}
        </TypesContainer>
        <PokemonStarIcon id={id} name={name} image={image} types={types} />
      </InfoContainer>
    </Card>
  );
};
