import { HttpClient } from "./httpClient";


let httpClient = new HttpClient();

export default {

    getForcastWeatherInfo(latitude, longtitude) {
        return httpClient.get('http://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longtitude + '&units=imperial&APPID=e9b433f7ed306860db69ea25723a5f48');
    },
    getDashbaordInfo() {
        return httpClient.get('dashboard');
    },
    getHubDashbaordInfo() {
        return httpClient.get('hubdashboard');
    },

}