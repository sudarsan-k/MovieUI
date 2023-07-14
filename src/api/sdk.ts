import {AxiosResponse } from "axios";
import axios from "axios";
import {movieURL, AUTH_TOKEN, genreURL, searchURL} from './index'
import { GenreModel, MovieList } from "../models/Models";

  export const getGenreList = async(): Promise<GenreModel[]>  => {
    const response: AxiosResponse<GenreModel[]> =  await axios.get<GenreModel[]>(`${genreURL}/movie/list?api_key=${AUTH_TOKEN}`);
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

export const getSearchDetails = async(search: string, page: number): Promise<any>  => {
    const response: AxiosResponse<any> = await axios.get<any>(`${searchURL}?query=${search}&page=${page}&api_key=${AUTH_TOKEN}` );
    return response.data;
};