import React from 'react'
import "../assets/style/home.css"
import "../assets/style/movie.css"
import { useEffect, useState } from 'react'
import { MovieList, LoadFn, TabList } from '../modals/Modals';
import { useLocation } from 'react-router-dom';
import { tabData } from '../assets/common/Common';
import "../assets/style/loader.css";
import { connect } from 'react-redux';
import Header from '../components/Header';
import { getGenreListSelector } from '../redux/selector';
import { GenreModal } from '../modals/Modals';
import MovieListComponent from '../components/MovieListComponent';
import { getSearchDetails } from '../api/sdk';

export type MovieDetailsProps = {
    movieList: MovieList[];
    loadDataHandler: LoadFn;
    loading: boolean;
    tabIndex: number;
    setPageIndex: (value: number) => void;
    pageIndex: number;
}
const SearchDetails = (props: MovieDetailsProps | any) => {
    const { getGenreList } = props;
    const location = useLocation();
    const [initialFocus, setInitialFocus] = useState<boolean>(true);
    const [tabIndex, setTabIndex] = useState<number>(0);
    const [pageIndex, setPageIndex] = useState<number>(1);
    const [movieList, setMovieList] = useState<MovieList[]>([])
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false);

    const loadDataHandler = (data: TabList | any, page: number) => {
        if (getGenreList != 'Network Error') {
            setLoading(true)
            getSearchDetails(data, page).then((res: any) => {
                let movies: MovieList[] = res.results;
                for (let i: number = 0, len: number = movies.length; len > i; i++) {
                    movies[i].genreList = "";
                    for (let j: number = 0, len: number = movies[i].genre_ids.length; len > j; j++) {
                        let name: string | any = getGenreList?.find((x: GenreModal) => x.id === movies[i].genre_ids[j])?.name;
                        if (name !== null || name !== undefined) {
                            movies[i].genreList += name + (j === len - 1 ? "" : ",  ");
                        }
                    }
                }
                if (page !== pageIndex) {
                    setPageIndex(page);
                }
                setMovieList(prev => [...prev, ...movies]);
                setErrorMessage('')
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
        const query = location.state.search.searchText;
        if (query.length > 0 && getGenreList.length > 0) {
            loadDataHandler(query, pageIndex);
        }
    }, [getGenreList]);

    return (
        <div>
            <Header />
            <div className='tabBar'>
                <div className='parentTabMovie'>
                    <label className='labelTabMovie'>Search Results</label>
                </div>
            </div>
            <div >
                {movieList.length > 0 && errorMessage.length == 0 ? (
                    <MovieListComponent
                        movieList={movieList}
                        loadDataHandler={loadDataHandler}
                        loading={loading}
                        tabIndex={tabIndex}
                        setPageIndex={setPageIndex}
                        pageIndex={pageIndex} />
                ) : (
                    <div className='fontStyles cardParent'>
                        <h1>{errorMessage}</h1>
                    </div>)
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