import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getProjectNames } from "../actions/PlantFaultDataActions";
import { getPlantByProjectId } from "../actions/PlantFaultDataActions";
import { getPlantFaultDataByPlantId } from "../actions/PlantFaultDataActions";
import { deletePlantFaultData } from "../actions/PlantFaultDataActions";
import Penalty from "./../components/plant/penalty";
import { clearPlantFaultData } from "../actions/PlantFaultDataActions";
import { getPlantAvailabilityByPlantId } from "../actions/action-PlantAvailability";
import { getAllPenalty } from "../actions/action-Penalty"

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
        penaltyData: getProjectNamebyID(state.PenaltyReducer.penaltyData, state),
        years: getYearFromToday(),
        displayMessage: state.projectTypes.displayMessage,
        plantType: [{ displayText: "Select Plant Type", value: "-1" }, { displayText: "GROUNDMOUNT", value: "GROUNDMOUNT" }, { displayText: "ROOFTOP", value: "ROOFTOP" }]
    }
}
function getPlantName(plantId, state) {
    const data = state.projectTypes.plantTypes.filter((item) => item.plantId === plantId)[0];

    return data ? data.plantName : "";
}
function getProjectNamebyID(penaltyData, state) {
    return penaltyData && penaltyData.map((item, index) => {
        return {
            ...item,
            plantName: getPlantName(item.plantId, state)            
        }

    })
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProjectNames: (projectTypes) => dispatch(getProjectNames(projectTypes)),
        getPlantByProjectId: (projectId) => dispatch(getPlantByProjectId(projectId)),
        getPlantFaultDataByPlantId: (plantId) => dispatch(getPlantFaultDataByPlantId(plantId)),
        deletePlantFaultData: (fault_id) => dispatch(deletePlantFaultData(fault_id)),
        clearPlantFaultData: () => dispatch(clearPlantFaultData()),
        getPlantAvailabilityByPlantId: (plantId) => dispatch(getPlantAvailabilityByPlantId(plantId)),
        getAllPenalty: (data) => dispatch(getAllPenalty(data))
    }
}

const PenaltyContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Penalty));
export default PenaltyContainer;