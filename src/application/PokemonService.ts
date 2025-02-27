import { getPokemonList } from "../infrastructure/PokemonRepository";

export class PokemonService {
  async fetchPokemonList(page: number = 1, limit: number = 20) {
    const offset = (page - 1) * limit;
    return getPokemonList(offset);
  }
}
