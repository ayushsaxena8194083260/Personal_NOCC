import {
    GET_SMU_BY_SMU_ID,
    GET_SMU_BY_INV_ID,
    POST_SMU,
    DELETE_SMU,
    GET_ALL_SMUS
    
} from '../actions/types'
import { arrowFunctionExpression } from '@babel/types';

const INITIAL_STATE = {
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case GET_SMU_BY_SMU_ID:
            return {
                ...state,
                allSMUBySMUId: getData(action.allSMUBySMUId)
                // .map((plant1)=> {
                //     plant1['plant_type']=action.plant_type;
                //     plant1['plant_name']=action.plant_name;
                // })
            }    
        case GET_SMU_BY_INV_ID:
            return {
                ...state,
                allSMUByInvId: action.allSMUByInvId
                // .map((plant1)=> {
                //     plant1['plant_type']=action.plant_type;
                //     plant1['plant_name']=action.plant_name;
                // })
            }
            case GET_ALL_SMUS:
                return {
                    ...state,
                    allSMUs: action.allSMUs
                }
        case POST_SMU:
            return {
                ...state,
                smuDetails : action.smuDetails
            }
        case DELETE_SMU:
            return {
                ...state
            }    
            
        default:
            return state;
    }
}

function getValue(value){
    const _value = value.split(" ");
    return _value[1];
}

function getInput(_data){
    if (_data == null){
        return "null"
    } else {
        return _data
    }
}

function getData(data) {
    const gridData = data && data.length > 0 ? data.map((item, index) => {
        const smuNumber = getValue(item.smuNumber);
        return {
            ...item,
            smuNumber:smuNumber,
            date: getInput(item.date),
            time: getInput(item.time),
            wetCleaningString: getInput(item.wetCleaningString),
            dryCleaningString: getInput(item.dryCleaningString),
            uncleanedString: getInput(item.uncleanedString),
        }
    }) : [];
    return gridData;
}
