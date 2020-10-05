import { connect } from 'react-redux';
import GirdDisplay from "../../components/dashboard/girdDisplay";
import data from './../../components/dashboard/data';
import { getForcastWeatherInfo } from '../../actions/get-Forcast-Weather';
import { getDashboardInfo } from '../../actions/action-Dashboard';
import { getHubDashboardInfo } from '../../actions/action-HubDashboard';

const mapStateToProps = state => {
    return {
        // plants: data["plantList"],
        onGridReady: true,
        weatherinfo: state.DashboardReducer.allPlantsWeather,
        allPlants: state.DashboardReducer.allPlants,
        total: state.DashboardReducer.allPlantsTotal
 
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getForcastWeatherInfo: () => dispatch(getForcastWeatherInfo()),
        getDashboardInfo: () => dispatch(getDashboardInfo()),
        getHubDashboardInfo: () => dispatch(getHubDashboardInfo())
    }
}

const GirdDisplayContainer = connect(mapStateToProps, mapDispatchToProps)(GirdDisplay);
export default GirdDisplayContainer;