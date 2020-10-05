import {GET_ALL_PenaltyColor,ADD_UPDATE_PENALTYCOLOR} from './types';
import service from "../services/penaltyColorService";

export const getAllPenaltyColours =() => {

    return (dispatch) => {
        service.getAllPenaltyColours().then(response => {
            dispatch({
                type: GET_ALL_PenaltyColor,
                payload: response.data
            })
        },
        )

       
    }
}


export const createOrUpdatePenaltyColour = (data) => {
    return (dispatch, getState) => {

        service.createOrUpdatePenaltyColour(data).then(res => {
           // const  {PenaltyReducer}= getState();
            //dispatch(getAllPenalty(PenaltyReducer.searchData));
            dispatch({
                type: ADD_UPDATE_PENALTYCOLOR,
                payload: "Successfully Updated"
            })
        },
        )       
    }
}

