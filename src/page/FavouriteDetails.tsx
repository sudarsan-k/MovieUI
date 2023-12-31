import React from 'react'
import "../assets/style/home.css"
import "../assets/style/movie.css"
import { useEffect, useState } from 'react'
import { MovieList } from '../models/Models';
import "../assets/style/loader.css";
import { connect } from 'react-redux';
import Header from '../components/Header/Header';
import { getFavouritesSelector } from '../redux/selector';
import MovieListComponent from '../components/MovieList/MovieListComponent';
import ErrorComponent from '../components/ErrorComponent/ErrorComponent';

type FavouriteDetailsProps = {
    getFavouriteList: MovieList[];
    loading: boolean;
    tabIndex: number;
    pageIndex: number;
}
const FavouriteDetails = (props: FavouriteDetailsProps | any) => {
    const { getFavouriteList } = props;
    const [tabIndex] = useState<number>(0);
    const [pageIndex, setPageIndex] = useState<number>(1);
    const [movieList, setMovieList] = useState<MovieList[]>(getFavouriteList)
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false);


    useEffect(() => {

        // Handling the favourite movie list functionality
        if (getFavouriteList.length > 0) {
            setLoading(true)
            let movies: MovieList[] = [...getFavouriteList];
            for (let i: number = 0, len: number = movies.length; len > i; i++) {
                movies[i].genreList = "";
                for (let j: number = 0, len: number = movies[i].genres.length; len > j; j++) {
                    let name: string | any = movies[i].genres[j].name;
                    if (name !== null || name !== undefined) {
                        movies[i].genreList += name + (j === len - 1 ? "" : " - ");
                    }
                }
            }
            setMovieList([...movies]);
            setErrorMessage('')
            setLoading(false)
        }
        window.scrollTo(0, 0);
    }, [getFavouriteList]);

    return (
        <div>
            <Header />
            <div className='tabBar'>
                <div className='parentTabMovie'>
                    <label className='labelTabMovie'>Favourite Movies</label>
                </div>
            </div>
            <div className='backroundParent'>
                {movieList.length > 0 && errorMessage.length == 0 ? (
                    <MovieListComponent
                        movieList={movieList}
                        loadDataHandler={() => { }}
                        loading={loading}
                        tabIndex={tabIndex}
                        setPageIndex={setPageIndex}
                        pageIndex={pageIndex}
                        searchFlag={false} />
                ) : (
                    <ErrorComponent errorMessage='No Movie Found' />
                )
                }
            </div>

        </div>
    )
}
function mapStateToProps(state: any) {
    return {
        getFavouriteList: getFavouritesSelector(state),
    };
}
export default connect(mapStateToProps)(FavouriteDetails);