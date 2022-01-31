import { SET_HP_PROFILE } from "../constants/actionTypes";

const defaultVal = {
    email: 'demohospital@gmail.commmm',
    name: 'Demo User',
    hiringRole: 'Manager',
    phone: '1234567890',
    corporateAddress: [{
        city: "Astoria",
        state: 'NY',
        street: 'demo street',
        zipCode: '11102'
    }],
    healthCareInstitution: {
        name: 'demo Health Care Institution',
        size: '555',
        website: 'demohealthcare.com'
    },
    _id: 'aaa111',
    avatar: '',
    badge: false,
}

export default (state = defaultVal, action) => {
    switch (action.type) {
        case SET_HP_PROFILE:
            return { 
                ...state,
                email: action.data.email,
                name: action.data.name,
                hiringRole: action.data.hiringRole,
                phone: action.data.phone,
                corporateAddress: [...action.data.corporateAddress],
                healthCareInstitution: {...action.data.healthCareInstitution},
                avatar: action.data.avatar,
                badge: action.data.badge,
                _id: action.data._id
             } 
        default:
            return state;
    }
};