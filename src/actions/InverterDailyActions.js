import {
    SHOW_SPINNER,
    HIDE_SPINNER,
    POST_INVERTER_DAILY,
    CLEAR_INVERTER_DAILY,
    GET_INVERTER_NAME,
    SEARCH_INVERTER_DAILY,
    GET_INVERTER_DAILY,
    GET_ADD_PLANT_TYPE,
    DELETE_INVERTER_DAILY,
    GET_ALL_INVERTERS
} from './types'
import service from "../services/inverterDailyServices";
import { showSuccessAlert, showErrorAlert } from "./AlertActions";

/**
 * get Projects
 */
export function getinverterDailyDetailsWithPlantIdsAndDate(_data) {
    return (dispatch, getState) => {        
        dispatch({ type: SHOW_SPINNER })
        dispatch({
            type: SEARCH_INVERTER_DAILY,
            inverterDailyData: _data
        })
        service.getinverterDailyDetailsWithPlantIdsAndDate(_data).then(response => {
            if (response.data) {
                    service.getInvertersByPlantId({plantIds: _data.plantIds}).then(res => {
                        dispatch({type:GET_INVERTER_NAME, inverterName:res.data});
                        dispatch({
                            type: GET_INVERTER_DAILY,
                            inverterDaily: response.data,
                            inverterName: res.data,                        
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

export const deleteInverterDailyData = (id) => {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_SPINNER })
        service.deleteInverterDailyData(id).then(response => {
            if (response.data) {
                console.log(response);
                let resObj = { status: response.data, id: id };
                dispatch({
                    type: DELETE_INVERTER_DAILY,
                    displayMessage: "Inverter Daily Data has been deleted successfully.",
                })
                const  {inverterDailyReducer}= getState();
                console.log("rducerValue", inverterDailyReducer);
              dispatch(getinverterDailyDetailsWithPlantIdsAndDate(inverterDailyReducer.inverterDailyData));
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
 * get Projects
 */
export function getAllInverters() {
    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })

        service.getAllInverters().then(response => {
            if (response.data) {
                dispatch({
                    type: GET_ALL_INVERTERS,
                    allInverters: response.data
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

export function getInvertersByPlantId(plantId) {
    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })
        service.getInvertersByPlantId(plantId).then(response => {
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
 * get Projects
 */
export function getinverterDailyDetails(_data) {
    return (dispatch, getState) => {        
        dispatch({ type: SHOW_SPINNER })
        dispatch({
            type: SEARCH_INVERTER_DAILY,
            inverterDailyData: _data
        })
        service.getinverterDailyDetails(_data).then(response => {
            if (response.data) {
                    dispatch({
                        type: GET_INVERTER_DAILY,
                        inverterDaily: response.data,                        
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
// export function getInverterDailyDataByPlantId(plantId) {
//     return (dispatch) => {
//         dispatch({ type: SHOW_SPINNER })

//         service.getInverterDailyDataByPlantId(plantId).then(response => {
//             if (response.data) {
//                 console.log(response.data);
//                 dispatch({
//                     type: GET_INVERTERDAILY_NAME,
//                     inverterDaily: response.data
//                 })

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
                    type: POST_INVERTER_DAILY,
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


export const clearInverterDailyData = () => {
    return (dispatch, getState) => {
        dispatch({
            type: CLEAR_INVERTER_DAILY,
        })
    }
}
