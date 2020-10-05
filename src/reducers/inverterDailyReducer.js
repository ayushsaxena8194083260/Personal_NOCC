import {
    POST_INVERTER_DAILY,
    CLEAR_INVERTER_DAILY,
    GET_INVERTER_NAME,
    SEARCH_INVERTER_DAILY,
    GET_INVERTER_DAILY,
    GET_ADD_PLANT_TYPE,
    DELETE_INVERTER_DAILY,
    GET_ALL_INVERTERS
} from '../actions/types'
import { stat } from 'fs'

const INITIAL_STATE = {
    totalInfo: {
        ac_real_power: null,
        calc_e_today: null,
        dc_power: null,
        e_total: null
    }
}

export default(state = INITIAL_STATE, action) => {
    switch (action.type) {
        case DELETE_INVERTER_DAILY: {
            return {
                ...state,
                displayMessage: action.displayMessage
            }
        }
        case GET_INVERTER_DAILY:
            {
                let newState = { ...state }
                const gridresult = getInverterDailyGridData(action.inverterDaily, action.invName, state);
                newState.inverterDaily = gridresult;
                newState.totalResult = getInverterDailyTotal(gridresult);
                newState.totalInfo = totalInfo(action.inverterDaily);
                //newState.inverterDaily = totalInfo(action.inverterDaily, state);
                //newState.totalInfo = totalInfo(action.inverterDaily),
                newState.displayMessage = null;
                return newState
            }
        case GET_INVERTER_NAME:
            {
                let newState = { ...state }
                newState.inverterName = action.inverterName;
                newState.displayMessage = null
                return newState
            }
        case GET_ADD_PLANT_TYPE:
            {
                let newState = { ...state }
                newState.plantTypes = action.plantTypes;
                newState.displayMessage = null;
                return newState
            }
        case POST_INVERTER_DAILY:
            return {
                ...state,
                inverterDaily: action.inverterDaily,
                displayMessage: action.displayMessage
            }
        case SEARCH_INVERTER_DAILY:
            {
                return {
                    ...state,
                    inverterDailyData: action.inverterDailyData,
                }
            }

        case CLEAR_INVERTER_DAILY:
            {
                return {
                    ...state,
                    inverterDailyData: [],
                    inverterDaily: [],
                    plantTypes: [],
                    projectId: null,
                    selectedPlantType: null,
                    displayMessage: null,
                }
            }
            case GET_ALL_INVERTERS:
            {
                return {
                    ...state,
                    allInverters : action.allInverters
                }
            }
        default:
            return state;
    }
}

function getDate(cDate) {
    const today = new Date(cDate);
    let dd = today.getDate();
    let mm = today.getMonth() + 1;

    const yyyy = today.getFullYear();
    if (dd < 10) {
        dd = "0" + dd;
    }
    if (mm < 10) {
        mm = "0" + mm;
    }
    return mm + "/" + dd + "/" + yyyy;
}



function getAffectedTimeInHrs(StartDateTime, EndTIme) {
    const startDate = new Date(StartDateTime);
    const endDate = new Date(getDate(startDate) + " " + EndTIme);

    let seconds = Math.floor((endDate - (startDate)) / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);

    hours = hours - (days * 24);
    minutes = minutes - (days * 24 * 60) - (hours * 60);
    seconds = seconds - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60);

    //return hours + ":" + minutes + ":" + seconds;
    return hours + ":" + minutes;
}

function getPlantType(plantId, state) {
    const _plantType = state.plantTypes.filter((item) => item.plantId === plantId)[0];
    return _plantType ? _plantType.plantName : "";
}

function getTimeFromStartTime(startTime) {
    const data = startTime.split(" ");
    return data && data.length > 1 ? data[1] : data[0];
}

function getAffectedTimeInDecimal(diffTime) {
    const data = diffTime.split(":");
    const _mins = data && data.length > 1 && parseInt(data[1]) / 60;
    const decval = parseInt(data[0]) + _mins;
    return decval && decval.toFixed(2) ? decval.toFixed(2).toString() : "";
}

function getInverterName(inverterId, state) {
    const _inverterName = state.inverterName.filter((item) => item.inverterId === inverterId)[0];
    return _inverterName ? _inverterName.inverterName : "";
}

function totalInfo(dailyData) {
    let sumenergy = 0;
    let sumac = 0;
    let sumdc = 0;
    let sumtotal = 0;
    let arraySumAC = dailyData.map((item, index) => { return parseFloat(item.acRealPower) });
    let arraysumenergy = dailyData.map((item, index) => { return parseFloat(item.calcEToday) });
    let arraySumDC = dailyData.map((item, index) => { return parseFloat(item.dcPower) });
    let arraySumTotal = dailyData.map((item, index) => { return parseFloat(item.eTotal) });
    sumac = arraySumAC.reduce((a, b) => a + b, 0);
    sumenergy = arraysumenergy.reduce((a, b) => a + b, 0);
    sumdc = arraySumDC.reduce((a, b) => a + b, 0);
    sumtotal = arraySumTotal.reduce((a, b) => a + b, 0);
    sumac = Math.round(sumac,2);
    sumenergy = Math.round(sumenergy,2);
    sumdc = Math.round(sumdc,2);
    sumtotal = Math.round(sumtotal,2);
    return {
        sumenergy,
        sumac,
        sumdc,
        sumtotal
    }
}
function getInverterDailyGridData(data, iName, state) {
    let sumenergy = 0;
    let sumac = 0;
    let sumdc = 0;
    let sumtotal = 0;
    const gridData = data && data.length > 0 ? data.map((item, index) => {
        sumac = parseFloat(sumac) + parseFloat(item.acRealPower);
        sumenergy = parseFloat(sumenergy) + parseFloat(item.calcEToday);
        sumdc = parseFloat(sumdc) + parseFloat(item.dcPower);
        sumtotal = parseFloat(sumtotal) + parseFloat(item.eTotal);
        return {
            ...item,
            sr_no: index + 1,
            date: item.date.substring(0, 10),
            plantName: getPlantType(item.plantId, state),
            inverterName: getInverterName(item.inverterId, state),
            acRealPower: item.acRealPower.toFixed(2),
            calcEToday: item.calcEToday.toFixed(2),
            dcPower: item.dcPower.toFixed(2),
            eTotal:item.eTotal.toFixed(2),
        }
    }) : [];
    return gridData;
}

function getInverterDailyTotal(data) {
    let calcEToday =0;
        let acRealPower = 0;
        let dcPower = 0;
        let eTotal = 0;
    
        data && data.length > 0 && data.map((item) => {
            calcEToday += parseFloat(item.calcEToday)
            acRealPower += parseFloat(item.acRealPower);
            dcPower += parseFloat(item.dcPower);
            eTotal += parseFloat(item.eTotal);
        })
    
        return {
            calcEToday: calcEToday.toFixed(2),
            acRealPower: acRealPower.toFixed(2),
            dcPower: dcPower.toFixed(2),
            eTotal: eTotal.toFixed(2)
        }
    }