import {
    SHOW_SPINNER,
    HIDE_SPINNER,
    CLEAR_WATER_CONSUMPTION,
    GET_WATER_CONSUMPTION,
    SEARCH_WATER_CONSUMPTION,
    GET_ADD_PLANT_TYPE,
} from './types'
import service from "../services/WaterConsumptionServices";
import { showSuccessAlert, showErrorAlert } from "./AlertActions";


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
 * get grid details
 */
export function getModuleCleaningDataByDate(_data) {
    return (dispatch, getState) => {        
        dispatch({ type: SHOW_SPINNER })
        dispatch({
            type: SEARCH_WATER_CONSUMPTION,
            waterConsumptionData: _data
        })
        service.getModuleCleaningDataByDate(_data).then(response => {
            if (response.data) {
                        dispatch({
                            type: GET_WATER_CONSUMPTION,
                            waterConsumption: response.data,                        
                        });               
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
 * Clear article
 */

export const clearWaterConsumptionData = () => {
    return (dispatch, getState) => {
        dispatch({
            type: CLEAR_WATER_CONSUMPTION,
        })
    }
}
