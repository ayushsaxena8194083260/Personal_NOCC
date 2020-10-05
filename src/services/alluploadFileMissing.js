import { HttpClient } from "./httpClient";

let httpClient = new HttpClient();

export default {
    uploadWeatherMissingFile(Data) {
        return httpClient.get('https://api.imgur.com/3/gallery/',Data);
    },


    
}