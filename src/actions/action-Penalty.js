import {GET_ALL_Penalty,ADD_UPDATE_PENALTY} from './types';
import service from "../services/penaltyServices";

export const getAllPenalty =(data) => {

    return (dispatch) => {
        service.getAllPenaltys(data).then(response => {
            dispatch({
                type: GET_ALL_Penalty,
                payload: {response:response.data, searchData:data}                
            })
        },
        )

       
    }
}


export const createOrUpdatePenalty = (data) => {
    return (dispatch, getState) => {

        service.createOrUpdatePenalty({...data}).then(res => {
            const  {PenaltyReducer}= getState();
            dispatch(getAllPenalty(PenaltyReducer.searchData));
            dispatch({
                type: ADD_UPDATE_PENALTY,
                payload: "Successfully Updated"
            })
        },
        )       
    }
}

