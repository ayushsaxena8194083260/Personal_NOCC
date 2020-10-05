import {
    GET_PERFORMANCE_ANALYSIS
} from './types';
 import service from "../services/settingServices";
 import { showSuccessAlert, showErrorAlert } from "./AlertActions";
// import {
//     mockGraphsResponse, mockPageGroupResponse, mockPagesResponse, mockUserManagementsResponse, mockHubsResponse, mockProjectsResponse, mockAlertUserResponse, dropdownAlertUser, mockGraphGroupResponse, mockErrorCodeResponse, mockMobieSettingResponse,
//     mockForecastConfigResponse, mockPRUserManagementResponse, mockUserRolesResponse, mockMCleaningResponse,
//     mockAlertCleaningResponse,
//     mockEditRoleManagement
// } from "./settings";


export function getPerformanceAnalysisByPlantIdsDate(_data) {
    return (dispatch) => {
        // service.getPerformanceLossesByPlantIdsDate(_data).then(response => {
        //     if (response.data) {
        //         dispatch({
        //             type: GET_PERFORMANCE_ANALYSIS,
        //             data: null,
        //         })
        //     } else {
        //         showErrorAlert(dispatch, 'failed operation')
        //     }
        // }, error => {
        //     showErrorAlert(dispatch, 'failed operation' + error.toString())
        // })
        service.getPerformanceLossesByPlantIdsDate(_data).then(response => {
            if (response.data) {
                dispatch({
                    type: GET_PERFORMANCE_ANALYSIS,
                    data: response.data[0],
                })
            } else {
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })

               
    }
}
