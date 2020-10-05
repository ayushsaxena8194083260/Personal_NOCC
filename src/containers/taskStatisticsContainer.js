import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import taskStatistics from "../../src/components/plant/taskStatistics";
import {getAllTaskStatistics} from "../../src/actions/action-taskStatistics";


const mapStateToProps = state => {
    return {
       
        taskStatisticsData: state.taskStatisticsReducer&&state.taskStatisticsReducer.taskStatisticsData?state.taskStatisticsReducer.taskStatisticsData : [] ,
       }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllTaskStatistics:()=> dispatch(getAllTaskStatistics()),
        }
}

const taskStatisticsContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(taskStatistics));
export default taskStatisticsContainer;