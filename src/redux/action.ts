import { GenreModal,MovieList } from "../modals/Modals";


export const FETCH_GENRELIST = 'FETCH_GENRELIST';
export const FETCH_GENRELIST_SUCCESS = 'FETCH_GENRELIST_SUCCESS';
export const FETCH_GENRELIST_ERROR = 'FETCH_GENRELIST_ERROR';
export const UPDATE_FAVOURITES = 'UPDATE_FAVOURITES';

export const fetchGenre = ( ) =>({type: FETCH_GENRELIST})

export const fetchGenreList = (type: string , payload: GenreModal[] | string ) => ({
    type,
    payload
  });

  export const updateFavourites = (payload: MovieList ) => ({
    type: UPDATE_FAVOURITES,
    payload
  });
