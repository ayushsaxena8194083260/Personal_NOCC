import {HttpClient} from "./httpClient";


let httpClient = new HttpClient();

export default {

    getStringsBySMUId(smu_id) {
        return httpClient.get('strings/smuId/'+smu_id);
    },

    createOrUpdateString(stringDO) {
        return httpClient.post('strings/',stringDO);
    },

    deleteString(stringId) {
        return httpClient.delete('strings/stringId/'+stringId);
    }

    
}