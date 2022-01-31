import {    
    SET_AUTH,
    SET_CUR_POS
        } from "../constants/actionTypes";

export default (state = { curPos: ''}, action) => {
    switch (action.type) {
        case SET_AUTH:
            return { 
                ...state,
                name: action.data.name, 
                type: action.data.type, 
                avatar: action.data.avatar,
                badge: action.data.badge,
                title: action.data.title
            };
        case SET_CUR_POS:
            return { ...state, curPos: action.data};
        default:
            return state;
    }
};
