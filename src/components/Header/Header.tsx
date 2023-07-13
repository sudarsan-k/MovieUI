import React from 'react'
import "../../assets/style/home.css"
import "../../assets/style/header.css"
import "../../assets/style/movie.css"
import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import "../../assets/style/loader.css"
import logo from "../../assets/images/logo.png"
export type HeaderProps = {
}
const Header = (props: HeaderProps | any) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState<string>('')
    const [testFlag, setTestFlag] = useState<boolean>(false)
    let timerId: ReturnType<typeof setTimeout>;

    useEffect(() => {

        // Setting state value and navigating to search page
        if (testFlag) {
            navigate(`/search/${searchText}`, { state: { search: { searchText } } });
            setTestFlag(false);
        }
    }, [searchText, testFlag]);

    // Handling  the search change handler functionality 
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        //Handled debounce technique
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
                <img src={logo} className='header-img headerLabel' onClick={(e) => {
                    navigate('/')
                }} />

                <div className='inputDiv'>
                    <input type="search" className='inputText' defaultValue={location.state?.search?.searchText} onChange={changeHandler} placeholder="    Search.." name="search" />
                </div>
            </div>
        </div >
    )
}
export default Header;