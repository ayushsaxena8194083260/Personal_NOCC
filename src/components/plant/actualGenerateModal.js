import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form,} from 'react-bootstrap';
import {getPlantByType} from "../../actions/PlantActions";
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import '../../App.scss'
class ActualGenerateModal extends Component{
constructor(props){
    super(props);
    this.state={
      plantTypes: ["GROUNDMOUNT", "ROOFTOP"],
      selectedPlantType:'',
      plants: [],
      selectedPlanType: '',
      selectedPlant: "",
      value: null,
    }
    this.handleChangePlant = this.handleChangePlant.bind(this)
}

componentDidMount() {
  // document.title = 'Plant Fault Data';
}

// componentWillReceiveProps(nextProps) {
//   if (nextProps !== null) {
//       this.setState({ 
//         plantsByType: nextProps.plantsByType
//            })
//   }
// }

handleChangePlant(event) {
  const stateDup = this.state;
  stateDup.selectedPlanType = event.target.value;
  this.setState({ stateDup });

  this.props.getPlantByType(stateDup.selectedPlanType);
  //const stateDup1 = this.state;
  //this.props.getPlantByType(stateDup.selectedPlanType);
  console.log(this.props.plantsByType);
  //this.setState({ stateDup1 });
  
}

// getPlantTypesDropDownOptions() {
//   const options = this.state.plantTypes && this.state.plantTypes.map((plantTypes, key) => { 
//     return { 
//       <option>name: plantTypes.plant_name } });
  
// }

render(){
    return(
      <div className="modal-main">
        <Modal {...this.props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        {/* <Modal.Header closeButton> */}
          <Modal.Title>Actual Generation</Modal.Title>
        {/* </Modal.Header> */}
        <Modal.Body>
                            <Row>
                                <Col>
                                    <Form.Label>Plant Type:</Form.Label>
                                    {/* <Form.Control name="plant_type" type="text" required/> */}
                                    <select className="top-search-input form-control" width='300px' onChange={(item) => this.handleChangePlant(item)}>
                                    <option >Select Plant Type</option>
                                    {this.state.plantTypes.map((plantType, key) => <option key={plantType}>{plantType}</option>)}
                                    </select>
                                </Col>
                                <Col>
                                    <Form.Label>Plant:</Form.Label>
                                    <select required class="form-control" name="plant_id" type="dropdown">
                                        <option>Select Plant</option>
                                        {/* <option>{this.state.plans[0].plant_name}</option> */}
                                        {this.props.plantsByType === undefined?<option>default</option>:this.props.plantsByType.map((plant, key) => <option key={plant.plant_id}>{plant.plant_name}</option>)}
                                    </select>
                                </Col>
                                <Col>
                                    <Form.Label>Data Type:</Form.Label>
                                    <select required class="form-control" name="plant_id" type="dropdown">
                                        <option>Daily</option>
                                        <option>Monthly</option>
                                    </select>
                                </Col>
                            </Row>
                            <Row>
                              <Col>
                                <Form.Label>Date:</Form.Label>
                                <Form.Control name="date" type="text"/>
                              </Col>
                              <Col>
                                <Form.Label>Export (kWh):</Form.Label>
                                <Form.Control name="export_kwh" type="text"/>
                              </Col>
                              <Col>
                                <Form.Label>Tilt:</Form.Label>
                                <Form.Control name="tilt" type="text"/>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <Form.Label>Connected Capacity (kWh):</Form.Label>
                                <Form.Control name="connected_capacity_kwh" type="text"/>
                              </Col>
                              <Col>
                                <Form.Label>Import (kWh):</Form.Label>
                                <Form.Control name="import_kwh" type="text"/>
                              </Col>
                            </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={this.props.onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={this.props.onSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    )
}
}

const mapStateToProps = state => {
  return {
    plantsByType: state.plants.plantsByType
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPlantByType: (plantsByType) => dispatch(getPlantByType(plantsByType))
 
  }
}

//export default ActualGenerateModal

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ActualGenerateModal));