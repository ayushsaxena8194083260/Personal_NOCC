import { connect } from 'react-redux';
import PlantFaultDataAddEdit from '../components/plant/plantFaultDataAddEdit'
import { getPlantByType } from '../actions/PlantFaultDataActions';
import { createOrUpdatePlantFaultData } from '../actions'
import { withRouter } from 'react-router-dom';


function getTimeFromDate(date) {
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
    const plantFault = props.location && props.location.plantFault ? props.location.plantFault : [];
    let plants = [{ plantName: "SELECT PLANTS", plantId: "-1" }];
    state.projectTypes.plantTypes && state.projectTypes.plantTypes.length > 0 && state.projectTypes.plantTypes.map((item) => plants.push(item));
    return {
        pageName: plantFault.plantId ? "Edit Fault" : "Add Fault",
        plantFault: { ...plantFault, time: getTimeFromDate(plantFault.time) },
        plantTypes: ["SELECT PLANT TYPE", "GROUNDMOUNT", "ROOFTOP"],
        plants: plants,
        selectedPlantType: plantFault.plantId ? state.projectTypes.selectedPlantType : null,
        // submitedFields: ["plantId", "equipmentAffected", "errorCode", "date", "affectedCapacity", "time", "stopTime", "countOh", "faultReason", "tiltIrradiationOh", "moduleTempOh", "noticeBy", "actionTaken","componentAffected"]
        submitedFields: ["plantId", "equipmentAffected", "errorCode", "date", "affectedCapacity", "time", "stopTime", "countOh", "faultReason", "tiltIrradiationOh", "moduleTempOh", "noticeBy", "actionTaken"]

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createOrUpdatePlantFaultData: (plantFaultData) => dispatch(createOrUpdatePlantFaultData(plantFaultData)),
        getPlantByType: (plantType) => dispatch(getPlantByType(plantType))
    }
}

const PlantFaultDataAddEditContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(PlantFaultDataAddEdit))
export default PlantFaultDataAddEditContainer;