import {
    GET_GRAPHS_SETTINGS,
    GET_PAGE_GROUP_SETTINGS,
    POST_PAGE_GROUP_DETAILS,
    GET_PAGES_SETTINGS,
    GET_ADD_PLANT_TYPE,
    GET_USER_MANAGEMENT_SETTINGS,
    GET_HUBS_SETTINGS,
    GET_PROJECTS_SETTINGS,
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
    HIDE_SPINNER,
    SHOW_SPINNER,
    GET_PAGE_NAME,
    GET_USER_MANAGEMENT,
    GET_ROLE,
    GET_HUB,
    GET_PROJECT,
    GET_MOBILE_SETTINGS,
    SEARCH_MODULE_CLEANING,
    GET_MODULE_CLEANING,
    GET_INVERTER_CONFIGURATION,
    GET_DATA,
    GET_WEATHER_DATA,
    CLEAR_PLANT_MAPPING,
    POST_FORECAST_SETTING,
    GET_GRAPH_GROUP,
    POST_GRAPH_GROUP,
    DELETE_GRAPH_GROUP,
    GET_ALERT_USER,
    DELETE_ALERT_USER,
    DELETE_USER,
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
    POST_ROLE,
    GET_PR_ASSIGNMENT,
    GET_CONFIG_ALERT_USER,
    GET_MODULE_CLEANING_ALERT,
    GET_PERF_ANALYSIS,
    GET_YVALUE_DETAILS,
    POST_YVALUE_DETAILS,
    GET_GRAPH_BY_PAGEID,
    POST_PAGE,
    POST_PAGE_GRAPH,
    DELETE_PAGE_GRAPH,
    GET_ALL_ADAPTERS,
    GET_MENU_PERMISSION_BY_ROLEID,
    DELETE_YVALUE,
    POST_GRAPH,
    GET_HUBUSERS,
    GET_USER_PLANT
} from './types';
import service from "../services/settingServices";
import authService from '../services/loginServices';

import { showSuccessAlert, showErrorAlert } from "./AlertActions";
import {
    mockGraphsResponse, mockPageGroupResponse, mockPagesResponse, mockUserManagementsResponse, mockHubsResponse, mockProjectsResponse, mockAlertUserResponse, dropdownAlertUser, mockGraphGroupResponse, mockErrorCodeResponse, mockMobieSettingResponse,
    mockForecastConfigResponse, mockPRUserManagementResponse, mockUserRolesResponse, mockMCleaningResponse,
    mockAlertCleaningResponse,
    mockEditRoleManagement
} from "./settings";


/**
 * get article by plant type
 */
export const getGraphsSettings = () => {
    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })

        service.getGraphsSettings().then(response => {
            if (response.data) {

                dispatch({
                    type: GET_GRAPHS_SETTINGS,
                    graphs: response.data
                })

            } else {
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

/**
 * get article by plant type
 */
export const getAllHubUsers = () => {
    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })

        service.getAllHubUsers().then(response => {
            if (response.data) {

                dispatch({
                    type: GET_HUBUSERS,
                    hubUsers: response.data
                })

            } else {
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

/**
 * get article by plant type
 */
export const getAllGraphGroupData = () => {
    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })

        service.getAllGraphGroupData().then(response => {
            if (response.data) {

                dispatch({
                    type: GET_GRAPH_GROUPS_SETTINGS,
                    graphGroups: response.data
                })

            } else {
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

/**
 * get article by plant type
 */
export const getPageGroupSettings = () => {
    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })

        service.getPageGroupSettings().then(response => {
            if (response.data) {

                dispatch({
                    type: GET_PAGE_GROUP_SETTINGS,
                    pageGroup: response.data
                })

            } else {
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

/**
 * get article by plant type
 */
export const getMenuPermissionByRoleId = (roleId) => {
    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })

        service.getMenuPermissionByRoleId(roleId).then(response => {
            if (response.data) {

                dispatch({
                    type: GET_MENU_PERMISSION_BY_ROLEID,
                    menuByRoleId: response.data
                })

            } else {
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

/**
 * get article by user plant
 */
export const getUserPlantByUserId = (userId) => {
    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })

        service.getUserPlantByUserId(userId).then(response => {
            if (response.data) {
        
                dispatch({
                    type: GET_USER_PLANT,
                    userPlantByUserId: response.data
                })

            } else {
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

/**
 * post article
 */
export const createOrUpdatePageGroup = (pageGroup) => {
    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })

        service.createOrUpdatePageGroup(pageGroup).then(response => {
            if (response.data) {

                dispatch({
                    type: POST_PAGE_GROUP_DETAILS
                })

            } else {
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

/**
 * post article
 */
export const createUpdateHubUser = (data) => {
    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })

        service.createUpdateHubUser(data).then(response => {
            if (response.data) {
                service.getAllHubUsers().then(res => {
                    if (res.data) {
                        dispatch({
                            type: GET_HUBUSERS,
                            hubUsers: res.data
                        })
                    }
                    else {
                        dispatch({ type: HIDE_SPINNER })
                        showErrorAlert(dispatch, 'failed operation')
                    }
                })


            } else {
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}


export const createUpdateUser = (user) => {
    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })

        service.createUpdateUser(user).then(response => {
            if (response.data) {
                service.renderAllUserDetails().then(res => {
                    if (res.data) {
                        dispatch({
                            type: GET_USER_MANAGEMENT,
                            data: res.data

                        })
                    }
                    else {
                        dispatch({ type: HIDE_SPINNER })
                        showErrorAlert(dispatch, 'failed operation')
                    }
                })


            }
            else {
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}
export const deleteUser = (id) => {
    console.log(id,'response')

    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })
        service.deleteUser(id).then(response => {
            if (response.data) {
                console.log(response,'response')
                dispatch({
                    type: DELETE_USER,
                    displayMessage: " USER has been deleted successfully.",
                })
            
            } else {
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}
export const createUpdateRole = (user) => {
    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })

        service.createUpdateRole(user).then(response => {
            if (response.data) {
                dispatch({
                    type: POST_ROLE,
                    // user: response.data
                })
            }
            else {
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

export const createUpdatePage = (pageDetails) => {
    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })

        service.createUpdatePage(pageDetails).then(response => {
            if (response.data) {
                dispatch({
                    type: POST_PAGE,
                    // user: response.data
                })
            }
            else {
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

export const createUpdatePageGraph = (pageGraphDetails) => {
    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })

        service.createUpdatePageGraph(pageGraphDetails).then(response => {
            if (response.data) {
                dispatch({
                    type: POST_PAGE_GRAPH,
                    // user: response.data
                })
            }
            else {
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

export const getPagesSettings = () => {
    return (dispatch) => {
        dispatch({ type: GET_PAGES_SETTINGS, payLoad: mockPagesResponse.pages })
    }
}

/**
 * get Module Cleaning 
 */
export function renderCleaningConfig(_data) {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_SPINNER })
        dispatch({
            type: SEARCH_MODULE_CLEANING,
            cleaningConfigSearch: _data
        })
        service.renderCleaningConfig(_data).then(response => {
            if (response.data) {
                dispatch({
                    type: GET_MODULE_CLEANING_ALERT,
                    cleaningConfigAlert: response.data,
                })
            } else {
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

/**
 * get Inverter Configuration
 */
export function getInverterConfiguration(_data) {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_SPINNER })
        dispatch({
            type: SEARCH_MODULE_CLEANING,
            cleaningConfigSearch: _data
        })
        service.getInverterConfiguration(_data).then(response => {
            if (response.data) {
                dispatch({
                    type: GET_INVERTER_CONFIGURATION,
                    inverterConfiguration: response.data,
                })
            } else {
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

/**
 * get Inverter Configuration
 */
export function getWeatherConfiguration(_data) {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_SPINNER })
        dispatch({
            type: SEARCH_MODULE_CLEANING,
            cleaningConfigSearch: _data
        })
        service.getWeatherConfiguration(_data).then(response => {
            if (response.data) {
                dispatch({
                    type: GET_WEATHER_DATA,
                    data: response.data,
                })
            } else {
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

/**
 * get MFM Configuration 
 */
export function getMFMConfiguration(_data) {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_SPINNER })
        dispatch({
            type: SEARCH_MODULE_CLEANING,
            cleaningConfigSearch: _data
        })
        service.getMFMConfiguration(_data).then(response => {
            if (response.data) {
                dispatch({
                    type: GET_DATA,
                    data: response.data,
                })
            } else {
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

/**
 * get Inverter CSV mapping
 */
export function getInverterCSVMappingConfiguration(_data) {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_SPINNER })
        dispatch({
            type: SEARCH_MODULE_CLEANING,
            cleaningConfigSearch: _data
        })
        service.getInverterCSVMappingConfiguration(_data).then(response => {
            if (response.data) {
                dispatch({
                    type: GET_DATA,
                    data: response.data,
                })
            } else {
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

/**
 * get Weather CSV mapping
 */
export function getWeatherCSVMappingConfiguration(_data) {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_SPINNER })
        dispatch({
            type: SEARCH_MODULE_CLEANING,
            cleaningConfigSearch: _data
        })
        service.getWeatherCSVMappingConfiguration(_data).then(response => {
            if (response.data) {
                dispatch({
                    type: GET_DATA,
                    data: response.data,
                })
            } else {
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

/**
 * get MFM CSV mapping
 */
export function getMFMCSVMappingConfiguration(_data) {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_SPINNER })
        dispatch({
            type: SEARCH_MODULE_CLEANING,
            cleaningConfigSearch: _data
        })
        service.getMFMCSVMappingConfiguration(_data).then(response => {
            if (response.data) {
                dispatch({
                    type: GET_DATA,
                    data: response.data,
                })
            } else {
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

/**
 * get FTP Inverter mapping
 */
export function getFTPPlantMappingWithType(_data) {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_SPINNER })
        dispatch({
            type: SEARCH_MODULE_CLEANING,
            cleaningConfigSearch: _data
        })
        service.getFTPPlantMappingWithType(_data).then(response => {
            if (response.data) {
                dispatch({
                    type: GET_FTP_DATA,
                    ftpInvMap: response.data,
                })
            } else {
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

export function getPlantByType(plantType) {
    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })

        service.getPlantByType(plantType).then(response => {
            if (response.data) {
                console.log(response.data);
                dispatch({
                    type: GET_ADD_PLANT_TYPE,
                    plantTypes: response.data
                })
            } else {
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

/**
 * get FTP Inverter mapping
 */
export function getWeatherStationDevice(_data) {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_SPINNER })
        dispatch({
            type: SEARCH_MODULE_CLEANING,
            cleaningConfigSearch: _data
        })
        service.getWeatherStationDevice(_data).then(response => {
            if (response.data) {
                dispatch({
                    type: GET_DATA,
                    data: response.data,
                })
            } else {
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

/**
 * get page
 */
export function renderPageDetails(pageId) {
    return (dispatch) => {
        service.renderPageDetails(pageId).then(response => {
            if (response.data) {
                dispatch({
                    type: GET_PAGE_NAME,
                    data: response.data
                })
            } else {
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

/**
 * get User Management
 */
export function renderAllUserDetails() {
    return (dispatch) => {
        service.renderAllUserDetails().then(response => {
            if (response.data) {
                dispatch({
                    type: GET_USER_MANAGEMENT,
                    data: response.data
                })
            } else {
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

/**
 * get Role
 */
export function renderAllRoleDetails() {
    return (dispatch) => {
        service.renderAllRoleDetails().then(response => {
            if (response.data) {
                dispatch({
                    type: GET_ROLE,
                    data: response.data
                })
            } else {
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

/**
 * get HUB
 */
export function renderHubMasterDetails() {
    return (dispatch) => {
        service.renderHubMasterDetails().then(response => {
            if (response.data) {
                dispatch({
                    type: GET_HUB,
                    data: response.data
                })
            } else {
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

/**
 * get Projects
 */
export function renderProjectDetails() {
    return (dispatch) => {
        service.renderProjectDetails().then(response => {
            if (response.data) {
                dispatch({
                    type: GET_PROJECT,
                    data: response.data
                })
            } else {
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

/**
 * get Mobile Settings
 */
export function renderMobileSettingDetails() {
    return (dispatch) => {
        service.renderMobileSettingDetails().then(response => {
            if (response.data) {
                dispatch({
                    type: GET_MOBILE_SETTINGS,
                    data: response.data
                })
            } else {
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}
export const getUserManagementsSettings = () => {
    return (dispatch) => {
        dispatch({ type: GET_USER_MANAGEMENT_SETTINGS, payLoad: mockUserManagementsResponse.userManagements })
    }
}

export const getUserRolessSettings = () => {
    return (dispatch) => {
        dispatch({ type: GET_USER_ROLES_SETTINGS, payLoad: mockUserRolesResponse.roles })
    }
}


export const getHubsSettings = () => {
    return (dispatch) => {
        dispatch({ type: GET_HUBS_SETTINGS, payLoad: mockHubsResponse.hubs })
    }
}


export const getProjectsSettings = () => {
    return (dispatch) => {
        dispatch({ type: GET_PROJECTS_SETTINGS, payLoad: mockProjectsResponse.projects })
    }
}


export const getAlertUserSettings = () => {
    return (dispatch) => {
        dispatch({ type: GET_ALERTUSER_SETTINGS, payLoad: mockAlertUserResponse.alertuser })
    }
}


export const getDropDownnAlertUserSettings = () => {
    return (dispatch) => {
        dispatch({ type: GET_DD_ALERTUSER_SETTINGS, payLoad: dropdownAlertUser.alertuser })
    }
}


export const getGraphGroupsSettings = () => {
    return (dispatch) => {
        dispatch({ type: GET_GRAPH_GROUPS_SETTINGS, payLoad: mockGraphGroupResponse.graphGroup })
    }
}


/**
 * get article by plant type
 */
export const getErrorCodesSettings = (isPublished) => {
    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })

        service.getErrorCodesSettings(isPublished).then(response => {
            if (response.data) {

                dispatch({
                    type: GET_ERROR_CODES_SETTINGS,
                    errorCodes: response.data
                })

            } else {
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

export const getMobileSettings = () => {
    return (dispatch) => {
        dispatch({ type: GET_MOBILE_SETTINGS_SETTINGS, payLoad: mockMobieSettingResponse.mobileSetting })
    }
}


/**
 * get page
 */
export function getForecastConfigsSettings() {
    return (dispatch) => {
        //dispatch({ type: SHOW_SPINNER })
        service.getForecastConfigsSettings().then(response => {
            if (response.data) {
                dispatch({
                    type: GET_FORECASTCONFIGS_SETTINGS,
                    forecastSettings: response.data
                })
            } else {
                //dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            //dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

/**
 * get page
 */
export function getalladapters() {
    return (dispatch) => {
        //dispatch({ type: SHOW_SPINNER })
        service.getalladapters().then(response => {
            if (response.data) {
                dispatch({
                    type: GET_ALL_ADAPTERS,
                    allAdapters: response.data
                })
            } else {
                //dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            //dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

/**
 * post article
 */
export const createUpdateForecastConfig = (forecastSetting) => {
    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })

        service.createUpdateForecastConfig(forecastSetting).then(response => {
            if (response.data) {

                dispatch({
                    type: POST_FORECAST_SETTING,
                    displayMessage: forecastSetting.type == "Forecast Settings has been updated successfully."

                })

            } else {
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

export const getPRUserManagementsSettings = () => {
    return (dispatch) => {
        dispatch({ type: GET_PR_USER_MANAGEMENT_SETTINGS, payLoad: mockPRUserManagementResponse.prUserManagement })
    }
}

export const getEditRoleManagement = () => {
    return (dispatch) => {
        dispatch({
            type: GET_EDIT_ROLE_MANAGEMENT,
            payload: mockEditRoleManagement.userRoleManagement
        })
    }
}
export const getMCleaningSettings = () => {
    return (dispatch) => {
        dispatch({ type: GET_MCleaning_SETTINGS, payLoad: mockMCleaningResponse.mCleaning })
    }
}

export const getAlertCleaningSettings = () => {
    return (dispatch) => {
        dispatch({ type: GET_Cleaning_ALERT_SETTINGS, payLoad: mockAlertCleaningResponse.cleaningAlert })
    }
}




export const submitUISettings = () => {
    return (dispatch) => {
        dispatch({ type: SUBMITED_UI_SETTINGS })
    }
}

export const clearSettingPlantMapping = () => {
    return (dispatch, getState) => {
        dispatch({
            type: CLEAR_PLANT_MAPPING,
        })
    }
}

/**
 * get Graph Group Details
 */
export function renderGraphGroupDetails(_data) {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_SPINNER })
        service.renderGraphGroupDetails(_data).then(response => {
            if (response.data) {
                dispatch({
                    type: GET_GRAPH_GROUP,
                    graphGroup: response.data,
                })
            } else {
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

/**
 * post create or Edit GraphGroup
 */
export const createUpdateGraphGroup = (data) => {
    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })

        service.createUpdateGraphGroup(data.graphGroups).then(response => {
            if (response.data) {
                dispatch({
                    type: POST_GRAPH_GROUP,
                    displayMessage: data.type === "Add Graph Group" ? "Graph Group has been added successfully." : "Graph Group has been updated successfully."
                })
                dispatch(renderGraphGroupDetails());
            } else {
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

/**
 * post create or Edit Graph
 */
export const createUpdateGraph = (data) => {
    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })

        service.createUpdateGraph(data).then(response => {
            if (response.data) {
                dispatch({
                    type: POST_GRAPH,
                    displayMessage: "Graph Group has been added/updated successfully."
                })
                dispatch(renderGraphGroupDetails());
            } else {
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

/**
 * delete Graph Group
 */
export const deleteGraphGroup = (id) => {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_SPINNER })
        service.deleteGraphGroup(id).then(response => {
            if (response.data) {
                dispatch({
                    type: DELETE_GRAPH_GROUP,
                    displayMessage: "GRAPH GROUP has been deleted successfully.",
                })
                dispatch(renderGraphGroupDetails());
            } else {
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

/**
 * get Alert User Details
 */
export function renderAlertUserDetails(_data) {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_SPINNER })
        dispatch({
            type: SELECT_ALERT_TYPE,
            selectAlertType: _data
        })
        service.renderAlertUserDetails(_data).then(response => {
            if (response.data) {
                dispatch({
                    type: GET_ALERT_USER,
                    alertUser: response.data,
                })
            } else {
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

/**
 * delete Graph Group
 */
export const deleteCleaningAlertUser = (id) => {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_SPINNER })
        service.deleteCleaningAlertUser(id).then(response => {
            if (response.data) {
                dispatch({
                    type: DELETE_ALERT_USER,
                    displayMessage: "ALERT USER has been deleted successfully.",
                })
                const { SettingsReducer } = getState();
                console.log("rducerValue", SettingsReducer);
                dispatch(renderAlertUserDetails(SettingsReducer.selectAlertType));
            } else {
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}
/**
 * delete User
 */


/**
 * get Module Cleaning - Cleaning Config
 */
export function getAllCleaningConfig(_data) {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_SPINNER })
        dispatch({
            type: SEARCH_MODULE_CLEANING,
            cleaningConfigSearch: _data
        })
        service.getAllCleaningConfig().then(response => {
            if (response.data) {
                dispatch({
                    type: GET_MODULE_CLEANING,
                    cleaningConfig: response.data,
                    plantId: _data
                })
            } else {
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

/**deleteMFMConfig
 * delete Inverter Configuration
 */
export const deleteInverter = (id) => {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_SPINNER })
        service.deleteInverter(id).then(response => {
            if (response.data) {
                dispatch({
                    type: DELETE_PLANT_MAPPING,
                    displayMessage: "Inverter Configuration has been deleted successfully.",
                })
                const { SettingsReducer } = getState();
                console.log("rducerValue", SettingsReducer);
                dispatch(getInverterConfiguration(SettingsReducer.SEARCH_MODULE_CLEANING));
            } else {
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

/**
 * delete Weather Configuration
 */
export const deleteWeather = (id) => {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_SPINNER })
        service.deleteWeather(id).then(response => {
            if (response.data) {
                dispatch({
                    type: DELETE_PLANT_MAPPING,
                    displayMessage: "Weather Configuration has been deleted successfully.",
                })
                const { SettingsReducer } = getState();
                console.log("rducerValue", SettingsReducer);
                //   dispatch(getInverterConfiguration(SettingsReducer.SEARCH_MODULE_CLEANING));
            } else {
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

/**
 * post article - Create or update weathercreateUpdateMobileSettings
 */
export const createUpdateWeather = (data) => {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_SPINNER })

        service.createUpdateWeather(data.weatherConf).then(response => {
            if (response.data) {
                dispatch({
                    type: POST_WEATHER_CONFIGURATION,
                    displayMessage: data.type === "Add Weather Configuration" ? "Weather Configuration has been added successfully." : "Weather Configuration has been updated successfully."
                })
                const { SettingsReducer } = getState();
                console.log("rducerValue", SettingsReducer);
                dispatch(getWeatherConfiguration(SettingsReducer.SEARCH_MODULE_CLEANING));
            } else {
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

/**
 * post article - Create or update Inverter
 */

export const createUpdateInverter = (data) => {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_SPINNER })
        service.createUpdateInverter(data.inverterConf).then(response => {
            if (response.data) {
                dispatch({
                    type: POST_INVERTER_CONFIGURATION,
                    displayMessage: data.type == "Add Inverter Configuration" ? "Inverter Configuration has been added successfully." : "Inverter Configuration has been updated successfully."
                })
                const { SettingsReducer } = getState();
                console.log("rducerValue", SettingsReducer);
                // dispatch(getInverterConfiguration(SettingsReducer.SEARCH_MODULE_CLEANING));
            } else {
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

/**
 * post article - Create or update Inverter CSV Mapping
 */

export const createUpdateCSVInverterMap = (data) => {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_SPINNER })

        service.createUpdateCSVInverterMap(data).then(response => {
            if (response.data) {
                dispatch({
                    type: POST_INVERTER_MSVMAPPING,
                    displayMessage: data.type == "Add Inverter CSV Mapping" ? "Inverter CSV Mapping has been added successfully." : "Inverter CSV Mapping has been updated successfully."
                })
                const { SettingsReducer } = getState();
                console.log("rducerValue", SettingsReducer);
                // dispatch(getWeatherConfiguration(SettingsReducer.SEARCH_MODULE_CLEANING));
            } else {
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

/**
 * delete Inverter Configuration deleteCSVInverterMap
 */
export const deleteMFMConfig = (id) => {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_SPINNER })
        service.deleteMFMConfig(id).then(response => {
            if (response.data) {
                dispatch({
                    type: DELETE_PLANT_MAPPING,
                    displayMessage: "MFM Configuration has been deleted successfully.",
                })
                const { SettingsReducer } = getState();
                console.log("rducerValue", SettingsReducer);
                //   dispatch(getInverterConfiguration(SettingsReducer.SEARCH_MODULE_CLEANING));
            } else {
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

/**
 * post article - Create or update MFM Configuration
 */

export const createUpdateMFM = (data) => {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_SPINNER })

        service.createUpdateMFM(data.mfmConf).then(response => {
            if (response.data) {
                dispatch({
                    type: POST_MFM_CONFIGURATION,
                    displayMessage: data.type == "Add MFM Configuration" ? "MFM Configuration has been added successfully." : "MFM Configuration has been updated successfully."
                })
                const { SettingsReducer } = getState();
                console.log("rducerValue", SettingsReducer);
                // dispatch(getWeatherConfiguration(SettingsReducer.SEARCH_MODULE_CLEANING));
            } else {
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

/**
 * delete Inverter Configuration 
 */
export const deleteCSVInverterMap = (id) => {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_SPINNER })
        service.deleteCSVInverterMap(id).then(response => {
            if (response.data) {
                dispatch({
                    type: DELETE_PLANT_MAPPING,
                    displayMessage: "Inverter CSV Mapping has been deleted successfully.",
                })
                const { SettingsReducer } = getState();
                console.log("rducerValue", SettingsReducer);
                //   dispatch(getInverterConfiguration(SettingsReducer.SEARCH_MODULE_CLEANING));
            } else {
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

// /**
//  * post article - Create or update CSV MFM Mapping
//  */

export const createUpdateCSVWeatherMap = (data) => {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_SPINNER })

        service.createUpdateCSVWeatherMap(data).then(response => {
            if (response.data) {
                dispatch({
                    type: POST_PLANT_MAPPING,
                    displayMessage: data.type == "Add CSV Weather Mapping" ? "CSV Weather Mapping has been added successfully." : "CSV Weather Mapping has been updated successfully."
                })
                const { SettingsReducer } = getState();
                console.log("rducerValue", SettingsReducer);
                // dispatch(getWeatherConfiguration(SettingsReducer.SEARCH_MODULE_CLEANING));
            } else {
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

// /**
//  * post article - Create or update CSV MFM Mapping
//  */

export const createUpdateCSVMFMMap = (data) => {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_SPINNER })

        service.createUpdateCSVMFMMap(data.input).then(response => {
            if (response.data) {
                dispatch({
                    type: POST_PLANT_MAPPING,
                    displayMessage: data.type == "Add CSV MFM Mapping" ? "CSV MFM Mapping has been added successfully." : "CSV MFM Mapping has been updated successfully."
                })
                const { SettingsReducer } = getState();
                console.log("rducerValue", SettingsReducer);
                // dispatch(getWeatherConfiguration(SettingsReducer.SEARCH_MODULE_CLEANING));
            } else {
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

// /**
//  * post article - Create or update CSV MFM Mapping
//  */

export const createUpdateFTPMappings = (data) => {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_SPINNER })

        service.createUpdateFTPMappings(data.input).then(response => {
            if (response.data) {
                dispatch({
                    type: POST_PLANT_MAPPING,
                    displayMessage: data.type == "Add FTP" ? "FTP has been added successfully." : "FTP has been updated successfully."
                })
                const { SettingsReducer } = getState();
                console.log("rducerValue", SettingsReducer);
                // dispatch(getWeatherConfiguration(SettingsReducer.SEARCH_MODULE_CLEANING));
            } else {
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

/**
 * deleteCSVInverterMap
 */
export const deleteCSVMFMMap = (id) => {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_SPINNER })
        service.deleteCSVMFMMap(id).then(response => {
            if (response.data) {
                dispatch({
                    type: DELETE_PLANT_MAPPING,
                    displayMessage: "CSV MFM Mapping has been deleted successfully.",
                })
                const { SettingsReducer } = getState();
                console.log("rducerValue", SettingsReducer);
                //   dispatch(getInverterConfiguration(SettingsReducer.SEARCH_MODULE_CLEANING));
            } else {
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

/**
 * deleteCSVWeatherMap
 */
export const deleteCSVWeatherMap = (id) => {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_SPINNER })
        service.deleteCSVWeatherMap(id).then(response => {
            if (response.data) {
                dispatch({
                    type: DELETE_PLANT_MAPPING,
                    displayMessage: "CSV Weather Mapping has been deleted successfully.",
                })
                const { SettingsReducer } = getState();
                console.log("rducerValue", SettingsReducer);
                //   dispatch(getInverterConfiguration(SettingsReducer.SEARCH_MODULE_CLEANING));
            } else {
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

/**
 * deleteWeatherDevice
 */
export const deleteWeatherDevice = (id) => {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_SPINNER })
        service.deleteWeatherDevice(id).then(response => {
            if (response.data) {
                dispatch({
                    type: DELETE_PLANT_MAPPING,
                    displayMessage: "Weather Device has been deleted successfully.",
                })
                const { SettingsReducer } = getState();
                console.log("rducerValue", SettingsReducer);
                //   dispatch(getInverterConfiguration(SettingsReducer.SEARCH_MODULE_CLEANING));
            } else {
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

/**
 * deleteFTPMappings
 */
export const deleteFTPMappings = (id) => {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_SPINNER })
        service.deleteFTPMappings(id).then(response => {
            if (response.data) {
                dispatch({
                    type: DELETE_PLANT_MAPPING,
                    displayMessage: "FTP Mappings has been deleted successfully.",
                })
                const { SettingsReducer } = getState();
                console.log("rducerValue", SettingsReducer);
                //   dispatch(getInverterConfiguration(SettingsReducer.SEARCH_MODULE_CLEANING));
            } else {
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

export const createUpdateWeatherDevice = (data) => {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_SPINNER })

        service.createUpdateWeatherDevice(data.input).then(response => {
            if (response.data) {
                dispatch({
                    type: POST_PLANT_MAPPING,
                    displayMessage: data.type == "Add Weather Station" ? "Weather Station Device has been added successfully." : "Weather Station Device has been updated successfully."
                })
                const { SettingsReducer } = getState();
                console.log("rducerValue", SettingsReducer);
                // dispatch(getWeatherConfiguration(SettingsReducer.SEARCH_MODULE_CLEANING));
            } else {
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

export const createUpdateHubMaster = (data) => {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_SPINNER })

        service.createUpdateHubMaster(data.input).then(response => {
            if (response.data) {
                dispatch({
                    type: POST_PLANT_MAPPING,
                    displayMessage: data.type == "Add Hub Master" ? "Hub Master has been added successfully." : "Hub Master has been updated successfully."
                })
                const { SettingsReducer } = getState();
                console.log("rducerValue", SettingsReducer);
                // dispatch(getWeatherConfiguration(SettingsReducer.SEARCH_MODULE_CLEANING));
            } else {
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

/**
 * deleteHubMaster
 */
export const deleteHubMaster = (id) => {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_SPINNER })
        service.deleteHubMaster(id).then(response => {
            if (response.data) {
                dispatch({
                    type: DELETE_PLANT_MAPPING,
                    displayMessage: "Hub has been deleted successfully.",
                })
                const { SettingsReducer } = getState();
                console.log("rducerValue", SettingsReducer);
                //   dispatch(getInverterConfiguration(SettingsReducer.SEARCH_MODULE_CLEANING));
            } else {
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

export const createUpdateProjectDetails = (data) => {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_SPINNER })

        service.createUpdateProjectDetails(data.input).then(response => {
            if (response.data) {
                dispatch({
                    type: POST_PLANT_MAPPING,
                    displayMessage: data.type == "Add Project" ? "Project has been added successfully." : "Project has been updated successfully."
                })
                const { SettingsReducer } = getState();
                console.log("rducerValue", SettingsReducer);
                // dispatch(getWeatherConfiguration(SettingsReducer.SEARCH_MODULE_CLEANING));
            } else {
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

/**
 * deleteHubMaster
 */
export const deleteProject = (id) => {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_SPINNER })
        service.deleteProject(id).then(response => {
            if (response.data) {
                dispatch({
                    type: DELETE_PLANT_MAPPING,
                    displayMessage: "Hub has been deleted successfully.",
                })
                const { SettingsReducer } = getState();
                console.log("rducerValue", SettingsReducer);
                //   dispatch(getInverterConfiguration(SettingsReducer.SEARCH_MODULE_CLEANING));
            } else {
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}


/**
 * post article - Create or update  createUpdateCleaningConfig
 */
export const createUpdateMobileSettings = (data) => {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_SPINNER })

        service.createUpdateMobileSettings(data.input).then(response => {
            if (response.data) {
                dispatch({
                    type: POST_PLANT_MAPPING,
                    displayMessage: data.type == "Add Mobile Settings" ? "Mobile Settings has been added successfully." : "Mobile Settings has been updated successfully."
                })
                const { SettingsReducer } = getState();
                console.log("rducerValue", SettingsReducer);
                // dispatch(getWeatherConfiguration(SettingsReducer.SEARCH_MODULE_CLEANING));
            } else {
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

/**
 * deleteHubMaster deleteCleaningConfig
 */
export const deletePRRequest = (id) => {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_SPINNER })
        service.deletePRRequest(id).then(response => {
            if (response.data) {
                dispatch({
                    type: DELETE_PLANT_MAPPING,
                    displayMessage: "PR Request Assignment has been deleted successfully.",
                })
                const { SettingsReducer } = getState();
                console.log("rducerValue", SettingsReducer);
                //   dispatch(getInverterConfiguration(SettingsReducer.SEARCH_MODULE_CLEANING));
            } else {
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

/**
* getPRUserManagementsSettings
*/
export function renderPRRequestDetails() {
    return (dispatch) => {
        service.renderPRRequestDetails().then(response => {
            if (response.data) {
                dispatch({
                    type: GET_PR_ASSIGNMENT,
                    prAssignment: response.data
                })
            } else {
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

/**
 * deleteCleaningConfig 
 */
export const deleteCleaningConfig = (id) => {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_SPINNER })
        service.deleteCleaningConfig(id).then(response => {
            if (response.data) {
                dispatch({
                    type: DELETE_PLANT_MAPPING,
                    displayMessage: "Module Clenaing Config has been deleted successfully.",
                })
                const { SettingsReducer } = getState();
                console.log("rducerValue", SettingsReducer);
                //   dispatch(getInverterConfiguration(SettingsReducer.SEARCH_MODULE_CLEANING));
            } else {
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

/**
 * post article - createUpdateCleaningConfig
 */
export const createUpdateCleaningConfig = (data) => {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_SPINNER })

        service.createUpdateCleaningConfig(data.input).then(response => {
            if (response.data) {
                dispatch({
                    type: POST_PLANT_MAPPING,
                    displayMessage: data.type == "Add Module Cleaning Config" ? "Module Cleaning Config has been added successfully." : "Module Cleaning Config has been updated successfully."
                })
                const { SettingsReducer } = getState();
                console.log("rducerValue", SettingsReducer);
                // dispatch(getWeatherConfiguration(SettingsReducer.SEARCH_MODULE_CLEANING));
            } else {
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

/**
 * get All Cleaning Alert User
 */
export function getAllCleaningAlertUser(_data) {
    return (dispatch) => {
        service.getAllCleaningAlertUser().then(response => {
            if (response.data) {
                dispatch({
                    type: GET_CONFIG_ALERT_USER,
                    data: response.data,
                    plantId: _data
                })
            } else {
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

/**
 * get Performance Analysis
 */
export function getPerformanceLossesByPlantIdsDate(_data) {
    return (dispatch) => {
        service.getPerformanceLossesByPlantIdsDate(_data).then(response => {
            if (response.data) {
                dispatch({
                    type: GET_PERF_ANALYSIS,
                    data: response.data,
                })
            } else {
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}


/**
 * post article - createUpdateCleaningConfig
 */
export const createUpdateCleaningAlertUser = (data) => {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_SPINNER })

        service.createUpdateCleaningAlertUser(data.input).then(response => {
            if (response.data) {
                dispatch({
                    type: POST_PLANT_MAPPING,
                    displayMessage: "Module Cleaning Alert User has been added successfully."
                })
                const { SettingsReducer } = getState();
                console.log("rducerValue", SettingsReducer);
                // dispatch(getWeatherConfiguration(SettingsReducer.SEARCH_MODULE_CLEANING));
            } else {
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

/**
 * post article - createUpdateCleaningConfig
 */
export const createUpdateCleaningAlertUser1 = (data) => {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_SPINNER })

        service.createUpdateCleaningAlertUser(data).then(response => {
            if (response.data) {
                dispatch({
                    type: POST_PLANT_MAPPING,
                    displayMessage: "Module Cleaning Alert User has been added successfully."
                })
                const { SettingsReducer } = getState();
                console.log("rducerValue", SettingsReducer);
                // dispatch(getWeatherConfiguration(SettingsReducer.SEARCH_MODULE_CLEANING));
            } else {
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

/**
 * get yValue details
 */
export function getYValueByGraphId(graphId, yAxis) {
    return (dispatch) => {
        service.getYValueByGraphId(graphId, yAxis).then(response => {
            if (response.data) {
                dispatch({
                    type: GET_YVALUE_DETAILS,
                    yValueDetails: response.data,
                })
            } else {
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

/**
 * get graph details by pageId
 */
export function renderGraphDetailsByPageId(pageId) {
    return (dispatch) => {
        service.renderGraphDetailsByPageId(pageId).then(response => {
            if (response.data) {
                dispatch({
                    type: GET_GRAPH_BY_PAGEID,
                    graphByPageId: response.data,
                })
            } else {
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

/**
 * post article - createUpdateYValueDetails
 */
export const createUpdateGraphYValue = (data) => {
    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })

        service.createUpdateGraphYValue(data).then(response => {
            if (response.data) {
                service.getYValueByGraphId(data.graphId).then(res => {
                    if (res.data) {
                        dispatch({
                            type: GET_YVALUE_DETAILS,
                            yValueDetails: res.data,
                        })
                    }
                    else {
                        dispatch({ type: HIDE_SPINNER })
                        showErrorAlert(dispatch, 'failed operation')
                    }
                })

            }
            else {
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

/**
 * delete Page Graph
 */
export const deletePageGraphId = (id) => {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_SPINNER })
        service.deletePageGraphId(id).then(response => {
            if (response.data) {
                dispatch({
                    type: DELETE_PAGE_GRAPH,
                    displayMessage: "PAGE GRAPH has been deleted successfully.",
                })
                dispatch(renderGraphGroupDetails());
            } else {
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

/**
 * delete Y Value
 */
export const deleteYValueId = (id, graphId) => {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_SPINNER })
        service.deleteYValueId(id).then(response => {
            if (response.data) {
                dispatch(getYValueByGraphId(graphId));
            } else {
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}
