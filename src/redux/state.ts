import { GenreModal, MovieList } from "../modals/Modals";
export  interface MovieState {
    genreList: GenreModal[] | string;
    favourites: MovieList[]
  }
  
  export const initialState: MovieState = {
    genreList: [],
    favourites: []
  };