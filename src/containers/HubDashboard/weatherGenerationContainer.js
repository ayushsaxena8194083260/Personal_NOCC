import { connect } from 'react-redux';
import WeatherGeneration from "../../components/HubDashboard/Pages/WeatherGeneration";
import { getHubDashboardInfo } from '../../actions/action-HubDashboard';

const mapStateToProps = state => {
    return {
       
        allPlants: state.DashboardReducer.allPlants

    }
}

const mapDispatchToProps = (dispatch) => {
    return {       
        getHubDashboardInfo: () => dispatch(getHubDashboardInfo())
    }
}

const weatherGenerationContainer = connect(mapStateToProps, mapDispatchToProps)(WeatherGeneration);
export default weatherGenerationContainer;