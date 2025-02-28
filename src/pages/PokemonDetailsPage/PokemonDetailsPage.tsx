import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePokemonDetailsStore } from "../../store/PokemonDetailsStore/PokemonDetailsStore";
import { Loader } from "../../components/Loader/Loader";
import styled from "styled-components";
import { PokemonDetails } from "../../components/PokemonDetails/PokemonDetails";

const PokemonDetailsContainer = styled.section`
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  min-height: 100vh;
  width: 100%;
`;

const ErrorMessage = styled.p`
  color: #999;
  font-family: "Roboto Condensed", sans-serif;
  font-size: 18px;
  font-weight: 600;
  margin-top: 200px;
  text-align: center;
`;

export const PokemonDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { pokemon, loading, error, fetchPokemonDetails } =
    usePokemonDetailsStore();

  const stableFetchPokemonDetails = useCallback(() => {
    if (id && (!pokemon || pokemon.id !== Number(id))) {
      fetchPokemonDetails(Number(id));
    }
  }, [id, pokemon, fetchPokemonDetails]);

  useEffect(() => {
    stableFetchPokemonDetails();
  }, [stableFetchPokemonDetails]);

  return (
    <PokemonDetailsContainer>
      {loading && <Loader />}
      {error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : (
        <PokemonDetails pokemon={pokemon ?? null} />
      )}
    </PokemonDetailsContainer>
  );
};
