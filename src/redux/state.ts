import { GenreModel, MovieList } from "../models/Models";
export  interface MovieState {
    genreList: GenreModel[] | string;
    favourites: MovieList[]
  }
  
  export const initialState: MovieState = {
    genreList: [],
    favourites: []
  };