import axios, { AxiosResponse } from "axios";
import {movieURL, AUTH_TOKEN, genreURL} from './index'
import { genreModal } from "../modals/Modals";
  export const getGenreList = async(): Promise<genreModal[]>  => {
    const response: AxiosResponse<genreModal[]> =  await axios.get<genreModal[]>(`${genreURL}/movie/list?api_key=${AUTH_TOKEN}`);
    return response.data;
};
  
  export const getTopRatedList = async() => {
    return await axios.get(`${movieURL}/top_rated?page=1&api_key=${AUTH_TOKEN}` );
  };
  export const getNowPLayingList = async() => {
    return await axios.get(`${movieURL}/now_playing?page=1&api_key=${AUTH_TOKEN}` );
  };
  export const getPopularList = async() => {
    return await axios.get(`${movieURL}/popular?page=1&api_key=${AUTH_TOKEN}` );
  };
  export const getUpcomingList = async() => {
    return await axios.get(`${movieURL}/upcoming?page=1&api_key=${AUTH_TOKEN}` );
  };