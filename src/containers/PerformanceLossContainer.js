import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PerformanceLoss from "../components/plant/performanceLoss";
import {getPlantByType} from "../actions/PlantActions";
import { getPerformanceLossByPlantIdsPeriod } from "../actions/performanceLossActions";


const mapStateToProps = state => {
    return {
        plantsByType: state.plants.plantsByType,
        performanceLossData: state.projectTypes.plantFault,
        perfLossByPlantIdsDate : state.perfLossByPlantIdsDate.perfLossByPlantIdsDate,        
        displayMessage: state.projectTypes.displayMessage,
        duration:[{displayText: "Select" , value: "-1"}, {displayText: "Daily" , value: "DAILY"},{displayText: "Monthly" , value: "MONTHLY"}, {displayText: "Custom Search" , value: "YTDC"}],
        plantType: [{displayText: "Select Plant Type" , value: "-1"}, {displayText: "GROUNDMOUNT" , value: "GROUNDMOUNT"},{displayText: "ROOFTOP" , value: "ROOFTOP"}]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPlantByType: (plantsByType) => dispatch(getPlantByType(plantsByType)),
        getPerformanceLossByPlantIdsPeriod: (data) => dispatch(getPerformanceLossByPlantIdsPeriod(data))
       }
}

const PerformanceLossContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(PerformanceLoss));
export default PerformanceLossContainer;