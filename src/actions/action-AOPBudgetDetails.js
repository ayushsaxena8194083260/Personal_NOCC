import {
    GET_ALL_AOP_BUDGET_DETAILS,
    POST_AOP_BUDGET_DETAILS,
    SHOW_SPINNER,
    HIDE_SPINNER,
    GET_ALL_BUDGET_DETAILS
    
} from './types'
import service from "../services/AOPBudgetDetailsServices";
import service1 from "../services/plantService";
import {showSuccessAlert, showErrorAlert} from "./AlertActions";

/**
 * get article
 */
export const getAOPBudgetDataByYearPlantIds = (plantIdsYear) => { 
    return (dispatch) => {
        dispatch({type: SHOW_SPINNER})

        service.getLenderDataByYearPlantIds(plantIdsYear).then(response => {
            if (response.data) {
                service1.getAllPlants().then(res => {
                    dispatch({
                        type: GET_ALL_AOP_BUDGET_DETAILS,
                        AOPBudgetDetails: response.data,
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
export const getBudgetDataByYearPlantIds = (plantIdsYear) => { 
    return (dispatch) => {
        dispatch({type: SHOW_SPINNER})

        service.getLenderDataByYearPlantIds(plantIdsYear).then(response => {
            if (response.data) {
                service1.getAllPlants().then(res => {
                    dispatch({
                        type: GET_ALL_BUDGET_DETAILS,
                        budgetDetails: response.data,
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

// /**
//  * get article
//  */
// export const getAllAOPBudgetDetailsData = () => {
//     return (dispatch) => {
//         dispatch({type: SHOW_SPINNER})

//         service.getAllAOPBudgetDetailsData().then(response => {
//             if (response.data) {

//                 dispatch({
//                     type: GET_ALL_AOP_BUDGET_DETAILS,
//                     AOPBudgetDetails: response.data
//                 })

//             } else {
//                 dispatch({type: HIDE_SPINNER})
//                 showErrorAlert(dispatch, 'failed operation')
//             }
//         }, error => {
//             dispatch({type: HIDE_SPINNER})
//             showErrorAlert(dispatch, 'failed operation' + error.toString())
//         })
//     }
// }

/**
 * post article
 */
export const createOrUpdateAOPBudgetDetailData = (aopBudgetDetail) => {
    return (dispatch) => {
        dispatch({type: SHOW_SPINNER})

        service.createOrUpdateAOPBudgetDetailData(aopBudgetDetail).then(response => {
            if (response.data) {

                dispatch({
                    type: POST_AOP_BUDGET_DETAILS
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