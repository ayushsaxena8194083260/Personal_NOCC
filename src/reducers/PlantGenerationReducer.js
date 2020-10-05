import {
    POST_PLANT_GENERATION,
    GET_PLANTDAILY_GEN,
    SEARCH_PLANTDAILY_GENERATION_DATA,
    CLEAR_PLANTDAILY_GENERATION,
    GET_PLANTDAILY_GEN_MONTHLY,
    SEARCH_MFMDAILY_GENERATION_DATA,
    GET_MFMDAILY,
    SEARCH_AMR_GENERATION_DATA,
    GET_AMR,
    GET_MFMREADING,
    GET_AMR_METER,
    DELETE_ACTUAL_GENERATION
} from '../actions/types'
import { getPriority } from 'os'
import PlantGenerationAdd from '../components/PlantActualGeneration/PlantGenerationAdd'

const INITIAL_STATE = {
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case POST_PLANT_GENERATION:
            return {
                ...state,
                plantGeneration: action.plantGeneration,
                displayMessage: action.displayMessage
            }
        case DELETE_ACTUAL_GENERATION: {
            return {
                ...state,
                displayMessage: action.displayMessage
            }
        }

        case SEARCH_PLANTDAILY_GENERATION_DATA:
            {
                return {
                    ...state,
                    plantDailyGenSearch: action.plantDailyGenSearch,
                }
            }
        case SEARCH_MFMDAILY_GENERATION_DATA:
            {
                return {
                    ...state,
                    plantDailyMFMSearch: action.plantDailyMFMSearch,
                }
            }
        case GET_MFMREADING:
            {
                const _plantGen = getMFMReading(action.mfmReading);
                let newState = { ...state }
                newState.mfmReading = _plantGen;
                newState.displayMessage = null;
                return newState
            }
        case GET_MFMDAILY:
            {
                const _plantGen = getMFMDaily(action.mfmDailyGen, action.mfmDailyWeather);
                let newState = { ...state }
                newState.mfmDailyGen = _plantGen;
                newState.displayMessage = null;
                return newState
            }
        case SEARCH_AMR_GENERATION_DATA:
            {
                return {
                    ...state,
                    plantDailyAMRearch: action.plantDailyAMRearch,
                }
            }
        case GET_AMR_METER:
            {
                let newState = { ...state }
                newState.amrMeterGen = getAMRMeter(action.amrMeterGen, action.amrMeterDailyWeather);
                newState.displayMessage = null;
                return newState
            }

        case GET_AMR:
            {
                let newState = { ...state }
                newState.amrGen = getAMRDaily(action.amrGen, action.amrDailyWeather);
                newState.displayMessage = null;
                return newState
            }
        case GET_PLANTDAILY_GEN:
            {
                const _plantGen = getDailyGen(action.plantDailyGeneration.plantActualGenerationDetailDOList, action.currency, state, action.input);
                let newState = { ...state }
                newState.plantDailyGen = _plantGen;
                newState.displayMessage = null;
                newState.totalResult = getTotal(_plantGen)
                return newState
            }
        case GET_PLANTDAILY_GEN_MONTHLY:
            {
                const _plantGen = getDailyGenMonthly(action.plantDailyGeneration, action.netGeneration.plantActualGenerationDetailDOList, action.currency, state, action.input);
                let newState = { ...state }
                newState.plantDailyGen = _plantGen;
                newState.displayMessage = null;
                newState.totalResult = getTotalMonth(_plantGen)
                return newState
            }
        case CLEAR_PLANTDAILY_GENERATION:
            {
                return {
                    ...state,
                    plantDailyGen: [],
                    totalResult: [],
                    displayMessage: null,
                }
            }
        default:
            return state;

    }
}

function getTotal(data) {
    let imp = 0;
    let exp = 0;
    let gen = 0;
    let rev = 0;

    data && data.map((item, index) => {
        imp += parseFloat(item.importData);
        exp += parseFloat(item.export);
        gen += parseFloat(item.netGeneration);
        rev += parseFloat(item.revenue);
    })

    return {
        importData: imp.toFixed(2),
        exportData: exp.toFixed(2),
        netGeneration: gen.toFixed(2),
        revenue: rev.toFixed(2)
    }

}

function getTotalMonth(data) {
    let imp = 0;
    let exp = 0;
    let gen = 0;
    let rev = 0;

    data && data.map((item, index) => {
        imp += parseFloat(item.importData);
        exp += parseFloat(item.export);
        gen += parseFloat(item.netGeneration);
        rev += parseFloat(item.revenue);
    })

    return {
        importData: imp.toFixed(3),
        exportData: exp.toFixed(3),
        netGeneration: gen.toFixed(3),
        revenue: rev.toFixed(2)
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
    return mm + "/" + dd + "/" + yyyy;
}

function getAffectedTimeInHrs(StartDateTime, EndTIme) {
    console.log(StartDateTime, "StartDateTime");
    console.log(EndTIme, "EndTIme")
    const startDate = new Date(StartDateTime);
    const endDate = new Date(getDate(startDate) + " " + EndTIme);

    let seconds = Math.floor((endDate - (startDate)) / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);

    hours = hours - (days * 24);
    minutes = minutes - (days * 24 * 60) - (hours * 60);
    seconds = seconds - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60);

    // console.log(hours + (minutes / 60));
    //return hours + ":" + minutes + ":" + seconds;
    return parseFloat(hours + (minutes / 60));

}

function getPLFAC(netGen, CC) {
    const plf = netGen / (parseInt(CC) * 24 * 1) * 100;
    return plf.toFixed(2) + "%";
}

function getPLFACMON(netGen, CC, ndays) {
    // if (searchValue == null) {
    //     searchValue = "ACCapacity"
    // }
    const plf = netGen / (parseInt(CC) * 24 * parseInt(ndays)) * 100;
    return plf.toFixed(2) + "%";
    // if (searchValue == "ACCapacity"){
    // } else if (searchValue == "ACCapacity"){
    //     const plf = netGen / (parseInt(CC) * 24 * parseInt(ndays)) * 100;
    //     return plf.toFixed(2) + "%"; 
    // }
}

function getDateTime(date, startTime) {
    //const data = startTime.replace("T"," ").substring(0,19);
    return date + " " + startTime;
}

function getTimeFromStartTime(date, endTime) {
    //const data = startTime.split("T");
    return date + " " + endTime;
}
function getPR(hr, netGen, CC, tiltIWH) {
    let pr = 0;
    if (hr != 0 || tiltIWH != 0) {
        pr = ((netGen * 1000) / (CC * tiltIWH * hr)) * 100;
    }
    if(isNaN(pr)){
        
        return 0
    }
    return pr.toFixed(2) + "%";
}

function getPRDaily(hr, netGen, CC, tiltIWH, plfType) {
  
    let pr = 0;
    if (hr != 0 && tiltIWH != 0) {
        pr = (((netGen * 1000) / (CC * tiltIWH * hr)) * 100);
    }
    if(isNaN(pr)){
        
        return 0
    }
    console.log(pr,'pr')
  
    return pr.toFixed(2) + "%";
    
}
function getrevenue(netGen, tariff, currencyType, currency) {
    let rev = 0;
    let usdRate = parseFloat(currency[0].currencyValue.toFixed(2));
    // if (currencyType == "INR" || currencyType == null){
    //     return rev.toFixed(4);
    // } else {
    //     rev = rev / usdRate;
    //     return rev.toFixed(4);
    // }
    if (currencyType == "INR" || currencyType == null) {
        rev = (netGen * tariff) / 1000000;
    } else {
        rev = (netGen * tariff) / 1000000;
        rev = rev / usdRate;
    }
    return rev.toFixed(4);
}

function getRevMont(tariff, importData, actualGen, currencyType, currency) {
    let rev = 0;
    let usdRate = parseFloat(currency[0].currencyValue.toFixed(2));
    if (tariff !== "" && importData !== "" && actualGen !== "") {
        rev = ((actualGen - importData) * tariff) / 1000000;
    } else if (tariff !== "" && importData === "") {
        rev = (actualGen * tariff) / 1000000;
    } else if (tariff !== "" && actualGen === "") {
        rev = (importData * tariff) / 1000000;
    }
    // if (currencyType ==== "INR") {
    //     rev = (netGen * tariff) / 1000000;
    // } else {
    //     rev = (netGen * tariff) / 1000000;
    //     rev = rev / usdRate;
    // }
    if (currencyType == "INR" || currencyType == null) {
        return rev.toFixed(4);
    } else {
        rev = rev / usdRate;
        return rev.toFixed(4);
    }


}
function getNetGen(actualGen, impDt) {
    let netGen = null;
    if (actualGen != null && impDt != null) {
        netGen = actualGen - impDt;
    } if (actualGen == null) {
        netGen = impDt;
    } if (impDt == null) {
        netGen = actualGen;

    }
    return netGen;
}

function getSource(autoGenerated) {
    let source = null;
    if (autoGenerated == '' || autoGenerated == 0) {
        source = "Actual"
    } else {
        source = "Provisional"
    }

    return source;
}

function getNetGeneration(_date, _plantName, netGen) {
    if (netGen !== "") {
        const filter = netGen.filter((items) => items.date === _date && items.plantName === _plantName)[0];
        return filter ? filter.netGeneration : 0;
    } else {
        return 0;
    }
}

function getExp(_date, _plantName, netGen) {
    if (netGen !== "") {
        const filter = netGen.filter((items) => items.date === _date && items.plantName === _plantName)[0];
        return filter ? filter.export : 0;
    } else {
        return 0;
    }
}

function getTiltIrrad(_date, _plantName, netGen) {
    if (netGen !== "") {
        const filter = netGen.filter((items) => items.date === _date && items.plantName === _plantName)[0];
        return filter ? filter.tiltIrradiationWh : 0;
    } else {
        return 0;
    }
}

function getStartTime(_date, _plantName, netGen) {
    if (netGen !== "") {
        const filter = netGen.filter((items) => items.date === _date && items.plantName === _plantName)[0];
        return filter ? filter.startTime : "00:00:00";
    } else {
        return "00:00:00";
    }
}

function getEndTime(_date, _plantName, netGen) {
    if (netGen !== "") {
        const filter = netGen.filter((items) => items.date === _date && items.plantName === _plantName)[0];
        return filter ? filter.endTime : "00:00:00";
    } else {
        return "00:00:00";
    }
}

function getDailyGen(data, currency, state, input) {
    let gridData = data && data.length > 0 ? data.map((item, index) => {
        const startTime = getDateTime(item.date, item.startTime);
        const stopTime = getTimeFromStartTime(item.date, item.endTime);
        const hr = getAffectedTimeInHrs(startTime, item.endTime);
        const prDailyValue = input.plfType === 'AC Capacity' ? getPRDaily(hr, item.netGeneration, item.plantCapacityAc, item.tiltIrradiationWh, state.plantDailyGenSearch.plfType) : getPRDaily(hr, item.netGeneration, item.plantCapacityDc, item.tiltIrradiationWh, state.plantDailyGenSearch.plfType);
        const revDailyValue = getrevenue(item.netGeneration, item.tariff, state.plantDailyGenSearch.ruppee, currency);
        return {
            ...item,
            plfAC: input.plfType === 'AC Capacity' ? getPLFAC(item.netGeneration, item.plantCapacityAc) : getPLFAC(item.netGeneration, item.plantCapacityDc),
            pr: prDailyValue,
            revenue: revDailyValue
        }
    }) : [];
    // console.log(PlantGenerationAdd)

    return gridData;
}

function getDailyGenMonthly(data, netGeneration, currency, state, input) {
    const gridData = data && data.length > 0 ? data.map((item, index) => {
        let total_time_difference = 0;
        let totalIrradTilt = 0;
        let total_time_difference1 = netGeneration && netGeneration.length > 0 ? netGeneration.map((item1, index1) => {
            // const startTme = getStartTime(item.date, item.plantName, netGeneration);
            // const endTime = getEndTime(item.date, item.plantName, netGeneration);
            // const startTime = getDateTime(item.date, startTme);
            // const hr = getAffectedTimeInHrs(startTime, endTime)/netGeneration.length;
            if (item1.startTime && item1.startTime) {
                let start_time = item1.startTime;
                let end_time = item1.endTime;
                console.log(start_time, "Satsrat");
                let arr = start_time.split(':');
                var startHour = parseInt(arr[0]);
                var startMin = parseInt(arr[1]);
                var startSec = parseInt(arr[2]);
                let arr2 = end_time.split(':');
                var endHour = parseInt(arr2[0]);
                var endMin = parseInt(arr2[1]);
                var endSec = parseInt(arr2[2]);

            }
            let hourDifference = endHour - startHour;
            let secondDifference = (endSec - startSec) / 60;
            let actualDifference = hourDifference + secondDifference;
            actualDifference = actualDifference.toFixed(2);
            // let startTime1 = start_time.split(":");
            // let endTime1 = end_time.split(":");


            total_time_difference = parseFloat(total_time_difference) + parseFloat(actualDifference);
            totalIrradTilt = parseFloat(totalIrradTilt) + parseFloat(item1.tiltIrradiationWh);
        }) : total_time_difference = 0;

        total_time_difference = total_time_difference / netGeneration.length;
        const netGenValue = getNetGen(parseFloat(item.actualGeneration), parseFloat(item.importData));
        const netGen = getNetGeneration(item.date, item.plantName, netGeneration);
        const exp = getExp(item.date, item.plantName, netGeneration);
        const tiltIrrad = getTiltIrrad(item.date, item.plantName, netGeneration);
        const plfValue = input.plfType === 'AC Capacity' ? getPLFACMON(netGenValue, item.plantCapacityAc, item.ndays) : getPLFACMON(netGenValue, item.plantCapacityDc, item.ndays);
        const prValue = input.plfType === 'AC Capacity' ? getPR(total_time_difference, netGenValue, item.plantCapacityAc, totalIrradTilt) : getPR(total_time_difference, netGenValue, item.plantCapacityDc, totalIrradTilt);
        const rev = getRevMont(parseFloat(item.tariff), parseFloat(item.importData), parseFloat(item.actualGeneration), state.plantDailyGenSearch.ruppee, currency);
        return {
            ...item,
            export: exp,
            plfAC: plfValue,//getPLFACMON(netGenValue, item.connectedCapacity, item.ndays),
            pr: prValue,//getPR(hr, netGen, item.connectedCapacity, tiltIrrad, item.plfType),
            revenue: rev,//getRevMont(parseFloat(item.tariff), parseFloat(item.importData), parseFloat(item.actualGeneration), item.currencyType),
            netGeneration: netGenValue,//getNetGen(item.actualGeneration, item.importData),
            source: getSource(item.autoGenerated)
        }
    }) : [];
    return gridData;
}

function getNetGenMFM(exp, imp) {
    const netGene = parseFloat(exp) - parseFloat(imp);
    return netGene.toFixed(4);
}

function getPLF(CC, NG) {
    let plf = parseFloat(NG) / (parseFloat(CC) * 24);
    plf = plf * 100;
    return plf.toFixed(2) + "%";
}

function getPRMFMDaily(_date, _plantName, CC, netGene, weather) {
    const filter = weather.filter((items) => items.date === _date && items.plantName === _plantName)[0];
    if (filter) {
        const startTime = getDateTime(filter.date, filter.startTime);
        const hr = getAffectedTimeInHrs(startTime, filter.endTime);
        let arrayTilt = (filter.tiltIrradiationWh * hr) / 1000;
        arrayTilt = arrayTilt.toFixed(2);
        const value = (netGene / CC / arrayTilt) * 100;
        return value.toFixed(2) + "%";
    } else {
        return 0;
    }
}

function getMFMDaily(data, weather, state) {
    let gridData = data && data.length > 0 ? data.map((item, index) => {
        const netGenMFMDaily = getNetGenMFM(item.eTotalExport, item.eTotalImport);
        return {
            ...item,
            netGeneration: netGenMFMDaily,
            eTotalExport: item.eTotalExport.toFixed(4),
            eTotalImport: item.eTotalImport.toFixed(4),
            plf: getPLF(item.plantCapacityDc, netGenMFMDaily),
            pr: getPRMFMDaily(item.mfmDate, item.plantName, item.plantCapacityDc, netGenMFMDaily, weather)
        }
    }) : [];
    return gridData;
}

function getMFMReading(data, state) {
    let gridData = data && data.length > 0 ? data.map((item, index) => {
        const netGenMFMDaily = getNetGenMFM(item.eTotalExport, item.eTotalImport);
        return {
            ...item,
            netGeneration: netGenMFMDaily,
            eTotalExport: item.eTotalExport.toFixed(4),
            eTotalImport: item.eTotalImport.toFixed(4),
        }
    }) : [];
    return gridData;
}

function getNetGenAMR(exp, imp) {
    const netGene = parseFloat(exp) - parseFloat(imp);
    return netGene.toFixed(4);
}

function getPLFACAMR(netGen, CC) {
    let tlt = parseInt(CC) * 24;
    let plf = 0;
    if (tlt === 0) {
        plf = 0
    } else {
        plf = netGen / tlt;
    }
    return (plf * 100).toFixed(2) + "%";
}

function getRevenueAMR(netGen, tariff) {
    const rev = netGen * parseFloat(tariff);
    return (rev / 1000000).toFixed(6);
}
// function getAMRDailyGen(data) {
//     for (var i = 0; i <= data.length - 1; i++) {

//         let _current = data[i];
//         let _Next = data[i + 1];

//         if (i === data.length - 1 || _current.meterNumber !== _Next.meterNumber) {
//             let nextDate = data[i].amrDate;
//         }
//         else if (_current.meterNumber === _Next.meterNumber) {
//             const diffMeterNo = data.filter((flt)=> flt.meterNumber !== _Next.meterNumber);
//             data[i].importReading = ((parseFloat(_Next.importReading) - parseFloat(_current.importReading)) * parseFloat(_current.multiplyingFactor)).toFixed(2);
//             data[i].exportReading = ((parseFloat(_Next.exportReading) - parseFloat(_current.exportReading)) * parseFloat(_current.multiplyingFactor)).toFixed(2);

//         }
//         else {

//         }
//     }

//     return data;
// }
function getAMRDaily(data, weather, state) {
    let gridData = data && data.length > 0 ? data.map((item, index) => {
        const netGen = getNetGenAMR(item.exportReading, item.importReading);
        return {
            ...item,
            netGeneration: netGen,
            plfAC: getPLFACAMR(netGen, item.plantCapacityDc),
            pr: getPRMFMDaily(item.amrDate, item.plantName, item.plantCapacityDc, netGen, weather),
            revenue: getRevenueAMR(netGen, item.tariff)
        }
    }) : [];
    return gridData;
}

function getAMRMeter(data, weather, state) {
    let gridData = data && data.length > 0 ? data.map((item, index) => {
        const netGen = getNetGenAMR(item.exportReading, item.importReading);
        return {
            ...item,
            netGeneration: netGen,
            exportReading: item.exportReading,
            importReading: item.importReading,
            plfAC: getPLFACAMR(netGen, item.plantCapacityDc),
            pr: getPRMFMDaily(item.amrDate, item.plantName, item.plantCapacityDc, netGen, weather),
            revenue: getRevenueAMR(netGen, item.tariff)
        }
    }) : [];
    return gridData;
}

