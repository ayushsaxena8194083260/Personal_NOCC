import {
    SHOW_SPINNER,
    HIDE_SPINNER,
    GET_WEATHERSTATION_NAME,
    SEARCH_WEATHER_STATION,
    GET_WEATHER_STATION,
    CLEAR_WEATHER_STATION,
    GET_MISSINGWEATHER_STATION,
    SEARCH_MISSINGWEATHER_STATION,
    GET_MISSINGWEATHER,
    GET_WEATHERSTATION_DETAILS
} from './types'
import service from "../services/missingWeatherServices";
import { showSuccessAlert, showErrorAlert } from "./AlertActions";


/**
 * get Projects
 */
export function getWeatherDailyDetailsWithPlantIds(_data) {
    return (dispatch, getState) => {        
        dispatch({ type: SHOW_SPINNER })
        dispatch({
            type: SEARCH_WEATHER_STATION,
            weatherStationData: _data
        })
        service.getWeatherDailyDetailsWithPlantIds(_data).then(response => {
            console.log(response,'weather2')
            if (response.data) {
                    service.getWeatherStationByPlantId(_data.plantIds).then(res => {
                        dispatch({type:GET_WEATHERSTATION_NAME, weatherStationName:res.data});
                        dispatch({
                            type: GET_WEATHER_STATION,
                            weatherStation: response.data,                        
                        })
   
                       
                    })
            } else {
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

/**
 * get weather station name
 */
export function getWeatherStationByPlantId(plantId) {
    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })

        service.getWeatherStationByPlantId(plantId).then(response => {
            if (response.data) {
                console.log(response.data);
                dispatch({
                    type: GET_WEATHERSTATION_NAME,
                    weatherStationName: response.data
                })
            } else {
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

/**
 * get weather station name
 */
export function getWeatherDailyDetails1(data) {
    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })

        service.getWeatherDailyDetails1(data).then(response => {
            if (response.data) {
                console.log(response.data);
                dispatch({
                    type: GET_WEATHERSTATION_DETAILS,
                    weatherStationDetails: response.data
                })
            } else {
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

/**
 * 
 */
export function getWeatherDailyDetails(_data) { 
    return (dispatch, getState) => {        
        dispatch({ type: SHOW_SPINNER })
        dispatch({
            type: SEARCH_MISSINGWEATHER_STATION,
            weatherStationData: _data
        })

        service.getWeatherDailyDetails(_data).then(response => {
            if (response.data) {
                service.getWeatherStationByPlantId(_data.plantId).then(res => {
                    service.getMissingWeatherDetails(_data).then(resp => {
                        dispatch({type:GET_WEATHERSTATION_NAME, weatherStationName:res.data});
                        dispatch({
                            type: GET_MISSINGWEATHER_STATION,
                            weatherStation: response.data,
                            missingWeather:resp.data                      
                        })
                    })
                })            
        } else {
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}



/**
 * 
 */
export const clearMissingWeatherStationData = () => {
    return (dispatch, getState) => {
        dispatch({
            type: CLEAR_WEATHER_STATION,
        })
    }
}

