import { GenreModal } from "../modals/Modals";
export  interface MovieState {
    genreList: GenreModal[] | string;
  }
  
  export const initialState: MovieState = {
    genreList: [],
  };