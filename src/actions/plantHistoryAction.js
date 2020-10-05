import {
    SHOW_SPINNER,
    HIDE_SPINNER,
    GET_PLANT_HISTORY_BY_ID
} from './types'
import service from "../services/plantHistoryService";

import {showSuccessAlert, showErrorAlert} from "./AlertActions";

/**
 * get article by plant type
 */
export const getPlantHistoryByPlantId = (id) => {
    return (dispatch) => {
        dispatch({type: SHOW_SPINNER})

        service.getPlantHistoryByPlantId(id).then(response => {
            if (response.data) {

                dispatch({
                    type: GET_PLANT_HISTORY_BY_ID,
                    plantHistByID: response.data,
                    plantHistoryDetailsHdr: null,
                    plantHistoryDetails : null
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