import {
    GET_PERF_LOSS_PLANTIDS_DATE,
    POST_PERF_LOSS_DATA
    
} from '../actions/types'
import { arrowFunctionExpression } from '@babel/types';

const INITIAL_STATE = {
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

       case GET_PERF_LOSS_PLANTIDS_DATE:
            return {
                ...state,
                perfLossByPlantIdsDate: action.perfLossByPlantIdsDate
            }
            
       case POST_PERF_LOSS_DATA:
           return {
               ...state
           }     
               
        default:
            return state;
    }
}
