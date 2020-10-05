import { connect } from 'react-redux';
import GridFailureAddEdit from '../components/GridFailure/gridFailureAddEdit';
import { getPlantByType } from '../actions/GridFailureActions';
import { createOrUpdateGridFailureData } from '../actions/GridFailureActions';
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
    const gridFailure = props.location && props.location.gridFailure ? props.location.gridFailure : [];
    let plants = [{ plantName: "SELECT PLANTS", plantId: "-1" }];
    state.projectTypes.plantTypes && state.projectTypes.plantTypes.length > 0 && state.projectTypes.plantTypes.map((item) => plants.push(item));
    return {
        pageName: gridFailure.plantId ? "Edit Grid Failure" : "Add Grid Failure",
        gridFailure: { ...gridFailure, startTime:getTimeFromDate(gridFailure.startTime)},
        plantTypes: ["SELECT PLANT TYPE", "GROUNDMOUNT", "ROOFTOP"],
        plants: plants,
        selectedPlantType: gridFailure.plantId? state.projectTypes.selectedPlantType: null,
        submitedFields: ["plantId", "date", "startTime", "stopTime", "tiltIrradiationOh", "moduleTempOh","reason","countOh", "affectedCapacity"]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createOrUpdateGridFailureData: (gridFailure) => dispatch(createOrUpdateGridFailureData(gridFailure)),
        getPlantByType: (plantType) => dispatch(getPlantByType(plantType))
    }
}

const GridFailureAddEditContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(GridFailureAddEdit))
export default GridFailureAddEditContainer;