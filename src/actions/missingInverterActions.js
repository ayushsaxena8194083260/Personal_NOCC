import {
    SHOW_SPINNER,
    HIDE_SPINNER,
    POST_MISSINGINVERTER_DAILY,
    CLEAR_MISSINGINVERTER_DAILY,
    GET_INVERTER_NAME,
    SEARCH_MISSINGINVERTER_DAILY,
    GET_MISSINGINVERTER_DAILY,
    GET_INVERTER_DETAILS
} from './types'
import service from "../services/missingInverterServices";
import { showSuccessAlert, showErrorAlert } from "./AlertActions";

/**
 * get Projects
 */
export function getInverterDailyDetails(_data) {
    return (dispatch, getState) => {        
        dispatch({ type: SHOW_SPINNER })
        dispatch({
            type: SEARCH_MISSINGINVERTER_DAILY,
            MissingInverterDailyData: _data
        })
        service.getInverterDailyDetails(_data).then(response => {
            if (response.data) {
                    service.getInverterByPlantId(_data.plantId).then(res => {
                        service.getMissingInverterDetails(_data).then(resp => {
                            dispatch({type:GET_INVERTER_NAME, inverterName:res.data});
                            dispatch({
                                type: GET_MISSINGINVERTER_DAILY,
                                missingInverter: response.data,
                                inverterMissing: resp.data                        
                            })
                        })
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
 * get Inverter Name
 */
export function getInverterByPlantId(plantId) {
    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })

        service.getInverterByPlantId(plantId).then(response => {
            if (response.data) {
                dispatch({
                    type: GET_INVERTER_NAME,
                    inverterName: response.data
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
 * get missing Inverter details
 */
export function getInverterDailyDetails1(data) {
    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })

        service.getInverterDailyDetails1(data).then(response => {
            if (response.data) {
                dispatch({
                    type: GET_INVERTER_DETAILS,
                    missingInverterDetails: response.data
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
// /**
//  * get Projects
//  */
// export function getinverterDailyDetails(_data) {
//     return (dispatch, getState) => {        
//         dispatch({ type: SHOW_SPINNER })
//         dispatch({
//             type: SEARCH_INVERTER_DAILY,
//             inverterDailyData: _data
//         })
//         service.getinverterDailyDetails(_data).then(response => {
//             if (response.data) {
//                     dispatch({
//                         type: GET_INVERTER_DAILY,
//                         inverterDaily: response.data,                        
//                     })
//             } else {
//                 dispatch({ type: HIDE_SPINNER })
//                 showErrorAlert(dispatch, 'failed operation')
//             }
//         }, error => {
//             dispatch({ type: HIDE_SPINNER })
//             showErrorAlert(dispatch, 'failed operation' + error.toString())
//         })
//     }
// }


/**
 * Post article
 */
export const createOrUpdateInverterDailyData = (data) => {
    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })

        service.createOrUpdateInverterDailyData(data.inverterDaily).then(response => {
            if (response.data) {
                dispatch({
                    type: POST_MISSINGINVERTER_DAILY,
                    displayMessage: data.type === "Add Inverter Daily"? "Inverter Daily has been added successfully." : "Inverter Daily has been updated successfully."
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

export const clearMissingInverterData = () => {
    return (dispatch, getState) => {
        dispatch({
            type: CLEAR_MISSINGINVERTER_DAILY,
        })
    }
}
