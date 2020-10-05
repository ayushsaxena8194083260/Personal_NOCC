import { connect } from 'react-redux';
import ModuleCleaningAddEdit from '../components/ModuleCleaning/moduleCleaningAddEdit';
import { getPlantByType } from '../actions/moduleCleaningActions';
import { getModuleCleaningDataByDate } from '../actions/moduleCleaningActions';
import { createOrUpdateModuleCleaning } from '../actions/moduleCleaningActions';
import { deleteModuleCleaning } from '../actions/moduleCleaningActions';
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
    const moduleCleaning = props.location && props.location.moduleCleaning ? props.location.moduleCleaning : [];
    let plants = [{ plantName: "SELECT PLANTS", plantId: "-1" }];
    let moduleCleaningName = [{moduleCleaningName: "--Select--",modeOfCleaning:"-1"},{moduleCleaningName: "Wet Cleaning",modeOfCleaning:"1"},{moduleCleaningName: "Dry Cleaning",modeOfCleaning:"2"}];
    state.projectTypes.plantTypes && state.projectTypes.plantTypes.length > 0 && state.projectTypes.plantTypes.map((item) => plants.push(item));
    return {
        pageName: moduleCleaning.plantId ? "Edit Module Cleaning" : "Add Module Cleaning",
        moduleCleaning: { ...moduleCleaning, startTime:getTimeFromDate(moduleCleaning.startTime)},
        plantTypes: ["SELECT PLANT TYPE", "GROUNDMOUNT", "ROOFTOP"],
        plants: plants,
        moduleCleaningName: moduleCleaningName,
        selectedModuleClean: moduleCleaning.plantId? state.projectTypes.selectedModuleClean: null, 
        rainingDetail: ["--Select--","NO","YES"],
        selectedRainingDet: moduleCleaning.plantId? state.rainingDetail: null, 
        selectedPlantType: moduleCleaning.plantId? state.projectTypes.selectedPlantType: null,
        selectedMOC: moduleCleaning.plantId? state.projectTypes.selectedMOC: null,
        submitedFields: ["plantId","date","rackPlanned","rackCleaned","totalCleaned","labourPlanned","labourUsed","modeOfCleaning","rainingDetail","startTime","stopTime","cleaningFrequency","waterUsed","cleaningExpenditure","rackPerCost"]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createOrUpdateModuleCleaning: (moduleCleaning) => dispatch(createOrUpdateModuleCleaning(moduleCleaning)),
        getPlantByType: (plantType) => dispatch(getPlantByType(plantType)),
        getModuleCleaningDataByDate: (plantId) => dispatch(getModuleCleaningDataByDate(plantId)),
        deleteModuleCleaning: (id) => dispatch(deleteModuleCleaning(id)),
    }
}

const ModuleCleaningAddEditContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(ModuleCleaningAddEdit))
export default ModuleCleaningAddEditContainer;