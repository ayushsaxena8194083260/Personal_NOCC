import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getProjectNames } from "../actions/PlantFaultDataActions";
import { getPlantByProjectId } from "../actions/PlantFaultDataActions";
import { getModuleCleaningDataByDate } from "../actions/moduleCleaningAnalysisActions";
import ModuleCleaning from "../components/ModuleCleaning/moduleCleaning";
import {deleteModuleCleaning} from "../actions/moduleCleaningAnalysisActions";
import {clearModuleCleaningData} from "../actions/moduleCleaningAnalysisActions";


const mapStateToProps = state => {
    return {
        projectTypes: state.projectTypes.projectTypes,
        plantTypes: state.projectTypes.plantTypes,
        moduleCleaning: state.moduleCleaningReducer.moduleCleaning,
        displayMessage: state.moduleCleaningReducer.displayMessage,
        plantType: [{displayText: "Select Plant Type" , value: "-1"}, {displayText: "GROUNDMOUNT" , value: "GROUNDMOUNT"},{displayText: "ROOFTOP" , value: "ROOFTOP"}]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProjectNames: (projectTypes) => dispatch(getProjectNames(projectTypes)),
        getPlantByProjectId: (projectId) => dispatch(getPlantByProjectId(projectId)),
        getModuleCleaningDataByDate: (plantId) => dispatch(getModuleCleaningDataByDate(plantId)),
        deleteModuleCleaning: (id) => dispatch(deleteModuleCleaning(id)),
        clearModuleCleaningData:() =>dispatch(clearModuleCleaningData())
    }
}

const ModuleCleaningAnalysisContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(ModuleCleaningAnalysis));
export default ModuleCleaningAnalysisContainer;
