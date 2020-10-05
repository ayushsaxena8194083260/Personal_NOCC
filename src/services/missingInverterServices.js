import {HttpClient} from "./httpClient";


let httpClient = new HttpClient();

export default {

    getInverterByPlantId(plantId){
        return httpClient.get('inverter/plant_id/'+plantId);
    },

    getInverterDailyDetails(data){
        return httpClient.post('inverter/dailydetails/',data);
    },
    getMissingInverterDetails(data){
        return httpClient.post('inverter/missinginverter/',data);
    },
    getInverterDailyDetails1(data) {
        return httpClient.post('inverter/missinginverterdetails/',data);
    }
    // createOrUpdateInverterDailyData(inverterDaily) {
    //     return httpClient.post('inverterdailydata/',inverterDaily);
    // },
        
}