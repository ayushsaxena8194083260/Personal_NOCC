import {
    GET_STRINGS_BY_SMU_ID,
    POST_STRING_NAME,
    DELETE_STRING,
    SHOW_SPINNER,
    HIDE_SPINNER
    
} from './types'
import service from "../services/StringsServices";

import {showSuccessAlert, showErrorAlert} from "./AlertActions";

/**
 * get article
 */
export const getStringsBySMUId = (smu_id) => {
    return (dispatch) => {
        dispatch({type: SHOW_SPINNER})

        service.getStringsBySMUId(smu_id).then(response => {
            if (response.data) {

                dispatch({
                    type: GET_STRINGS_BY_SMU_ID,
                    allStringsBySMUId: response.data
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
export const createOrUpdateString = (stringDO) => {
    return (dispatch) => {
        dispatch({type: SHOW_SPINNER})

        service.createOrUpdateString(stringDO).then(response => {
            if (response.data) {

                dispatch({
                    type: POST_STRING_NAME
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
export const deleteString = (id) => {
    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })
        
        service.deleteString(id).then(response => {
            if (response.data) {
                console.log(response);
                let resObj = {status:response.data, id:id};
                dispatch({
                    type: DELETE_STRING,
                    response: resObj,
                    stringId:id
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
