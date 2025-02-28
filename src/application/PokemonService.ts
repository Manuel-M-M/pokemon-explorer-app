import {
  getPokemonById,
  getPokemonList,
} from "../infrastructure/PokemonRepository";
import {
  PokemonBasic,
  PokemonDetailed,
  PokemonStat,
} from "../interfaces/Pokemon";

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

  async fetchPokemonDetails(id: number): Promise<PokemonDetailed | null> {
    try {
      const data = await getPokemonById(id);
      return {
        id: data.id,
        name: data.name,
        image: data.sprites?.other?.["official-artwork"]?.front_default || "",
        types: data.types.map((t: { type: { name: string } }) => t.type.name),
        height: data.height,
        weight: data.weight,
        stats: this.mapStats(data.stats),
        abilities: data.abilities.map(
          (a: { ability: { name: string } }) => a.ability.name
        ),
        moves: data.moves.map((m: { move: { name: string } }) => m.move.name),
      };
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  private mapStats(
    stats: { stat: { name: string }; base_stat: number }[]
  ): PokemonStat[] {
    const statNames = [
      "HP",
      "Attack",
      "Defense",
      "Special Attack",
      "Special Defense",
      "Speed",
    ];
    return stats.map((s, index) => ({
      name: statNames[index] || s.stat.name,
      value: s.base_stat,
    }));
  }

  private extractIdFromUrl(url: string): number | null {
    const parts = url.split("/").filter(Boolean);
    const id = Number(parts[parts.length - 1]);
    return isNaN(id) ? null : id;
  }
}
