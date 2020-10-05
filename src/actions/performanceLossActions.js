import {
    GET_PERF_LOSS_PLANTIDS_DATE,
    POST_PERF_LOSS_DATA,
    SHOW_SPINNER,
    HIDE_SPINNER
} from './types'
import service from "../services/perfomanceLossServices";

import {showSuccessAlert, showErrorAlert} from "./AlertActions";
/**
 * get article
 */
export const getPerformanceLossByPlantIdsPeriod = (data) => {
    return (dispatch) => {
        dispatch({type: SHOW_SPINNER})

        service.getPerformanceLossByPlantIdsPeriod(data).then(response => {
            if (response.data) {

                dispatch({
                    type: GET_PERF_LOSS_PLANTIDS_DATE,
                    perfLossByPlantIdsDate: response.data
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
export const createOrUpdatePerformanceLoss = (data) => {
    return (dispatch) => {
        dispatch({type: SHOW_SPINNER})

        service.createOrUpdatePerformanceLoss(data).then(response => {
            if (response.data) {

                dispatch({
                    type: POST_PERF_LOSS_DATA
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
