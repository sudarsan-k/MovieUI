import React from 'react';

import { Routes, Route } from "react-router-dom";
import './App.css';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { GenreModal } from './modals/Modals';
import { fetchGenre } from './redux/action';
import Router from './Router';
import { getGenreListSelector } from './redux/selector';
export type AppProps = {
    fetchGenre: any,
    getGenreList: GenreModal[] | any,
}
function App(props: AppProps) {
    useEffect(() => {
        if (props.getGenreList.length == 0) {
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
