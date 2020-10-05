import {
    SEARCH_MODULE_CLEANING,
    POST_MODULE_CLEANING,
    CLEAR_MODULE_CLEANING,
    GET_MODULECLEANING_NAME,
    GET_MODULE_CLEANING,
    DELETE_MODULE_CLEANING,
    GET_ADD_PLANT_TYPE,
    GET_MODULE_CLEANING_DATA
} from '../actions/types'
import { stat } from 'fs'

const INITIAL_STATE = {
}

function getClearnTotal(data) {
    let rackPlanned = 0;
    let rackCleaned = 0;
    let totalCleaned = 0;
    let labourPlanned = 0;
    let labourUsed = 0;
    let waterUsed = 0;
    let cleaningExpenditure = 0;


    data && data.length > 0 && data.map((item) => {
        rackPlanned += parseFloat(item.rackPlanned);
        rackCleaned += parseFloat(item.rackCleaned);
        totalCleaned += parseFloat(item.totalCleaned);
        labourPlanned += parseFloat(item.labourPlanned);
        labourUsed += parseFloat(item.labourUsed);
        waterUsed += parseFloat(item.waterUsed);
        cleaningExpenditure += parseFloat(item.cleaningExpenditure);

    })

    return {
        rackPlanned: rackPlanned.toFixed(2),
        rackCleaned: rackCleaned.toFixed(2),
        totalCleaned: totalCleaned.toFixed(2),
        labourPlanned: labourPlanned.toFixed(2),
        labourUsed: labourUsed.toFixed(2),
        waterUsed: waterUsed.toFixed(2),
        cleaningExpenditure: cleaningExpenditure.toFixed(2)

    }
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_MODULE_CLEANING_DATA:
            {
                let newState = { ...state }
                const gridResult = getModuleCleaningGridData(action.moduleCleaning, state);
                newState.moduleCleaning = gridResult;
                newState.totalResult = getClearnTotal(gridResult);
                newState.displayMessage = null;
                return newState
            }
        // case GET_MODULE_CLEANING:
        //     {
        //         let newState = { ...state }
        //         const gridResult = getModuleCleaningGridData(action.moduleCleaning, state);
        //         newState.moduleCleaning = gridResult;
        //         newState.totalResult = getClearnTotal(gridResult);

        //         newState.displayMessage = null;
        //         return newState
        //     }
        case GET_MODULECLEANING_NAME:
            {
                let newState = { ...state }
                newState.moduleCleaningName = action.moduleCleaningName;
                newState.displayMessage = null
                return newState
            }

        case POST_MODULE_CLEANING:
            return {
                ...state,
                moduleCleaning: action.moduleCleaning,
                displayMessage: action.displayMessage
            }
        case SEARCH_MODULE_CLEANING:
            {
                return {
                    ...state,
                    moduleCleaningData: action.moduleCleaningData,
                }
            }
        case GET_ADD_PLANT_TYPE:
            {
                let newState = { ...state }
                newState.plantTypes = action.plantTypes;
                newState.displayMessage = null;
                return newState
            }
        case CLEAR_MODULE_CLEANING:
            {
                return {
                    ...state,
                    moduleCleaningData: [],
                    moduleCleaning: [],
                    plantTypes: [],
                    projectId: null,
                    selectedPlantType: null,
                    displayMessage: null,
                }
            }
        case DELETE_MODULE_CLEANING: {
            return {
                ...state,
                displayMessage: action.displayMessage
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
    return yyyy + "-" + mm + "-" + dd;
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

    // if (hours.toString().length === 1){
    //     hours = "0" + hours;
    // }
    // if (minutes.toString().length === 1){
    //     minutes = "0" + minutes;
    // }
    // if (seconds.length === 1){
    //     seconds = "0" + seconds;
    // }


    return calTime(hours) + ":" + calTime(minutes) + ":" + calTime(seconds);
}

function calTime(timeInput) {
    let _timeInput = null;
    if (timeInput.toString().length === 1) {
        _timeInput = "0" + timeInput;
    } else {
        return timeInput;
    }
    return _timeInput
}

function getPlantType(plantId, state) {
    const _plantType = state.plantTypes.filter((item) => item.plantId === plantId)[0];
    return _plantType ? _plantType.plantName : "";
}
function getModeOfCleaning(modeofClean) {
    let _displayMOC = null;
    if (modeofClean === 1) {
        _displayMOC = "Dry Cleaning";
    } else {
        _displayMOC = "Wet Cleaning";
    }
    return _displayMOC;
}



function getRainingDetails(rainingDetail, startTime, stopTime) {
    let _rainingDetail = null;
    let rainfallDate = null;
    if (rainingDetail === "YES") {
        rainfallDate = getAffectedTimeInHrs(startTime, stopTime);
        _rainingDetail = "(" + startTime + "-" + stopTime + ") \n" + rainfallDate;
    } else {
        _rainingDetail = "NO";
    }
    return _rainingDetail;
}
function getDateMC(date) {
    let dateInput = new Date(date)
    return dateInput.getMonth + "/" + dateInput.getDate + "/" + dateInput.getFullYear;
}

function getModuleCleaningGridData(data, state) {

    const gridData = data && data.length > 0 ? data.map((item, index) => {
        console.log(item.date,'item.date')
        return {
            ...item,
            sr_no: index + 1,
            plantName: getPlantType(item.plantId, state),
            date: item.date.substring(0, 10),
            modeOfCleaning: getModeOfCleaning(item.modeOfCleaning),
            rainingDetail: getRainingDetails(item.rainingDetail, item.startTime, item.stopTime)
        }
    }) : [];
    return gridData;
}