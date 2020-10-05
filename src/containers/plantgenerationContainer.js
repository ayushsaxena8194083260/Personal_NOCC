import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getProjectNames } from "../actions/PlantFaultDataActions";
import { getPlantByProjectId } from "../actions/PlantFaultDataActions";
import { getPlantFaultDataByPlantId } from "../actions/PlantFaultDataActions";
import { deletePlantGen } from "../actions/plantGenerationActions";
import PlantGeneration from "../components/PlantActualGeneration/PlantGeneration";
import MonthlyGeneration from "../components/PlantActualGeneration/MonthlyGeneration";
import {clearPlantDailyGeneration} from "../actions/plantGenerationActions";
import {getDailyPlantActualGeneration} from "../actions/plantGenerationActions";

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
        plantFault: state.projectTypes.plantFault,
        plantDailyGen:state.plantDailyGenerationReducer.plantDailyGen,
        totalResult: state.plantDailyGenerationReducer.totalResult,
        years: getYearFromToday(),
        displayMessage: state.plantDailyGenerationReducer.displayMessage,
        plantType: [{displayText: "Select Plant Type" , value: "-1"}, {displayText: "GROUNDMOUNT" , value: "GROUNDMOUNT"},{displayText: "ROOFTOP" , value: "ROOFTOP"}],
        plfType: [{name: "AC Capacity", value: "AC Capacity"},{name: "DC Capacity", value: "DC Capacity"}],
        currencyType: [{name: "INR", value: "INR"},{name: "USD", value: "USD"}]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProjectNames: (projectTypes) => dispatch(getProjectNames(projectTypes)),
        getPlantByProjectId: (projectId) => dispatch(getPlantByProjectId(projectId)),
        getPlantFaultDataByPlantId: (plantId) => dispatch(getPlantFaultDataByPlantId(plantId)),
        deletePlantGen: (fault_id) => dispatch(deletePlantGen(fault_id)),
        clearPlantDailyGeneration:() =>dispatch(clearPlantDailyGeneration()),
        getDailyPlantActualGeneration: (plantId) => dispatch(getDailyPlantActualGeneration(plantId))
    }
}

const PlantGenerationContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(PlantGeneration,MonthlyGeneration));
export default PlantGenerationContainer;