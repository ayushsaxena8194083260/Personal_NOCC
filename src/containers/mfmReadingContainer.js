import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getProjectsByPlantType } from "../actions/PlantFaultDataActions";
import { getPlantByProjectId } from "../actions/PlantFaultDataActions";
import MfmReading from "./../components/plant/mfmReading";

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
        years: getYearFromToday(),
        displayMessage: state.projectTypes.displayMessage,
        plantType: [{displayText: "Select Plant Type" , value: "-1"}, {displayText: "GROUNDMOUNT" , value: "GROUNDMOUNT"},{displayText: "ROOFTOP" , value: "ROOFTOP"}]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProjectsByPlantType: (projectTypes) => dispatch(getProjectsByPlantType(projectTypes)),
        getPlantByProjectId: (projectId) => dispatch(getPlantByProjectId(projectId))
    }
}

const MfmReadingContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(MfmReading));
export default MfmReadingContainer;