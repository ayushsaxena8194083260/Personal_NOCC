import { connect } from 'react-redux';
import InverterDailyAddEdit from '../components/InverterDaily/inverterDailyAddEdit';
import { getPlantByType } from '../actions/GridFailureActions';
import { getInverterByPlantId } from '../actions/InverterDailyActions';
import { createOrUpdateInverterDailyData } from '../actions/InverterDailyActions';
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
    const inverterDaily = props.location && props.location.inverterDaily ? props.location.inverterDaily : [];
    let plants = [{ plantName: "SELECT PLANTS", plantId: "-1" }];
    let inverterName = [{inverterName: "SELECT INVERTER",inverterId:"-1"}]
    state.projectTypes.plantTypes && state.projectTypes.plantTypes.length > 0 && state.projectTypes.plantTypes.map((item) => plants.push(item));
    state.inverterDailyReducer.inverterName && state.inverterDailyReducer.inverterName.length > 0 && state.inverterDailyReducer.inverterName.map((item) => inverterName.push(item));
    return {
        pageName: inverterDaily.plantId ? "Edit Inverter Daily" : "Add Inverter Daily",
        inverterDaily: { ...inverterDaily, startTime:getTimeFromDate(inverterDaily.startTime)},
        plantTypes: ["SELECT PLANT TYPE", "GROUNDMOUNT", "ROOFTOP"],
        plants: plants,
        inverterName: inverterName,
        selectedPlantType: inverterDaily.plantId? state.projectTypes.selectedPlantType: null,
        submitedFields: ["plantId", "inverterId","date", "startTime", "endTime", "energyToday","acRealPower", "dcPower","eTotal","count"]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createOrUpdateInverterDailyData: (inverterDaily) => dispatch(createOrUpdateInverterDailyData(inverterDaily)),
        getPlantByType: (plantType) => dispatch(getPlantByType(plantType)),
        getInverterByPlantId: (plantId) => dispatch(getInverterByPlantId(plantId))
    }
}

const InverterDailyAddEditContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(InverterDailyAddEdit))
export default InverterDailyAddEditContainer;