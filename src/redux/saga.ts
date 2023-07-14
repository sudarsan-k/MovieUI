

import { call, put,all, takeLatest } from 'redux-saga/effects';
import { getGenreList } from '../api/sdk';
import { fetchGenreList } from './action';
import { FETCH_GENRELIST_SUCCESS, FETCH_GENRELIST_ERROR, FETCH_GENRELIST } from './action';
import { GenreModel } from '../models/Models';

function* fetchMoviesSaga() {
  try {
    const data: GenreModel[]= yield call(getGenreList); 
        yield put(fetchGenreList(FETCH_GENRELIST_SUCCESS, data));
    } catch (error : any) {
    yield put(fetchGenreList(FETCH_GENRELIST_ERROR, error?.message));
  }
}

function* genreList() {
  yield takeLatest(FETCH_GENRELIST, fetchMoviesSaga);
}


export default function* rootSaga() {
    yield all([genreList()])
}
