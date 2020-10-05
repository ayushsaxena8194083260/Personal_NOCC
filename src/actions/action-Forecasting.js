import {
    HIDE_SPINNER,
    SHOW_SPINNER,
    GET_TIMESLOT,
    POST_FORECAST,
    POST_TIME_SLOT,
    DELETE_TIME_SLOT,
    GET_FORMULAE,
    CLEAR_FORECAST,
    GET_FORECAST_DASHBOARD,
    SEARCH_REPORT,
} from './types';
import service from "../services/forecastServices";
import { showSuccessAlert, showErrorAlert } from "./AlertActions";

/**
 * get viewAllTimeSlotSetting
 */
export const viewAllTimeSlotSetting = () => {
    return (dispatch) => {
        dispatch({type: SHOW_SPINNER})

        service.viewAllTimeSlotSetting().then(response => {
            if (response.data) {
                dispatch({
                    type: GET_TIMESLOT,
                    input: response.data
                })

            } else {
                dispatch({type: HIDE_SPINNER})
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({type: HIDE_SPINNER})
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

/**
 * post article - Create or update weathercreateUpdateMobileSettings
 */
export const createOrUpdateTimeSlotSetting = (data) => {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_SPINNER })

        service.createOrUpdateTimeSlotSetting(data.input).then(response => {
            if (response.data) {
                dispatch({
                    type: POST_TIME_SLOT,
                    displayMessage: data.type == "Add Time Slot Settings"? "Time Slot has been added successfully." : "Time Slot has been updated successfully."
                })
                const  {SettingsReducer}= getState();
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
 * delete deleteTimeSlotSetting
 */
export const deleteTimeSlotSetting = (id) => {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_SPINNER })
        service.deleteTimeSlotSetting(id).then(response => {
            if (response.data) {
                dispatch({
                    type: DELETE_TIME_SLOT,
                    displayMessage: "Time Slot has been deleted successfully.",
                })
                const  {SettingsReducer}= getState();
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
 * get viewAllTimeSlotSetting
 */
export const viewFormulaSettingCustom = () => {
    return (dispatch) => {
        dispatch({type: SHOW_SPINNER})

        service.viewFormulaSettingCustom().then(response => {
            if (response.data) {
                dispatch({
                    type: GET_FORMULAE,
                    inputForecast: response.data
                })

            } else {
                dispatch({type: HIDE_SPINNER})
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({type: HIDE_SPINNER})
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

/**
 * delete deleteTimeSlotSetting
 */
export const deleteFormulaSetting = (id) => {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_SPINNER })
        service.deleteFormulaSetting(id).then(response => {
            if (response.data) {
                dispatch({
                    type: DELETE_TIME_SLOT,
                    displayMessage: "Formula Setting has been deleted successfully.",
                })
                const  {SettingsReducer}= getState();
                console.log("rducerValue", SettingsReducer);
                dispatch(viewFormulaSettingCustom());
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
export const createOrUpdateFormulaSetting = (data) => {
    // console.log(data)

    return (dispatch, getState) => {
        dispatch({ type: SHOW_SPINNER })

        service.createOrUpdateFormulaSetting(data.input).then(response => {
            if (response.data) {
                dispatch({
                    type: POST_TIME_SLOT,
                    displayMessage: data.type === "Add Formulae Settings"? "Formulae Setting has been added successfully." : "Formulae Setting has been updated successfully."
                })
                const  {SettingsReducer}= getState();
                console.log("rducerValue", SettingsReducer);
                dispatch(viewFormulaSettingCustom());
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

export const clearForecast = () => {
    return (dispatch, getState) => {
        dispatch({
            type: CLEAR_FORECAST,
        })
    }
}


/**
 * getForecastDashboard 
 */
export function getForecastDashboard(_data) {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_SPINNER })
        dispatch({
            type: SEARCH_REPORT,
            searchReport: _data
        })
        service.getForecastDashboard(_data).then(response => {
            if (response.data) {
                    dispatch({
                        type: GET_FORECAST_DASHBOARD,
                        forecastData: response.data,
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
 * Post article
 */
export const CreateorupdateForecastcalculation = (data) => {
    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })

        service.CreateorupdateForecastcalculation(data).then(response => {
            if (response.data) {
                dispatch({
                    type: POST_FORECAST,
                    displayMessage: "Forecast details has been updated successfully."
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
