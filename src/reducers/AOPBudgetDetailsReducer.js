import {
    GET_ALL_AOP_BUDGET_DETAILS,
    POST_AOP_BUDGET_DETAILS,
    GET_ALL_BUDGET_DETAILS
    
} from '../actions/types'
import { arrowFunctionExpression } from '@babel/types';

const INITIAL_STATE = {
}

export default (state = INITIAL_STATE, action) => { 
    switch (action.type) {

        case GET_ALL_AOP_BUDGET_DETAILS:
            return {
                ...state,
                AOPBudgetDetails: getData(action.AOPBudgetDetails,action.plants,state,action.inputData),
                
                // .map((plant1)=> {
                //     plant1['plant_type']=action.plant_type;
                //     plant1['plant_name']=action.plant_name;
                // })
            }
        case GET_ALL_BUDGET_DETAILS:
            return {
                ...state,
                budgetDetails: getDataBudget(action.budgetDetails,action.plants,state,action.inputData),
                
                // .map((plant1)=> {
                //     plant1['plant_type']=action.plant_type;
                //     plant1['plant_name']=action.plant_name;
                // })
            }         
        case POST_AOP_BUDGET_DETAILS:
            return {
                ...state,
                aopBudgetDetail: action.aopBudgetDetail
            }

        default:
            return state;
    }
}

function daysInMonth(month, year) { 
    return new Date(year, month, 0).getDate(); 
}

function getPlantType(plantId, plants) {
    const _plantType = plants.filter((item) => item.plantId === plantId)[0];
    return _plantType ? _plantType.plantName : "";
}

function getPlantTypeType(plantId, plants) {
    const _plantType = plants.filter((item) => item.plantId === plantId)[0];
    return _plantType ? _plantType.type : "";
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

function ppaplf(dcCapacity,days,gen){
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
    if (derateValue == null || derateValue =='' || derateValue == "" || derateValue == undefined || derateValue == NaN){
        return "0.00%"
    } else {
        let _derate = derateValue*100;
        return _derate.toFixed(2)+"%";    
    }
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
    console.log(yr,'month');

    let monthNames = [
        'Jan', 'Feb', 'Mar','Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
 let index1 = monthNames[mnth]
//  console.log(yr,'index')
//  let value = monthNames[mnth-1]+"'"+yr;
//  let arr = [];
//  let val = arr.push(value)
//  let value1 = val.sort();
//  console.log(arr,'value1')
    return monthNames[mnth-1]+"'"+yr.toString().substring(2,4);
}

function getInso(value){
    if (value == null || value =='' || value == "" || value == undefined || value == NaN){
        return "0.00%"
    } else {
        return value
    }
}

function getInvClip(value){
    if (value == null || value =='' || value == "" || value == undefined || value == NaN){
        return "0.00%"
    } else {
        return value
    }
}
function getData(data, plants,state,inputData) { 
    let plantIds = [];
    let plantNames = [];
    var year = inputData.year.split('-');
    const filterValue = data.filter(item1 => item1.type == 'Budget');
    
    const filterValue1 = filterValue.filter(item2 => (item2.year === parseInt(year[0]) && item2.month >= 4 && item2.month <=12) || (parseInt(year[1]) === item2.year && item2.month >= 1 && item2.month <=3))
    filterValue1.sort((a,b) => (a.year > b.year && a.month < b.month)?-1:1);
    const gridData = filterValue1 && filterValue1.length > 0 ? filterValue1.map((item, index) => {
        const name = getPlantType(item.plantId, plants);
        const plantType = getPlantTypeType(item.plantId, plants);
        const days = daysInMonth(item.month,item.year);
        const dcPlf = dcplf(item.dcCapacity,days,item.generation);
        const acPlf = acplf(item.acCapacity,days,item.generation);
        const ppaPlf = ppaplf(item.acCapacity,days,item.generation);
        const inso = getInso(item.insolationOnTilt);
        const dertate = derateVal(item.derate);
        const invClip = getInvClip(item.invClipping);
        return {
            ...item,
            plant_name: name,
            plant_type : plantType,
            monthYearFormat:monthNames(item.month,item.year),
            no_of_days:days,
            dcCapacity:item.dcCapacity,
            acCapacity:item.acCapacity,
            plant_capacity_ac:item.acCapacity,
            insolationOnTilt:inso,
            insolation_avg:insolationAvg(item.insolationOnTilt,days),
            generation:item.generation,
            dc_plf:dcPlf,
            ac_plf:acPlf,
            ppa_plf:ppaPlf,
            derate:dertate,
            derate_generation:derateGen(item.generation,dertate),
            derate_dc:derateDC(dcPlf,dertate),
            derate_ac:derateAC(acPlf,dertate),
            derate_ppa:deratePPA(ppaPlf,dertate),
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
            invClipping:invClip,
            acOhmic:(item.acOhmic*100).toFixed(2)+"%",
            transformer:(item.transformer*100).toFixed(2)+"%",
            transmission:(item.transmission*100).toFixed(2)+"%",
            auxiliary:(item.auxiliary*100).toFixed(2)+"%",
            shading:(item.shading*100).toFixed(2)+"%",
        }
    }) : [];
    return gridData;
}

function jmrGen(jmrGenValue){
    let _jmrGenValue = null;
    if (jmrGenValue === null){
        _jmrGenValue = "0.00";
    } else {
        _jmrGenValue = jmrGenValue;
    }
    return _jmrGenValue;
}
function Gen(GenValue){
    let _GenValue = null;
    if (GenValue === null){
        _GenValue = "0.00";
    } else {
        _GenValue = GenValue;
    }
    return _GenValue;
}
function techLoss(techLossValue){
    let _techLossValue = null;
    if (techLossValue === null){
        _techLossValue = "0.00%";
        return _techLossValue;
    } else {
        _techLossValue = techLossValue*100;
        return _techLossValue.toFixed(2)+"%";
    }

}
function gridOutLoss(gridLoss){
    let _gridOutLoss = null;
    if (gridLoss === null){
        _gridOutLoss = "0.00%";
        return _gridOutLoss;
    } else {
        _gridOutLoss = gridLoss*100;
        return _gridOutLoss.toFixed(2)+"%";
    }

}
function temp(tempValue){
    let _tempValue = null;
    if (tempValue === null){
        _tempValue = "0.00%";
        return _tempValue;
    } else {
        _tempValue = tempValue*100;
        return _tempValue.toFixed(2)+"%";
    }


}
function improvedPPA(impPPA){
    let _impPPA = null;
    if (impPPA === null){
        _impPPA = "0.00%";
        return _impPPA;
    } else {
        _impPPA = impPPA*100;
        return _impPPA.toFixed(2)+"%";
    }


}
function bdcPLF(bdcplf){
    let _bdcplf = null;
    if (bdcplf === null){
        _bdcplf = "0.00%";
        return _bdcplf;
    } else {
        _bdcplf = bdcplf*100;
        return _bdcplf.toFixed(2)+"%";
    }


}

function getDataBudget(data, plants,state,inputData) { 
    let plantIds = [];
    let plantNames = [];
    var year = inputData.year.split('-');
    const filterValue = data.filter(item1 => item1.type == 'Budget');
    const filterValue1 = data;
    // const filterValue1 = filterValue.filter(item2 => (item2.year === parseInt(year[0]) && item2.month >= 4 && item2.month <=12) || 
    // (parseInt(year[1]) === item2.year && item2.month >= 1 && item2.month <=3))
    // filterValue1.sort((a,b) => (a.year > b.year && a.month < b.month)?-1:1);
    const gridData = filterValue1 && filterValue1.length > 0 ? filterValue1.map((item, index) => {
        const name = getPlantType(item.plantId, plants);
        const plantType = getPlantTypeType(item.plantId, plants);
        const days = daysInMonth(item.month,item.year);
        const techLoss1 = techLoss(item.technicalLoss);
        const gridOutLoss1 = gridOutLoss(item.gridOutageLoss);
        const temperature1 = temp(item.temperature);
        const generation1 = Gen(item.generation);
        const jmr_generation1 = jmrGen(item.generationJmr);
        const improvedPpa1 = improvedPPA(item.improvedPpa);
        const bDcPlf1 = bdcPLF(item.bDcPlf);
        return {
            ...item,
            plant_name: name,
            plant_type: plantType,
            monthYearFormat:monthNames(item.month,item.year),
            no_of_days:days,
            jmr_days:days,
            technicalLoss1:techLoss1,
            gridOutageLoss1:gridOutLoss1,
            temperature1:temperature1,
            generation1:generation1,
            jmr_generation1:jmr_generation1,
            improvedPpa1:improvedPpa1,
            bDcPlf1:bDcPlf1
        }
    }) : [];
    return gridData;
}
