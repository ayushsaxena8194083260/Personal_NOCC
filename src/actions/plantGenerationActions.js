import {
    SHOW_SPINNER,
    HIDE_SPINNER,
    POST_PLANT_GENERATION,
    GET_PLANTDAILY_GEN,
    SEARCH_PLANTDAILY_GENERATION_DATA,
    CLEAR_PLANTDAILY_GENERATION,
    GET_PLANTDAILY_GEN_MONTHLY,
    GET_MFMDAILY,
    SEARCH_MFMDAILY_GENERATION_DATA,
    SEARCH_AMR_GENERATION_DATA,
    GET_AMR,
    GET_MFMREADING,
    GET_AMR_METER,
    DELETE_ACTUAL_GENERATION
} from './types'
import service from "../services/plantGenerationServices";
import { showSuccessAlert, showErrorAlert } from "./AlertActions";

/**
 * Post article
 */
export const createOrUpdatePlantGen = (data) => {
    let dataaAns
   
    console.log("ssasd",'line 24')
    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })

        service.createOrUpdatePlantGen(data.plantGeneration).then(response => {
       
    
            if (response.data) {          
               
                dispatch({
                    type: POST_PLANT_GENERATION,
                    displayMessage: data.type ==="Add Plant Generation" ? "Plant Generaion has been added successfully." : "Plant Generation has been updated successfully."
                })
            } else {
                alert(response.message)
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {            
            // console.log(error);
            // alert("Entry already exists please use edit button if you want to modify the values")
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

/**
 * get Plant Actual Generation details
 */
export function getDailyPlantActualGeneration(_data) {
    
    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })
        dispatch({
            type: SEARCH_PLANTDAILY_GENERATION_DATA,
            plantDailyGenSearch: _data
        })
            
        service.getDailyPlantActualGeneration(_data).then(response => { 
             console.log(response,'line 58')
            if (response.data) {
                service.getCurrencies().then(res=>{
                    console.log(res.data,'line 59')
                    dispatch({
                        type: GET_PLANTDAILY_GEN,
                        plantDailyGeneration: response.data,
                        currency: res.data,
                        input: _data
                    })    
                })
            } else {
                console.log(response.data,'line 70')
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            console.log(error.data)
             alert(error.data.message);
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

/**
 * get Plant Actual Generation details
 */
export function getDailyPlantActualGenerationMonthly(_data) {
    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })
        dispatch({
            type: SEARCH_PLANTDAILY_GENERATION_DATA,
            plantDailyGenSearch: _data
        })

        service.getDailyPlantActualGenerationMonthly(_data).then(response => {
            service.getDailyPlantActualGeneration(_data).then(res=> {
                service.getCurrencies().then(curr=>{
                dispatch({
                    type: GET_PLANTDAILY_GEN_MONTHLY,
                    plantDailyGeneration: response.data,
                    netGeneration: res.data ,
                    currency: curr.data,
                    input: _data          
                })
            })
        })
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

/**
 * get Plant Actual Generation details
 */
export function getMFMReading(_data) {
    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })
        dispatch({
            type: SEARCH_MFMDAILY_GENERATION_DATA,
            plantDailyMFMSearch: _data
        })

        service.getMFMReading(_data).then(response => {
            if (response.data) {
                // const selectedYear = {plantIds: _data.plantIds, fromDate: _data.fromDate, toDate: splitYear(_data.year).toDate}
                service.getWeatherStationDetailsByPlantIds(_data).then(res => {
                    if (res.data) {
                        dispatch({
                            type: GET_MFMDAILY,
                            mfmDailyGen: response.data,
                            mfmDailyWeather: res.data
                        })
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

/**
 * get Plant Actual Generation - MFM Reading details
 */
export function getMFMReadingUI(_data) {
    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })
        dispatch({
            type: SEARCH_MFMDAILY_GENERATION_DATA,
            plantDailyMFMSearch: _data
        })

        service.getMFMReadingUI(_data).then(response => {
            if (response.data) {
                dispatch({
                    type: GET_MFMREADING,
                    mfmReading: response.data,
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
 * get Plant Actual Generation - get AMR report details
 */
export function getAMRReportData(_data) {
    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })
        dispatch({
            type: SEARCH_AMR_GENERATION_DATA,
            plantDailyAMRearch: _data
        })

        service.getAMRReportData(_data).then(response => {
            if (response.data) {
                service.getWeatherStationDetailsByPlantIds(_data).then(res => {
                    if (res.data) {
                        let _amrdata = getAMRDailyGen(response.data)
                        if (_amrdata) {
                            service.getAMRmeterdatabyDate({ amrdate: _amrdata.nextDate, meterNumber: _amrdata.meterNumber }).then(res1 => {
                                if (res1.data && res1.data.length > 0) {
                                    let _current = response.data[response.data.length - 1];
                                    let _Next = res1.data[0];
                                    _amrdata.data[_amrdata.data.length - 1].importReading = ((parseFloat(_Next.importReading) - parseFloat(_current.importReading)) * parseFloat(_current.multiplyingFactor)).toFixed(2);
                                    _amrdata.data[_amrdata.data.length - 1].exportReading = ((parseFloat(_Next.exportReading) - parseFloat(_current.exportReading)) * parseFloat(_current.multiplyingFactor)).toFixed(2);
                                }
                                else
                                {
                                    _amrdata.data.splice(-1,1)
                                }
                            })
                        }
                        console.log( _amrdata,'amrGen')
                        dispatch({
                            type: GET_AMR,
                            amrGen: _amrdata.data,
                            amrDailyWeather: res.data
                        })
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

/**
 * get Plant Actual Generation - get AMR report details
 */
export function getAMRMeter(_data) {
    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })
        dispatch({
            type: SEARCH_AMR_GENERATION_DATA,
            plantDailyAMRearch: _data
        })

        service.getAMRMeter(_data).then(response => {
            if (response.data) {
                service.getWeatherStationDetailsByPlantIds(_data).then(res => {
                    if (res.data) {
                        let _amrdata = getAMRDailyGen(response.data)
                        if (_amrdata) {
                            service.getAMRmeterdatabyDate({ amrdate: _amrdata.nextDate, meterNumber: _amrdata.meterNumber }).then(res1 => {
                                if (res1.data && res1.data.length > 0) {
                                    let _current = response.data[response.data.length - 1];
                                    let _Next = res1.data[0];
                                    _amrdata.data[_amrdata.data.length - 1].importReading = ((parseFloat(_Next.importReading) - parseFloat(_current.importReading)) * parseFloat(_current.multiplyingFactor)).toFixed(2);
                                    _amrdata.data[_amrdata.data.length - 1].exportReading = ((parseFloat(_Next.exportReading) - parseFloat(_current.exportReading)) * parseFloat(_current.multiplyingFactor)).toFixed(2);
                                }
                                else
                                {
                                    _amrdata.data.splice(-1,1)
                                }
                            })
                        }
                        dispatch({
                            type: GET_AMR_METER,
                            amrMeterGen: _amrdata.data,
                            amrMeterDailyWeather: res.data
                        })
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

export const clearPlantDailyGeneration = () => {
    return (dispatch, getState) => {
        dispatch({
            type: CLEAR_PLANTDAILY_GENERATION,
        })
    }
}

/**
 * delete article
 */
export const deletePlantGen = (id) => {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_SPINNER })
        service.deletePlantGen(id).then(response => {
            if (response.data) {
                console.log(response);
                let resObj = { status: response.data, id: id };
                dispatch({
                    type: DELETE_ACTUAL_GENERATION,
                    displayMessage: "Plant Actual Genetation has been deleted successfully.",
                })
                 const  {plantDailyGenerationReducer}= getState();
                console.log("rducerValue", plantDailyGenerationReducer);
              dispatch(getDailyPlantActualGeneration(plantDailyGenerationReducer.plantDailyGenSearch));

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

function getAMRDailyGen(data) {
    let meterNumber = null;
    let nextDate = null;
    for (var i = 0; i <= data.length - 1; i++) {

        let _current = data[i];
        let _Next = data[i + 1];
      
        if (i ===data.length - 1 || _current.meterNumber !== _Next.meterNumber) {
            data[i].expt = data[i].exportReading;
            data[i].impt = data[i].importReading;
            nextDate = addDays(data[i].amrDate);
            meterNumber = _Next && _current.meterNumber !== _Next.meterNumber ? _Next.meterNumber : _current.meterNumber;
        }
        else if (_current.meterNumber ===_Next.meterNumber) {
            //const diffMeterNo = data.filter((flt) => flt.meterNumber !== _Next.meterNumber);
            data[i].expt = data[i].exportReading;
            data[i].impt = data[i].importReading;
            data[i].importReading = ((parseFloat(_Next.importReading) - parseFloat(_current.importReading)) * parseFloat(_current.multiplyingFactor)).toFixed(2);
            data[i].exportReading = ((parseFloat(_Next.exportReading) - parseFloat(_current.exportReading)) * parseFloat(_current.multiplyingFactor)).toFixed(2);

        }
        else {

        }
    }

    return { data: data, nextDate: nextDate, meterNumber: meterNumber };
}

function addDays(date) {
    var newDate = new Date(date);

    newDate.setDate(newDate.getDate() + 1);
    return getDate(newDate);
}

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
    return yyyy + "-" + mm + "-" + dd;
}
