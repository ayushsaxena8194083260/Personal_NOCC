import {
    SHOW_SPINNER,
    HIDE_SPINNER,
    GET_PROJECT_TYPE,
    GET_PLANT_TYPE,
    GET_GRID_FAILURE,
    POST_GRID_FAILURE,
    GET_ADD_PLANT_TYPE,
    DELETE_GRID_FAILURE,
    CLEAR_GRID_FAILURE,
    SEARCH_GRID_FAILURE_DATA,
} from './types'
import service from "../services/gridFailureService";
import { showSuccessAlert, showErrorAlert } from "./AlertActions";
import service1 from "../services/plantGenerationServices";
import service2 from "../services/azureLossService";


/**
 * get Projects
 */
export function getProjectNames(plantType) {
    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })

        service.getProjectNames(plantType).then(response => {
            if (response.data) {
                console.log(response.data);
                dispatch({
                    type: GET_PROJECT_TYPE,
                    plantType:plantType,
                    projectTypes: response.data
                })
                dispatch(getPlantByType(plantType))
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
export function getPlantByProjectId(projectId) {
    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })

        service.getPlantByProjectId(projectId).then(response => {
            if (response.data) {
                console.log(response.data);
                dispatch({
                    type: GET_PLANT_TYPE,
                    projectId:projectId,
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

function splitYear(years){
    const _years = years.split("-");
    return {fromDate: _years[0]+"-04-01", toDate: _years[1]+"-03-31"};
}
/**
 * get Projects
 */
export function getGridFailureDataByPlantId(_data) {
    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })
        dispatch({
            type: SEARCH_GRID_FAILURE_DATA, 
            gridFailureData: _data
        })

        service.getGridFailureDataByPlantId(_data).then(response => { 
            // console.log(response,'line 88')
            if (response.data) {
                const selectedYear = {plantIds: _data.plantIds, fromDate: splitYear(_data.year).fromDate, toDate: splitYear(_data.year).toDate, dataFlag: 1}
                service1.getDailyPlantActualGeneration(selectedYear).then(res => {
                    if(res.data){
                        console.log(res.data,'line 93')
                        service2.getAzureLossByPlantId({plantIds: _data.plantIds, year: _data.year}).then(res1 => {
                            console.log(res1,'res1')
                            dispatch({
                                type: GET_GRID_FAILURE,
                                gridFailure: response.data,
                                plantFaultGen: res.data,
                                plantAzureLoss: res1.data                     
                            })
                        })
                    }
                else {
                    dispatch({ type: HIDE_SPINNER })
                    showErrorAlert(dispatch, 'failed operation')
                }
                    
                    
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
 * Post article
 */
export const createOrUpdateGridFailureData = (data) => {
    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })

        service.createOrUpdateGridFailureData(data.gridFailure).then(response => {
            if (response.data) {
                dispatch({
                    type: POST_GRID_FAILURE,
                    displayMessage: data.type === "Add Grid Failure"? "Grid Failure has been added successfully." : "Grid Failure has been updated successfully."
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

export const clearGridFailureData = () => {
    return (dispatch, getState) => {
        dispatch({
            type: CLEAR_GRID_FAILURE,            
        })
    }
}
/**
 * delete article
 */
export const deleteGridFailureData = (id) => {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_SPINNER })
        service.deleteGridFailureData(id).then(response => {
            if (response.data) {
                console.log(response);
                let resObj = { status: response.data, id: id };
                dispatch({
                    type: DELETE_GRID_FAILURE,
                    displayMessage: "Grid Failure has been deleted successfully.",
                })
                 const  {gridFailureReducer}= getState();
                console.log("rducerValue", gridFailureReducer);
              dispatch(getGridFailureDataByPlantId(gridFailureReducer.gridFailureData));

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
