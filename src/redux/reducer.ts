// reducer.ts
import { initialState } from "./state";
import { FETCH_GENRELIST_SUCCESS, FETCH_GENRELIST_ERROR, UPDATE_FAVOURITES, REMOVE_FAVOURITES } from "./action";
  
  const movieReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case FETCH_GENRELIST_SUCCESS:
        return {
          ...state,
          genreList: action.payload?.genres
        };
      case FETCH_GENRELIST_ERROR:
        return {
          ...state,
          genreList: action.payload,
        };
      case UPDATE_FAVOURITES:
        return {
          ...state,
          favourites: [...state.favourites, action.payload],
        };
        case REMOVE_FAVOURITES:
            return {
                ...state,
                favourites: [ ...action.payload],
            }
      default:
        return state;
    }
  };
  
  export default movieReducer;
  