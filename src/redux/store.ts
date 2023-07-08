import { createStore, applyMiddleware } from 'redux';
// import  applyMiddleware  from 'redux';
import createSagaMiddleware from "@redux-saga/core";
import rootSaga from "./saga";
import movieReducer from "./reducer";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(movieReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;