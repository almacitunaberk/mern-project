import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE, UPDATE_PROFILE, ALL_PROFILES_FETCHED, GET_GITHUB_REPO } from "../actions/types";

const initialState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {}    
};

export default function(state=initialState, action) {    
    const { type, payload } = action;
    switch(type) {
        case GET_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false                
            };
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false                
            };
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                repos: [],
                loading: false
            };
        case UPDATE_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false                
            };
        case ALL_PROFILES_FETCHED:
            return {
                ...state,
                profiles: payload,
                loading: false
            };
        case GET_GITHUB_REPO:
            return {
                ...state,
                repos: payload,
                loading: false
            }
        default:
            return state;             
    } 
}