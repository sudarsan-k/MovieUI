import React from 'react';

import { Routes, Route } from "react-router-dom";
import './App.css';
import { useEffect } from 'react';
import Home from './components/Home';
import MovieDetails from './components/MovieDetails';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getGenreListSelector } from './redux/selector'
import { fetchGenre } from './redux/action';
import { GenreModal } from './modals/Modals';
export type AppProps = {
  fetchGenre: any,
}
function App(props: AppProps) {
  useEffect(() => {
    props.fetchGenre();
  }, []);
  return (
    <div className="App">
      <div>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path='/moviedetail/:id' Component={MovieDetails} />

          {/* <Route path="/task2"> */}
          {/* <Task2 /> */}
          {/* </Route> */}
          {/* <Route path="/task3">
            <Task3 />
          </Route>
          <Route path="/task4">
            <Task4 />
          </Route> */}
        </Routes>
      </div>
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
