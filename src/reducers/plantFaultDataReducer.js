import {
    GET_PROJECT_TYPE,
    GET_PLANT_TYPE,
    GET_PLANT_FAULT,
    SEARCH_PLANT_FAULT_DATA,
    POST_PLANTFAULT,
    GET_ADD_PLANT_TYPE,
    DELETE_PLANT_FAULT,
    CLEAR_PLANT_FAULT,
    GET_PLANT_AVALIABILITY_FOR_PLANTID,
    POST_PLANTFAULT_INCIDENT,
    GET_PLANTFAULT_GEN,
    GET_INCIDENT_DATA,
    GET_INCIDENT_DATA_BY_YEAR
} from '../actions/types'
import { stat } from 'fs';
import { moment } from 'moment';

const INITIAL_STATE = {
}

export default (state = INITIAL_STATE, action) => {
    // const {PlantGenerationReducer} = getState();
    switch (action.type) {
        case GET_PROJECT_TYPE:
            let newState = { ...state }
            newState.projectTypes = action.projectTypes;
            newState.selectedPlantType = action.plantType;
            newState.displayMessage = null
            return newState

        case GET_PLANT_TYPE:
            {
                let newState = { ...state }
                newState.plantTypes = action.plantTypes;
                newState.projectId = action.projectId;
                newState.displayMessage = null
                return newState
            }
        case GET_PLANT_FAULT:
            {
                let newState = { ...state }
                const gridResult = getPlantFaultGridData(action.plantFault, action.plantFaultGen.plantActualGenerationDetailDOList, state);
                newState.plantFault = gridResult;
                newState.totalResult = getPlantFaultDataTotal(gridResult);
                newState.incidentData = [];
                newState.plantFaultsIDYear = [];
                newState.displayMessage = null;
                return newState
            }
        case GET_PLANTFAULT_GEN: {
            let newState = { ...state }
            newState.plantDailyGen = action.plantDailyGeneration.plantActualGenerationDetailDOList;
            newState.displayMessage = null;
            return newState
        }
        case GET_ADD_PLANT_TYPE:
            {
                let newState = { ...state }
                newState.plantTypes = action.plantTypes;
                newState.displayMessage = null;
                return newState
            }

        case POST_PLANTFAULT:
            return {
                ...state,
                plantFault: action.plantFault,
                displayMessage: action.displayMessage
            }

        case POST_PLANTFAULT_INCIDENT:
            return {
                ...state,
                plantFaultIncident: action.plantFaultIncident,
                displayMessage: action.displayMessage
            }

        case GET_INCIDENT_DATA: {
            return {
                ...state,
                incidentData: action.data && action.data.length > 0 ? action.data[0] : [],
                plantFaultsIDYear: action.data1 && action.data1.length > 0 ? action.data1[0] : [],
                displayMessage: null
            }
        }
        case DELETE_PLANT_FAULT: {
            return {
                ...state,
                displayMessage: action.displayMessage
            }
        }
        case SEARCH_PLANT_FAULT_DATA:
            {
                return {
                    ...state,
                    plantFaultData: action.plantFaultData,
                }
            }
        case CLEAR_PLANT_FAULT:
            {
                return {
                    ...state,
                    plantFaultData: [],
                    plantFault: [],
                    plantTypes: [],
                    projectId: null,
                    selectedPlantType: null,
                    displayMessage: null,
                }
            }
        case GET_PLANT_AVALIABILITY_FOR_PLANTID: {
            let newState = { ...state }
            if (action.payload !== null && action.payload.length > 0) {
                newState.PlantAvailability = action.payload;
            }
            return newState;
        }
        case GET_INCIDENT_DATA_BY_YEAR: {
            let newState = { ...state }
            if (action.data !== null && action.data.length > 0) {
                newState.plantFaultsIDYear = action.data[0];
            }
            return newState;
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

function getTime(cDate) {
    var date = cDate.split(" ");
    var weekday = date[0];
    var day = date[1];
    var month = date[2];
    var year = date[3];
    var time = date[4].split(":");
    var hour = time[0];
    var minute = time[1];
    var second = time[2];
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


    return hours + ":" + minutes;

}

function getPlantType(plantId, state) {
    const _plantType = state.plantTypes.filter((item) => item.plantId === plantId)[0];
    return _plantType ? _plantType.plantName : "";
}

function getDateTime(startTime) {
    const data = startTime.split(" ");
    return data && data.length > 1 ? data[1].substring(0, 8) : data[0];
}

function getTimeFromStartTime(startTime) {
    const data = startTime.split(" ");
    return data && data.length > 1 ? data[1].substring(0, 8) : data[0];
}

function getAffectedTimeInDecimal(diffTime) {
    const data = diffTime.split(":");
    const _mins = data && data.length > 1 && parseInt(data[1]) / 60;
    const decval = parseInt(data[0]) + _mins;
    return decval && decval.toFixed(2) ? decval.toFixed(2).toString() : "";
}

function getGenerationLossForThePeriod(timeInHours, state) {
    const PlantAvailability = state.PlantAvailability && state.PlantAvailability.length > 0 ? state.PlantAvailability[0] : null;
    if (PlantAvailability) {
        const available_capacity = PlantAvailability.availableCapacity ? parseInt(PlantAvailability.availableCapacity) / 100 : 1;
        const design_loss = PlantAvailability.designLoss ? parseInt(PlantAvailability.designLoss) : 1;
        const array_tilt = 1;
        return (((array_tilt * timeInHours) / 1000) * available_capacity * design_loss)
    }

    return null;
}

// function getGenLossForThePeriod(arrayTilt,totalTime, affectCapacity) {
//     const  genLossPeriod = ((arrayTilt*totalTime)/1000)*affectCapacity;
//     return genLossPeriod.toFixed(2);
// }

function generation_lossForTheWholeDay(generation_lossForThePeriod, state) {
    const PlantAvailability = state.PlantAvailability && state.PlantAvailability.length > 0 ? state.PlantAvailability[0] : null;
    let net_generation = null;
    if (PlantAvailability) {
        net_generation = PlantAvailability.netGeneration;
    }
    return parseInt(generation_lossForThePeriod) + parseInt(net_generation);
}

function getGenWholeDay(netGen, genLossPeriod) {
  
    let getGenValue = 0;
    if (netGen) {
        getGenValue = parseFloat(netGen) + parseFloat(genLossPeriod);
    } else {
        getGenValue = 0.00;
    }
    return getGenValue.toFixed(2);
}

function getGenLossForThePeriod(tilt, time, affectedCap, totalLoss) {
    console.log(tilt,'tilt')
    console.log(time,'time')
    console.log(affectedCap,'affectedCap')
    console.log(totalLoss,'totalLoss')
    let genLossPeriodModel = ((parseFloat(tilt) * parseFloat(time)) / 1000) * parseFloat(affectedCap);
    let genLossPeriod = genLossPeriodModel * (totalLoss / 100);
    return (genLossPeriodModel + genLossPeriod).toFixed(2);
}

function getPlantDev(sumGenLossPeriod, sumGenLossDay) {
    const plantDev = (sumGenLossPeriod / sumGenLossDay) * 100;
    return "-" + plantDev + "%";
}

function getRevenueLoss(genLossPeriod, data1, _date, _plantName) {
    console.log(genLossPeriod,'genLossPeriod')
    console.log(data1,'data1')
    console.log(_date,'_date')
    console.log(_plantName,'_plantName')

    const filterValue = data1.filter((items) => items.date === _date && items.plantName === _plantName)[0];
    const tariff = filterValue && filterValue.tariff ? filterValue.tariff : 0;
    const result = genLossPeriod *tariff;
    return result.toFixed(2);
}

function getDeviation(genLossPeriod, genLossDay) {
    let dev = 0.00;
    if (genLossDay != 0.00) {
        dev = (genLossPeriod / genLossDay) * 100;
    }

    if (dev) {
        return "-" + dev.toFixed(2) + "%";
    } else {
        return "-0.00%";
    }

}

function getPlantFaultGridData(data, data1, state) {
    let sumGenLossPeriod = 0;
    let sumGenLossDay = 0.00;
    let sumPlantDeviation = 0;
    let sumRevenueLoss = 0;
    let sumDesignLoss = 0;
    const gridData = data && data.length > 0 ? data.map((item, index) => {
        const _plantName = getPlantType(item.plantId, state);
        const startTime = getDateTime(item.time);
        const stopTime = getTimeFromStartTime(item.stopTime);
        const hr = getAffectedTimeInHrs(item.time, stopTime);
        const timeInHours = getAffectedTimeInDecimal(hr);
        const genLossPeriod = getGenLossForThePeriod(item.tiltIrradiationOh, timeInHours, item.affectedCapacity, item.totaleLosses);
        const genLossDay = getGenWholeDay(item.netGeneration, genLossPeriod);
        const plntDev = getDeviation(genLossPeriod, genLossDay);
        const revenueLoss = getRevenueLoss(genLossPeriod, data1, item.date, _plantName) //* 1;//(item.tariff);
        sumGenLossPeriod = sumGenLossPeriod + genLossPeriod;
        sumGenLossDay = sumGenLossDay + genLossDay;
        const plantDeviation = getPlantDev(sumGenLossPeriod, sumGenLossDay);
        sumPlantDeviation = sumPlantDeviation + plantDeviation;
        sumRevenueLoss = sumRevenueLoss + revenueLoss;
        sumDesignLoss = sumDesignLoss + parseInt(item.totaleLosses);
        return {
            ...item,
            sr_no: index + 1,
            plantName: _plantName,
            affectedCapacity: (item.affectedCapacity).toFixed(2),
            tiltIrradiationOh: (item.tiltIrradiationOh).toFixed(2),
            affectedTimeInHrs: hr,
            affectedTimeInDecimal: timeInHours,
            time: getTimeFromStartTime(item.time),
            moduleTempOh: (item.moduleTempOh).toFixed(2),
            stopTime: getTimeFromStartTime(item.stopTime),
            generationLossForThePeriod: genLossPeriod,    
            generationLossForTheWholeDay: genLossDay,
            plantDeviation: plntDev === Infinity ? 0 : plntDev,
            revenueLoss: revenueLoss,
        }
    }) : [];
    return gridData;
}


function getPlantFaultDataTotal(data) {
    let totalgenerationLossForThePeriod = 0;
    let generationLossForTheWholeDay = 0;
    let plantDeviation = 0;
    let revenueLoss = 0;

    data && data.length > 0 && data.map((item) => {
        totalgenerationLossForThePeriod += parseFloat(item.generationLossForThePeriod)
        generationLossForTheWholeDay += parseFloat(item.generationLossForTheWholeDay);
        plantDeviation += parseFloat(item.plantDeviation);
        revenueLoss += parseFloat(item.revenueLoss);
    })
    return {
        totalgenerationLossForThePeriod: totalgenerationLossForThePeriod.toFixed(2),
        generationLossForTheWholeDay: generationLossForTheWholeDay.toFixed(2),
        plantDeviation: (plantDeviation / data.length).toFixed(2) + "%",
        revenueLoss: revenueLoss.toFixed(2)
    }
}