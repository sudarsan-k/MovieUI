import { GenreModal } from "../modals/Modals";


export const FETCH_GENRELIST = 'FETCH_GENRELIST';
export const FETCH_GENRELIST_SUCCESS = 'FETCH_GENRELIST_SUCCESS';
export const FETCH_GENRELIST_ERROR = 'FETCH_GENRELIST_ERROR';

export const fetchGenre = ( ) =>({type: FETCH_GENRELIST})

export const fetchGenreList = (type: string , payload: GenreModal[] | string ) => ({
    type,
    payload
  });


  