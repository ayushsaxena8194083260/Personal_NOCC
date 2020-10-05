import {HttpClient} from "./httpClient";


let httpClient = new HttpClient();

export default {
    viewAllTimeSlotSetting(){
        return httpClient.get('forecastcnt/viewalltimeslotsetting')
    },createOrUpdateTimeSlotSetting(data){
        return httpClient.post('/forecastcnt/createorupdatetimeslotsetting/',data)
    },deleteTimeSlotSetting(id){
        return httpClient.delete('forecastcnt/timeSlotId/'+id);
    },viewFormulaSettingCustom(){
        return httpClient.get('forecastcnt/viewformulasettingcustom')
    },createOrUpdateFormulaSetting(data){
        return httpClient.post('forecastcnt/createorupdateformulasetting',data)
    },deleteFormulaSetting(id){
        return httpClient.delete('forecastcnt/formulaeId/'+id);
    },getForecastDashboard(data){
        return httpClient.post('forecastcnt/getforecastdashboard',data)
    },CreateorupdateForecastcalculation(data){
        return httpClient.post('forecastcnt/',data)
    }

}