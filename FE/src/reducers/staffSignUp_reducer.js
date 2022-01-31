import {    SET_JOB_TYPE,
            SET_LICENCE,
            SET_SELECTED_LICENCE,
            UPDATE_LICENCE,
            SAVE_CONTACT_DETAILS,
            SET_INSURANCE,
            SET_DEGREE,
            SET_CERT,
            SET_SELECTED_CERT,
            SET_SELECTED_EXP,
            SET_PAGE_VISITED,
            SET_SELECTED_STATES,
            SET_LOCATIONS,
            SET_SHOW_EXTEND,
            INIT_STATE
        } from "../constants/actionTypes";

const defaultVal = {
    pageVisited: [false, false, false, false, false],
    /** job type */
    jobType: {
        startDate: false,
        permanentPos: false,
        tempPos: false,
        fullTime: false,
        partTime: false,
        availableWeekEnd: '',
        dateSelected: false,
    },

    /** location info */
    curCity: false,
    nearCity: [],

    /** locatioin page state */
    curVal: '',
    nearVal: '',
    addLoc: [],
    otherLoc: [],
    nearLoc: [],

    /** credentials */
    selectedStates: [],
    nurseLicence: {
    },
    selectedLicence: {
        num: false,
        state: false
    },
    insurance: {
        provider: '',
        number: ''
    },
    degree: {
        degree: '',
        collage: '',
        degreeName: '',
        receivedOn: false
    },
    cert: [],

    selectedExp: '',
    showOtherExp: 'block',
    showExtend: 'none',
    arrow: false,

    selectedCert: false,

    /** contact details */
    contactDetails: {
        fullName: '',
        email: '',
        phone: '',
        psw: '',
        file: false
    }, 
}

export default (state = defaultVal, action) => {
    switch (action.type) {
        case SET_PAGE_VISITED:
            return { ...state, pageVisited: [...action.data]}
        case SET_JOB_TYPE:
            return { ...state, jobType: {...action.data}};
        case SET_LICENCE:
            return { ...state, nurseLicence: {...action.data}};
        case SET_SELECTED_LICENCE:
            return { ...state, selectedLicence: {...action.data}};
        case UPDATE_LICENCE:
            return { ...state, nurseLicence: {...action.data}};
        case SAVE_CONTACT_DETAILS:
            return { ...state, contactDetails: {...action.data}};
        case SET_INSURANCE:
            return { ...state, insurance: {...action.data}};
        case SET_DEGREE:
            return { ...state, degree: {...action.data}};
        case SET_CERT:
            return { ...state, cert: [...action.data]};
        case SET_SELECTED_CERT:
            return { ...state, selectedCert: action.data};
        case SET_SHOW_EXTEND:
            return { ...state, showExtend: action.data.showExtend, arrow: action.data.arrow}
        case SET_SELECTED_EXP:
            return { ...state, selectedExp: action.data.exp, showOtherExp: action.data.showOtherExp};
        case SET_SELECTED_STATES:
            return { ...state, selectedStates: [...action.data]};
        case SET_LOCATIONS:
            return { 
                ...state, 
                curCity: {...action.data.curCity}, 
                nearCity: [...action.data.nearCity],
                curVal: action.data.curVal,
                nearVal: action.data.nearVal,
                addLoc: [...action.data.addLoc],
                otherLoc: [...action.data.otherLoc],
                nearLoc: [...action.data.nearLoc]
            };
        case INIT_STATE:
            return {
                ...state,
                pageVisited: [false, false, false, false, false],
                /** job type */
                jobType: {
                    startDate: false,
                    permanentPos: false,
                    tempPos: false,
                    fullTime: false,
                    partTime: false,
                    availableWeekEnd: '',
                    dateSelected: false,
                },
            
                /** location info */
                curCity: false,
                nearCity: [],
            
                /** locatioin page state */
                curVal: '',
                nearVal: '',
                addLoc: [],
                otherLoc: [],
                nearLoc: [],
            
                /** credentials */
                selectedStates: [],
                nurseLicence: {
                },
                selectedLicence: {
                    num: false,
                    state: false
                },
                insurance: {
                    provider: '',
                    number: ''
                },
                degree: {
                    degree: '',
                    collage: '',
                    degreeName: '',
                    receivedOn: false
                },
                cert: [],
            
                selectedExp: '',
                showOtherExp: 'block',
                showExtend: 'none',
                arrow: false,
            
                selectedCert: false,
            
                /** contact details */
                contactDetails: {
                    fullName: '',
                    email: '',
                    phone: '',
                    psw: '',
                    file: false
                }                
            }
        default:
            return state;
    }
};