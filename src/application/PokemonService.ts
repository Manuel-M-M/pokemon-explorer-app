import { getPokemonList } from "../infrastructure/PokemonRepository";
import { PokemonBasic } from "../interfaces/Pokemon";

export class PokemonService {
  async fetchPokemonList(
    page: number = 1,
    limit: number = 20
  ): Promise<PokemonBasic[]> {
    const offset = (page - 1) * limit;
    const rawPokemons = await getPokemonList(offset);

    const pokemonList: PokemonBasic[] = await Promise.all(
      rawPokemons.map(async (pokemon) => {
        const id = Number(pokemon.url.split("/").filter(Boolean).pop());

        const pokemonResponse = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        const pokemonData = await pokemonResponse.json();

        return {
          id,
          name: pokemonData.name,
          image: pokemonData.sprites.front_default,
          types: pokemonData.types.map(
            (t: { type: { name: string } }) => t.type.name
          ),
        };
      })
    );

    return pokemonList;
  }
}
