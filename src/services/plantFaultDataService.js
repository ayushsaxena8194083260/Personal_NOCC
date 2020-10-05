import {HttpClient} from "./httpClient";


let httpClient = new HttpClient();

export default {

    getAllPlants() {
        return httpClient.get('plantfaults/');
    },

    getProjectNames(plantType){
        return httpClient.get('projects/projecttypes/'+plantType);
    },

    getProjectsByPlantType(plantType){
        return httpClient.get('projects/projecttypes/'+plantType);
    },

    getPlantByProjectId(projectId){
        return httpClient.get('plants/plantbyprojectid/'+projectId);
    },

    getPlantByType(plantType){
        const userDetails = JSON.parse(localStorage.getItem('isAuthenticated'));
        let userId = userDetails.userId 
        return httpClient.get('plants/planttype/'+plantType + "/" +userId);    },

    getPlantByType(plantType){
        const userDetails = JSON.parse(localStorage.getItem('isAuthenticated'));
        let userId = userDetails.userId 
        return httpClient.get('plants/planttype/'+plantType + "/" +userId);    },

    getPlantFaultDataByPlantId(data){
        return httpClient.post('plantfaults/plantfaultsidyear/',data);
    },

    createOrUpdatePlantFaultData(plantFaultData) {
        return httpClient.post('plantfaults/',plantFaultData);
    },

    getPlantFaultIncidentData(fault_id) {
        return httpClient.get('incidentdata/faultId/'+ fault_id);
    },
    getIncidentDataByPlantIdAndFaultId(data) {
        return httpClient.post('incidentdata/plantfaultsidyear/', data);
    },
    createOrUpdatePlantFaultIncidentData(plantFaultIncident) {
        return httpClient.post('incidentdata/',plantFaultIncident);
    },
    
    deletePlantFaultData(fault_id){
        return httpClient.delete('plantfaults/faultId/'+fault_id);
    }
}