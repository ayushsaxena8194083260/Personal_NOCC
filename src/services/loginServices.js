import {HttpClient} from "./httpClient";


let httpClient = new HttpClient();

export default {
    validateUser(data){
        return httpClient.post('user/',data);
    }
}