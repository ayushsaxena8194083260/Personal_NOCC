import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getProjectNames } from "../actions/PlantFaultDataActions";
import { getPlantByProjectId } from "../actions/PlantFaultDataActions";
import { getPlantFaultDataByPlantId } from "../actions/PlantFaultDataActions";
import JmrMeter from "../components/jmrMeter/jmrMeter";
import {clearJmrMeter, getPlantByJMRId} from "../actions/jmrMeterActions";
import {getPlantJMRByPlantIdDate} from "../actions/jmrMeterActions";
import {deletePlantJmr} from "../actions/jmrMeterActions";

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
        jmrMeter: state.jmrMeterReducer.jmrMeter,
        years: getYearFromToday(),
        displayMessage: state.projectTypes.displayMessage,
        plantType: [{displayText: "Select Plant Type" , value: "-1"}, {displayText: "GROUNDMOUNT" , value: "GROUNDMOUNT"},{displayText: "ROOFTOP" , value: "ROOFTOP"}]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProjectNames: (projectTypes) => dispatch(getProjectNames(projectTypes)),
        getPlantByProjectId: (projectId) => dispatch(getPlantByProjectId(projectId)),
        getPlantJMRByPlantIdDate: (jmrMeter) => dispatch(getPlantJMRByPlantIdDate(jmrMeter)),
        getPlantJmrById:(jmrId) => dispatch(getPlantByJMRId(jmrId)),
        deletePlantJmr: (id) => dispatch(deletePlantJmr(id)),
        clearJmrMeter:() =>dispatch(clearJmrMeter())
    }
}

const JmrMeterContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(JmrMeter));
export default JmrMeterContainer;