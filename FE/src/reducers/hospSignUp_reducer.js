import {SET_ROLE, 
        SET_ABOUTUS,
        SET_HOSP_LOCATIONS,
        SET_HOSP_CONTACTS,
        SET_HOSP_DETAILS,
        INIT_STATE
    } from "../constants/actionTypes";

const defaultVal = {
    pageVisited: [false, false, false],
    healthcare_contacts: {
        first_name: '',
        last_name: '',
        company_email_address: '',
        phone_number: '',
        password: '',
        repassword: '',
        role_id: '',
    },
    location: {
        street_address: '',
        zip_code: '',
        city: '',
        state_id: '',
        state: ''
    },
    healthcares: {
        institution_name: '',
        institution_size:  '',
        institution_website: ''
    }
}

export default (state = defaultVal, action) => {
    switch (action.type) {
        case SET_ROLE:
            return { ...state, _roles: [...action.data]}
        case SET_ABOUTUS:
            return { ...state, _aboutUs: [...action.data]}
        case SET_HOSP_LOCATIONS:
            return { ...state, location: {...action.data}}
        case SET_HOSP_CONTACTS:
            return{ ...state, healthcare_contacts: {...action.data}}
        case SET_HOSP_DETAILS:
            return{ ...state, healthcares: {...action.data}}
        case INIT_STATE:
            return {
                ...state,
                pageVisited: [false, false, false],
                healthcare_contacts: {
                    first_name: '',
                    last_name: '',
                    company_email_address: '',
                    phone_number: '',
                    password: '',
                    repassword: '',
                    role_id: '',
                },
                location: {
                    street_address: '',
                    zip_code: '',
                    city: '',
                    state_id: '',
                    state: ''
                },
                healthcares: {
                    institution_name: '',
                    institution_size:  '',
                    institution_website: ''
                }
            }
        default:
            return state;
    }
};