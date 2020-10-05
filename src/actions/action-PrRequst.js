
import service from "../services/prRequestServices";
import { GET_ALL_PR_REQUEST, HIDE_SPINNER, SHOW_SPINNER, GET_PR_REQUEST_ID, POST_PR_REQUEST } from "./types";
import { showErrorAlert } from "./AlertActions";

export const getAllPrRequest = () => {
    return (dispatch) => {
        dispatch({type: SHOW_SPINNER})
        
        service.getAllPrRequest().then(response =>{
            if(response.data){
                dispatch({
                    type:GET_ALL_PR_REQUEST,
                    AllPrRequest:response.data
                })
            }
            else{
                dispatch({type: HIDE_SPINNER})
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({type: HIDE_SPINNER})
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}
export const getPrRequestId = (_data) => {
    return (dispatch) => {
        dispatch({type: SHOW_SPINNER})
        
        service.getPrRequestByPlantAndDate(_data).then(response =>{
            if(response.data){
                // service.getPrRequestbyId
                dispatch({
                    type:GET_PR_REQUEST_ID,
                    AllPrRequest:response.data
                })
            }
            else{
                dispatch({type: HIDE_SPINNER})
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({type: HIDE_SPINNER})
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}
export const createUpdatePrRequest =(data) => {
    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })

        service.createUpdatePrRequest(data.prData).then(response=>{
            if (response.data) {
                dispatch({
                    type: POST_PR_REQUEST,
                    
                })
            }
            else {
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
        } 
}