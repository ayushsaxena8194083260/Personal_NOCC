import {
    GET_ALL_STRINGS_BY_SMU
    
} from '../actions/types'
import { arrowFunctionExpression } from '@babel/types';

const INITIAL_STATE = {
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case GET_ALL_STRINGS_BY_SMU:
            return {
                ...state,
                allStringsBySMU: action.allStringsBySMU
                // .map((plant1)=> {
                //     plant1['plant_type']=action.plant_type;
                //     plant1['plant_name']=action.plant_name;
                // })
            }    
           
        default:
            return state;
    }
}