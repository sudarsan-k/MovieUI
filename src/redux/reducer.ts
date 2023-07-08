// reducer.ts
import { initialState } from "./state";
import { FETCH_GENRELIST_SUCCESS, FETCH_GENRELIST_ERROR } from "./action";
  
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
      default:
        return state;
    }
  };
  
  export default movieReducer;
  