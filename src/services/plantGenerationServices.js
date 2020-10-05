import {HttpClient} from "./httpClient";


let httpClient = new HttpClient();

export default {

    createOrUpdatePlantGen(plant) {
        return httpClient.post('plantgen/',plant);
    },
    getCurrencies(){
        return httpClient.get('currency/');
    },
    getDailyPlantActualGeneration(plant) {
        return httpClient.post('plantactualgeneration/dailygeneration/',plant);
    },
    getDailyPlantActualGenerationMonthly(plant) {
        return httpClient.post('plantactualgeneration/monthlygeneration/',plant);
    },
    getMFMReading(plant) {
        return httpClient.post('generalquery/mfmreading/',plant);
    },
    getMFMReadingUI(plant) {
        return httpClient.post('generalquery/mfmreading/',plant);
    },
    getAMRReportData(plant) {
        return httpClient.post('generalquery/amrmeter/',plant);
    },
    getAMRMeter(plant) {
        return httpClient.post('generalquery/amrmeter/',plant);
    },
    getWeatherStationDetailsByPlantIds(plant){
        return httpClient.post('generalquery/amrweatherdetail/',plant);
    },
    getAMRmeterdatabyDate(data){
        return httpClient.post('generalquery/amrmeterdata/',data);
    },
    deletePlantGen(id){
        return httpClient.delete('plantgen/plantGenerationId/'+id);
    }

}