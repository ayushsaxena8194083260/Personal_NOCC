import {
    GET_ALL_STRINGS_BY_SMU,
    SHOW_SPINNER,
    HIDE_SPINNER
    
} from './types'
import service from "../services/stringMonitoringServices";

import {showSuccessAlert, showErrorAlert} from "./AlertActions";

/**
 * get article
 */
export const getAllStrings = () => {
    return (dispatch) => {
        dispatch({type: SHOW_SPINNER})

        service.getAllStrings().then(response => {
            if (response.data) {
 
                dispatch({
                    type: GET_ALL_STRINGS_BY_SMU,
                    allStringsBySMU: response.data
                })

            } else {
                dispatch({type: HIDE_SPINNER})
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({type: HIDE_SPINNER})
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}
