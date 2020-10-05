import {
    SHOW_SPINNER,
    HIDE_SPINNER,
    POST_LENDERDETAILS,
    GET_ALL_LENDER_DETAILS,
    GET_ALL_LENDER_DETAILS_BY_YEARPLANTIDS,
    DELETE_LENDERDETAILS,
    GET_ALL_LENDER_DETAILS_BY_YEARMONTHPLANTID
} from './types'
import service from "../services/lenderDetailsService";
import service1 from "../services/plantService";
import { showSuccessAlert, showErrorAlert } from "./AlertActions";
import lenderDetails from '../services/lenderDetailsService';


/**
 * Post article
 */
export const createOrUpdateLenderDetails = (lenderDetails, type) => {
    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })

        service.createOrUpdateLenderDetails(lenderDetails).then(response => {
            if (response.data) {
                dispatch({
                    type: POST_LENDERDETAILS
                    //displayMessage: type === "Add Lender" ? "Lender has been added successfully." : "Lender has been updated successfully."
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
export const getAllLenderDetailsData = () => {
    return (dispatch) => {
        dispatch({type: SHOW_SPINNER})

        service.getAllLenderDetailsData().then(response => {
            if (response.data) {

                dispatch({
                    type: GET_ALL_LENDER_DETAILS,
                    allLenderDetails: response.data
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
export const deleteLenderDetailData = (id) => {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_SPINNER })
        service.deleteLenderDetailData(id).then(response => {
            if (response.data) {
                console.log(response);
                let resObj = { status: response.data, id: id };
                dispatch({
                    type: DELETE_LENDERDETAILS,
                    lenderDetailId : id
                })
                const { projectTypes } = getState();
                // console.log("rducerValue", projectTypes);
                //dispatch(getLenderDetailsByPlantId(projectTypes.lenderDetails));

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
export const getLenderDataByYearPlantIds = (plantIdsYear) => {
    return (dispatch) => {
        dispatch({type: SHOW_SPINNER})

        service.getLenderDataByYearPlantIds(plantIdsYear).then(response => {
            if (response.data) {
                service1.getAllPlants().then(res => {
                    dispatch({
                        type: GET_ALL_LENDER_DETAILS_BY_YEARPLANTIDS,
                        allLenderDetailsByYearPlantIds: response.data,
                        plants:res.data,
                        inputData:plantIdsYear
                    })
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
export const getLenderDataByPlantIdMonthYear = (plantIdMonthYear) => {
    return (dispatch) => {
        dispatch({type: SHOW_SPINNER})

        service.getLenderDataByPlantIdMonthYear(plantIdMonthYear).then(response => {
            if (response.data) {

                dispatch({
                    type: GET_ALL_LENDER_DETAILS_BY_YEARMONTHPLANTID,
                    lenderDetailsByYearPlantIdMonth: response.data
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