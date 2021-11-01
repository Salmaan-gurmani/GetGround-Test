import { runSaga } from 'redux-saga';

import { getPage, handleBooksLoad, getItemsPerPage } from '../booksSaga';
import * as api from '../../api'; // we'll mock the fetchBooks api
import { setBooks, setError } from '../../actions';

test('selector should return the desired page', () => {
    const options = { page: 1 };
    const state = { options };
    const res = getPage(state);
    expect(res).toBe(1);
});
test('selector should return the desired itemsPerPage', () => {
    const options = { itemsPerPage: 30 };
    const state = { options };
    const res = getItemsPerPage(state);
    expect(res).toBe(30);
});

test('should load and handle books in case of success', async () => {
    // we push all dispatched actions to make assertions easier
    // and our tests less brittle
    const dispatchedActions = [];

    // we don't want to perform an actual api call in our tests
    // so we will mock the fetchBooks api with jest
    // this will mutate the dependency which we may reset if other tests
    // are dependent on it
    const mockedBooks = {
        books: [
            {
                book_author: ['Ανώνυμος'],
                book_pages: 104,
                book_publication_city: 'Βενετία',
                book_publication_country: 'Ιταλία',
                book_publication_year: 1529,
                book_title: 'Ο Αλέξανδρος ο Μακεδών',
                id: 2086,
            },
            {
                book_author: ['Ανώνυμος'],
                book_pages: 32,
                book_publication_city: 'Βενετία',
                book_publication_country: 'Ιταλία',
                book_publication_year: 1548,
                book_title:
                    'Διήγησις εις τας πράξεις του περιβοήτου στρατηγού των ρωμαίων μεγάλου Βελισαρίου',
                id: 2060,
            },
        ],
        type: 'BOOKS_LOAD_SUCCESS',
    };
    api.fetchBooks = jest.fn(() => Promise.resolve(mockedBooks));

    const fakeStore = {
        getState: () => ({ options: { page: 1, itemsPerPage: 2 } }),
        dispatch: action => dispatchedActions.push(action),
    };

    // wait for saga to complete
    await runSaga(fakeStore, handleBooksLoad).result;
    expect(api.fetchBooks.mock.calls.length).toBe(1);
    expect(dispatchedActions).toContainEqual(setBooks(mockedBooks));
});

test('should handle books load errors in case of failure', async () => {
    const dispatchedActions = [];

    // we simulate an error by rejecting the promise
    // then we assert if our saga dispatched the action(s) correctly
    const error = 'API server is down';
    api.fetchBooks = jest.fn(() => Promise.reject(error));

    const fakeStore = {
        getState: () => ({ options: { page: 1, itemsPerPage: 2 } }),
        dispatch: action => dispatchedActions.push(action),
    };

    await runSaga(fakeStore, handleBooksLoad).done;

    expect(api.fetchBooks.mock.calls.length).toBe(1);
    expect(dispatchedActions).toContainEqual(setError(error));
});
