import {
    POST_PLANT_TILT_SCHEDULE,
    GET_ALL_PLANT_TILT_SCHEDULE,
    DELETE_PLANT_TILT_SCHEDULE,
    GET_TILT_SCHEDULE_DATE_PLANTID,
    SHOW_SPINNER,
    HIDE_SPINNER,
    
} from './types'
import service from "../services/plantTiltScheduleService";

import {showSuccessAlert, showErrorAlert} from "./AlertActions";


/**
 * post article
 */
export const createOrUpdatePlantTiltSchdeule = (plant_tilt_schedule) => {
    return (dispatch) => {
        dispatch({type: SHOW_SPINNER})

        service.createOrUpdatePlantTiltSchdeule(plant_tilt_schedule).then(response => {
            if (response.data) {

                dispatch({
                    type: POST_PLANT_TILT_SCHEDULE
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
export const getAllPlantTiltSchedule = (plant_type,plant_name,plant_id) => {
    return (dispatch) => {
        dispatch({type: SHOW_SPINNER})

        service.getAllPlantTiltSchedule(plant_type,plant_name,plant_id).then(response => {
            if (response.data) {

                dispatch({
                    type: GET_ALL_PLANT_TILT_SCHEDULE,
                    allTiltSchedule: response.data,
                    plant_type: plant_type,
                    plant_name : plant_name,
                    plant_id : plant_id
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
export const deletePlantTiltSchdeule = (id) => {
    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })
        
        service.deletePlantTiltSchdeule(id).then(response => {
            if (response.data) {
                console.log(response);
                let resObj = {status:response.data, id:id};
                dispatch({
                    type: DELETE_PLANT_TILT_SCHEDULE,
                    response: resObj,
                    id:id
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
 * get article
 */
export const getTiltScheduleDataByDatePlantId = (tiltScheduleData) => {
    return (dispatch) => {
        dispatch({type: SHOW_SPINNER})

        service.getTiltScheduleDataByDatePlantId(tiltScheduleData).then(response => {
            if (response.data) {

                dispatch({
                    type: GET_TILT_SCHEDULE_DATE_PLANTID,
                    allTiltScheduleByDatePlantId: response.data
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