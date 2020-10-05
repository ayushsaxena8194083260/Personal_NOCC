import {HttpClient} from "./httpClient";


let httpClient = new HttpClient();

export default {

    createOrUpdatePlantTiltSchdeule(plant_tilt_schedule) {
        return httpClient.post('planttiltschdeule/',plant_tilt_schedule);
    },

    getAllPlantTiltSchedule(plant_type,plant_name) {
        return httpClient.get('planttiltschdeule/');
    },

    deletePlantTiltSchdeule(id) {
        return httpClient.delete('planttiltschdeule/plantTiltScheduleId/'+id);
    },

    getTiltScheduleDataByDatePlantId(tiltScheduleData) {
        return httpClient.post('planttiltschdeule/tiltschedulebyPlantIdDate/',tiltScheduleData);
    }
}