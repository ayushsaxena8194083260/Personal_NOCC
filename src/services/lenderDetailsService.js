import {HttpClient} from "./httpClient";


let httpClient = new HttpClient();

export default {

    getLenderDetailsByPlantId(data){
        return httpClient.post('lenderDetails/plantidsyear/',data);
    },

    getAllLenderDetailsData(){
        return httpClient.get('lenderdetail/');
    },

    createOrUpdateLenderDetails(lenderDetails) {
        return httpClient.post('lenderdetail/',lenderDetails);
    },
    
    deleteLenderDetailData(lenderDetails_id){
        return httpClient.delete('lenderdetail/id/'+lenderDetails_id);
    },

    getLenderDataByYearPlantIds(yearPlantIds) {
        return httpClient.post('lenderdetail/lenderDetailsbyYearPlantIds/',yearPlantIds);
    },

    getLenderDataByPlantIdMonthYear(yearMonthPlantId){
        return httpClient.post('lenderdetail/plantIdMonthYear/',yearMonthPlantId);
    }
}