import React from 'react'
import "../assets/style/home.css"
import "../assets/style/movie.css"
import { useEffect, useState } from 'react'
import { MovieList, LoadFn, TabList } from '../modals/Modals';
import { useLocation } from 'react-router-dom';
import { tabData } from '../assets/common/Common';
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
    const location = useLocation();


    useEffect(() => {
        console.log(location)
    }, []);

    return (
        <div>
            <div className='header'>
                <label className='labelTab headerLabel'>Movie App</label>
            </div>
        </div >
    )
}
export default Header;