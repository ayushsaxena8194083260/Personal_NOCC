import {
    GET_ALL_VENDORS,
    GET_VENDOR_BYID,
    POST_VENDOR,
    DELETE_VENDOR,
    SHOW_SPINNER,
    HIDE_SPINNER
} from './types'
import service from "../services/vendorService";

import { showSuccessAlert, showErrorAlert } from "./AlertActions";
/**
 * get article
 */
export const getAllVendors = () => {
    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })

        service.getAllVendors().then(response => {
            if (response.data) {
                dispatch({
                    type: GET_ALL_VENDORS,
                    vendors: response.data
                })

            } else {
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

export const getVendorById = (id) => {
    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })

        service.getVendorById(id).then(response => {
            if (response.data) {
                dispatch({
                    type: GET_VENDOR_BYID,
                    vendor: response.data
                })

            } else {
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

/**
 * post article
 */
export const createOrUpdateVendor = (vendor) => {
    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })

        service.createOrUpdateVendor(vendor).then(response => {
            console.log(response);
            if (response.data) {

                dispatch({
                    type: POST_VENDOR
                })

            } else {
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

/**
 * delete article
 */
export const deleteVendor = (id) => {
    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })
        console.log('hi');
        service.deleteVendor(id).then(response => {
            if (response.data) {
                console.log(response);
                let resObj = {status:response.data, id:id};
                dispatch({
                    type: DELETE_VENDOR,
                    response: resObj,
                })

            } else {
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

