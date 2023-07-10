import { createStore, applyMiddleware } from 'redux';
// import  applyMiddleware  from 'redux';
import createSagaMiddleware from "@redux-saga/core";
import rootSaga from "./saga";
import movieReducer from "./reducer";
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage' 
 
const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, movieReducer);

const sagaMiddleware = createSagaMiddleware();
const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;