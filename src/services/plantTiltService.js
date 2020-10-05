import {HttpClient} from "./httpClient";


let httpClient = new HttpClient();

export default {

    createOrUpdatePlantTilt(plant_tilt) {
        return httpClient.post('planttilt/',plant_tilt);
    },

    getPlantTiltByPlantId(plant_id,plant_name,plant_type) {
        return httpClient.get('planttilt/plantId/'+plant_id);
    },

    deletePlantTilt(tiltId) {
        return httpClient.delete('planttilt/id/'+tiltId);
    },

    getTiltScheduleByDatePlantIds(plantTiltData) {
        return httpClient.post('planttilt/tiltbyPlantIdDate/',plantTiltData);
    }

    
}