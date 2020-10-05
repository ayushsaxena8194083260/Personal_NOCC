import {HttpClient} from "./httpClient";


let httpClient = new HttpClient();  

export default {
    getUnassignedTickets(){
        return httpClient.get('fielduserreport/unassigndtickets')
    },
    getHubBasedTickets(){
        return httpClient.get('fielduserreport/hubbasedtickets')
    },
    getUserTicketDetails(){
        return httpClient.get('fielduserreport/userticketdetails')
    },
     getHubBasedTicketsWithDate(data) {
         return httpClient.post('fielduserreport/hubbasedticketswithdate',data);
    },
    getUserTicketDetailsWithDateanduserId(data){
        return httpClient.post('fielduserreport/userticketdetailswithdateanduserid',data);
    },
    getUnassignedTickets() {
        return httpClient.get('fielduserreport/unassigndtickets');
    },
    getUunassignedTicketsOfPlant() {
        return httpClient.get('fielduserreport/unassigndticketsplant');
    },
    getUnassignedTicketsOfPlantOnType(data) {
        return httpClient.post('fielduserreport/unassignedticketsofplantontype',data);
    },
    createUpdateUserTicket(data){
        return httpClient.post('fielduserreport/userticketentity/',data);
    },
    getUserOpenClosedTicketDetailsWithDate(data){
        return httpClient.post('fielduserreport/useropenclosedticketdate',data);
    },
    getHubLatLongs(hubId) {
        return httpClient.get('fielduserreport/hubId/'+hubId);
    },
    getUnassignedTickets(id) {
        return httpClient.get('fielduserreport/userId/'+id);
    },
    getUserTicketDetailsWithDate(data) {
        return httpClient.post('fielduserreport/userticketdetailswithdate',data);
    },
    getHubPlantDetailsWithDate(data) {
        return httpClient.post('fielduserreport/hubplantdetailswithdate',data);
    },getPlantBasedTicketDetailsWithDate(data) {
        return httpClient.post('fielduserreport/plantbasedticketsdate',data);
    },
    getPlantBasedTicketDetails(id) {
        return httpClient.get('fielduserreport/plantbased/plantId/'+id);
    },
    createOrUpdatePageGroup(pageGroup) {
        return httpClient.post('pageGroup/',pageGroup);
    },
    deleteGraphGroup(id){
        return httpClient.delete('settings/graphGroupId/'+id);
    },
    getALLHubs(id) {
        return httpClient.get('fielduserreport/allhubs');
    },
//userPerformance
    getUserInfoWithDateQuarterly(data){
        return httpClient.post('fielduserreport/userinfowithdatequarterly',data)
    },
    getUserInfoWithDateHalfYearly(data){
        return httpClient.post('fielduserreport/userinfowithdatehalfyearly',data)
    },
    getUserInfoWithDateYearly(data){
        return httpClient.post('fielduserreport/userinfowithdateyearly',data)
    },
    getPlantsFromUserId(data){
        return httpClient.get('fielduserreport/userId/',data)
    }
}