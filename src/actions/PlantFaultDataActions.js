import {
    GET_ALL_PLANTS,
    SHOW_SPINNER,
    HIDE_SPINNER,
    POST_PLANT,
    GET_PROJECT_TYPE,
    GET_PLANT_TYPE,
    GET_PLANT_FAULT,
    SEARCH_PLANT_FAULT_DATA,
    POST_PLANTFAULT,
    GET_ADD_PLANT_TYPE,
    DELETE_PLANT_FAULT,
    CLEAR_PLANT_FAULT,
    GET_PLANT_AVALIABILITY,
    GET_INCIDENT_DATA,
    POST_PLANTFAULT_INCIDENT,
    GET_PLANTFAULT_GEN,
    GET_INCIDENT_DATA_BY_YEAR
} from './types'
import service from "../services/plantFaultDataService";
import service1 from "../services/plantGenerationServices";

import { showSuccessAlert, showErrorAlert } from "./AlertActions";
import plantFaultData from '../services/plantFaultDataService';

/**
 * get Projects
 */
export function getProjectsByPlantType(plantType) {
    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })

        service.getProjectsByPlantType(plantType).then(response => {
            if (response.data) {
                console.log(response.data);
                dispatch({
                    type: GET_PROJECT_TYPE,
                    plantType: plantType,
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
export function getProjectNames(plantType) {
    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })

        service.getProjectNames(plantType).then(response => {
            if (response.data) {
                console.log(response.data);
                dispatch({
                    type: GET_PROJECT_TYPE,
                    plantType: plantType,
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
                    projectId: projectId,
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


function splitYear(years) {
    const _years = years.split("-");
    return { fromDate: _years[0] + "-01-01", toDate: _years[1] + "-12-31" };
}


/**
 * get Projects
 */ 
export function getPlantFaultDataByPlantId(_data) {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_SPINNER })
        dispatch({
            type: SEARCH_PLANT_FAULT_DATA,
            plantFaultData: _data
        })

        service.getPlantFaultDataByPlantId(_data).then(response => {
            if (response.data) {
                const selectedYear = { plantIds: _data.plantIds, fromDate: splitYear(_data.year).fromDate, toDate: splitYear(_data.year).toDate, dataFlag: 1 }
                service1.getDailyPlantActualGeneration(selectedYear).then(res => {
                    dispatch({
                        type: GET_PLANT_FAULT,
                        plantFault: response.data,
                        plantFaultGen: res.data,
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
 * Post article
 */
export const createOrUpdatePlantFaultData = (plantFault, type) => {
    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })

        service.createOrUpdatePlantFaultData(plantFault).then(response => {
            if (response.data) {
                dispatch({
                    type: POST_PLANTFAULT,
                    displayMessage: type === "Add Fault" ? "Fault has been added successfully." : "Fault has been updated successfully."
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
export const createOrUpdatePlantFaultIncidentData = (plantFaultIncident, type) => {
    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })

        service.createOrUpdatePlantFaultIncidentData(plantFaultIncident).then(response => {
            if (response.data) {
                dispatch({
                    type: POST_PLANTFAULT_INCIDENT,
                    displayMessage: type === "Add Incident" ? "Incident has been added successfully." : "Incident has been updated successfully."
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

export const clearPlantFaultData = () => {
    return (dispatch, getState) => {
        dispatch({
            type: CLEAR_PLANT_FAULT,
        })
    }
}


/**
 * delete article
 */
export const deletePlantFaultData = (id) => {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_SPINNER })
        service.deletePlantFaultData(id).then(response => {
            if (response.data) {
                console.log(response);
                let resObj = { status: response.data, id: id };
                dispatch({
                    type: DELETE_PLANT_FAULT,
                    displayMessage: "Fault has been deleted successfully.",
                })
                const { projectTypes } = getState();
                // console.log("rducerValue", projectTypes);
                dispatch(getPlantFaultDataByPlantId(projectTypes.plantFaultData));

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


export function getPlantFaultIncidentData(faultID, plantID) {
    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })

        service.getPlantFaultIncidentData(faultID).then(response => {
            if (response.data) {
                const _input = {
                    "faultId": faultID,
                    "plantId": plantID
                }
                // _input.push(faultID: faultID);
                // _input.push(plantId: plantID);
                   
                service.getIncidentDataByPlantIdAndFaultId( _input).then(res => {
                    dispatch({
                        type: GET_INCIDENT_DATA,
                        data: response.data,
                        data1: res.data
                    })

                    // dispatch({
                    //     type: GET_INCIDENT_DATA_BY_YEAR,                   
                    //     data: res.data
                    // })

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