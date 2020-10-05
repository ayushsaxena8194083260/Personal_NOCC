import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getPlantByProjectId } from "../actions/PlantFaultDataActions";
import { getModuleCleaningDataByDate } from "../actions/moduleCleaningAnalysisActions";
import PerformanceAnalysis from "../components/PerformanceAnalysis/performanceAnalysis";
import {deleteModuleCleaning} from "../actions/moduleCleaningAnalysisActions";
import {clearModuleCleaningData} from "../actions/moduleCleaningAnalysisActions";


const mapStateToProps = state => {
    return {
        plantTypes: state.projectTypes.plantTypes,
//        moduleCleaning: state.moduleCleaningReducer.moduleCleaning,
//        displayMessage: state.moduleCleaningReducer.displayMessage,
        plantType: [{displayText: "Select Plant Type" , value: "-1"}, {displayText: "GROUNDMOUNT" , value: "GROUNDMOUNT"},{displayText: "ROOFTOP" , value: "ROOFTOP"}]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPlantByProjectId: (projectId) => dispatch(getPlantByProjectId(projectId)),
//        getModuleCleaningDataByDate: (plantId) => dispatch(getModuleCleaningDataByDate(plantId)),
 //       clearModuleCleaningData:() =>dispatch(clearModuleCleaningData())
    }
}

const PerformanceAnalysisContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(PerformanceAnalysis));
export default PerformanceAnalysisContainer;
