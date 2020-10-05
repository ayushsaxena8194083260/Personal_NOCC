import { HttpClient } from "./httpClient";
import { getPlantByType } from "../actions/PlantFaultDataActions";
import { getPlantJMRById } from "../actions/jmrMeterActions";
import { getPlantByJMRId } from "../actions/jmrMeterActions";
import { deletePlantJmr } from "../actions/jmrMeterActions";

let httpClient = new HttpClient();

export default {

    getAllPlantJMR() {
        return httpClient.get('plantJmr/');
    },

    getPlantJmrById(id) {
        return httpClient.post('plantJmr/id/' + id);
    },

    getPlantJMRById(jmrId) {
        return httpClient.getAllPlantJMR('plantJmr/plantjmrid/' + jmrId);
    },
    getPlantByJMRId(jmrId){
        console.log('jmrId',jmrId)
        return httpClient.get('plantJmr/jmrId/'+jmrId);
    },
    createOrUpdatePlantJmrData(plantJmr) {
        return httpClient.post('plantJmr/',plantJmr);
    },

    getPlantJMRByPlantIdDate(jmrMeter){
        return httpClient.post('plantJmr/jmrdataplantdate/',jmrMeter);
    },

    getPlantByType(plantType){
        const userDetails = JSON.parse(localStorage.getItem('isAuthenticated'));
        let userId = userDetails.userId 
        return httpClient.get('plants/planttype/'+plantType + "/" +userId);    },

    deletePlantJmr(id) {
        return httpClient.delete('/plantJmr/jmrId/' + id);
    }

}
