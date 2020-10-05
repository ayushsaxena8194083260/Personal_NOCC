import { AUTH_START, AUTH_SUCCESS, AUTH_FAIL, AUTH_LOGOUT } from "../actions/types";


const INITIAL_STATE = {
    isAuthenticated:localStorage.getItem('isAuthenticated'),
    error:null,
    loading:false
}
export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case AUTH_START:{
            return {
                ...state,
                loading:true
            }
        }
        case AUTH_SUCCESS:{
            return {
                ...state,
                isAuthenticated:action.isAuthenticated,
                loading:false
            }
        }
        case AUTH_FAIL:{
            return {
                ...state,
                error:action.error,
                loading:false
            }
        }
        case AUTH_LOGOUT:{
            return {
                ...state,
                isAuthenticated:false,
                userId:null,
            }
        }
        default:
            return state;
    }
}