import React from 'react'
import "../../assets/style/movie.css"
import "../../assets/style/loader.css"
import { MovieList } from '../../modals/Modals'
import { imageURL } from '../../api/index'

export type MovieComponentProps = {
    languageData: string;
    genreData: string;
    movieDetail: MovieList;
    favouriteHandler: (value: any) => void;
    buttonFlag: boolean;
}
const MovieDetailComponent = (props: MovieComponentProps) => {
    const { movieDetail, genreData, languageData, favouriteHandler, buttonFlag } = props;

    return (
        <div>
            <div className='parentFlex'>
                <img src={`${imageURL}/${movieDetail.poster_path}`}
                    className='movieImage'
                    alt="Image Alt"
                />
                <div className='fontStyles cardContent textAlign'>
                    <h1 className='h1tag'> {movieDetail.title}</h1>
                    <label className='marginLabel taglabel'>{movieDetail.overview}</label>
                    <div className='font marginBottom'>
                        <h3>Genre - &nbsp;</h3>
                        <h3>{genreData}</h3>
                    </div>
                    <div className='font marginBottom'>
                        <h3>Language - &nbsp;</h3>
                        <h3>{languageData}</h3>
                    </div>
                    <div className='font marginBottom'>
                        <h3>Status - &nbsp;</h3>
                        <h3>{movieDetail.status}</h3>
                    </div>
                    <div className='font marginBottom'>
                        <h3>Release Data -  &nbsp;</h3>
                        <h3>{movieDetail.release_date}</h3>
                    </div>

                    <div className='font marginBottom'>
                        <h3>Voter Average - &nbsp;</h3>
                        <h3>{movieDetail.vote_average}</h3>
                    </div>
                    <div className='font marginBottom'>
                        <h3>Voter Count - &nbsp;</h3>
                        <h3>{movieDetail.vote_count}</h3>
                    </div>
                    <div className='font justify '>
                        <button className={`buttonMovie movieMargin  ${buttonFlag ? 'backgroundButton' : ''}`} onClick={favouriteHandler}> {buttonFlag ? 'Remove From Favourites' : 'Add To Favourites'}</button>
                    </div>
                </div>
            </div>
        </div >
    )
}
export default MovieDetailComponent;