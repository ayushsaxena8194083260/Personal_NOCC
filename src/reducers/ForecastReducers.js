import {
    GET_TIMESLOT,
    POST_TIME_SLOT,
    DELETE_TIME_SLOT,
    GET_FORMULAE,
    CLEAR_FORECAST,
    GET_FORECAST_DASHBOARD,
    SEARCH_REPORT,
    POST_FORECAST
} from '../actions/types'

const INITIAL_STATE = {
    displayMessage: "",
    grid1Display: [],
    grid2Display: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CLEAR_FORECAST:
            {
                return {
                    ...state,
                    reportData: [],
                    forecastData: [],
                    forecastDataPlus: [],
                    grid1Display: [],
                    grid2Display: [],
                    displayMessage: null
                }
            }
        case POST_FORECAST:
            return {
                ...state,
                forecastUpdate: action.forecastUpdate,
                displayMessage: action.displayMessage
            }
        case SEARCH_REPORT:
            return {
                ...state,
                searchReport: action.searchReport
            }
        case GET_TIMESLOT:
            return {
                ...state,
                input: action.input
            }
        case GET_FORMULAE:
            return {
                ...state,
                inputForecast: action.inputForecast
            }
        case POST_TIME_SLOT:
            return {
                ...state,
                displayMessage: action.displayMessage
            }
        case DELETE_TIME_SLOT:
            {
                return {
                    ...state,
                    displayMessage: action.displayMessage
                }
            }
        case GET_FORECAST_DASHBOARD:
            {
                let newState = { ...state }
                const gridResult = getForecastData(action.forecastData.plant,
                    action.forecastData.forecastConfigEntity, action.forecastData.primaryWeatherDOs,
                    action.forecastData.insolationByPlantDOs, action.forecastData.forecastCalculationEntities,
                    action.forecastData.activePowerByPlantDOs,
                    action.forecastData.forecastCalculationEntities2, action.forecastData.activePowerByPlantDOs2,
                    action.forecastData.insolationHistorytByWeatherIdDOs,
                    action.forecastData.totalPacSubTotal,
                    action.forecastData.moduleTemperatureDeviationRangeSQL, action.forecastData.avgTmpMdle,
                    action.forecastData.avgInsolation, action.forecastData.forecastIrradianceDeviationSQL,
                    action.forecastData.moduleTemperatureHistorytByWeatherIdDOs, action.forecastData.actualModuleTempDOs,
                    action.forecastData.moduleTempForecastByPlantIdDate,
                    state);
                // newState.forecastData = gridResult;
                newState.grid1Display = gridResult.reportData;
                newState.grid2Display = gridResult.reportData1;
                return newState
            }
        default:
            return state;
    }
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

/**
 * Adds time to a date. Modelled after MySQL DATE_ADD function.
 * Example: dateAdd(new Date(), 'minute', 30)  //returns 30 minutes from now.
 * 
 * @param date  Date to start with
 * @param interval  One of: year, quarter, month, week, day, hour, minute, second
 * @param units  Number of units of the given interval to add.
 */
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

function getForecastData(plant, forecastConfigEntity, primaryWeatherDOs, insolationByPlantDOs,
    forecastCalculationEntities, activePowerByPlantDOs, forecastCalculationEntities2, activePowerByPlantDOs2,
    insolationHistorytByWeatherIdDOs, totalPacSubTotal, moduleTemperatureDeviationRangeSQL, avgTmpMdle,
    avgInsolation, forecastIrradianceDeviationSQL, moduleTemperatureHistorytByWeatherIdDOs, actualModuleTempDOs, moduleTempForecastByPlantIdDate, state) {
    let weightage = state.searchReport.weightage;
    let daysCount = state.searchReport.daysCount;
    let inputDate = state.searchReport.date;
    if (daysCount == '' || daysCount == undefined || daysCount == NaN || daysCount == null) {
        daysCount = 0
    }
    if (weightage == '' || weightage == undefined || weightage == NaN || weightage == null) {
        weightage = 0
    }

    let plantType = "";
    let plantId = "";
    let edit_time = '';
    let edit_adj_gen_irradiance = '';
    let edit_adj_module_temperature = '';
    let edit_adj_system_losses = '';
    let res_array = [];
    let res_next_hour_array = [];
    let today = new Date();
    let minutes30 = dateAdd(today, "minute", -30);
    let currentHour = minutes30.getHours();
    let currentMinutes = minutes30.getMinutes();
    if (currentMinutes <= 15) {
        currentMinutes = "00";
    } else if (currentMinutes > 15 && currentMinutes <= 30) {
        currentMinutes = "30";
    } else {
        currentMinutes = "45";
    }
    let formated_current_rounded_hour = currentHour + ":" + currentMinutes;
    let _todayDate = getDate(today);
    let forecast_date = inputDate;
    let dt = new Date(forecast_date);
    let minusOneDate = formatDate(dt);//dt.setDate(dt.getDate()-1));
    let current_actual_data = [];
    let plus_two_hr = dateAdd(today, "hour", 2);
    let plusHr = plus_two_hr.getHours();
    let plusMnts = plus_two_hr.getMinutes();
    let plusScnds = plus_two_hr.getSeconds();
    let formated_current_rounder_hr_plus_two = plusHr + ":" + plusMnts + ":00";
    let formated_current_rounder_hr_plus_non_generation = plusHr;//+":"+plusMnts+":"+plusScnds;//formated_current_rounder_hr_plus_non_generation.getHours+":"+formated_current_rounder_hr_plus_non_generation.getMinutes+":"+formated_current_rounder_hr_plus_non_generation.getSeconds;
    let minus_two_hr = dateAdd(today, "hour", -2);
    let minusHr = minus_two_hr.getHours();
    let minusMnts = minus_two_hr.getMinutes();
    let formated_current_rounder_hr_minus_two = minusHr;//+":"+minusMnts+":00";//.getHours+":"+minus_two_hr.getMinutes+":"+minus_two_hr.getSeconds;//.getdate("H:i:00", minus_two_hr);
    let min_historic_result = daysCount;
    let max_deviation_result = forecastConfigEntity.maxDeviationResult;
    if (plant) {
        let currentInsoFilterValue = insolationByPlantDOs.filter(items => items.insolationDate == forecast_date);
        let current_insolation = currentInsoFilterValue;
        // Get previous rounded hour based on the currnet insolation
        let lastArray = (current_insolation.length - 1);
        let latest_insolatio_rec = current_insolation[lastArray];
        let insoLastHour = latest_insolatio_rec['insolationTime'];
        let previous_rounded_hour_by_insolation_result = '';
        if (current_insolation.length > 0) {
            previous_rounded_hour_by_insolation_result = insoLastHour.substring(0, 2);//date('H:00:00',  . "-1 hour"));
            previous_rounded_hour_by_insolation_result = parseInt(previous_rounded_hour_by_insolation_result - 1);
            previous_rounded_hour_by_insolation_result = previous_rounded_hour_by_insolation_result + ":00:00";
        }
        let weatherStationFilterValue = primaryWeatherDOs.filter(items => items.plantId == plant.plantId)[0];
        let primary_weather_station_id = 0;
        if (weatherStationFilterValue) {
            primary_weather_station_id = weatherStationFilterValue.weatherStationId;
        }

        let time_array = [];
        time_array.push("00:00:00", "00:15:00", "00:30:00", "00:45:00", "01:00:00", "01:15:00", "01:30:00", "01:45:00", "02:00:00",
            "02:15:00", "02:30:00", "02:45:00", "03:00:00", "03:15:00", "03:30:00", "03:45:00", "04:00:00", "04:15:00", "04:30:00", "04:45:00",
            "05:00:00", "05:15:00", "05:30:00", "05:45:00", "06:00:00", "06:15:00", "06:30:00", "06:45:00", "07:00:00", "07:15:00", "07:30:00",
            "07:45:00", "08:00:00", "08:15:00", "08:30:00", "08:45:00", "09:00:00", "09:15:00", "09:30:00", "09:45:00", "10:00:00", "10:15:00",
            "10:30:00", "10:45:00", "11:00:00", "11:15:00", "11:30:00", "11:45:00", "12:00:00", "12:15:00", "12:30:00", "12:45:00", "13:00:00",
            "13:15:00", "13:30:00", "13:45:00", "14:00:00", "14:15:00", "14:30:00", "14:45:00", "15:00:00", "15:15:00", "15:30:00", "15:45:00",
            "16:00:00", "16:15:00", "16:30:00", "16:45:00", "17:00:00", "17:15:00", "17:30:00", "17:45:00", "18:00:00", "18:15:00", "18:30:00",
            "18:45:00", "19:00:00", "19:15:00", "19:30:00", "19:45:00", "20:00:00", "20:15:00", "20:30:00", "20:45:00", "21:00:00", "21:15:00",
            "21:30:00", "21:45:00", "22:00:00", "22:15:00", "22:30:00", "22:45:00", "23:00:00", "23:15:00", "23:30:00", "23:45:00");

        let time_slot = time_array;//getTimeSlotByPlantId();//timeSlotData;//time_slot = this.cm.getTimeSlotByPlantId();
        let actual_system_loss = 0;
        let actual_insolation_sub_total = 0;
        let forecast_insolation_sub_total = 0;
        let actual_module_temp_sub_total = 0;
        let forecast_module_temp_sub_total = 0;
        let actual_system_loss_sub_total = 0;
        let forecasted_system_loss_sub_total = 0;
        let insolation_slot_count = 0;
        let actual_data_available_count = 0;
        let deviationSchedule = 0;
        let previous_hour_forecast_irradiance = 0;

        // # -------- CURRENT HOUR FORECASTING START ----------------------------------------------------------------

        // # Get all active power table values based on the plant id and date
        const filterActivePowerByPlantDOs = activePowerByPlantDOs.filter(items => items.inverterDate == forecast_date);
        current_actual_data = filterActivePowerByPlantDOs;
        // current_actual_data = $this->fcm->getActivePowerByPlantDate($plantData->plant_id, $forecast_date);

        // # Get all forecast_calculation table data based on the plant id and date
        const filterData = forecastCalculationEntities.filter(items => items.inverterDate == minusOneDate);
        let get_data_from_forecast_sheet = filterData;

        let i = 0;
        let result = [];
        let temperature_coefficient_power_data = 0;
        let calc_forecasted_module_temp_losses = 0;
        let calc_forecasted_system_loss = 0;
        time_array.forEach(valKey => {
            const value = valKey.split(":");
            let minutes = value[i];
            if ((minutes >= '00' && minutes <= '06') || (minutes >= '20' && minutes <= '24')) {
                res_array.push({ "count": 0 })
                res_array[minutes, 0] = 0;
            } else if (minutes >= formated_current_rounder_hr_minus_two && minutes <= formated_current_rounder_hr_plus_non_generation) {
                result = {
                    "minutes": minutes,
                    "actual_total_pac": 0,
                    "generation_forecast": 0,
                    "generation_forecast_2": 0,
                    "generation_forecast_weightage2": 0,
                    "actual_irradiance": 0,
                    "forecast_irradiance": 0,
                    "schedule_forecast": 0,
                    "actual_module_temperature_loss": 0,
                    "module_temperature_forecast": 0,
                    "forecasted_module_temperature_loss": 0,
                    "actual_system_loss": 0,
                    "forecasted_system_losses": 0
                }
                const filterData = forecastCalculationEntities.filter(items => items.date.substring(0, 10) == minusOneDate && items.time == valKey)[0];
                get_data_from_forecast_sheet = filterData;
                const filterData1 = insolationByPlantDOs.filter(items => items.insolationDate == forecast_date && items.insolationTime == valKey)[0];
                current_insolation = filterData1;
                if (plant.temperatureCoefficientPower) {
                    temperature_coefficient_power_data = plant.temperatureCoefficientPower;
                }

                const filterValue = activePowerByPlantDOs.filter(items => items.inverterDate == forecast_date && items.inverterTime == valKey)[0];
                current_actual_data = filterValue;
                // # Actual (MW) 
                if (current_actual_data) {
                    result['actual_total_pac'] = current_actual_data.totalPac;
                }

                // # Forecast (MW) & Module temperature forecast
                if (get_data_from_forecast_sheet) {
                    result['generation_forecast'] = filterData.generationForecast;
                    result['generation_forecast_2'] = filterData.generationForecast2;
                    result['module_temperature_forecast'] = filterData.moduleTemperatureForecast;
                }

                // -------- GENERATION FORECAST WEIGHTAGE -------------------------------------------------------------------------
                let genFore = result["generation_forecast"];
                let genFore2 = result["generation_forecast_2"];
                let finalWeightage = 100;
                let generationForecastWeightage = finalWeightage - weightage;
                let generationForecast = genFore * (generationForecastWeightage / 100);
                let generationforecastTwo = genFore2 * (weightage / 100);
                result["generation_forecast_weightage2"] = generationForecast + generationforecastTwo;

                // -------- respective Schedule -------------------------------------------------------------------------------------
                if (result["generation_forecast"] > 0) {
                    deviationSchedule = (result["generation_forecast_weightage2"] - result["actual_total_pac"]) / (result["generation_forecast_weightage2"]);
                    result["schedule_forecast"] = (deviationSchedule).toFixed(2);
                }

                // -------- Actual Irradiance (W/m2) ---------------------------------------------------------------------------------
                if (current_insolation) {
                    result["actual_irradiance"] = current_insolation.insolation;//.toFixed(2);
                    actual_insolation_sub_total += result["actual_irradiance"];
                    if (current_insolation) {
                        actual_data_available_count++;
                        insolation_slot_count++;
                    }
                }

                // -------- Forecasted Irradiance (W/m2) ---------------------------------------------------------------------------------
                // Get multiply factory data for the previous hour
                let previous_rounded_hour = parseInt(minutes - 1);//date('H:00:00', strtotime('-1 hour',strtotime(minutes)));
                if (previous_rounded_hour < 10) {
                    previous_rounded_hour = "0" + previous_rounded_hour;
                }
                let valKeyPreviousHour = valKey;
                valKeyPreviousHour = valKeyPreviousHour.replace(/^.{2}/g, previous_rounded_hour);
                const filterData2 = forecastCalculationEntities.filter(items => items.date.substring(0, 10) == minusOneDate &&
                    items.time == valKey)[0];
                let get_data_from_forecast_sheet_previousHour = filterData2;

                if (get_data_from_forecast_sheet) {
                    previous_hour_forecast_irradiance = (get_data_from_forecast_sheet_previousHour.multiplyFactorData);//.toFixed(2));
                }
                let adjusted_forecast_result = [];
                if (get_data_from_forecast_sheet) {
                    // Calculate Forecast Irradiance based on the previous hour's multiply factor
                    adjusted_forecast_result[valKey] = previous_hour_forecast_irradiance * get_data_from_forecast_sheet.insolationForecast;

                    if (adjusted_forecast_result[valKey]) {
                        result["forecast_irradiance"] = (adjusted_forecast_result[valKey].toFixed(2));
                    }
                    if (actual_data_available_count >= insolation_slot_count && (result["actual_irradiance"])) {
                        forecast_insolation_sub_total += result["forecast_irradiance"];
                    }
                }

                if (get_data_from_forecast_sheet) {
                    result["forecast_irradiance"] = get_data_from_forecast_sheet.insolationForecast;
                }

                // -------- Actual Module Temp Loss ---------------------------------------------------------------------------------
                let calc_module_temp_losses = 0;
                if (current_insolation) {
                    calc_module_temp_losses = (((25 - current_insolation.tempMdul) * (temperature_coefficient_power_data)) * (-1));
                    result["actual_module_temperature_loss"] = (calc_module_temp_losses).toFixed(4);
                    actual_module_temp_sub_total += result["actual_module_temperature_loss"] * 100;
                }

                // -------- Forecasted Module Temperature Loss ----------------------------------------------------------------------
                if (result["module_temperature_forecast"] > 0) {
                    calc_forecasted_module_temp_losses = (((25 - result["module_temperature_forecast"]) * (temperature_coefficient_power_data)) * (-1));
                }

                if (get_data_from_forecast_sheet) {
                    result["forecasted_module_temperature_loss"] = (calc_forecasted_module_temp_losses).toFixed(4);
                    if (actual_data_available_count >= insolation_slot_count && (result["actual_irradiance"])) {
                        forecast_module_temp_sub_total += (result["forecasted_module_temperature_loss"] * 100);
                    }
                }

                // -------- Forecasted System losses ----------------------------------------------------------------------
                // Calculate Forecasted System Loss based on the historic data
                let forecast_irradiance_deviation_date = [];
                let forecast_irradiance_deviation_date_list = '';
                let getActualModuleDeviation = [];
                let prefix = '';
                const filterForecastIrradianceDeviationSQL = forecastIrradianceDeviationSQL.filter(items => items.insolationDate == minusOneDate && items.insolationTime == valKey)[0];
                let forecastIrradianceDeviationSQLFilterData = filterForecastIrradianceDeviationSQL;
                if (primary_weather_station_id) {
                    // Get DATE's -using forecast irradiance - by applying the band (+-) 5% deviation
                    forecast_irradiance_deviation_date = getDateByforecastIrradianceDeviationSQL(result['forecast_irradiance'], primary_weather_station_id, valKey, minusOneDate, forecastIrradianceDeviationSQL);
                    // Arranging date's as string
                    forecast_irradiance_deviation_date_list = '';
                    forecast_irradiance_deviation_date.forEach(value => {
                        forecast_irradiance_deviation_date_list = value.insolationDate;
                    })
                    getActualModuleDeviation = getActualModuleDeviationFunc(forecast_irradiance_deviation_date_list, valKey, result["module_temperature_forecast"], min_historic_result, max_deviation_result, actualModuleTempDOs);//actualModuleTempDOs)
                    // Forecast module temperature - deviation - Apply the band (+/-) 2.5%
                    //    const filterActualModuleTempDOs = actualModuleTempDOs.filter(items => items.insolationDate == inputDate && items.insolationTime == valKey);
                    // //    actualModuleTempDOsFilterData = filterForecastIrradianceDeviationSQL;
                    //     getActualModuleDeviation = filterActualModuleTempDOs;//this.getActualModuleDeviation(forecast_irradiance_deviation_date_list, minutes, res_array[minutes]['module_temperature_forecast'], primary_weather_station_id[0].weather_station_id, min_historic_result, max_deviation_result);

                    //Need to check empty validation
                    if (getActualModuleDeviation.length > 0) {
                        calc_forecasted_system_loss = calculateForecastedSystemLoss(getActualModuleDeviation);//, minutes);
                    }
                }

                if (calc_forecasted_system_loss) {
                    result["forecasted_system_losses"] = (calc_forecasted_system_loss).toFixed(4);
                    if (actual_data_available_count >= insolation_slot_count && (result["actual_irradiance"])) {
                        forecasted_system_loss_sub_total += result["forecasted_system_losses"];
                    }
                }

                // -------- Actual system losses ----------------------------------------------------------------
                let sub_calc1 = 0;
                let sub_calc2 = 0;
                if (result["actual_total_pac"] > 0) {
                    sub_calc1 = result["actual_total_pac"];
                    sub_calc2 = (result["actual_irradiance"] * (1 + result["actual_module_temperature_loss"]) * plant.plantCapacityAc / 1000);
                    if (sub_calc2 > 0) {
                        actual_system_loss = ((sub_calc1 / sub_calc2) - 1);
                    }
                }

                result["actual_system_loss"] = (actual_system_loss).toFixed(4);
                if (result["actual_irradiance"]) {
                    actual_system_loss_sub_total += result["actual_system_loss"] * 100;
                }

                // -------- Absolute Error ----------------------------------------------------------------------
                let error_value = (result["generation_forecast_weightage2"] - result["actual_total_pac"]) / plant.plantCapacityAc;
                let error_result = '';
                if (error_value < 0) {
                    error_result = (result["generation_forecast_weightage2"] - result["actual_total_pac"]) / plant.plantCapacityAc;
                } else {
                    error_result = -1 * ((result["generation_forecast_weightage2"] - result["actual_total_pac"]) / plant.plantCapacityAc);
                }
                result["absolute_error"] = (error_result).toFixed(4);

                let last_ins_rec_time = 0;
                let rec_time = [];
                const filterInsolationHistorytByWeatherIdDOs = insolationHistorytByWeatherIdDOs.filter(items => items.insolationDate == minusOneDate && items.insolationTime == valKey)[0];
                let insolationHistorytByWeatherIdDOsFilterData = filterInsolationHistorytByWeatherIdDOs;
                if (primary_weather_station_id) {
                    rec_time = insolationHistorytByWeatherIdDOsFilterData;//this.getPrimaryWeatherLastInsolationTime(primary_weather_station_id[0].weather_station_id, forecast_date);//  QueryConstant.getPrimaryWeatherLastInsolationTime
                    if (rec_time) {
                        last_ins_rec_time = rec_time.insolationTime;
                    }
                }

                if (valKey > last_ins_rec_time) {
                    result["actual_total_pac"] = 'DNA';
                    result["absolute_error"] = 'DNA';
                    result["actual_irradiance"] = 'DNA';
                    result["actual_module_temperature_loss"] = 'DNA';
                    result["actual_system_loss"] = 'DNA';
                    result["schedule_forecast"] = 'DNA';
                    result["generation_forecast_2"] = 'DNA';
                    result["generation_forecast_weightage2"] = 'DNA';
                }
                i += 1;
            }
            res_array.push({ minutes: valKey, result: result });
        })

        // -------- CURRENT HOUR FORECASTING END ----------------------------------------------------------------

        // -------- NEXT TO NEXT HOUR FORECASTING START ---------------------------------------------------------
        let actual_insolation_sub_result = 0;
        let forecast_insolation_sub_result = 0;
        let actual_module_temp_sub_result = 0;
        let forecast_module_temp_sub_result = 0;
        let actual_system_loss_sub_result = 0;
        let forecast_system_loss_sub_result = 0;
        if (insolation_slot_count > 0) {
            actual_insolation_sub_result = actual_insolation_sub_total / insolation_slot_count;
            forecast_insolation_sub_result = forecast_insolation_sub_total / insolation_slot_count;

            actual_module_temp_sub_result = actual_module_temp_sub_total / insolation_slot_count;
            forecast_module_temp_sub_result = forecast_module_temp_sub_total / insolation_slot_count;

            actual_system_loss_sub_result = actual_system_loss_sub_total / insolation_slot_count;
            forecast_system_loss_sub_result = forecasted_system_loss_sub_total / insolation_slot_count;
            let i = 0;
            let only_rounded_hour = formated_current_rounder_hr_plus_two.split(":");//explode(':', formated_current_rounder_hr_plus_two);
            time_array.forEach(valKey => {
                const value = valKey.split(":");
                let minutes = value[i];
                // if((minutes >= '00' && minutes <= '06') || (minutes >= '20' && minutes <= '24')) {
                //     // res_array[minutes,'count'] = 0;    
                // minutes = valKey.getMinutes();
                let insolation_sub_total = 0;
                let module_temp_sub_total = 0;
                let insolation_forecast_count = 1;// to avoid divde by zero error
                let module_forecast_count = 1;// to avoid divde by zero error
                let calc_module_temp_losses = 0;
                let calc_generation_forecast = 0;
                let calc_system_losses = 0;
                let adjusted_system_losses = 0;
                let adjusted_irradiance = 0;
                let adjusted_module_temperature_forecast = 0;
                let formated_adjusted_module_temperature_forecast = 0;
                let adjusted_generation_forecast = 0;
                let temperature_coefficient_power_data = 0;

                let only_time_slot_minutes = minutes.split(":");//explode(':', minutes);
                let result = [];
                if ((minutes >= '00' && minutes <= '06') || (minutes >= '20' && minutes <= '24')) {
                    res_next_hour_array.push({"count" : 0})
                    res_next_hour_array[minutes,0] = 0;
                    // result = {
                    //     "minutes": minutes,
                    //     "irradiance": 0,
                    //     "adjusted_irradiance": 0,
                    //     "module_temperature_forecast": 0,
                    //     "adjusted_module_temperature_forecast": 0,
                    //     "system_losses": 0,
                    //     "adjusted_system_losses": 0,
                    //     "generation_forecast": 0,
                    //     "adjusted_generation_forecast": 0,
                    //     "forecast_calculation_id": 0,
                    //     "adjusted_module_temperature_forecast_absolute": 0,
                    //     "adjusted_system_losses_absolute": 0,
                    // }
                } else if (only_time_slot_minutes[0] == only_rounded_hour[0]) {
                    result = {
                        "minutes": minutes,
                        "irradiance": 0,
                        "adjusted_irradiance": 0,
                        "module_temperature_forecast": 0,
                        "adjusted_module_temperature_forecast": 0,
                        "system_losses": 0,
                        "adjusted_system_losses": 0,
                        "generation_forecast": 0,
                        "adjusted_generation_forecast": 0,
                        "forecast_calculation_id": 0,
                        "adjusted_module_temperature_forecast_absolute": 0,
                        "adjusted_system_losses_absolute": 0,
                    }
                    const filterData1 = forecastCalculationEntities.filter(items => items.date.substring(0, 10) == minusOneDate && items.time == valKey)[0];
                    get_data_from_forecast_sheet = filterData1;

                    // Get current days insolation data minus one hour
                    let current_rounded_hour_minus_1hr = previous_rounded_hour_by_insolation_result;
                    const insolationDeviationrangeFilterValue = forecastIrradianceDeviationSQL.filter(
                        items => items.insolationDate == minusOneDate &&
                            items.insolationTime == current_rounded_hour_minus_1hr)[0];

                    if (current_insolation) {
                        // Building Forecasted Irradiance (W/m2) data
                        // Finding deviation range logic for insolation
                        let insolation_dev_range_result = findInsolationDeviationRangeSQL(insolationDeviationrangeFilterValue.insolation, current_rounded_hour_minus_1hr, minusOneDate, min_historic_result, max_deviation_result, insolationHistorytByWeatherIdDOs);
                        let date_res_array = insolation_dev_range_result[0].date_res_array;
                        let forecast_count = insolation_dev_range_result[0].forecast_count;
                        // let forecast_deviation_percentage = insolation_dev_range_result[0].deviation_percentage;
                        // const insolationHistoryFilterValue = insolationHistorytByWeatherIdDOs.filter(items => items.insolationDate == fromDate && items.insolationTime == valKey)[0];
                        const avgInso = avgInsolation.filter(items => items.insolationDate == minusOneDate && items.insolationTime == current_rounded_hour_minus_1hr)[0]
                        let sub_total = 0;
                        if (date_res_array.length > 0) {
                            sub_total = avgInso.insolation;//$this->fcm->getInsolationHistorytByDateTime($current_insolation[$current_rounded_hour_minus_1hr]['weather_station_id'], $date_res_array1, $minutes);
                        }
                        result["irradiance"] = sub_total;
                        if (forecast_insolation_sub_result > 0) {
                            adjusted_irradiance = ((actual_insolation_sub_result / forecast_insolation_sub_result) * result["irradiance"]);
                        }
                        if (edit_adj_gen_irradiance) {
                            result["adjusted_irradiance"] = (edit_adj_gen_irradiance).toFixed(2);
                        } else if (get_data_from_forecast_sheet.adjustedIrradiance) {
                            result["adjusted_irradiance"] = (get_data_from_forecast_sheet.adjustedIrradiance).toFixed(2);
                        } else {
                            result["adjusted_irradiance"] = (adjusted_irradiance).toFixed(2);
                        }

                        //Building Forecasted Module Temperature Loss
                        // Finding deviation range logic for module temperature
                        const filterModuleTemperatureDeviationRangeSQL1 = moduleTemperatureDeviationRangeSQL.filter(items => items.insolationDate == minusOneDate && items.insolationTime == valKey)[0];
                        let moduleTemperatureDeviationRangeSQLFilterData = filterModuleTemperatureDeviationRangeSQL1;
                        let module_dev_range_result = findModuleTemperatureDeviationRangeSQL(current_insolation.tempMdul, valKey, minusOneDate, min_historic_result, max_deviation_result, moduleTemperatureDeviationRangeSQL);

                        let module_date_res_array = module_dev_range_result[0].date_res_array;
                        let module_forecast_count = module_dev_range_result[0].forecast_count;
                        // let forecast_deviation_percentage = module_dev_range_result[0].deviation_percentage;
                        let module_temp_sub_total = 0;
                        const avgMdle = avgTmpMdle.filter(items => items.insolationDate == minusOneDate && items.insolationTime == current_rounded_hour_minus_1hr)[0]
                        if (module_date_res_array.length > 0) {
                            module_temp_sub_total = avgMdle && avgMdle.tempMdul ? avgMdle.tempMdul : 0;//getModuleTemperatureHistorytByDateTime(current_insolation[current_rounded_hour_minus_1hr]['weather_station_id'], date_res_array, minutes);
                        }
                        let module_temperature_forecast = parseFloat((module_temp_sub_total / module_forecast_count).toFixed(4));
                        let module_temperature_forecast_res = (((25 - module_temperature_forecast) * (temperature_coefficient_power_data)) * (-1));
                        result["module_temperature_forecast"] = parseFloat(module_temperature_forecast_res.toFixed(4));

                        adjusted_module_temperature_forecast = (actual_module_temp_sub_result / forecast_module_temp_sub_result) * result["module_temperature_forecast"];

                        if (edit_adj_module_temperature) {
                            result["adjusted_module_temperature_forecast_absolute"] = (edit_adj_module_temperature).toFixed(2);
                            result["adjusted_module_temperature_forecast"] = (edit_adj_module_temperature).toFixed(2) + '%';
                        } else if (get_data_from_forecast_sheet.adjustedForModTempLoss) {
                            result["adjusted_module_temperature_forecast_absolute"] = (get_data_from_forecast_sheet.adjustedForModTempLoss).toFixed(2);
                            result["adjusted_module_temperature_forecast"] = (get_data_from_forecast_sheet.adjustedForModTempLoss).toFixed(2) + '%';
                        } else {
                            formated_adjusted_module_temperature_forecast = (adjusted_module_temperature_forecast).toFixed(2);
                            result["adjusted_module_temperature_forecast_absolute"] = formated_adjusted_module_temperature_forecast;
                            result["adjusted_module_temperature_forecast"] = (formated_adjusted_module_temperature_forecast * 100) + '%';
                        }

                        //Build Forecasted System losses
                        // Calculate Forecasted System Loss based on the historic data
                        let calc_forecasted_system_loss = 0;
                        const filterForecastIrradianceDeviationSQL = forecastIrradianceDeviationSQL.filter(items => items.insolationDate == minusOneDate && items.insolationTime == valKey)[0];
                        let forecastIrradianceDeviationSQLFilterData = filterForecastIrradianceDeviationSQL;
                        if (primary_weather_station_id) {
                            let forecast_irradiance_next_hr = parseFloat((get_data_from_forecast_sheet.insolationForecast).toFixed(2));
                            let module_temperature_forecast_next_hr = parseFloat((get_data_from_forecast_sheet.moduleTemperatureForecast).toFixed(2));

                            // Get DATE's -using forecast irradiance - by applying the band (+-) 5% deviation
                            let forecast_irradiance_deviation_date = getDateByforecastIrradianceDeviationSQL(forecast_irradiance_next_hr, primary_weather_station_id, valKey, minusOneDate, forecastIrradianceDeviationSQL);
                            // Arranging date's as string
                            let forecast_irradiance_deviation_date_list = '';
                            forecast_irradiance_deviation_date_list = forecast_irradiance_deviation_date[0].insolationDate;
                            // forecast_irradiance_deviation_date.forEach(value=>{
                            //     forecast_irradiance_deviation_date_list = value.insolationDate;
                            // })
                            // Forecast module temperature - deviation - Apply the band (+/-) 2.5%//actualModuleTempDOs
                            const filterActualModuleTempDOs = actualModuleTempDOs.filter(items => items.insolationDate == minusOneDate && items.insolationTime == valKey)[0];
                            let getActualModuleDeviation = getActualModuleDeviationFunc(forecast_irradiance_deviation_date_list, valKey, result["module_temperature_forecast"], min_historic_result, max_deviation_result, actualModuleTempDOs);

                            //Need to check empty validation
                            if (getActualModuleDeviation) {
                                calc_forecasted_system_loss = calculateForecastedSystemLoss(getActualModuleDeviation);//getActualModuleDeviation[minutes], minutes);
                            }
                        }

                        if (calc_forecasted_system_loss) {
                            result["system_losses"] = parseFloat((calc_forecasted_system_loss).toFixed(4));
                        }

                        if (forecast_system_loss_sub_result) {
                            adjusted_system_losses = ((actual_system_loss_sub_result / forecast_system_loss_sub_result) * result["system_losses"]);
                        }

                        let formated_adjusted_system_losses = 0;
                        if (edit_adj_system_losses) {
                            result["adjusted_system_losses_absolute"] = parseFloat((edit_adj_system_losses).toFixed(8));
                            result["adjusted_system_losses"] = parseFloat((edit_adj_system_losses).toFixed(2)) + "%";
                        } else if (get_data_from_forecast_sheet.adjustedSystemLosses) {
                            result["adjusted_system_losses_absolute"] = parseFloat((get_data_from_forecast_sheet.adjustedSystemLosses).toFixed(8));
                            result["adjusted_system_losses"] = parseFloat((get_data_from_forecast_sheet.adjustedSystemLosses).toFixed(2)) + "%";
                        } else {
                            formated_adjusted_system_losses = parseFloat((adjusted_system_losses).toFixed(2));
                            result["adjusted_system_losses_absolute"] = formated_adjusted_system_losses;
                            result["adjusted_system_losses"] = formated_adjusted_system_losses + "%";
                        }

                        //Building Generation Forecast(MW)
                        if ((typeof (plant.temperatureCoefficientPower) !== undefined || plant.temperatureCoefficientPower !== null)) {
                            temperature_coefficient_power_data = plant.temperatureCoefficientPower;
                        }
                        let nxt_hr_forecasted_system_losses = result["system_losses"] / 100;
                        calc_module_temp_losses = (((25 - result["module_temperature_forecast"]) * (temperature_coefficient_power_data)) * (-1));

                        let forecasted_module_temperature_loss_tmp = parseFloat((calc_module_temp_losses * 100).toFixed(2));
                        let forecasted_module_temperature_loss = forecasted_module_temperature_loss_tmp / 100;

                        calc_generation_forecast = (result["irradiance"] * 0.25 / 1000 * (1 + nxt_hr_forecasted_system_losses + result["module_temperature_forecast"])) * (plant.plantCapacityAc * 4);

                        result["generation_forecast"] = parseFloat((calc_generation_forecast).toFixed(2));

                        adjusted_generation_forecast = result["adjusted_irradiance"] * (1 + result["adjusted_module_temperature_forecast_absolute"] + (result["adjusted_system_losses_absolute"] / 100)) * plant.plantCapacityAc / 1000;

                        if ((typeof (get_data_from_forecast_sheet.adjustedGenerationForecast) !== undefined || get_data_from_forecast_sheet.adjustedGenerationForecast !== null)) {
                            result["adjusted_generation_forecast"] = (get_data_from_forecast_sheet.adjustedGenerationForecast);//.toFixed(2);
                        } else {
                            result["adjusted_generation_forecast"] = parseFloat((adjusted_generation_forecast).toFixed(2));
                        }
                        if (get_data_from_forecast_sheet.forecastCalculationId) {
                            result["forecast_calculation_id"] = get_data_from_forecast_sheet.forecastCalculationId;
                        }

                        // if((typeof(edit_adj_gen_irradiance) !== 'undefined' || edit_adj_gen_irradiance !== null) && (typeof(edit_time) !== 'undefined' || edit_time !== null))  {
                        //     this.updateAdjustedForecastData(forecast_calculation_id, plantId, forecast_date, edit_time, 'adjusted_irradiance', res_next_hour_array[minutes]['adjusted_irradiance']);
                        // }

                        // if((typeof(edit_adj_module_temperature) !== 'undefined' || edit_adj_module_temperature !== null) && (typeof(edit_time) !== 'undefined' || edit_time !== null)) {
                        //     this.updateAdjustedForecastData(forecast_calculation_id, plantId, forecast_date, edit_time, 'adjusted_for_mod_temp_loss', res_next_hour_array[minutes]['adjusted_module_temperature_forecast']);
                        // }
                        // if((typeof(edit_adj_system_losses) !== 'undefined' || edit_adj_system_losses !== null) && (typeof(edit_time) !== 'undefined' || edit_time !== null)) {
                        //     this.updateAdjustedForecastData(forecast_calculation_id, plantId, forecast_date, edit_time, 'adjusted_system_losses', res_next_hour_array[minutes]['adjusted_system_losses']);
                        // }
                    }
                    i += 1;
                }
                res_next_hour_array.push({ minutes: valKey, result: result });
            })
            // -------- NEXT TO NEXT HOUR FORECASTING END -----------------------------------------------------------
        }
    }


    const plantName = plant.plantName;
    const displayDate = _todayDate;
    const plant_capacity_ac = plant.plantCapacityAc;
    const reportData = [];
    const reportData1 = [];
    const gridData = res_array && res_array.length > 0 ? res_array.map((item, index) => {
        if (item.result && item.result.length != 0) {
            reportData.push({
                timeSlot: item.minutes,
                plantName: plantName,
                date: displayDate,
                plantCapacityAc: plant_capacity_ac,
                availableCapacity: plant_capacity_ac,
                actualkw: item.result.actual_total_pac,
                forecastkw: item.result.generation_forecast,
                forecast2kw: item.result.generation_forecast_2,
                weightedAverageForecast: item.result.generation_forecast_weightage2,
                deviationRespectToSchedule: item.result.schedule_forecast,
                absoluteError: item.result.absolute_error,
                actualIrradianceW: item.result.actual_irradiance,
                forecastedIrradiance: item.result.forecast_irradiance,
                actualModuleTemperatureLoss: item.result.actual_module_temperature_loss,
                forecastedModuleTempLosses: item.result.forecasted_module_temperature_loss,
                actualSystemLosses: item.result.actual_system_loss,
                forecastedSystemLosses: item.result.forecasted_system_losses,//== NaN ? 0:revenueLoss,
            })
        }
    }) : [];
    const gridData1 = res_next_hour_array && res_next_hour_array.length > 0 ? res_next_hour_array.map((item1, index) => {
        if (item1.result && item1.result.length != 0) {
            reportData1.push({
                timeSlot: item1.minutes,
                plantCapacityAc: plant_capacity_ac,
                irradiance: item1.result.irradiance,
                module_temperature_forecast: item1.result.module_temperature_forecast,
                system_losses: item1.result.system_losses,
                generation_forecast: item1.result.generation_forecast,
                adjusted_irradiance: item1.result.adjusted_irradiance,
                absoluteError: item1.result.absolute_error,
                actualIrradianceW: item1.result.actual_irradiance,
                adjusted_module_temperature_forecast: item1.result.adjusted_module_temperature_forecast,
                adjusted_system_losses: item1.result.adjusted_system_losses,
                adjusted_generation_forecast: item1.result.adjusted_generation_forecast,
                // forecast_calculation_id: item1.result.forecast_calculation_id,
                // adjusted_module_temperature_forecast_absolute: item1.result.adjusted_module_temperature_forecast_absolute,
                // adjusted_system_losses_absolute: item1.result.adjusted_system_losses_absolute,
            })
        }
    }) : [];
    return {
        reportData,
        reportData1
    }
}
// // function getForecastConfigByName(model_name) {
// //     this.db.trans_start();
// //     QueryConstant=new QueryConstant();
// //     query = "SELECT * FROM forecast_config WHERE forecast_model_name = ? AND is_published = 1";
// //     viewForecastConfig = [];
// //     if(query.num_rows()>0) {
// //         viewForecastConfig = query.result();
// //     }
// //     this.db.trans_complete();
// //     return viewForecastConfig;
// // }


// //     function getTimeSlotByPlantId()
// //     {
// //         let time_array = ["00:00:00","00:15:00","00:30:00","00:45:00","01:00:00","01:15:00","01:30:00","01:45:00","02:00:00","02:15:00","02:30:00","02:45:00","03:00:00","03:15:00","03:30:00","03:45:00","04:00:00","04:15:00","04:30:00","04:45:00","05:00:00","05:15:00","05:30:00","05:45:00","06:00:00","06:15:00","06:30:00","06:45:00","07:00:00","07:15:00","07:30:00","07:45:00","08:00:00","08:15:00","08:30:00","08:45:00","09:00:00","09:15:00","09:30:00","09:45:00","10:00:00","10:15:00","10:30:00","10:45:00","11:00:00","11:15:00","11:30:00","11:45:00","12:00:00","12:15:00","12:30:00","12:45:00","13:00:00","13:15:00","13:30:00","13:45:00","14:00:00","14:15:00","14:30:00","14:45:00","15:00:00","15:15:00","15:30:00","15:45:00","16:00:00","16:15:00","16:30:00","16:45:00","17:00:00","17:15:00","17:30:00","17:45:00","18:00:00","18:15:00","18:30:00","18:45:00","19:00:00","19:15:00","19:30:00","19:45:00","20:00:00","20:15:00","20:30:00","20:45:00","21:00:00","21:15:00","21:30:00","21:45:00","22:00:00","22:15:00","22:30:00","22:45:00","23:00:00","23:15:00","23:30:00","23:45:00"];
// //         time_array.forEach(time=>{
// //             each_instance = time.split(':')
// //             if (each_instance[0] >= '00' &&  each_instance[0] <= '23' ) {
// //                 time_slot = time;
// //             }
// //         })

// //         return time_slot;
// //     }

// //     function getActivePowerByPlantDate(plantId, forecast_date) {
// //     this.db.trans_start();
// //     QueryConstant = new Forecast_QC();
// //     sql = `SELECT plant_id, inverter_date, inverter_time, total_pac
// //                                         FROM active_power
// //                                         WHERE plant_id = ?
// //                                         AND inverter_date = ?`;
// //     param = new array(plantId, forecast_date);
// //     query = this.db.query(sql, param);
// //    //echo "<br>-- Get current days Active power data for the current hour minus hour time<br>";
// //    //echo this.db.last_query();
// //    //echo '<br>-- -----------------------------------------<br>';
// //    //die;
// //     Data = new [];
// //     results = new [];
// //     if (query.num_rows() > 0) {
// //         Data = query.result_array();
// //         results = array_column(Data, null, "inverter_time");
// //     }
// //     this.db.trans_complete();

// //     return results;
// // }

// function getPrimaryWeatherLastInsolationTime(weather_station_id, insolation_date) {
//     this.db.trans_start();
//     QueryConstant = new Forecast_QC();
//     sql = "SELECT insolation_time FROM weather_station_data WHERE weather_station_id=? AND insolation_date=? ORDER BY insolation_time DESC LIMIT 1;";
//     param = new array(weather_station_id, insolation_date);
//     query = this.db.query(sql, param);
//    //echo "<br>Get primary weather station last available record<br>";
//    //echo this.db.last_query();
//    //echo '<br>-------------------------------------------<br>';
//    //die;
//     Data = new [];
//         if (query.num_rows() > 0) {
//             Data = query.result();
//         }
//         this.db.trans_complete();

//     return Data;
// }

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
        _result = loss_data.actualSystemLoss * 100;// System loss in percentage
    })
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
    return _result;//most_occurence_system_loss;
}

function getDateByforecastIrradianceDeviationSQL(forecast_irradiance, weather_station_id, minutes, minusOneDate, data) {


    let insolation_history_date_list = [];
    let insolation_history_result = [];
    let deviation_percentage = 10;
    let deviation_result = (deviation_percentage * forecast_irradiance) / 100;
    let actual_irradiance_count = 0;

    //deviation_percentage:

    // # Calculate deviation and get the deviation range
    let deviation_result_add = forecast_irradiance + deviation_result;
    let deviation_result_sub = forecast_irradiance - deviation_result;

    // # Get actual irradiance value based on the +/- 5 % deviation
    insolation_history_date_list = data.filter(items => items.insolationTime == minutes && items.insolationDate == minusOneDate);
    actual_irradiance_count = insolation_history_date_list.length;
    if (actual_irradiance_count <= 0 && deviation_percentage < 10) {
        //$deviation_percentage += 1;
        //goto deviation_percentage;
    }

    // resultArray.push({ 'date_res_array': date_res_array, "actual_irradiance_count": actual_irradiance_count, "deviation_percentage": deviation_percentage });

    // return resultArray;

    return insolation_history_date_list;
}

function getActualModuleDeviationFunc(forecast_irradiance_date_list, minutes, forecasted_module_temperature, min_historic_result, max_deviation_result, data) {
    let calculated_actual_system_loss = [];
    let deviation_percentage = 2.5;
    let actual_irradiance_count = 0;
    let resultArray = [];

    // deviation_percentage:
    let count = 0;

    while (count <= 0) {
        let deviation_result = (deviation_percentage * forecasted_module_temperature) / 100;

        // # Calculate deviation and get the deviation range
        let deviation_result_add = forecasted_module_temperature + deviation_result;
        let deviation_result_sub = forecasted_module_temperature - deviation_result;

        if (forecast_irradiance_date_list) {
            calculated_actual_system_loss = data.filter(items => items.insolationTime == minutes && items.insolationDate == forecast_irradiance_date_list);
        }

        actual_irradiance_count = calculated_actual_system_loss.length;

        if (min_historic_result >= actual_irradiance_count && deviation_percentage <= max_deviation_result) {
            deviation_percentage += 1;
        } else {
            count = 1;
        }

    }
    // resultArray.push({ 'date_res_array': date_res_array, "actual_irradiance_count": actual_irradiance_count, "deviation_percentage": deviation_percentage });

    // return resultArray;

    return calculated_actual_system_loss;
}

function findInsolationDeviationRangeSQL(insolation, minutes, fromDate, min_historic_result, max_deviation_result, insolationHistorytByWeatherIdDOs) {
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
