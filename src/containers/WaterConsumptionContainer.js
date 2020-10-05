import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getProjectNames } from "../actions/PlantFaultDataActions";
import { getPlantByProjectId } from "../actions/PlantFaultDataActions";
import WaterConsumption from "../../src/components/WaterConsumption/waterConsumption";
import {clearWaterConsumptionData} from "../actions/action-WaterConsumption";
import {getModuleCleaningDataByDate} from "../actions/action-WaterConsumption"

const mapStateToProps = state => {
    return {
        projectTypes: state.projectTypes.projectTypes,
        plantTypes: state.projectTypes.plantTypes,
        waterConsumption: state.WaterConsumptionReducer.waterConsumption,
        displayMessage: state.WaterConsumptionReducer.displayMessage,
        plantType: [{displayText: "Select Plant Type" , value: "-1"}, {displayText: "GROUNDMOUNT" , value: "GROUNDMOUNT"},{displayText: "ROOFTOP" , value: "ROOFTOP"}]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProjectNames: (projectTypes) => dispatch(getProjectNames(projectTypes)),
        getPlantByProjectId: (projectId) => dispatch(getPlantByProjectId(projectId)),
        getModuleCleaningDataByDate: (plantId) => dispatch(getModuleCleaningDataByDate(plantId)),
        clearWaterConsumptionData:() =>dispatch(clearWaterConsumptionData()),
    }
}

const WaterConsumptionContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(WaterConsumption));
export default WaterConsumptionContainer;