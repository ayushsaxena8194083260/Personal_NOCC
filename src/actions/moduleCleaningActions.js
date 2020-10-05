import {
    SHOW_SPINNER,
    HIDE_SPINNER,
    POST_MODULE_CLEANING,
    CLEAR_MODULE_CLEANING,
    GET_MODULECLEANING_NAME,
    SEARCH_MODULE_CLEANING,
    GET_MODULE_CLEANING,
    GET_ADD_PLANT_TYPE,
    DELETE_MODULE_CLEANING,
    GET_MODULE_CLEANING_DATA
} from './types'
import service from "../services/moduleCleaningServices";
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
            type: SEARCH_MODULE_CLEANING,
            moduleCleaningData: _data
        })
        service.getModuleCleaningDataByDate(_data).then(response => {
            if (response.data) {
                        dispatch({
                            type: GET_MODULE_CLEANING_DATA,
                            moduleCleaning: response.data,                        
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
 * delete article
 */
export const deleteModuleCleaning = (id) => {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_SPINNER })
        service.deleteModuleCleaning(id).then(response => {
            if (response.data) {
                console.log(response);
                let resObj = { status: response.data, id: id };
                dispatch({
                    type: DELETE_MODULE_CLEANING,
                    displayMessage: "Module Cleaning Data has been deleted successfully.",
                })
                const  {moduleCleaningReducer}= getState();
                console.log("rducerValue", moduleCleaningReducer);
              dispatch(getModuleCleaningDataByDate(moduleCleaningReducer.moduleCleaningData));

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
 * Post article
 */
export const createOrUpdateModuleCleaning = (data) => {
    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })

        service.createOrUpdateModuleCleaning(data.moduleCleaning).then(response => {
            if (response.data) {
                dispatch({
                    type: POST_MODULE_CLEANING,
                    displayMessage: data.type === "Add Module Cleaning"? "Module Cleaning has been added successfully." : "Module Cleaning has been updated successfully."
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
 * Clear article
 */

export const clearModuleCleaningData = () => {
    return (dispatch, getState) => {
        dispatch({
            type: CLEAR_MODULE_CLEANING,
        })
    }
}
