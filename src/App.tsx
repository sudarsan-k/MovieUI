import React from 'react';
import './App.css';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { GenreModel } from './models/Models';
import { fetchGenre } from './redux/action';
import Router from './Router/Router';
import { getGenreListSelector } from './redux/selector';
export type AppProps = {
    fetchGenre: any,
    getGenreList: GenreModel[] | any,
}
function App(props: AppProps) {
    useEffect(() => {
        if (props.getGenreList.length == 0 || typeof props.getGenreList == 'string') {
            props.fetchGenre();
        }
    }, []);
    return (
        <div className="App">
            <Router />
        </div>
    );
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
export default connect(mapStateToProps, mapDispatchToProps)(App);
