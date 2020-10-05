import {
    SEARCH_EXTERNAL_BUDJET,
    GET_EXTERNAL_BUDJET,
    SHOW_SPINNER,
    HIDE_SPINNER,
    SHOW_ALERT,
    CLEAR_EXTERNAL_BUDJET,
    GET_ADD_PLANT_TYPE,
    POST_EXTERNAL_BUDGET,
    DELETE_EXTERNAL_BUDGET
} from './types';
import service from "../services/externalBudgetServices";

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
                SHOW_ALERT(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            SHOW_ALERT(dispatch, 'failed operation' + error.toString())
        })
    }
}

export const clearExternalBudgetData = () => {
    return (dispatch, getState) => {
        dispatch({
            type: CLEAR_EXTERNAL_BUDJET,            
        })
    }
}
// export const getAllexternalBudget =() => {

//     return (dispatch) => {
//         // service.getAllTaskStatistics().then(response => {
//         //     dispatch({
//         //         type: GET_ALL_TASK_STATISTICS,
//         //         payload: response.data
//         //     })
//         // },
//         // )

//         dispatch({
//             type: GET_ALL_EXTERNAL_BUDGET,
//             data:  [
//                     {
//                         "_id": "1",
//                         "plant_name": "Punjab 1",
//                         "month": "19",
//                         "year": "0",
//                         "budget_generation": "180"                       
//                     }
//                 ]
            
//         })
//     }
// }

/**
 * Post article
 */
export function getExternalBudgetByYear(_data) {
    return (dispatch, getState) => {        
        dispatch({ type: SHOW_SPINNER })
        dispatch({
            type: SEARCH_EXTERNAL_BUDJET,
            externalBudgetData: _data
        })
        service.getExternalBudgetByYear(_data).then(response => {
            if (response.data) {
                        dispatch({
                            type: GET_EXTERNAL_BUDJET,
                            externalBudget: response.data,                        
                        });               
            } else {
                dispatch({ type: HIDE_SPINNER })
                SHOW_ALERT(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
           SHOW_ALERT(dispatch, 'failed operation' + error.toString())
        })
    }
}

/**
 * Post article
 */
export const createOrUpdateExternalBudget = (data, type) => {
    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })

        service.createOrUpdateExternalBudget(data.externalBudget).then(response => {
            if (response.data) {
                dispatch({
                    type: POST_EXTERNAL_BUDGET,
                    displayMessage: data.type === "External Budget Details"? "External Budget Details has been updated successfully." : ""
                })
            } else {
                dispatch({ type: HIDE_SPINNER })
                SHOW_ALERT(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            SHOW_ALERT(dispatch, 'failed operation' + error.toString())
        })
    }
}

/**
 * delete article
 */
export const deleteExternalBudget = (id) => {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_SPINNER })
        service.deleteExternalBudget(id).then(response => {
            if (response.data) {
                console.log(response);
                let resObj = { status: response.data, id: id };
                 const  {ExternalBudgetReducer}= getState();
                console.log("rducerValue", ExternalBudgetReducer);
              dispatch(getExternalBudgetByYear(ExternalBudgetReducer.externalBudgetData));
              dispatch({
                type: DELETE_EXTERNAL_BUDGET,
                displayMessage: "External Budget has been deleted successfully.",
            })
            } else {
                dispatch({ type: HIDE_SPINNER })
                SHOW_ALERT(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            SHOW_ALERT(dispatch, 'failed operation' + error.toString())
        })
    }
}
