import { create } from "zustand";
import { PokemonBasic } from "../../interfaces/Pokemon";

interface FavoritesState {
  favorites: PokemonBasic[];
  addFavorite: (pokemon: PokemonBasic) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: JSON.parse(localStorage.getItem("pokemonFavorites") || "[]"),

  addFavorite: (pokemon: PokemonBasic) => {
    const { favorites } = get();
    if (favorites.some((fav) => fav.id === pokemon.id)) return;

    const newFavorites = [...favorites, pokemon];
    set({ favorites: newFavorites });
    localStorage.setItem("pokemonFavorites", JSON.stringify(newFavorites));
  },

  removeFavorite: (id: number) => {
    const newFavorites = get().favorites.filter((fav) => fav.id !== id);
    set({ favorites: newFavorites });
    localStorage.setItem("pokemonFavorites", JSON.stringify(newFavorites));
  },

  isFavorite: (id) => get().favorites.some((fav) => fav.id === id),
}));
