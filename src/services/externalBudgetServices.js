import { HttpClient } from "./httpClient";

let httpClient = new HttpClient();

export default {

    getExternalBudgetByYear(data) {
        return httpClient.post('extbudget/externalbudgetbyyear/',data);
    },


    createOrUpdateExternalBudget(data) {
        return httpClient.post('extbudget/', data);
    },

    getBudgetById(ID) {
        return httpClient.get('extbudget/id/' + ID);
    },

    deleteExternalBudget(ID) {
        return httpClient.delete('extbudget/id/' + ID);
    },

    getBudgetByPlantId(plant_id) {
        return httpClient.get('extbudget/plant_id/' + plant_id);
    },
    getPlantByType(plantType){
        const userDetails = JSON.parse(localStorage.getItem('isAuthenticated'));
        let userId = userDetails.userId 
        return httpClient.get('plants/planttype/'+plantType + "/" +userId);
    },

}
