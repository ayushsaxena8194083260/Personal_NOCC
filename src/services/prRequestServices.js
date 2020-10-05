import {HttpClient} from "./httpClient";

let httpClient = new HttpClient();

export default {
    getAllPrRequest(){
        return httpClient.get('prrequest/allprrequest')
    },
    getPrRequestId(prRequestId ){
        return httpClient.get('/prrequest/prRequestId',prRequestId );
    },
    createUpdatePrRequest(prData){
        return httpClient.post('/prrequest/addeditprrequest',prData)
    },
    getPrRequestByPlantAndDate(data){
        return httpClient.post('/prrequest/prrequest',data)
    }
}