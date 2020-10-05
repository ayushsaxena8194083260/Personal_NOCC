import { HttpClient } from "./httpClient";

let httpClient = new HttpClient();

export default {

    getPageDetailAndGraphDetail(pageID) {
        return httpClient.post('analytics/pageGroupId',pageID);
    },


    
}