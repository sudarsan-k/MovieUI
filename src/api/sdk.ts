import axios, { AxiosResponse } from "axios";
import {movieURL, AUTH_TOKEN, genreURL} from './index'
import { GenreModal, MovieList } from "../modals/Modals";

  export const getGenreList = async(): Promise<GenreModal[]>  => {
    const response: AxiosResponse<GenreModal[]> =  await axios.get<GenreModal[]>(`${genreURL}/movie/list?api_key=${AUTH_TOKEN}`);
    return response.data;
};
  
  export const getMovieDetails = async(id: number): Promise<any>  => {
    const response: AxiosResponse<any> = await axios.get<any>(`${movieURL}/${id}?api_key=${AUTH_TOKEN}` );
    return response.data;
};

  export const getTabList = async(apiName: string,page: number): Promise<MovieList[]>  => {
    const response: AxiosResponse<MovieList[]> = await axios.get<MovieList[]>(`${movieURL}/${apiName}?page=${page}&api_key=${AUTH_TOKEN}` );
    return response.data;
};