import {HttpClient} from "./httpClient";


let httpClient = new HttpClient();

export default {

    getGraphsSettings() {
        return httpClient.get('graph/');
    },
    getAllHubUsers() {
        return httpClient.get('settings/getallHubUsers/');
    },
    getAllGraphGroupData() {
        return httpClient.get('graphgroup/');
    },

    renderPageDetails(pageId) {
        return httpClient.get('settings/page?pageGroupId=' + pageId);
    },
    renderAllUserDetails() {
        return httpClient.get('settings/users');
    },
    renderAllRoleDetails() {
        return httpClient.get('settings/roles');
    },
    renderHubMasterDetails() {
        return httpClient.get('settings/hubs');
    },
    renderProjectDetails() {
        return httpClient.get('settings/projects');
    },
    renderMobileSettingDetails() {
        return httpClient.get('settings/mobilesetting');
    },
    renderCleaningConfig(plantIds) {
        return httpClient.post('settings/cleaningconfig',plantIds);
    },

    getPageGroupSettings(){
        return httpClient.get('pageGroup/');
    },

    getMenuPermissionByRoleId(roleId) {
        return httpClient.get('settings/menuPermissionByRoleId/'+roleId);
    },
    getUserPlantByUserId(userId) {
        return httpClient.get('settings/getUserPlant/'+userId);
    },
    createOrUpdatePageGroup(pageGroup) {
        return httpClient.post('pageGroup/',pageGroup);
    },
    createUpdateHubUser(data) {
        return httpClient.post('settings/addHubUser/',data);
    },
    getInverterConfiguration(plantIds) {
        return httpClient.post('settings/inverterconfig',plantIds);
    },
    getWeatherConfiguration(plantIds) {
        return httpClient.post('settings/weatherconfig',plantIds);
    },
    getMFMConfiguration(plantIds) {
        return httpClient.post('settings/mfmconfig',plantIds);
    },
    getInverterCSVMappingConfiguration(plantIds) {
        return httpClient.post('settings/invertercsvmapping',plantIds);
    },
    getWeatherCSVMappingConfiguration(plantIds) {
        return httpClient.post('settings/weathercsvmapping',plantIds);
    },
    getMFMCSVMappingConfiguration(plantIds) {
        return httpClient.post('settings/mfmcsvmapping',plantIds);
    },
    getFTPPlantMappingWithType(plantIds) {
        return httpClient.post('settings/ftpmapping',plantIds);
    },
    getWeatherStationDevice(plantIds) {
        return httpClient.post('settings/weatherstationdevice',plantIds);
    },
    getErrorCodesSettings(isPublished) {
        return httpClient.get('settings/errorcode?isPublished='+isPublished);
    },
    getPlantByType(plantType){
        const userDetails = JSON.parse(localStorage.getItem('isAuthenticated'));
        let userId = userDetails.userId 
        return httpClient.get('plants/planttype/'+plantType + "/" +userId);
        },
    getForecastConfigsSettings() {
        return httpClient.get('settings/forecastconfig/');
    },
    getalladapters() {
        return httpClient.get('settings/getalladapters/');
    },
    createUpdateForecastConfig(forecastconfig) {
        return httpClient.post('settings/addforecastsetting/',forecastconfig)
    },
    renderGraphGroupDetails() {
        return httpClient.get('settings/graphgrp/');
    }, 
    createUpdateGraphGroup(graphGroup) {
        return httpClient.post('settings/addEditGraphGroup/',graphGroup)
    },
    createUpdateGraph(data) {
        return httpClient.post('settings/addeditgraph/',data);
    },
    deleteGraphGroup(id){
        return httpClient.delete('settings/graphGroupId/'+id);
    },
    renderAlertUserDetails(id) {
        return httpClient.get('settings/alertId/'+id);
    },
    deleteCleaningAlertUser(id){
        return httpClient.delete('settings/alertUserId/'+id);
    },
    getAllCleaningConfig() {
        return httpClient.get('settings/getallcleaningconfig/');
    },
    deleteInverter(id){
        return httpClient.delete('settings/inverterId/'+id);
    },deleteWeather(id){
        return httpClient.delete('settings/weatherStationId/'+id);
    },createUpdateWeather(wethConf) {
        return httpClient.post('settings/addeditweather',wethConf)
    },createUpdateInverter(invtConf) {
        return httpClient.post('settings/addeditinverter/',invtConf)
    },createUpdateCSVInverterMap(data) {
        return httpClient.post('settings/addeditcsvinvmap/',data)
    },deleteMFMConfig(id){
        return httpClient.delete('settings/mfmId/'+id);
    },createUpdateMFM(mfmConf) {
        return httpClient.post('settings/addeditmfm/',mfmConf)
    },deleteCSVInverterMap(id){
        return httpClient.delete('settings/csvInverterId/'+id);
    },createUpdateFTPMappings(data) {
        return httpClient.post('settings/addeditftpmapping/',data)
    },createUpdateCSVWeatherMap(data) {
        return httpClient.post('settings/addeditcsvweathermap/',data)
    },deleteCSVMFMMap(id){
        return httpClient.delete('settings/csvMfmMapId/'+id);
    },deleteWeatherDevice(id){
        return httpClient.delete('settings/weatherDeviceId/'+id);
    },deleteFTPMappings(id){
        return httpClient.delete('settings/adapterPlantId/'+id);
    },createUpdateCSVMFMMap(data) {
        return httpClient.post('settings/addeditcsvmfmmap/',data)
    },createUpdateWeatherDevice(data) {
        return httpClient.post('settings/addeditweatherDevice/',data)
    },createUpdateHubMaster(data) {
        return httpClient.post('settings/addEditHubMaster/',data)
    },deleteHubMaster(id){
        return httpClient.delete('settings/hubId/'+id);
    },createUpdateProjectDetails(data) {
        return httpClient.post('settings/addEditProjects/',data)
    },deleteProject(id){
        return httpClient.delete('settings/projectId/'+id);
    },createUpdateUser(data){
        return httpClient.post('/settings/addEditusers/',data)
    },
    deleteUser(userId){
        console.log(userId,'userId')
        return httpClient.delete('/settings/userId/'+userId)
    },createUpdateRole(data){
        return httpClient.post('settings/addEditRole/',data);
    },
    createUpdateMobileSettings(data){
        return httpClient.post('/settings/addEditMobileSetting/',data)
    },deletePRRequest(id){
        return httpClient.delete('settings/prRequestId/'+id);
    },
    renderPRRequestDetails() {
        return httpClient.get('settings/prrequest/');
    },deleteCleaningConfig(id){
        return httpClient.delete('settings/id/'+id);
    },createUpdateCleaningConfig(data){
        return httpClient.post('/settings/addeditcleaningconfig/',data)
    },getAllCleaningAlertUser(){
        return httpClient.get('settings/getallcleaningAlertUser/');
    },deleteCSVWeatherMap(id){
        return httpClient.delete('settings/csvWeatherId/'+id);
    },
    getPerformanceLossesByPlantIdsDate(data){
        return httpClient.post('/settings/perflossesdata/',data)
    }, createUpdateCleaningAlertUser(data){
        return httpClient.post('settings/addeditcleaningAlertUser/',data)
    },

    getYValueByGraphId(graphId, yAxis) {
        return httpClient.get('settings/getYValue/'+graphId+'/'+yAxis);
    },

    createUpdateGraphYValue(data) {
        return httpClient.post('settings/addGrapYValue/',data)
    },

    renderGraphDetailsByPageId(pageId) {
        return httpClient.get('settings/graphByPageId/'+pageId);
    },

    createUpdatePage(pageDetails) {
        return httpClient.post('settings/addeditpage/',pageDetails);
    },

    createUpdatePageGraph(pageGraphDetails) {
        return httpClient.post('settings/addEditPageGraph/',pageGraphDetails);
    },

    deletePageGraphId(pageGraphId) {
        return httpClient.delete('settings//pageGraphId/'+pageGraphId);
    },

    deleteYValueId(yValueId) {
        return httpClient.delete('settings/deleteYValue/'+yValueId);
    }
    
}