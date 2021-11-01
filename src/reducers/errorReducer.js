import { BOOKS } from '../constants';

const errorReducer = (state = null, action) => {
    switch (action.type) {
        case BOOKS.LOAD_FAIL:
            return action.error;
        case BOOKS.LOAD:
        case BOOKS.LOAD_SUCCESS:
            return null;
        default:
            return state;
    }
};

export default errorReducer;
