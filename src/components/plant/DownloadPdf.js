import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import PrintButton from './PrintButton';
import { Row, Col, Form } from 'react-bootstrap';
import "../../styles/plant/plantFaultIncident.scss"
import {createOrUpdatePlantFaultIncidentData} from '../../actions/PlantFaultDataActions'
class SinglePage extends Component{
  constructor(props){
    super(props);
    this.state = {
        plantFault: props.location.plantFault,
        plantFaultIncident: []
    }
}

handleChange(event) {
    let _data = this.state.plantFaultIncident;
    _data[event.target.name] = event.target.value;
    this.setState({ postData: _data });
}

onSubmit = (e) => {
    e.preventDefault();
        this.props.createOrUpdatePlantFaultIncidentData(this.state.plantFaultIncident, "Add Incident");
        this.props.history.push('/PlantFaultData');
}
onGeneratePdf = (e) => {
    e.preventDefault();
        this.props.history.push('/pdfDownload');
}
  render(){
    return(<Card className="add-plant-card">
              <Card.Body>
              <Button variant="primary" size="md" block style={{width:"150px",float:"right"}}><PrintButton id={"IncidentReport"} label={"Download PDF"} /></Button>
              <div  id={"IncidentReport"} style={{padding:"40px"}}>
              <div style={{width:"780px",margin:"10px 20px"}}>
                   <img src="data:image/png;base64,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" 
                      alt="Icon" width="150px" height="auto"/>
                  <h2 style={{textAlign:"center",fontFamily:"serif",fontWeight: "700",color:"rgb(62, 64, 105)"}}>Incident Report</h2>
                  <hr style={{margin: "-5px 0px 20px",borderTop:"2px solid rgb(145, 146, 247)"}}/>
                    {/*<p style={{textAlign:"justify"}}>
                      <strong>lorem ipsumLorem </strong>Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever
                      since the 1500s, when an unknown printer took a galley of type and scrambled it to
                      make a type specimen book. It has survived not only five centuries, but also the
                      leap into electronic typesetting, remaining essentially unchanged. It was popularised
                      in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                      and more recently with desktop publishing software like Aldus PageMaker including
                      versions of Lorem Ipsum.
                  </p> */}
                  <ol style={{color:"#000",fontWeight:"600"}}>
                    <li>
                      <Row>
                      <Col>
                            <Form.Label>Plant Name</Form.Label>
                        </Col>
                        <Col>
                            {/* {this.state.plantFault.plantName} */}
                        </Col>
                      </Row>
                    </li>
                    <li>
                      <Row>
                      <Col>
                            <Form.Label>Location</Form.Label>
                        </Col>
                        <Col>
                            {/* {this.state.plantFault.plantName} */}
                        </Col>
                      </Row>
                    </li>
                    <li>
                      <Row>
                      <Col>
                            <Form.Label>Incident Subject</Form.Label>
                        </Col>
                        <Col>
                            {/* {this.state.plantFault.plantName} */}
                        </Col>
                      </Row>
                    </li>
                    <li>
                      <Row>
                      <Col>
                            <Form.Label>Error Code</Form.Label>
                        </Col>
                        <Col>
                            {/* {this.state.plantFault.plantName} */}
                        </Col>
                      </Row>
                    </li>
                    <li>
                      <Row>
                      <Col>
                            <Form.Label>Fault Ref No.</Form.Label>
                        </Col>
                        <Col>
                            {/* {this.state.plantFault.plantName} */}
                        </Col>
                      </Row>
                    </li>
                    <li>
                      <Row>
                      <Col>
                            <Form.Label>Severity/Urgency Of Incident</Form.Label>
                        </Col>
                        <Col>
                            {/* {this.state.plantFault.plantName} */}
                        </Col>
                      </Row>
                    </li>
                    <li>
                      <Row>
                      <Col>
                            <Form.Label>How Did It Come To Notice</Form.Label>
                        </Col>
                        <Col>
                            {/* {this.state.plantFault.plantName} */}
                        </Col>
                      </Row>
                    </li>
                    <li>
                      <Row>
                      <Col>
                            <Form.Label>Date That It Was Brought To Notice</Form.Label>
                        </Col>
                        <Col>
                            {/* {this.state.plantFault.plantName} */}
                        </Col>
                      </Row>
                    </li>
                    <li>
                      <Row>
                      <Col>
                            <Form.Label>Approximate Time Of Actual Occurrence</Form.Label>
                        </Col>
                        <Col>
                            {/* {this.state.plantFault.plantName} */}
                        </Col>
                      </Row>
                    </li>
                    <li>
                      <Row>
                      <Col>
                            <Form.Label>Visible Signs</Form.Label>
                        </Col>
                        <Col>
                            {/* {this.state.plantFault.plantName} */}
                        </Col>
                      </Row>
                    </li> <li>
                      <Row>
                      <Col>
                            <Form.Label>Measures Undertaken Instantly For Damage Control</Form.Label>
                        </Col>
                        <Col>
                            {/* {this.state.plantFault.plantName} */}
                        </Col>
                      </Row>
                    </li> <li>
                      <Row>
                      <Col>
                            <Form.Label>Further Steps To Be Undertaken</Form.Label>
                        </Col>
                        <Col>
                            {/* {this.state.plantFault.plantName} */}
                        </Col>
                      </Row>
                    </li> <li>
                      <Row>
                      <Col>
                            <Form.Label>Possible Causes And RCA</Form.Label>
                        </Col>
                        <Col>
                            {/* {this.state.plantFault.plantName} */}
                        </Col>
                      </Row>
                    </li> <li>
                      <Row>
                      <Col>
                            <Form.Label>Possible Effects Due To This Fault</Form.Label>
                        </Col>
                        <Col>
                            {/* {this.state.plantFault.plantName} */}
                        </Col>
                      </Row>
                    </li> <li>
                      <Row>
                      <Col>
                            <Form.Label>Mitigation / Future Prevention</Form.Label>
                        </Col>
                        <Col>
                            {/* {this.state.plantFault.plantName} */}
                        </Col>
                      </Row>
                    </li> <li>
                      <Row>
                      <Col>
                            <Form.Label>Downtime</Form.Label>
                        </Col>
                        <Col>
                            {/* {this.state.plantFault.plantName} */}
                        </Col>
                      </Row>
                    </li> <li>
                      <Row>
                      <Col>
                            <Form.Label>Load Affected</Form.Label>
                        </Col>
                        <Col>
                            {/* {this.state.plantFault.plantName} */}
                        </Col>
                      </Row>
                    </li> <li>
                      <Row>
                      <Col>
                            <Form.Label>Feedback To O&M</Form.Label>
                        </Col>
                        <Col>
                            {/* {this.state.plantFault.plantName} */}
                        </Col>
                      </Row>
                    </li> <li>
                      <Row>
                      <Col>
                            <Form.Label>Feedback To Project / Construction</Form.Label>
                        </Col>
                        <Col>
                            {/* {this.state.plantFault.plantName} */}
                        </Col>
                      </Row>
                    </li>
                    <li>
                      <Row>
                      <Col>
                            <Form.Label>Man Hours Required</Form.Label>
                        </Col>
                        <Col>
                            {/* {this.state.plantFault.plantName} */}
                        </Col>
                      </Row>
                    </li>
                    <li>
                      <Row>
                      <Col>
                            <Form.Label>Name Of Person / S Involved In Fault Resolution (Azure)</Form.Label>
                        </Col>
                        <Col>
                            {/* {this.state.plantFault.plantName} */}
                        </Col>
                      </Row>
                    </li>
                    <li>
                      <Row>
                      <Col>
                            <Form.Label>Tools Required</Form.Label>
                        </Col>
                        <Col>
                            {/* {this.state.plantFault.plantName} */}
                        </Col>
                      </Row>
                    </li>
                    <li>
                      <Row>
                      <Col>
                            <Form.Label>Parts Replaced (With Specification)</Form.Label>
                        </Col>
                        <Col>
                            {/* {this.state.plantFault.plantName} */}
                        </Col>
                      </Row>
                    </li>
                    <li>
                      <Row>
                      <Col>
                            <Form.Label>Vendor Involved</Form.Label>
                        </Col>
                        <Col>
                            {/* {this.state.plantFault.plantName} */}
                        </Col>
                      </Row>
                    </li>
                    <li>
                      <Row>
                      <Col>
                            <Form.Label>Contact Person(Vendor)</Form.Label>
                        </Col>
                        <Col>
                            {/* {this.state.plantFault.plantName} */}
                        </Col>
                      </Row>
                    </li>
                    <li>
                      <Row>
                      <Col>
                            <Form.Label>Vendor Response Time Primary Response</Form.Label>
                        </Col>
                        <Col>
                            {/* {this.state.plantFault.plantName} */}
                        </Col>
                      </Row>
                    </li>
                    <li>
                      <Row>
                      <Col>
                            <Form.Label>Conclusion Summary</Form.Label>
                        </Col>
                        <Col>
                            {/* {this.state.plantFault.plantName} */}
                        </Col>
                      </Row>
                    </li>
                    <li>
                      <Row>
                      <Col>
                            <Form.Label>Conclusion Summary Time</Form.Label>
                        </Col>
                        <Col>
                            {/* {this.state.plantFault.plantName} */}
                        </Col>
                      </Row>
                    </li>
                  </ol>
                  
              </div>
              </div>
              </Card.Body>
              </Card>
    );
  }
                    
}
export default SinglePage;