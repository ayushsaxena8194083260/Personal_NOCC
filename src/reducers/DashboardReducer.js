import {
    GET_ALL_PLANTS_WEATHERS,
    ADD_WEATHER_INFO_BY_PLANTS,
    GET_DASHBOARD_ALL_PLANTS,
    GET_HUB_DASHBOARD_ALL_PLANTS,
    GET_CHARTS_INFO
} from '../actions/types'

const INITIAL_STATE = {
    allPlantsWeather: [
        { plant_id: "", info: { todayDescription: "light intensity drizzle", todayMain: "Drizzle", todayIcon: "09d", tomorrowDescription: "clear sky", tomorrowMain: "Clear", tomorrowIcon: "01n" } },
        { plant_id: "", info: { todayDescription: "light rain", todayMain: "Rain", todayIcon: "10n", tomorrowDescription: "mist", tomorrowMain: "mist", tomorrowIcon: "50d" } }
    ],
    allPlants: [],
    chartInfo: []
}

function myFunc(total, num) {
    return total + num;
}

function getHubDashboardTotal(data) {
    let totalGMPPA = 0;
    let totalGMPrevDay = 0;
    let totalGMDayAhead = 0;
    let totalGMETillDate = 0;
    let ppa = 0;
    data && data.length > 0 && data.map((item) => {
        totalGMPPA += parseFloat(item.ppaCapacity);
        totalGMPrevDay += item.previous_day_kw ? parseFloat(item.previousDayGen) : 0;
        totalGMDayAhead += item.day_ahead_kwh ? parseFloat(item.actualGen) : 0;
        totalGMETillDate += parseFloat(item.eTillDate);
    })
    //     let totalGMPPAValue= data.map(item => {
    //     return parseFloat(item.ppa_capacity_mw);
    // })
    // totalGMPPAValue = totalGMPPAValue.reduce(myFunc);
    return {
        totalGMPPA: totalGMPPA.toFixed(2),
        totalGMPrevDay: totalGMPrevDay,
        totalGMDayAhead: totalGMDayAhead,
        totalGMETillDate: totalGMETillDate.toFixed(2)
    }
}

function getDashboardTotal(data) {
    let totalGMPPA = 0;
    let totalGMPrevDay = 0;
    let totalGMDayAhead = 0;
    let totalGMETillDate = 0;
    let ppa = 0;
    data && data.length > 0 && data.map((item) => {
        totalGMPPA += parseFloat(item.ppa_capacity_mw);
        totalGMPrevDay += parseFloat(item.previous_day_kwh);
        totalGMDayAhead += item.day_ahead_kwh ? parseFloat(item.day_ahead_kwh) : 0;
        totalGMETillDate += parseFloat(item.eTillDate);
    })
    //     let totalGMPPAValue= data.map(item => {
    //     return parseFloat(item.ppa_capacity_mw);
    // })
    // totalGMPPAValue = totalGMPPAValue.reduce(myFunc);
    return {
        totalGMPPA: totalGMPPA.toFixed(2),
        totalGMPrevDay: totalGMPrevDay.toFixed(2),
        totalGMDayAhead: totalGMDayAhead.toFixed(2),
        totalGMETillDate: totalGMETillDate.toFixed(2)
    }
}

function getGrossTotal(data, data1) {
    let totalGrsossPPA = 0;
    let totalGrossPrevDay = 0;
    let totalGrossDayAhead = 0;
    let totalGrossETillDate = 0;
    totalGrsossPPA = parseFloat(data.totalGMPPA) + parseFloat(data1.totalGMPPA);
    totalGrossPrevDay = parseFloat(data.totalGMPrevDay) + parseFloat(data1.totalGMPrevDay);
    totalGrossDayAhead = parseFloat(data.totalGMDayAhead) + parseFloat(data1.totalGMDayAhead);
    totalGrossETillDate = parseFloat(data.totalGMETillDate) + parseFloat(data1.totalGMETillDate);
    return {
        totalGrsossPPA: totalGrsossPPA.toFixed(2),
        totalGrossPrevDay: totalGrossPrevDay.toFixed(2),
        totalGrossDayAhead: totalGrossDayAhead.toFixed(2),
        totalGrossETillDate: totalGrossETillDate.toFixed(2)
    }
}

function getPPA(ppaValue) {
    let value = 0;
    if (!parseFloat(ppaValue)) {
        return 0;
    } else {
        value = (ppaValue / 1000);
        return value.toFixed(2)
    }
}

function getStatus(data){
    let status = "Green";
    if (data.plantDeviation >= 0) {
        status = "Green";
    }
    else if (data.plantDeviation >= -3 && data.plantDeviation < 0) {
        status = "Yellow";
    }
    else {
        status = "Red";
    }
    return status;
}
function getAllPlantsForDashboard(data) {
    let ppa_capacity = 0;
    const _data = data.map((item) => {
        ppa_capacity = getPPA(item.plantCapacityAc);
        let insolation_wm2 = item.insolation;
        let previous_day_kwh = item.previousDayGeneration ? (item.previousDayGeneration).toFixed(2):0;
        let day_ahead_kwh = item.actualGeneration ? (item.actualGeneration).toFixed(2) : 0;
        let eTillDate = parseFloat(item.eTillDate / 1000000).toFixed(2);
        let status = getStatus(item);
        return {
            ...item,
            "ppa_capacity_mw": parseFloat(ppa_capacity).toFixed(2),
            "insolation_wm2": insolation_wm2,
            "previous_day_kwh": previous_day_kwh,
            "day_ahead_kwh": day_ahead_kwh,
            "eTillDate": eTillDate,
            "status":status
        }
    })

    return {
        data: _data,
    }
}


function getAllPlantsForHubDashboard(data) {
    let ppa_capacity = 0;
    const _data = data.map((item) => {
        ppa_capacity = getPPA(item.ppaCapacity);
        let insolation_wm2 = item.instime;
        let previous_day_kwh = item.previousDayGen;
        let day_ahead_kwh = item.actualGen ? (item.actualGen).toFixed(2) : 0;
        let eTillDate = parseFloat(item.eTillDate).toFixed(2);
        let status = getStatus(item);
        return {
            ...item,
            "ppa_capacity_mw": ppa_capacity,
            "insolation_wm2": insolation_wm2,
            "previous_day_kwh": previous_day_kwh,
            "day_ahead_kwh": day_ahead_kwh,
            "eTillDate": eTillDate,
            "status":status
        }
    })

    return {
        data: _data,
    }
}

function getGrossPortfolio(data){
    let totalPPACapacity = 0;
    let totalInsolation = 0;
    let totalPreviousDay = 0;
    let totalDayAhead = 0;
    let totalEnergyTillDate = 0;
    data && data.length > 0 && data.map((item) => {
        totalPPACapacity += parseFloat(item.ppaCapacity);
        totalInsolation += parseFloat(item.invToday);
        totalPreviousDay += parseFloat(item.previousDayGen);
        totalDayAhead += parseFloat(item.actualGen);
        totalEnergyTillDate += parseFloat(item.eTillDate);
    })

    return {
        totalPPACapacity: totalPPACapacity.toFixed(2),
        totalInsolation: totalInsolation.toFixed(2),
        totalPreviousDay: totalPreviousDay.toFixed(2),
        totalDayAhead: totalDayAhead.toFixed(2),
        totalEnergyTillDate:totalEnergyTillDate.toFixed(2),
    }

}
function getPlantType(data) {
    let result = [];
    const groundmount = data && data.filter((flt => flt.type == "GROUNDMOUNT"));
    const rooftop = data && data.filter((flt => flt.type == "ROOFTOP"));
    const groundmountTotal = getDashboardTotal(groundmount);
    const rooftopTotal = getDashboardTotal(rooftop);
    const grossTotal = getGrossTotal(groundmountTotal,rooftopTotal);

  //result.push({"", "Ground mount Portfolio", "", groundmountTotal.totalGMPPA, "", "", "", groundmountTotal.totalGMPrevDay, groundmountTotal.totalGMDayAhead, groundmountTotal.totalGMETillDate});
  result.push({"sr_no":"", "plantName":"Gross Portfolio", "plantDashboardStatus":"", "ppa_capacity_mw": grossTotal.totalGrsossPPA, "insolation":"", "today":"", "tomorrow":"", "previous_day_kwh":grossTotal.totalGrossPrevDay, "day_ahead_kwh":grossTotal.totalGrossDayAhead, "eTillDate": grossTotal.totalGrossETillDate});

  result.push({"sr_no":"", "plantName":"Ground mount Portfolio", "plantDashboardStatus":"", "ppa_capacity_mw": groundmountTotal.totalGMPPA, "insolation":"", "today":"", "tomorrow":"", "previous_day_kwh":groundmountTotal.totalGMPrevDay, "day_ahead_kwh":groundmountTotal.totalGMDayAhead, "eTillDate": groundmountTotal.totalGMETillDate});

    groundmount && groundmount.forEach((item) => {
        result.push(item);
    })
    
    result.push({"sr_no":"", "plantName":"Roof top Portfolio", "plantDashboardStatus":"", "ppa_capacity_mw": rooftopTotal.totalGMPPA, "insolation":"", "today":"", "tomorrow":"", "previous_day_kwh":rooftopTotal.totalGMPrevDay, "day_ahead_kwh":rooftopTotal.totalGMDayAhead, "eTillDate": rooftopTotal.totalGMETillDate});
    rooftop && rooftop.forEach((item) => {
        result.push(item);
    })

    return result;

}

function getHubGrossPortfolio(data) {
    let result = [];
    const grossTotal = getGrossPortfolio(data);

  result.push({"sr_no":"", "hubName":"Gross Portfolio", "plantDashboardStatus":"N/A", 
  "ppa_capacity_mw": grossTotal.totalPPACapacity, "insolation": grossTotal.totalInsolation, "today":"N/A", "tomorrow":"N/A", 
  "previous_day_kwh":grossTotal.totalPreviousDay, "day_ahead_kwh":grossTotal.totalDayAhead, 
  "eTillDate": grossTotal.totalEnergyTillDate});
    
  data && data.forEach((item) => {
    result.push(item);
})
    return result;

}

function DashboardReducer(state = INITIAL_STATE, action) {
    switch (action.type) {

        case GET_DASHBOARD_ALL_PLANTS:
            {
                const  result= getAllPlantsForDashboard(action.data.plantDOs);//action.data && action.data.plantDOs ? getAllPlantsForDashboard(action.data.plantDOs) : [];
                let newState = { ...state };
                const _res = getPlantType(result.data );
                 newState.allPlants = _res ;
                // newState.allPlantsTotal = getDashboardTotal(result.data);//result && result.total ? result.total : {};

                return newState;
            }
        case GET_HUB_DASHBOARD_ALL_PLANTS: {
            // const result = action.data && action.data.hubDOList ? getAllPlantsForHubDashboard(action.data.hubDOList) : [];
            const  result= getAllPlantsForHubDashboard(action.data.hubDOList);
            let newState = { ...state };
            // newState.plants = result;
            const _res = getHubGrossPortfolio(result.data );
             newState.allPlants = _res ;
            // let newState = { ...state };
            // newState.allPlants = result && result.data.length > 0 ? result.data : [];
            // newState.allPlantsTotal = getHubDashboardTotal(result.data);//result && result.total ? result.total : {};
            return newState;
        }
        case GET_ALL_PLANTS_WEATHERS:
            return {
                ...state,
                allPlantsWeather: action.plants

            }
        case ADD_WEATHER_INFO_BY_PLANTS: {
            let newState = { ...state };
            return newState;
        }
        case GET_CHARTS_INFO: {
            let newState = { ...state };
            newState.chartInfo = action.data;
            return newState;
        }
        default:
            return state;
    }
}
export { DashboardReducer as default, INITIAL_STATE }