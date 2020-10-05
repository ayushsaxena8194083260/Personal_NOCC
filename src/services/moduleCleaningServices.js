import {HttpClient} from "./httpClient";


let httpClient = new HttpClient();

export default {

    getModuleCleaningDataByDate(data){
        return httpClient.post('moduleCleaningData/moduledatadetails/',data);
    },

    createOrUpdateModuleCleaning(moduleCleaning) {
        return httpClient.post('moduleCleaningData/',moduleCleaning);
    },
    

    deleteModuleCleaning(id){
        return httpClient.delete('moduleCleaningData/id/'+id);
    },
    
    getPlantByType(plantType){
        const userDetails = JSON.parse(localStorage.getItem('isAuthenticated'));
        let userId = userDetails.userId 
        return httpClient.get('plants/planttype/'+plantType + "/" +userId);    },
    
}