import {
    ADD_WEATHER_INFO_BY_PLANTS
} from './types'
import service from "../services/forcastWeatherService";
import data from '../components/dashboard/data';

function getWatherinfo(plant_id, response) {
    let forcast = [];
    let todayDescription = "";
    let todayMain = "";
    let todayIcon = "";
    let tomorrowDescription = "";
    let tomorrowMain = "";
    let tomorrowIcon = "";
    if (response && response.list && response.list.length > 0) {
        response.list.map((item, index) => {

            if (item.weather && item.weather.length > 0) {
                if (index === 0) {
                    todayDescription = item.weather[0].description;
                    todayMain = item.weather[0].main;
                    todayIcon = item.weather[0].icon;

                }
                else if (index === 1) {
                    tomorrowDescription = item.weather[0].description;
                    tomorrowMain = item.weather[0].main;
                    tomorrowIcon = item.weather[0].icon;
                }
            }
        })
    }

    return { plant_id: plant_id, info: { todayDescription, todayMain, todayIcon, tomorrowDescription, tomorrowMain, tomorrowIcon } }
}
/**
 * get Projects
 */
export function getForcastWeatherInfo() {
    return (dispatch) => {
        let results = [];
        if (data && data["plantListForWeather"] && data["plantListForWeather"].length > 0) {
            data["plantListForWeather"].map((item, index) => {
                service.getForcastWeatherInfo(item.lat, item.long).then(response => {
                    if (response) {
                        //results.push(getWatherinfo(item.plant_id, response));
                       // dispatch({ type: ADD_WEATHER_INFO_BY_PLANTS, data: getWatherinfo(item.plant_id, response) })
                    }
                }, error => {
                   // results.push({ plant_id: item.plant_id, responseData: null })
                   // dispatch({ type: ADD_WEATHER_INFO_BY_PLANTS, data: null})
                })
            })
        }

    }
}

