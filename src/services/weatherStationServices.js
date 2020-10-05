import {HttpClient} from "./httpClient";


let httpClient = new HttpClient();

export default {

    /*getAllPlants() {
        return httpClient.get('plantfaults/');
    },

    getProjectNames(plantType){
        return httpClient.get('projects/projecttypes/'+plantType);
    },

    getPlantByProjectId(projectId){
        return httpClient.get('plants/plantbyprojectid/'+projectId);
    },

    getWeatherStationNameByPlantId(plantId){
        return httpClient.get('plants/plantbyprojectid/'+plantId);
    },


    getGridFailureDataByPlantId(data){
        return httpClient.post('gridfailure/gridfailureidyear/',data);
    },*/

    getWeatherStationByPlantId(data){
        return httpClient.post('weatherdailydata/weatherstation/plantId/',data);
    },

    getWeatherDailyDetailsWithPlantIds(data){
        return httpClient.post('weatherdailydata/dailydetailswithPlantIds/',data);
    },

    createOrUpdateWeatherStationDailyData(weatherStation) {
        return httpClient.post('weatherdailydata/',weatherStation);
    },
    
    getPlantByType(plantType){
        const userDetails = JSON.parse(localStorage.getItem('isAuthenticated'));
        let userId = userDetails.userId 
        return httpClient.get('plants/planttype/'+plantType + "/" +userId);    },

    deleteWeatherStationDailyData(id){
        return httpClient.delete('weatherdailydata/weatherDailyDataId/'+id);
    },
    getAllWeatherStation() {
        return httpClient.get('weatherstation/weatherstation/');
    }
}