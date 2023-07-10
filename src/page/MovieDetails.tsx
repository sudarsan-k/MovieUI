import React from 'react'
import "../assets/style/home.css"
import "../assets/style/movie.css"
import { useEffect, useState } from 'react'
import { MovieList, LoadFn } from '../modals/Modals';
import { useLocation } from 'react-router-dom';
import "../assets/style/loader.css";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../components/Header';
import { getMovieDetails } from '../api/sdk';
import { getGenreListSelector, getFavouritesSelector } from '../redux/selector';
import { imageURL } from '../api/index'
import { updateFavourites } from '../redux/action';

export type MovieDetailsProps = {
    movieList: MovieList[];
    loadDataHandler: LoadFn;
    loading: boolean;
    tabIndex: number;
    setPageIndex: (value: number) => void;
    pageIndex: number;
}
const MovieDetails = (props: MovieDetailsProps | any) => {
    const { getGenreList, updateFavourites, getFavourites } = props;
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
    }

    return (
        <div>
            <Header />
            <div className='tabBar'>
                <div className='parentTabMovie'>
                    <label className='labelTabMovie'>Movie Details</label>
                </div>
            </div>
            <div >
                {Object.entries(movieDetail).length > 0 ? (
                    <div className='cardParent' id='cardParent'>
                        <div style={{ backgroundImage: `url(${imageURL}${movieDetail.backdrop_path})` }} className='contentMoiveCard' />
                        <div>
                            <img src={`${imageURL}/${movieDetail.poster_path}`}
                                className='movieImage'
                                alt="Image Alt"
                            />
                            <div className='fontStyles headerMovie '>
                                <h1 className='fontmovie paddingLabel paddingTop'> {movieDetail.title}</h1>
                                <h2 className='paddingLabel'>{movieDetail.tagline}</h2>
                                <h3 className='paddingLabel'>{movieDetail.overview}</h3>
                                <div className='font'>
                                    <h3>Genre - &nbsp;</h3>
                                    <h3>{genreData}</h3>
                                </div>
                                <div className='voteDiv'>
                                    <div className='font'>
                                        <h3>Language - &nbsp;</h3>
                                        <h3>{languageData}</h3>
                                    </div>
                                </div>
                                <div className='voteDiv'>
                                    <div className='font'>
                                        <h3>Status - &nbsp;</h3>
                                        <h3>{movieDetail.status}</h3>
                                    </div>
                                    <div className='font'>
                                        <h3>Release Data -  &nbsp;</h3>
                                        <h3>{movieDetail.release_date}</h3>
                                    </div>

                                </div>

                                <div className='voteMovieDiv'>
                                    <div >
                                        <h3>Voter Average</h3>
                                        <h3>{movieDetail.vote_average}</h3>
                                    </div>
                                    <div>
                                        <h3>Voter Count</h3>
                                        <h3>{movieDetail.vote_count}</h3>
                                    </div>
                                </div>
                            </div>
                            <div className='contentMoiveCard fontStyles movieMargin'>
                            </div>
                            <button className={`buttonMovie ${buttonFlag ? 'backgroundButton' : ''}`} onClick={favouriteHandler}> {buttonFlag ? 'Added To Favourites' : 'Add To Favourites'}</button>
                        </div>
                    </div>) : (
                    <div className='fontStyles cardParent'>
                        <h1>{errorMessage}</h1>
                    </div>

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
            updateFavourites
        },
        dispatch
    );
}
export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails);