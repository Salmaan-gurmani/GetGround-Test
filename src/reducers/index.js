import { combineReducers } from 'redux';

import loadingReducer from './loadingReducer';
import booksReducer from './booksReducer';
import errorReducer from './errorReducer';
import optionsReducer from './optionsReducer';

const rootReducer = combineReducers({
    isLoading: loadingReducer,
    books: booksReducer,
    error: errorReducer,
    options: optionsReducer,
});

export default rootReducer;
