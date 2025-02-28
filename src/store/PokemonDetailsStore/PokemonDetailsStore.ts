import { create } from "zustand";
import { PokemonService } from "../../application/PokemonService";
import { PokemonDetailed } from "../../interfaces/Pokemon";

interface PokemonDetailsState {
  pokemon: PokemonDetailed | null;
  loading: boolean;
  error: string;
  fetchPokemonDetails: (id: number) => Promise<void>;
  clearPokemon: () => void;
}

export const usePokemonDetailsStore = create<PokemonDetailsState>((set) => ({
  pokemon: null,
  loading: false,
  error: "",

  fetchPokemonDetails: async (id: number) => {
    set({ loading: true, error: "" });

    try {
      const service = new PokemonService();
      const pokemonDetails = await service.fetchPokemonDetails(id);

      if (!pokemonDetails) {
        throw new Error("Pokémon not found");
      }

      set({ pokemon: pokemonDetails, loading: false });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      set({ error: "Failed to fetch Pokémon details", loading: false });
    }
  },

  clearPokemon: () => set({ pokemon: null, error: "" }),
}));
