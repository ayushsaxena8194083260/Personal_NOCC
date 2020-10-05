import {
    GET_GRAPHS_SETTINGS,
    GET_PAGE_GROUP_SETTINGS,
    POST_PAGE_GROUP_DETAILS,
    GET_PLANT_TYPE,
    CLEAR_PLANT_MAPPING,
    GET_ALERTUSER_SETTINGS,
    GET_DD_ALERTUSER_SETTINGS,
    GET_GRAPH_GROUPS_SETTINGS,
    GET_ERROR_CODES_SETTINGS,
    GET_MOBILE_SETTINGS_SETTINGS,
    GET_FORECASTCONFIGS_SETTINGS,
    GET_PR_USER_MANAGEMENT_SETTINGS,
    GET_USER_ROLES_SETTINGS,
    SUBMITED_UI_SETTINGS,
    GET_MCleaning_SETTINGS,
    GET_Cleaning_ALERT_SETTINGS,
    GET_PAGE_NAME,
    GET_USER_MANAGEMENT,
    GET_ROLE,
    GET_HUB,
    GET_PROJECT,
    GET_MOBILE_SETTINGS,
    GET_MODULE_CLEANING,
    SEARCH_MODULE_CLEANING,
    GET_INVERTER_CONFIGURATION,
    GET_DATA,
    GET_WEATHER_DATA,
    GET_ADD_PLANT_TYPE,
    POST_FORECAST_SETTING,
    GET_GRAPH_GROUP,
    POST_GRAPH_GROUP,
    DELETE_GRAPH_GROUP,
    GET_ALERT_USER,
    DELETE_ALERT_USER,
    SELECT_ALERT_TYPE,
    DELETE_PLANT_MAPPING,
    POST_WEATHER_CONFIGURATION,
    POST_INVERTER_CONFIGURATION,
    POST_INVERTER_MSVMAPPING,
    POST_MFM_CONFIGURATION,
    GET_FTP_DATA,
    POST_PLANT_MAPPING,
    GET_EDIT_ROLE_MANAGEMENT,
    POST_USERS,
    GET_PR_ASSIGNMENT,
    GET_CONFIG_ALERT_USER,
    GET_MODULE_CLEANING_ALERT,
    GET_PERF_ANALYSIS,
    GET_YVALUE_DETAILS,
    GET_GRAPH_BY_PAGEID,
    GET_ALL_ADAPTERS,
    GET_MENU_PERMISSION_BY_ROLEID,
    GET_HUBUSERS,
    GET_USER_PLANT
} from '../actions/types'
import { getWeatherConfiguration, getAlertUserSettings } from '../actions/action-Settings'

const INITIAL_STATE = {
    graphs: [],
    pageGroup: [],
    userManagements: [],
    userRoles: [],
    hubs: [],
    pages: [],
    projects: [],
    alertuser: [],
    ddAlertuser: [],
    graphGroups: [],
    errorCodes: [],
    mobileSettings: [],
    forecastConfig: [],
    prUserManagement: [],
    mCleaning: [],
    cleaningAlert: [],
    displayMessage: ""
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {


        case GET_GRAPHS_SETTINGS:
            return {
                ...state,
                graphs: action.graphs
            }
        case GET_ALL_ADAPTERS:
            return {
                ...state,
                allAdapters: action.allAdapters
            }    
        case GET_PAGE_GROUP_SETTINGS:
            return {
                ...state,
                pageGroup: action.pageGroup
            }
        case GET_ADD_PLANT_TYPE:
            {
                let newState = { ...state }
                newState.plantTypes = action.plantTypes;
                newState.displayMessage = null;
                return newState
            }
        case GET_HUBUSERS:
            return {
                ...state,
                hubUsers : action.hubUsers
            }    
        case POST_PAGE_GROUP_DETAILS:
            return {
                ...state
            }
        case GET_PERF_ANALYSIS:
            return {
                ...state,
                performanceAnalysisData: action.data[0]
            }
        case POST_USERS:
            return {
                ...state,
                user: action.user
            }
        // case GET_USER_ROLES_SETTINGS
        case GET_PAGE_NAME:
            return {
                ...state,
                pages: action.data
            }
        case GET_PR_ASSIGNMENT:
            return {
                ...state,
                prAssignment: getPR(action.prAssignment)
            }
        case GET_USER_MANAGEMENT:
            return {
                ...state,
                userManagements: handleUserManagements(action.data)
            }
        case GET_ROLE:
            return {
                ...state,
                userRoles: action.data
            }
        case GET_HUB:
            return {
                ...state,
                hubs: action.data
            }
        case GET_CONFIG_ALERT_USER:
            return {
                ...state,
                data: getAlertUser(action.data, action.plantId, state)
            }
        case GET_PROJECT:
            return {
                ...state,
                projects: action.data
            }
        case GET_MOBILE_SETTINGS:
            return {
                ...state,
                mobileSettings: action.data
            }
        case GET_MODULE_CLEANING:
            return {
                ...state,
                cleaningConfig: getmodCleaningConfig(action.cleaningConfig, action.plantId, state)
            }
        case GET_MODULE_CLEANING_ALERT:
            return {
                ...state,
                cleaningConfigAlert: action.cleaningConfigAlert
            }
        case GET_INVERTER_CONFIGURATION:
            return {
                ...state,
                inverterConfiguration: getInvConf(action.inverterConfiguration, state)
            }
        case GET_PLANT_TYPE:
            {
                let newState = { ...state }
                newState.plantTypes = action.plantTypes;
                newState.projectId = action.projectId;
                newState.displayMessage = null
                return newState
            }

        case GET_DATA:
            return {
                ...state,
                data: action.data
            }
        case GET_FTP_DATA:
            return {
                ...state,
                ftpInvMap: getFTP(action.ftpInvMap, state)
            }
        case GET_WEATHER_DATA:
            {
                let newState = { ...state }
                newState.data = getWetherConf(action.data, state)
                newState.displayMessage = null;
                return newState
            }
        case SEARCH_MODULE_CLEANING:
            return {
                ...state,
                cleaningConfigSearch: action.cleaningConfigSearch
            }
        case GET_ALERTUSER_SETTINGS:
            return {
                ...state,
                alertuser: action.payLoad
            }
        case GET_DD_ALERTUSER_SETTINGS:
            return {
                ...state,
                ddAlertuser: action.payLoad
            }
        case GET_GRAPH_GROUPS_SETTINGS:
            return {
                ...state,
                graphGroups: action.graphGroups
            }
        case GET_ERROR_CODES_SETTINGS:
            return {
                ...state,
                errorCodes: action.errorCodes
            }
        case GET_MOBILE_SETTINGS_SETTINGS:
            return {
                ...state,
                mobileSettings: action.payLoad
            }
        case GET_FORECASTCONFIGS_SETTINGS:
            return {
                ...state,
                forecastSettings: action.forecastSettings
            }
        case GET_PR_USER_MANAGEMENT_SETTINGS:
            return {
                ...state,
                prUserManagement: action.payLoad
            }
        case GET_EDIT_ROLE_MANAGEMENT:
            return {
                ...state,
                roleManagement: action.payLoad
            }
        case GET_USER_ROLES_SETTINGS:
            return {
                ...state,
                userRoles: action.payLoad
            }

        case SUBMITED_UI_SETTINGS: {
            return {
                ...state,
                displayMessage: "Successfully Updated"
            }
        }
        case GET_Cleaning_ALERT_SETTINGS: {
            return {
                ...state,
                cleaningAlert: action.payLoad
            }
        }

        case GET_MENU_PERMISSION_BY_ROLEID: {
            return {
                ...state,
                menuByRoleId : action.menuByRoleId
            }
        }

        case GET_USER_PLANT: {
            return {
                ...state,
                userPlantByUserId: action.userPlantByUserId
            }
        }

        case GET_MCleaning_SETTINGS: {
            return {
                ...state,
                mCleaning: action.payLoad
            }
        }
        case CLEAR_PLANT_MAPPING:
            {
                return {
                    ...state,
                    inverterConfiguration: [],
                    data: [],
                    alertUser: [],
                    cleaningConfig: [],
                    ftpInvMap: [],
                    cleaningConfigAlert: [],
                    displayMessage: null,
                }
            }
        case GET_GRAPH_GROUP:
            {
                return {
                    ...state,
                    graphGroup: action.graphGroup
                }
            }
        case POST_GRAPH_GROUP: {
            return {
                ...state,
                graphGroup: action.graphGroup,
                displayMessage: action.displayMessage
            }
        }
        case DELETE_GRAPH_GROUP:
            {
                return {
                    ...state,
                    displayMessage: action.displayMessage
                }
            }
        case DELETE_ALERT_USER:
            {
                return {
                    ...state,
                    displayMessage: action.displayMessage
                }
            }
        case DELETE_PLANT_MAPPING:
            {
                return {
                    ...state,
                    displayMessage: action.displayMessage
                }
            }
        case POST_WEATHER_CONFIGURATION: {
            return {
                ...state,
                displayMessage: action.displayMessage
            }
        }
        case POST_FORECAST_SETTING:{
            return {
                ...state,
                displayMessage: action.displayMessage
            }
        }
        case POST_INVERTER_CONFIGURATION: {
            return {
                ...state,
                displayMessage: action.displayMessage
            }
        }
        case POST_INVERTER_MSVMAPPING: {
            return {
                ...state,
                displayMessage: action.displayMessage
            }
        }
        case POST_MFM_CONFIGURATION: {
            return {
                ...state,
                displayMessage: action.displayMessage
            }
        }
        case POST_PLANT_MAPPING: {
            return {
                ...state,
                displayMessage: action.displayMessage
            }
        }

        case GET_ALERT_USER:
            {
                return {
                    ...state,
                    alertUser: action.alertUser
                }
            }
        case SELECT_ALERT_TYPE:
            {
                return {
                    ...state,
                    selectAlertType: action.selectAlertType
                }
            }
        case GET_YVALUE_DETAILS:
            {
                return{
                    ...state,
                    yValueDetails : action.yValueDetails
                }
            }   
        case GET_GRAPH_BY_PAGEID:
            {
                return{
                    ...state,
                    graphByPageId : action.graphByPageId
                }
            }     
        default:
            return state;
    }
}

function getcbCleanRate(_data, plntId, plantId) {
    let cbCleanRate = 0;
    if (plntId == plantId){
        cbCleanRate= _data;
    }
    return cbCleanRate;
}

function getcleanCbCapacity(_data, plntId, plantId) {
    let cleanCbCapacity = 0;
    if (plntId == plantId){
        cleanCbCapacity = _data;
    }
    return cleanCbCapacity;
}

function getuncleanCbCapacity(_data, plntId, plantId) {
    let uncleanCbCapacity = 0;
    if (plntId == plantId){
        uncleanCbCapacity = _data;
    }
    return uncleanCbCapacity;
}

function getpercentage(_data, plntId, plantId) {
    let percentage = 0;
    if (plntId == plantId){
        percentage = _data;
    }
    return percentage;
}

function getftpPathSmu1(_data, plntId, plantId) {
    let ftpPathSmu1 = 0;
    if (plntId == plantId){
        ftpPathSmu1 = _data;
    }
    return ftpPathSmu1;
}

function getftpPathSmu2(_data, plntId, plantId) {
    let ftpPathSmu2 = 0;
    if (plntId == plantId){
        ftpPathSmu2 = _data;
    }
    return ftpPathSmu2;
}

function getnoccPathSmu1(_data, plntId, plantId) {
    let noccPathSmu1 = 0;
    if (plntId == plantId){
        noccPathSmu1 = _data;
    }
    return noccPathSmu1;
}

function getnoccPathSmu2(_data, plntId, plantId) {
    let noccPathSmu2 = 0;
    if (plntId == plantId){
        noccPathSmu2 = _data;
    }
    return noccPathSmu2;
}

function getInvNumer(invNum) {
    const _invNum = invNum.split(" ");
    return _invNum[1];
}

function getInvSerial(invNum) {
    const _invNum = invNum.split(" ");
    return _invNum[0];
}

function getInvConf(data, state) {
    const gridData = data && data.length > 0 ? data.map((item, index) => {
        // const _plantName = getPlantType(item.plantId, state);
        const _invNumber = getInvNumer(item.inverterNumber);
        const _invSerial = getInvSerial(item.inverterNumber);
        return {
            ...item,
            // plantName: _plantName,
            inverterNumber: _invNumber,
            inverterSerialNumber: _invSerial
        }
    }) : [];
    return gridData;
}

function getPlantType(plantId, state) {
    const _plantType = state.plantTypes.filter((item) => item.plantId === plantId)[0];
    return _plantType ? _plantType.plantName : "";
}

function getWetherConf(data, state) {
    const gridData = data && data.length > 0 ? data.map((item, index) => {
        const _plantName = getPlantType(item.plantId, state);
        return {
            ...item,
            plantName: _plantName,
        }
    }) : [];
    return gridData;
}

function getAlertUser(data, plantIds, state) {
    const filterData = data.filter((item) => plantIds.plantIds.indexOf(item.plantId) != -1);
    return filterData ? filterData : [];
}

function getmodCleaningConfig(data, plantIds, state) {
    const filterData = data.filter((item) => plantIds.plantIds.indexOf(item.plantId) != -1);
    const _plantName = filterData.map((item) => {return {...item, plantName: getPlantType(item.plantId, state)}});
    const _plantName1 = _plantName.map((item) => {return {...item, newCleanCbCapacity: item.cleanCbCapacity.toFixed(2), newUncleanCbCapacity: item.uncleanCbCapacity.toFixed(2), newPercentage: item.percentage.toFixed(2)}})
    return _plantName ? _plantName1 : [];
}
    // const plntIds = plantIds && plantIds.plantIds.length > 0 ? plantIds.plantIds.map((_data, index) => {
    //     const gridData = data && data.length > 0 ? data.map((item, index) => {
    //         // const _plantName = getPlantType(item, _data);
    //         return {
    //             ...item,
    //             // plantName: _plantName,
    //             cbCleanRate: getcbCleanRate(item.cbCleanRate,item.plantId, _data),
    //             cleanCbCapacity: getcleanCbCapacity(item.cleanCbCapacity,item.plantId,_data),
    //             uncleanCbCapacity: getuncleanCbCapacity(item.uncleanCbCapacity,item.plantId,_data),
    //             percentage: getpercentage(item.percentage,item.plantId,_data),
    //             ftpPathSmu1: getftpPathSmu1(item.ftpPathSmu1,item.plantId,_data),
    //             ftpPathSmu2: getftpPathSmu2(item.ftpPathSmu2,item.plantId,_data),
    //             noccPathSmu1: getnoccPathSmu1(item.noccPathSmu1,item.plantId,_data),
    //             noccPathSmu2: getnoccPathSmu2(item.noccPathSmu2,item.plantId,_data),
    //         }
    //     }) : [];
    //     return gridData;
    // }) : [];
// }

function getAlternateAdapter(id) {
    const alternateAdapter = [{ adapterName: "csvImportAdapter", value: "1" }, { adapterName: "csvImportAdapterRoofTop", value: "2" },
    { adapterName: "xmlImportAdapter", value: "3" }, { adapterName: "xmlImportAdapterPkZip", value: "4" },
    { adapterName: "xmlImportMeanAdapter", value: "5" }, { adapterName: "xmlImportMeanGuajratRoofTopAdapter", value: "6" },
    { adapterName: "csvImportRoofTopNewAdapter", value: "7" }, { adapterName: "csvImportAdapterIPTPS", value: "8" },
    { adapterName: "csvImportAdapterFromDirectory", value: "9" }, { adapterName: "csvImportAdapterRamnager", value: "10" },
    { adapterName: "xmlImportStringInverterAdapter", value: "11" }, { adapterName: "csvImportAlternateAdapter", value: "12" },
    { adapterName: "csvImportAdapterPunjab", value: "13" }];
    const altAdValue = alternateAdapter.filter((item) => item.value == id)[0];
    return altAdValue && altAdValue.adapterName ? altAdValue.adapterName : null;
}

function getFTP(data, state) {
    const gridData = data && data.length > 0 ? data.map((item, index) => {
        const _alternateAdapter = getAlternateAdapter(item.alternateAdapterId);
        return {
            ...item,
            alternateAdapter: _alternateAdapter,
        }
    }) : [];
    return gridData;

}

function getPR(data){
    const gridData = data && data.length > 0 ? data.map((item, index) => {
        const status = data.status != 1 ? "Active" : "InActive";
        return {
            ...item,
            status: status,
        }
    }) : [];
    return gridData;

}

function handleUserManagements(data){
    const gridData = data && data.length > 0 ? data.map((item, index) => {
        const status = item.empId === "null" || item.empId === "" ? "N/A" : item.empId;
        return {
            ...item,
            empId: status,
        }
    }) : [];
    return gridData;
}