import {HttpClient} from "./httpClient";


let httpClient = new HttpClient();

export default {

    getWeatherStationByPlantId(plantId){
        return httpClient.get('weatherstation/plant_id/'+plantId);
    },    
    getWeatherDailyDetailsWithPlantIds(data){
        return httpClient.post('weatherdailydata/dailydetailswithPlantIds/',data);
    },
    getWeatherDailyDetails(data){
        return httpClient.post('weatherstation/dailydetails/',data);
    },
    getMissingWeatherDetails(data){
        return httpClient.post('weatherstation/missingweather/',data);
    },
    getWeatherDailyDetails1(data) {
        return httpClient.post('weatherstation/missingweatherdetails/',data);
    }
}