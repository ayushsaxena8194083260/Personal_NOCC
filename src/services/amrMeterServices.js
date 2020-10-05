import { HttpClient } from "./httpClient";

let httpClient = new HttpClient();

export default {

    getAllAMRMeter() {
        return httpClient.get('getAllAMRMeter/');
    },


    
}
