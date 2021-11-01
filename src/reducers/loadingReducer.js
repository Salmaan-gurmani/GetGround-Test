import { BOOKS } from '../constants';

const loadingReducer = (state = false, action) => {
    switch (action.type) {
        case BOOKS.LOAD:
            return true;
        case BOOKS.LOAD_SUCCESS:
            return false;
        case BOOKS.LOAD_FAIL:
            return false;
        default:
            return state;
    }
};

export default loadingReducer;
