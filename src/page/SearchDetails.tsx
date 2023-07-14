import React from 'react'
import "../assets/style/home.css"
import "../assets/style/movie.css"
import { useEffect, useState } from 'react'
import { MovieList, LoadFn, TabList } from '../models/Models';
import { useLocation } from 'react-router-dom';
import "../assets/style/loader.css";
import { connect } from 'react-redux';
import Header from '../components/Header/Header';
import { getGenreListSelector } from '../redux/selector';
import { GenreModel } from '../models/Models';
import MovieListComponent from '../components/MovieList/MovieListComponent';
import { getSearchDetails } from '../api/sdk';
import ErrorComponent from '../components/ErrorComponent/ErrorComponent';


type SearchDetailsProps = {
    movieList: MovieList[];
    loadDataHandler: LoadFn;
    loading: boolean;
    tabIndex: number;
    setPageIndex: (value: number) => void;
    pageIndex: number;
}

const SearchDetails = (props: SearchDetailsProps | any) => {
    const { getGenreList } = props;
    const location = useLocation();
    const [tabIndex] = useState<number>(0);
    const [pageIndex, setPageIndex] = useState<number>(1);
    const [movieList, setMovieList] = useState<MovieList[]>([])
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false);


    // Handling the movie datalist functionality for seached data
    const loadDataHandler = (data: TabList | any, page: number, search: boolean = true) => {
        if (typeof getGenreList !== 'string') {
            setLoading(true)
            getSearchDetails(data, page).then((res: any) => {
                let movies: MovieList[] = res.results;
                for (let i: number = 0, len: number = movies.length; len > i; i++) {
                    movies[i].genreList = "";
                    for (let j: number = 0, len: number = movies[i].genre_ids.length; len > j; j++) {
                        let name: string | any = getGenreList?.find((x: GenreModel) => x.id === movies[i].genre_ids[j])?.name;
                        if (name !== null || name !== undefined) {
                            movies[i].genreList += name + (j === len - 1 ? "" : " - ");
                        }
                    }
                }

                setPageIndex(page);
                if (page > pageIndex) {
                    setMovieList(prev => [...prev, ...movies]);
                }
                else {
                    setMovieList([...movies]);
                }
                if (movies.length === 0) {
                    setErrorMessage('No Movie Found!!')
                }
                else {
                    setErrorMessage('')
                }
                setLoading(false)
            }).catch((e: any) => {
                setErrorMessage(e?.message);
                setLoading(false)
            })
        } else {
            setErrorMessage(getGenreList);
        }
    }
    useEffect(() => {
        //Handling searching based on the location state.
        const query = location.state.search.searchText;
        if (getGenreList.length > 0) {
            loadDataHandler(query, 1, true);
            window.scrollTo(0, 0);
        }
    }, [getGenreList, location.state.search.searchText]);

    return (
        <div>
            <Header searchedText={location.state.search.searchText} />
            <div className='tabBar'>
                <div className='parentTabMovie'>
                    <label className='labelTabMovie'>Search Results for {location.state.search.searchText}</label>
                </div>
            </div>
            <div className='backroundParent'>
                {movieList.length > 0 && errorMessage.length == 0 ? (
                    <MovieListComponent
                        movieList={movieList}
                        loadDataHandler={loadDataHandler}
                        loading={loading}
                        tabIndex={tabIndex}
                        setPageIndex={setPageIndex}
                        pageIndex={pageIndex}
                        searchFlag={true} />
                ) : (
                    <ErrorComponent errorMessage={location.state.search.searchText === '' ? 'Please search Something!!' : errorMessage} />
                )
                }
            </div>
        </div>
    )
}
function mapStateToProps(state: any) {
    return {
        getGenreList: getGenreListSelector(state),
    };
}
export default connect(mapStateToProps)(SearchDetails);