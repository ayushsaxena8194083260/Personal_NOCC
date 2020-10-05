import {HttpClient} from "./httpClient";


let httpClient = new HttpClient();

export default {

   getPlantHistoryByPlantId(id) {
        return httpClient.get('planthist/plantId/'+id);
    }
}