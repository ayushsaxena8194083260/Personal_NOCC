import {
    GET_ALL_VENDORS,
    GET_VENDOR_BYID,
    POST_VENDOR,
    DELETE_VENDOR
} from '../actions/types'

const INITIAL_STATE = {
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case GET_ALL_VENDORS:
            return {
                ...state,
                allvendors: action.vendors

            }

        case GET_VENDOR_BYID:
            return {
                ...state,
                vendor: action.vendor

            }

        case POST_VENDOR:
            return {
                ...state,
                vendor: action.vendor
            }

        case DELETE_VENDOR:
            console.log(state);
            console.log(action);
            return {
                ...state,
                //remove the deleted vendor from the state object
                allvendors: state.allvendors.filter(vendor => vendor.vendorId !== action.response.id),
            }

        default:
            return state;
    }
}
