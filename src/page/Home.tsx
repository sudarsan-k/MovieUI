import React from 'react'
import "../assets/style/home.css"
import { tabData } from '../assets/common/Common'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { getGenreListSelector } from '../redux/selector'
import { GenreModel, TabList, MovieList } from '../models/Models';
import { getTabList } from '../api/sdk';
import MovieListComponent from '../components/MovieList/MovieListComponent';
import Header from '../components/Header/Header';
import ErrorComponent from '../components/ErrorComponent/ErrorComponent';

type HomeProps = {
    getGenreList: GenreModel[] | any
}

const Home = (props: HomeProps) => {
    const { getGenreList } = props;
    const [initialFocus, setInitialFocus] = useState<boolean>(true);
    const [tabIndex, setTabIndex] = useState<number>(0);
    const [pageIndex, setPageIndex] = useState<number>(1);
    const [movieList, setMovieList] = useState<MovieList[]>([])
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false);

    // Handling the movies datalist  functionality
    const loadDataHandler = (data: TabList, page: number) => {
        if (typeof getGenreList !== 'string') {
            setLoading(true)
            getTabList(data.apiList, page).then((res: any) => {
                let movies: MovieList[] = res.results;
                for (let i: number = 0, len: number = movies.length; len > i; i++) {
                    movies[i].genreList = "";
                    for (let j: number = 0, len: number = movies[i].genre_ids.length; len > j; j++) {
                        let name: string | any = getGenreList?.find((x: GenreModel) => x.id === movies[i].genre_ids[j])?.name;
                        if (name !== null || name !== undefined) {
                            movies[i].genreList += name + (j === len - 1 ? "" : "  -  ");
                        }
                    }
                }
                if (tabIndex !== data.id) {
                    setMovieList([...movies]);
                } else {
                    if (page !== pageIndex) {
                        setPageIndex(page);
                    }
                    setMovieList(prev => [...prev, ...movies]);
                }
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
        //Handleing the initial load funcionality
        if (getGenreList.length > 0) {
            loadDataHandler(tabData[0], pageIndex);
            setTimeout(() => {
                window.scroll(0, 0)
            }, 200);
        }
    }, [getGenreList]);

    // Handling the tab click functionality
    const tabHandler = (event: React.MouseEvent<HTMLLabelElement, MouseEvent>, data: TabList) => {
        if (tabIndex !== data.id) {
            setTabIndex(data.id);
            setPageIndex(1);
            loadDataHandler(data, 1)
            setInitialFocus(false)
            window.scrollTo(0, 0);
        }
    }

    return (
        <div>
            <Header />
            <div className='tabBar'>
                <div className='parentTab'>
                    {
                        tabData.map(data => (
                            <label tabIndex={data.id} key={data.id} className={`labelTab ${initialFocus && data.id === 0 ? 'focusTab' : ''}`} onClick={(e) => tabHandler(e, data)} autoFocus  >{data.name}</label>
                        ))
                    }
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
                        searchFlag={false} />
                ) : (
                    <ErrorComponent errorMessage={errorMessage ? errorMessage : 'No Movie Found!!'} />
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
export default connect(mapStateToProps)(Home);