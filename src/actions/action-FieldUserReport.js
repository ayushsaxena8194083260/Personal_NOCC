 import {
    HIDE_SPINNER,
    SHOW_SPINNER,
    CLEAR_FIELDUSER_REPORT,
    GET_UNASSIGNED_TASKS,
    GET_UNASSIGNED_TASKS_PLANT,
    GET_UNASSIGNED_TICKET,
    GET_HUB_TICKETS,
    GET_HUB_TICKETS_DATE,
    SEARCH_HUB_TICKETS,
    GET_USER_TICKETS_DATE,
    SEARCH_USER_TICKETS,
    SEARCH_HUB_PLANT,
    GET_HUB_PLANT_DATE,
    GET_HUB_PLANT_ID,
    GET_ALL_USER_TICKETS,
    GET_USER_TICKETS_DATE_USER_ID,
    GET_HUB_PLANTID_DATE,
    GET_ALL_HUB,
    GET_SELECTED_HUB,
    GET_USER_MANAGEMENT,
    GET_USER_INFO_QUARTERLY,
    GET_USER_INFO_HALF_YEARLY,
    GET_USER_INFO_YEARLY,
    GET_PLANTS_BY_USER_ID,
    GET_USER_TICKET_DATE_USER_ID,
    GET_LAT_LANG
} from './types';
import service from "../services/fieldUserReportService";
import service1 from "../services/settingServices";
import { showSuccessAlert, showErrorAlert } from "./AlertActions";


/**
 * get Unassigned Tickets
 */
/**
 * get Unassigned Tickets
 */
export const getUserOpenClosedTicketDetailsWithDate = (data) => { 
    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })

        const defaultData = {
            "dataFlag": 0,
            "date": "string",
            "fromDate": "string",
            "hubId": 0,
            "plantIds": [],
            "plantType": "string",
            "plant_id": 0,
            "time": "string",
            "toDate": "string",
            "userId": 0,
            "year": "string"
        }
        service.getUserOpenClosedTicketDetailsWithDate({ ...defaultData, ...data }).then(response => {
            if (response.data) {

                dispatch({
                    type: GET_USER_TICKET_DATE_USER_ID,
                    userTicketsDateUserId: response.data
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

export const getHubLatLongs = (hubId) => { 
    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })
        service.getHubLatLongs(hubId).then(response => {
            if (response.data) {

                dispatch({
                    type: GET_LAT_LANG,
                    latLangDetails: response.data
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

export const getUnassignedTickets = (data) => { 
    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })

        const defaultData = {
            "dataFlag": 0,
            "date": "string",
            "fromDate": "string",
            "hubId": 0,
            "plantIds": [],
            "plantType": "string",
            "plant_id": 0,
            "time": "string",
            "toDate": "string",
            "userId": 0,
            "year": "string"
        }
        dispatch(renderAllUserDetails({ ...defaultData, ...data }))
        service.getUnassignedTicketsOfPlantOnType({ ...defaultData, ...data }).then(response => {
            if (response.data) {

                dispatch({
                    type: GET_UNASSIGNED_TICKET,
                    data: formateDateUnassigned(response.data)
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
 * get getUunassignedTicketsOfPlant
 */
export const getUserInfoWithDateQuarterly =(data)=>{
    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })
        let fromDate = data.fromDate;
        let toDate = data.toDate
        service.getUserInfoWithDateQuarterly(data).then(response=>{
            // service.getPlantsFromUserId(data.userId).then(res=>{
            if(response.data) {
                // if(res.data){
                    // console.log("plants",res.data)
                dispatch({
                    type:GET_USER_INFO_QUARTERLY,
                    userInfo:response.data,
                    fromDate:fromDate,
                    toDate:toDate,
                    // plants:res.data
                })
            // }
            }else {
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
          
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        // })
    })}
}
export const getUserInfoWithDateHalfYearly=(data)=>{
    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })

        service.getUserInfoWithDateHalfYearly(data).then(response=>{
            if(response.data) {
                dispatch({
                    type:GET_USER_INFO_HALF_YEARLY,
                    userInfo:response.data
                })
            }else {
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}
export const getUserInfoWithDateYearly=(data)=>{
    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })

        service.getUserInfoWithDateYearly(data).then(response=>{
            if(response.data) {
                dispatch({
                    type:GET_USER_INFO_YEARLY,
                    userInfo:response.data
                })
            }else {
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}
export const getUunassignedTicketsOfPlant = () => {
    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })

        service.getUunassignedTicketsOfPlant().then(response => {
            if (response.data) {

                dispatch({
                    type: GET_UNASSIGNED_TASKS_PLANT,
                    input: response.data
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
 * get Hub based Tickets
 */
export const getHubBasedTickets = () => {
    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })

        service.getHubBasedTickets().then(response => {
            if (response.data) {

                dispatch({
                    type: GET_HUB_TICKETS,
                    hubTicketsDate: response.data
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
 * getHubBasedTicketsWithDate 
 */
export function getHubBasedTicketsWithDate(_data) {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_SPINNER })
        dispatch({
            type: SEARCH_HUB_TICKETS,
            hubTicketsSearch: _data
        })
        service.getHubBasedTicketsWithDate(_data).then(response => { 
            if (response.data) {
                dispatch({
                    type: GET_HUB_TICKETS,
                    hubTicketsDate: response.data,
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
 * 
getHubPlantDetailsWithDate 
 */

export function getHubPlantDetailsWithDate(_data) {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_SPINNER })
        dispatch({
            type: SEARCH_HUB_PLANT,
            hubSearchPlant: _data
        })
        service.getHubPlantDetailsWithDate(_data).then(response => {
            if (response.data) {
                dispatch({
                    type: GET_HUB_PLANT_DATE,
                    hubPlantDate: response.data,
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
 * 
getHubPlantDetailsWithDate 
 */

export function getPlantBasedTicketDetailsWithDate(_data) {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_SPINNER })
        service.getPlantBasedTicketDetailsWithDate(_data).then(response => {
            if (response.data) {
                dispatch({
                    type: GET_HUB_PLANTID_DATE,
                    hubPlantIdDate: response.data,
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
 * 
getHubPlantDetailsWithDate 
 */

export function getPlantBasedTicketDetails(_data) {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_SPINNER })
        service.getPlantBasedTicketDetails(_data).then(response => {
            if (response.data) {
                dispatch({
                    type: GET_HUB_PLANT_ID,
                    hubPlantID: response.data,
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
 * getHubBasedTicketsWithDate 
 */
function getDate(cDate) {
    const today = new Date(cDate);
    let dd = today.getDate();
    let mm = today.getMonth() + 1;

    const yyyy = today.getFullYear();
    if (dd < 10) {
        dd = "0" + dd;
    }
    if (mm < 10) {
        mm = "0" + mm;
    }
    return dd + "-" + mm + "-" + yyyy;
}
function formateDateUnassigned(data) {
    const _data = data && data.length > 0 && data.map((item) => {
        return { ...item, createdAt: getDate(item.createdAt) }
    })
    return _data;
}
export function getUserTicketDetails() {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_SPINNER })
        service.getUserTicketDetails().then(response => {
            if (response.data) {
                dispatch({
                    type: GET_ALL_USER_TICKETS,
                    userTicketsDate: response.data,
                })
            } else {
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        }
        )
    }
}
export function getUserTicketDetailsWithDateanduserId(_data) {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_SPINNER })
        // dispatch({
        //     type: SEARCH_USER_TICKETS,
        //     userTicketsSearch: _data
        // })
        service.getUserTicketDetailsWithDateanduserId(_data).then(response => {
            if (response.data) {
                dispatch({
                    type: GET_USER_TICKETS_DATE_USER_ID,
                    userTicketsDate: response.data,
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

export function getUserTicketDetailsWithDate(_data) {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_SPINNER })
        dispatch({
            type: SEARCH_USER_TICKETS,
            userTicketsSearch: _data
        })
        service.getUserTicketDetailsWithDate(_data).then(response => {
            if (response.data) {
                dispatch({
                    type: GET_USER_TICKETS_DATE,
                    userTicketsDate: response.data,
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
// export function renderCleaningConfig(_data) {
//     return (dispatch, getState) => {
//         dispatch({ type: SHOW_SPINNER })
//         dispatch({
//             type: SEARCH_MODULE_CLEANING,
//             cleaningConfigSearch: _data
//         })
//         service.renderCleaningConfig(_data).then(response => {
//             if (response.data) {
//                     dispatch({
//                         type: GET_MODULE_CLEANING_ALERT,
//                         cleaningConfigAlert: response.data,
//                     })
//             } else {
//                 dispatch({ type: HIDE_SPINNER })
//                 showErrorAlert(dispatch, 'failed operation')
//             }
//         }, error => {
//             dispatch({ type: HIDE_SPINNER })
//             showErrorAlert(dispatch, 'failed operation' + error.toString())
//         })
//     }
// }

// /**
//  * get Inverter Configuration
//  */
// export function getInverterConfiguration(_data) {
//     return (dispatch, getState) => {
//         dispatch({ type: SHOW_SPINNER })
//         dispatch({
//             type: SEARCH_MODULE_CLEANING,
//             cleaningConfigSearch: _data
//         })
//         service.getInverterConfiguration(_data).then(response => {
//             if (response.data) {
//                     dispatch({
//                         type: GET_INVERTER_CONFIGURATION,
//                         inverterConfiguration: response.data,
//                     })
//             } else {
//                 dispatch({ type: HIDE_SPINNER })
//                 showErrorAlert(dispatch, 'failed operation')
//             }
//         }, error => {
//             dispatch({ type: HIDE_SPINNER })
//             showErrorAlert(dispatch, 'failed operation' + error.toString())
//         })
//     }
// }


/**
 * post article - createUpdateCleaningConfig
 */
// /**
//  * post article - createUpdateCleaningConfig
//  */
// export const createUpdateCleaningAlertUser = (data) => {
//     return (dispatch, getState) => {
//         dispatch({ type: SHOW_SPINNER })

//         service.createUpdateCleaningAlertUser(data.input).then(response => {
//             if (response.data) {
//                 dispatch({
//                     type: POST_PLANT_MAPPING,
//                     displayMessage: data.type == "Module Cleaning Alert User has been added successfully."
//                 })
//                 const  {SettingsReducer}= getState();
//                 console.log("rducerValue", SettingsReducer);
//                 // dispatch(getWeatherConfiguration(SettingsReducer.SEARCH_MODULE_CLEANING));
//             } else {
//                 dispatch({ type: HIDE_SPINNER })
//                 showErrorAlert(dispatch, 'failed operation')
//             }
//         }, error => {
//             dispatch({ type: HIDE_SPINNER })
//             showErrorAlert(dispatch, 'failed operation' + error.toString())
//         })
//     }
// }

export const clearFieldUserInput = () => {
    return (dispatch, getState) => {
        dispatch({
            type: CLEAR_FIELDUSER_REPORT, 
        })
    }
}

function addLan(data) {
    return data && data.map((item, index) => {
        return { ...item, lat: 12.120000, lng: 76.680000 }
    })
}
export const getAllHub = () => {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_SPINNER })
        service.getALLHubs().then(response => {
            if (response.data) {
                dispatch({
                    type: GET_ALL_HUB,
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
 * post article - createUpdateUserTicket
 */
export const createUpdateUserTicket = (data) => {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_SPINNER })

        service.createUpdateUserTicket(data).then(response => {
            if (response.data) {
                dispatch({
                    displayMessage: data.type == "User has been assigned successfully."
                })
                const defaultData = {
                    "dataFlag": 0,
                    "date": "",
                    "fromDate": getMonthStartDate,
                    "hubId": 0,
                    "plantIds": [],
                    "plantType": "",
                    "plant_id": 0,
                    "time": "",
                    "toDate": getCurrentDate,
                    "userId": 0,
                    "year": ""
                }
                
                service.getUnassignedTicketsOfPlantOnType(defaultData ).then(res => {
                    if (res.data) {
        
                        dispatch({
                            type: GET_UNASSIGNED_TICKET,
                            data: formateDateUnassigned(res.data)
                        })
        
                    } else {
                        dispatch({ type: HIDE_SPINNER })
                        showErrorAlert(dispatch, 'failed operation')
                    }
                }, error => {
                    dispatch({ type: HIDE_SPINNER })
                    showErrorAlert(dispatch, 'failed operation' + error.toString())
                })
            }else{
                dispatch({ type: HIDE_SPINNER })
                        showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}
    

// export const getUnassignedTicketsOfPlantOnType = () => {
//     return (dispatch, getState) => {
//         dispatch({ type: SHOW_SPINNER })
//         service.getUnassignedTicketsOfPlantOnType().then(response => {
//             if (response.data) {
//                     dispatch({
//                         type: GET_UNASSIGNED_TICKET,
//                         data: response.data,
//                     })
//             } else {
//                 dispatch({ type: HIDE_SPINNER })
//                 showErrorAlert(dispatch, 'failed operation')
//             }
//         }, error => {
//             dispatch({ type: HIDE_SPINNER })
//             showErrorAlert(dispatch, 'failed operation' + error.toString())
//         })
//     }
// }
export function renderAllUserDetails() {
    return (dispatch) => {
        service1.renderAllUserDetails().then(response => {
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
export const getPlantsFromUserId = (data) => {
    return (dispatch) => {
        service.getPlantsFromUserId(data.userId).then(response => {
        if (response.data) {
            console.log(response.data)
            // dispatch({
            //     type: GET_PLANTS_BY_USER_ID,
            //     plants: response.data
            // })
        } else {
            showErrorAlert(dispatch, 'failed operation')
        }
    }, error => {
        showErrorAlert(dispatch, 'failed operation' + error.toString())
    })
    }
}
export const getSelectedHubID = () => {
    return (dispatch, getState) => {
        dispatch({
            type: CLEAR_FIELDUSER_REPORT,
        })
    }
}

function getCurrentDate() {
    var today = new Date();
    var d = today.getDate();
    var m = today.getMonth() + 1;
    var y = today.getFullYear();
    var data;

    if (d < 10) {
        d = "0" + d;
    };
    if (m < 10) {
        m = "0" + m;
    };

    data = y + "-" + m + "-" + d;
    return data;
}
function getMonthStartDate() {
    var today = new Date();
    var d = 1;
    var m = today.getMonth() + 1;
    var y = today.getFullYear();
    var data;

    if (d < 10) {
        d = "0" + d;
    };
    if (m < 10) {
        m = "0" + m;
    };

    data = y + "-" + m + "-" + d;
    return data;
}