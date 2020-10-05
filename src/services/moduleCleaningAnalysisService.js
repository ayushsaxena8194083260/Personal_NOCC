import {HttpClient} from "./httpClient";


let httpClient = new HttpClient();

export default {

    createOrUpdateModuleCleaningAnalysis(plant_cleaningAnalysis) {
        return httpClient.post('moduleCleaningAnalysis/',plant_cleaningAnalysis);
    },

    getModuleCleaningByPlantId(plant_id,plant_name,plant_type) {
        return httpClient.get('moduleCleaningAnalysis/plant_id/'+plant_id);
    },
    
    getModuleCleaningAnalysisDataByDate(data){
        return httpClient.post('moduleCleaningAnalysis/moduleanalysisdetails',data);
    },

    deleteModuleCleaningAnalysis(id){
        return httpClient.delete('moduleCleaningData/id/'+id);
    },

    getPlantByType(plantType){
        const userDetails = JSON.parse(localStorage.getItem('isAuthenticated'));
        let userId = userDetails.userId 
        return httpClient.get('plants/planttype/'+plantType + "/" +userId);    }

    // createOrUpdateModuleCleaning(moduleCleaning) {
    //     return httpClient.post('moduleCleaningData/',moduleCleaning);
    // }
    
}