import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getProjectsByPlantType } from "../actions/PlantFaultDataActions";
import { getPlantByProjectId } from "../actions/PlantFaultDataActions";
import { getAllLenderDetailsData, getLenderDataByYearPlantIds, deleteLenderDetailData } from "../actions/LenderDetailsAction";
import LenderDetail from '../components/lenderDetails/lenderDetails';
import { getAllPlants } from '../actions/PlantActions';


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
        allLenderDetails : state.allLenderDetails.allLenderDetails,
        lenderData: state.allLenderDetails.lenderData,
        allLenderDetailsByYearPlantIds: state.allLenderDetailsByYearPlantIds.allLenderDetailsByYearPlantIds,
        years: getYearFromToday(),
        displayMessage: state.projectTypes.displayMessage,
        plantType: [{displayText: "Select Plant Type" , value: "-1"}, {displayText: "GROUNDMOUNT" , value: "GROUNDMOUNT"},{displayText: "ROOFTOP" , value: "ROOFTOP"}]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProjectsByPlantType: (projectTypes) => dispatch(getProjectsByPlantType(projectTypes)),
        getPlantByProjectId: (projectId) => dispatch(getPlantByProjectId(projectId)),
        getAllLenderDetailsData: () => dispatch(getAllLenderDetailsData()),
        getLenderDataByYearPlantIds: (plantIdsYear) => dispatch(getLenderDataByYearPlantIds(plantIdsYear)),
        deleteLenderDetailData: (lenderDetailId) => dispatch(deleteLenderDetailData(lenderDetailId)),
        getAllPlants:() => dispatch(getAllPlants())
    }
}

const LenderDetailsContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(LenderDetail));
export default LenderDetailsContainer;