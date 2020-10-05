import {
    GET_PM_TASKS_BY_ACTIVITY_ID,
    SEARCH_PMUSERSTATUS_BY_ACTID_DATE_PLANTID,
    GET_PMUSERSTATUS_BY_ACTID_DATE_PLANTID,
    GET_PM_REMARK_STATUS_BY_USER_STATUS_ID,
    GET_PM_TASK_GROUP_BY_PM_ACTIVITY_ID,
    SHOW_SPINNER,
    HIDE_SPINNER
} from './types'
import service from "../services/PMService";

import {showSuccessAlert, showErrorAlert} from "./AlertActions";
/**
 * get article
 */
export const getPmTaskByPmActivityId = (activityId) => {
    return (dispatch) => {
        dispatch({type: SHOW_SPINNER})

        service.getPmTaskByPmActivityId(activityId).then(response => {
            if (response.data) {

                dispatch({
                    type: GET_PM_TASKS_BY_ACTIVITY_ID,
                    pmTasksByActivityId: response.data
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
 * get Projects
 */
export function getPMUserStatusDetailsByActivityDatePlantId(_data) {
    return (dispatch, getState) => {        
        dispatch({ type: SHOW_SPINNER })
        dispatch({
            type: SEARCH_PMUSERSTATUS_BY_ACTID_DATE_PLANTID,
            pmUserStatusData: _data
        })

        service.getPMUserStatusDetailsByActivityDatePlantId(_data).then(response => {
            if (response.data) {
                dispatch({
                    type: GET_PMUSERSTATUS_BY_ACTID_DATE_PLANTID,
                    pmUserStatus: response.data,                        
                })
                // service1.getPlantAvailabilityByPlantAvailabilityId("1").then(res => {
                //     dispatch({type:GET_PLANT_AVALIABILITY, data:res.data});
                //     dispatch({
                //         type: GET_PLANT_FAULT,
                //         plantFault: response.data,                        
                //     })

                    
                // })

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
export const getPMRemarkStatusByPMUserStatusId = (pmUserStatusId) => {
    return (dispatch) => {
        dispatch({type: SHOW_SPINNER})

        service.getPMRemarkStatusByPMUserStatusId(pmUserStatusId).then(response => {
            if (response.data) {

                dispatch({
                    type: GET_PM_REMARK_STATUS_BY_USER_STATUS_ID,
                    pmRemarkStatus: response.data
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
export const getPMTaskGroupByPmActivityId = (pmTaskActivityId) => {
    return (dispatch) => {
        dispatch({type: SHOW_SPINNER})

        service.getPMTaskGroupByPmActivityId(pmTaskActivityId).then(response => {
            if (response.data) {

                dispatch({
                    type: GET_PM_TASK_GROUP_BY_PM_ACTIVITY_ID,
                    pmTaskGroup: response.data
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