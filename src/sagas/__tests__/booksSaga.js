import { runSaga } from 'redux-saga';

import { getPage, handleBooksLoad } from '../booksSaga';
import * as api from '../../api'; // we'll mock the fetchBooks api
import { setBooks, setError } from '../../actions';

test('selector should return the desired page', () => {
    const nextPage = 1;
    const state = { nextPage };
    const res = getPage(state);
    expect(res).toBe(nextPage);
});

test('should load and handle books in case of success', async () => {
    // we push all dispatched actions to make assertions easier
    // and our tests less brittle
    const dispatchedActions = [];

    // we don't want to perform an actual api call in our tests
    // so we will mock the fetchBooks api with jest
    // this will mutate the dependency which we may reset if other tests
    // are dependent on it
    const mockedBooks = ['img1', 'img2'];
    api.fetchBooks = jest.fn(() => Promise.resolve(mockedBooks));

    const fakeStore = {
        getState: () => ({ nextPage: 1 }),
        dispatch: action => dispatchedActions.push(action),
    };

    // wait for saga to complete
    await runSaga(fakeStore, handleBooksLoad).done;

    expect(api.fetchBooks.mock.calls.length).toBe(1);
    expect(dispatchedActions).toContainEqual(setBooks(mockedBooks));
});

test('should handle image load errors in case of failure', async () => {
    const dispatchedActions = [];

    // we simulate an error by rejecting the promise
    // then we assert if our saga dispatched the action(s) correctly
    const error = 'API server is down';
    api.fetchBooks = jest.fn(() => Promise.reject(error));

    const fakeStore = {
        getState: () => ({ nextPage: 1 }),
        dispatch: action => dispatchedActions.push(action),
    };

    await runSaga(fakeStore, handleBooksLoad).done;

    expect(api.fetchBooks.mock.calls.length).toBe(1);
    expect(dispatchedActions).toContainEqual(setError(error));
});
