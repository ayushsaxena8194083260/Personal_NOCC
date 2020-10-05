import {
    GET_PROJECT_TYPE,
    GET_PLANT_TYPE,
    GET_AZURELOSS,
    SEARCH_AZURELOSS,
    POST_AZURELOSS,
    GET_ADD_PLANT_TYPE,
    DELETE_AZURELOSS,
    CLEAR_AZURELOSS,
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
        case GET_AZURELOSS:
            {
                let newState = { ...state }
                newState.plantLoss = getAzureLossGridData(action.plantLoss, state);
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

        case POST_AZURELOSS:
            return {
                ...state,
                azureLoss: action.azureLoss,
                displayMessage: action.displayMessage
            }

        case DELETE_AZURELOSS: {
            return {
                ...state,
                displayMessage: action.displayMessage
            }
        }
        case SEARCH_AZURELOSS:
            {
                return {
                    ...state,
                    azureLoss: action.azureLoss,
                }
            }
        case CLEAR_AZURELOSS:
            {
                return {
                    ...state,
                    azueLosssData: [],
                    azueLosss: [],
                    plantLoss:[],
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

function getPlantType(plant_id, state) {
    const _plantType = state.plantTypes.filter((item) => item.plantId === plant_id)[0];
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

function getGenerationLossForThePeriod(timeInHours, state) {
    const PlantAvailability = state.PlantAvailability && state.PlantAvailability.length >0 ? state.PlantAvailability[0] : null;
    if (PlantAvailability) {
        const available_capacity = PlantAvailability.available_capacity ? parseInt(PlantAvailability.available_capacity) / 100 : 1;
        const design_loss = PlantAvailability.design_loss ? parseInt(PlantAvailability.design_loss) : 1;
        const array_tilt = 1;
        return (((array_tilt * timeInHours) / 1000) * available_capacity * design_loss)
    }

    return null;
}


function generation_lossForTheWholeDay(generation_lossForThePeriod,state){
    const PlantAvailability = state.PlantAvailability && state.PlantAvailability.length >0 ? state.PlantAvailability[0] : null;
   let net_generation = null;
    if (PlantAvailability) {
        net_generation = PlantAvailability.net_generation;
    }
return parseInt(generation_lossForThePeriod)+ parseInt(net_generation);
}

function designLoss(item){
    const designLoss = parseFloat(item.linearDerate) + parseFloat(item.lamLosses) + parseFloat(item.soilingLosses) + parseFloat(item.moduleQuality) + 
    parseFloat(item.inverterEfficiency) + parseFloat(item.transmissionLosses) + 
    parseFloat(item.shadingLosses) + parseFloat(item.lossDueToTemperature) + parseFloat(item.lossDueToIrradianceLevel) + parseFloat(item.moduleMismatchLosses) + parseFloat(item.inverterCliping) + parseFloat(item.transformerLosses) +  parseFloat(item.auxilaryLosses) +  parseFloat(item.dcLosses)  + parseFloat(item.acCablelosses);

    return designLoss.toFixed(2)+"%";
}

function getTotalLoss(item){
    const totalLoss = parseFloat(item.inverterCliping) + parseFloat(item.dcLosses) + parseFloat(item.acCablelosses) + parseFloat(item.transformerLosses) + parseFloat(item.moduleQuality) + parseFloat(item.moduleMismatchLosses)+parseFloat(item.soilingLosses)+parseFloat(item.auxilaryLosses)+parseFloat(item.inverterEfficiency)+parseFloat(item.linearDerate)+parseFloat(item.shadingLosses)+parseFloat(item.gridOutageAndPlantDowntime)+parseFloat(item.transmissionLosses)+parseFloat(item.lossDueToIrradianceLevel)+parseFloat(item.lossDueToTemperature)+parseFloat(item.lamLosses);
    return totalLoss.toFixed(2)+"%";
}
function getAzureLossGridData(data, state) {

    const gridData = data && data.length > 0 ? data.map((item, index) => {
        return {
            ...item,
            sr_no: index + 1,
            plantName: getPlantType(item.plantId, state),
            designLoss: designLoss(item),
            totalSumOfLosses: getTotalLoss(item)
        }
    }) : [];
    return gridData;
}