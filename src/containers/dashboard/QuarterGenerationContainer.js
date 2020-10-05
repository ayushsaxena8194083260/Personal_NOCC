import { connect } from 'react-redux';
import QuarterGeneration from "../../components/dashboard/Pages/quarterGeneration";
import { getChartsInfo } from '../../actions/action-ChartsInfo';
import {getMakeGraphGauge} from '../../actions/action-MakeGraphGauge';

const mapStateToProps = state => { 
    return {
         chartInfo1: state.DashboardReducer.chartInfo[0],
         chartInfo2: state.DashboardReducer.chartInfo[1],
         chartInfo3: state.DashboardReducer.chartInfo[2],
         chartInfo4: state.DashboardReducer.chartInfo[3],
         allGraphNames: state.ChartsReducer.allGraphNames,
         gaugeGraphsResult: state.ChartsReducer.gaugeGraphs,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getChartInfo: (pageName) => dispatch(getChartsInfo(pageName))  ,
        getMakeGraphGauge: (graphData) => dispatch(getMakeGraphGauge(graphData))      
    }
}

const QuarterGenerationContainer = connect(mapStateToProps, mapDispatchToProps)(QuarterGeneration);
export default QuarterGenerationContainer;