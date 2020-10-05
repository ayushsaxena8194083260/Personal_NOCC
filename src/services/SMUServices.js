import {HttpClient} from "./httpClient";


let httpClient = new HttpClient();

export default {

    getSMUBySMUId(smu_id) {
        return httpClient.get('smu/smuId/'+smu_id);
    },

    getSMUByInverterId(inv_id) {
        return httpClient.get('smu/inverterId/'+inv_id);
    },
    
    getAllSMU() {
        return httpClient.get('smu/allsmu/');
    },
    createOrUpdateSmu(smuDetails) {
        return httpClient.post('smu/',smuDetails);
    },

    deleteSMU(id) {
        return httpClient.delete('smu/smuId/'+id);
    }
    
}