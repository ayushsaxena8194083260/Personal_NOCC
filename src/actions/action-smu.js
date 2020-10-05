import {
    GET_SMU_BY_SMU_ID,
    GET_SMU_BY_INV_ID,
    POST_SMU,
    GET_ALL_SMUS,
    DELETE_SMU,
    SHOW_SPINNER,
    HIDE_SPINNER
    
} from './types'
import service from "../services/SMUServices";

import {showSuccessAlert, showErrorAlert} from "./AlertActions";

/**
 * get article
 */
export const getSMUBySMUId = (smu_id) => {
    return (dispatch) => {
        dispatch({type: SHOW_SPINNER})

        service.getSMUBySMUId(smu_id).then(response => {
            if (response.data) {

                dispatch({
                    type: GET_SMU_BY_SMU_ID,
                    allSMUBySMUId: response.data
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

/**
 * get article
 */
export const getSMUByInverterId = (inv_id) => {
    return (dispatch) => {
        dispatch({type: SHOW_SPINNER})

        service.getSMUByInverterId(inv_id).then(response => {
            if (response.data) {

                dispatch({
                    type: GET_SMU_BY_INV_ID,
                    allSMUByInvId: response.data
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

/**
 * post article
 */
export const getAllSMU = () => {
    return (dispatch) => {
        dispatch({type: SHOW_SPINNER})

        service.getAllSMU().then(response => {
            if (response.data) {

                dispatch({
                    type: GET_ALL_SMUS,
                    allSMUs: response.data
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
export const createOrUpdateSmu = (smuDetails) => {
    return (dispatch) => {
        dispatch({type: SHOW_SPINNER})

        service.createOrUpdateSmu(smuDetails).then(response => {
            if (response.data) {

                dispatch({
                    type: POST_SMU
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

/**
 * delete article
 */
export const deleteSMU = (id) => {
    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })
        
        service.deleteSMU(id).then(response => {
            if (response.data) {
                console.log(response);
                let resObj = {status:response.data, id:id};
                dispatch({
                    type: DELETE_SMU,
                    response: resObj
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