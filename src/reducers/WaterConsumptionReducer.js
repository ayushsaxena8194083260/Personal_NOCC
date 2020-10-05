import {
    CLEAR_WATER_CONSUMPTION,
    GET_WATER_CONSUMPTION,
    SEARCH_WATER_CONSUMPTION,
    GET_ADD_PLANT_TYPE,
} from '../actions/types'
import { stat } from 'fs'

const INITIAL_STATE = {
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_WATER_CONSUMPTION:
            {
                let newState = { ...state }
                newState.waterConsumption = getModuleCleaningGridData(action.waterConsumption, state);
                newState.displayMessage = null;
                return newState
            }
        case SEARCH_WATER_CONSUMPTION:
            {
                return {
                    ...state,
                    waterConsumptionData: action.waterConsumptionData,
                }
            }
        case GET_ADD_PLANT_TYPE:
            {
                let newState = { ...state }
                newState.plantTypes = action.plantTypes;
                newState.displayMessage = null;
                return newState
            }
        case CLEAR_WATER_CONSUMPTION:
            {
                return {
                    ...state,
                    waterConsumptionData: [],
                    waterConsumption: [],
                    plantTypes: [],
                    projectId: null,
                    selectedPlantType: null,
                    displayMessage: null,
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
    const startDate = new Date("2019-01-01 " + StartDateTime);
    const endDate = new Date("2019-01-01 " + EndTIme);

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
function getWaterUsedByPlantId(data){
    let totalWaterUsed = 0;
    const waterData = data && data.length > 0 ? data.map((item, totalWaterUsed) => {
        return {
            ...item,
            totalWaterUsed: totalWaterUsed + item.waterUsed
        }
    }) : [];
    //let totalWaterUsed = waterUsed.reduce((totalWaterUsed,item) => totalWaterUsed+item.waterUsed);
    //state.waterConsumption && state.waterConsumption.length > 0 && state.waterConsumption.map((item.water_used) => { totalWaterUsed = totalWaterUsed+item.water_used });
    return totalWaterUsed ? totalWaterUsed : 0;
}

function getCalc(data, state){
        let _collections = [];
        let totals = 0;
        state.waterConsumptionData && state.waterConsumptionData.plantIds && state.waterConsumptionData.plantIds.map((plantId,index) => {
        const getWaterUsed = data.filter(item => item.plantId === plantId)
        if (getWaterUsed !== null){
            totals = getWaterUsed.reduce((total,item) => parseInt(total)+parseInt(item.waterUsed),0);
        }
        _collections.push({plantId:plantId, totals:totals})
    })
    return _collections;
}

function getModuleCleaningGridData(data, state) {
    const waterCons = getCalc(data,state);
    const displayDate = state.waterConsumptionData.fromDate + " - " + state.waterConsumptionData.toDate;
    const plant_name = getPlantType(state.waterConsumptionData.plantIds, state);
    //const waterUsed = getWaterUsedByPlantId(data);
    const gridData = waterCons && waterCons.length > 0 ? waterCons.map((item, index) => {
        return {
            ...item,
            sr_no: index + 1,
            date: displayDate,
            plantName: getPlantType(item.plantId, state),
            waterUsed: item.totals
        }
    }) : [];
    return gridData;
}