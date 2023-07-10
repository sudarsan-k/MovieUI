import React from 'react';

import { Routes, Route } from "react-router-dom";
import './App.css';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchGenre } from './redux/action';
import Router from './Router';
export type AppProps = {
    fetchGenre: any,
}
function App(props: AppProps) {
    useEffect(() => {
        props.fetchGenre();
    }, []);
    return (
        <div className="App">
            <Router />
        </div>
    );
}
function mapStateToProps(state: any) {
    return {
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
