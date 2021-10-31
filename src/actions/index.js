import { BOOKS } from '../constants';

const loadBooks = data => ({
    type: BOOKS.LOAD,
    payload: data,
});

const setBooks = books => ({
    type: BOOKS.LOAD_SUCCESS,
    books,
});

const setError = error => ({
    type: BOOKS.LOAD_FAIL,
    error,
});

export { loadBooks, setBooks, setError };
