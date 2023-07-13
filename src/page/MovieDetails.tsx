import React from 'react'
import "../assets/style/home.css"
import "../assets/style/movie.css"
import { useEffect, useState } from 'react'
import { MovieList, LoadFn } from '../modals/Modals';
import { useLocation } from 'react-router-dom';
import "../assets/style/loader.css";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../components/Header/Header';
import { getMovieDetails } from '../api/sdk';
import { getGenreListSelector, getFavouritesSelector } from '../redux/selector';
import { imageURL } from '../api/index'
import { updateFavourites, removeFavourites } from '../redux/action';
import MovieDetailComponent from '../components/MovieDetails/MovieDetailComponent';
import ErrorComponent from '../components/ErrorComponent/ErrorComponent';

type MovieDetailsProps = {
    movieList: MovieList[];
    loadDataHandler: LoadFn;
    loading: boolean;
    tabIndex: number;
    setPageIndex: (value: number) => void;
    pageIndex: number;
}
const MovieDetails = (props: MovieDetailsProps | any) => {
    const { getGenreList, updateFavourites, getFavourites, removeFavourites } = props;
    const location = useLocation();
    const [movieDetail, setMovieDetail] = useState<MovieList | any>({})
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false);
    const [genreData, setGenreData] = useState<string>('');
    const [languageData, setLanguageData] = useState<string>('');
    const [buttonFlag, setButtonFlag] = useState<boolean>(false)

    useEffect(() => {
        let id = location.state.id;
        setLoading(true)
        if (id !== 0) {
            window.scrollTo(0, 0);
            getMovieDetails(id).then((res: any) => {
                let movies: MovieList = res;
                let genre: string = "";
                let language: string = "";
                for (let j: number = 0, len: number = movies.genres.length; len > j; j++) {
                    genre += movies.genres[j].name + (j === len - 1 ? "" : ",  ");

                }
                for (let j: number = 0, len: number = movies.spoken_languages.length; len > j; j++) {
                    language += movies.spoken_languages[j].english_name + (j === len - 1 ? "" : ",  ");
                }
                setLanguageData(language);
                setGenreData(genre);
                setMovieDetail(movies);
                setErrorMessage('')
                setLoading(false)
            }).catch((e: any) => {
                setErrorMessage(e?.message);
                setLoading(false)
            })
        } else {
            setErrorMessage(getGenreList);
        }
    }, []);

    useEffect(() => {
        if (getFavourites.length !== 0 && getFavourites.find((x: MovieList) => x.id === movieDetail.id)) {
            setButtonFlag(true);
        }
    }, [getFavourites, movieDetail])


    const favouriteHandler = () => {
        if (getFavourites.length === 0 || !getFavourites.find((x: MovieList) => x.id === movieDetail.id)) {
            updateFavourites(movieDetail);
        }
        else if (buttonFlag && getFavourites.find((x: MovieList) => x.id === movieDetail.id)) {
            let favouriteList = getFavourites.filter((x: MovieList) => x.id !== movieDetail.id);
            removeFavourites(favouriteList);
            setButtonFlag(false)
        }

    }

    return (
        <div>
            <Header />
            <div >
                {Object.entries(movieDetail).length > 0 ? (
                    <div className='parentCard'>
                        <div style={{ backgroundImage: `url(${imageURL}${movieDetail.backdrop_path})` }} className='contentMoiveCard' />
                        <MovieDetailComponent
                            favouriteHandler={favouriteHandler}
                            movieDetail={movieDetail}
                            genreData={genreData}
                            languageData={languageData}
                            buttonFlag={buttonFlag}
                        />
                    </div>) : (
                    <ErrorComponent errorMessage={errorMessage} />
                )}
                {loading && <div className="loader centreLoader"></div>}
            </div>
        </div >
    )
}
function mapStateToProps(state: any) {
    return {
        getGenreList: getGenreListSelector(state),
        getFavourites: getFavouritesSelector(state)
    };
}
function mapDispatchToProps(dispatch: any) {
    return bindActionCreators(
        {
            updateFavourites,
            removeFavourites
        },
        dispatch
    );
}
export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails);