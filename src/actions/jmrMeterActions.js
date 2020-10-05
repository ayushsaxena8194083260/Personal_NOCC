import{
    GET_ALL_PLANTJMR,
    GET_PLANTJMR_BYID,
    GET_PLANT_BYJMRID,
    GET_JMR_METER,
    SEARCH_JMR_METER_DATA,
    DELETE_PLANTJMR,
    POST_PLANTJMR,
    SHOW_SPINNER,
    HIDE_SPINNER,
    GET_ADD_PLANT_TYPE,
    CLEAR_JMRMETER,
    SHOW_ALERT
}from './types';
import service from '../services/jmrMeterService';
import { showSuccessAlert, showErrorAlert } from "./AlertActions";

/**
 * get article
 */
export const getAllPlantJMR = () => {
    return(dispatch) => {
        dispatch({ type: SHOW_SPINNER })

        service.getAllPlantJMR().then(response => {
            if(response.data) {
                dispatch({
                    type: GET_ALL_PLANTJMR,
                    plantJMRs: response.data
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

export const getPlantJMRById = (id) => {
    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })

        service.getPlantJMRById(id).then(response => {
            if (response.data) {
                dispatch({
                    type: GET_PLANTJMR_BYID,
                    plantJMR: response.data
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

export const getPlantByJMRId = (jmrId) => {
    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })

        service.getPlantByJMRId(jmrId).then(response => {
            if (response.data) {
                dispatch({
                    type: GET_PLANT_BYJMRID,
                    plantJMRid: response.data
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
 * get Projects
 */
export function getPlantJMRByPlantIdDate(_data) {
    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })
        dispatch({
            type: SEARCH_JMR_METER_DATA,
            jmrMeterData: _data
        })

        service.getPlantJMRByPlantIdDate(_data).then(response => {
            if (response.data) {
                console.log(response.data);
                dispatch({
                    type: GET_JMR_METER,
                    jmrMeter: response.data
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
 * get Projects
 */
export function getPlantByType(plantType) {
    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })

        service.getPlantByType(plantType).then(response => {
            if (response.data) {
                console.log(response.data);
                dispatch({
                    type: GET_ADD_PLANT_TYPE,
                    plantTypes: response.data
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
export const createOrUpdatePlantJmrData = (plantJMR) => {
    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })

        service.createOrUpdatePlantJmrData(plantJMR).then(response => {
            if(response.data) {
                dispatch({
                    type: POST_PLANTJMR,
                    // displayMessage: type === "Add JMR Meter"? "JMR Meter has been added successfully." : "JMR Meter has been downloaded successfully."
                })
            } else {
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER})
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

/**
 * delete article
 */
export const deletePlantJmr = (id) => {
    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })
        service.deletePlantJmr(id).then(response => {
            if (response.data) {
                console.log(response);
                let resObj = {status:response.data, id:id};
                dispatch({
                    type: DELETE_PLANTJMR,
                    response: resObj,
                })
                window.location.reload();
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

export const clearJmrMeter = () => {
    return (dispatch, getState) => {
        dispatch({
            type: CLEAR_JMRMETER,
        })
    }
}