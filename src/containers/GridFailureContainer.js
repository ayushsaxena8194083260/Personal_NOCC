import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getProjectNames } from "../actions/GridFailureActions";
import { getPlantByProjectId } from "../actions/GridFailureActions";
import { getGridFailureDataByPlantId } from "../actions/GridFailureActions";
import GridFailure from "../components/GridFailure/gridFailure";
import {deleteGridFailureData} from "../actions/GridFailureActions";
import {clearGridFailureData} from "../actions/GridFailureActions";

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
        gridFailure: state.gridFailureReducer.gridFailure,
        totalResult: state.gridFailureReducer.totalResult,
        years: getYearFromToday(),
        displayMessage: state.gridFailureReducer.displayMessage,
        plantType: [{displayText: "Select Plant Type" , value: "-1"}, {displayText: "GROUNDMOUNT" , value: "GROUNDMOUNT"},{displayText: "ROOFTOP" , value: "ROOFTOP"}]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProjectNames: (projectTypes) => dispatch(getProjectNames(projectTypes)),
        getPlantByProjectId: (projectId) => dispatch(getPlantByProjectId(projectId)),
        getGridFailureDataByPlantId: (plantId) => dispatch(getGridFailureDataByPlantId(plantId)),
        deleteGridFailureData: (id) => dispatch(deleteGridFailureData(id)),
        clearGridFailureData:() =>dispatch(clearGridFailureData())
    }
}

const GridFailureContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(GridFailure));
export default GridFailureContainer;