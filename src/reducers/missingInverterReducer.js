import {
    POST_MISSINGINVERTER_DAILY,
    CLEAR_MISSINGINVERTER_DAILY,
    SEARCH_MISSINGINVERTER_DAILY,
    GET_MISSINGINVERTER_DAILY,
    GET_INVERTER_NAME,
    GET_INVERTER_DETAILS
} from '../actions/types'
import { stat } from 'fs'

const INITIAL_STATE = {
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_MISSINGINVERTER_DAILY:
            {
                let newState = { ...state }
                newState.missingInverter = getMissingInverterGridData(action.missingInverter,action.inverterMissing, state);
                newState.displayMessage = null;
                return newState
            }
        case POST_MISSINGINVERTER_DAILY:
            return {
                ...state,
                missingInverterDaily: action.missingInverterDaily,
                displayMessage: action.displayMessage
            }
        case SEARCH_MISSINGINVERTER_DAILY:
            {
                return {
                    ...state,
                    missingInverterData: action.MissingInverterDailyData,
                }
            }
            case GET_INVERTER_NAME:
            {
                let newState = { ...state }
                newState.inverterName = action.inverterName;
                newState.displayMessage = null
                return newState
            }
            case GET_INVERTER_DETAILS:
                {
                    return {
                        ...state,
                        missingInverterDetails: action.missingInverterDetails
                    }
                }

    case CLEAR_MISSINGINVERTER_DAILY:
            {
                return {
                    ...state,
                    missingInverterData: [],
                    missingInverter: [],
                    plantTypes: [],
                    selectedPlantType: null,
                    displayMessage: null,
                    inverterName: null
                }
            }
        default:
            return state;
    }
}

function getInverterName(inverterId, state) {
    const _inverterName = state.inverterName.filter((item) => item.inverterId === inverterId)[0];
    return _inverterName ? _inverterName.inverterName : "";
}

function getAvailable(_missing, date){
    const missingAvail = _missing.filter((items) => items.date === date)[0];
    const missing = missingAvail && missingAvail.missingRow ? missingAvail.missingRow : "0"
    let available = 96;
    if (missing){
        available = available - parseInt(missing);
    } else {
        available = available
    }
    return available;
}

function getMissing(_missing, date){
    const missingAvail = _missing.filter((items) => items.date === date)[0];
    const missing = missingAvail && missingAvail.missingRow ? missingAvail.missingRow : "0"
    return missing? missing : "0";
}
function getMissingInverterGridData(data, missing, state) {

    const gridData = missing && missing.length > 0 ? missing.map((item, index) => {
        const avail = getAvailable(missing, item.date);
        const miss = getMissing(missing, item.date);
        return {
            ...item,
            sr_no: index + 1,
            date: item.date && item.date.substr(0,10),
            inverterName: getInverterName(item.inverterId, state),
            total: "96",
            available: avail,
            missing:miss
        }
    }) : [];
    return gridData;
}