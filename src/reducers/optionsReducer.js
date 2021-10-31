import { BOOKS } from '../constants';

const optionsReducer = (state = 1, action) => {
    switch (action.type) {
        case BOOKS.LOAD:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return {
                ...state,
                ...action.payload,
            };
    }
};

export default optionsReducer;
