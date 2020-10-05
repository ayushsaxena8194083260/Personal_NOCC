import {HttpClient} from "./httpClient";


let httpClient = new HttpClient();

export default {

    getPmTaskByPmActivityId(activityId) {
        return httpClient.get('preventivemaintainance/pmTask/'+activityId);
    },

    getPMUserStatusDetailsByActivityDatePlantId(data) {
        return httpClient.post('preventivemaintainance/pmuserstatusByActivityDatePlantId/',data);
    },

    getPMRemarkStatusByPMUserStatusId(pmUserStatusId) {
        return httpClient.get('preventivemaintainance/pmRemarkStatusByPMUserStatusId/'+pmUserStatusId);
    },
    
    getPMTaskGroupByPmActivityId(pmTaskActivityId) {
        return httpClient.get('preventivemaintainance/pmTaskGroupByPmActivityId/'+pmTaskActivityId);
    }
}