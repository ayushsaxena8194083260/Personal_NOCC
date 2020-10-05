import { connect } from 'react-redux';
import WeatherStationAddEdit from '../components/WeatherStation/weatherStationAddEdit';
import { getPlantByType } from '../actions/WeatherStationDataActions';
import { getWeatherStationByPlantId } from '../actions/WeatherStationDataActions';
import { createOrUpdateWeatherStationDailyData } from '../actions/WeatherStationDataActions';
import { deleteWeatherStationDailyData } from '../actions/WeatherStationDataActions';
import { Link, withRouter } from 'react-router-dom';

function getTimeFromDate(date)
{
    let time = null;
    if (date) {
        const data = date.split(" ");
        if (data && data.length === 2) {
            time = data[1];
        }
        else if (data && data.length === 1) {
            time = data[0];
        }
    }
    return time;
}
const mapStateToProps = (state, props) => {
    const weatherStation = props.location && props.location.weatherStation ? props.location.weatherStation : [];
    let plants = [{ plantName: "SELECT PLANTS", plantId: "-1" }];
    let weatherStationName = [{weatherStationName: "SELECT WEATHER STATION",weatherStationId:"-1"}];
    state.projectTypes.plantTypes && state.projectTypes.plantTypes.length > 0 && state.projectTypes.plantTypes.map((item) => plants.push(item));
    state.weatherStationReducer.weatherStationName && state.weatherStationReducer.weatherStationName.length > 0 && state.weatherStationReducer.weatherStationName.map((item) => weatherStationName.push(item));
    return {
        pageName: weatherStation.plantId ? "Edit Weather Station" : "Add Weather Station",
        weatherStation: { ...weatherStation, startTime:getTimeFromDate(weatherStation.startTime)},
        plantTypes: ["SELECT PLANT TYPE", "GROUNDMOUNT", "ROOFTOP"],
        plants: plants,
        //weatherStationName: state.weatherStationReducer.weatherStationName,
        weatherStationName: weatherStationName,
        selectedPlantType: weatherStation.plantId? state.projectTypes.selectedPlantType: null,
        submitedFields: ["plantId","weatherStationId","date", "startTime", "endTime", "horizontalIrradiationWh","tiltIrradiationWh", "moduleTempWh","moduleTemp24","ambientTempWh","ambientTemp24","windSpeed24","count"]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createOrUpdateWeatherStationDailyData: (weatherStation) => dispatch(createOrUpdateWeatherStationDailyData(weatherStation)),
        getPlantByType: (plantType) => dispatch(getPlantByType(plantType)),
        getWeatherStationByPlantId: (plantId) => dispatch(getWeatherStationByPlantId(plantId)),
        deleteWeatherStationDailyData: (id) => dispatch(deleteWeatherStationDailyData(id))
    }
}

const WeatherStationAddEditContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(WeatherStationAddEdit))
export default WeatherStationAddEditContainer;