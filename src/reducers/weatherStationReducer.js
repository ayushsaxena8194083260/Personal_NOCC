import {
    SEARCH_WEATHER_STATION,
    POST_WEATHER_STATION,
    CLEAR_WEATHER_STATION,
    GET_WEATHERSTATION_NAME,
    GET_WEATHER_STATION,
    GET_ADD_PLANT_TYPE,
    DELETE_WEATHER_STATION,
    GET_ALL_WEATHERSTATIONS
} from '../actions/types'
import { stat } from 'fs'

const INITIAL_STATE = {
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_WEATHER_STATION:
            {
                let newState = { ...state } 
                //newState.weatherStationName = action.weatherStationName;
                newState.weatherStation = getWeatherStationGridData(action.weatherStation, state);
                newState.displayMessage = null;
                return newState
            }
        case GET_WEATHERSTATION_NAME:
            {
                let newState = { ...state }
                newState.weatherStationName = action.weatherStationName;
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
        case POST_WEATHER_STATION:
            return {
                ...state,
                weatherStation: action.weatherStation,
                displayMessage: action.displayMessage
            }
        case SEARCH_WEATHER_STATION:
            {
                return {
                    ...state,
                    weatherStationData: action.weatherStationData,
                }
            }
            case GET_ALL_WEATHERSTATIONS:
                {
                    return {
                        ...state,
                        allWeatherStations: action.allWeatherStations,
                    }
                }
                
        case CLEAR_WEATHER_STATION:
            {
                return {
                    ...state,
                    weatherStationData: [],
                    weatherStation: [],
                    plantTypes: [],
                    projectId: null,
                    selectedPlantType: null,
                    displayMessage: null,
                }
            }
            case DELETE_WEATHER_STATION: {
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
    return mm + "/" + dd + "/" + yyyy;
}



function getAffectedTimeInHrs(StartDateTime, EndTIme) {
    const startDate = new Date("2019-01-01 "+StartDateTime);
    const endDate = new Date("2019-01-01 "+EndTIme);

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

function getWeatherName(plantId, state) {
    const _weatherStationName = state.weatherStationName.filter((item) => item.plantId === plantId)[0];
    return _weatherStationName ? _weatherStationName.weatherStationName : "";
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

function getHorizontalInso(horizontal_irradiation_wh,timeInHrs){
    const _time = timeInHrs.replace(":",".");
    const _horizInso = (horizontal_irradiation_wh*_time)/1000;
    return _horizInso && _horizInso ? _horizInso.toFixed(2).toString() : "0";
}

function getTiltInso(array_tilt,timeInHrs){
    const _time = timeInHrs.replace(":",".");
    const _horizInso = (array_tilt*_time)/1000
    return _horizInso && _horizInso ? _horizInso.toFixed(2).toString() : "0";
}

function fixDecimal(input){
    return input.toFixed(2).toString();
}

function getDateTime(startTime) {
    const data = startTime.replace("T"," ").substring(0,19);
    return data;
}

// function getTimeFromStartTime(startTime) {
//     const data = startTime.split("T");
//     return data && data.length > 1 ? data[1].substring(0,8) : data[0];
// }

// function getAffectedTimeInDecimal(diffTime) {
//     const data = diffTime.split(":");
//     const _mins = data && data.length > 1 && parseInt(data[1]) / 60;
//     const decval = parseInt(data[0]) + _mins;
//     return decval && decval.toFixed(2) ? decval.toFixed(2).toString() : "";
// }

function getWeatherStationGridData(data, state) {

    const gridData = data && data.length > 0 ? data.map((item, index) => {
        //const hr = getAffectedTimeInHrs(item.start_time, item.end_time);
        const startTime = getDateTime(item.startTime);
        const hr = getAffectedTimeInHrs(startTime, item.endTime);
        const timeInHours = getAffectedTimeInDecimal(hr);
        // const timeHrs = getAffectedTimeInDecimal(timeInHours);

        return {
            ...item,
            sr_no: index + 1,
            plantName: getPlantType(item.plantId, state),
            date: item.date.substring(0,10),
            weatherStationName: getWeatherName(item.plantId, state),
            startTime: getTimeFromStartTime(item.startTime),
            timeInHrs: getAffectedTimeInHrs(item.startTime, item.endTime),
            timeInDec:timeInHours,//getAffectedTimeInDecimal(item.startTime),
            horizontalInso: getHorizontalInso(item.horizontalIrradiationWh,timeInHours),
            tiltInso: getTiltInso(item.tiltIrradiationWh,timeInHours),
            ambientTemp24: item.ambientTemp24.toFixed(2),
            moduleTemp24 : item.moduleTemp24.toFixed(2),
            windSpeed24 : item.windSpeed24.toFixed(2),
            horizontalIrradiationWh:item.horizontalIrradiationWh.toFixed(2),
            tiltIrradiationWh: item.tiltIrradiationWh.toFixed(2),
        }
    }) : [];
    return gridData;
}