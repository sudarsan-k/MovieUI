export interface TabList {
    id: number,
    name: string
    apiList: string
}
export interface GenreModal {
    id: number,
    name: string
}

export interface MovieList{
    id:number,
    title: string,
    backdrop_path: string,
    poster_path: string,
    genre_ids: number[],
    genreList:string,
    overview: string,
    vote_average:number,
    vote_count:number,
    popularity: number,
    release_date: string
}
