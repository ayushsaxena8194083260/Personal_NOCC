import { HttpClient } from "./httpClient";
let httpClient = new HttpClient();

export default {
    getAllPerformanceLosses() {
        return httpClient.get('');
    },
    createOrUpdatePerformanceLoss(data) {
        return httpClient.post('perfloss/',data);
    },
    getPerformanceLossById(ID) {
        return httpClient.get('perfloss/id/' + ID);
    },
    deletePerformanceLossByID(ID) {
        return httpClient.get('perfloss/id/' + ID);
    },
    getPerformanceLossByPlantIdsPeriod(data) {
        return httpClient.post('perfloss/perflossdata/' , data);
    },
    getPerformanceLossByPerfId(plant_id) {
        return httpClient.get('perfloss/plant_id/' + plant_id);
    },
}