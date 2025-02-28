export interface PokemonBasic {
  id: number;
  name: string;
  image: string;
  types: string[];
}

export interface PokemonListResponse {
  results: { name: string; url: string }[];
}
