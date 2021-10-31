import { BOOKS } from '../constants';

const booksReducer = (state = [], action) => {
    if (action.type === BOOKS.LOAD_SUCCESS) {
        return { ...state, response: action.books };
    }
    return state;
};

export default booksReducer;
