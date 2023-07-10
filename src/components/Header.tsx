import React from 'react'
import "../assets/style/home.css"
import "../assets/style/header.css"
import "../assets/style/movie.css"
import { useEffect, useState } from 'react'
import { MovieList, LoadFn } from '../modals/Modals';
import { useNavigate } from 'react-router-dom';
import "../assets/style/loader.css"
export type HeaderProps = {
}
const Header = (props: HeaderProps | any) => {
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState<string>('')
    const [testFlag, setTestFlag] = useState<boolean>(false)
    let timerId: ReturnType<typeof setTimeout>;
    useEffect(() => {
        if (testFlag) {
            navigate(`/search/${searchText}`, { state: { search: { searchText } } });
            setTestFlag(false);
        }
    }, [searchText]);

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            setSearchText(e.target.value);
            setTestFlag(true)

        }, 400)

    }
    return (
        <div>
            <div className='header'>
                <button className='buttonFav' onClick={(e) => {
                    navigate('/favourite')
                }}>Go To Favourites</button>
                <label className='labelTab headerLabel' onClick={(e) => {
                    navigate('/')
                }}>Movie App</label>
                <div className='inputDiv'>
                    <input type="search" className='inputText' onChange={changeHandler} placeholder="    Search.." name="search" />
                </div>
            </div>
        </div >
    )
}
export default Header;