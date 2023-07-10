import React, { ChangeEventHandler } from 'react'
import "../assets/style/home.css"
import "../assets/style/header.css"
import "../assets/style/movie.css"
import { useEffect, useState } from 'react'
import { MovieList, LoadFn, TabList } from '../modals/Modals';
import { useLocation, useNavigate } from 'react-router-dom';
import "../assets/style/loader.css"
export type MovieDetailsProps = {
    movieList: MovieList[];
    loadDataHandler: LoadFn;
    loading: boolean;
    tabIndex: number;
    setPageIndex: (value: number) => void;
    pageIndex: number;
}
const Header = (props: MovieDetailsProps | any) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchText, setSearchText] = useState<string>('')
    let timerId: ReturnType<typeof setTimeout>;
    useEffect(() => {
        if (searchText.length > 0) {
            navigate(`/search/${searchText}`, { state: { search: { searchText } } });
        }
    }, [searchText]);

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            setSearchText(e.target.value)
            console.log(e.target.value)
        }, 400)

    }
    return (
        <div>
            <div className='header'>
                <button className='buttonFav'>Go To Favourites</button>
                <label className='labelTab headerLabel' onClick={(e) => {
                    navigate('/')
                }}>Movie App</label>
                <div className='inputDiv'>
                    <input type="text" className='inputText' onChange={changeHandler} placeholder="    Search.." name="search" />
                </div>
            </div>
        </div >
    )
}
export default Header;