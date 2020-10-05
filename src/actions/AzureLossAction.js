import {
    SHOW_SPINNER,
    HIDE_SPINNER,
    GET_PROJECT_TYPE,
    GET_PLANT_TYPE,
    GET_ADD_PLANT_TYPE,
    GET_AZURELOSS,
    POST_AZURELOSS,
    SEARCH_AZURELOSS,
    DELETE_AZURELOSS,
    CLEAR_AZURELOSS
} from './types'
import service from "../services/azureLossService";

import { showSuccessAlert, showErrorAlert } from "./AlertActions";
import azureLoss from '../services/azureLossService';

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

/**
 * get Projects
 */
export function getAzureLossByPlantId(_data) {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_SPINNER })
        dispatch({
            type: SEARCH_AZURELOSS,
            azureLoss: _data
        })
        const plantId = [..._data.plantIds];
        _data["plantIds"] = plantId;
        service.getAzureLossByPlantId(_data).then(response => {
            if (response.data) {
                dispatch({
                    type: GET_AZURELOSS,
                    plantLoss: response.data,
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
export const createOrUpdateAzureLoss = (data) => {
    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })
        let date = new Date(); 
        let dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000 ));
        data.azureLoss["date"] = dateString;
        data.azureLoss["plantName"] = "";
        service.createOrUpdateAzureLoss(data.azureLoss).then(response => {
            if (response.data) {
                dispatch({
                    type: POST_AZURELOSS,
                    displayMessage: data.type === "Add Azure Loss" ? "Azure Loss has been added successfully." : "Azure Loss has been updated successfully."
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

export const clearAzureLoss = () => {
    return (dispatch, getState) => {
        dispatch({
            type: CLEAR_AZURELOSS,
        })
    }
}


/**
 * delete article
 */
export const deleteAzureLoss = (id) => {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_SPINNER })
        service.deleteAzureLoss(id).then(response => {
            if (response.data) {
                console.log(response);
                let resObj = { status: response.data, id: id };
                dispatch({
                    type: DELETE_AZURELOSS,
                    displayMessage: "Azure Loss has been deleted successfully.",
                })
                const { azureLossReducer } = getState();
                // console.log("rducerValue", projectTypes);
                dispatch(getAzureLossByPlantId(azureLossReducer.azureLoss));

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

function addDays(date) {
    var date = new Date(date);
    date.setDate(date.getDate() + 1);
    return getDate(date);
}

function getDate(cDate) {
    const today = new Date(cDate);
    let dd = today.getDate();
    let mm = today.getMonth() + 1;

    const yyyy = today.getFullYear();
    if (dd < 10) {
        dd = "0" + dd;
    }
    if (mm < 10) {
        mm = "0" + mm;
    }
    return yyyy + "-" + mm + "-" + dd;
}
