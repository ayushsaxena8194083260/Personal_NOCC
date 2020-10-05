import { HttpClient } from "./httpClient";

let httpClient = new HttpClient();

export default {

    getAllPenaltys(data) {
        return httpClient.post('penalty/penaltybyyear', data);
    },


    createOrUpdatePenalty(data) {
        return httpClient.post('penalty/', data);
    },

    getPenaltyById(ID) {
        return httpClient.get('penalty/id/' + ID);
    },

    deletePenalty(ID) {
        return httpClient.delete('penalty/id/' + ID);
    },

    getPenaltyByPenaltyDataID(id) {
        return httpClient.get('penalty/penalty_data_id/' + id);
    },

}
