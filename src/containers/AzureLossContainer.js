import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getProjectNames } from "../actions/AzureLossAction";
import { getPlantByProjectId } from "../actions/PlantFaultDataActions";
import { getAzureLossByPlantId } from "../actions/AzureLossAction";
import { deleteAzureLoss } from "../actions/AzureLossAction";
import AzureLoss from "../../src/components/azureLoss/azureLoss";
import {clearAzureLoss} from "../actions/AzureLossAction";
import {getPlantAvailabilityByPlantId} from "../actions/action-PlantAvailability"
import { getPlantByType} from "../actions/moduleCleaningAnalysisActions";

function getYearFromToday() {
    let years = [];
    const todayDate = new Date();
    const strYear = todayDate.getFullYear();
    {
        if (strYear) {
            let year = parseInt(strYear) - 5;
            const endYear = parseInt(strYear) + 2;
            let i;
            years.push("Select Year");
            for (i = parseInt(year); i <= endYear; i++) {
                let addoneYear = parseInt(i) + 1;
                years.push(i + "-" + addoneYear);
            }

        }
    }
    return years;
}

const mapStateToProps = state => {
    return {
        projectTypes: state.projectTypes.projectTypes,
        plantTypes: state.projectTypes.plantTypes,
        plantLoss: state.azureLossReducer.plantLoss,
        plants: state.moduleCleaningReducer.plantTypes,
        years: getYearFromToday(),
        displayMessage: state.azureLossReducer.displayMessage,
        plantType: [{displayText: "Select Plant Type" , value: "-1"}, {displayText: "GROUNDMOUNT" , value: "GROUNDMOUNT"},{displayText: "ROOFTOP" , value: "ROOFTOP"}]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProjectNames: (projectTypes) => dispatch(getProjectNames(projectTypes)),
        getPlantByProjectId: (projectId) => dispatch(getPlantByProjectId(projectId)),
        getAzureLossByPlantId: (plantId) => dispatch(getAzureLossByPlantId(plantId)),
        deleteAzureLoss: (fault_id) => dispatch(deleteAzureLoss(fault_id)),
        clearAzureLoss:() =>dispatch(clearAzureLoss()),
        getPlantAvailabilityByPlantId: (plantId) => dispatch(getPlantAvailabilityByPlantId(plantId)),
        getPlantByType: (plantsByType) => dispatch(getPlantByType(plantsByType)),
    }
}

const AzureLossContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(AzureLoss));
export default AzureLossContainer;