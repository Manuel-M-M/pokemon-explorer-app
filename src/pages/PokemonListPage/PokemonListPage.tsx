import { useEffect, useRef } from "react";
import { usePokemonListStore } from "../../store/PokemonListStore/PokemonListStore";
import { PokemonList } from "../../components/PokemonList/PokemonList";
import styled from "styled-components";

const PokemonListContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin: 0 auto;
  max-width: 1416px;
  padding: 84px 0;
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

export const PokemonListPage = () => {
  const { pokemons, loading, error, fetchNextPage, hasMore } =
    usePokemonListStore();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastPokemonRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  useEffect(() => {
    if (!hasMore) return;

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchNextPage();
      }
    });

    if (lastPokemonRef.current) {
      observerRef.current.observe(lastPokemonRef.current);
    }

    return () => observerRef.current?.disconnect();
  }, [hasMore, fetchNextPage]);

  if (error) return <ErrorMessage>{error}</ErrorMessage>;

  return (
    <PokemonListContainer>
      <PokemonList pokemons={pokemons} loading={loading} />
      <div ref={lastPokemonRef} />{" "}
    </PokemonListContainer>
  );
};
