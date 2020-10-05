import {
    POST_PLANT_TILT,
    SHOW_SPINNER,
    HIDE_SPINNER,
    GET_ALL_PLANTS_BY_PLANTID,
    DELETE_PLANT_TILT,
    GET_ALL_TILTS_BY_PLANTID_DATE
    
} from './types'
import service from "../services/plantTiltService";

import {showSuccessAlert, showErrorAlert} from "./AlertActions";

/**
 * get article
 */
export const getPlantTiltByPlantId = (plant_id,plant_name,plant_type) => {
    return (dispatch) => {
        dispatch({type: SHOW_SPINNER})

        service.getPlantTiltByPlantId(plant_id,plant_name,plant_type).then(response => {
            if (response.data) {

                dispatch({
                    type: GET_ALL_PLANTS_BY_PLANTID,
                    plantTiltsByPlantID: response.data,
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
 * get article
 */
export const getTiltScheduleByDatePlantIds = (plantTiltData) => {
    return (dispatch) => {
        dispatch({type: SHOW_SPINNER})

        service.getTiltScheduleByDatePlantIds(plantTiltData).then(response => {
            if (response.data) {

                dispatch({
                    type: GET_ALL_TILTS_BY_PLANTID_DATE,
                    plantTiltsByPlantIDDate: response.data
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
 * post article
 */
export const createOrUpdatePlantTilt = (plant_tilt) => {
    return (dispatch) => {
        dispatch({type: SHOW_SPINNER})

        service.createOrUpdatePlantTilt(plant_tilt).then(response => {
            if (response.data) {

                dispatch({
                    type: POST_PLANT_TILT
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
 * delete article
 */
export const deletePlantTilt = (id) => {
    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })
        
        service.deletePlantTilt(id).then(response => {
            if (response.data) {
                console.log(response);
                let resObj = {status:response.data, id:id};
                dispatch({
                    type: DELETE_PLANT_TILT,
                    response: resObj,
                    id : id
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