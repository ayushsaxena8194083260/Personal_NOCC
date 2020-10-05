import {
    GET_PERFORMANCE_DAILY,
    GET_PERFORMANCE_MONTHLY,
    SHOW_SPINNER,
    HIDE_SPINNER
} from './types'
import service from "../services/performanceAnalysisServices";

import { showSuccessAlert, showErrorAlert } from "./AlertActions";
/**
 * get Performance Analysis Daily
 */
export const getAllDataforPerformance = (data) => {
    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })

        service.getAllDataforPerformance(data).then(response => {
            if (response.data) {
                dispatch({
                    type: GET_PERFORMANCE_DAILY,
                    performanceDaily: response.data && response.data.length > 0 ? response.data[0] : {}
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
 * get Performance Analysis Daily
 */
export const getAllDataforPerformance2 = (data) => {
    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })

        service.getAllDataforPerformance2(data).then(response => {
            if (response.data) {

                dispatch({
                    type: GET_PERFORMANCE_MONTHLY,
                    performanceMonthly: response.data && response.data.length > 0 ? response.data[0] : {}
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
