import React from 'react';

import { Routes, Route } from "react-router-dom";
import './App.css';
import Home from './components/Home';
function App() {
  return (
    <div className="App">
      <div>
        <Routes>
          <Route path="/" Component={Home} />

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

export default App;
