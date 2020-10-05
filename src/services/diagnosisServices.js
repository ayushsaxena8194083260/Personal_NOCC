import {HttpClient} from "./httpClient";


let httpClient = new HttpClient();

export default {

    getAllGraphNameByPageID(pageID) {
        return httpClient.get('diagnosis/pageGroupId/'+ pageID);
    }
   
}