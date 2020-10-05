import {
    GET_ALL_PLANTS,
    GET_PROJECT_TYPE,
    GET_PLANT_TYPE,
    POST_GRID_FAILURE,
    GET_ADD_PLANT_TYPE,
    DELETE_GRID_FAILURE,
    SEARCH_GRID_FAILURE_DATA,
    GET_GRID_FAILURE,
    CLEAR_GRID_FAILURE,
    GET_PLANT_AVALIABILITY_FOR_PLANTID
} from '../actions/types'
import { stat } from 'fs'

const INITIAL_STATE = {
}


export default (state = INITIAL_STATE, action) => {
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

        case GET_GRID_FAILURE:
            {
                let newState = { ...state }
                const gridResult = getGridFailureGridData(action.gridFailure, action.plantFaultGen.plantActualGenerationDetailDOList, action.plantAzureLoss, state);
                newState.gridFailure = gridResult;
                newState.totalResult = getGridFailureTotal(gridResult);
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

        case POST_GRID_FAILURE:
            return {
                ...state,
                gridFailure: action.gridFailure,
                displayMessage: action.displayMessage
            }


        case DELETE_GRID_FAILURE: {
            return {
                ...state,
                displayMessage: action.displayMessage
            }
        }
        case SEARCH_GRID_FAILURE_DATA:
            {
                return {
                    ...state,
                    gridFailureData: action.gridFailureData,
                }
            }

        case CLEAR_GRID_FAILURE:
            {
                return {
                    ...state,
                    gridFailureData: [],
                    gridFailure: [],
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

    let nextDate = StartDateTime.split(" ");
    let secondDate = nextDate[0].split("-");
    let thirdDate = secondDate[1] + "-" + secondDate[0] + "-" + secondDate[2]

    var a = thirdDate + " " + nextDate[1];


    const startDate = new Date(a);
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



// function getAffectedTimeInDecimal(diffTime) {
//     const data = diffTime.split(":");
//     const _hr = data && data.length > 1 && parseInt(data[0]) / 1;
//     const _mins = data && data.length > 1 && parseInt(data[1]) / 60;
//     const _secs = data && data.length > 1 && parseInt(data[2]) / 3600;
//     const decval = _hr + _mins + _secs;
//     return decval && decval.toFixed(2) ? decval.toFixed(2).toString() : "";
// }

function getDateTime(startTime) {
    const data = startTime.replace("T", " ").substring(0, 19);
    return data;
}

function getTimeFromStartTime(startTime) {
    const data = startTime.split("T");
    return data && data.length > 1 ? data[1].substring(0, 8) : data[0];
}

function getAffectedTimeInDecimal(diffTime) {
    const data = diffTime.split(":");
    const _mins = data && data.length > 1 && parseInt(data[1]) / 60;
    const decval = parseInt(data[0]) + _mins;
    return decval && decval.toFixed(2) ? decval.toFixed(2).toString() : "";
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

function getGenWholeDay(data, genLossPeriod, date) {
    

    let secondDate = date.split("-");

    let thirdDate = secondDate[2] + "-" + secondDate[1] + "-" + secondDate[0]
 

    const filterData = data.filter(item => item.date === thirdDate);
    const netGen = filterData[0]

    let getGenValue = 0;
    if (netGen) {
        getGenValue = parseFloat(netGen.netGeneration) + parseFloat(genLossPeriod);
    } else {
        getGenValue = 0.00;
    }
    return getGenValue.toFixed(2);
}
function getTotalLosses(azureLoss, startTime) {
    const date = startTime.split('-');
    const azureLossData = azureLoss.filter(item => item.month == parseInt(date[1]) && item.year == parseInt(date[2]));
    let totalLoss = 0;
 
    if (azureLossData.length > 0) {

        totalLoss = parseFloat(azureLossData[0].linearDerate) + parseFloat(azureLossData[0].lamLosses) + parseFloat(azureLossData[0].soilingLosses) + parseFloat(azureLossData[0].moduleQuality) + parseFloat(azureLossData[0].inverterEfficiency) + parseFloat(azureLossData[0].transmissionLosses) + parseFloat(azureLossData[0].shadingLosses) + parseFloat(azureLossData[0].lossDueToTemperature) + parseFloat(azureLossData[0].lossDueToIrradianceLevel) + parseFloat(azureLossData[0].moduleMismatchLosses) + parseFloat(azureLossData[0].inverterCliping) + parseFloat(azureLossData[0].transformerLosses) + parseFloat(azureLossData[0].auxilaryLosses) + parseFloat(azureLossData[0].dcLosses) + parseFloat(azureLossData[0].acCablelosses);
       
    }
    return totalLoss;
}
function getGenLossForThePeriod(tilt, time, affectedCap, totalLoss) {

    if (totalLoss) {
        totalLoss = totalLoss;
    }
    let genLossPeriodModel = ((parseFloat(tilt) * parseFloat(time)) / 1000) * parseFloat(affectedCap);
    let genLossPeriod = genLossPeriodModel * (totalLoss / 100);
    return (parseInt(genLossPeriodModel) + parseInt(genLossPeriod)).toFixed(2);
}

function getGenLossForThePeriodRevenue(tilt, time, affectedCap, totalLoss) {

    if (totalLoss) {
        totalLoss = totalLoss;
    } else {
        totalLoss = 0;
    }
    let genLossPeriodModel = ((parseFloat(tilt) * parseFloat(time)) / 1000) * parseFloat(affectedCap);
    let genLossPeriod = genLossPeriodModel * (totalLoss / 100);
    return ((genLossPeriodModel) + (genLossPeriod)).toFixed(2);
}

function getPlantDev(sumGenLossPeriod, sumGenLossDay) {
    return (sumGenLossPeriod / sumGenLossDay) * 100;
}

function getDeviation(genLossPeriod, genLossDay) {
    const dev = (genLossPeriod / genLossDay) * 100;
    if (isFinite(dev)) {
        return "-" + dev.toFixed(2);
    } else {
        return "-" + 0.00 + "%";
    }

}

function getDateGF(dt) {
    return dt.substring(0, 10);
}

function getGridFailureGridData(data, data1, data2, state) {
    let sumGenLossPeriod = 0;
    let sumGenLossDay = 0.00;
    let sumPlantDeviation = 0;
    let sumRevenueLoss = 0;
    let sumDesignLoss = 0;
    const gridData = data && data.length > 0 ? data.map((item, index) => {
        const _plantName = getPlantType(item.plantId, state);
        const startTime = getDateTime(item.startTime);
        const hr = getAffectedTimeInHrs(startTime, item.stopTime);
        const timeInDecimal = getAffectedTimeInDecimal(hr);
        const affectedCapacity = getAffectedCapacity(data1, item.plantId);
        const totalLoss = getTotalLosses(data2, item.startTime.slice(0, 10));
        const genLossPeriod = getGenLossForThePeriod(item.tiltIrradiationOh, timeInDecimal, affectedCapacity, totalLoss);
        const genLossDay = getGenWholeDay(data1, genLossPeriod, item.startTime.slice(0, 10));
        const plntDev = getDeviation(genLossPeriod, genLossDay);
        const revenueLossValue = getGenLossForThePeriodRevenue(item.tiltIrradiationOh, timeInDecimal, affectedCapacity, totalLoss);
        const revenueLoss = getRevenueLoss(revenueLossValue, data1, item.startTime.slice(0, 10), _plantName);//(item.tariff);
        sumGenLossPeriod = sumGenLossPeriod + genLossPeriod;
        sumGenLossDay = sumGenLossDay + genLossDay;
        const plantDeviation = getPlantDev(sumGenLossPeriod, sumGenLossDay).toFixed(2) + "%";
        sumPlantDeviation = sumPlantDeviation + plantDeviation;
        sumRevenueLoss = sumRevenueLoss + revenueLoss;
        sumDesignLoss = sumDesignLoss + parseInt(totalLoss);
        let newStartTime = item.startTime.split(" ");

        return {
            ...item,
            sr_no: index + 1,
            // date: getDateGF(item.startTime),
            date: newStartTime[0],
            affectedCapacity1: affectedCapacity,
            plantName: getPlantType(item.plantId, state),
            tiltIrradiationOh: (item.tiltIrradiationOh).toFixed(2),
            moduleTempOh: (item.moduleTempOh).toFixed(2),
            timeInHours: hr,
            timeInDecimal: timeInDecimal,
            // startTime: getTimeFromStartTime(item.startTime),
            startTime: newStartTime[1],
            generationLossForThePeriod: isNaN(genLossPeriod) ? 0 : genLossPeriod,
            generationLossForTheWholeDay: isNaN(genLossDay) ? 0 : genLossDay,
            plantDeviation: plntDev,//== NaN ? 0:plntDev,
            revenueLoss: revenueLoss,//== NaN ? 0:revenueLoss,
        }
    }) : [];
    return gridData;
}

function getAffectedCapacity(data, plantId) {
    //const date1 = new Date(date).toString();
  
    const filterData = data.filter(item => item.plantId === plantId);
    return filterData.length > 0 ? filterData[0].connectedCapacity : 0;
}

function getRevenueLoss(genLossPeriod, data1, _date, _plantName) {
    // console.log(genLossPeriod,"genLossPeriod")
    console.log(data1,"data1")
    // console.log(_date,"_date")
    // console.log(_plantName,"_plantName")
    let secondDate = _date.split("-");

    // let secondDate= nextDate[0].split("-");
    let thirdDate = secondDate[2] + "-" + secondDate[1] + "-" + secondDate[0]

    // var a = thirdDate + " " + nextDate[1];
    const filterValue = data1.filter((items) => items.date === thirdDate && items.plantName === _plantName)[0];
   console.log(filterValue,'filterValue')
    const tariff = filterValue && filterValue.tariff ? filterValue.tariff : 0;
    const result = genLossPeriod * tariff;
    return result.toFixed(2);
}

function getGridFailureTotal(data) {
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