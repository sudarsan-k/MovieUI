import React from 'react'
import "../assets/style/home.css"
import { tabData } from '../assets/common/Common'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { fetchGenre } from '../redux/action';
import { bindActionCreators } from 'redux';
import { getGenreListSelector } from '../redux/selector'
import { genreModal } from '../modals/Modals';


type HomeProps = {
    fetchGenre: any,
    getGenreList: genreModal[] | string
}

const Home = (props: HomeProps) => {

    const [initialFocus, setInitialFocus] = useState<boolean>(true);
    const [tabIndex, setTabIndex] = useState<number>(0)
    useEffect(() => {
        // getGenreList().then((res) => { console.log(res) })
        // getTopRatedList().then(
        //     (res) => { console.log(res) }
        // ).catch((e) => {
        //     console.log(e)
        // })
        // getNowPLayingList()
        // getPopularList()
        // getUpcomingList()
        props.fetchGenre();


    }, []);

    useEffect(() => {


    }, [props.getGenreList]);

    const tabHandler = (event: React.MouseEvent<HTMLLabelElement, MouseEvent>, index: number) => {
        if (tabIndex !== index) {
            setTabIndex(index);

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
                            <label tabIndex={data.id} key={data.id} className={`labelTab ${initialFocus && data.id === 0 ? 'focusTab' : ''}`} onClick={(e) => tabHandler(e, data.id)} autoFocus  >{data.name}</label>
                        ))
                    }
                </div>
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