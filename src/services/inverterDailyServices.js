import {HttpClient} from "./httpClient";


let httpClient = new HttpClient();

export default {

    getInvertersByPlantId(data){
        return httpClient.post('inverterdailydata/inverterbyplantids/',data);
    },

    getInverterByPlantId(plantId){
        return httpClient.get('inverterdailydata/plantid/'+plantId);
    },
    getAllInverters() {
        return httpClient.get('inverterdailydata/allInverters/');
    },
    getinverterDailyDetailsWithPlantIdsAndDate(data){
        return httpClient.post('inverterdailydata/dailydetailswithPlantIds/',data);
    },

    createOrUpdateInverterDailyData(inverterDaily) {
        return httpClient.post('inverterdailydata/',inverterDaily);
    },
    
    getPlantByType(plantType){
        const userDetails = JSON.parse(localStorage.getItem('isAuthenticated'));
        let userId = userDetails.userId 
        return httpClient.get('plants/planttype/'+plantType + "/" +userId);    },

    deleteInverterDailyData(id){
        return httpClient.delete('inverterdailydata/id/'+id);
    }
    
}