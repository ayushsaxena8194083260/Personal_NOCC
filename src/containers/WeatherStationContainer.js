import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getProjectNames } from "../actions/PlantFaultDataActions";
import { getPlantByProjectId } from "../actions/PlantFaultDataActions";
import { getWeatherDailyDetailsWithPlantIds } from "../actions/WeatherStationDataActions";
import WeatherStation from "../components/WeatherStation/weatherStationDailyData";
import {deleteWeatherStationDailyData} from "../actions/WeatherStationDataActions";
import {clearWeatherStationData} from "../actions/WeatherStationDataActions";


const mapStateToProps = state => {
    return {
        projectTypes: state.projectTypes.projectTypes,
        plantTypes: state.projectTypes.plantTypes,
        weatherStation: state.weatherStationReducer.weatherStation,
        weatherStationName: state.weatherStationReducer.weatherStationName,
        displayMessage: state.weatherStationReducer.displayMessage,
        plantType: [{displayText: "Select Plant Type" , value: "-1"}, {displayText: "GROUNDMOUNT" , value: "GROUNDMOUNT"},{displayText: "ROOFTOP" , value: "ROOFTOP"}]
    }
}
 
const mapDispatchToProps = (dispatch) => {
    return {
        getProjectNames: (projectTypes) => dispatch(getProjectNames(projectTypes)),
        getPlantByProjectId: (projectId) => dispatch(getPlantByProjectId(projectId)),
        getWeatherDailyDetailsWithPlantIds: (plantId) => dispatch(getWeatherDailyDetailsWithPlantIds(plantId)),
        deleteWeatherStationDailyData: (id) => dispatch(deleteWeatherStationDailyData(id)),
        clearWeatherStationData:() =>dispatch(clearWeatherStationData()),
        
    }
}

const WeatherStationContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(WeatherStation));
export default WeatherStationContainer;
