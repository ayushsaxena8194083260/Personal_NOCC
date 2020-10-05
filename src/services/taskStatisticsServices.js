import { HttpClient } from "./httpClient";
let httpClient = new HttpClient();

export default {

    getAllTaskStatistics() {
        return httpClient.get('generalquery/taskstatistics/');
    },

  
}