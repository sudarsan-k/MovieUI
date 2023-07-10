import React from 'react';

import { Routes, Route } from "react-router-dom";
import './App.css';
import Home from './page/Home';
import MovieDetails from './page/MovieDetails';
import SearchDetails from './page/SearchDetails';
import FavouriteDetails from './page/FavouriteDetails';
export type AppProps = {
}
function Router(props: AppProps) {
  return (
    <div className="App">
      <div>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path='/moviedetail/:id' Component={MovieDetails} />
          <Route path='/search/:id' Component={SearchDetails} />

          <Route path='/search/' Component={SearchDetails} />
          <Route path='/favourite' Component={FavouriteDetails} />
        </Routes>
      </div>
    </div>
  );
}

export default Router;
