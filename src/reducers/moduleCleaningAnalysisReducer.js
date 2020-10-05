import {
    GET_ADD_PLANT_TYPE,
    GET_MODULE_CLEANING_ANALYSIS,
    SEARCH_MODULE_CLEANING_ANALYSIS,  
    DELETE_MODULE_CLEANING_ANALYSIS,
    CLEAR_MODULE_CLEANING_ANALYSIS
} from '../actions/types'

const INITIAL_STATE = {
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        // case GET_ALL_PLANTSBY_PLANTID:
        // {
        //     return {
        //         ...state,
        //         moduleAnalysisCleaningPlantID: action.moduleAnalysisCleaningPlantID.map((plant) => {
        //             plant['plant_name']=action.plant_name;
        //             plant['plant_type']=action.plant_type;
        //         })
        //     }
        // }
        case GET_MODULE_CLEANING_ANALYSIS:
        {
            let newState = { ...state }
            newState.moduleCleaningAnalysis = getModuleCleaningAnalysisData(action.moduleCleaningAnalysis,action.moduleCleaningAnalysis.moduleCleaningAnalysisEntities,action.moduleCleaningAnalysis.weatherStationDetailsDO, state);
            newState.displayMessage = null;
            return newState
        }
        case SEARCH_MODULE_CLEANING_ANALYSIS:
        {
            return {
                ...state,
                moduleCleaningAnalysisData: action.moduleCleaningAnalysisData,
            }
        }
        case GET_ADD_PLANT_TYPE:
        {
            let newState = { ...state }
            newState.plantTypes = action.plantTypes;
            newState.displayMessage = null;
            return newState
        }
        case CLEAR_MODULE_CLEANING_ANALYSIS:
        {
            return {
                ...state,
                moduleCleaningAnalysisData: [],
                moduleCleaningAnalysis: [],
                plantTypes: [],
                selectedPlantOptions: null,
                displayMessage: null,
            }
        }
        case DELETE_MODULE_CLEANING_ANALYSIS: {
            return {
                ...state,
                displayMessage: action.displayMessage
            }
        }
        default:
            return state;
    }
}

function getPlantType(plant_id, state) {
    const _plantType = state.plantTypes.filter((item) => item.plant_id === plant_id)[0];
    return _plantType ? _plantType.plant_name : "";
}

function getRevenue(tariff,genLoss){
    const revLoss = parseFloat(tariff)*parseFloat(genLoss);
    return revLoss.toFixed(2);
}

function getclnAlert(ttlLoss,cbRate, percent){
    const clnRate = parseFloat(cbRate)*(parseInt(percent)/100);
    let info = "";
    if(-(ttlLoss) > clnRate )
    {
        info ="Please start Next Cycle";
    } 
    return info;
}

function getInsolution(dt, data1){
    const filter = data1 && data1.length > 0? data1.filter((items) => items.date === dt)[0]:[];
    // console.log("filter",filter)
    const inso = filter.tiltIrradiationWh;
    return inso;
}

function getModTemp(dt, data1){
    const filter =  data1 && data1.length > 0? data1.filter((items) => items.date === dt)[0]:[];
    const modTemp = filter.moduleTempWh;
    return modTemp;
}

function getModuleCleaningAnalysisData(MCAEntity, data, data1, state) {
    let totalLoss = 0.00;
    const MCAData = data && data.length > 0 ? data.map((item, index) => {
        const revLoss = getRevenue(MCAEntity.tariff,item.genLoss);
        totalLoss = totalLoss + parseFloat(revLoss);
        const cleaningAlrt = getclnAlert(totalLoss, MCAEntity.cbCleanRate, MCAEntity.percentage);
        const insolation = getInsolution(item.date,data1);
        const modTemperature = getModTemp(item.date,data1);
        return {
            ...item,
            sr_no: index + 1,
            insolation: insolation,
            moduleTempWh: modTemperature,
            revLoss: "INR "+revLoss,
            totalLoss: totalLoss.toFixed(2),
            cleaningAlert: cleaningAlrt
        }
    }) : [];
    return MCAData;
}