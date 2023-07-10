import { MovieState } from "./state";

export const getGenreListSelector = (state: MovieState )=> {
    return state.genreList;
  };

  export const getFavouritesSelector = (state: MovieState )=> {
    return state.favourites;
  };