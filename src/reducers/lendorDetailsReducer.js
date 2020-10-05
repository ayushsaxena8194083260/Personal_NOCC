import {
    POST_LENDERDETAILS,
    DELETE_LENDERDETAILS,
    GET_ALL_LENDER_DETAILS,
    GET_ALL_LENDER_DETAILS_BY_YEARPLANTIDS,
    GET_ALL_LENDER_DETAILS_BY_YEARMONTHPLANTID
} from '../actions/types'
import { stat } from 'fs'

const INITIAL_STATE = {
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        
        
        case POST_LENDERDETAILS:
            return {
                ...state,
               lenderDetails: action.lenderDetails,
                //displayMessage: action.displayMessage
            }

        case GET_ALL_LENDER_DETAILS:
            return {
                ...state,
                allLenderDetails: action.allLenderDetails,
                //displayMessage: action.displayMessage
            }

        case DELETE_LENDERDETAILS: {
            return {
                ...state,
                allLenderDetailsByYearPlantIds : state.allLenderDetailsByYearPlantIds.filter(item => item.lenderDetailId !== action.lenderDetailId)
            }
        }
        
        case GET_ALL_LENDER_DETAILS_BY_YEARPLANTIDS: 
        {
            let newState = { ...state }
            const gridResult = getData(action.allLenderDetailsByYearPlantIds,action.plants,state,action.inputData); 
            newState.lenderData = gridResult;
            newState.displayMessage = null;
            return newState
            // return {
            //     ...state,
            //     allLenderDetailsByYearPlantIds: getData(action.allLenderDetailsByYearPlantIds,state)
            // }
        }

        case GET_ALL_LENDER_DETAILS_BY_YEARMONTHPLANTID: {
            return {
                ...state,
                lenderDetailsByYearPlantIdMonth: action.lenderDetailsByYearPlantIdMonth
            }
        }
        default:
            return state;
    }
}

// function getDate(cDate) {
//     const today = new Date(cDate);
//     let dd = today.getDate();
//     let mm = today.getMonth() + 1;

//     const yyyy = today.getFullYear();
//     if (dd < 10) {
//         dd = "0" + dd;
//     }
//     if (mm < 10) {
//         mm = "0" + mm;
//     }
//     return mm + "/" + dd + "/" + yyyy;
// }



// function getAffectedTimeInHrs(StartDateTime, EndTIme) {
//     const startDate = new Date(StartDateTime);
//     const endDate = new Date(getDate(startDate) + " " + EndTIme);

//     let seconds = Math.floor((endDate - (startDate)) / 1000);
//     let minutes = Math.floor(seconds / 60);
//     let hours = Math.floor(minutes / 60);
//     let days = Math.floor(hours / 24);

//     hours = hours - (days * 24);
//     minutes = minutes - (days * 24 * 60) - (hours * 60);
//     seconds = seconds - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60);

//     //return hours + ":" + minutes + ":" + seconds;
//     return hours + ":" + minutes;
// }

// function getPlantType(plant_id, state) {
//     const _plantType = state.plantTypes.filter((item) => item.plant_id === plant_id)[0];
//     return _plantType ? _plantType.plant_name : "";
// }

// function getTimeFromStartTime(startTime) {
//     const data = startTime.split(" ");
//     return data && data.length > 1 ? data[1] : data[0];
// }

// function getAffectedTimeInDecimal(diffTime) {
//     const data = diffTime.split(":");
//     const _mins = data && data.length > 1 && parseInt(data[1]) / 60;
//     const decval = parseInt(data[0]) + _mins;
//     return decval && decval.toFixed(2) ? decval.toFixed(2).toString() : "";
// }

// function getGenerationLossForThePeriod(timeInHours, state) {
//     const PlantAvailability = state.PlantAvailability && state.PlantAvailability.length >0 ? state.PlantAvailability[0] : null;
//     if (PlantAvailability) {
//         const available_capacity = PlantAvailability.available_capacity ? parseInt(PlantAvailability.available_capacity) / 100 : 1;
//         const design_loss = PlantAvailability.design_loss ? parseInt(PlantAvailability.design_loss) : 1;
//         const array_tilt = 1;
//         return (((array_tilt * timeInHours) / 1000) * available_capacity * design_loss)
//     }

//     return null;
// }
// function generation_lossForTheWholeDay(generation_lossForThePeriod,state){
//     const PlantAvailability = state.PlantAvailability && state.PlantAvailability.length >0 ? state.PlantAvailability[0] : null;
//    let net_generation = null;
//     if (PlantAvailability) {
//         net_generation = PlantAvailability.net_generation;
//     }
// return parseInt(generation_lossForThePeriod)+ parseInt(net_generation);
// }
// function getLenderDetailsGridData(data, state) {

//     const gridData = data && data.length > 0 ? data.map((item, index) => {
//         const hr = getAffectedTimeInHrs(item.time, item.stop_time);
//         const timeInHours = getAffectedTimeInDecimal(hr);
//         const generation_lossForThePeriod = getGenerationLossForThePeriod(timeInHours, state);
//         return {
//             ...item,
//             sr_no: index + 1,
//             plant_name: getPlantType(item.plant_id, state),
//             affected_timeInHrs: timeInHours,
//             time: getTimeFromStartTime(item.time),
//             affected_timeInDecimal: "22",
//             generation_lossForThePeriod: generation_lossForThePeriod,
//             generation_lossForTheWholeDay: generation_lossForTheWholeDay(generation_lossForThePeriod,state)
//         }
//     }) : [];
//     return gridData;
// }


function daysInMonth(month, year) { 
    return new Date(year, month, 0).getDate(); 
}

function getPlantType(plantId, plants) {
    const _plantType = plants.filter((item) => item.plantId === plantId)[0];
    return _plantType ? _plantType.plantName : "";
}

function insolationAvg(tilt,days){
    let _insoAvg = (tilt/days);
    return _insoAvg.toFixed(2);
}
function dcplf(days,dcCapacity,gen){
    let _dcplf = null;
    if (dcCapacity === 0){
        _dcplf = 0;
    } else {
        if ((days) && (dcCapacity)){
            _dcplf= gen/(days*dcCapacity*24);
        } else {
            _dcplf = 0;
        }
        _dcplf = _dcplf*100;
    }
    return _dcplf.toFixed(2)+"%";
}
function acplf(days,dcCapacity,gen){
    let _acplf = null;
    if (dcCapacity === 0){
        _acplf = 0;
    } else {
    if ((days) && (dcCapacity)){
        _acplf= gen/(days*dcCapacity*24);
    } else {
        _acplf = 0;
    }
    _acplf = _acplf*100;
}
    return _acplf.toFixed(2)+"%";
}

function ppaplf(days,dcCapacity,gen){
    let _acplf = null;
    if (dcCapacity === 0){
        _acplf = 0;
    } else {
    if ((days) && (dcCapacity)){
        _acplf= gen/(days*dcCapacity*24);
    } else {
        _acplf = 0;
    }
    _acplf = _acplf*100;
}
    return _acplf.toFixed(2)+"%";
}
function derateVal(derateValue){
    let _derate = derateValue*100;
    return _derate.toFixed(2)+"%";
}
function derateGen(gen,derateValues){
    let _gen = parseFloat(gen);
    let _derateValues = parseFloat(derateValues);
    let _a = (_derateValues/100)
    let _derateGen = (_gen*_a)+_gen;
    return _derateGen.toFixed(2);
}
function derateDC(dc,derateValues){
    let _dc = parseFloat(dc);
    let _derateValues = parseFloat(derateValues);
    let _derateDC = _dc+(_dc*(_derateValues)/100);
    if (dc === 0){
        _derateDC = 0;
    } else {
        _derateDC = _derateDC;
    }
    return _derateDC.toFixed(2)+"%";
}
function derateAC(ac,derateValues){
    let _ac = parseFloat(ac);
    let _derateValues = parseFloat(derateValues);
    let _derateAC = _ac+(_ac*(_derateValues)/100);
    if (ac === 0){
        _derateAC = 0;
    } else {
        _derateAC = _derateAC;
    }
    return _derateAC.toFixed(2)+"%";
}
function deratePPA(PPA,derateValues){
    let _PPA = parseFloat(PPA);
    let _derateValues = parseFloat(derateValues);
    let _deratePPA = (_PPA/100)+((_PPA/100)*(_derateValues/100));
    if (PPA === 0){
        _deratePPA = 0;
    } else {
        _deratePPA = _deratePPA*100;
    }
    return _deratePPA.toFixed(2)+"%";
}

function monthNames(mnth, yr){
    let monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    return monthNames[mnth-1]+"'"+yr.toString().substring(2,4);
}

function getData(data, plants,state,inputData) {
    var year = '';
    var filterValue = null;
    var filterValue1 = null;
    if(inputData!=undefined){ 
    year = inputData.year.split('-');
    filterValue = data.filter(item1 => item1.type == 'Lender');
    filterValue1 = filterValue.filter(item2 => (item2.year === parseInt(year[0]) && item2.month >= 4 && item2.month <=12) || (parseInt(year[1]) === item2.year && item2.month >= 1 && item2.month <=3))
    filterValue1.sort((a,b) => (a.year > b.year && a.month < b.month)?-1:1);
    }
    else{
        filterValue1 = data.filter(item1 => item1.type == 'Lender');

    }
    const gridData = filterValue1 && filterValue1.length > 0 ? filterValue1.map((item, index) => {
        //var year = inputData.year.split('-');
        const name = getPlantType(item.plantId, plants);
        const days = daysInMonth(item.month,item.year);
        const dcPlf = dcplf(item.dcCapacity,days,item.generation);
        const acPlf = acplf(item.acCapacity,days,item.generation);
        const ppaPlf = ppaplf(item.plant_capacity_ac,days,item.generation);
        return {
            ...item,
            plant_name: name,
            monthYearFormat:monthNames(item.month,item.year),
            no_of_days:days,
            dcCapacity:item.dcCapacity,
            acCapacity:item.acCapacity,
            plant_capacity_ac:item.acCapacity,
            insolationOnTilt:item.insolationOnTilt,
            insolation_avg:insolationAvg(item.insolationOnTilt,days),
            generation:item.generation,
            dc_plf:dcPlf,
            ac_plf:acPlf,
            ppa_plf:ppaPlf,
            derate:derateVal(item.derate),
            derate_generation:derateGen(item.generation,item.derate),
            derate_dc:derateDC(dcPlf,item.derate),
            derate_ac:derateAC(acPlf,item.derate),
            derate_ppa:deratePPA(ppaPlf,item.derate),
            temperature:(item.temperature*100).toFixed(2)+"%",
            gridOutageTime:(item.gridOutageTime*100).toFixed(2)+"%",
            plantDownTime:(item.plantDownTime*100).toFixed(2)+"%",
            iam:(item.iam*100).toFixed(2)+"%",
            pvIrradiance:(item.pvIrradiance*100).toFixed(2)+"%",
            soiling:(item.soiling*100).toFixed(2)+"%",
            arrayMissmatch:(item.arrayMissmatch*100).toFixed(2)+"%",
            moduleQuality:(item.moduleQuality*100).toFixed(2)+"%",
            ohmic:(item.acOhmic*100).toFixed(2)+"%",
            invEfficiency:(item.invEfficiency*100).toFixed(2)+"%",
            invClipping:(item.invClipping),
            acOhmic:(item.acOhmic*100).toFixed(2)+"%",
            transformer:(item.transformer*100).toFixed(2)+"%",
            transmission:(item.transmission*100).toFixed(2)+"%",
            auxiliary:(item.auxiliary*100).toFixed(2)+"%",
            shading:(item.shading*100).toFixed(2)+"%",
        }
    }) : [];
    return gridData;
}
