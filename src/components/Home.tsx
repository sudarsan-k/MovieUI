import React from 'react'
import "../assets/style/home.css"
import { tabData } from '../assets/common/Common'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { fetchGenre } from '../redux/action';
import { bindActionCreators } from 'redux';
import { getGenreListSelector } from '../redux/selector'
import { GenreModal, TabList, MovieList } from '../modals/Modals';
import { getTabList } from '../api/sdk';


export type HomeProps = {
    fetchGenre: any,
    getGenreList: GenreModal[] | any
}

const Home = (props: HomeProps) => {
    const { getGenreList } = props;

    const [initialFocus, setInitialFocus] = useState<boolean>(true);
    const [tabIndex, setTabIndex] = useState<number>(0);
    const [pageIndex, setPageIndex] = useState<number>(1);
    const [movieList, setMovieList] = useState<MovieList[]>([])

    const loadDataHandler = (data: TabList, page: number) => {
        getTabList(data.apiList, page).then((res: any) => {
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
            if (tabIndex !== data.id) {
                setMovieList([...movies]);
            } else {
                setMovieList(prev => [...prev, ...movies]);
            }


            console.log("updated", movies)
        })
    }
    useEffect(() => {
        if (getGenreList.length > 0) {
            console.log(getGenreList)
            loadDataHandler(tabData[0], pageIndex);
        }
    }, [getGenreList]);

    const tabHandler = (event: React.MouseEvent<HTMLLabelElement, MouseEvent>, data: TabList) => {
        if (tabIndex !== data.id) {
            setTabIndex(data.id);
            loadDataHandler(data, pageIndex)
            setInitialFocus(false)
        }
    }

    return (
        <div>
            <div className='header'>
                <label className='labelTab headerLabel'>Movie App</label>
            </div>
            <div className='tabBar'>
                <div className='parentTab'>
                    {
                        tabData.map(data => (
                            <label tabIndex={data.id} key={data.id} className={`labelTab ${initialFocus && data.id === 0 ? 'focusTab' : ''}`} onClick={(e) => tabHandler(e, data)} autoFocus  >{data.name}</label>
                        ))
                    }
                </div>
            </div>
            <div className='cardParent'>
                {movieList.length > 0 && movieList.map((data, index) => (
                    // (index == 0 || index == 1) && (
                    <div className='card' key={index}>

                        <img src={` https://image.tmdb.org/t/p/original/${data.poster_path}`} className='imageScreen' />

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
                            <div>
                                <div className='voteDiv'>
                                    <label><strong>Voter Average</strong></label>
                                    <label>{data.vote_average}</label>
                                </div>
                                <div>
                                    <label><strong>Voter Count</strong></label>
                                    <label>{data.vote_count}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                )

                )}
            </div>
        </div>
    )
}

function mapStateToProps(state: any) {
    return {
        getGenreList: getGenreListSelector(state),
    };
}
function mapDispatchToProps(dispatch: any) {
    return bindActionCreators(
        {
            fetchGenre
        },
        dispatch
    );
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);