import { put, call, select, takeLatest } from 'redux-saga/effects';

import { setBooks, setError } from '../actions';
import { BOOKS } from '../constants';
import { fetchBooks } from '../api';

export const getPage = state => state.options.page;
export const getItemsPerPage = state => state.options.itemsPerPage;
export const getFilters = state => state.options.filter;

export function* handleBooksLoad() {
    try {
        const page = yield select(getPage);
        const itemsPerPage = yield select(getItemsPerPage);
        const filters = yield select(getFilters);

        const books = yield call(fetchBooks, page, itemsPerPage, filters);
        yield put(setBooks(books));
    } catch (error) {
        yield put(setError(error.toString()));
    }
}

export default function* watchBooksLoad() {
    yield takeLatest(BOOKS.LOAD, handleBooksLoad);
}
