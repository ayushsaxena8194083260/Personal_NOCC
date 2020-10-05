import { HttpClient } from "./httpClient";



let httpClient = new HttpClient();

export default {

    getAllPlants() {
        const userDetails = JSON.parse(localStorage.getItem('isAuthenticated'));
        let userId = userDetails.userId 
        return httpClient.get('plants/'+userId);
    },
    getAllPlants2() {
        const userDetails = JSON.parse(localStorage.getItem('isAuthenticated'));
        let userId = userDetails.userId 
        return httpClient.get('plants/');
    },
    createOrUpdatePlant(plant) {
        return httpClient.post('plants/', plant);
    },

    deletePlant(id) {
        return httpClient.delete('plants/id/' + id);
    },

    getPlantByType(plantType) {
        const userDetails = JSON.parse(localStorage.getItem('isAuthenticated'));
        let userId = userDetails.userId 
        return httpClient.get('plants/planttype/'+plantType + "/" +userId);    },

    getProjectNames(plantType){
        return httpClient.get('projects/projecttypes/'+plantType);
    }
}