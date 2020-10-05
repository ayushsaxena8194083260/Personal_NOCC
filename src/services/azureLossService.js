import {HttpClient} from "./httpClient";


let httpClient = new HttpClient();

export default {

    getAllPlants() {
        return httpClient.get('azureloss/');
    },

    getProjectNames(plantType){
        return httpClient.get('projects/projecttypes/'+plantType);
    },

    getPlantByProjectId(projectId){
        return httpClient.get('plants/plantbyprojectid/'+projectId);
    },

    getPlantByType(plantType){
        const userDetails = JSON.parse(localStorage.getItem('isAuthenticated'));
        let userId = userDetails.userId 
        return httpClient.get('plants/planttype/'+plantType  + "/" +userId);
    },

    getPlantByType(plantType){
        const userDetails = JSON.parse(localStorage.getItem('isAuthenticated'));
        let userId = userDetails.userId 
        return httpClient.get('/plants/planttype/'+plantType + "/" +userId);
    },

    getAzureLossByPlantId(data){
        return httpClient.post('azurelossesA/azurelossplantidyear/',data);
    },

    createOrUpdateAzureLoss(azureLoss) {
        return httpClient.post('azureloss/',azureLoss);
    },
    
    deleteAzureLoss(azureLoss_id){
        return httpClient.delete('azureloss/id/'+azureLoss_id);
    }
}