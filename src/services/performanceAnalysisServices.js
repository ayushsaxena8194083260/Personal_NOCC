import { HttpClient } from "./httpClient";
let httpClient = new HttpClient();

export default {
    getAllDataforPerformance(data) {
        return httpClient.post('generalquery/getalldataforperformance/' , data);
    },
    getAllDataforPerformance2(data) {
        return httpClient.post('generalquery/getalldataforperformance2/',  data);
    },
}