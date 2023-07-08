import { MovieState } from "./state";

export const getGenreListSelector = (state: MovieState )=> {
    return state.genreList;
  };