import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getProjectNames } from "../actions/PlantFaultDataActions";
import { getPlantByProjectId } from "../actions/PlantFaultDataActions";
import { getPlantFaultDataByPlantId } from "../actions/PlantFaultDataActions";
import { deletePlantFaultData } from "../actions/PlantFaultDataActions";
import PlantFaultData from "../components/plant/plantFaultData";
import {clearPlantFaultData} from "../actions/PlantFaultDataActions";
import {getPlantAvailabilityByPlantId} from "../actions/action-PlantAvailability"

function getYearFromToday() {
    let years = [];
    const todayDate = new Date();
    const strYear = todayDate.getFullYear();
    // {
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
    // }
    return years;
}

const mapStateToProps = state => {
    return {
        projectTypes: state.projectTypes.projectTypes,
        plantTypes: state.projectTypes.plantTypes,
        plantFault: state.projectTypes.plantFault,
        totalResult: state.projectTypes.totalResult,
        years: getYearFromToday(),
        displayMessage: state.projectTypes.displayMessage,
        plantType: [{displayText: "Select Plant Type" , value: "-1"}, {displayText: "GROUNDMOUNT" , value: "GROUNDMOUNT"},{displayText: "ROOFTOP" , value: "ROOFTOP"}]
    }
}
 
const mapDispatchToProps = (dispatch) => {
    return {
        getProjectNames: (projectTypes) => dispatch(getProjectNames(projectTypes)),
        getPlantByProjectId: (projectId) => dispatch(getPlantByProjectId(projectId)),
        getPlantFaultDataByPlantId: (plantId) => dispatch(getPlantFaultDataByPlantId(plantId)),
        deletePlantFaultData: (fault_id) => dispatch(deletePlantFaultData(fault_id)),
        clearPlantFaultData:() =>dispatch(clearPlantFaultData()),
        getPlantAvailabilityByPlantId: (plantId) => dispatch(getPlantAvailabilityByPlantId(plantId))
    }
}

const PlantFaultDataContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(PlantFaultData));
export default PlantFaultDataContainer;