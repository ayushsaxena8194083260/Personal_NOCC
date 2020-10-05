import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getProjectNames } from "../actions/PlantFaultDataActions";
import { getPlantByProjectId } from "../actions/PlantFaultDataActions";
import { getinverterDailyDetailsWithPlantIdsAndDate } from "../actions/InverterDailyActions";
import { getInvertersByPlantId } from "../actions/InverterDailyActions";
import InverterDaily from "../components/InverterDaily/inverterDaily";
import {deleteInverterDailyData} from "../actions/InverterDailyActions";
import {clearInverterDailyData} from "../actions/InverterDailyActions";


const mapStateToProps = state => {
    return {
        projectTypes: state.projectTypes.projectTypes,
        plantTypes: state.projectTypes.plantTypes,
        inverterDaily: state.inverterDailyReducer.inverterDaily,
        totalResult: state.inverterDailyReducer.totalResult,
        inverterName: state.inverterDailyReducer.inverterName,
        displayMessage: state.inverterDailyReducer.displayMessage,
        plantType: [{displayText: "Select Plant Type" , value: "-1"}, {displayText: "GROUNDMOUNT" , value: "GROUNDMOUNT"},{displayText: "ROOFTOP" , value: "ROOFTOP"}]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProjectNames: (projectTypes) => dispatch(getProjectNames(projectTypes)),
        getPlantByProjectId: (projectId) => dispatch(getPlantByProjectId(projectId)),
        getinverterDailyDetailsWithPlantIdsAndDate: (plantId) => dispatch(getinverterDailyDetailsWithPlantIdsAndDate(plantId)),
        getInvertersByPlantId: (plantId) => dispatch(getInvertersByPlantId(plantId)),
        deleteInverterDailyData: (id) => dispatch(deleteInverterDailyData(id)),
        clearInverterDailyData:() =>dispatch(clearInverterDailyData())
    }
}

const InverterDailyContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(InverterDaily));
export default InverterDailyContainer;
