import {HttpClient} from "./httpClient";


let httpClient = new HttpClient();

export default {

    getAllPlants() {
        return httpClient.get('plantfaults/');
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
        return httpClient.get('plants/planttype/'+plantType + "/" +userId);    },

    getGridFailureDataByPlantId(data){
        return httpClient.post('gridfailure/gridfailureidyear/',data);
    },

    createOrUpdateGridFailureData(gridFailure) {
        return httpClient.post('gridfailure/',gridFailure);
    },
    
    deleteGridFailureData(id){
        return httpClient.delete('gridfailure/id/'+id);
    }
    
}