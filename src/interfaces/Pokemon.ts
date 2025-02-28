export interface PokemonBasic {
  id: number;
  name: string;
  image: string;
  types: string[];
}

export interface PokemonListResponse {
  results: { name: string; url: string }[];
}

export interface PokemonStat {
  name: string;
  value: number;
}

export interface PokemonDetailed extends PokemonBasic {
  height: number;
  weight: number;
  stats: PokemonStat[];
  abilities: string[];
  moves: string[];
}

export interface PokemonByIdResponse {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    other?: {
      "official-artwork"?: {
        front_default: string;
      };
    };
  };
  types: { type: { name: string } }[];
  height: number;
  weight: number;
  stats: { stat: { name: string }; base_stat: number }[];
  abilities: { ability: { name: string } }[];
  moves: { move: { name: string } }[];
}
