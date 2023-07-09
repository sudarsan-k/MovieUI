import React from 'react'
import "../assets/style/home.css"
import { useEffect, useState } from 'react'
import { MovieList, LoadFn, TabList } from '../modals/Modals';
import { LazyLoadImage } from "react-lazy-load-image-component";
import { tabData } from '../assets/common/Common';
import "../assets/style/loader.css"
import { useNavigate } from 'react-router-dom';
import { imageURL } from '../api/index'
type MovieListProps = {
    movieList: MovieList[];
    loadDataHandler: LoadFn;
    loading: boolean;
    tabIndex: number;
    setPageIndex: (value: number) => void;
    pageIndex: number;
}

const MovieListComponent = (props: MovieListProps) => {
    const { loading, loadDataHandler, movieList, tabIndex, pageIndex } = props

    const [movieDetailFlag, setMovieDetailFlag] = useState<boolean>(false);
    const [movieId, setMovieId] = useState<number>(0);
    const navigate = useNavigate();

    const handleScroll = () => {
        const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 100 && !loading) {
            loadDataHandler(tabData[tabIndex], (pageIndex + 1));
        }
    };

    // const cardHandler = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, data: MovieList) => {
    //     if (tabIndex !== data.id) {
    //         // setTabIndex(data.id);
    //         // setPageIndex(1);
    //         // loadDataHandler(data, pageIndex)
    //         // setInitialFocus(false)
    //         // window.scrollTo(0, 0);
    //     }
    // }
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    return (
        <div className='cardParent' id='cardParent'>
            {
                movieList.map((data, index) => (
                    <div className='card' key={index} onClick={(e) => {
                        setMovieId(data.id)
                        setMovieDetailFlag(true)
                        navigate(`/movieDetail/${data.id}`, { state: { id: data.id } });

                    }}>
                        <LazyLoadImage src={`${imageURL}/${data.poster_path}`}
                            width="100%"
                            height={'150px'}
                            className='imageScreen'
                            placeholderSrc={`${imageURL}/${data.backdrop_path}`}
                            alt="Image Alt"
                        />
                        <div className='contentCard fontStyles'>
                            <h2 > {data.title}</h2>
                            <div>
                                <label><strong>Genre</strong></label>
                                <p>{data.genreList}</p>
                            </div>
                            <div>
                                <label><strong>Release Data</strong></label>
                                <p>{data.release_date}</p>
                            </div>
                            <div className='voteDiv'>
                                <div >
                                    <label><strong>Voter Average - </strong></label>
                                    <label>{data.vote_average}</label>
                                </div>
                                <div>
                                    <label><strong>Voter Count - </strong></label>
                                    <label>{data.vote_count}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                )
                )
            }

            {loading && <div className="loader"></div>}
        </div>
    )
}
export default MovieListComponent