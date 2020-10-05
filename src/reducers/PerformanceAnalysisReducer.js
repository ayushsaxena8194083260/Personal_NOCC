import {
    GET_PERFORMANCE_DAILY,
    GET_PERFORMANCE_MONTHLY,

} from '../actions/types'
import { arrowFunctionExpression } from '@babel/types';

const INITIAL_STATE = {
    performanceAnalysisData: null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case GET_PERFORMANCE_DAILY:
            return {
                ...state,
                performanceAnalysisData: forPerformanceAnalysisDateMonth(action.performanceDaily)
            }
        case GET_PERFORMANCE_MONTHLY:
            return {
                ...state,
                performanceAnalysisData: forPerformanceAnalysisDateMonth(action.performanceMonthly)
            }
        default:
            return state;
    }
}

function forPerformanceAnalysisDateMonth(viewData) {
    let moduleSum = 0;
    let budgetSum = 0;
    let modgenSum = 0;
    let modrevSum = 0;
    let actual_insolation = viewData.insolation ? parseFloat(viewData.insolation) : 0;
    let actual_downtime_loss = viewData.downtimeLosses ? parseFloat(viewData.downtimeLosses) : 0;
    let actual_grid_outage_loss = viewData.gridOutageLosses ? parseFloat(viewData.gridOutageLosses) : 0;
    let actual_soiling_loss = viewData.soilingLosses ? parseFloat(viewData.soilingLosses) : 0;

    let actual_tilt_loss = viewData.tiltLosses ? parseFloat(viewData.tiltLosses) : 0;
    let actual_commissioning_loss = viewData.commissioningLosses ? parseFloat(viewData.commissioningLosses) : 0;
    let actual_temperature_loss = viewData.tempLosses ? parseFloat(viewData.tempLosses / 100) : 0;
    let actual_inveter_clipping_loss = viewData.inverterClippingLoss ? parseFloat(viewData.inverterClippingLoss) : 0;

    let actual_dc_cable_loss = viewData.dcLosses ? parseFloat(viewData.dcLosses) : 0;
    let actual_ac_cable_loss = viewData.acCablelosses ? parseFloat(viewData.acCablelosses) : 0;
    let actual_module_quality_loss = viewData.moduleQuality ? (parseFloat(viewData.moduleQuality) / 100) : 0;
    let actual_array_missmatch_loss = viewData.moduleMismatchLosses ? (parseFloat(viewData.moduleMismatchLosses) / 100) : 0;
    let actual_auxilury_loss = viewData.auxilaryLosses ? parseFloat(viewData.auxilaryLosses) : 0;
    let actual_inverter_efficiency_loss = viewData.inverterEfficiencyLosses ? parseFloat(viewData.inverterEfficiencyLosses) : 0;
    let actual_linear_derate_loss = viewData.derate ? (parseFloat(viewData.derate) / 100) : 0;
    let actual_shading_loss = viewData.shadingLosses ? (parseFloat(viewData.shadingLosses) / 100) : 0;


    let actual_transmission_loss = viewData.transmission_losses ? parseFloat(viewData.transmission_losses) : 0;
    let actual_pv_loss_due_to_irr = viewData.pvLosses ? (parseFloat(viewData.pvLosses) / 100) : 0;
    let actual_i_am_loss = viewData.iamLosses ? (parseFloat(viewData.iamLosses) / 100) : 0;

    let budget_generation = viewData.budgetGeneration ? parseFloat(viewData.budgetGeneration) : 0;
    let budget_insolation = viewData.budgetInsolationLoss ? parseFloat(viewData.budgetInsolationLoss) : 0;
    let budget_downtime_loss = viewData.budgetDowntimeLoss ? parseFloat(viewData.budgetDowntimeLoss) : 0;
    let budget_grid_outage_loss = viewData.budgetGridFailureLoss ? parseFloat(viewData.budgetGridFailureLoss) : 0;
    let budget_soiling_loss = viewData.budgetSoilingLoss ? (parseFloat(viewData.budgetSoilingLoss) / 100) : 0;

    let budget_tilt_loss = 0;
    let budget_commissioning_loss = 0;

    let budget_temperature_loss = viewData.budgetTemperatureLoss ? (parseFloat(viewData.budgetTemperatureLoss) / 100) : 0;
    let budget_inveter_clipping_loss = viewData.budgetInveterClippingLoss ? (parseFloat(viewData.budgetInveterClippingLoss) / 100) : 0;

    let budget_dc_cable_loss = viewData.budgetDcCableLoss ? (parseFloat(viewData.budgetDcCableLoss) / 100) : 0;
    let budget_ac_cable_loss = viewData.budgetAcCableLoss ? (parseFloat(viewData.budgetAcCableLoss) / 100) : 0;
    let budget_module_quality_loss = actual_module_quality_loss;
    let budget_array_missmatch_loss = actual_array_missmatch_loss;
    let budget_auxilury_loss = viewData.budgetAuxiluryLoss ? (parseFloat(viewData.budgetAuxiluryLoss) / 100) : 0;


    let budget_inverter_efficiency_loss = viewData.budgetInverterEfficiencyLoss ? (parseFloat(viewData.budgetInverterEfficiencyLoss) / 100) : 0;
    let budget_linear_derate_loss = actual_linear_derate_loss;
    let budget_shading_loss = actual_shading_loss;
    let budget_transmission_loss = viewData.budgetTransmissionLoss ? (parseFloat(viewData.budgetTransmissionLoss) / 100) : 0;
    let budget_pv_loss_due_to_irr = actual_pv_loss_due_to_irr;

    let budget_i_am_loss = actual_i_am_loss;

    let module_insolation = actual_insolation;
    let module_downtime_loss = 0;
    let module_grid_outage_loss = 0;
    let module_soiling_loss = budget_soiling_loss;
    let module_tilt_loss = budget_tilt_loss;
    let module_commissioning_loss = budget_commissioning_loss;
    let module_temperature_loss = actual_temperature_loss;
    let module_inveter_clipping_loss = budget_inveter_clipping_loss;
    let module_dc_cable_loss = budget_dc_cable_loss;
    let module_ac_cable_loss = budget_ac_cable_loss;
    let module_module_quality_loss = actual_module_quality_loss;
    let module_array_missmatch_loss = actual_array_missmatch_loss;
    let module_auxilury_loss = budget_auxilury_loss;
    let module_inverter_efficiency_loss = budget_inverter_efficiency_loss;
    let module_linear_derate_loss = actual_linear_derate_loss;
    let module_shading_loss = actual_shading_loss;
    let module_transmission_loss = budget_transmission_loss;
    let module_pv_loss_due_to_irr = actual_pv_loss_due_to_irr;
    let module_i_am_loss = actual_i_am_loss;

    let connected_capacity = viewData.connectedCapacity ? parseFloat(viewData.connectedCapacity) : 0;
    let actual_generation = viewData.actualGeneration ? parseFloat(viewData.actualGeneration) : 0;
    let _import = viewData.import ? parseFloat(viewData.import) : 0;
    let netgeneration = actual_generation - _import;
    let model_generation = viewData.modelGeneration ? parseFloat(viewData.modelGeneration) : 0;
    let tariff = viewData.tariff ? viewData.tariff : 0;
    let module_pr = ((netgeneration - actual_commissioning_loss) / model_generation);
    let no_of_days = viewData.noOfDays ? parseInt(viewData.noOfDays) : 0;
    let total_losses = (actual_downtime_loss + actual_grid_outage_loss + actual_soiling_loss + actual_tilt_loss + actual_commissioning_loss + actual_dc_cable_loss + actual_ac_cable_loss + actual_inverter_efficiency_loss + actual_auxilury_loss + actual_transmission_loss + actual_inveter_clipping_loss);
    let v_module_plf = 0;
    let v_budget_plf = 0;
    let modelled_losses = 0;
    let v_again_model_plf = 0;
    let generation_module_plf = 0;
    if (connected_capacity == 0) {
        v_module_plf = 0;
        v_budget_plf = 0;
        modelled_losses = 0;
        v_again_model_plf = 0;
    } else {
        generation_module_plf = (actual_generation - _import);
        v_module_plf = (generation_module_plf) ? (generation_module_plf / (connected_capacity * 24 * no_of_days)) : 0;
        v_budget_plf = (budget_generation) ? (budget_generation / (connected_capacity * 24 * no_of_days)) : 0;
        modelled_losses = (connected_capacity * no_of_days * actual_insolation);
        v_again_model_plf = ((modelled_losses + (module_downtime_loss + module_grid_outage_loss + module_soiling_loss + module_tilt_loss + module_commissioning_loss + module_dc_cable_loss + module_ac_cable_loss + module_inverter_efficiency_loss + module_transmission_loss + module_auxilury_loss + module_inveter_clipping_loss)) / (connected_capacity * no_of_days * 24) * ((1 + module_i_am_loss) * (1 + module_pv_loss_due_to_irr) * (1 + module_linear_derate_loss) * (1 + module_temperature_loss) * (1 + module_module_quality_loss) * (1 + module_array_missmatch_loss) * (1 + module_shading_loss)));
    }
    let devCalc = (v_again_model_plf * connected_capacity * no_of_days * 24);
    let budCalc = (v_budget_plf * connected_capacity * no_of_days * 24);
    let devInsolation = ((actual_insolation - budget_insolation) / budget_insolation) * budget_generation;
    //let from_date = (date('m') <= 4) ?  (date('Y')-1).'-04-01' : (date('Y')).'-04-01';
    budgetSum += devInsolation;
    modgenSum += actual_downtime_loss - module_downtime_loss;
    moduleSum += modgenSum;
    modrevSum += ((actual_downtime_loss - module_downtime_loss) * tariff);
    let bdowntime = (actual_downtime_loss - budget_downtime_loss);
    budgetSum += bdowntime;
    modgenSum += (actual_grid_outage_loss - module_grid_outage_loss);

    let gfailure = ((actual_grid_outage_loss - module_grid_outage_loss) / devCalc);
    moduleSum += gfailure;
    modrevSum += (actual_grid_outage_loss - module_grid_outage_loss) * tariff;

    let bgfailure = (actual_grid_outage_loss - budget_grid_outage_loss);
    budgetSum += bgfailure;

    modgenSum += (actual_soiling_loss - budget_soiling_loss);


    let soil = ((actual_soiling_loss - budget_soiling_loss) / devCalc);
    moduleSum += soil;


    modrevSum += (actual_soiling_loss - budget_soiling_loss) * tariff;

    let bsoil = (actual_soiling_loss - budget_soiling_loss);
    budgetSum += bsoil;


    modgenSum += (actual_commissioning_loss - budget_commissioning_loss);
    let commission = ((actual_commissioning_loss - budget_commissioning_loss) / devCalc);

    moduleSum += commission;
    modrevSum += (actual_commissioning_loss - budget_commissioning_loss) * tariff;
    let bcommission = (actual_commissioning_loss - budget_commissioning_loss);
    budgetSum += bcommission;

    modgenSum += (actual_tilt_loss - module_tilt_loss);
    let tilt = ((actual_tilt_loss - module_tilt_loss) / devCalc);
    moduleSum += tilt;

    modrevSum += (actual_tilt_loss - module_tilt_loss) * tariff;

    let btilt = (actual_tilt_loss - budget_tilt_loss);
    budgetSum += btilt;


    modgenSum += (actual_dc_cable_loss - module_dc_cable_loss);

    let dc = ((actual_dc_cable_loss - module_dc_cable_loss) / devCalc);
    moduleSum += dc;

    modrevSum += (actual_dc_cable_loss - module_dc_cable_loss) * tariff;

    let bdc = (actual_dc_cable_loss - budget_dc_cable_loss);
    budgetSum += bdc;


    modgenSum += (actual_ac_cable_loss - module_ac_cable_loss);
    let ac = ((actual_ac_cable_loss - module_ac_cable_loss) / devCalc);
    moduleSum += ac;
    modrevSum += (actual_ac_cable_loss - module_ac_cable_loss) * tariff;
    let bac = (actual_ac_cable_loss - budget_ac_cable_loss);
    budgetSum += bac;

    modgenSum += (actual_inverter_efficiency_loss - module_inverter_efficiency_loss);
    let invEffzncy = ((actual_inverter_efficiency_loss - module_inverter_efficiency_loss) / devCalc);
    moduleSum += invEffzncy;
    modrevSum += (actual_inverter_efficiency_loss - module_inverter_efficiency_loss) * tariff;
    let binvEffzncy = (actual_inverter_efficiency_loss - budget_inverter_efficiency_loss);
    budgetSum += binvEffzncy;


    modgenSum += (actual_auxilury_loss - module_auxilury_loss);

    let aux = ((actual_auxilury_loss - module_auxilury_loss) / devCalc);
    moduleSum += aux;

    modrevSum += (actual_auxilury_loss - module_auxilury_loss) * tariff;

    let baux = (actual_auxilury_loss - budget_auxilury_loss);
    let x = baux;
    budgetSum += baux;


    modgenSum += (actual_transmission_loss - module_transmission_loss);
    let transmission = ((actual_transmission_loss - module_transmission_loss) / devCalc);
    moduleSum += transmission;
    modrevSum += (actual_transmission_loss - module_transmission_loss) * tariff;
    let btransmission = (actual_transmission_loss - budget_transmission_loss);
    budgetSum += btransmission;

    let devBplf = generation_module_plf - budget_generation - x;
    let devUFBudget = ((devBplf - budgetSum) / (budCalc)) - (actual_temperature_loss - budget_temperature_loss);

    let devMgenplf = ((v_module_plf - v_again_model_plf) * connected_capacity * no_of_days * 24) + x;
    let devMplf = (v_module_plf / v_again_model_plf) ? ((v_module_plf / v_again_model_plf) - 1) : 0;
    let devMgenRevplf = (devMgenplf * tariff);

    return {
        apiResponse: viewData,
        Tariff: tariff,
        devMgenplf: devMgenplf,
        devMplf: devMplf,
        devMgenRevplf: (devMgenplf * tariff),
        devBplf: (generation_module_plf - budget_generation),
        v_module_plf: (v_module_plf * 100).toFixed(2),
        v_again_model_plf: (v_again_model_plf * 100),
        v_budget_plf: (v_budget_plf * 100).toFixed(2),


        devInsolation: devInsolation,
        budgetSum: budgetSum,


        techLoss: (actual_downtime_loss - module_downtime_loss),
        techLoss1: ((actual_downtime_loss - module_downtime_loss) / devCalc),
        techLoss2: ((actual_downtime_loss - module_downtime_loss) * tariff),
        budgetSum: budgetSum,
        //downtime: downtime,

        gridOutageLoss: (actual_grid_outage_loss - module_grid_outage_loss),
        gfailure: gfailure,
        gridOutageLoss1: ((actual_grid_outage_loss - module_grid_outage_loss) * tariff),
        bgfailure: bgfailure,

        soilingLoss: (actual_soiling_loss - budget_soiling_loss),
        soil: soil,
        soilingLoss1: ((actual_soiling_loss - budget_soiling_loss) * tariff),
        bsoil: bsoil,

        tiltLoss: (actual_tilt_loss - module_tilt_loss),
        tilt: tilt,
        tilt1: ((actual_tilt_loss - module_tilt_loss) * tariff),
        btilt: btilt,

        commissioningLoss: (actual_commissioning_loss - budget_commissioning_loss),
        commission: commission,
        commissioningLoss1: ((actual_commissioning_loss - budget_commissioning_loss) * tariff),
        bcommission: bcommission,

        dcCableLoss: (actual_dc_cable_loss - module_dc_cable_loss),
        dc: ((actual_dc_cable_loss - module_dc_cable_loss) / devCalc),
        dc1: ((actual_dc_cable_loss - module_dc_cable_loss) * tariff),
        bdc: bdc,

        acCableLoss: (actual_ac_cable_loss - module_ac_cable_loss),
        ac: ac,
        ac1: ((actual_ac_cable_loss - module_ac_cable_loss) * tariff),
        bac: bac,


        efficiencyLoss: (actual_inverter_efficiency_loss - module_inverter_efficiency_loss),
        invEffzncy: invEffzncy,
        invEffzncy1: ((actual_inverter_efficiency_loss - module_inverter_efficiency_loss) * tariff),
        binvEffzncy: (actual_inverter_efficiency_loss - budget_inverter_efficiency_loss),

        auxiluryLoss: (actual_auxilury_loss - module_auxilury_loss),
        aux: ((actual_auxilury_loss - module_auxilury_loss) / devCalc),
        aux1: ((actual_auxilury_loss - module_auxilury_loss) * tariff),
        baux: (actual_auxilury_loss - budget_auxilury_loss),

        transmissionLoss: (actual_transmission_loss - module_transmission_loss),
        transmission: ((actual_transmission_loss - module_transmission_loss) / devCalc),
        transmission1: ((actual_transmission_loss - module_transmission_loss) * tariff),
        btransmission: btransmission,

        modgenSum: moduleSum,
        moduleSum1: (moduleSum * 100).toFixed(2),
        modrevSum: modrevSum,
        budgetSum: budgetSum,


        unforeseenLoss: (devMgenplf - modgenSum),
        unforeseenLoss1: ((devMplf - moduleSum) * 100).toFixed(2),
        unforeseenLoss2: (devMgenRevplf - modrevSum).toFixed(2),
        unforeseenLoss3: (devUFBudget * 100),

        module_pr: (module_pr * 100).toFixed(2)

    }


}
