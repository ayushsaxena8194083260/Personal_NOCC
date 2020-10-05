import {HttpClient} from "./httpClient";


let httpClient = new HttpClient();

export default {
    getAllGraphs(){
        return httpClient.get('graph/')
    },getHubBasedTickets(){
        return httpClient.get('fielduserreport/hubbasedtickets')
    },getUserTicketDetails(){
        return httpClient.get('fielduserreport/userticketdetails')
    },getProvisionalReportGeneration(data){
        return httpClient.post('reports/getprovisionalreport',data);
    },getBudgetExcelExport(id) {
        return httpClient.get('reports/budget/plantId/'+id);
    },getAllModuleCleaning(data){
        return httpClient.post('reports/getallmodulecleaning',data);
    },getForecastReport(data){
        return httpClient.post('reports/getforecastreport',data);
    },getSoilingAnalysisReport(data){
        return httpClient.post('reports/getsoilinganalysisreport',data);
    },getLenderExcelExport(id) {
        return httpClient.get('reports/lender/plantId/'+id);
    },getMergedExcelReport(data){
        return httpClient.post('reports/mergedreports/',data);
    },getDeviationReport(data){
        return httpClient.post('reports/deviationreport/',data);
    },getCSMEXTTDReportForAllPlant(data){
        return httpClient.post('reports/getcsmexttdreportforallplant/',data);
    },getForecastDashboard(data){
        return httpClient.post('forecastcnt/getforecastdashboard/',data)
    }
}