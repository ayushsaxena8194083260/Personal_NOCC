import {HttpClient} from "./httpClient";


let httpClient = new HttpClient();

export default {

    getAllAOPBudgetDetailsData() {
        return httpClient.get('aopbudget/');
    },

    createOrUpdateAOPBudgetDetailData(aopBudgetDetail) {
        return httpClient.post('aopbudget/',aopBudgetDetail);
    },
    getLenderDataByYearPlantIds(yearPlantIds) {
        return httpClient.post('lenderdetail/lenderDetailsbyYearPlantIds/',yearPlantIds);
    },


}