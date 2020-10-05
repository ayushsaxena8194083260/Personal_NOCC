import {
    SHOW_SPINNER,
    HIDE_SPINNER,
    POST_MODULE_CLEANING_ANALYSIS,
    SEARCH_MODULE_CLEANING_ANALYSIS,
    GET_MODULE_CLEANING_ANALYSIS,
    CLEAR_MODULE_CLEANING_ANALYSIS,
    DELETE_MODULE_CLEANING_ANALYSIS,
    GET_ADD_PLANT_TYPE,
    GET_ALL_PLANTSBY_PLANTID
} from './types'
import service from "../services/moduleCleaningAnalysisService";
import { showSuccessAlert, showErrorAlert } from "./AlertActions";

/**
 * get article
 */
export const getModuleCleaningByPlantId = (plant_id,plant_name,plant_type) => {
    return (dispatch) => {
        dispatch({type: SHOW_SPINNER})

        service.getModuleCleaningByPlantId(plant_id,plant_name,plant_type).then(response => {
            if (response.data) {

                dispatch({
                    type: GET_ALL_PLANTSBY_PLANTID,
                    moduleAnalysisCleaningPlantID: response.data,
                    plant_name: plant_name,
                    plant_type: plant_type
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
 * Post article
 */
export function getModuleCleaningAnalysisDataByDate(_data) {
    return (dispatch, getState) => {        
        dispatch({ type: SHOW_SPINNER })
        dispatch({
            type: SEARCH_MODULE_CLEANING_ANALYSIS,
            moduleCleaningAnalysisData: _data
        })
        service.getModuleCleaningAnalysisDataByDate(_data).then(response => {
            if (response.data) {
                        dispatch({
                            type: GET_MODULE_CLEANING_ANALYSIS,
                            moduleCleaningAnalysis: response.data,                        
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
 * Post article
 */
export const createOrUpdateModuleCleaningAnalysis = (data) => {
    return (dispatch, getState) => {
        dispatch({type: SHOW_SPINNER})

        service.createOrUpdateModuleCleaningAnalysis(data).then(response => {
            if (response.data) {

                dispatch({
                    type: POST_MODULE_CLEANING_ANALYSIS
                })
                const  {mcAnalysisReducer}= getState();
                console.log("rducerValue", mcAnalysisReducer);
              dispatch(getModuleCleaningAnalysisDataByDate(mcAnalysisReducer.moduleCleaningAnalysisData));
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
export const deleteModuleCleaningAnalysis = (id) => {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_SPINNER })
        service.deleteModuleCleaningAnalysis(id).then(response => {
            if (response.data) {
                console.log(response);
                let resObj = { status: response.data, id: id };
                dispatch({
                    type: DELETE_MODULE_CLEANING_ANALYSIS,
                    displayMessage: "Module Cleaning Analysis Data has been deleted successfully.",
                })
            //     const  {moduleCleaningReducer}= getState();
            //     console.log("rducerValue", moduleCleaningReducer);
            //   dispatch(getModuleCleaningAnalysisDataByDate(moduleCleaningReducer.moduleCleaningAnalysisData));

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
export const clearModuleAnalysisData = () => {
    return (dispatch, getState) => {
        dispatch({
            type: CLEAR_MODULE_CLEANING_ANALYSIS,
        })
    }
}

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
