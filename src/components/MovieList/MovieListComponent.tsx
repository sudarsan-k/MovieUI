import React from 'react'
import "../../assets/style/home.css"
import { useEffect, useState } from 'react'
import { MovieList, LoadFn } from '../../models/Models';
import { LazyLoadImage } from "react-lazy-load-image-component";
import { tabData } from '../../assets/common/Common';
import "../../assets/style/loader.css"
import { useNavigate, useLocation } from 'react-router-dom';
import { imageURL } from '../../api/index'

type MovieListProps = {
    movieList: MovieList[];
    loadDataHandler: LoadFn;
    loading: boolean;
    tabIndex: number;
    setPageIndex: (value: number) => void;
    pageIndex: number;
    searchFlag: boolean;
}

const MovieListComponent = (props: MovieListProps) => {
    const { loading, loadDataHandler, movieList, tabIndex, pageIndex, searchFlag } = props
    const [isHovering, setIsHovering] = useState<boolean>(false);
    const [hoverIndex, setHoverIndex] = useState<number | null>(null)
    const navigate = useNavigate();
    const location = useLocation();


    //Handling vitual scrolling feature here based on the scrolltop, scrollheight, clientheight
    const handleScroll = () => {
        const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 100 && !loading) {
            if (searchFlag) {
                loadDataHandler(location.state.search.searchText, (pageIndex + 1));

            }
            else {
                loadDataHandler(tabData[tabIndex], (pageIndex + 1));

            }
        }
    };
    //Handling mouse hover functionality
    const handleMouseOver = (index: number) => {
        setIsHovering(true);
        setHoverIndex(index);
    };
    //Handling mouse out functionality
    const handleMouseOut = (index: number) => {
        setIsHovering(false);
    };
    useEffect(() => {
        // binding the events for virtual scroll feature
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    return (
        <div className='cardParent' id='cardParent'>
            {
                movieList.map((data, index) => (
                    <div key={index}
                        onMouseOver={() => handleMouseOver(index)}
                        onMouseOut={() => handleMouseOut(index)}
                        onClick={(e) => {
                            navigate(`/movieDetail/${data.id}`, { state: { id: data.id } });
                        }}>
                        {isHovering && index === hoverIndex ? (<div className='card'>
                            <LazyLoadImage src={`${imageURL}/${data.poster_path}`}
                                width="100%"
                                height={'150px'}
                                className='imageScreen'
                                alt="Image Alt"
                            />
                            <div className='contentCard fontStyles'>
                                <h2 > {data.title}</h2>
                                <div>
                                    <label><strong>Genre</strong></label>
                                    <p>{data.genreList}</p>
                                </div>
                                <div>
                                    <label><strong>Release Date</strong></label>
                                    <p>{data.release_date}</p>
                                </div>
                                <div className='voteDiv'>
                                    <div >
                                        <label><strong>Average - </strong></label>
                                        <label>{data.vote_average}</label>
                                    </div>
                                    <div>
                                        <label><strong>Count - </strong></label>
                                        <label>{data.vote_count}</label>
                                    </div>
                                </div>
                            </div>
                        </div>) : (<div className='card-hover'>
                            <LazyLoadImage src={`${imageURL}/${data.poster_path}`}

                                className='imageScreen-hover'
                                alt="Image Alt"
                            />
                            <div className='contentCard fontStyles'>
                                <h2 > {data.title}</h2></div></div>)}
                    </div>
                )
                )
            }

            {loading && <div className="loader"></div>}
        </div>
    )
}
export default MovieListComponent