import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getPlantByProjectId } from "../actions/PlantFaultDataActions";
import { getWeatherDailyDetailsWithPlantIds } from "../actions/missingWeatherActions";
import CheckMissingDataForWeather from "../components/missingWeather/checkMissingDataForWeather";
import {deleteWeatherStationDailyData} from "../actions/WeatherStationDataActions";
import {clearMissingWeatherStationData} from "../actions/missingWeatherActions";
import { getWeatherStationByPlantId } from '../actions/missingWeatherActions';
import { getProjectNames } from "../actions/PlantFaultDataActions";
import {getWeatherDailyDetails} from "../actions/missingWeatherActions";
import { getPlantByType} from "../actions/moduleCleaningAnalysisActions";
import {createOrUpdateWeatherStationDailyData} from "../actions/WeatherStationDataActions";


const mapStateToProps = state => {
    return {
        weatherStationName: state.missingWeatherReducer.weatherStationName,
        plantTypes: state.projectTypes.plantTypes,
        plants: state.plants.plants,
        missingWeatherData: state.missingWeatherReducer.missingWeatherData,
        weatherStation: state.missingWeatherReducer.weatherStation,
        displayMessage: state.weatherStationReducer.displayMessage,
        plantType: [{displayText: "Select Plant Type" , value: "-1"}, {displayText: "GROUNDMOUNT" , value: "GROUNDMOUNT"},{displayText: "ROOFTOP" , value: "ROOFTOP"}]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPlantByType: (plantsByType) => dispatch(getPlantByType(plantsByType)),
        getProjectNames: (projectTypes) => dispatch(getProjectNames(projectTypes)),
        getPlantByProjectId: (projectId) => dispatch(getPlantByProjectId(projectId)),
        getWeatherDailyDetailsWithPlantIds: (plantId) => dispatch(getWeatherDailyDetailsWithPlantIds(plantId)),
        getWeatherDailyDetails: (plantId) => dispatch(getWeatherDailyDetails(plantId)),
        deleteWeatherStationDailyData: (id) => dispatch(deleteWeatherStationDailyData(id)),
        getWeatherStationByPlantId: (plantId) => dispatch(getWeatherStationByPlantId(plantId)),
        clearMissingWeatherStationData:() =>dispatch(clearMissingWeatherStationData()),
        createOrUpdateWeatherStationDailyData:(weatherStation) => dispatch(createOrUpdateWeatherStationDailyData(weatherStation))
    }
}

const checkMissingDataForWeatherContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(CheckMissingDataForWeather));
export default checkMissingDataForWeatherContainer;