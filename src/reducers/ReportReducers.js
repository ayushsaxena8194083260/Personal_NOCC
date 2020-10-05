import {
    GET_ALLGRAPH,
    SEARCH_REPORT,
    GET_REPORT_DATA,
    GET_REPORT_DEVIATION_DATA,
    GET_REPORT_DEVIATION_EXTDATA,
    GET_REPORT_DEVIATION_EXTDATART,
    GET_REPORT_DEVIATION_DATART,
    GET_FORECAST_DASHBOARD,
} from '../actions/types'


const INITIAL_STATE = {
    displayMessage: ""
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_FORECAST_DASHBOARD:
            {
                let newState = { ...state }
                // const gridResult = forecastReport(action.forecastData.plant, action.forecastData.forecastConfigEntity, action.forecastData.primaryWeatherDOs,
                // action.forecastData.insolationByPlantDOs, action.forecastData.forecastCalculationEntities, action.forecastData.activePowerByPlantDOs, 
                // action.forecastData.forecastCalculationEntities2, action.forecastData.activePowerByPlantDOs2, action.forecastData.insolationHistorytByWeatherIdDOs,
                // action.forecastData.totalPacSubTotal, action.forecastData.moduleTemperatureDeviationRangeSQL, action.forecastData.avgTmpMdle,action.forecastData.forecastIrradianceDeviationSQL,
                // action.forecastData.actualModuleTempDOs, action.forecastData.moduleTempForecastByPlantIdDate, action.forecastData.moduleTemperatureHistorytByWeatherIdDOs, state.searchReport);
                // newState.forecastData = gridResult;
                //  newState.forecastData = gridResult;
                //  newState.grid2Display = gridResult.reportData1;
                // return newState
            }
        case GET_ALLGRAPH:
            return {
                ...state,
                input: action.input
            }
        case SEARCH_REPORT:
            return {
                ...state,
                searchReport: action.searchReport
            }
        case GET_REPORT_DATA:
            return {
                ...state,
                reportData: getBudgetReport(action.reportData)
            }
        case GET_REPORT_DEVIATION_DATA:
            {
                let newState = { ...state }
                const gridResult = getDeviationReport(action.reportDeviationData.plantDtdDOList, action.reportDeviationData.plantAvailabilityDOList, action.reportDeviationData.calculatePlantInsolationFor.weatherStationDetailsDOs, action.reportDeviationData.calculateModelGeneration.calculateLossDO, action.reportDeviationData.calculateModelGeneration.calculateLossNewDO.getLossFromLossTable, action.reportDeviationData.calculateModelGeneration.calculateLossNewDO.getLossFromLossTable, action.reportDeviationData.calculateModelGeneration.calculateLossNewDO.getPerformanceLossForPlant, state, state.searchReport, action.reportDeviationData.gridAvailabilityDOList);
                newState.reportDeviationData = gridResult;
                const totalGM = getDeviationReportTotal(gridResult);
                newState.totalResult = totalGM;
                const gridResultRT = getDeviationReportRT(action.reportDeviationData.plantDtdDOList, action.reportDeviationData.plantAvailabilityDOList, action.reportDeviationData.calculatePlantInsolationFor.weatherStationDetailsDOs, action.reportDeviationData.calculateModelGeneration.calculateLossDO, action.reportDeviationData.calculateModelGeneration.calculateLossNewDO.getLossFromLossTable, action.reportDeviationData.calculateModelGeneration.calculateLossNewDO.getLossFromLossTable, action.reportDeviationData.calculateModelGeneration.calculateLossNewDO.getPerformanceLossForPlant, state, state.searchReport, action.reportDeviationData.gridAvailabilityDOList);
                newState.reportDeviationDataRT = gridResultRT;
                newState.totalResultRT = getDeviationReportTotalRT(gridResultRT, totalGM);
                return newState
            }
        // case GET_REPORT_DEVIATION_DATART:
        //     {
        //         let newState = { ...state }
        // const gridResult = getDeviation(action.reportDeviationDataRT.plantDtdDOMap);
        //     newState.reportDeviationDataRT = gridResult;
        //     newState.totalResult = getDeviationReportTotalRT(gridResult, state);
        //     return newState
        // }
        case GET_REPORT_DEVIATION_EXTDATA:
            {
                let newState = { ...state }
                const gridResult = getDeviationEXT(action.reportDeviationExtData);
                newState.reportDeviationExtData = gridResult;
                newState.totalResult = getDeviationExtReportTotal(gridResult);
                return newState
            }
        case GET_REPORT_DEVIATION_EXTDATART:
            {
                let newState = { ...state }
                const gridResultRT = getDeviationEXTRT(action.reportDeviationExtDataRT);
                newState.reportDeviationExtDataRT = gridResultRT;
                newState.totalResultRT = getDeviationExtReportTotalRT(gridResultRT, state);
                // newState.totalGrossResultRT = grossTotal(gridResultRT,state);
                return newState
            }
        default:
            return state;
    }
}

function getDeviationReportTotalGross(data, state) {
    let totalAcCapacityGross = 0;
    let totalDcCapacityGross = 0;
    let totalActualGenerationGross = 0;
    let totalActualPlfGross = 0;
    data && data.length > 0 && data.map((item) => {
        totalAcCapacityGross = state.totalResult.totalAcCapacity;
        totalDcCapacityGross = state.totalResult.totalDcCapacity;
        totalActualGenerationGross = state.totalResult.totalActualGeneration;
        totalActualPlfGross = state.totalResult.totalActualPlf;
    })

    return {
        totalAcCapacityGross: totalAcCapacityGross.toFixed(2),
        totalDcCapacityGross: totalDcCapacityGross.toFixed(2),
        totalActualGenerationGross: totalActualGenerationGross.toFixed(2),
        totalActualPlfGross: totalActualPlfGross.toFixed(2),
    }

}

function getBudgetReport(data) {

    const gridData = data && data.length > 0 ? data.map((item, index) => {
        const totalImproved = parseFloat(item.soiling) + parseFloat(item.technicalImproved) + parseFloat(item.gridOutageLoss) + parseFloat(item.derate);
        const improvedDCPLF = (totalImproved * parseFloat(item.actualPlf)) + parseFloat(item.actualPlf);
        return {
            "Month": monthNames(item.month),
            "Year": item.year,
            "Plant Name": item.plantName,
            "No of Days": daysInMonth(item.month, item.year),
            "Actual PLF": (item.actualPlf * 100).toFixed(2) + "%",
            "Against LIE PLF": (item.againstLiePlf * 100).toFixed(2) + "%",
            "Deviation From LIE PLF": (item.deviationLiePlf * 100).toFixed(2) + "%",
            "Design Loss": (item.designLoss * 100).toFixed(2) + "%",
            "Technical Loss": (item.technicalLoss * 100).toFixed(2) + "%",
            "Grid Outage Loss": (item.gridOutageLoss * 100).toFixed(2) + "%",
            "Temperature Loss": (item.temperature * 100).toFixed(2) + "%",
            "Total": ((item.technicalLoss + item.gridOutageLoss + item.temperature) * 100).toFixed(2) + "%",
            "Deviation on account of insolation is": item.lieInsolation != 0 ? ((((item.actualInsolatin / item.lieInsolation) - 1) * 100).toFixed(2) + "%") : 0,
            "LIE Insolation": item.lieInsolation,
            "Actual Insolation": item.actualInsolatin,
            "Actual Generation In kWh": item.actualGeneration,
            "Soiling": (item.soiling * 100).toFixed(2) + "%",
            "Technical": (item.technicalImproved * 100).toFixed(2) + "%",
            "Grid Outage": (item.gridOutageLoss * 100).toFixed(2) + "%",
            "Derate": (item.derate * 100).toFixed(2) + "%",
            "Total Improvement": (totalImproved * 100).toFixed(2) + "%",
            "Improved Generation": item.generation,
            "Improved DC PLF": (improvedDCPLF * 100).toFixed(2) + "%",
            "Corrected Insolation": (item.insolationOnTilt * 100).toFixed(2) + "%",
            "Improved PPA PLF": item.improvedPpa,
            "DC PLF": item.bDcPlf

            // plant_name: name,
            // plant_type : plantType,

            // no_of_days:days,
            // dcCapacity:item.dcCapacity,
            // acCapacity:item.acCapacity,
            // plant_capacity_ac:item.acCapacity,
            // insolationOnTilt:inso,
            // insolation_avg:insolationAvg(item.insolationOnTilt,days),
            // generation:item.generation,
            // dc_plf:dcPlf,
            // ac_plf:acPlf,
            // ppa_plf:ppaPlf,
            // derate:dertate,
            // derate_generation:derateGen(item.generation,dertate),
            // derate_dc:derateDC(dcPlf,dertate),
            // derate_ac:derateAC(acPlf,dertate),
            // derate_ppa:deratePPA(ppaPlf,dertate),
            // temperature:(item.temperature*100).toFixed(2)+"%",
            // gridOutageTime:(item.gridOutageTime*100).toFixed(2)+"%",
            // plantDownTime:(item.plantDownTime*100).toFixed(2)+"%",
            // iam:(item.iam*100).toFixed(2)+"%",
            // pvIrradiance:(item.pvIrradiance*100).toFixed(2)+"%",
            // soiling:(item.soiling*100).toFixed(2)+"%",
            // arrayMissmatch:(item.arrayMissmatch*100).toFixed(2)+"%",
            // moduleQuality:(item.moduleQuality*100).toFixed(2)+"%",
            // ohmic:(item.acOhmic*100).toFixed(2)+"%",
            // invEfficiency:(item.invEfficiency*100).toFixed(2)+"%",
            // invClipping:invClip,
            // acOhmic:(item.acOhmic*100).toFixed(2)+"%",
            // transformer:(item.transformer*100).toFixed(2)+"%",
            // transmission:(item.transmission*100).toFixed(2)+"%",
            // auxiliary:(item.auxiliary*100).toFixed(2)+"%",
            // shading:(item.shading*100).toFixed(2)+"%",
        }
    }) : [];
    return gridData;
}

function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

function monthNames(mnth) {
    let monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return monthNames[mnth - 1];
}

function getDeviationReportTotal(data) {
    let totalAcCapacity = 0;
    let totalDcCapacity = 0;
    let totalInsolation = 0;
    let totalModelGeneration = 0;
    let totalActualGeneration = 0;
    let totalGenDeviation = 0;
    let totalModelPlf = 0;
    let totalActualPlf = 0;
    let totalPlfDeviation = 0;
    let totalModelPR = 0;
    let totalActualPr = 0;
    let totalPrDeviation = 0;
    data && data.length > 0 && data.map((item) => {
        totalAcCapacity += (item.plantCapacityAc) && (item.plantCapacityAc) ? parseFloat(item.plantCapacityAc) : 0;
        totalDcCapacity += parseFloat(item.ccap);
        totalInsolation += parseFloat(item.insolation);
        totalModelGeneration += parseFloat(item.modelGeneration);
        totalActualGeneration += parseFloat(item.actualGeneration);
        totalGenDeviation += parseFloat(item.genDeviation);
        totalModelPlf += parseFloat(item.modelPlf);
        totalActualPlf += parseFloat(item.actualPlf);
        totalPlfDeviation += parseFloat(item.plfDeviation);
        totalModelPR += parseFloat(item.modelPR);
        totalActualPr += parseFloat(item.actualPr);
        totalPrDeviation += parseFloat(item.prDeviation);
    })

    return {
        totalAcCapacity: totalAcCapacity.toFixed(2),
        totalDcCapacity: totalDcCapacity.toFixed(2),
        totalInsolation: totalInsolation.toFixed(2),
        totalModelGeneration: totalModelGeneration.toFixed(2),
        totalActualGeneration: totalActualGeneration.toFixed(2),
        totalGenDeviation: totalGenDeviation.toFixed(2),
        totalModelPlf: totalModelPlf.toFixed(2),
        totalActualPlf: totalActualPlf.toFixed(2),
        totalPlfDeviation: totalPlfDeviation.toFixed(2),
        totalModelPR: totalModelPR.toFixed(2),
        totalActualPr: totalActualPr.toFixed(2),
        totalPrDeviation: totalPrDeviation.toFixed(2),
        totalAcCapacityGross: totalAcCapacity.toFixed(2),
        totalDcCapacityGross: totalDcCapacity.toFixed(2),
        totalActualGenerationGross: totalActualGeneration.toFixed(2),
        totalActualPlfGross: totalActualPlf.toFixed(2),
    }
}

function getDeviationReportTotalRT(data, totalResult) {
    let totalAcCapacityRT = 0;
    let totalDcCapacityRT = 0;
    let totalActualGenerationRT = 0;
    let totalBudgetGenerationRT = 0;
    let totalActualPlfRT = 0;
    let totalPlfDeviationRT = 0;
    let totalRevenuePRRT = 0;
    let totalAcCapacityGross = 0;
    let totalDcCapacityGross = 0;
    let totalActualGenerationGross = 0;
    let totalActualPlfGross = 0;
    data && data.length > 0 && data.map((item) => {
        totalAcCapacityRT += parseFloat(item.plantCapacityAc);//(item.plantCapacityAc) ? parseFloat(item.plantCapacityAc):0;//parseFloat(item.plantCapacityAc);
        totalDcCapacityRT += parseFloat(item.ccap);
        totalActualGenerationRT += parseFloat(item.actualGeneration);
        totalBudgetGenerationRT += parseFloat(item.budgetGeneration);
        totalActualPlfRT += parseFloat(item.actualPlf);
        totalPlfDeviationRT += parseFloat(item.plfDeviation);
        totalRevenuePRRT += parseFloat(item.revenue);
    })
    let totalAcCapacity = totalResult.totalAcCapacity;
    let totalDcCapacity = totalResult.totalDcCapacity;
    let totalActualGeneration = totalResult.totalActualGeneration;
    let totalActualPlf = totalResult.totalActualPlf;
    // let totalActGenRT = state.totalResultRT.totalActualGenerationRT;
    // let totalBudGenRT = state.totalResultRT.totalBudgetGenerationRT;
    // let totalDeviationRT = state.totalResultRT.totalDeviationRT;
    // let totalRevenueRT = state.totalResultRT.totalRevenueRT;
    totalAcCapacityGross = parseFloat(totalAcCapacity) + parseFloat(totalAcCapacityRT);
    totalDcCapacityGross = parseFloat(totalDcCapacity) + parseFloat(totalDcCapacityRT);
    totalActualGenerationGross = parseFloat(totalActualGeneration) + parseFloat(totalActualGenerationRT);
    totalActualPlfGross = parseFloat(totalActualPlf) + parseFloat(totalActualPlfRT);

    return {
        totalAcCapacityRT: totalAcCapacityRT.toFixed(2),
        totalDcCapacityRT: totalDcCapacityRT.toFixed(2),
        totalActualGenerationRT: totalActualGenerationRT.toFixed(2),
        totalBudgetGenerationRT: totalBudgetGenerationRT.toFixed(2),
        totalActualPlfRT: totalActualPlfRT.toFixed(2),
        totalPlfDeviationRT: totalPlfDeviationRT.toFixed(2),
        totalRevenuePRRT: totalRevenuePRRT.toFixed(2),
        totalAcCapacityGross: totalAcCapacityGross.toFixed(2),
        totalDcCapacityGross: totalDcCapacityGross.toFixed(2),
        totalActualGenerationGross: totalActualGenerationGross.toFixed(2),
        totalActualPlfGross: totalActualPlfGross.toFixed(2),
    }
}

function grossTotal(data, state) {
    let totalGrossActualGeneration = 0;
    let totalGrossBudgetGeneration = 0;
    let totalGrossDeviation = 0;
    let totalGrossRevenue = 0;
    let totalActGenGM = state.totalResult.totalActualGeneration;
    let totalBudGenGM = state.totalResult.totalBudgetGeneration;
    let totalDeviationGM = state.totalResult.totalDeviation;
    let totalRevenueGM = state.totalResult.totalRevenue;
    let totalActGenRT = state.totalResultRT.totalActualGenerationRT;
    let totalBudGenRT = state.totalResultRT.totalBudgetGenerationRT;
    let totalDeviationRT = state.totalResultRT.totalDeviationRT;
    let totalRevenueRT = state.totalResultRT.totalRevenueRT;
    totalGrossActualGeneration = parseFloat(totalActGenGM) + parseFloat(totalActGenRT);
    totalGrossBudgetGeneration = parseFloat(totalBudGenGM) + parseFloat(totalBudGenRT);
    totalGrossDeviation = parseFloat(totalDeviationGM) + parseFloat(totalDeviationRT);
    totalGrossRevenue = parseFloat(totalRevenueGM) + parseFloat(totalRevenueRT);
    // data && data.length > 0 && data.map((item) => {
    //     totalGrossActualGeneration += parseFloat(item.totalActualGenerationRT) + parseFloat(item.totalActGenGM);
    //     totalGrossBudgetGeneration += parseFloat(item.totalBudgetGenerationRT) + parseFloat(item.totalBudGenGM);
    //     totalGrossDeviation += parseFloat(item.totalDeviationRT) + parseFloat(item.totalDeviationGM);
    //     totalGrossRevenue += parseFloat(item.totalRevenueRT) + parseFloat(item.totalRevenueGM);
    // })
    return {
        totalGrossActualGeneration: totalGrossActualGeneration.toFixed(2),
        totalGrossBudgetGeneration: totalGrossBudgetGeneration.toFixed(2),
        totalGrossDeviation: totalGrossDeviation.toFixed(2) + "%",
        totalGrossRevenue: totalGrossRevenue.toFixed(2),
    }

}

function getDeviationExtReportTotal(data) {
    let totalActualGeneration = 0;
    let totalBudgetGeneration = 0;
    let totalDeviation = 0;
    let totalRevenue = 0;
    data && data.length > 0 && data.map((item) => {
        if ((item.actual) && (item.actual !== "null")) {
            totalActualGeneration += parseFloat(item.actual);
        }
        if ((item.budget) && (item.budget !== "null")) {
            totalBudgetGeneration += parseFloat(item.budget);
        }
        totalDeviation += parseFloat(item.deviation);
        totalRevenue += parseFloat(item.revenue);
    })

    return {
        totalActualGeneration: totalActualGeneration.toFixed(2),
        totalBudgetGeneration: totalBudgetGeneration.toFixed(2),
        totalDeviation: totalDeviation.toFixed(2) + "%",
        totalRevenue: totalRevenue.toFixed(2),
    }
}

function getDeviationExtReportTotalRT(data, state) {
    let totalActualGenerationRT = 0;
    let totalBudgetGenerationRT = 0;
    let totalDeviationRT = 0;
    let totalRevenueRT = 0;
    data && data.length > 0 && data.map((item) => {
        if ((item.actual) && (item.actual !== "null")) {
            totalActualGenerationRT += parseFloat(item.actual);
        }
        if ((item.budget) && (item.budget !== "null")) {
            totalBudgetGenerationRT += parseFloat(item.budget);
        }
        totalDeviationRT += parseFloat(item.deviation);
        totalRevenueRT += parseFloat(item.revenue);
    })

    let totalGrossActualGeneration = 0;
    let totalGrossBudgetGeneration = 0;
    let totalGrossDeviation = 0;
    let totalGrossRevenue = 0;
    let totalActGenGM = state.totalResult.totalActualGeneration;
    let totalBudGenGM = state.totalResult.totalBudgetGeneration;
    let totalDeviationGM = state.totalResult.totalDeviation;
    let totalRevenueGM = state.totalResult.totalRevenue;
    // let totalActGenRT = state.totalResultRT.totalActualGenerationRT;
    // let totalBudGenRT = state.totalResultRT.totalBudgetGenerationRT;
    // let totalDeviationRT = state.totalResultRT.totalDeviationRT;
    // let totalRevenueRT = state.totalResultRT.totalRevenueRT;
    totalGrossActualGeneration = parseFloat(totalActGenGM) + parseFloat(totalActualGenerationRT);
    totalGrossBudgetGeneration = parseFloat(totalBudGenGM) + parseFloat(totalBudgetGenerationRT);
    totalGrossDeviation = parseFloat(totalDeviationGM) + parseFloat(totalDeviationRT);
    totalGrossRevenue = parseFloat(totalRevenueGM) + parseFloat(totalRevenueRT);

    return {
        totalActualGenerationRT: totalActualGenerationRT.toFixed(2),
        totalBudgetGenerationRT: totalBudgetGenerationRT.toFixed(2),
        totalDeviationRT: totalDeviationRT.toFixed(2) + "%",
        totalRevenueRT: totalRevenueRT.toFixed(2),
        totalGrossActualGeneration: totalGrossActualGeneration.toFixed(2),
        totalGrossBudgetGeneration: totalGrossBudgetGeneration.toFixed(2),
        totalGrossDeviation: totalGrossDeviation.toFixed(2) + "%",
        totalGrossRevenue: totalGrossRevenue.toFixed(2),
    }
}

function getDev(actual, budget) {
    if (actual && budget) {
        const x = (actual / budget) - 1;
        const value = x * 100;
        return value.toFixed(2) + "%";
    } else {
        return "0%";
    }
}

function getPLF(data, ccap) {
    if (data) {
        const plf = (data / (ccap * 1 * 24) * 100);
        return plf.toFixed(2) + "%";
    } else {
        return "0%";
    }
}

function getModelPR(ccap, inso) {
    const input = ccap * inso * 1;
    let prMod4 = 0;
    if (input > 0) {
        prMod4 = 1000 / input;
    }
    return prMod4.toFixed(2);
}

// function getActualPR(actual, ccap, inso) {
//     const input = ccap * inso * 1;
//     let prMod4 = 0;
//     if (input > 0) {
//         prMod4 = actual / input;
//     }
//     return 100 * prMod4.toFixed(2);
// }

function getActualPR(ccap, insolation, chkActualForCalculation) {
    let prNetGen = 0;
    let prNetGen4 = 0;
    if ((ccap * insolation.toFixed(2) * 1) > 0) {
        prNetGen4 = chkActualForCalculation / (ccap * insolation.toFixed(2) * 1);
        prNetGen = (100 * prNetGen4).toFixed(2);
    }
    return prNetGen;
}

// function getDeviation(plantId, fromDate, toDate){
//     modelPlf = modelGeneration / (data->ccap * 1 * 24);
//     prNetGen = 0;
//     if ((data->ccap * parseFloat(insolation).toFixed(2) * 1) > 0) {

//       prMod4 = modelGeneration / (data->ccap * parseFloat(insolation).toFixed(2) * 1);
//       modPR = parseFloat(prMod4).toFixed(2);

//       plfDev = 0;
//       if(modelPlf > 0)
//         plfDev = ((aplf/modelPlf)-1) * 100;
//       genDev = parseFloat((chkActualForCalculation/1000), 2) - parseFloat((modelGeneration/100000)).toFixed(2);
//       log_message('info', 'chkActualForCalculation - modelGeneration '.parseFloat((chkActualForCalculation/1000)).toFixed(2) .' - '. parseFloat((modelGeneration/100000).toFixed(2)));

//       plantDowntime = 0;
//       if(isset(plantAvailArray[data->plant_id]))
//       plantDowntime = 100 - number_format(plantAvailArray[data->plant_id], 2, '.', '');
//       if (plantDowntime !== 0)


//       gridOutage = 0;
//       if(isset(gridAvailArray[data->plant_id]))

//       if (plantDowntime !== 0)
//       gridOutage = '-'.parseFloat(gridOutage).toFixed(2);
//       tableGM.='<tr><td>'.++sr_no.'</td><td>'.pname.'</td><td>'.data->plant_capacity_ac.'</td><td>'.data->ccap.'</td><td>'.round(insolation, 2).'</td><td>'.modelGenerationVal.'</td><td>'.chkActual.'</td><td>'.round(genDev, 2).'</td><td>'.round(modelPlf, 2).'%</td><td>'.sprintf("%.2f", aplf).'%</td><td>'.round(plfDev, 2).'%</td><td>'.modPR.'%</td><td>'.prNetGen.'%</td><td>'.round(prNetGen - modPR, 2).'%</td><td>'.plantDowntime.'% Plant Downtime, '.gridOutage.'% Grid outage loss'.'</td><td>';
//       log_message('info', ' gm sum >>> totalAcGM '.data->plant_capacity_ac. '|dc '.data->ccap);
//     totalAcGM += data->plant_capacity_ac;
//     totalDcGM += data->ccap;
//     sumInsoDc += data->ccap * round(insolation).toFixed(2);
//     totInso = parseFloat((sumInsoDc / totalDcGM)).toFixed(2);
//     sumDayDcGM += data->ccap * 1;
//     totDaysGM = parseFloat((sumDayDcGM / totalDcGM)).toFixed(0);
//     // sumActGenGM = sumModGenGM = sumRevGM = aPlfGM = mPlfGM = 0;
//     // H4 (sumDayDcGM / totalDcGM)   (4)/(2)
//     sumActGenGM += parseFloat((chkActualForCalculation/1000)).toFixed(2);
//     sumModGenGM += parseFloat((modelGeneration/100000)).toFixed(2);

//     if ( totalDcGM > 0 && (sumDayDcGM / totalDcGM) > 0 &&  totalDcGM > 0) {
//     aPlfGM = parseFloat( ( ((sumActGenGM * 1000) / ( totalDcGM * (sumDayDcGM / totalDcGM) * 24)) * 100)).toFixed(2);
//     mPlfGM = parseFloat( ( ((sumModGenGM * 1000) / ( totalDcGM * (sumDayDcGM / totalDcGM) * 24)) * 100)).toFixed(2);
// }

function getDateTime(startTime) {
    const data = startTime.replace("T", " ").substring(0, 19);
    return data;
}

function getTimeFromStartTime(startTime) {
    const data = startTime.split("T");
    return data && data.length > 1 ? data[1].substring(0, 8) : data[0];
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
    return mm + "/" + dd + "/" + yyyy;
}

function getAffectedTimeInDecimal(diffTime) {
    const data = diffTime.split(":");
    const _mins = data && data.length > 1 && parseInt(data[1]) / 60;
    const decval = parseInt(data[0]) + _mins;
    return decval && decval.toFixed(2) ? decval.toFixed(2).toString() : "";
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

    data = y + "/" + m + "/" + d;
    return data;
}


function getAffectedTimeInHrs(StartDateTime, EndTIme) {
    var today = getCurrentDate();
    let ddTime = today + " " + StartDateTime;
    const startDate = new Date(ddTime);
    const endDate = new Date(getDate(startDate) + " " + EndTIme);

    let seconds = Math.floor((endDate - (startDate)) / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);

    hours = hours - (days * 24);
    minutes = minutes - (days * 24 * 60) - (hours * 60);
    seconds = seconds - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60);

    //return hours + ":" + minutes + ":" + seconds;
    return hours + ":" + minutes + ":" + seconds;
}

function getInsolution(plantId, _data1) {
    let totalInsolationtilt = 0;
    const filterdata = _data1.filter(items => items.plantId === plantId);
    filterdata.map(items => {
        const array_tilt = items.tiltIrradiationWh;
        const startTime = getDateTime(items.startTime);
        const hr = getAffectedTimeInHrs(startTime, items.endTime);
        const timeInHours = getAffectedTimeInDecimal(hr);
        const TotaltimeC = timeInHours.replace(":", ".");
        //$list -> tilt_irradiation_wh;
        let insolationtilt = (array_tilt * TotaltimeC) / 1000;
        totalInsolationtilt = insolationtilt.toFixed(2);
    })
    return totalInsolationtilt;

    // noDays++;

    // const tariff = filterValue && filterValue.tariff ? filterValue.tariff : 0;
    // const result = genLossPeriod * parseInt(tariff);


    // let noDays = 0;
    // let plantInsolation = 0;
    // let start_time = filterValue.startTime;//date('H:i', strtotime($list -> start_time));
    // let stop_time = filterValue.stopTime;//date('H:i', strtotime($list -> end_time));
    //     $parsed1 = date_parse($start_time);
    //     $seconds1 = $parsed1['hour'] * 3600 + $parsed1['minute'] * 60 + $parsed1['second'];
    //     $parsed2 = date_parse($stop_time);
    //     $seconds2 = $parsed2['hour'] * 3600 + $parsed2['minute'] * 60 + $parsed2['second'];
    //     $totaltime = $seconds2 - $seconds1;
    //     $Finaltotaltime = gmdate("H:i", $totaltime);
    // let ambienttemp = filtervalue.ambientTempWh;
    // let ambienttempaveraged = filtervalue.ambientTemp24;
    // let temp_mdul = filtervalue.moduleTempWh;
    // let windspeed = filtervalue.windSpeed24;
    // let count = filtervalue.count;
    // let TotaltimeA = (stop_time === '00:00' || stop_time === '') ? 0 : Finaltotaltime;
    // TotaltimeA = TotaltimeA.replace(":",".");//str_replace(":", ".", $TotaltimeA);
    // TotaltimeA = number_format((float),TotaltimeA, 2, '.', '');

    // # TotalTimeC new formula
    // let TotaltimeC = 0.00;
    // if ($TotaltimeA > 0.00) {
    //     $timeADetails = explode(".", $TotaltimeA);
    //     $precision = $timeADetails[1] / 60;
    //     $TotaltimeC = $timeADetails[0] + $precision;
    //     $TotaltimeC = number_format((float)$TotaltimeC, 2, '.', '');
    // }

    // if (noDays > 0 && totalInsolationtilt > 0)
    //     plantInsolation = totalInsolationtilt / noDays;


}

function getTotalLoss(plantId, data6) {
    let totalInsolationtilt = 0;
    let totalsumlosses = 0;
    let totalSumLossesArray = [];
    let year = [];
    let month = [];
    let lossDataArray = [];
    const filterData = data6.filter(flt => flt.plantId === plantId);
    filterData.map(items => {
        const invertercliping = items.inverterCliping;
        const dclosses = items.dcLosses;
        const accablelosses = items.acCablelosses;
        const transormerlosses = items.transformerLosses;
        const modulequality = items.moduleQuality;
        const modulemismatchlosses = items.moduleMismatchLosses;
        const soilinglosses = items.soilingLosses;
        const auxilarylosses = items.auxilaryLosses;
        const inverterefficiency = items.inverterEfficiency;
        const linearderate = items.linearDerate;
        const shadinglosses = items.shadingLosses;
        const grid_outage_and_plant_downtime = items.gridOutageAndPlantDowntime;
        const transmission_losses = items.transmissionLosses;
        const loss_due_to_irradiance_level = items.lossDueToIrradianceLevel;
        const loss_due_to_temperature = items.lossDueToTemperature;
        const lam_losses = items.lamLosses;
        totalsumlosses = invertercliping + dclosses + accablelosses + transormerlosses + modulequality + modulemismatchlosses
            + soilinglosses + auxilarylosses + inverterefficiency + linearderate + shadinglosses + grid_outage_and_plant_downtime
            + transmission_losses + loss_due_to_irradiance_level + loss_due_to_temperature + lam_losses;
        // totalSumLossesArray.push(totalsumlosses);
        // year.push(items.year);
        // month.push(items.month);
        lossDataArray.push({ 'totalsumlosses': totalsumlosses, 'year': items.year, 'month': items.month });
    })
    return lossDataArray;
}

function getlossComponentsForMonth(plantId, performanceLossArr, numDays) {
    console.log(performanceLossArr)
    let lossComponents = [];
    // let plantId = 0;
    let year = 0;
    let month = 0;
    let auxilaryLoss = 0;
    let actualGeneration = 0;
    let actualTempLoss = 0;
    let periodExp = [];
    const filterData = performanceLossArr.filter(flt => flt.plantId === plantId);
    filterData.map((item, index) => {
        actualTempLoss = item.actualTempLoss;
        actualGeneration = item.actualGeneration;
        auxilaryLoss = item.auxilaryLoss;

        if (item.period) {
            periodExp = item.period.split("-");//explode('-', $lossvalue['period']);
            year = periodExp[0];
            month = periodExp[1];
        }
        if (performanceLossArr.length > 1) {
            actualTempLoss += item.actualTempLoss;
            actualGeneration += item.actualGeneration;
            auxilaryLoss += item.auxilaryLoss;
        }
        lossComponents.push({ "plantId": plantId, "year": year, "month": month, "auxilaryLoss": auxilaryLoss, "actualGeneration": actualGeneration, "actualTempLoss": actualTempLoss.toFixed(2), "numDays": numDays.days });
    })
    return lossComponents;
}


function calculateModelGeneration(plantId, fromDate, toDate, commDate, ccap, ndays, inso, data3, data4, data5, data6) {
    // log_message('info', 'calculateModelGeneration >> '.$fromDate.' | '.$toDate.' |dcCapacity '.$dcCapacity. ' | nDays '.$totalDays.' | insolation '.$insolation);
    // # plantCommDate 2009-11-30 | 2019-09-05
    // $date1 = date_create("2009-11-30");
    // $date2 = date_create("2019-08-29");
    let plantLoss = calculateLossNew(plantId, fromDate, toDate, data5, data6);
    let dateSplit = commDate && commDate.substr(0, 10).split("-");
    let diff = 0;
    if (dateSplit) {
        let date1 = dateSplit[2];
        var today = new Date();
        var date2 = today.getDate();
        diff = parseInt(date1) - parseInt(date2);
    } else {
        diff = 0;
    }

    let daysInYear = 365;
    let dayAvg = diff / daysInYear;
    let deratePerYear = -0.5;

    let derateAvg = dayAvg.toFixed(2) * deratePerYear;
    let sumOfPlantLossnDerateAvg = parseFloat(plantLoss) + derateAvg;

    let addedsumOfPlantLossnDerateAvg = parseFloat(100 + sumOfPlantLossnDerateAvg).toFixed(2);

    // log_message('info', 'plantCommDate plant_id '.$plantId.'|comm_date '.$plantCommDate.' | '.date('Y-m-d').' | '.$diff->format("%a"). ' | derate% '.$derateAvg. ' | q14 % '.$sumOfPlantLossnDerateAvg. ' | 1+q14% '.$addedsumOfPlantLossnDerateAvg);

    let modelGeneration = parseFloat(parseFloat(ccap).toFixed(2) * 1 * parseFloat(inso).toFixed(2) * parseFloat(addedsumOfPlantLossnDerateAvg));
    //let modelGeneration = 1000;
    let modelGenerationVal = 0;
    if (modelGeneration) {
        modelGenerationVal = parseFloat(modelGeneration / 100000).toFixed(2);
    }
    return modelGenerationVal;
}

function getDategetDaysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

function dateRange(first, last) {
    let _fromDate = first.split("-");
    let _year = _fromDate[0];
    let _month = _fromDate[1];
    let _day = _fromDate[2];
    let ndays = parseInt(_day);
    let tdays = _fromDate && getDategetDaysInMonth(_month, _year);
    // let result = {"fromDate":fromDate,"toDate":toDate,"nDays":ndays,"tDays":tdays}
    let begin = first;
    let end = last;
    let date = [];
    let days = ndays;

    while (begin <= end) {
        let date_type = 0;
        let next_end = new Date(first)
        next_end.setDate(next_end.getDate() + 1)

        if (next_end <= end) {
            if (begin.getDate() === '01') {
                date_type = 2;
                date = { "start": begin, "end": next_end, "date_type": date_type }; //= array("start"=>date("Y-m-d",$begin),"end"=>date("Y-m-d",$next_end),"data_type"=>$date_type);
            }
            else {
                date_type = 1;
                days += 1;
                date = { "start": begin, "end": next_end, "date_type": date_type, "days": days, "tdays": tdays };
            }
        }
        else {
            date_type = 1;
            days = ndays;
            date = { "start": begin, "end": next_end, "date_type": date_type, "days": ndays, "tdays": tdays };
        }
        begin = next_end.setDate(next_end.getDate() + 1);

    }
    return date;
}

function calculateLossNew(plantId, fromDate, toDate, data5, data6) {
    let result = dateRange(fromDate, toDate);
    // # azureLosses by plantId
    let lossDataArray = getTotalLoss(plantId, data5);
    let performanceLossData = getlossComponentsForMonth(plantId, data6, result);
    let perfLossWithSumLoss = mergeSumLossWithPerfLossData(performanceLossData, lossDataArray);
    let totalLosses = 0;
    let sumLossDays = 0;
    let auxilaryLoss = 0;
    let sumLoss = 0;
    let actualTempLoss = 0;
    let totNumDays = 0;
    let totalSumLossDays = 0;

    perfLossWithSumLoss.map(item => {
        if ((item.actualGeneration - item.auxilaryLoss) > 0) {
            auxilaryLoss = ((item.auxilaryLoss / (item.actualGeneration - (item.auxilaryLoss))) * 100).toFixed(2);
        }
        console.log('+++++++')
        if (item.totalsumlosses) {
            sumLoss = item.totalsumlosses;
        }

        if (item.actualTempLoss) {
            actualTempLoss = parseFloat(item.actualTempLoss);
        }

        // #totalLosses
        totalLosses = (parseFloat(sumLoss) + parseFloat(auxilaryLoss) + parseFloat(actualTempLoss));
        totalLosses = totalLosses.toFixed(2)


        // #sumLossDays
        // #$sumLossDays = round(($sumLoss * $perfLossValue['numDays']), 0);
        sumLossDays = (totalLosses * item.numDays);
        sumLossDays = sumLossDays.toFixed(2);

        totNumDays += item.numDays;
        totalSumLossDays += parseFloat(sumLossDays);
    })
    // #auxilalliary loss
    let finalLoss = (totalSumLossDays / totNumDays);
    return finalLoss.toFixed(2);
}

function mergeSumLossWithPerfLossData(performanceLossData, lossDataArray) {
    let mergedData = [];
    for (let i = 0; i <= performanceLossData.length - 1; i++) {
        for (let j = 0; j <= lossDataArray.length - 1; j++) {
            let date1 = lossDataArray[j].year + "-" + lossDataArray[j].month;
            let date2 = performanceLossData[i].year + "-" + performanceLossData[i].month;//date_create(date($perfValue['year'].'-'.$perfValue['month'].'-d'));
            let diff = (new Date(date2 + "-01")) - (new Date(date1 + "-01"))
            if (diff === 0) {
                mergedData.push({ ...performanceLossData[i], "totalsumlosses": lossDataArray[j].totalsumlosses });
                j = lossDataArray.length;
                i = performanceLossData.length;
            }
        }
    }
    return mergedData;
}

function getActual(actual) {
    let chkActualForCalculation = 0;
    let chkActual = 0;
    if (actual) {
        chkActual = (actual / 1000).toFixed(2);
        chkActualForCalculation = actual;
    }
    // chkBudget = !empty($data->budget)?number_format($data->budget/1000,2):$notAvail;
    return chkActual;
}

function getDeviat(actual, modGen) {
    const genDev = (parseFloat(actual) - parseFloat(modGen));
    return genDev.toFixed(2);
}

function getModelPlf(ccap, modelGeneration) {
    let modelPlf = 0;
    let value = parseFloat((parseFloat(ccap) * 1 * 24));
    if (value) {
        modelPlf = parseFloat(modelGeneration) / value;
        modelPlf = modelPlf * 100000;
    }
    return modelPlf;
}

function getActualPlf(actual, budget, ccap, nDays) {
    let x = 0;
    let deviate = 0;
    let aplf = 0;
    let bplf = 0;
    if (actual !== 0 && budget !== 0) {
        x = ((actual / budget) - 1);
        deviate = (x / 100);
        if ((ccap) && (ccap !== "0.00")) {
            aplf = (actual / (ccap * nDays * 24) * 100);
            bplf = (budget / (ccap * nDays * 24) * 100);
        } else {
            aplf = 0;
            bplf = 0;
        }
    } else {
        deviate = 0;
        aplf = 0;
        bplf = 0;
    }
    return ((aplf * 100) / 100).toFixed(2);
}

function getPlfDeviation(aplf, modelPlf) {
    let plfDev = 0;
    if (modelPlf) {
        plfDev = ((parseFloat(aplf) / parseFloat(modelPlf)) - 1) * 100;
    }
    return plfDev;
}

function getModelPr(ccap, modelGeneration, insolation) {
    let modPR = 0;
    let prMod4 = 0;
    let value = parseFloat(parseFloat(ccap) * parseFloat(insolation).toFixed(2) * 1);
    if (value) {
        prMod4 = parseFloat(modelGeneration) / value;
        prMod4 = prMod4 * 100000;
        modPR = prMod4.toFixed(2);
    }
    return modPR;
}

function getPRDev(prNetGen, modPR) {
    return (prNetGen - modPR).toFixed(2);
}

function getRemarks(plantId, data1, data7) {
    // return plantDowntime+"% Plant Downtime, "+gridOutage+"% Grid outage loss";
    let plantDowntime = 0;
    const filterData = data1.filter(items => items.plantId === plantId)[0];
    let availabilityPercentagePlant = filterData && filterData.availabilityPercentage;
    if (availabilityPercentagePlant) {
        plantDowntime = 100 - parseInt(availabilityPercentagePlant);
    }
    if (plantDowntime !== 0) {
        plantDowntime = '-' + plantDowntime.toFixed(2);
    }
    const filterData1 = data7.filter(items => items.plantId === plantId)[0];
    let availabilityPercentageGrid = filterData1 && filterData1.availabilityPercentage;
    let gridOutage = 0;
    if (availabilityPercentageGrid) {
        gridOutage = 100 - parseInt(availabilityPercentageGrid);
    }
    if (gridOutage !== 0) {
        gridOutage = '-' + gridOutage.toFixed(2);
    }

    return plantDowntime + "% Plant Downtime, " + gridOutage + "% Grid outage loss";
}

function getAcCapacity(_value) {
    if (!parseFloat(_value) || _value === "NaN" || _value === "" || _value === undefined || _value === '') {
        return 0;
    } else {
        return _value
    }
}
function getDeviationReport(data, data1, data2, data3, data4, data5, data6, state, reportSearch, data7) {
    let gridData = [];
    const fromDate = reportSearch.from_date;
    const toDate = reportSearch.to_date;
    const type = reportSearch.type;
    const filterData = data.filter(items => items.plantType === "GROUNDMOUNT");
    filterData && filterData.map((item) => {
        let ndays = 1;
        const plantCapacityAc = getAcCapacity(item.plantCapacityAc);
        const inso = getInsolution(item.plantId, data2);
        const modGen = calculateModelGeneration(item.plantId, fromDate, toDate, item.commentCreationDate, parseFloat(item.ccap), ndays, parseFloat(inso), data3, data4, data5, data6);
        const actualGeneration = getActual(item.actual, item.budget);
        const genDeviation = getDeviat(actualGeneration, modGen);
        const modelPlf = getModelPlf(parseFloat(item.ccap), modGen);
        const actualPlf = getActualPlf(item.actual, item.budget, parseFloat(item.ccap), ndays);
        const plfDeviation = getPlfDeviation(actualPlf, modelPlf);
        const modelPr = getModelPr(parseFloat(item.ccap), modGen, parseFloat(inso));
        const actualPr = getActualPR(parseFloat(item.ccap), parseFloat(inso), item.actual);
        const PrDeviation = getPRDev(actualPr, modelPr);
        const remarks = getRemarks(item.plantId, data1, data7)
        gridData.push({
            'plantName': item.plantName, 'plantCapacityAc': plantCapacityAc, 'ccap': item.ccap, 'insolation': parseFloat(inso).toFixed(2),
            'modelGeneration': modGen, 'actualGeneration': actualGeneration, 'genDeviation': genDeviation,
            'modelPlf': modelPlf.toFixed(2) + "%", 'actualPlf': actualPlf, 'plfDeviation': plfDeviation.toFixed(2) + "%",
            'modelPR': modelPr + "%", 'actualPr': actualPr + "%", 'prDeviation': PrDeviation + "%",
            'remarks': remarks
        });
    });
    return gridData;
}

function getActualRT(actual) {
    const _actual = actual && actual ? (parseFloat(actual) / 1000).toFixed(2) : 0;
    return _actual;
}

function getBudgetRT(budget) {
    const _budget = budget && budget ? (parseFloat(budget) / 1000).toFixed(2) : 0;
    return _budget;
}

function getActualPlfRT(actual, budget, ccap, totavgdays) {
    let x = 0;
    let deviate = 0;
    let aplf = 0;
    let bplf = 0;
    let pavgdays = 0;
    if ((actual !== 0) && (budget !== 0) && (actual) && (budget)) {
        x = ((actual / budget) - 1);
        deviate = (x / 100);
        if ((ccap) && (ccap !== "0.00")) {
            pavgdays = Math.ceil(totavgdays / ccap);
            aplf = (actual / (ccap * pavgdays * 24) * 100);
            bplf = (actual / (ccap * pavgdays * 24) * 100);
        } else {
            aplf = 0;
            bplf = 0;
        }
    } else {
        deviate = 0;
        aplf = 0;
        bplf = 0;
    }
    return aplf;
}

function getPlfDeviationRT(actual, budget) {
    let x = 0;
    let deviate = 0;
    if ((actual !== 0) && (budget !== 0) && (actual) && (budget)) {
        x = ((actual / budget) - 1);
        deviate = (x / 100);
    }
    return deviate.toFixed(2)
}
function getRevenueRT(actual, tariff) {
    let revenue = 0;
    if ((actual) && (tariff)) {
        revenue = ((parseFloat(tariff) * parseFloat(actual)) / 1000000);
    }
    return revenue.toFixed(2);
}
function getDeviationReportRT(data, data1, data2, data3, data4, data5, data6, state, reportSearch, data7) {
    let gridDataRT = [];
    const fromDate = reportSearch.from_date;
    const toDate = reportSearch.to_date;
    const type = reportSearch.type;
    const filterData = data.filter(items => items.plantType === "ROOFTOP");
    filterData && filterData.map(item => {
        let ndays = 1;
        const plantCapacityAc = getAcCapacity(item.plantCapacityAc);
        const actualGeneration = getActualRT(parseFloat(item.actual));
        const budgetGeneration = getBudgetRT(parseFloat(item.budget));
        const actualPlf = getActualPlfRT(parseFloat(item.actual), parseFloat(item.budget), parseFloat(item.ccap), ndays);
        const plfDeviation = getPlfDeviationRT(parseFloat(item.actual), parseFloat(item.budget));
        const revenue = getRevenueRT(parseFloat(item.actual), parseFloat(item.tariff));
        gridDataRT.push({
            'plantName': item.plantName, 'plantCapacityAc': plantCapacityAc, 'ccap': item.ccap, 'actualGeneration': actualGeneration,
            'budgetGeneration': budgetGeneration, 'actualPlf': actualPlf.toFixed(2), 'plfDeviation': plfDeviation + "%", 'revenue': revenue
        });
    });
    return gridDataRT;
}

function getPLFRange(minPlf, maxPlf) {
    // !empty(data["maxPlf"]) || !empty(data["minPlf"]) ? (`${round(data["minPlf"],2)}% - ",${round(data["maxPlf"],2)}% `) :"";
    let _value = 0;
    let _minPlf = parseInt(minPlf);//.toFixed(2);
    let _maxPlf = parseInt(maxPlf);//.toFixed(2);
    if ((maxPlf) || (minPlf)) {
        return _value = _minPlf + "%-" + _maxPlf + "%";
    } else {
        return "0%-0%";
    }
}

function getCheckActual(actual) {
    // chkActual = !empty(data["actual"]) ? sprintf('%0.2f', data["actual"]) : notAvail;
    if ((actual) && (actual !== "null")) {
        return parseFloat(actual).toFixed(2);
    } else {
        return "NotAvail";
    }
}

function getCheckBudget(budget) {
    // chkActual = !empty(data["actual"]) ? sprintf('%0.2f', data["actual"]) : notAvail;
    if ((budget) && (budget !== "null")) {
        return parseFloat(budget).toFixed(2);
    } else {
        return "NotAvail";
    }
}

function getActualPLF(act, bud, ccap, ndays) {
    let x = 0;
    let _value = 0;
    if (act !== 0 && bud !== 0) {
        if (ccap !== 0) {
            _value = (act / (ccap * ndays * 24) * 100);
        } else {
            _value = 0.00;
        }
    } else {
        _value = 0.00;
    }
    return _value.toFixed(2) + "%";
}

function getBudgetPlf(actu, budg, ccap, ndays) {
    let x = 0;
    let _value = 0;
    if (actu !== 0 && budg !== 0) {
        if (ccap !== 0) {
            _value = (budg / (ccap * ndays * 24) * 100);
        } else {
            _value = 0.00;
        }
    } else {
        _value = 0.00;
    }
    return _value.toFixed(2) + "%";
}


function renderData(_data, _data1, ccap, ndays) {
    let x = 0;
    let _value = 0;
    if ((_data) && (_data !== "null") && (_data1) && (_data1 !== "null")) {
        x = ((_data / _data1) - 1);
        _value = (x / 100).toFixed(2);
    }
    else {
        _value = 0.00;
    }
    return _value + "%";
}

function getRevenue(_actual, tariff) {
    let revenueYTD = 0;
    if ((_actual) && (tariff)) {
        let listactualIntegerExtractionYTD = parseFloat(_actual);
        let listTariffIntegerExtractionYTD = parseFloat(tariff);
        revenueYTD = listTariffIntegerExtractionYTD * listactualIntegerExtractionYTD;
    } else {
        revenueYTD = 0.00;
    }
    return revenueYTD.toFixed(2);
}

function getRevenueDeviation(_actual, tariff) {
    let revenueYTD = 0;
    if ((_actual) && (tariff)) {
        let listactualIntegerExtraction = parseFloat(_actual);
        let listTariffIntegerExtraction = parseFloat(tariff);
        revenueYTD = (listTariffIntegerExtraction * listactualIntegerExtraction) / 1000000;;
    } else {
        revenueYTD = 0.00;
    }
    return revenueYTD.toFixed(2);
}

function getDeviationEXT(data, state) {
    const gridData = data && data.length > 0 ? data.map((item, index) => {
        let plf_range = getPLFRange(item.minPlf, item.maxPlf);
        let checkActual = getCheckActual(item.actual);
        let checkBudget = getCheckBudget(item.budget);
        let actualPlf = getActualPLF(parseFloat(item.actual), parseFloat(item.budget), parseFloat(item.ccap), item.ndays);
        let budgetPlf = getBudgetPlf(parseFloat(item.actual), parseFloat(item.budget), parseFloat(item.ccap), item.ndays);
        let deviation = renderData(item.actual, item.budget, item.ccap, item.ndays);
        let revenue = getRevenue(parseFloat(item.actual), parseFloat(item.tariff));
        let commentDate = (item.commentCreationDate).substr(0, 10);
        return {
            ...item,
            plfRange: plf_range,
            actualGeneration: checkActual,
            budgetGeneration: checkBudget,
            actualPlf: actualPlf,
            budgetPlf: budgetPlf,
            deviation: deviation,
            revenue: revenue,
            commentCreationDate: commentDate,
        }
    }) : [];
    return gridData;
}

function getDeviationEXTRT(data, state) {
    const gridData = data && data.length > 0 ? data.map((item, index) => {
        let plf_range = getPLFRange(item.minPlf, item.maxPlf);
        let checkActual = getCheckActual(item.actual);
        let checkBudget = getCheckBudget(item.budget);
        let actualPlf = getActualPLF(parseFloat(item.actual), parseFloat(item.budget), parseFloat(item.ccap), item.ndays);
        let budgetPlf = getBudgetPlf(parseFloat(item.actual), parseFloat(item.budget), parseFloat(item.ccap), item.ndays);
        let deviation = renderData(item.actual, item.budget, item.ccap, item.ndays);
        let revenue = getRevenue(parseFloat(item.actual), parseFloat(item.tariff));
        // let commentDate = (item.commentCreationDate).substr(0,10);
        return {
            ...item,
            plfRange: plf_range,
            actualGeneration: checkActual,
            budgetGeneration: checkBudget,
            actualPlf: actualPlf,
            budgetPlf: budgetPlf,
            deviation: deviation,
            revenue: revenue,
            // commentCreationDate:commentDate,
        }
    }) : [];
    return gridData;
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
    var checkRollover = function () { if (ret.getDate() !== date.getDate()) ret.setDate(0); };
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

function forecastReport(plant, forecastConfigEntity, primaryWeatherDOs,
    insolationByPlantDOs, forecastCalculationEntities, activePowerByPlantDOs,
    forecastCalculationEntities2, activePowerByPlantDOs2, insolationHistorytByWeatherIdDOs,
    totalPacSubTotal, moduleTemperatureDeviationRangeSQL, avgTmpMdle, forecastIrradianceDeviationSQL,
    actualModuleTempDOs, moduleTempForecastByPlantIdDate,
    moduleTemperatureHistorytByWeatherIdDOs, search) {
    // $time_slot = $this->getTimeSlotByPlantId();
    let time_array = [];
    let result2 = []
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
    let fromDate = search.fromDate;
    let d = dateFormat(fromDate);
    d.setDate(d.getDate());
    let forecast_date = formatDate(d);
    // fromDate = forecast_date;
    let time_slot = time_array;
    let arrayHeaderData = [];
    arrayHeaderData.push("Time", "Plant Name", "Insolation - Forecast -" + forecast_date, "Module Temperature - Forecast -" + forecast_date, "Generation - Forecast -" + forecast_date, "System Losses", "Actual -" + forecast_date, "Insolation - Count -" + forecast_date, "Deviation (%)", "Difference-" + forecast_date, "Penalty -".$forecast_date, "Deviation Respect to schedule", "Actual Irradiance", "Forecasted Irradiance", "Actual Module Temparature Loss", "Forecast Module Temparature Losss", "Absolute Error", "Actual System Losses", "Multiplying Factor", "Adjusted Generation Forecast",
        "Generation Forecast 2-. forecast_date", "Weighted Average Forecast");
    let weightage = search.weightage;
    let daysCount = search.tdays;
    if (daysCount === '' || daysCount === undefined || isNaN(daysCount) || daysCount === null) {
        daysCount = 1
    }
    if (weightage === '' || weightage === undefined || isNaN(weightage) || weightage === null) {
        weightage = 1

    }
    let forecstResult = [];
    let toDate = search.toDate;
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
    let currentInsoFilterValue = insolationByPlantDOs.filter(items => items.insolationDate === fromDate);
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
    }
    // Get forecast sheet data
    let forecastSheetFilterValue = forecastCalculationEntities;//.filter(items => items.date.substring(0.10) === forecast_date)[0];
    let get_data_from_forecast_sheet = forecastSheetFilterValue;//$this->fcm->getForecastedSheetDataSQL($plantData->plant_id, $forecast_date);
    let allCurrentPacFilterValue = activePowerByPlantDOs;//.filter(items => items.inverterDate === fromDate)[0];
    let allCurrentPac = allCurrentPacFilterValue;//$this->fcm->getActivePowerByPlantSQL($plantData->plant_id, $forecast_date);
    let weatherStationFilterValue = primaryWeatherDOs.filter(items => items.plantId === plant.plantId)[0];
    let primary_weather_station_data = weatherStationFilterValue;//$this->fcm->getPrimaryWeatherId($plantId);
    let primary_weather_station_id = 0;
    if (primary_weather_station_data) {
        primary_weather_station_id = primary_weather_station_data.weatherStationId;
    }

    let moduleTempFilterValue = moduleTempForecastByPlantIdDate;//.filter(items => items.date === fromDate)[0];
    let moduleTempDataForDay = moduleTempFilterValue;//$this->fcm->getModuleTemperatureForecastByDateTime3($plantData->plant_id, $forecast_date);
    let allActualPlantData = allCurrentPacFilterValue;//$this->fcm->getActualDataByPlantIdDateTimeSQL($plantData->plant_id, $forecast_date);
    let currentHourMinus1Hr = dateAdd(today, "hour", -1);
    currentHourMinus1Hr = currentHourMinus1Hr.getHours();
    // let currentHour = minutes30.getHours();
    // let currentMinutes = minutes30.getMinutes();
    // if (currentMinutes < 15){
    //     currentMinutes = "00";
    // } else {
    //     currentMinutes = "30";
    // }
    // let currHrMnts = currentHour+":"+currentMinutes;
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
        "count": 0
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
    let multiFactor = [];
    let current_pac = [];
    let multiF = 0;
    let adjustF = 0;
    let nextActiveHistoricData = 0;
    let round_array_value = [];
    let adjusted_forecast = [];
    let adjusted_forecast_result = [];
    let previous_hour_forecast_irradiance = 0;
    let activeMultiFact = [];

    time_slot.forEach(valKey => {
        result["time"] = valKey
        let minutes = valKey;
        let currentHourMinus1Hr = dateAdd(today, "hour");
        minutes = currentHourMinus1Hr.getHours();//minutes.substring(0,2);
        if ((minutes >= '00' && minutes <= '06') || (minutes >= '19' && minutes <= '24')) {
            res_array.push({ "count": 0 })
            res_array[minutes, 0] = 0;
            multiFactor[minutes, 0] = 0;
            adjusted_forecast[minutes, 0] = 0;
            activeMultiFact[minutes, 0] = 0;
            currentGeneratedForecastData = 0;
        } else {
            // Get current days insolation data
            let current_rounded_hour_minus_1hr = dateAdd(today, "hour", -1);
            current_rounded_hour_minus_1hr = current_rounded_hour_minus_1hr.getHours();
            // let current_rounded_hour_minus_1hr = date('H:00:00', strtotime($minutes . "-1 hour"));
            if (current_insolation[current_rounded_hour_minus_1hr]) {
                current_rounded_hour_minus_1hr = previous_rounded_hour_by_insolation_result;
            }
            // ------------- INSOLATION FORECAST -------------------------------------------------------------------------------------------------
            let insolation_dev_range_result = [];
            let insolution = current_insolation[current_rounded_hour_minus_1hr].insolation;
            let weatherStationId = current_insolation[current_rounded_hour_minus_1hr].weatherStationId;

            // , fromDate, min_historic_result, max_deviation_result);
            console.log(forecastIrradianceDeviationSQL)
            // const insolationDeviationrangeFilterValue = forecastIrradianceDeviationSQL.filter(
            //     items => items.insolation === insolution)[0];
            const insolationDeviationrangeFilterValue = forecastIrradianceDeviationSQL.filter(
                items => items.insolation === insolution && items.insolationDate === forecast_date &&
                    items.insolationTime.substring(0, 2) === current_rounded_hour_minus_1hr)[0];
            if (current_insolation[current_rounded_hour_minus_1hr]) {
                // Finding deviation range logic
                if (insolationDeviationRange[current_rounded_hour_minus_1hr]) {
                    insolation_dev_range_result = insolationDeviationRange[current_rounded_hour_minus_1hr];
                } else {
                    insolation_dev_range_result = findInsolationDeviationRangeSQL(insolationDeviationrangeFilterValue.insolation, weatherStationId, minutes, forecast_date, min_historic_result, max_deviation_result, insolationHistorytByWeatherIdDOs);//$this->findInsolationDeviationRangeSQL($current_insolation[$current_rounded_hour_minus_1hr]['insolation'], $current_insolation[$current_rounded_hour_minus_1hr]['weather_station_id'], $current_rounded_hour_minus_1hr, $forecast_date, $min_historic_result, $max_deviation_result);
                }
                insolationDeviationRange[current_rounded_hour_minus_1hr] = insolation_dev_range_result;

                // let date_res_array1 = insolation_dev_range_result[0];
                date_res_array = insolation_dev_range_result[0].date_res_array;
                forecast_count = insolation_dev_range_result[0].forecast_count;
                let forecast_deviation_percentage = insolation_dev_range_result[0].deviation_percentage;
                const insolationHistoryFilterValue = insolationHistorytByWeatherIdDOs.filter(items => items.insolationDate === forecast_date && items.insolationTime === valKey)[0];
                if (date_res_array.length > 0) {
                    sub_total = avgTmpMdle;//$this->fcm->getInsolationHistorytByDateTime($current_insolation[$current_rounded_hour_minus_1hr]['weather_station_id'], $date_res_array1, $minutes);
                }
                //res_array[valKey] = sub_total;//[0]
                insolationForecastData = sub_total
                result["insolationForecastData"] = sub_total;
                //insolationForecastData = res_array[valKey];//[0]
                InsolationHistoricData = sub_total;
                //var res_array[valKey]['count'] =''
                result['count'] = forecast_count;
            }

            //  -------- GENERATION FORECAST 2 ---------------------------------------------------------------------------------------------------
            minutes = valKey;
            if (minutes === '06:00:00' || minutes === '07:00:00' || minutes === '08:00:00' || minutes === '09:00:00'
                || minutes === '10:00:00' || minutes === '11:00:00' || minutes === '12:00:00' || minutes === '13:00:00' || minutes === '14:00:00'
                || minutes === '15:00:00' || minutes === '16:00:00' || minutes === '17:00:00' || minutes === '18:00:00' || minutes === '19:00:00') {
                let previous_rounded_hour = minutes.substring(0, 2);
                previous_rounded_hour = parseInt(previous_rounded_hour - 1);
                // previous_rounded_hour = previous_rounded_hour.substring(0,2);
                // let  = date('H:00:00', strtotime('-1 hour', strtotime($minutes)));
                let current_rounded_hour_minus_1hr = dateAdd(today, "hour", -1);
                current_rounded_hour_minus_1hr = current_rounded_hour_minus_1hr.getHours();
                let insotimeVal = 0;
                if (current_rounded_hour_minus_1hr.length < 2) {
                    insotimeVal = '0' + current_rounded_hour_minus_1hr;
                } else {
                    insotimeVal = current_rounded_hour_minus_1hr;
                }
                // let current_rounded_hour_minus_1hr = date('H:00:00', strtotime($minutes . "-1 hour"));
                if (current_insolation[current_rounded_hour_minus_1hr]) {
                    current_rounded_hour_minus_1hr = previous_rounded_hour_by_insolation_result;
                }
                // To calculate Multifactor for current hour -1 rounded hour
                let currentactive_pac = 0;
                if (allCurrentPac[current_rounded_hour_minus_1hr])
                    currentactive_pac = allCurrentPac[current_rounded_hour_minus_1hr];
                else
                    currentactive_pac = 0;
                // To calculate insolation for current hour -1 rounded hour
                let generation_rounded_dev_range_result = '';
                const insolationDeviationrangeFilterValue1 = forecastIrradianceDeviationSQL.filter(
                    items => items.insolation === insolution && items.insolationDate === forecast_date &&
                        items.insolationTime.substring(0, 2) === insotimeVal)[0];
                if (current_insolation[current_rounded_hour_minus_1hr]) {
                    // # If the insolation deviation values exists use otherwise find insolation based on the deviation range
                    if (insolationDeviationRange[current_rounded_hour_minus_1hr]) {
                        generation_rounded_dev_range_result = insolationDeviationRange[current_rounded_hour_minus_1hr];
                    } else {
                        // # Finding deviation range logic get the list of dates based on the insolation values
                        generation_rounded_dev_range_result = insolationDeviationrangeFilterValue1;//this->findInsolationDeviationRangeSQL($current_insolation[$current_rounded_hour_minus_1hr]['insolation'], $current_insolation[$current_rounded_hour_minus_1hr]['weather_station_id'], $current_rounded_hour_minus_1hr, $forecast_date, $min_historic_result, $max_deviation_result);
                    }

                    date_res_array = generation_rounded_dev_range_result[0].date_res_array;;
                    forecast_count = generation_rounded_dev_range_result[0].forecast_count;
                    let forecast_deviation_percentage = generation_rounded_dev_range_result[0].deviation_percentage;

                    if (date_res_array.length > 0) {
                        // # For those matching insolation dates need to get the Total Pac value
                        previous_sub_total = totalPacSubTotal;//$this->fcm->getActivePowerHistorytByDateTime($plantData->plant_id, $date_res_array, $current_rounded_hour_minus_1hr);
                    }

                    // # To calculate multi factor based on the active power data
                    if (previous_sub_total > 0 || previous_sub_total !== null) {
                        CurrentActiveHistoricData = previous_sub_total;

                        result['count'] = forecast_count;
                        if (currentactive_pac > 0) {
                            activeMultiFactor = ((currentactive_pac['total_pac']) / CurrentActiveHistoricData);
                        } else {
                            activeMultiFactor = 0;
                        }
                    }
                }
            }

            let hourPlus = minutes.substring(0, 2);
            let hourPlusMinutes = minutes.substring(3, 5);
            let hourPlusSeconds = minutes.substring(6, 8);
            hourPlus = parseInt(hourPlus + 1);
            let next_rounded_hour = hourPlus + ":" + hourPlusMinutes + ":" + hourPlusSeconds;
            // next_rounded_hour = date('H:i:s', strtotime('+1 hour', strtotime($minutes)));
            current_rounded_hour_minus_1hr = dateAdd(today, "hour", -1);
            current_rounded_hour_minus_1hr = current_rounded_hour_minus_1hr.getHours();
            let intialvalue = 0;
            if (current_rounded_hour_minus_1hr.length < 2) {
                intialvalue = ('0' + current_rounded_hour_minus_1hr);
            } else {
                intialvalue = current_rounded_hour_minus_1hr;
            }
            // current_rounded_hour_minus_1hr = minutes.substring(0,2);
            // current_rounded_hour_minus_1hr = parseInt(current_rounded_hour_minus_1hr-1);
            if (current_insolation[current_rounded_hour_minus_1hr]) {
                current_rounded_hour_minus_1hr = previous_rounded_hour_by_insolation_result;
            }
            insolution = current_insolation[current_rounded_hour_minus_1hr].insolation;
            let generation_dev_range_result = '';

            let insoTime = intialvalue + ":00:00";
            const insolationDeviationrangeFilterValue1 = forecastIrradianceDeviationSQL.filter(
                items => items.insolation === insolution && items.insolationDate === forecast_date &&
                    items.insolationTime.substring(0, 2) === current_rounded_hour_minus_1hr)[0];
            if (current_insolation[current_rounded_hour_minus_1hr]) {
                // # Finding deviation range logic
                if (insolationDeviationRange[current_rounded_hour_minus_1hr]) {
                    generation_dev_range_result = insolationDeviationRange[current_rounded_hour_minus_1hr];
                } else {
                    generation_dev_range_result = findInsolationDeviationRangeSQL(insolationDeviationrangeFilterValue1.insolation, weatherStationId, minutes, forecast_date, min_historic_result, max_deviation_result, insolationHistorytByWeatherIdDOs);//$this->findInsolationDeviationRangeSQL($current_insolation[$current_rounded_hour_minus_1hr]['insolation'], $current_insolation[$current_rounded_hour_minus_1hr]['weather_station_id'], $current_rounded_hour_minus_1hr, $forecast_date, $min_historic_result, $max_deviation_result);
                    // insolationDeviationrangeFilterValue1;//$this->findInsolationDeviationRangeSQL($current_insolation[$current_rounded_hour_minus_1hr]['insolation'], $current_insolation[$current_rounded_hour_minus_1hr]['weather_station_id'], $minutes, $forecast_date, $min_historic_result, $max_deviation_result);
                }
                date_res_array = generation_dev_range_result[0].date_res_array;
                forecast_count = generation_dev_range_result[0].forecast_count;
                let forecast_deviation_percentage = generation_dev_range_result[0].deviation_percentage;
                if (date_res_array.length > 0) {
                    total_pac_subtotal = totalPacSubTotal;//$this->fcm->getActivePowerHistorytByDateTime($plantData->plant_id, $date_res_array, $minutes);
                }
                if (total_pac_subtotal > 0 || total_pac_subtotal !== null) {
                    nextActiveHistoricData = total_pac_subtotal;

                    //res_array[valKey]['count'] = forecast_count;
                    if (activeMultiFactor <= 0) {
                        activeMultiFactor = 0;
                    }
                    nextActiveHistoricData = nextActiveHistoricData.replace("[", "");
                    nextActiveHistoricData = nextActiveHistoricData.replace("]", "");
                    currentGeneratedForecastData = (activeMultiFactor * nextActiveHistoricData);
                    result["currentGeneratedForecastData"] = currentGeneratedForecastData;
                }
            }
        }
        let time = valKey;
        let plant_name = plant.plantName;
        let insolation_forecast_data = (insolationForecastData) ? Math.round(insolationForecastData, 2) : 0;
        ////let insolation_forecast_count = (res_array[valKey]['count']) ? Math.round(res_array[valKey]['count'], 2) : 0;
        let insolation_forecast_count = (forecast_count) ? Math.round(forecast_count, 2) : 0;
        result["insolation_forecast_count"] = (forecast_count) ? Math.round(forecast_count, 2) : 0;
        let insolation_dev_percentage = (forecast_deviation_percentage) ? forecast_deviation_percentage : 0;
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
        module_temp_res_array = [];
        minutes = minutes.substring(0, 2);
        if ((minutes >= '00' && minutes <= '06') || (minutes >= '19' && minutes <= '24')) {
            module_temp_res_array[minutes] = 0;
        } else {
            // # Get current days insolation data
            current_rounded_hour_minus_1hr = dateAdd(today, "hour", -1);
            current_rounded_hour_minus_1hr = current_rounded_hour_minus_1hr.getHours();
            // current_rounded_hour_minus_1hr = hourMinusOne;//date('H:00:00', strtotime($minutes . "-1 hour"));
            if (current_insolation[current_rounded_hour_minus_1hr]) {
                current_rounded_hour_minus_1hr = previous_rounded_hour_by_insolation_result;
            }

            if (current_insolation[current_rounded_hour_minus_1hr]) {
                if (moduleDeviationRange[current_rounded_hour_minus_1hr]) {
                    module_dev_range_result = moduleDeviationRange[current_rounded_hour_minus_1hr];
                } else {
                    module_dev_range_result = findModuleTemperatureDeviationRangeSQL(current_insolation[current_rounded_hour_minus_1hr].tempMdul, forecast_date, min_historic_result, max_deviation_result, moduleTemperatureDeviationRangeSQL);
                    moduleDeviationRange[current_rounded_hour_minus_1hr] = module_dev_range_result;
                }
                // # Finding deviation range logic
                date_res_array = module_dev_range_result[0].date_res_array;
                forecast_count = module_dev_range_result[0].forecast_count;
                forecast_deviation_percentage = module_dev_range_result[0].deviation_percentage;
                if (date_res_array.length > 0) {
                    sub_total = avgTmpMdle;//getModuleTemperatureHistorytByDateTime(current_insolation[current_rounded_hour_minus_1hr]['weather_station_id'], date_res_array, minutes);
                }
                module_temp_res_array[valKey] = sub_total;
            }
        }

        time = minutes;
        plant_name = plant.plantName;//plantData->plant_name;
        result["module_temp_forecast_data"] = module_temp_res_array;
        let module_temp_forecast_data = (module_temp_res_array) ? Math.round(module_temp_res_array[valKey], 2) : 0;
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
        if ((minutes >= '00' && minutes <= '06') || (minutes >= '19' && minutes <= '24')) {
            //res_array[valKey]['system_losses'] = 0;
            res_array[valKey] = 0;
            calc_generation_forecast = 0;
        } else {
            // # Get module temperature forecast value for the specifi period
            // # Get insolation forecast value for the specifi period
            if (insolationForecastData) {
                insolation_forecast_data = insolationForecastData;
            }

            if (module_temp_forecast_data) {
                //module_temperature_data = module_temp_forecast_data;
                result["module_temp_forecast_data"] = module_temp_forecast_data
            }

            if (plant.temperatureCoefficientPower) {
                temperature_coefficient_power_data = plant.temperatureCoefficientPower;
            }
            let forecast_irradiance_deviation_date = '';
            // #Calculate Module Temperature Losses
            calc_module_temp_losses = (((25 - module_temperature_data) * (temperature_coefficient_power_data)) * -1);
            // # Calculate Forecasted System Loss based on the historic data
            let insolution = current_insolation[current_rounded_hour_minus_1hr].insolation;
            const insolationDeviationrangeFilterValue = forecastIrradianceDeviationSQL.filter(
                items => items.insolation === insolution && items.insolationDate === forecast_date &&
                    items.insolationTime.substring(0, 2) === current_rounded_hour_minus_1hr);
            let calc_forecasted_system_loss = '';
            if (primary_weather_station_id) {
                // # Get DATE's -using forecast irradiance - by applying the band (+-) 5% deviation
                forecast_irradiance_deviation_date = insolationDeviationrangeFilterValue;//getDateByforecastIrradianceDeviationSQL($insolation_forecast_data, $primary_weather_station_id, $minutes, $forecast_date);
                // # Arranging date's as string
                let prefix = '';
                let forecast_irradiance_deviation_date_list = [];
                forecast_irradiance_deviation_date.forEach(value => {
                    forecast_irradiance_deviation_date_list = value.insolationDate;
                    prefix = ',';
                })

                // # Forecast module temperature - deviation - Apply the band (+/-) 2.5%
                // let _date = "2019-04-05";
                const filterActualModuleTempDOs = actualModuleTempDOs.filter(items => items.insolationDate === forecast_date && items.insolationTime === valKey);//fromDate
                let getActualModuleDeviation = filterActualModuleTempDOs;//getActualModuleDeviation($forecast_irradiance_deviation_date_list, $minutes, $module_temperature_data, $primary_weather_station_id, $min_historic_result, $max_deviation_result);
                // #Need to check empty validation
                if (getActualModuleDeviation) {
                    calc_forecasted_system_loss = calculateForecastedSystemLoss(getActualModuleDeviation);//calculateForecastedSystemLoss($getActualModuleDeviation[$minutes], $minutes);
                }
            }
            if (calc_forecasted_system_loss) {
                forecasted_system_losses = Math.round((calc_forecasted_system_loss / 100), 2);
            }

            let forecasted_module_temperature_loss_tmp = Math.round((calc_module_temp_losses * 100), 2);
            let forecasted_module_temperature_loss = forecasted_module_temperature_loss_tmp / 100;

            calc_generation_forecast = ((insolation_forecast_data * 0.25 / 1000 * (1 + (forecasted_system_losses) + (forecasted_module_temperature_loss))) * (plant.plantCapacityAc * 4));
            res_array[valKey] = calc_generation_forecast;
            //res_array[valKey]['system_losses'] = forecasted_system_losses;
        }

        time = valKey;
        plant_name = plant.plantName;//plantData->plant_name;
        let generation_forecast_datas = (calc_generation_forecast) ? Math.round(calc_generation_forecast, 4) : 0;
        result["generation_forecast_datas"] = (calc_generation_forecast) ? Math.round(calc_generation_forecast, 4) : 0;
        let system_losses = (forecasted_system_losses) ? Math.round(forecasted_system_losses, 4) : 0;
        result["system_losses"] = (forecasted_system_losses) ? Math.round(forecasted_system_losses, 4) : 0;
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
        result["generationForecastWeightage2"] = generationForecastWeightage2;

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
        if ((minutes >= '00' && minutes <= '06') || (minutes >= '19' && minutes <= '24')) {
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
                penalty_res_array['total_pac'] = allActualPlantData.totalPac;
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
                respectiveSchedule = round(deviationSchedule, 2);
                deviationRespectSchedule = (respectiveSchedule * 100) + "%";
                result["deviationRespectSchedule"] = (respectiveSchedule * 100) + "%";
            }

            error_value = ((penalty_res_array['gen_forecast_weightage']) - ((penalty_res_array['total_pac']) / plant.plantCapacityAc));
            if (error_value < 0) {
                error_result = (penalty_res_array['gen_forecast_weightage'] - penalty_res_array['total_pac']) / plant.plantCapacityAc;
            } else {
                error_result = -1 * ((penalty_res_array['gen_forecast_weightage'] - penalty_res_array['total_pac']) / plant.plantCapacityAc);
            }
            penalty_res_array['absolute_error'] = Math.round(error_result, 4);
            absoluteErrorData = (penalty_res_array['absolute_error'] * 100) + "%";
            result["absoluteErrorData"] = (penalty_res_array['absolute_error'] * 100) + "%";
        }
        let absolute_error = '';
        time = valKey;
        plant_name = plant.plantName;
        total_pac_data = (penalty_res_array['total_pac']) ? Math.round(penalty_res_array['total_pac'], 4) : 0;
        result["total_pac_data"] = (penalty_res_array['total_pac']) ? Math.round(penalty_res_array['total_pac'], 4) : 0;

        absolute_error = (penalty_res_array['absolute_error']) ? Math.round(penalty_res_array['absolute_error'], 4) : 0;
        total_difference_data = (difference_calc) ? Math.round(difference_calc, 4) : 0;
        result["total_difference_data"] = (difference_calc) ? Math.round(difference_calc, 4) : 0;
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

        //res_array[valKey]['penalty_calculated_data'] = result1;

        time = valKey;
        plant_name = plant.plantName;
        penalty_calculated_data = (result1) ? Math.round(result1, 4) : 0;
        result["penalty_calculated_data"] = (result1) ? Math.round(result1, 4) : 0;
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
        let currentInsoFilter = current_insolation.filter(items => items.insolationTime === valKey)[0];
        if (currentInsoFilter) {
            actual_irradiance = Math.round(currentInsoFilter.insolation, 2);
            result["actual_irradiance"] = actual_irradiance;//Math.round(current_insolation[minutes]['insolation'], 2);
            alculteTempLoss = ((25 - (currentInsoFilter.tempMdul)) * (temperature_coefficient_power_data)) * -1;
            actualTemp = Math.round(calculteTempLoss, 4);
            actualtempLoss = (actualTemp * 100) + '%';
            result["actualtempLoss"] = (actualTemp * 100) + '%';
        }
        if (total_pac_data > 0) {
            sub_calc1 = total_pac_data;
            sub_calc2 = (actual_irradiance * (1 + actualTemp) * plant.plantCapacityAc / 1000);
            if (sub_calc2 > 0) {
                actualSystem = (sub_calc1 / sub_calc2) - 1;
            }
        }

        actualLosses = Math.round(actualSystem, 4);
        if (actual_irradiance) {
            actualSystemLosses = (actualLosses * 100) + '%';
            result["actualSystemLosses"] = (actualLosses * 100) + '%';
        }

        let getDataFromforecastFilter = get_data_from_forecast_sheet.filter(items => items.time === valKey)[0];
        if (getDataFromforecastFilter) {
            forecastIrradiance = Math.round(getDataFromforecastFilter.insolationForecast, 2);
            result["forecastIrradiance"] = forecastIrradiance;//Math.round(get_data_from_forecast_sheet[minutes]['insolation_forecast'], 2);
            moduleTemp = getDataFromforecastFilter.moduleTemperatureForecast;

            moduleForecastTemp = ((25 - moduleTemp) * (temperature_coefficient_power_data)) * -1;
            forecastModuleTemp = Math.round(moduleForecastTemp, 4);

            forecastModuleTempLoss = (forecastModuleTemp * 100) + '%';
            result["forecastModuleTempLoss"] = forecastModuleTempLoss;//(forecastModuleTemp * 100)+'%';

        }

        // #------------- CALCULATING MULTIPLY FACTOR ---------------------------------------------------------------------------
        if (InsolationHistoricData > 0) {
            multiFactor = actual_irradiance / InsolationHistoricData;
        }

        if (multiFactor) {
            multiF = multiFactor;
            result["multiF"] = multiF;//multiFactor[minutes];
        }

        // $insertData = "'" . $plantData->plant_id . "','" . $plantData->plant_name . "','" . $forecast_date . "','" . $time . "','" . $penalty_calculated_data . "','" . round($multiF, 4) . "'";
        // #echo $insertData;
        // $updateData = 'penalty_calculated_data =' . $penalty_calculated_data . ', multiply_factor_data =' . round($multiF, 4);
        // #echo $updateData;
        // $previous_rounded_hour = date('H:00:00', strtotime('-1 hour', strtotime($minutes)));
        let previous_rounded_hour = dateAdd(today, "hour", -1);
        previous_rounded_hour = previous_rounded_hour.getHours();
        if (get_data_from_forecast_sheet) {
            previous_hour_forecast_irradiance = Math.round(get_data_from_forecast_sheet.multiplyFactorData, 2);
        }
        // # Calculate Forecast Irradiance based on the previous hour's multiply factor
        adjusted_forecast_result = previous_hour_forecast_irradiance * InsolationHistoricData;
        if (adjusted_forecast_result) {
            adjustF = adjusted_forecast_result;
            result["adjustF"] = adjustF;//adjusted_forecast_result[minutes];
        }
        let columnName = "Insolation - Forecast -" + fromDate;
        let columnName1 = "Module Temperature - Forecast -" + fromDate;
        let columnName2 = "Generation - Forecast -" + fromDate;
        let columnName3 = "Actual -" + fromDate;
        let columnName4 = "Difference-" + fromDate;
        let columnName5 = "Penalty -" + fromDate;
        let columnName6 = "Generation Forecast 2-. " + fromDate;
        // forecstResult.push({
        //     "Time":result["time"],
        //     "Plant Name":result["plant_name"],
        //     columnName: result["insolationForecastData"],
        //     columnName1: result["module_temp_forecast_data"],
        //     columnName2: result["generation_forecast_datas"],
        //     "System Losses": result["system_losses"],
        //     columnName3: result["total_pac_data"],
        //     "Insolation - Count -2020-03-01": result["insolation_forecast_count"],
        //     "Deviation (%)":result["insolation_dev_percentage"],
        //     columnName4:result["total_difference_data"],
        //     columnName5:result["penalty_calculated_data"],
        //     "Deviation Respect to schedule":result["deviationRespectSchedule"],
        //     "Actual Irradiance":result["actual_irradiance"],
        //     "Forecasted Irradiance":result["forecastIrradiance"],
        //     "Actual Module Temparature Loss":result["actualtempLoss"],
        //     "Forecast Module Temparature Losss":result["forecastModuleTempLoss"],
        //     "Absolute Error":result["absoluteErrorData"],
        //     "Actual System Losses":result["actualSystemLosses"],
        //     "Multiplying Factor":result["multiF"],
        //     "Adjusted Generation Forecast":result["adjustF"],
        //     columnName6:result["generationForecastWeightage2"],
        //     "Weighted Average Forecast":result["count"],
        // })
        result2.push({ result: result });
        // arrayDataResult.push(time, plant_name, Math.round(insolationForecastData, 2), module_temp_forecast_data, generation_forecast_datas, system_losses, total_pac_data, insolation_forecast_count, insolation_dev_percentage, total_difference_data, penalty_calculated_data, deviationRespectSchedule, actual_irradiance, forecastIrradiance, actualtempLoss, forecastModuleTempLoss, absoluteErrorData, actualSystemLosses, Math.round(multiF, 4), Math.round(adjustF, 4), Math.round(currentGeneratedForecastData, 4), Math.round(generationForecastWeightage2, 4));
        // $this->fcm->insertPenaltyCalculationData($insertData, $updateData);
    })



    return result2;
}

function findInsolationDeviationRangeSQL(insolation, weather_station_id, minutes, fromDate, min_historic_result, max_deviation_result, insolationHistorytByWeatherIdDOs) {
    let date_res_array = [];
    let sub_total = 0;
    let deviation_percentage = 1;
    let resultArray = [];

    // deviation_percentage:

    let current_insolation_data = insolation;
    let deviation_result = (deviation_percentage * current_insolation_data) / 100;


    // # Calculate deviation and get the deviation range
    let deviation_result_add = current_insolation_data + deviation_result;
    let deviation_result_sub = current_insolation_data - deviation_result;

    // # Getting historic DATE for the plant weather at particular date for the particular time
    const filterValue = insolationHistorytByWeatherIdDOs.filter(items => items.insolationDate === fromDate);
    let insolation_history_result = filterValue;//$this->fcm->getCurrentHourInsolationHistorytByWeatherId($weather_station_id, $deviation_result_sub, $deviation_result_add, $minutes, $forecast_date);
    let forecast_count = insolation_history_result.length;
    if (min_historic_result >= forecast_count && deviation_percentage < max_deviation_result) {
        deviation_percentage += 1;
    }
    let i = 0;
    for (i = 0; i < insolation_history_result.length - 1; i++) {
        date_res_array.push(insolation_history_result[i].insolationDate);
        sub_total += parseFloat(insolation_history_result[i].insolation);
    }

    resultArray.push({ 'date_res_array': date_res_array, "forecast_count": forecast_count, "deviation_percentage": deviation_percentage, "sub_total": sub_total });

    return resultArray;
}

function findModuleTemperatureDeviationRangeSQL(module_temp, forecast_date, min_historic_result, max_deviation_result, moduleTemperatureDeviationRangeSQL) {
    let date_res_array = [];
    let deviation_percentage = 1;
    let sub_total = 0;
    let resultArray = [];

    let current_module_temp_data = module_temp;
    let deviation_result = (deviation_percentage * current_module_temp_data) / 100;

    // Calculate deviation and get the deviation range
    let deviation_result_add = current_module_temp_data + deviation_result;
    let deviation_result_sub = current_module_temp_data - deviation_result;

    // Getting historic DATE for the plant weather at particular date for the particular time
    const filterValue = moduleTemperatureDeviationRangeSQL.filter(items => items.insolationDate === forecast_date);
    let module_temp_history_result = filterValue;//this.getModuleTemperatureHistorytByWeatherId(weather_station_id, deviation_result_sub, deviation_result_add, minutes, forecast_date);

    let forecast_count = module_temp_history_result.length;
    if (min_historic_result >= forecast_count && deviation_percentage < max_deviation_result) {
        deviation_percentage += 1;
        // continue;
    }
    // module_temp_history_result.forEach(module_temp_history=>{
    //     date_res_array = module_temp_history.insolationDate;
    //     sub_total += module_temp_history.tempMdul;
    // })

    let i = 0;
    for (i = 0; i < module_temp_history_result.length - 1; i++) {
        date_res_array.push(module_temp_history_result[i].insolationDate);
        sub_total += parseFloat(module_temp_history_result[i].insolation);
    }

    resultArray.push({ 'date_res_array': date_res_array, "forecast_count": forecast_count, "deviation_percentage": deviation_percentage, "sub_total": sub_total });

    return resultArray;
    // return {dateArray: date_res_array, forecastCount: forecast_count, devPercentage: deviation_percentage, subTotal: sub_total};
}
function findMaxNum(seriesMap) {
    let bigNum = 0;
    seriesMap && seriesMap.length > 0 && seriesMap.forEach((item) => {
        bigNum = Math.max(bigNum, parseFloat(item.data));
    })
    return bigNum;
}

function calculateForecastedSystemLoss(system_loss_data) {
    let _result = [];
    let most_occurence_system_loss = 0;
    system_loss_data.forEach(loss_data => {
        _result = loss_data.actualSystemLoss * 100;// System loss in percentage
    })
    return findMaxNum(parseFloat(_result));
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
