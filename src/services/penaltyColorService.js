import {HttpClient} from "./httpClient";


let httpClient = new HttpClient();

export default {

    getAllPenaltyColours() {
        return httpClient.get('penaltycol/');
    },

    createOrUpdatePenaltyColour(penaltycolour) {
        return httpClient.post('penaltycol/',penaltycolour);
    },

   
}