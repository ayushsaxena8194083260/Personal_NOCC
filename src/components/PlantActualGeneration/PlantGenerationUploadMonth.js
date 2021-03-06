import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form,} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import '../../App.scss'
import DropDown from "../Common/DropDown";
import { getPlantByType} from "../../actions/moduleCleaningAnalysisActions";
import {createOrUpdatePlantGen} from "../../actions/plantGenerationActions";

class PlantGenerationUploadMonth extends Component{
constructor(props){
    super(props);
      this.invokeUploadGeneration = this.invokeUploadGeneration.bind(this);
    }
    


componentDidMount() {
  // document.title = 'Plant Fault Data';
}
invokeUploadGeneration(){
    this.fieldValid();
    this.onSubmit();
}
componentWillReceiveProps(nextProps) {
    if (nextProps !== null) {
        this.setState({
            plantTypes: nextProps.plantTypes,
        })
    }
}
fieldValid(){

}
onSubmit(){

}

render(){   
    return(
      <div className="modal-main">
        <Modal {...this.props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
          <Modal.Title>Upload Generation Data</Modal.Title>
        <Modal.Body>
                            <Row>
                            <Col xs={1} style={{ maxWidth: "5%" }}>
                            <Form.Label>Upload:</Form.Label>
                        </Col>
                        <Col xs={4} style={{ maxWidth: "30%" }} >
                            
                            <Form.Control type="file"></Form.Control>
                        </Col>
 
                            </Row>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="primary" onClick={this.invokeUploadGeneration}>
            Upload
          </Button>
          <Button variant="danger" onClick={this.props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    )
}
}

const mapStateToProps = state => {
  return {
    plantsByType: state.plants.plantsByType,
    plantType: [{ displayText: "Select Plant Type", value: "-1" }, { displayText: "GROUNDMOUNT", value: "GROUNDMOUNT" }, { displayText: "ROOFTOP", value: "ROOFTOP" }],
    plantTypes: state.projectTypes.plantTypes,
    displayMessage: state.projectTypes.displayMessage,
    submitedFields: ["pyranometer_tilt","import","plant_id","data_type","export_kwh","date","tilt","connected_capacity"]

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPlantByType: (plantsByType) => dispatch(getPlantByType(plantsByType)),
    createOrUpdatePlantGen: (plantGeneration) => dispatch(createOrUpdatePlantGen(plantGeneration))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PlantGenerationUploadMonth));