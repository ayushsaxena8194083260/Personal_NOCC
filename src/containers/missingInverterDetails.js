import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getPlantByProjectId } from "../actions/PlantFaultDataActions";
import { getInverterDailyDetails } from "../actions/missingInverterActions";
import { getInverterByPlantId } from "../actions/InverterDailyActions";
import  MissingInverterDetails from "../components/missingInverter/missingInverterDetails";
import {deleteInverterDailyData} from "../actions/InverterDailyActions";
import {clearMissingInverterData} from "../actions/missingInverterActions";
import { getPlantByType} from "../actions/moduleCleaningAnalysisActions";


const mapStateToProps = state => {
    return {
        state:state,
        projectTypes: state.projectTypes.projectTypes,
        plantTypes: state.projectTypes.plantTypes,
        missingInverter: state.missingInverterReducer.missingInverter,
        inverterName: state.inverterDailyReducer.inverterName,
        displayMessage: state.inverterDailyReducer.displayMessage,
        plantType: [{displayText: "Select Plant Type" , value: "-1"}, {displayText: "GROUNDMOUNT" , value: "GROUNDMOUNT"},{displayText: "ROOFTOP" , value: "ROOFTOP"}]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPlantByType: (plantsByType) => dispatch(getPlantByType(plantsByType)),
        getPlantByProjectId: (projectId) => dispatch(getPlantByProjectId(projectId)),
        getInverterDailyDetails: (plantId) => dispatch(getInverterDailyDetails(plantId)),
        getInverterByPlantId: (plantId) => dispatch(getInverterByPlantId(plantId)),
        deleteInverterDailyData: (id) => dispatch(deleteInverterDailyData(id)),
        clearMissingInverterData:() =>dispatch(clearMissingInverterData())
    }
}

const missingInverterDetailsContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(MissingInverterDetails));
export default missingInverterDetailsContainer;