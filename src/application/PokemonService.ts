import { getPokemonList } from "../infrastructure/PokemonRepository";
import { PokemonBasic } from "../interfaces/Pokemon";

export class PokemonService {
  async fetchPokemonList(
    page: number = 1,
    limit: number = 20
  ): Promise<PokemonBasic[]> {
    const offset = (page - 1) * limit;
    const rawPokemons = await getPokemonList(offset);

    const pokemonList = (
      await Promise.all(
        rawPokemons.map(async (pokemon) => {
          try {
            const id = this.extractIdFromUrl(pokemon.url);

            if (!id) {
              return null;
            }

            const pokemonResponse = await fetch(
              `https://pokeapi.co/api/v2/pokemon/${id}`
            );

            if (!pokemonResponse.ok) {
              return null;
            }

            const pokemonData = await pokemonResponse.json();

            return {
              id,
              name: pokemonData.name,
              image: pokemonData.sprites?.front_default || "",
              types: Array.isArray(pokemonData.types)
                ? pokemonData.types.map(
                    (t: { type: { name: string } }) => t.type.name
                  )
                : ["Unknown"],
            } as PokemonBasic;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
          } catch (error) {
            return null;
          }
        })
      )
    ).filter((p): p is PokemonBasic => p !== null);

    return pokemonList;
  }

  private extractIdFromUrl(url: string): number | null {
    const parts = url.split("/").filter(Boolean);
    const id = Number(parts[parts.length - 1]);
    return isNaN(id) ? null : id;
  }
}
