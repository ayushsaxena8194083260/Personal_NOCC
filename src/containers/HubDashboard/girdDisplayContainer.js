import { connect } from 'react-redux';
import GirdDisplay from "../../components/HubDashboard/girdDisplay";
import data from './../../components/dashboard/data';
import {getForcastWeatherInfo} from '../../actions/get-Forcast-Weather';
import { getHubDashboardInfo } from '../../actions/action-HubDashboard';

const mapStateToProps = state => {
    return {
        // plants: data["plantList"],
        onGridReady: true,
        weatherinfo: state.DashboardReducer.allPlantsWeather,
        allPlants: state.DashboardReducer.allPlants,
        total: state.DashboardReducer.allPlantsTotal,
        // plants: data["plantList"],
        // onGridReady: true,
        // weatherinfo: state.DashboardReducer.allPlantsWeather,
        // allPlants: state.DashboardReducer.allPlants,
        // total: state.DashboardReducer.allPlantsTotal

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getForcastWeatherInfo:()=> dispatch(getForcastWeatherInfo()),
        getDashboardInfo: () => dispatch(getHubDashboardInfo()),
        getHubDashboardInfo: () => dispatch(getHubDashboardInfo())
    }
}

const GirdDisplayContainer = connect(mapStateToProps, mapDispatchToProps)(GirdDisplay);
export default GirdDisplayContainer;