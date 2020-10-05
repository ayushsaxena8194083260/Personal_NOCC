import {
    SHOW_SPINNER,
    HIDE_SPINNER,
    POST_WEATHER_STATION,
    CLEAR_WEATHER_STATION,
    GET_WEATHERSTATION_NAME,
    SEARCH_WEATHER_STATION,
    GET_WEATHER_STATION,
    GET_ADD_PLANT_TYPE,
    DELETE_WEATHER_STATION,
    GET_ALL_WEATHERSTATIONS
} from './types'
import service from "../services/weatherStationServices";
import { showSuccessAlert, showErrorAlert } from "./AlertActions";




/**
 * get Projects
 */
export function getWeatherDailyDetailsWithPlantIds(_data) {
    return (dispatch, getState) => {        
        // dispatch({ type: SHOW_SPINNER })
        // dispatch({
        //     type: SEARCH_WEATHER_STATION, 
        //     weatherStationData: _data
        // }) 
        service.getWeatherDailyDetailsWithPlantIds(_data).then(response => {
            console.log(response,'weather')
            if (response.data) {
                    service.getWeatherStationByPlantId(_data).then(res => {
                        console.log(res.data,'weatherStationName')
                        dispatch({
                            type:GET_WEATHERSTATION_NAME,
                            weatherStationName:res.data
                        });
                        dispatch({
                            type: GET_WEATHER_STATION,                            
                            weatherStation: response.data,  
                            weatherStationName:res.data                      
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
 * delete article
 */
export const deleteWeatherStationDailyData = (id) => {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_SPINNER })
        service.deleteWeatherStationDailyData(id).then(response => {
            if (response.data) {
                console.log(response);
                let resObj = { status: response.data, id: id };
                dispatch({
                    type: DELETE_WEATHER_STATION,
                    displayMessage: "Weather Station Data has been deleted successfully.",
                })
                const  {weatherStationReducer}= getState();
                console.log("rducerValue", weatherStationReducer);
              dispatch(getWeatherDailyDetailsWithPlantIds(weatherStationReducer.weatherStationData));

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
 * get Projects
 */
export function getWeatherStationNameByPlantId(plantId) {
    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })

        service.getWeatherStationNameByPlantId(plantId).then(response => {
            if (response.data) {
                console.log(response.data);
                dispatch({
                    type: GET_WEATHERSTATION_NAME,
                    weatherStation: response.data
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
 * Post article
 */

export function getAllWeatherStation() {
    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })

        service.getAllWeatherStation().then(response => {
            if (response.data) {
                console.log(response.data);
                dispatch({
                    type: GET_ALL_WEATHERSTATIONS,
                    allWeatherStations: response.data
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

export const createOrUpdateWeatherStationDailyData = (data) => {
    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })

        service.createOrUpdateWeatherStationDailyData(data.weatherStation).then(response => {
            if (response.data) {
                dispatch({
                    type: POST_WEATHER_STATION,
                    displayMessage: data.type === "Add Weather Station"? "Weather Station has been added successfully." : "Weather Station has been updated successfully."
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
 * get Projects
 */
export function getPlantByType(plantType) {
    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })

        service.getPlantByType(plantType).then(response => {
            if (response.data) {
                console.log(response.data);
                dispatch({
                    type: GET_ADD_PLANT_TYPE,
                    plantTypes: response.data
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
 * get Projects
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

export const clearWeatherStationData = () => {
    return (dispatch, getState) => {
        dispatch({
            type: CLEAR_WEATHER_STATION,
        })
    }
}
