import {SET_EMAIL} from "../constants/actionTypes";

const defaultVal = {
    email: ''
}

export default (state = defaultVal, action) => {
    switch (action.type) {
        case SET_EMAIL:
            return { ...state, email: action.data }
        default:
            return state;
    }
};