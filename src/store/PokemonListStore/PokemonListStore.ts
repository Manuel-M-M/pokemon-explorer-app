import { create } from "zustand";
import { PokemonService } from "../../application/PokemonService";
import { PokemonBasic } from "../../interfaces/Pokemon";

interface PokemonListState {
  pokemons: PokemonBasic[];
  loading: boolean;
  error: string;
  page: number;
  hasMore: boolean;
  fetchNextPage: () => Promise<void>;
  fetchInitialPokemons: () => Promise<void>;
}

export const usePokemonListStore = create<PokemonListState>((set, get) => ({
  pokemons: [],
  loading: false,
  error: "",
  page: 1,
  hasMore: true,

  fetchInitialPokemons: async () => {
    if (get().pokemons.length > 0) return;
    await get().fetchNextPage();
  },

  fetchNextPage: async () => {
    const { page, pokemons } = get();
    set({ loading: true, error: "" });

    try {
      const service = new PokemonService();
      const newPokemons = await service.fetchPokemonList(page, 20);

      set({
        pokemons: [...pokemons, ...newPokemons],
        page: page + 1,
        hasMore: newPokemons.length > 0,
        loading: false,
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      set({ error: "Failed to fetch Pokémon", loading: false });
    }
  },
}));
