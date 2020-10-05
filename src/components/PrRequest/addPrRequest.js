import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form,} from 'react-bootstrap';
import {getPlantByType, getAllPlants} from "../../actions/PlantActions";
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { getAllPrRequest, createUpdatePrRequest } from '../../actions/action-PrRequst';

class AddPrRequestModal extends Component{
constructor(props){
    super(props);
    if(this.props.data !== null){
      this.state={
        plantTypes: ["GROUNDMOUNT", "ROOFTOP"],
        selectedPlant:this.props.data,
        displayHeading:"Edit PR Request",
        plants: [],
        prData: {
        prRequestId:this.props.data.prRequestId,
        plantRequestId:this.props.data.plantRequestId,
        date:this.props.data.date,
        materialServiceDesc:this.props.data.materialServiceDesc,
        specification:this.props.data.specification,
        quantity:this.props.data.quantity,
        unitMeasureCode:this.props.data.unitMeasureCode,
        reason:this.props.data.reason,
        comment:this.props.data.comment
      },
      value: null,
    }
    }
    else{
this.state={
      plantTypes: ["GROUNDMOUNT", "ROOFTOP"],
        selectedPlant:'',
        displayHeading:"Add PR Request",
        plants: [],
        prData: {
        prRequestId:'',
        plantRequestId:'',
        date:'',
        materialServiceDesc:'',
        specification:'',
        quality:'',
        unitMeasureCode:'',
        reason:'',
        comment:''
      },
      value: null,
    }
    }
    this.handleChangePlant = this.handleChangePlant.bind(this)
    this.handleChange = this.handleChange.bind(this)
}

async componentDidMount() {
  // document.title = 'Plant Fault Data';
  // this.props.getAllPlants();
  this.props.getAllPrRequest();
}
onSubmit = () => {
  this.props.createUpdatePrRequest({ prData: this.state.prData});
  setTimeout(this.props.getAllPrRequest(),2000);
  this.props.onHide();
  
}
handleChangePlant(event) {
  const stateDup1 = this.state.prData;  
  let prRequestData = this.props.prRequestData; 
  stateDup1.plantRequestId = event.target.value;
  for(var i=0;i<prRequestData.length;i++){
      if(prRequestData[i].plantRequestId === event.target.value){
          stateDup1.prRequestId = prRequestData[i].prRequestId;
          break;
      }
  }
  console.log(stateDup1)
  this.setState(stateDup1)
}
handleChange(event) {
  const stateDup2 = this.state.prData;
  stateDup2[event.target.name]=event.target.value;
  this.setState(stateDup2);
  console.log(this.state.prData)

}

render(){
    return(
        <Modal {...this.props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        {/* <Modal.Header closeButton> */}
        {console.log(this.state.prData)}
          <Modal.Title>{this.state.displayHeading}</Modal.Title>
        {/* </Modal.Header> */}
        <Modal.Body>
                            <Row>
                                <Col>
                                    <Form.Label>Plant:</Form.Label>
                                    <select className="form-control top-search-input" required name="plant_id" type="dropdown" onChange={(item) => this.handleChangePlant(item)} value={this.state.prData.plantRequestId} >
                                        <option>Select Plant</option>
                                        {this.props.prRequestData !== undefined? this.props.prRequestData.map((plant) =>{
                                           return <option key={plant.prRequestId}>{plant.plantRequestId}</option>
                                            }):''}
                                    </select>
                                </Col>
                                <Col>
                                    <Form.Label>Data:</Form.Label>
                                    <Form.Control className="top-search-input " name="date"  onChange={(item) => this.handleChange(item)}  type="date" value={this.state.prData.date}  />
                                </Col>
                            </Row>
                            <Row>
                              <Col>
                                <Form.Label>Material/Service Description::</Form.Label>
                                <Form.Control className="top-search-input " name="materialServiceDesc" onChange={(item) => this.handleChange(item)}  as="textarea" rows="2"  value={this.state.prData.materialServiceDesc}/>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <Form.Label>Specification:</Form.Label>
                                <Form.Control className="top-search-input " name="specification"  onChange={(item) => this.handleChange(item)}  as="textarea" rows="2" value={this.state.prData.specification}/>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <Form.Label>Quantity</Form.Label>
                                <Form.Control className="top-search-input "  name="quantity" onChange={(item) => this.handleChange(item)}  type="number" value={this.state.prData.quantity}/>
                              </Col>
                              <Col>
                                <Form.Label>Unit of measure:</Form.Label>
                                <Form.Control className="top-search-input "  name="unitMeasureCode" onChange={(item) => this.handleChange(item)}  type="text" value={this.state.prData.unitMeasureCode}/>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <Form.Label>Specific reason of requirement:</Form.Label>
                                <Form.Control className="top-search-input "  name="reason" onChange={(item) => this.handleChange(item)}  as="textarea" rows="2"  value={this.state.prData.reason}/>
                              </Col>
                              {this.state.allowComments ?
                               <Col>
                               <Form.Label>Comments by SCM:</Form.Label>
                               <Form.Control  className="top-search-input " name="comment" onChange={(item) => this.handleChange(item)}  as="textarea" rows="2" value={this.state.prData.comment}/>
                             </Col>
                             :
                             <Col>
                             <Form.Label>Comments by SCM:</Form.Label>
                             <Form.Control disabled className="top-search-input " name="comment" onChange={(item) => this.handleChange(item)}  as="textarea" rows="2" value={this.state.prData.comment}/>
                           </Col>
                              }
                             
                            </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={this.props.onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={this.onSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    )
}
}

const mapStateToProps = state => {
  return {
    plants: state.plants.allplants,
    prRequestData: state.PrRequestReducer.AllPrRequest,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllPrRequest: () => dispatch(getAllPrRequest()),
    getPlantByType: (plantsByType) => dispatch(getPlantByType(plantsByType)),
		getAllPlants: () => dispatch(getAllPlants()),
    createUpdatePrRequest:(data)=>dispatch(createUpdatePrRequest(data))
  }
}

//export default ActualGenerateModal

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddPrRequestModal));