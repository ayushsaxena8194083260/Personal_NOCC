import React, { Component } from 'react';
// import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import "../../styles/plant/plantFaultIncident.scss"
import { createOrUpdatePlantFaultIncidentData, getPlantFaultIncidentData } from '../../actions/PlantFaultDataActions'

class PlantFaultIncidentComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            postData: props.IncidentData,
            plantFaultIncident: props.plantFault,
            questions: [''],
        }
    }

    componentDidMount() {
        // document.title = 'Plant Fault Data';
        if (this.props.faultID) {
            this.props.getPlantFaultIncidentData(this.props.faultID, this.props.plantId);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== null) {            
            this.setState({
                postData: nextProps.IncidentData,
                IncidentData: nextProps.IncidentData,
                plantFaultsIDYear: nextProps.plantFaultsIDYear
            })
        }
    }

        handleChange(event) {
            let _data = this.state.postData;
            _data[event.target.name] = event.target.value;
            this.setState({ postData: _data });
        }

        handleChangeFaultDB(event) {
            let data = this.state.postData;
            let _data = data["faultDb"]? data["faultDb"] : [];
            _data[event.target.name] = event.target.value;
            data["faultDb"] = _data;
            this.setState({ postData: data });
        }
        handleText = i => e => {
            let questions = [...this.state.questions]
            questions[i] = e.target.value
            this.setState({
                questions
            })
            console.log(this.state.questions, 'questions')
            // this.add();
        }
        handleDelete = i => e => {
            e.preventDefault()
            let questions = [
                ...this.state.questions.slice(0, i),
                ...this.state.questions.slice(i + 1)
            ]
            this.setState({
                questions
            })
        }
    
        addQuestion = e => {
            e.preventDefault()
            let questions = this.state.questions.concat([''])
            this.setState({
                questions
            })
        }
        onSubmit = (e) => {
            e.preventDefault();
            this.state.postData["sapreUsed"] =this.state.questions.toString()
            let data = this.state.postData;
            let _data = data["faultDb"]? data["faultDb"] : [];
            _data["faultId"] = this.props.faultID;
            _data["plantId"] = this.props.plantId;
            data["faultDb"] = {..._data};
            this.props.createOrUpdatePlantFaultIncidentData({...data}, "Add Incident");
            this.props.history.push('/PlantFaultData');
        }
        onGeneratePdf = (e) => {
            e.preventDefault();
            this.props.history.push('/pdfDownload');
        }
        render() {
            return (
                <form onSubmit={this.onSubmit} novalidate>
                    <div>

                        <Card className="add-plant-card">
                            <Card.Header as="h5">Incident Format</Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col>
                                        <Form.Label>Plant</Form.Label>
                                    </Col>
                                    <Col xs={4}>
                                        <Form.Control name="plantName" type="text" value={this.state.plantFaultIncident ? this.state.plantFaultIncident["plantName"] : null} />
                                    </Col>
                                    <Col>
                                        <Form.Label>Location</Form.Label>
                                    </Col>
                                    <Col xs={4}>
                                        {/* <Form.Control name="location" type="text" value={this.state.postData["location} /> */}
                                        <Form.Label>{this.state.plantFaultsIDYear? this.state.plantFaultsIDYear["location"] : null }</Form.Label>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Label>Incident Subject</Form.Label>
                                    </Col>
                                    <Col xs={4}>
                                        <Form.Control name="incidentSubject" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData["incidentSubject"]} />
                                    </Col>
                                    <Col>
                                        <Form.Label>Error Code</Form.Label>
                                    </Col>
                                    <Col xs={4}>
                                        <Form.Control name="errorCode" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData["errorCode"]} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Label>Fault Ref No.</Form.Label>
                                    </Col>
                                    <Col xs={4}>
                                        {/* <Form.Control name="faultRefNo" type="text" value={this.state.plantFault.faultRefNo} /> */}
                                        <Form.Label>{this.state.postData && this.state.postData.faultDb? this.state.postData.faultDb["refId"]: null}</Form.Label>
                                    </Col>
                                    <Col>
                                        <Form.Label>Severity/Urgency Of Incident</Form.Label>
                                    </Col>
                                    <Col xs={4}>
                                        <Form.Control name="severity" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData["severity"]} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Label>How Did It Come To Notice</Form.Label>
                                    </Col>
                                    <Col xs={4}>
                                        <Form.Control name="noticeBy" type="text" onChange={(item) => this.handleChangeFaultDB(item)} value={this.state.postData && this.state.postData.faultDb ? this.state.postData.faultDb["noticeBy"]: null} />
                                    </Col>
                                    <Col>
                                        <Form.Label>Date That It Was Brought To Notice</Form.Label>
                                    </Col>
                                    <Col xs={4}>
                                        <Form.Control name="date" type="date" onChange={(item) => this.handleChange(item)} value={this.state.postData["dateOccurance"]} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Label>Approximate Time Of Actual Occurrence</Form.Label>
                                    </Col>
                                    <Col xs={4}>
                                        <Form.Control name="time" type="text" onChange={(item) => this.handleChange(item)} value={this.state.plantFaultIncident ? this.state.plantFaultIncident["time"] : null} />
                                    </Col>
                                    <Col>
                                        <Form.Label>Visible Signs</Form.Label>
                                    </Col>
                                    <Col xs={4}>
                                        <Form.Control name="visibleSigns" type="text" onChange={(item) => this.handleChangeFaultDB(item)} value={this.state.postData && this.state.postData.faultDb ? this.state.postData.faultDb["visibleSigns"]: null} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Label>Measures Undertaken Instantly For Damage Control</Form.Label>
                                    </Col>
                                    <Col xs={4}>
                                        <Form.Control name="damageControl" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData["damageControl"]} />
                                    </Col>
                                    <Col>
                                        <Form.Label>Further Steps To Be Undertaken</Form.Label>
                                    </Col>
                                    <Col xs={4}>
                                        <Form.Control name="steps" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData["steps"]} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Label>Possible Causes And RCA</Form.Label>
                                    </Col>
                                    <Col xs={4}>
                                        <Form.Control name="rcaCauses" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData["rcaCauses"]} />
                                    </Col>
                                    <Col>
                                        <Form.Label>Possible Effects Due To This Fault</Form.Label>
                                    </Col>
                                    <Col xs={4}>
                                        <Form.Control name="faultEffect" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData["faultEffect"]} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Label>Mitigation / Future Prevention</Form.Label>
                                    </Col>
                                    <Col xs={4}>
                                        <Form.Control name="mitigation" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData["mitigation"]} />
                                    </Col>
                                    <Col>
                                        <Form.Label>Downtime</Form.Label>
                                    </Col>
                                    <Col xs={4}>
                                        {/* <Form.Control name="downtime" type="text" value={this.state.plantFault.downTime} /> */}
                                        <Form.Label style={{marginTop:'8px'}}>{this.state.plantFaultIncident? this.state.plantFaultIncident["affectedTimeInHrs"]: null}</Form.Label>
                                    </Col>

                                </Row>
                                <Row>

                                    <Col>
                                        <Form.Label>Load Affected</Form.Label>
                                    </Col>
                                    <Col xs={4}>
                                        {/* <Form.Control name="loadAffected" type="text" value={this.state.plantFault.loadAffected} /> */}
                                        <Form.Label>{this.state.postData && this.state.postData.faultDb ? this.state.postData.faultDb["loadAffected"]: null} </Form.Label>
                                    </Col>
                                    <Col>
                                        <Form.Label>Feedback To O&M</Form.Label>
                                    </Col>
                                    <Col xs={4}>
                                        <Form.Control name="feedbackOnm" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData["feedbackOnm"]} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Label>Feedback To Project / Construction</Form.Label>
                                    </Col>
                                    <Col xs={4}>
                                        <Form.Control name="feedbackProject" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData["feedbackProject"]} />
                                    </Col>
                                    <Col>
                                        <Form.Label>Man Hours Required</Form.Label>
                                    </Col>
                                    <Col xs={4}>
                                        <Form.Control name="manHours" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData["manHours"]} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Label>Name Of Person / S Involved In Fault Resolution (Azure)</Form.Label>
                                    </Col>
                                    <Col xs={4}>
                                        <Form.Control name="faultResolution" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData["faultResolution"]} />
                                    </Col>
                                    <Col>
                                        <Form.Label>Tools Required</Form.Label>
                                    </Col>
                                    <Col xs={4}>
                                        <Form.Control name="toolsRequired" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData["toolsRequired"]} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Label>Spare Used</Form.Label>
                                    </Col>
                                    <Col xs={4}>
                                    {this.state.questions.map((question, index) => (
                                        <span key={index}>
                                            <input
                                                type="text"
                                                onChange={this.handleText(index)}
                                                value={question}
                                            />
                                            <Button variant='primary' onClick={this.handleDelete(index)}>X</Button>
                                        </span>
                                    ))}
                                    <Button variant='primary' onClick={this.addQuestion}>+</Button>
                                </Col>
                                    {/* <Col xs={4}>
                                        <Form.Control name="sapreUsed" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData["sapreUsed"]} />
                                        <Form.Control name="sapreUsed" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData["sapreUsed"]} />
                                    </Col> */}
                                    <Col>
                                        <Form.Label>Replaced Item Were Available As Spare</Form.Label>
                                    </Col>
                                    <Col xs={4}>
                                        <Form>
                                            {['radio'].map(type => (
                                                <div key={`inline-${type}`} className="mb-3"  style={{marginTop:'8px'}}>
                                                    <Form.Check name="isRepItemAvlAsSpare" inline label="Yes" type={type} id={`inline-${type}-1`} checked={this.state.postData["isRepItemAvlAsSpare"] === "1"? true :false} />
                                                    <Form.Check name="isRepItemAvlAsSpare" inline label="No" type={type} id={`inline-${type}-2`} checked={this.state.postData["isRepItemAvlAsSpare"] !== "1"? true :false}/>
                                                  
                                                </div>
                                            ))}
                                        </Form>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Label>Parts Replaced (With Specification)</Form.Label>
                                    </Col>
                                    <Col xs={4}>
                                        <Form.Control name="partReplaced" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData["partReplaced"]} />
                                        <span id="allowedtyp" style={{ color: "red", fontSize: "10px" }}>Specification Should Be Of New Part</span>
                                    </Col>
                                    <Col>
                                        <Form.Label>Vendor Involved</Form.Label>

                                    </Col>
                                    <Col xs={4}>
                                        <Form.Control name="venderInvolved" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData["venderInvolved"]} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Label>Contact Person(Vendor)</Form.Label>
                                    </Col>
                                    <Col xs={4}>
                                        <Form.Control name="contactPerson" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData["contactPerson"]} />
                                    </Col>
                                    <Col>
                                        <Form.Label>Vendor Response Time Primary Response</Form.Label>
                                    </Col>
                                    <Col xs={4}>
                                        <Form.Control name="venderResponse" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData["venderResponse"]} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Label>Conclusion Summary</Form.Label>
                                    </Col>
                                    <Col xs={4}>
                                        <Form.Control name="summary" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData["summary"]} />
                                    </Col>
                                    <Col>
                                        <Form.Label>Conclusion Summary Time</Form.Label>
                                    </Col>
                                    <Col xs={4}>
                                        <Form.Control name="summaryTime" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData["summaryTime"]} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Label>Upload Root Cause Analysis(RCA - File)</Form.Label>
                                    </Col>
                                    <Col xs={4}>
                                        <Form.Control name="uploadRCA" type="file" />
                                    </Col>
                                    <Col>
                                        <Form.Label>Files Uploaded</Form.Label>
                                    </Col>
                                    <Col xs={4}>
                                    <Form.Label>Files Uploaded</Form.Label>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={1}>
                                    </Col>
                                    <Col md={1}>
                                    </Col>
                                    <Col md={3}>
                                        <Button variant="primary" size="md" block onClick={this.onSubmit}>Submit</Button>
                                    </Col>
                                    <Col md={3}>
                                        <Button variant="primary" size="md" block onClick={() => { this.props.history.push('/PlantFaultData') }}>Back</Button>
                                    </Col>
                                    <Col md={3}>
                                        <Button variant="primary" size="md" block onClick={this.onGeneratePdf}>Generate PDF</Button>
                                    </Col>
                                    <Col md={1}>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </div>
                </form>

            )
        }
    }

    const mapStateToProps = (state, props) => {
        return {
            faultID: props.location && props.location.plantFault ? props.location.plantFault["faultId"] : null,
            plantId: props.location && props.location.plantFault ? props.location.plantFault["plantId"] : null,
            plantFault: props.location && props.location.plantFault ? props.location.plantFault : [],
            IncidentData: state.projectTypes && state.projectTypes.incidentData ? state.projectTypes.incidentData : [],
            plantFaultsIDYear: state.projectTypes && state.projectTypes.plantFaultsIDYear ? state.projectTypes.plantFaultsIDYear : [],
            
        }
    }

    const mapDispatchToProps = (dispatch) => {
        return {
            createOrUpdatePlantFaultIncidentData: (plantFaultIncident) => dispatch(createOrUpdatePlantFaultIncidentData(plantFaultIncident)),
            getPlantFaultIncidentData: (faultID, plantID) => dispatch(getPlantFaultIncidentData(faultID, plantID))
        }
    }
    export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PlantFaultIncidentComponent));