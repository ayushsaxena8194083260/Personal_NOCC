import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Route } from 'react-router-dom';
// import ComponentAffected from '../Common/ComponentAffected';
//const previewImg = require('../../noRecordGraph.png');

class PlantFaultDataAddEdit extends Component {

    constructor(props) {
        super(props);

        this.state = {
            plants: this.props.plants,
            postData1: this.props.plantFault,
            isSubmited: false,
            questions: [''],
            component_affected: [""],
            postData: {
                "actionTaken": this.props.plantFault.actionTaken,
                "affectedCapacity": this.props.plantFault.affectedCapacity,
                "alertType": "",
                "componentAffected": this.props.plantFault.componentAffected,
                "contactPerson": "",
                "countOh": this.props.plantFault.countOh,
                "date": this.props.plantFault.date,
                "duration": "00:00:00",
                "enteredBy": 0,
                "equipmentAffected": this.props.plantFault.equipmentAffected,
                "equipmentsAffected": "",
                "equipmentsAffectedDetail": "",
                "errorCode": this.props.plantFault.errorCode,
                "faultAnalysis": "",
                "faultId": this.props.plantFault.faultId,
                "faultReason": this.props.plantFault.faultReason,
                "instantMeasures": "",
                "isBackfilled": 0,
                "isPublished": 0,
                "kwhLost": 0,
                "loadAffected": 0,
                "manpowerRequired": "",
                "manufacturer": "",
                "moduleTempOh": this.props.plantFault.moduleTempOh,
                "noticeBy": this.props.plantFault.noticeBy,
                "plantId": this.props.plantFault.plantId,
                "preventionSteps": "",
                "refId": 0,
                "remarks": "",
                "resolveTime": "2020-01-01T04:49:39.916Z",
                "stopTime": this.props.plantFault.stopTime,
                "tiltIrradiationOh": this.props.plantFault.tiltIrradiationOh,
                "time": this.props.plantFault.time,
                "toolsUsed": "",
                "visualSign": ""
            }
        }
        console.log(this.state)
        this.hanldChange = this.handleChange.bind(this);
        // this.addComponentAffected = this.addComponentsAffected.bind(this);
        // this.removeComponentsAffected = this.removeComponentsAffected.bind(this);
        // this.handleOnChangeforComponentsAffected = this.handleOnChangeforComponentsAffected.bind(this);
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

    // add(){

    //     let _data = this.state.questions;

    //     this.setState({ postData: _data });
    // }

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

    componentDidMount() {
        // document.title = 'Plant Fault Data';
        if (this.state.postData && this.state.postData.length > 0 && this.state.postData["plantTypes"] && this.state.postData["plantTypes"] !== "SELECT PLANT TYPE") {
            this.props.getPlantByType(this.state.postData["plantTypes"]);
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps,"nextProps")
        if (nextProps !== null) {
            this.setState({ plants: nextProps.plants })
        }
    }

    timeValidation() {
        if (this.state.postData["time"] && this.state.postData["stopTime"]) {
            const startTime = this.state.postData["time"];
            const endTime = this.state.postData["stopTime"];
            if (Date.parse("01/01/2019 " + endTime) < Date.parse("01/01/2019 " + startTime)) {
                alert("Stop time should be greater than start time.");
                return false;
            }
            return true;
        }
        return false;
    }
    fieldValid() {
        let inValid = false;

        this.props.submitedFields.map((item) => {
            if (!this.state.postData[item]) {
                inValid = true;
            }
        })
        return inValid;
    }
    setDate(sTime) {
        const startTime = sTime;
        const date = this.state.postData["date"];
        const endTime = this.state.postData["stopTime"];
        return new Date(Date.parse(date + " " + startTime));
    }

    handleChangeTime(time, name) {
        if (time) {
            let _time = this.setDate(time);
            _time = new Date(_time.toString().split('GMT')[0] + ' UTC').toISOString().split('.')[0];
            let _postData = this.state.postData;
            _postData[name] = _time;
            this.setState({ postData: _postData });
        }
    }


    onSubmit = (e) => {
        this.state.postData.componentAffected =this.state.questions.toString()
        e.preventDefault();
        this.handleChangeTime(this.state.postData.time, "time"); 
        // this.handleChangeTime(this.state.postData.stopTime, "stopTime");
        if (this.state.postData.time){
            this.state.postData.time =  this.state.postData.time.toString().replace('T', ' ')
        }

// if (this.state.postData.stopTime){
//     this.state.postData.stopTime = this.state.postData.stopTime + ":00"
// }
        if (this.state.postData !== null && this.timeValidation() === true && this.fieldValid() === false) {
            this.props.createOrUpdatePlantFaultData(this.state.postData, this.props.pageName);
            this.props.history.push({ pathname: '/PlantFaultData' });
        }

        this.setState({ isSubmited: true });
    }


    handleChangePlantType(event) {
        const _data = this.state.postData;
        const selectedValue = event.target.value;
        if (selectedValue) {
            _data[event.target.name] = selectedValue;
            this.props.getPlantByType(selectedValue);
            this.setState({ postData: _data });
        }
    }
    handleChangePlant(event) {
        const _data = this.state.postData;
        const selectedValue = event.target.value;
        if (selectedValue && selectedValue.plantId !== "-1") {
            _data[event.target.name] = selectedValue;
            this.setState({ postData: _data });
        }
    }



    handleChangeForNumber(event) {
        let _data = this.state.postData;
        const re = /^[0-9\b]+$/;
        if (event.target.value === '' || re.test(event.target.value)) {
            _data[event.target.name] = event.target.value;
        }
        this.setState({ postData: _data });
    }

    handleChangeForDecimal(event) {
        let _data = this.state.postData;
        const re = /^[0-9]+\.?[0-9]*$/;
        if (event.target.value === '' || re.test(event.target.value)) {
            _data[event.target.name] = event.target.value;
        }
        this.setState({ postData: _data });

    }
    handleChange(event, index) {
        // this.state.component_affected[index] = event.target.value;
        // this.setState({ component_affected: this.state.component_affected });
        let _data = this.state.postData;
        _data[event.target.name] = event.target.value;
        this.setState({ postData: _data });
    }
    // handelclick() {
    //     this.setState({ component_affected: [...this.state.component_affected, ""] })
    //     console.log(this.state.component_affected, '####')

    // }
    // handelRemove(index) {
    //     this.state.component_affected.splice(index, 1)
    //     this.setState({ component_affected: this.state.component_affected });
    //     console.log(this.state.component_affected, '####')
    // }
    // handleChangePlant(event) {
    //     const _data = this.state.postData;
    //     const selectedValue = event.target.value;
    //     if (selectedValue && selectedValue.plant_id !== "-1") {
    //         _data[event.target.name] = selectedValue;
    //         this.setState({ postData: _data });
    //     }
    // }

    renderErrortext(fieldID, msg) {
        return (
            this.state.isSubmited === true && !this.state.postData[fieldID] && <p className="errorText" style={{ color: "#CC0000", display: "block", fontSize: "11px", marginTopop: "0.5em" }}>{msg}</p>
        )
    }

    // renderComponentsAffected() {

    //     return <div>{this.state.component_affected && this.state.component_affected.length > 0 && this.state.component_affected.map((item, index) => {
    //         return <div>
    //             <input type="text" name={"component_affected" + index} value={item} onChange={val => this.handleOnChangeforComponentsAffected(val, index)} />
    //              <button type="button" onChange={this.addComponentsAffected(this,index)}>+</button>

    //             {(index !== 0) && <button type="button" className="remove_button" title="Remove" onChange={this.removeComponentsAffected(index)}>-</button>}
    //         </div>
    //     })}</div>


    // }

    // handleOnChangeforComponentsAffected(index,value){
    //     let _items = this.state.component_affected;       
    //     _items[index] = value;
    //     this.setState({ component_affected: _items });
    // }

    // addComponentsAffected(index) {        
    //    // this.handleOnChangeforComponentsAffected("", index);
    // }

    // removeComponentsAffected() {

    // }

    render() {
        return (
            <form onSubmit={this.onSubmit} novalidate>
                <div>
                    <Card className="add-fault-card">
                        <Card.Header as="h5">{this.props.pageName}</Card.Header>
                        <Card.Body>
                            <Row>
                                <Col>
                                    <Form.Label>Plant Type<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <select className="top-search-input form-control" name="plantTypes" width='300px' onChange={(item) => this.handleChangePlantType(item)}>
                                        {/* <option ></option> */}
                                        {this.props.plantTypes && this.props.plantTypes.map((item, key) => {
                                            //if (this.state.postData["plantTypes"] === "item") {
                                            if (this.props.selectedPlantType === item) {
                                                return <option key={item} selected>{item}</option>
                                            }
                                            else {
                                                return <option key={item} >{item}</option>
                                            }
                                        }
                                        )}
                                    </select>
                                </Col>
                                <Col>
                                    <Form.Label>Plant<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <select class="form-control" name="plantId" type="dropdown" onChange={(item) => this.handleChangePlant(item)}>
                                        {this.state.plants && this.state.plants.map((item, key) => {
                                            if (this.state.postData["plantId"] === item.plantId) {
                                                return <option value={item.plantId} selected>{item.plantName}</option>
                                            }
                                            else {
                                                return <option value={item.plantId}>{item.plantName}</option>
                                            }
                                        }

                                        )}
                                    </select>
                                    {this.renderErrortext("plantId", "The Plant field is required")}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>Main Equipment Affected<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    {/* <Form.Control name="equipmentAffected" type="select" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.equipmentAffected} /> */}
                                    <select class="form-control" name="equipmentAffected" type="dropdown" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.equipmentAffected}>
                                        <option value="">Select Equipment</option>
                                        <option value="Module "> Module  </option>
                                        <option value="Harness"> Harness </option>
                                        <option value="String"> String </option>
                                        <option value="Combiner Box"> Combiner Box </option>
                                        <option value="DC Cable"> DC Cable </option>
                                        <option value="Inverter"> Inverter </option>
                                        <option value="Auxiliary Transformer"> Auxiliary Transformer </option>
                                        <option value="AC Cable (Inverter To Transformer)"> AC Cable (Inverter To Transformer) </option>
                                        <option value="Inverter Transformer"> Inverter Transformer </option>
                                        <option value="AC Cable"> AC Cable </option>
                                        <option value="RMU"> RMU </option>
                                        <option value="ICOG"> ICOG </option>
                                        <option value="VCB(Indoor)"> VCB(Indoor) </option>
                                        <option value="Control &amp; Relay Panel"> Control &amp; Relay Panel </option>
                                        <option value="RTCC"> RTCC </option>
                                        <option value="Battery  Bank"> Battery  Bank </option>
                                        <option value="Power Transformer"> Power Transformer </option>
                                        <option value="Lighting Arrestor"> Lighting Arrestor </option>
                                        <option value="CT(Protection)"> CT(Protection) </option>
                                        <option value="PT(Protection)"> PT(Protection) </option>
                                        <option value="CT(Metering)"> CT(Metering) </option>
                                        <option value="PT(Metering)"> PT(Metering) </option>
                                        <option value="Isolator"> Isolator </option>
                                        <option value="Post Insulator"> Post Insulator </option>
                                        <option value="SF6 Breker"> SF6 Breker </option>
                                        <option value="Busbar"> Busbar </option>
                                        <option value="ABT Meter"> ABT Meter </option>
                                        <option value="Transmission Line"> Transmission Line </option>
                                        <option value="SCADA"> SCADA </option>
                                    </select>
                                    {this.renderErrortext("equipmentAffected", "The Main Equipment Affected Field Is Required.")}
                                    {/* <span style={{ color: "red" }}>Ex: Transformer, Inverter & RMU Etc.</span> */}
                                </Col>
                                <Col>
                                </Col>
                                <Col>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>Error Code<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="errorCode" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.errorCode} />
                                    {this.renderErrortext("errorCode", "The Error Code Field Is Required.")}
                                </Col>
                                <Col>
                                    <Form.Label>Date Of Occurrence<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="date" type="date" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.date} />
                                    {this.renderErrortext("date", "The Date Field Is Required.")}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>Affected Capacity<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="affectedCapacity" type="text" onChange={(item) => this.handleChangeForDecimal(item)} value={this.state.postData && this.state.postData.affectedCapacity} pattern="^-?[0-9]\d*\.?\d*$" />
                                    {this.renderErrortext("affectedCapacity", "The Affected Capacity Field Is Required.")}
                                </Col>
                                <Col>
                                    <Form.Label>Start Time Of Occurrence<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="time" type="time" onChange={(item) => { this.handleChange(item) }} value={this.state.postData && this.state.postData.time} />
                                    {this.renderErrortext("time", "The start time Field Is Required.")}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>Stop Time<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="stopTime" type="time" step="2" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.stopTime} />
                                    {this.renderErrortext("stopTime", "The Stop Time Field Is Required.")}
                                </Col>
                                <Col>
                                    <Form.Label>Count<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="countOh" type="number" onChange={(item) => this.handleChangeForNumber(item)} value={this.state.postData && this.state.postData.countOh ? this.state.postData.countOh : null} />
                                    {this.renderErrortext("countOh", "The Count Field Is Required.")}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>Fault Reason<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="faultReason" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.faultReason} />
                                    {this.renderErrortext("faultReason", "The Fault Reason Field Is Required.")}
                                </Col>
                                <Col>
                                    <Form.Label>Irradiation At Array Tilt<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="tiltIrradiationOh" type="text" onChange={(item) => this.handleChangeForDecimal(item)} value={this.state.postData && this.state.postData.tiltIrradiationOh} pattern="^-?[0-9]\d*\.?\d*$" />
                                    {this.renderErrortext("tiltIrradiationOh", "The Irradiation At Array Tilt Field Is Required.")}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>Module Temp<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="moduleTempOh" type="text" onChange={(item) => this.handleChangeForDecimal(item)} value={this.state.postData && this.state.postData.moduleTempOh} pattern="^-?[0-9]\d*\.?\d*$" />
                                    {this.renderErrortext("moduleTempOh", "The Module Temp Field Is Required.")}
                                </Col>
                                <Col>
                                    <Form.Label>Notice By <span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="noticeBy" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.noticeBy} />
                                    {this.renderErrortext("noticeBy", "The Notice Field Is Required.")}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>Component Affected</Form.Label>
                                </Col>
                                <Col>
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

                                {/* <Col> */}
                                {/* <Form.Control name="component_affected" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.component_affected} />
                                    <button class="btn btn-success add-more" type="button"><i class="glyphicon glyphicon-plus"></i> Add</button>
                                    <Button variant="primary" size="md" block class="remove_button" onclick = {() => this.addComponentAffected()} title="Remove">+</Button> */}
                                {/* <ComponentAffected /> */}
                                {/* {this.renderComponentsAffected()} */}
                                {/* <Form.Control type/> */}
                                {/* </Col> */}
                                <Col>
                                    <Form.Label>Action Taken<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="actionTaken" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.actionTaken} />
                                    {this.renderErrortext("actionTaken", "The Action Taken Field Is Required.")}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                </Col>
                                <Col md={2}>
                                    <Button type="submit" variant="primary" size="md" block>Submit</Button>
                                </Col>
                                <Route render={({ history }) => (
                                    <Col md={2}>
                                        <Button variant="primary" size="md" onClick={() => { history.push('/PlantFaultData') }} block>Back</Button>
                                    </Col>
                                )} />
                                <Col>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </div>
            </form>
        )
    }
}



export default PlantFaultDataAddEdit;