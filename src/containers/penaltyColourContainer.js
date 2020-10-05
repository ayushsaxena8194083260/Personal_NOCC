import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AddEditPenaltyColour from "./../components/plant/addEditPenaltyColour";
import getAllPenaltyColours from "../actions/action-PenaltyColor";
import createOrUpdatePenaltyColour from "../actions/action-PenaltyColor";

const mapStateToProps = state => {
    return {
        penaltyColorData: state.PenaltyColorReducer.penaltyColorData,        
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        getAllPenaltyColours: () => dispatch(getAllPenaltyColours()),
        createOrUpdatePenaltyColour: (color) => dispatch(createOrUpdatePenaltyColour(color))       
    }
}
const PenaltyColourContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(AddEditPenaltyColour));
export default PenaltyColourContainer;