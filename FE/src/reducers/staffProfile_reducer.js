import { SET_SP_PROFILE, SET_TEMP_FILE } from "../constants/actionTypes";

const defaultVal = {
    _id: '',
    email: 'staffdemo@gmail.com',
    name: "Solivia Anna",
    phone: '1234567899',
    avatar: '',
    badge: '',
    jobTitle: '',
    resume: {
        link: '',
        lastUpdated: new Date()
    },    
    natureOfJob: ["Permanent Position"],
    workSchedule: [
        "Full Time"
    ],
    weekendAvailiblity: false,
    immediatelyStart: false,
    startWorkdate: new Date(),
    currentLocation: {
        name: 'New York',
        state: 'NY',
        zipCode: '10001'
    },
    otherCities: [{
        name: "Other City",
        state: 'NJ',
        zipCode: '10004'
    }],
    nursingLicence: [{
        name: 'license-1',
        number: '1234556',
        state: 'Alabamba',
        image: 'aaa'
    }],
    certifications: [{
        name: "cert-1",
        certifyingAuthority: "auth-1",
        receivedOn: new Date(),
        expirationDate: new Date()
    }],
    education: {
        college: 'university',
        degree: 'degree-1',
        receivedOn: new Date()
    },
    liablityInsurance: {
        insuranceProvider: 'insurance',
        policyNumber: '123465'
    },
    experiencedIn: 'demo experience',
    updatedAt: new Date(),
    createdAt: new Date(),
    drugTest: {
        report: '',
        testDate: false,
        status: ''
    },
    bankName: '',
    routingNumber: '',
    accountNumber: '',
    tempFile: false,
    socialSecurityNumber: '',
}

export default (state = defaultVal, action) => {
    switch (action.type) {
        case SET_SP_PROFILE:
            return { 
                ...state,
                _id: action.data._id,
                email: action.data.email,
                name: action.data.name,
                avatar: action.data.avatar,
                badge: action.data.badge,
                phone: action.data.phone,
                resume: {...action.data.resume},
                natureOfJob: [...action.data.natureOfJob],
                workSchedule: [...action.data.workSchedule],
                weekendAvailiblity: action.data.weekendAvailiblity,
                immediatelyStart: action.data.immediatelyStart,
                startWorkdate: action.data.startWorkdate,
                currentLocation: {...action.data.currentLocation},
                otherCities: [...action.data.otherCities],
                nursingLicence: [...action.data.nursingLicence],
                certifications: [...action.data.certifications],
                education: {...action.data.education},
                liablityInsurance: {...action.data.liablityInsurance},
                experiencedIn: action.data.experiencedIn,
                updatedAt: action.data.updatedAt,
                createdAt: action.data.createdAt,
                drugTest: {...action.data.drugTest},
                jobTitle: action.data.jobTitle,
                bankName: action.data.bankName,
                routingNumber: action.data.routingNumber,
                accountNumber: action.data.accountNumber,
                socialSecurityNumber: action.data.socialSecurityNumber
            }
        case SET_TEMP_FILE:
            return { ...state, tempFile: action.data.tempFile }
        default:
            return state;
    }
};