import { genreModal } from "../modals/Modals";
export  interface MovieState {
    loading: boolean;
    error: string | null;
    genreList: genreModal[] | string;
  }
  
  export const initialState: MovieState = {
    loading: false,
    error: null,
    genreList: [],
  };