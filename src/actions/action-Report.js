import {
    HIDE_SPINNER,
    SHOW_SPINNER,
    GET_ALLGRAPH,
    SEARCH_REPORT,
    GET_REPORT_DATA,
    GET_REPORT_DEVIATION_DATA,
    GET_REPORT_DEVIATION_EXTDATA,
    GET_REPORT_DEVIATION_EXTDATART,
    GET_REPORT_DEVIATION_DATART,
    GET_FORECAST_DASHBOARD,
    GET_ALL_LENDER_DETAILS_BY_YEARPLANTIDS,
    GET_INVERTER_NAME,
    POST_PLANT_GENERATION
} from './types';
import service from "../services/reportService";
import service2 from "../services/lenderDetailsService";
import service1 from "../services/plantService";
import { showSuccessAlert, showErrorAlert } from "./AlertActions";
import FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import exportFromJSON from 'export-from-json'

/**
 * get getAllGraphs
 */
export const getAllGraphs = () => {
    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })

        service.getAllGraphs().then(response => {
            if (response.data) {
                dispatch({
                    type: GET_ALLGRAPH,
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
 * getProvisionalReportGeneration
 */
export function getProvisionalReportGeneration(_data) {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_SPINNER })
        dispatch({
            type: SEARCH_REPORT,
            searchReport: _data
        })
        service.getProvisionalReportGeneration(_data).then(response => {
            if (response.data) {
                // dispatch({
                //     type: GET_REPORT_DATA,
                //     reportData: response.data,
                // })

                let data = response.data.map(d => {
                    return {
                        Plant: d.plantName,
                        Export: d.sumGen,
                        Import: d.sumImport
                    }
                })
                exportToCSV(data, `provi_${_data.fromDate}_${_data.toDate}`)

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


function exportToCSVDate(csvData, _date, fileName) {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    let res = {};
    _date.map((item, index) => {
        const wsBuffer = XLSX.utils.json_to_sheet(csvData[index]);
        res[item] = wsBuffer;
    })
    // const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: res, SheetNames: _date };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
}
function exportToCSV(csvData, fName) {
    // const data = csvData
    // const fileName = fName
    // const exportType = 'xls'
    // data.length > 0 ? exportFromJSON({ data, fileName, exportType }) : alert('No data to download')
    let sheetsData = [{ name: fName, data: csvData }]
    exportToExcel(sheetsData, fName)
}

function exportToExcel(excelData, fileName) {
    const wb = XLSX.utils.book_new();
    excelData.forEach((sheet) => {
        let ws = XLSX.utils.json_to_sheet(sheet.data);
        XLSX.utils.book_append_sheet(wb, ws, sheet.name);
    })
    XLSX.writeFile(wb, `${fileName}.xls`);
}
/**
 * getBudgetExcelExport
 */
export function getBudgetExcelExport(_data) {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_SPINNER })
        dispatch({
            type: SEARCH_REPORT,
            searchReport: _data
        })
        service.getBudgetExcelExport(_data).then(response => {
            if (response.data) {
                dispatch({
                    type: GET_REPORT_DATA,
                    reportData: response.data,
                })
                // exportToCSV(response.data, "BudgetReport");

                console.log(response, "response")
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
getAllModuleCleaning
 */
export function getAllModuleCleaning(_data) {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_SPINNER })
        dispatch({
            type: SEARCH_REPORT,
            searchReport: _data
        })
        service.getAllModuleCleaning(_data).then(response => {
            if (response && response.length > 0) {
                // dispatch({
                //     type: GET_REPORT_DATA,
                //     reportData: response.data,
                // })
                exportToCSV(response, "ModuleCLeaning");
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
 * getForecastReport
 */
export function getForecastReport(_data) {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_SPINNER })
        dispatch({
            type: SEARCH_REPORT,
            searchReport: _data
        })
        service.getForecastReport(_data).then(response => {
            if (response.data) {
                // dispatch({
                //     type: GET_REPORT_DATA,
                //     reportData: response.data,
                // })
                exportToCSV(response.data, "ForecastReport");

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
 * getSoilingAnalysisReport
 */
export function getSoilingAnalysisReport(_data) {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_SPINNER })
        dispatch({
            type: SEARCH_REPORT,
            searchReport: _data
        })
        service.getSoilingAnalysisReport(_data).then(response => {
            if (response.data) {
                // dispatch({
                //     type: GET_REPORT_DATA,
                //     reportData: response.data,
                // })
                let excelData = getData(response.data, _data);
                exportToCSV(excelData, "Soiling Report");
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

function getData(data, _date) {
    let rackCleaned = 0;
    let cleaningExpenditure = [];
    let rackPerCost = 0;
    let actual_cost = 0;
    let totalGen = 0;
    let totalGenLoss = 0;
    let totalRevLoss = 0;
    let totalClean = 0;
    let totalLossValue = 0;
    let max = data.cumilativeExcelDetailsDOs.length > 0 ? findMaxNum(data.cumilativeExcelDetailsDOs) : 0;
    const downloadData = data && data.cumilativeExcelDetailsDOs.length > 0 ? data.cumilativeExcelDetailsDOs.map((items, index) => {
        const dGen = getdailygeneration(items.acCapacity, items.dcLoading, items.energy);
        totalGen += parseFloat(items.energy);
        const genLoss = getGenerationLoss(items.acCapacity, items.dcLoading, items.energy, max);
        totalGenLoss += parseFloat(genLoss);
        const revLoss = getrevenueLoss(items.acCapacity, items.dcLoading, items.energy, max, items.tariff);
        totalRevLoss += parseFloat(revLoss);
        if (data && data.moduleCleaningExcels.length > 0) {
            rackCleaned = data.moduleCleaningExcels[0].rackCleaned;
            cleaningExpenditure = parseInt(data.moduleCleaningExcels[0].cleaningExpenditure);
            rackPerCost = data.moduleCleaningExcels[0].rackPerCost;
            actual_cost = (parseInt(rackCleaned) * parseInt(rackPerCost));//.toFixed(2);
        } else {
            rackCleaned = 0;
            cleaningExpenditure = 0;
            rackPerCost = 0;
            actual_cost = 0;
        }
        totalClean = parseInt(cleaningExpenditure);
        const prRation = getPlRation(items.acCapacity, items.dcLoading, items.energy, max, items.tariff, cleaningExpenditure);
        // const lossValue = getLoss(parseFloat(revLoss), parseFloat(cleaningExpenditure));
        totalLossValue += parseFloat(prRation);
        return {
            "Date Range": _date.fromDate + " to " + _date.toDate,
            "Plant Name": items.plantName,
            "Inverter Name/Number": items.inverterName,
            "Daily Generation": parseFloat(items.energy),//.toFixed(2),
            "Normalized generation = (Inverter daily Generation / Inverter Connected Capacity) * Inverter AC Capacity": dGen,
            "Generation loss": genLoss,
            "Revenue Loss due to Generation Loss": revLoss,
            "Cost OF Cleaning per Inverter": parseInt(cleaningExpenditure),
            "Number of Racks Cleaned": "",
            "Cost per cleaning a Rack": "",
            "Actual Cleaning cost": "",
            "Saving": "",
            "Negative -Gain/ Positive- Loss": prRation
        }
    }) : [];
    downloadData.push({
        "Date Range": _date.fromDate + " to " + _date.toDate,
        "Plant Name": "",
        "Inverter Name/Number": "",
        "Daily Generation": totalGen,
        "Normalized generation = (Inverter daily Generation / Inverter Connected Capacity) * Inverter AC Capacity": "",
        "Generation loss": totalGenLoss,
        "Revenue Loss due to Generation Loss": totalRevLoss,
        "Cost OF Cleaning per Inverter": totalClean,
        "Number of Racks Cleaned": rackCleaned,
        "Cost per cleaning a Rack": rackPerCost,
        "Actual Cleaning cost": actual_cost,
        "Saving": parseFloat(parseFloat(totalClean) - parseFloat(actual_cost)),
        "Negative -Gain/ Positive- Loss": totalLossValue
    })
    return downloadData;
}

function getLoss(rev, clean) {
    return (rev - clean);
}
function getPlRation(ac, dc, energy, max, tariff, clean) {
    const _calc = ((parseFloat(energy) / parseFloat(dc)) * parseFloat(ac));//.toFixed(4);
    const _calc1 = ((parseFloat(max) / parseFloat(dc)) * parseFloat(ac));//.toFixed(4);
    const _value = (parseFloat(_calc1) - parseFloat(_calc));//.toFixed(4);
    const dataValue = (parseFloat(_value) * parseFloat(tariff));//.toFixed(2);
    const _data = parseFloat(parseFloat(dataValue) - parseFloat(clean));
    return parseFloat(_data);//.toFixed(2);
}

function getrevenueLoss(ac, dc, energy, max, tariff) {
    const _calc = ((parseFloat(energy) / parseFloat(dc)) * parseFloat(ac));//.toFixed(4);
    const _calc1 = ((parseFloat(max) / parseFloat(dc)) * parseFloat(ac));//.toFixed(4);
    const _value = (parseFloat(_calc1) - parseFloat(_calc));//.toFixed(4);
    const dataValue = (parseFloat(_value) * parseFloat(tariff));//.toFixed(2);
    return dataValue;
}

function findMaxNum(seriesMap) {
    let bigNum = 0;
    seriesMap && seriesMap.length > 0 && seriesMap.forEach((item) => {
        bigNum = Math.max(bigNum, parseFloat(item.energy));
    })
    return bigNum;
}

function getGenerationLoss(ac, dc, energy, max) {
    const _calc = ((parseFloat(energy) / parseFloat(dc)) * parseFloat(ac));//.toFixed(4);
    const _calc1 = ((parseFloat(max) / parseFloat(dc)) * parseFloat(ac));//.toFixed(4);
    const _value = (parseFloat(_calc1) - parseFloat(_calc));//.toFixed(4);
    return _value;
}

function getdailygeneration(ac, dc, energy) {
    const _calc = ((parseFloat(energy) / parseFloat(dc)) * parseFloat(ac));//.toFixed(4);
    return _calc;
}


/**
 * getLenderExcelExport
 */
export function getLenderExcelExport(plantIdsYear) {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_SPINNER })
        dispatch({
            type: SEARCH_REPORT,
            searchReport: plantIdsYear.plantIds
        })
        service2.getLenderDataByYearPlantIds(plantIdsYear).then(response => {
            if (response.data) {
                service1.getAllPlants().then(res => {
                    dispatch({
                        type: GET_ALL_LENDER_DETAILS_BY_YEARPLANTIDS,
                        allLenderDetailsByYearPlantIds: response.data,
                        plants: res.data
                    })
                })

                // exportToCSV(response.data, "LenderReport");
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
 * getMergedExcelReport
 */
export function getMergedExcelReport(_data) {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_SPINNER })
        dispatch({
            type: SEARCH_REPORT,
            searchReport: _data
        })
        service.getMergedExcelReport(_data).then(response => {
            if (response.data) {
                //  dispatch({
                //      type: GET_REPORT_DATA,
                //      reportData: response.data,
                //  })
                let reportData1 = [];
                for (var i = 0; i < response.data.abtMeterReports.length; i++) {
                    var data = {
                        "Date": response.data.abtMeterReports[i].date,
                        "Plant Name": response.data.abtMeterReports[i].plantName,
                        "Connected Capacity": response.data.abtMeterReports[i].connectedCapacity,
                        "Tilt": response.data.abtMeterReports[i].tilt,
                        "Export": response.data.abtMeterReports[i].actualGeneration,
                        "Import": response.data.abtMeterReports[i].importData,
                        "Net Generation": response.data.abtMeterReports[i].actualGeneration - response.data.abtMeterReports[i].importData
                    }
                    reportData1.push(data);
                }
                let excelData = [
                    {
                        name: 'Abt Meter',
                        data: reportData1
                    },
                    {
                        name: 'All Actual Generation Monthly',
                        data: response.data.allActualGenerationMonthlyReports
                    },
                    {
                        name: 'Grid',
                        data: response.data.gridReports
                    },
                    {
                        name: 'Inverter',
                        data: response.data.inverterExcelReports.inverterReports
                    },
                    {
                        name: 'Plant Down',
                        data: response.data.plantDownReports
                    },
                    {
                        name: 'Weather Station',
                        data: response.data.weatherStationReports.weatherStationRReports
                    }
                ]
                exportToExcel(excelData, 'MergedReport')
                // exportToCSV(reportData1, "MergedReport");
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
 * getDeviationReport
 */
export function getDeviationReport(_data) {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_SPINNER })
        dispatch({
            type: SEARCH_REPORT,
            searchReport: _data
        })
        service.getDeviationReport(_data).then(response => {
            if (response.data) {
                dispatch({
                    type: GET_REPORT_DEVIATION_DATA,
                    reportDeviationData: response.data,
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
 * getDeviationReport
 */
export function getDeviationReportRT(_data) {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_SPINNER })
        dispatch({
            type: SEARCH_REPORT,
            searchReport: _data
        })
        service.getDeviationReport(_data).then(response => {
            if (response.data) {
                dispatch({
                    type: GET_REPORT_DEVIATION_DATART,
                    reportDeviationDataRT: response.data,
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
 * getDeviationReport
 */
export function getCSMEXTTDReportForAllPlant(_data) {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_SPINNER })
        dispatch({
            type: SEARCH_REPORT,
            searchReport: _data
        })
        service.getCSMEXTTDReportForAllPlant(_data).then(response => {
            if (response.data) {
                dispatch({
                    type: GET_REPORT_DEVIATION_EXTDATA,
                    reportDeviationExtData: response.data,
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
 * getDeviationReportRT
 */
export function getCSMEXTTDReportForAllPlantRT(_data) {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_SPINNER })
        dispatch({
            type: SEARCH_REPORT,
            searchReport: _data
        })
        service.getCSMEXTTDReportForAllPlant(_data).then(response => {
            if (response.data) {
                dispatch({
                    type: GET_REPORT_DEVIATION_EXTDATART,
                    reportDeviationExtDataRT: response.data,
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
                // dispatch({
                //     type: GET_FORECAST_DASHBOARD,
                //     forecastData: response.data,
                // })
                let value = getForecastData(response.data, _data);
                exportToCSVDate(value.result2, value.result2Date, "Forecast Report");
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


function getForecastData(data, _data) {
    let plant = data.plant;
    let forecastConfigEntity = data.forecastConfigEntity;
    let primaryWeatherDOs = data.primaryWeatherDOs;
    let insolationByPlantDOs = data.insolationByPlantDOs;
    let forecastCalculationEntities = data.forecastCalculationEntities;
    let activePowerByPlantDOs = data.activePowerByPlantDOs;
    let forecastCalculationEntities2 = data.forecastCalculationEntities2;
    let activePowerByPlantDOs2 = data.activePowerByPlantDOs2;
    let insolationHistorytByWeatherIdDOs = data.insolationHistorytByWeatherIdDOs;
    let totalPacSubTotal = data.totalPacSubTotal;
    let moduleTemperatureDeviationRangeSQL = data.moduleTemperatureDeviationRangeSQL;
    let avgTmpMdle = data.avgTmpMdle;
    let avgInsolation = data.avgInsolation;
    let forecastIrradianceDeviationSQL = data.forecastIrradianceDeviationSQL;
    let actualModuleTempDOs = data.actualModuleTempDOs;
    let moduleTempForecastByPlantIdDate = data.insolationHistorytByWeatherIdDOs;
    let moduleTemperatureHistorytByWeatherIdDOs = data.moduleTemperatureHistorytByWeatherIdDOs;
    // $time_slot = $this->getTimeSlotByPlantId();
    let time_array = [];
    let result2 = [];
    let result2Date = [];
    let arrayDataResult = [];
    let today = new Date();
    time_array.push("00:00:00", "00:15:00", "00:30:00", "00:45:00", "01:00:00", "01:15:00", "01:30:00", "01:45:00", "02:00:00",
        "02:15:00", "02:30:00", "02:45:00", "03:00:00", "03:15:00", "03:30:00", "03:45:00", "04:00:00", "04:15:00", "04:30:00", "04:45:00",
        "05:00:00", "05:15:00", "05:30:00", "05:45:00", "06:00:00", "06:15:00", "06:30:00", "06:45:00", "07:00:00", "07:15:00", "07:30:00",
        "07:45:00", "08:00:00", "08:15:00", "08:30:00", "08:45:00", "09:00:00", "09:15:00", "09:30:00", "09:45:00", "10:00:00", "10:15:00",
        "10:30:00", "10:45:00", "11:00:00", "11:15:00", "11:30:00", "11:45:00", "12:00:00", "12:15:00", "12:30:00", "12:45:00", "13:00:00",
        "13:15:00", "13:30:00", "13:45:00", "14:00:00", "14:15:00", "14:30:00", "14:45:00", "15:00:00", "15:15:00", "15:30:00", "15:45:00",
        "16:00:00", "16:15:00", "16:30:00", "16:45:00", "17:00:00", "17:15:00", "17:30:00", "17:45:00", "18:00:00", "18:15:00", "18:30:00",
        "18:45:00", "19:00:00", "19:15:00", "19:30:00", "19:45:00", "20:00:00", "20:15:00", "20:30:00", "20:45:00", "21:00:00", "21:15:00",
        "21:30:00", "21:45:00", "22:00:00", "22:15:00", "22:30:00", "22:45:00", "23:00:00", "23:15:00", "23:30:00", "23:45:00");
    let _fromDate = _data.fromDate;
    let time_slot = time_array;
    let arrayHeaderData = [];
    let weightage = _data.weightage;
    let daysCount = _data.tdays;
    if (daysCount == '' || daysCount == undefined || daysCount == NaN || daysCount == null) {
        daysCount = 1
    }
    if (weightage == '' || weightage == undefined || weightage == NaN || weightage == null) {
        weightage = 1
    }
    let forecstResult = [];
    let toDate = _data.toDate;
    let min_historic_result = daysCount;
    let max_deviation_result = forecastConfigEntity.maxDeviationResult;
    let plantData = [];
    plantData = plant;
    let listColumn = [];
    let previous_rounded_hour_by_insolation_result = '';
    //make an array for the excel rows
    let arrayData = [];
    let percentCell = [];
    arrayData[1] = arrayHeaderData;
    let current_insolation = [];
    let currentInsoFilterValue = insolationByPlantDOs.filter(items => items.insolationDate == _fromDate);
    let forecast_deviation_percentage = '';
    let module_temp_res_array = [];
    let current_rounded_hour_minus_1hr = '';
    let module_dev_range_result = '';
    current_insolation = currentInsoFilterValue;
    // Get previous rounded hour based on the currnet insolation
    let lastArray = (current_insolation.length - 1);
    let latest_insolatio_rec = current_insolation[lastArray];
    let insoLastHour = latest_insolatio_rec['insolationTime']
    if (current_insolation.length > 0) {
        previous_rounded_hour_by_insolation_result = insoLastHour.substring(0, 2);//date('H:00:00',  . "-1 hour"));
        previous_rounded_hour_by_insolation_result = parseInt(previous_rounded_hour_by_insolation_result - 1);
        previous_rounded_hour_by_insolation_result = previous_rounded_hour_by_insolation_result + ":00:00";
    }
    // Get forecast sheet data
    let forecastSheetFilterValue = forecastCalculationEntities;//.filter(items => items.date.substring(0.10) == forecast_date)[0];
    let get_data_from_forecast_sheet = forecastSheetFilterValue;//$this->fcm->getForecastedSheetDataSQL($plantData->plant_id, $forecast_date);
    let allCurrentPacFilterValue = activePowerByPlantDOs;//.filter(items => items.inverterDate == fromDate)[0];
    let allCurrentPac = allCurrentPacFilterValue;//$this->fcm->getActivePowerByPlantSQL($plantData->plant_id, $forecast_date);
    let weatherStationFilterValue = primaryWeatherDOs.filter(items => items.plantId == plant.plantId)[0];
    let primary_weather_station_data = weatherStationFilterValue;//$this->fcm->getPrimaryWeatherId($plantId);
    let primary_weather_station_id = 0;
    if (primary_weather_station_data) {
        primary_weather_station_id = primary_weather_station_data.weatherStationId;
    }

    let moduleTempFilterValue = moduleTempForecastByPlantIdDate;//.filter(items => items.date == fromDate)[0];
    let moduleTempDataForDay = moduleTempFilterValue;//$this->fcm->getModuleTemperatureForecastByDateTime3($plantData->plant_id, $forecast_date);
    let allActualPlantData = allCurrentPacFilterValue;//$this->fcm->getActualDataByPlantIdDateTimeSQL($plantData->plant_id, $forecast_date);
    let currentHourMinus1Hr = '';//dateAdd(today, "hour",-1);
    let result = [];
    result = {
        "time": "00:00:00",
        "plant_name": plant.plantName,
        "insolationForecastData": 0,
        "module_temp_forecast_data": 0,
        "generation_forecast_datas": 0,
        "system_losses": 0,
        "total_pac_data": 0,
        "insolation_forecast_count": 0,
        "insolation_dev_percentage": 0,
        "total_difference_data": 0,
        "penalty_calculated_data": 0,
        "deviationRespectSchedule": 0,
        "actual_irradiance": 0,
        "forecastIrradiance": 0,
        "actualtempLoss": 0,
        "forecastModuleTempLoss": 0,
        "absoluteErrorData": 0,
        "actualSystemLosses": 0,
        "multiF": 0,
        "adjustF": 0,
        "currentGeneratedForecastData": 0,
        "generationForecastWeightage2": 0,
        "count": 0,
        "Weighted_Average_Forecast": 0
    }
    let insolationDeviationRange = [];
    let moduleDeviationRange = [];
    let activeMultiFactor = 0;
    let InsolationHistoricData = 0;
    let insolationForecastData = 0;
    let currentGeneratedForecastData = 0;
    let forecastModuleTempLoss = 0;
    let forecastIrradiance = 0;
    let CurrentActiveHistoricData = 0;
    let sub_total = 0;
    let total_pac_subtotal = 0;
    let previous_sub_total = 0;
    let current_sub_total = 0;
    let forecast_count = 1; // to avoid divde by zero error
    let date_res_array = [];
    let res_array = [];
    let multiFactor = 0;
    let current_pac = [];
    let multiF = 0;
    let adjustF = 0;
    let nextActiveHistoricData = 0;
    let round_array_value = [];
    let adjusted_forecast = [];
    let adjusted_forecast_result = [];
    let previous_hour_forecast_irradiance = 0;
    let activeMultiFact = [];
    let insolution = 0.00;
    let resultTime = null;
    let dataResult = [];
    for (var dd = new Date(_fromDate); dd <= new Date(toDate); dd.setDate(dd.getDate() + 1)) {
        let fromDate = formatDate(new Date(dd));
        let forecast_date = fromDate;
        result2Date.push(fromDate);
        time_slot.forEach((valKey, index) => {
            result["time"] = valKey;
            let minutes = valKey;
            let min = minutes.substring(3, 5)
            minutes = minutes.substring(0, 2);
            if ((minutes >= '00' && minutes < '06') || (minutes >= '19' && minutes <= '24')) {
                result = {
                    "time": valKey,
                    "plant_name": plant.plantName,
                    "insolationForecastData": 0,
                    "module_temp_forecast_data": 0,
                    "generation_forecast_datas": 0,
                    "system_losses": 0,
                    "total_pac_data": 0,
                    "insolation_forecast_count": 0,
                    "insolation_dev_percentage": 0,
                    "total_difference_data": 0,
                    "penalty_calculated_data": 0,
                    "deviationRespectSchedule": 0,
                    "actual_irradiance": 0,
                    "forecastIrradiance": 0,
                    "actualtempLoss": 0,
                    "forecastModuleTempLoss": 0,
                    "absoluteErrorData": 0,
                    "actualSystemLosses": 0,
                    "multiF": 0,
                    "adjustF": 0,
                    "currentGeneratedForecastData": 0,
                    "generationForecastWeightage2": 0,
                    "count": 0
                }
            } else {
                // Get current days insolation data
                let getCurrentMinusHour = parseInt(parseInt(minutes));// - 1);
                if (getCurrentMinusHour.toString().length < 2) {
                    getCurrentMinusHour = "0" + getCurrentMinusHour;
                }
                current_rounded_hour_minus_1hr = getCurrentMinusHour;

                current_rounded_hour_minus_1hr = current_rounded_hour_minus_1hr + ":" + min + ":00";
                //   result["time"] = current_rounded_hour_minus_1hr;
                const filterValueCR = current_insolation.filter(
                    items =>
                        items.insolationTime == current_rounded_hour_minus_1hr)[0];
                if (filterValueCR == "") {
                    current_rounded_hour_minus_1hr = previous_rounded_hour_by_insolation_result;
                }
                // ------------- INSOLATION FORECAST -------------------------------------------------------------------------------------------------
                let insolation_dev_range_result = [];
                let filterValue = current_insolation.filter(items => items.insolationTime == current_rounded_hour_minus_1hr)[0];
                insolution = filterValue.insolation;
                let weatherStationId = filterValue.weatherStationId;
                const insolationDeviationrangeFilterValue = forecastIrradianceDeviationSQL.filter(
                    items => items.insolationDate == forecast_date &&
                        items.insolationTime == current_rounded_hour_minus_1hr)[0];
                if (insolationDeviationrangeFilterValue != undefined) {
                    if (filterValueCR) {
                        if (insolationDeviationRange[parseInt(current_rounded_hour_minus_1hr.substring(2))]) {
                            insolation_dev_range_result = insolationDeviationRange[parseInt(current_rounded_hour_minus_1hr.substring(2))];
                        } else {
                            insolation_dev_range_result = findInsolationDeviationRangeSQL(insolationDeviationrangeFilterValue.insolation, weatherStationId, current_rounded_hour_minus_1hr, fromDate, min_historic_result, max_deviation_result, insolationHistorytByWeatherIdDOs);//$this->findInsolationDeviationRangeSQL($current_insolation[$current_rounded_hour_minus_1hr]['insolation'], $current_insolation[$current_rounded_hour_minus_1hr]['weather_station_id'], $current_rounded_hour_minus_1hr, $forecast_date, $min_historic_result, $max_deviation_result);
                        }
                        insolationDeviationRange[parseInt(current_rounded_hour_minus_1hr.substring(0, 2))] = insolation_dev_range_result;
                        date_res_array = insolation_dev_range_result[0].date_res_array;
                        forecast_count = insolation_dev_range_result[0].forecast_count;
                        let forecast_deviation_percentage = insolation_dev_range_result[0].deviation_percentage;
                        const insolationHistoryFilterValue = insolationHistorytByWeatherIdDOs.filter(items => items.insolationDate == fromDate && items.insolationTime == valKey)[0];
                        const avgInso = avgInsolation.filter(items => items.insolationDate == fromDate && items.insolationTime == current_rounded_hour_minus_1hr)[0]
                        if (date_res_array.length > 0) {
                            sub_total = avgInso.insolation;//$this->fcm->getInsolationHistorytByDateTime($current_insolation[$current_rounded_hour_minus_1hr]['weather_station_id'], $date_res_array1, $minutes);
                        }
                        insolationForecastData = sub_total;
                        result["insolationForecastData"] = sub_total;
                        InsolationHistoricData = sub_total;
                        result['count'] = forecast_count;
                    }
                }
                //  -------- GENERATION FORECAST 2 ---------------------------------------------------------------------------------------------------
                minutes = valKey;
                if (minutes == '06:00:00' || minutes == '07:00:00' || minutes == '08:00:00' || minutes == '09:00:00'
                    || minutes == '10:00:00' || minutes == '11:00:00' || minutes == '12:00:00' || minutes == '13:00:00' || minutes == '14:00:00'
                    || minutes == '15:00:00' || minutes == '16:00:00' || minutes == '17:00:00' || minutes == '18:00:00' || minutes == '19:00:00') {
                    let previous_rounded_hour = current_rounded_hour_minus_1hr.substring(0, 2);
                    previous_rounded_hour = parseInt(previous_rounded_hour - 1);
                    if (previous_rounded_hour.toString().length < 2) {
                        previous_rounded_hour = "0" + previous_rounded_hour;
                    }
                    minutes.substring(0, 2);
                    previous_rounded_hour = parseInt(previous_rounded_hour - 1);
                    if (previous_rounded_hour.toString().length < 2) {
                        previous_rounded_hour = '0' + previous_rounded_hour;
                    }
                    const timeValue = current_rounded_hour_minus_1hr;
                    const filterValueCI = current_insolation.filter(
                        items =>
                            items.insolationTime == timeValue)[0];
                    if (filterValueCI == "") {
                        current_rounded_hour_minus_1hr = previous_rounded_hour_by_insolation_result;
                    }
                    if (current_rounded_hour_minus_1hr.toString().length < 2) {
                        current_rounded_hour_minus_1hr = '0' + current_rounded_hour_minus_1hr;
                    }
                    // To calculate Multifactor for current hour -1 rounded hour
                    let currentactive_pac = 0;
                    const filterValueCurrntPac = allCurrentPac.filter(
                        items =>
                            items.inverterTime == current_rounded_hour_minus_1hr)[0];
                    if (filterValueCurrntPac)
                        currentactive_pac = filterValueCurrntPac;
                    else
                        currentactive_pac = 0;
                    // To calculate insolation for current hour -1 rounded hour
                    let generation_rounded_dev_range_result = '';
                    const insolationDeviationrangeFilterValue1 = forecastIrradianceDeviationSQL.filter(
                        items => items.insolation == insolution && items.insolationDate == forecast_date &&
                            items.insolationTime == current_rounded_hour_minus_1hr)[0];
                    if (insolationDeviationrangeFilterValue1 != undefined) {
                        if (filterValueCI) {
                            // # If the insolation deviation values exists use otherwise find insolation based on the deviation range
                            if (insolationDeviationRange[parseInt(current_rounded_hour_minus_1hr.substring(0, 2))]) {
                                generation_rounded_dev_range_result = insolationDeviationRange[parseInt(current_rounded_hour_minus_1hr.substring(0, 2))];
                            } else {
                                // # Finding deviation range logic get the list of dates based on the insolation values
                                generation_rounded_dev_range_result = findInsolationDeviationRangeSQL(insolationDeviationrangeFilterValue1.insolation, weatherStationId, parseInt(minutes.substring(0, 2)), forecast_date, min_historic_result, max_deviation_result, insolationHistorytByWeatherIdDOs);
                            }
                            date_res_array = generation_rounded_dev_range_result[0].date_res_array;;
                            forecast_count = generation_rounded_dev_range_result[0].forecast_count;
                            let forecast_deviation_percentage = generation_rounded_dev_range_result[0].deviation_percentage;
                            const totalPacST = totalPacSubTotal.filter(items => items.inverterDate == fromDate && items.inverterTime == current_rounded_hour_minus_1hr)[0]
                            if (date_res_array.length > 0) {
                                // # For those matching insolation dates need to get the Total Pac value
                                previous_sub_total = totalPacST.totalPac;//$this->fcm->getActivePowerHistorytByDateTime($plantData->plant_id, $date_res_array, $current_rounded_hour_minus_1hr);
                            }

                            // # To calculate multi factor based on the active power data
                            if (previous_sub_total > 0 || previous_sub_total != null) {
                                CurrentActiveHistoricData = previous_sub_total;
                                result['count'] = forecast_count;
                                if (currentactive_pac) {
                                    activeMultiFactor = ((currentactive_pac.totalPac) / CurrentActiveHistoricData);
                                } else {
                                    activeMultiFactor = 0;
                                }
                            }
                        }
                    }
                }

                let next_rounded_hour = minutes.substring(0, 2);
                next_rounded_hour = parseInt(next_rounded_hour + 1);
                next_rounded_hour = next_rounded_hour + ":00:00";
                const filterValueCI1 = current_insolation.filter(
                    items =>
                        items.insolationTime == current_rounded_hour_minus_1hr)[0];
                if (filterValueCI1 == "") {
                    current_rounded_hour_minus_1hr = previous_rounded_hour_by_insolation_result;
                }
                let generation_dev_range_result = '';
                const insolationDeviationrangeFilterValue1 = forecastIrradianceDeviationSQL.filter(
                    items => items.insolation == insolution && items.insolationDate == forecast_date &&
                        items.insolationTime == current_rounded_hour_minus_1hr)[0];
                if (insolationDeviationrangeFilterValue1 != undefined) {
                    if (filterValueCI1) {
                        // # Finding deviation range logic
                        if (insolationDeviationRange[parseInt(current_rounded_hour_minus_1hr.substring(0, 2))]) {
                            generation_dev_range_result = insolationDeviationRange[parseInt(current_rounded_hour_minus_1hr.substring(0, 2))];
                        } else {
                            generation_dev_range_result = findInsolationDeviationRangeSQL(insolationDeviationrangeFilterValue1.insolation, weatherStationId, minutes, forecast_date, min_historic_result, max_deviation_result, insolationHistorytByWeatherIdDOs);//$this->findInsolationDeviationRangeSQL($current_insolation[$current_rounded_hour_minus_1hr]['insolation'], $current_insolation[$current_rounded_hour_minus_1hr]['weather_station_id'], $current_rounded_hour_minus_1hr, $forecast_date, $min_historic_result, $max_deviation_result);
                        }
                        date_res_array = generation_dev_range_result[0].date_res_array;
                        forecast_count = generation_dev_range_result[0].forecast_count;
                        forecast_deviation_percentage = generation_dev_range_result[0].deviation_percentage;
                        const totalPacST1 = totalPacSubTotal.filter(items => items.inverterDate == fromDate && items.inverterTime == valKey)[0]
                        if (date_res_array.length > 0) {
                            total_pac_subtotal = totalPacST1.totalPac;
                        }
                        if (total_pac_subtotal > 0 || total_pac_subtotal != null) {
                            nextActiveHistoricData = total_pac_subtotal;
                            if (activeMultiFactor <= 0) {
                                activeMultiFactor = 0;
                            }
                            currentGeneratedForecastData = (activeMultiFactor * nextActiveHistoricData);
                            result["currentGeneratedForecastData"] = currentGeneratedForecastData.toFixed(4);//.toFixed(4);
                        }
                    }
                }
            }
            let insolation_forecast_data = (insolationForecastData) ? insolationForecastData : 0;
            result["insolation_forecast_count"] = (forecast_count) ? forecast_count : 0;
            result["insolation_dev_percentage"] = (forecast_deviation_percentage) ? forecast_deviation_percentage : 0;
            // insertData = "'" . $plantData->plant_id . "','" . $plantData->plant_name . "','" . $forecast_date . "','" . $time . "','" . $insolation_forecast_data . "','" . $insolation_forecast_count . "','" . $insolation_dev_percentage . "','" . round($currentGeneratedForecastData, 4) . "'";
            // #echo $insertData;
            // $updateData = 'insolation_forecast =' . $insolation_forecast_data . ', insolation_forecast_count =' . $insolation_forecast_count . ', insolation_forecast_deviation =' . $insolation_dev_percentage . ',generation_forecast_2=' . $currentGeneratedForecastData;
            // #echo $updateData;
            // $this->fcm->insertInsolationForecastData($insertData, $updateData);

            // $percentCell = array_merge($percentCell, array('D' . ($valKey + 2), 'E' . ($valKey + 2), 'F' . ($valKey + 2)));

            // # -------- MODULE TEMPARATURE DATA ----------------------------------------------------------------------------------------------------------------
            sub_total = 0;
            forecast_count = 1; //# to avoid divde by zero error
            date_res_array = [];
            module_temp_res_array = 0;
            minutes = minutes.substring(0, 2);
            if ((minutes >= '00' && minutes < '06') || (minutes >= '19' && minutes <= '24')) {
                result = {
                    "time": valKey,
                    "plant_name": plant.plantName,
                    "insolationForecastData": 0,
                    "module_temp_forecast_data": 0,
                    "generation_forecast_datas": 0,
                    "system_losses": 0,
                    "total_pac_data": 0,
                    "insolation_forecast_count": 0,
                    "insolation_dev_percentage": 0,
                    "total_difference_data": 0,
                    "penalty_calculated_data": 0,
                    "deviationRespectSchedule": 0,
                    "actual_irradiance": 0,
                    "forecastIrradiance": 0,
                    "actualtempLoss": 0,
                    "forecastModuleTempLoss": 0,
                    "absoluteErrorData": 0,
                    "actualSystemLosses": 0,
                    "multiF": 0,
                    "adjustF": 0,
                    "currentGeneratedForecastData": 0,
                    "generationForecastWeightage2": 0,
                    "count": 0
                }
            } else {
                // # Get current days insolation data
                const filterValueMT = current_insolation.filter(
                    items =>
                        items.insolationTime == current_rounded_hour_minus_1hr)[0];
                if (filterValueMT == "") {
                    current_rounded_hour_minus_1hr = previous_rounded_hour_by_insolation_result;
                }
                if (filterValueMT) {
                    if (moduleDeviationRange[parseInt(current_rounded_hour_minus_1hr.substring(0, 2))]) {
                        module_dev_range_result = moduleDeviationRange[parseInt(current_rounded_hour_minus_1hr.substring(0, 2))];
                    } else {
                        // insolation_dev_range_result = findInsolationDeviationRangeSQL(insolationDeviationrangeFilterValue.insolation, weatherStationId, current_rounded_hour_minus_1hr, fromDate, min_historic_result, max_deviation_result, insolationHistorytByWeatherIdDOs);
                        module_dev_range_result = findModuleTemperatureDeviationRangeSQL(filterValueMT.tempMdul, current_rounded_hour_minus_1hr, forecast_date, min_historic_result, max_deviation_result, moduleTemperatureDeviationRangeSQL);
                        moduleDeviationRange[parseInt(current_rounded_hour_minus_1hr.substring(0, 2))] = module_dev_range_result;
                    }
                    // # Finding deviation range logic
                    date_res_array = module_dev_range_result[0].date_res_array;
                    forecast_count = module_dev_range_result[0].forecast_count;
                    forecast_deviation_percentage = module_dev_range_result[0].deviation_percentage;
                    const avgMdle = avgTmpMdle.filter(items => items.insolationDate == fromDate && items.insolationTime == current_rounded_hour_minus_1hr)[0]
                    if (date_res_array.length > 0) {
                        sub_total = avgMdle && avgMdle.tempMdul ? avgMdle.tempMdul : 0;//getModuleTemperatureHistorytByDateTime(current_insolation[current_rounded_hour_minus_1hr]['weather_station_id'], date_res_array, minutes);
                    }
                    module_temp_res_array = sub_total;//.toFixed(2);
                }
            }
            result["module_temp_forecast_data"] = module_temp_res_array.toFixed(2);
            let module_temp_forecast_data = (module_temp_res_array) ? module_temp_res_array.toFixed(2) : 0;
            let module_temp_forecast_count = 0; //!empty($module_temp_res_array[$minutes]['count']) ? round($module_temp_res_array[$minutes]['count'],2) :0;
            let dev_percentage = (forecast_deviation_percentage) ? forecast_deviation_percentage : 0;
            // $insertData = "'" . $plantData->plant_id . "','" . $plantData->plant_name . "','" . $forecast_date . "','" . $time . "','" . $module_temp_forecast_data . "','" . $module_temp_forecast_count . "','" . $dev_percentage . "'";
            // #echo $insertData;
            // $updateData = 'module_temperature_forecast =' . $module_temp_forecast_data . ', module_temperature_forecast_count =' . $module_temp_forecast_count . ', module_temperature_deviation =' . $dev_percentage;
            // #echo $updateData;
            // $this->fcm->insertModuleTemperatureForecastData($insertData, $updateData);

            // $percentCell = array_merge($percentCell, array('D' . ($valKey + 2), 'E' . ($valKey + 2), 'F' . ($valKey + 2)));

            // # -------- GENERATION FORECAST DATA ----------------------------------------------------------------------------------------------------------------

            let module_temperature_data = 0;
            insolation_forecast_data = 0;
            let temperature_coefficient_power_data = 0;
            let calc_module_temp_losses = 0;
            let forecasted_system_losses = 0;
            let deviationRespectSchedule = 0;
            res_array = [];
            let calc_generation_forecast = '';
            if ((minutes >= '00' && minutes < '06') || (minutes >= '19' && minutes <= '24')) {
                result = {
                    "time": valKey,
                    "plant_name": plant.plantName,
                    "insolationForecastData": 0,
                    "module_temp_forecast_data": 0,
                    "generation_forecast_datas": 0,
                    "system_losses": 0,
                    "total_pac_data": 0,
                    "insolation_forecast_count": 0,
                    "insolation_dev_percentage": 0,
                    "total_difference_data": 0,
                    "penalty_calculated_data": 0,
                    "deviationRespectSchedule": 0,
                    "actual_irradiance": 0,
                    "forecastIrradiance": 0,
                    "actualtempLoss": 0,
                    "forecastModuleTempLoss": 0,
                    "absoluteErrorData": 0,
                    "actualSystemLosses": 0,
                    "multiF": 0,
                    "adjustF": 0,
                    "currentGeneratedForecastData": 0,
                    "generationForecastWeightage2": 0,
                    "count": 0
                }
            } else {
                // # Get module temperature forecast value for the specifi period
                // # Get insolation forecast value for the specifi period
                if (insolationForecastData) {
                    insolation_forecast_data = insolationForecastData;
                }

                if (module_temp_forecast_data) {
                    module_temperature_data = module_temp_forecast_data;
                    result["module_temp_forecast_data"] = module_temp_forecast_data
                }

                if (plant.temperatureCoefficientPower) {
                    temperature_coefficient_power_data = plant.temperatureCoefficientPower;
                }
                let forecast_irradiance_deviation_date = '';
                // #Calculate Module Temperature Losses
                calc_module_temp_losses = (((25 - module_temperature_data) * (temperature_coefficient_power_data)) * -1);
                // # Calculate Forecasted System Loss based on the historic data
                const insolationDeviationrangeFilterValue = forecastIrradianceDeviationSQL.filter(
                    items => items.insolation == insolution && items.insolationDate == forecast_date &&
                        items.insolationTime == current_rounded_hour_minus_1hr);
                let calc_forecasted_system_loss = 0;
                if (insolationDeviationrangeFilterValue != undefined) {
                    if (primary_weather_station_id) {
                        // # Get DATE's -using forecast irradiance - by applying the band (+-) 5% deviation
                        forecast_irradiance_deviation_date = insolationDeviationrangeFilterValue;//getDateByforecastIrradianceDeviationSQL($insolation_forecast_data, $primary_weather_station_id, $minutes, $forecast_date);
                        // # Arranging date's as string
                        let prefix = '';
                        let forecast_irradiance_deviation_date_list = [];
                        forecast_irradiance_deviation_date.forEach(value => {
                            forecast_irradiance_deviation_date_list = value.insolationDate;
                            // prefix = ',';
                        })

                        // # Forecast module temperature - deviation - Apply the band (+/-) 2.5%
                        const filterActualModuleTempDOs = actualModuleTempDOs.filter(items => items.insolationDate == forecast_date && items.insolationTime == valKey);//fromDate
                        let getActualModuleDeviation = getActualModDeviation(forecast_irradiance_deviation_date_list, parseInt(minutes), module_temperature_data, primary_weather_station_id, min_historic_result, max_deviation_result, filterActualModuleTempDOs);
                        // #Need to check empty validation
                        if (getActualModuleDeviation) {
                            calc_forecasted_system_loss = parseFloat(calculateForecastedSystemLoss(getActualModuleDeviation[parseInt(minutes)]));//.toFixed(2);//calculateForecastedSystemLoss($getActualModuleDeviation[$minutes], $minutes);
                        }
                    }
                    if (calc_forecasted_system_loss) {
                        forecasted_system_losses = (calc_forecasted_system_loss / 100);
                    }

                    let forecasted_module_temperature_loss_tmp = Math.round((calc_module_temp_losses * 100), 2);
                    let forecasted_module_temperature_loss = forecasted_module_temperature_loss_tmp / 100;

                    calc_generation_forecast = ((insolation_forecast_data * 0.25 / 1000 * (1 + (forecasted_system_losses) + (forecasted_module_temperature_loss))) * (plant.plantCapacityAc * 4));
                    res_array[valKey] = calc_generation_forecast;
                }
            }
            let generation_forecast_datas = (calc_generation_forecast) ? calc_generation_forecast : 0;//.toFixed(4) 
            result["generation_forecast_datas"] = generation_forecast_datas.toFixed(2);
            let system_losses = forecasted_system_losses ? forecasted_system_losses : 0;
            result["system_losses"] = (forecasted_system_losses) ? forecasted_system_losses.toFixed(2) : 0;//.toFixed(2) 
            //$arrayData[] = array($time, $plant_name, $insolation_forecast_data,$module_temp_forecast_data,$generation_forecast_data, $system_losses);
            // $insertData = "'" . $plantData->plant_id . "','" . $plantData->plant_name . "','" . $forecast_date . "','" . $time . "','" . $generation_forecast_datas . "','" . $system_losses . "'";
            // #echo $insertData;
            // $updateData = 'generation_forecast =' . $generation_forecast_datas . ', generation_system_losses =' . $system_losses;
            // #echo $updateData;
            // $this->fcm->insertGenerationForecastData($insertData, $updateData);

            // # -------- GENERATION FORECAST WEIGHTAGE ----------------------------------------------------------------------------------------------------------------

            let finalWeightage = 100;
            let generationForecastWeightage = finalWeightage - weightage;
            let generationForecast = generation_forecast_datas * (generationForecastWeightage / 100);
            let generationforecastTwo = currentGeneratedForecastData * (weightage / 100);
            let generationForecastWeightage2 = generationForecast + generationforecastTwo;
            result["generationForecastWeightage2"] = generationForecastWeightage2.toFixed(4);//.toFixed(4);

            // # -------- ACTUAL REPORT DATA ----------------------------------------------------------------------------------------------------------------
            let penalty_res_array = [];
            let absoluteErrorData = 0;
            let difference_calc = '';
            let total_pac_data = '';
            let total_difference_data = '';
            let tariff_percentage_15_25 = '';
            let tariff_percentage_25_35 = '';
            let tariff_percentage_35_above = '';
            let ppa_kw_to_mw_value = '';
            let diff_data = '';
            if ((minutes >= '00' && minutes < '06') || (minutes >= '19' && minutes <= '24')) {
                result = {
                    "time": valKey,
                    "plant_name": plant.plantName,
                    "insolationForecastData": 0,
                    "module_temp_forecast_data": 0,
                    "generation_forecast_datas": 0,
                    "system_losses": 0,
                    "total_pac_data": 0,
                    "insolation_forecast_count": 0,
                    "insolation_dev_percentage": 0,
                    "total_difference_data": 0,
                    "penalty_calculated_data": 0,
                    "deviationRespectSchedule": 0,
                    "actual_irradiance": 0,
                    "forecastIrradiance": 0,
                    "actualtempLoss": 0,
                    "forecastModuleTempLoss": 0,
                    "absoluteErrorData": 0,
                    "actualSystemLosses": 0,
                    "multiF": 0,
                    "adjustF": 0,
                    "currentGeneratedForecastData": 0,
                    "generationForecastWeightage2": 0,
                    "count": 0
                }
                penalty_res_array['gen_forecast_weightage'] = 0;
                penalty_res_array['total_pac'] = 0;
                penalty_res_array['absolute_error'] = 0;
                difference_calc = 0;
            } else {
                // # Get actual data by plant id, date and time
                // #$current_actual_data = $allActualPlantData[$minutes];
                // #Calculate - Difference sheet data
                // #$generation_forecast_data = $this->fcm->getGenerationForecastByPlantIdDateTime($plantData->plant_id, $forecast_date, $minutes);
                penalty_res_array['gen_forecast_weightage'] = generationForecastWeightage2;
                penalty_res_array['total_pac'] = 0;
                penalty_res_array['absolute_error'] = 0;
                if (allActualPlantData) {
                    penalty_res_array['total_pac'] = allActualPlantData[index].totalPac;
                }
                difference_calc = (penalty_res_array['gen_forecast_weightage'] - penalty_res_array['total_pac']) / 1000;

                // # Absolute Error
                let deviationSchedule = '';
                let respectiveSchedule = '';
                let round = '';
                let error_value = '';
                let error_result = '';
                if (penalty_res_array['gen_forecast_weightage'] > 0) {
                    deviationSchedule = (penalty_res_array['gen_forecast_weightage'] - penalty_res_array['total_pac']) / (penalty_res_array['gen_forecast_weightage']);
                    respectiveSchedule = deviationSchedule
                    deviationRespectSchedule = (respectiveSchedule * 100) + "%";
                    result["deviationRespectSchedule"] = Math.round(respectiveSchedule * 100) + "%";//.toFixed(2)
                }
                error_value = ((penalty_res_array['gen_forecast_weightage']) - ((penalty_res_array['total_pac']) / plant.plantCapacityAc));
                if (error_value < 0) {
                    error_result = (penalty_res_array['gen_forecast_weightage'] - penalty_res_array['total_pac']) / plant.plantCapacityAc;
                } else {
                    error_result = -1 * ((penalty_res_array['gen_forecast_weightage'] - penalty_res_array['total_pac']) / plant.plantCapacityAc);
                }
                absoluteErrorData = Math.round((error_result * 100), 2).toFixed(2) + "%";
                result["absoluteErrorData"] = absoluteErrorData
            }
            let absolute_error = '';
            total_pac_data = (penalty_res_array['total_pac']) ? penalty_res_array['total_pac'] : 0;
            result["total_pac_data"] = (penalty_res_array['total_pac']) ? penalty_res_array['total_pac'] : 0;//.toFixed(4)
            absolute_error = (penalty_res_array['absolute_error']) ? penalty_res_array['absolute_error'] : 0;//.toFixed(4) 
            total_difference_data = (difference_calc) ? difference_calc : 0;//.toFixed(4)
            result["total_difference_data"] = (difference_calc) ? difference_calc.toFixed(4) : 0;//.toFixed(4) 
            // insertData = "'" . $plantData->plant_id . "','" . $plantData->plant_name . "','" . $forecast_date . "','" . $time . "','" . $total_pac_data . "','" . $total_difference_data . "','" . $absolute_error . "'";
            // # echo $insertData;
            // $updateData = 'penalty_actual_data =' . $total_pac_data . ', penalty_difference_data =' . $total_difference_data . ', absolute_error =' . $absolute_error;
            // # echo $updateData;
            // $this->fcm->insertPenaltyData($insertData, $updateData);

            let ppa_percentage_15 = '';
            let ppa_percentage_25 = '';
            let ppa_percentage_35 = '';
            let remainingForLevel2 = '';
            // # Calculate and get the 15% To 25%
            tariff_percentage_15_25 = plant.tariff * 0.1;
            // # Calculate and get the 25% To 35%
            tariff_percentage_25_35 = plant.tariff * 0.2;
            // # Calculate and get above 35%
            tariff_percentage_35_above = plant.tariff * 0.3;
            // # Calculate the Plant Connected capacity AC
            ppa_kw_to_mw_value = (plant.plantCapacityAc / 1000);
            // #echo '<br/> PPA upto to 15 <br/>';
            ppa_percentage_15 = 0.15 * ppa_kw_to_mw_value;
            // # Calculate and get the 25% To 35%
            // #echo '<br/> PPA 15 to 25 <br/>';
            ppa_percentage_25 = 0.25 * ppa_kw_to_mw_value;
            // # Calculate and get above 35%
            // #echo '<br/> PPA 25 to 35 <br/>';
            ppa_percentage_35 = 0.35 * ppa_kw_to_mw_value;

            diff_data = total_difference_data;

            //slab 1 : 3.4603972007
            //slab 2 : 8.8406198994
            //slab 3 : 10.068734339
            //slab 4 : 15.448349893

            // #Set the slab based on the calculated plant connected capacity ac values
            let slab_1_value = '';
            let slab_2_value = '';
            let slab_3_value = '';
            let slab_4_value = '';
            if (0 <= ppa_percentage_15) {
                // #Slab 1 : 0 to ppa_15 = 6
                // #echo '<br/> Slab 1 <br/> 0 - ';
                slab_1_value = ppa_percentage_15;
            }
            let value = slab_1_value + "_" + slab_2_value;
            if (ppa_percentage_15 <= ppa_percentage_25 && ppa_percentage_25 >= ppa_percentage_15) {
                // #Slab 2 : ppa_15 to ppa_25 = 6 -10
                // #echo '<br/> Slab 2 <br/>';
                value = ppa_percentage_25;
            }
            let value1 = slab_2_value + ' - ' + slab_3_value;
            let value2 = slab_3_value + ' - ' + slab_4_value;
            let result1 = '';
            let remainingForLevel3 = '';
            let remainingForLevel4 = '';
            let penalty_calculated_data = '';
            let actualSystemLosses = '';
            let actualSystem = '';
            let actualLosses = '';
            let actual_irradiance = '';
            let actualtempLoss = '';
            let actualTemp = '';
            if (ppa_percentage_25 <= ppa_percentage_35 && ppa_percentage_35 >= ppa_percentage_25) {
                // #Slab 3 : ppa_25 to ppa_35 = 10 -14
                // #echo '<br/> Slab 3 <br/>';
                value1 = ppa_percentage_35;
            } else {
                // #Slab 3 : ppa_35 and above = 14 above
                // #echo '<br/> Slab 4 <br/>';
                value2 = ppa_percentage_35;
            }

            // # 0-6 - Slab
            remainingForLevel2 = diff_data - slab_1_value;
            // # First slab no formula required
            result1 = 0;
            if (remainingForLevel2 > 0) {
                // # 6-10 - Slab
                if (remainingForLevel2 <= (slab_2_value - slab_1_value)) {
                    result1 += remainingForLevel2 * tariff_percentage_15_25 * 1000 / 4;
                } else {
                    result1 += (slab_2_value - slab_1_value) * tariff_percentage_15_25 * 1000 / 4;
                }

                remainingForLevel3 = diff_data - slab_2_value;
                if (remainingForLevel3 > 0) {
                    // # 10-14 - Slab
                    if (remainingForLevel3 <= (slab_3_value - slab_2_value)) {
                        result1 += remainingForLevel3 * tariff_percentage_25_35 * 1000 / 4;
                    } else {
                        result1 += (slab_3_value - slab_2_value) * tariff_percentage_25_35 * 1000 / 4;
                    }

                    remainingForLevel4 = diff_data - slab_3_value;
                    if (remainingForLevel4 > 0) {
                        // # 14 and above - Slab
                        result1 += remainingForLevel4 * tariff_percentage_35_above * 1000 / 4;
                    }
                }
            }
            // #echo '<br>Slab:'. $remainingForLevel2; echo '<br> Result1 :'. $result;
            penalty_calculated_data = (result1) ? result1 : 0;
            result["penalty_calculated_data"] = (result1) ? result1.toFixed(4) : 0;
            actualSystemLosses = 0;
            actualSystem = 0;
            actualLosses = 0;
            actual_irradiance = 0;
            actualtempLoss = 0;
            actualTemp = 0;

            // #------------- ACTUAL IRRADIANCE & ACTUAL TEMPERATURE LOSS ---------------------------------------------------------------------------
            let alculteTempLoss = '';
            let calculteTempLoss = '';
            let sub_calc1 = '';
            let sub_calc2 = '';
            let moduleTemp = '';
            let moduleForecastTemp = '';
            let forecastModuleTemp = '';
            let currentInsoFilter = current_insolation.filter(items => items.insolationTime == valKey)[0];
            if (currentInsoFilter) {
                actual_irradiance = currentInsoFilter.insolation;//.toFixed(2);
                result["actual_irradiance"] = actual_irradiance;//Math.round(current_insolation[minutes]['insolation'], 2);
                alculteTempLoss = ((25 - (currentInsoFilter.tempMdul)) * (temperature_coefficient_power_data)) * -1;
                let x = 0;
                x = Math.round((alculteTempLoss * 100), 2);//.toFixed(2)
                actualtempLoss = x.toFixed(2) + '%';
                result["actualtempLoss"] = actualtempLoss && actualtempLoss ? actualtempLoss : 0;
            }
            if (total_pac_data > 0) {
                sub_calc1 = total_pac_data;
                sub_calc2 = (actual_irradiance * (1 + actualTemp) * plant.plantCapacityAc / 1000);
                if (sub_calc2 > 0) {
                    actualSystem = (sub_calc1 / sub_calc2) - 1;
                }
            }

            actualLosses = Math.round(actualSystem, 4).toFixed(2);
            if (actual_irradiance) {
                actualSystemLosses = Math.round((actualLosses * 100), 2) + '%';
                result["actualSystemLosses"] = actualSystemLosses;
            }

            let getDataFromforecastFilter = get_data_from_forecast_sheet.filter(items => items.time == valKey)[0];
            if (getDataFromforecastFilter) {
                forecastIrradiance = getDataFromforecastFilter.insolationForecast;//.toFixed(2);
                result["forecastIrradiance"] = forecastIrradiance;//Math.round(get_data_from_forecast_sheet[minutes]['insolation_forecast'], 2);
                moduleTemp = getDataFromforecastFilter.moduleTemperatureForecast;

                moduleForecastTemp = ((25 - moduleTemp) * (temperature_coefficient_power_data)) * -1;
                let y = 0;
                y = (moduleForecastTemp * 100);//.toFixed(2);
                forecastModuleTempLoss = Math.round(y, 2).toFixed(2) + '%';
                result["forecastModuleTempLoss"] = forecastModuleTempLoss;//(forecastModuleTemp * 100)+'%';

            }

            // #------------- CALCULATING MULTIPLY FACTOR ---------------------------------------------------------------------------
            if (InsolationHistoricData > 0) {
                multiFactor = actual_irradiance / InsolationHistoricData;
            }

            if (multiFactor) {
                multiF = multiFactor;//.toFixed(4);
                result["multiF"] = multiF.toFixed(4);//multiFactor[minutes];
            }

            // $insertData = "'" . $plantData->plant_id . "','" . $plantData->plant_name . "','" . $forecast_date . "','" . $time . "','" . $penalty_calculated_data . "','" . round($multiF, 4) . "'";
            // #echo $insertData;
            // $updateData = 'penalty_calculated_data =' . $penalty_calculated_data . ', multiply_factor_data =' . round($multiF, 4);
            // #echo $updateData;
            // $previous_rounded_hour = date('H:00:00', strtotime('-1 hour', strtotime($minutes)));
            let previous_rounded_hour = dateAdd(today, "hour", -1);
            previous_rounded_hour = previous_rounded_hour.getHours();
            console.log('----d---adjusted_forecast_result-')

            if (get_data_from_forecast_sheet) {
                previous_hour_forecast_irradiance = Math.round(get_data_from_forecast_sheet[index].multiplyFactorData, 2);
                console.log(previous_hour_forecast_irradiance)
                console.log(get_data_from_forecast_sheet[index].multiplyFactorData)
            }
            // # Calculate Forecast Irradiance based on the previous hour's multiply factor
            adjusted_forecast_result = previous_hour_forecast_irradiance * InsolationHistoricData;
            console.log(adjusted_forecast_result)
            if (adjusted_forecast_result) {
                adjustF = adjusted_forecast_result;//.toFixed(4);
                result["adjustF"] = adjustF.toFixed(4);//adjusted_forecast_result[minutes];
            }
            let resultVary = {
                "time": result["time"],
                "Plant Name": result["plant_name"],
            }
            resultVary["Insolation - Forecast -" + fromDate] = result["insolationForecastData"];
            resultVary["Module Temperature - Forecast -" + fromDate] = result["module_temp_forecast_data"];
            resultVary["Generation - Forecast -" + fromDate] = result["generation_forecast_datas"];
            resultVary["System Losses"] = result["system_losses"];
            resultVary["Actual -" + fromDate] = result["total_pac_data"];
            resultVary["Insolation - Count -" + fromDate] = result["insolation_forecast_count"];
            resultVary["Deviation (%)"] = result["insolation_dev_percentage"];
            resultVary["Difference-" + fromDate] = result["total_difference_data"];
            resultVary["Penalty -" + fromDate] = result["penalty_calculated_data"];
            resultVary["Deviation Respect to schedule"] = result["deviationRespectSchedule"];
            resultVary["Actual Irradiance"] = result["actual_irradiance"];
            resultVary["Forecasted Irradiance"] = result["forecastIrradiance"];
            resultVary["Actual Module Temparature Loss"] = result["actualtempLoss"];
            resultVary["Forecast Module Temparature Losss"] = result["forecastModuleTempLoss"];
            resultVary["Absolute Error"] = result["absoluteErrorData"];
            resultVary["Actual System Losses"] = result["actualSystemLosses"];
            resultVary["Multiplying Factor"] = result["multiF"];
            resultVary["Adjusted Generation Forecast"] = result["adjustF"];
            resultVary["Generation Forecast 2-. " + fromDate] = result["currentGeneratedForecastData"];
            resultVary["Weighted Average Forecast"] = result["generationForecastWeightage2"];
            result2.push(resultVary);
            // result2Date.push(fromDate);
        })
        dataResult.push(result2);
    }

    return { "result2": dataResult, result2Date };
}

function findInsolationDeviationRangeSQL(insolation, weather_station_id, minutes, fromDate, min_historic_result, max_deviation_result, insolationHistorytByWeatherIdDOs) {
    let date_res_array = [];
    let sub_total = 0;
    let deviation_percentage = 1;
    let resultArray = [];

    // deviation_percentage:

    let current_insolation_data = 0;
    let deviation_result = 0;
    let deviation_result_add = 0;
    let deviation_result_sub = 0;
    let insolation_history_result = [];
    let forecast_count = 0;

    let count = 0;

    while (count <= 0) {


        current_insolation_data = insolation;
        deviation_result = (deviation_percentage * current_insolation_data) / 100;


        // # Calculate deviation and get the deviation range
        deviation_result_add = current_insolation_data + deviation_result;
        deviation_result_sub = current_insolation_data - deviation_result;

        // # Getting historic DATE for the plant weather at particular date for the particular time
        // const filterValue = insolationHistorytByWeatherIdDOs.filter(items => items.insolationDate == fromDate && items.insolation >= deviation_result_sub && items.insolation <= deviation_result_add && items.insolationTime == minutes);
        const filterValue = insolationHistorytByWeatherIdDOs.filter(items => items.insolationDate == fromDate && items.insolationTime == minutes);
        insolation_history_result = filterValue;//$this->fcm->getCurrentHourInsolationHistorytByWeatherId($weather_station_id, $deviation_result_sub, $deviation_result_add, $minutes, $forecast_date);
        forecast_count = insolation_history_result.length;

        if (min_historic_result >= forecast_count && deviation_percentage < max_deviation_result) {
            deviation_percentage += 1;
        }
        else {
            count = 1;
        }

    }

    let i = 0;
    for (i = 0; i <= insolation_history_result.length - 1; i++) {
        date_res_array.push(insolation_history_result[i].insolationDate);
        sub_total += parseFloat(insolation_history_result[i].insolation);
    }

    resultArray.push({ 'date_res_array': date_res_array, "forecast_count": forecast_count, "deviation_percentage": deviation_percentage, "sub_total": sub_total });

    return resultArray;
}

function findModuleTemperatureDeviationRangeSQL(module_temp, minutes, forecast_date, min_historic_result, max_deviation_result, moduleTemperatureDeviationRangeSQL) {
    let date_res_array = [];
    let deviation_percentage = 1;
    let sub_total = 0;
    let resultArray = [];

    let current_module_temp_data = module_temp;
    let deviation_result = (deviation_percentage * current_module_temp_data) / 100;

    let count = 0;
    let module_temp_history_result = [];
    let forecast_count = 0;
    while (count <= 0) {
        // Calculate deviation and get the deviation range
        let deviation_result_add = current_module_temp_data + deviation_result;
        let deviation_result_sub = current_module_temp_data - deviation_result;

        // Getting historic DATE for the plant weather at particular date for the particular time
        const filterValue = moduleTemperatureDeviationRangeSQL.filter(items => items.insolationDate == forecast_date && items.insolationTime == minutes);
        module_temp_history_result = filterValue;//this.getModuleTemperatureHistorytByWeatherId(weather_station_id, deviation_result_sub, deviation_result_add, minutes, forecast_date);

        forecast_count = module_temp_history_result.length;
        if (min_historic_result >= forecast_count && deviation_percentage < max_deviation_result) {
            deviation_percentage += 1;
            // continue;
        }
        else {
            count = 1;
        }
    }
    // module_temp_history_result.forEach(module_temp_history=>{
    //     date_res_array = module_temp_history.insolationDate;
    //     sub_total += module_temp_history.tempMdul;
    // })

    let i = 0;
    for (i = 0; i <= module_temp_history_result.length - 1; i++) {
        date_res_array.push(module_temp_history_result[i].insolationDate);
        sub_total += parseFloat(module_temp_history_result[i].insolation);
    }

    resultArray.push({ 'date_res_array': date_res_array, "forecast_count": forecast_count, "deviation_percentage": deviation_percentage, "sub_total": sub_total });

    return resultArray;
    // return {dateArray: date_res_array, forecastCount: forecast_count, devPercentage: deviation_percentage, subTotal: sub_total};
}

function calculateForecastedSystemLoss(system_loss_data) {
    let _result = [];
    let most_occurence_system_loss = 0;
    system_loss_data.forEach(loss_data => {
        _result = (loss_data.actualSystemLoss * 100);// System loss in percentage
    })
    if (_result.length > 1) {
        return findMaxNum(parseFloat(_result));
    } else {
        return parseFloat(_result);//.toFixed(2));

    }
    // $result = array();
    // $most_occurence_system_loss=0;
    // foreach($system_loss_data as $loss_data) {
    //    $result[] = $loss_data->actual_system_loss * 100; # System loss in percentage
    // }

    // # Arrange/calculate - actual module temp loss
    // if(!empty($result)) {
    //     $roundedArray = array_map('round', $result); # Round the decimal actual system loss values
    //     $convertToInt = array_map('intval',$roundedArray); # Convert to integer values
    //     arsort($convertToInt); # Arrange in descending order
    //     $firstHalfCount = count($convertToInt)/2; # Get first half count
    //     $firstHalfResult = array_slice($convertToInt, 0, $firstHalfCount, true); # Slice the first half values
    //     $values = array_count_values($firstHalfResult);
    //     arsort($values); # Arrange and sort by the maximum repeting number
    //     $most_occurence_system_loss = array_slice(array_keys($values), 0, 1, true); # Take the top one record - Maximum occurance system loss
    // }

    // return @$most_occurence_system_loss[0];
    // let most_occurence_system_loss = 0;
    // Arrange/calculate - actual module temp loss
    // if(_result) {
    //     let roundedArray = Math.round(_result);//array_map('round', _result);// Round the decimal actual system loss values
    //     let convertToInt = parseInt(roundedArray);//array_map('intval',roundedArray);// Convert to integer values
    //     convertToInt.reverse();//sort((a,b)=>{return b-a});// Arrange in descending order
    //     // let firstHalfCount = (convertToInt.length)/2;// Get first half count
    //     // let firstHalfResult =firstHalfResult.slice(convertToInt, 0, firstHalfCount, true);// Slice the first half values
    //     let half_length = Math.ceil(convertToInt.length / 2);
    //     let leftSide = convertToInt.splice(0,half_length);
    //     let values = leftSide;//array_count_values(firstHalfResult);
    //     let _maxValue = Math.max(values);// Arrange and sort by the maximum repeting number
    //     most_occurence_system_loss = _maxValue;//most_occurence_system_loss.slice(array_keys(values), 0, 1, true);// Take the top one record - Maximum occurance system loss
    // }
    // return most_occurence_system_loss;
}

function dateAdd(date, interval, units) {
    if (!(date instanceof Date))
        return undefined;
    var ret = new Date(date); //don't change original date
    var checkRollover = function () { if (ret.getDate() != date.getDate()) ret.setDate(0); };
    switch (String(interval).toLowerCase()) {
        case 'year': ret.setFullYear(ret.getFullYear() + units); checkRollover(); break;
        case 'quarter': ret.setMonth(ret.getMonth() + 3 * units); checkRollover(); break;
        case 'month': ret.setMonth(ret.getMonth() + units); checkRollover(); break;
        case 'week': ret.setDate(ret.getDate() + 7 * units); break;
        case 'day': ret.setDate(ret.getDate() + units); break;
        case 'hour': ret.setTime(ret.getTime() + units * 3600000); break;
        case 'minute': ret.setTime(ret.getTime() + units * 60000); break;
        case 'second': ret.setTime(ret.getTime() + units * 1000); break;
        default: ret = undefined; break;
    }
    return ret;
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

function dateFormat(data) {
    return new Date(data);
}

// # Get Actual Module temperature and actual temperature loss using actual irradiance result data - by applying the band (+-) 2.5% deviation
function getActualModDeviation(forecast_irradiance_date_list, minutes, forecasted_module_temperature, weather_station_id, min_historic_result, max_deviation_result, filterActualModuleTempDOs) {
    let calculated_actual_system_loss = [];
    let deviation_percentage = 2.5;

    // deviation_percentage:

    let deviation_result = (deviation_percentage * forecasted_module_temperature) / 100;

    // # Calculate deviation and get the deviation range
    let deviation_result_add = forecasted_module_temperature + deviation_result;
    let deviation_result_sub = forecasted_module_temperature - deviation_result;

    if ((forecast_irradiance_date_list)) {
        calculated_actual_system_loss[minutes] = filterActualModuleTempDOs;//$this->fcm->getActualModuleTempDeviation($weather_station_id, $deviation_result_sub, $deviation_result_add, $minutes, $forecast_irradiance_date_list);
    }

    // let forecast_count = module_temp_history_result.length;
    // if (min_historic_result >= forecast_count && deviation_percentage < max_deviation_result) {
    //     deviation_percentage += 1;
    //     // continue;
    // }
    // module_temp_history_result.forEach(module_temp_history=>{
    //     date_res_array = module_temp_history.insolationDate;
    //     sub_total += module_temp_history.tempMdul;
    // })

    // let i = 0;
    // for (i = 0; i < module_temp_history_result.length - 1;i++){
    //     date_res_array.push(module_temp_history_result[i].insolationDate);
    //     sub_total += parseFloat(module_temp_history_result[i].insolation);
    // }

    // resultArray.push({'date_res_array':date_res_array, "forecast_count":forecast_count, "deviation_percentage":deviation_percentage, "sub_total":sub_total});

    // return resultArray;

    let actual_irradiance_count = calculated_actual_system_loss[minutes].length;

    if (min_historic_result >= actual_irradiance_count && deviation_percentage <= max_deviation_result) {
        deviation_percentage += 1;
        // goto deviation_percentage;
    }

    return calculated_actual_system_loss;
}