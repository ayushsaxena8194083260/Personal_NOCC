import {
    GET_STRINGS_BY_SMU_ID,
    POST_STRING_NAME,
    DELETE_STRING
    
} from '../actions/types'
import { arrowFunctionExpression } from '@babel/types';

const INITIAL_STATE = {
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case GET_STRINGS_BY_SMU_ID:
            return {
                ...state,
                allStringsBySMUId: action.allStringsBySMUId
                // .map((plant1)=> {
                //     plant1['plant_type']=action.plant_type;
                //     plant1['plant_name']=action.plant_name;
                // })
            }
        
        case POST_STRING_NAME:
            return {
                ...state,
                allStringsBySMUId: state.allStringsBySMUId

            }
        
        case DELETE_STRING:
        return {
            ...state,
            allStringsBySMUId: state.allStringsBySMUId.filter(string => string.stringId !== action.stringId)

        }
           
        default:
            return state;
    }
}
