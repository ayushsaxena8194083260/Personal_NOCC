import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getProjectNames } from "../actions/PlantFaultDataActions";
import { getPlantByProjectId } from "../actions/PlantFaultDataActions";
import { getPlantFaultDataByPlantId } from "../actions/PlantFaultDataActions";
import { deletePlantFaultData } from "../actions/PlantFaultDataActions";
import AMRMeter from "../../src/components/plant/amrMeter";
import {clearPlantFaultData} from "../actions/PlantFaultDataActions";
import {getPlantAvailabilityByPlantId} from "../actions/action-PlantAvailability";
import {getAllAMRMeter} from "../actions/action-AMRMeter";

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
        amrMeterData: state.AMRMeterReducer.amrMeterData,
        years: getYearFromToday(),
        displayMessage: state.AMRMeterReducer.displayMessage,
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
        getPlantAvailabilityByPlantId: (plantId) => dispatch(getPlantAvailabilityByPlantId(plantId)),
        getAllAMRMeter:()=> dispatch(getAllAMRMeter())
    }
}

const AMRMeterContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(AMRMeter));
export default AMRMeterContainer;