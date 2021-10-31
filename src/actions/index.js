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

const setCount = count => ({
    type: BOOKS.SET_COUNT,
    count,
});

export { loadBooks, setBooks, setError, setCount };
