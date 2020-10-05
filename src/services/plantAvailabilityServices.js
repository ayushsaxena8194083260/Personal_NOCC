import { HttpClient } from "./httpClient";
let httpClient = new HttpClient();

export default {
    getPlantAvailabilityByPlantAvailabilityId(PlantAvailabilityId) {
        return httpClient.get('plantavailability/plantavailabilityid/' + PlantAvailabilityId);
    },
    getPlantAvailabilityByPlantId(PlantIds) {
        return httpClient.post('plantavailability/plantid/',PlantIds);
    },
}