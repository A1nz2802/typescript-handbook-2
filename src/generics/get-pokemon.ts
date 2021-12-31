import { Pokemon } from '../interfaces/pokemon';
import axios from "axios";

export const getPokemon = async( pokemonId: number ): Promise<Pokemon> => {
  
  const { data } = await axios.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${ pokemonId }`);
  // console.log( data.abilities[0] );

  return data;
}