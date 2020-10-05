import {HttpClient} from "./httpClient";


let httpClient = new HttpClient();

export default {

    getAllStrings() {
        return httpClient.get('strings/');
    }

    
}