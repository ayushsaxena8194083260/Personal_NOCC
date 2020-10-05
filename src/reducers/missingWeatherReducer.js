import {
    GET_WEATHERSTATION_NAME,
    GET_WEATHER_STATION,
    SEARCH_WEATHER_STATION,
    CLEAR_WEATHER_STATION,
    SEARCH_MISSINGWEATHER_STATION,
    GET_MISSINGWEATHER_STATION,
    GET_MISSINGWEATHER,
    GET_WEATHERSTATION_DETAILS
} from '../actions/types'
import { stat } from 'fs'

const INITIAL_STATE = {
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_WEATHERSTATION_NAME:
            {
                let newState = { ...state }
                newState.weatherStationName = action.weatherStationName;
                newState.displayMessage = null
                return newState
            }
            case GET_MISSINGWEATHER:
                {
                    let newState = {...state}
                    newState.missingWeather = action.missingWeather;
                    newState.displayMessage = null;
                    return newState
                }
            case GET_MISSINGWEATHER_STATION:
                {
                    let newState = { ...state }
                    newState.weatherStation = getMissingWeatherStationGridData(action.weatherStation, action.missingWeather, state);
                    newState.displayMessage = null;
                    return newState
                }
            case GET_WEATHERSTATION_DETAILS :
                {
                    return {
                        ...state,
                        weatherStationDetails : action.weatherStationDetails
                    }
                }    
            // case GET_WEATHER_STATION:
            //     {
            //         let newState = { ...state }
            //         //newState.weatherStationName = action.weatherStationName;
            //         newState.weatherStation = getMissingWeatherStationGridData(action.weatherStation, state);
            //         newState.displayMessage = null;
            //         return newState
            //     }
                case SEARCH_WEATHER_STATION:
                    {
                        return {
                            ...state,
                            weatherStationData: action.weatherStationData,
                        }
                    }
                    case SEARCH_MISSINGWEATHER_STATION:
                        {
                            return {
                                ...state,
                                weatherStationData: action.weatherStationData,
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
            
        default:
            return state;
    }
}

function getWeatherName(weatherStationId, state) {
    const _weatherStationName = state.weatherStationName.filter((item) => item.weatherStationId === weatherStationId)[0];
    return _weatherStationName ? _weatherStationName.weatherStationName : "";
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
    console.log(date,'date')
    const missingAvail = _missing.filter((items) => items.date === date)[0];
    const missing = missingAvail && missingAvail.missingRow ? missingAvail.missingRow : "0"
    return missing? missing : "0";
}
function getMissingWeatherStationGridData(data, missing, state) {
    console.log(missing);
    const gridData = missing && missing.length > 0 ? missing.map((item, index) => {
        const avail = getAvailable(missing, item.date);
        const miss = getMissing(missing, item.date);
        return {
            ...item,
            sr_no: index + 1,
            date:item.date.substr(0,10),
            weatherStationName: getWeatherName(item.weatherStationId, state),
            total: "96",
            available: avail,
            missing:   miss
        }
    }) : [];
    return gridData;
}