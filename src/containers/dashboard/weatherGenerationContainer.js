import { connect } from 'react-redux';
import WeatherGeneration from "../../components/dashboard/Pages/weatherGeneration";
import { getDashboardInfo } from '../../actions/action-Dashboard';

const mapStateToProps = state => {
    return {
       
        allPlants: state.DashboardReducer.allPlants

    }
}

const mapDispatchToProps = (dispatch) => {
    return {       
        getDashboardInfo: () => dispatch(getDashboardInfo())
    }
}

const weatherGenerationContainer = connect(mapStateToProps, mapDispatchToProps)(WeatherGeneration);
export default weatherGenerationContainer;