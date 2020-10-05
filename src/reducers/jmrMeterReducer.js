import{
    GET_ALL_PLANTJMR,
    GET_PLANTJMR_BYID,
    GET_PLANT_BYJMRID,
    SEARCH_JMR_METER_DATA,
    GET_JMR_METER,
    GET_ADD_PLANT_TYPE,
    DELETE_PLANTJMR,
    POST_PLANTJMR,
    CLEAR_JMRMETER
} from '../actions/types'
import { stat } from 'fs'

const INITIAL_STATE = {

}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case GET_ALL_PLANTJMR:
            return{
                ...state,
                plantJMRs: action.plantJMRs
            }

        case GET_PLANTJMR_BYID:
            return{
                ...state,
                plantJMR: action.GET_PLANTJMR_BYID
            }
        
        case GET_PLANT_BYJMRID:
            return{
                ...state,
                plantJMRid: action.GET_PLANT_BYJMRID
            }

        case GET_JMR_METER:
            {
                let newState = { ...state }
                newState.jmrMeter = getJmrMeterData(action.jmrMeter, state);
                newState.displayMessage = null;
                return newState
            }

        case POST_PLANTJMR:
            return{
                ...state,
                allPlantJMR: action.POST_PLANTJMR
            }

        case DELETE_PLANTJMR:
            return{
                ...state,
                displayMessage: action.displayMessage,
                // allPlantJMR: state.allPlantJMR.filter(plantJMR => plantJMR._id !== action.response.id),
            }
            case CLEAR_JMRMETER:
                {
                    return {
                        ...state,
                        jmrMeter: [],
                        displayMessage: null,
                    }
                }
    
        case GET_ADD_PLANT_TYPE:
        {
            let newState = { ...state }
            newState.plantTypes = action.plantTypes;
            newState.displayMessage = null;
            return newState
        }
        
        default:
            return state;

    }
}

function getPlantType(plant_id, state) {
    const _plantType = state.plantTypes.filter((item) => item.plantId === plant_id)[0];
    return _plantType ? _plantType.plantName : "";
}

function getJmrMeterData(data, state) {

    const gridData = data && data.length > 0 ? data.map((item, index) => {
        return {
            ...item,
            sr_no: index + 1,
            plantName: item[1].plantName,
            month: item[0].month,
            fileName: item[0].fileName,
        }
    }) : [];
    return gridData;
}