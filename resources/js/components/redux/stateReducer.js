import { combineReducers } from 'redux';

const INITIAL_STATE = {
    user: null
};

const stateReducer = (state = INITIAL_STATE, action) => {
    // console.log('stateReducer', action)
    switch (action.type) {
        case 'refresh-user':
            return { user: action.user };
        default:
            return state
    }
};

export default combineReducers({
    state: stateReducer
});