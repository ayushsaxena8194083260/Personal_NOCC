import { connect } from 'react-redux';
import PortfolioHUB from '../../../components/HubDashboard/Pages/PortfolioHUB';
import { getHubDashboardInfo } from '../../../actions/action-HubDashboard';
const mapStateToProps = state => {
    return {        
        allPlants: state.DashboardReducer.allPlants,
        pageName: "HubDashboard"
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getDashboardInfo: () => dispatch(getHubDashboardInfo())
    }
}

const PortfolioHUBContainer = connect(mapStateToProps, mapDispatchToProps)(PortfolioHUB);
export default PortfolioHUBContainer;