import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import '../../styles/plant/plantAddEdit.scss';
import { Route } from 'react-router-dom';

class InverterDailyAddEdit extends Component {

    constructor(props) {
        super(props);

        this.state = {
            plants: this.props.plants,
            inverterName: this.props.inverterName,
            postData1: this.props.inverterDaily,
            isSubmited: false,
            postData: {
                    "acRealPower": this.props.inverterDaily.acRealPower,
                    "bitFlag": 0,
                    "calcEToday": 0,
                    "count": this.props.inverterDaily.count,
                    "date": this.props.inverterDaily.date,
                    "dcPower": this.props.inverterDaily.dcPower,
                    "eTotal": this.props.inverterDaily.eTotal,
                    "endTime": this.props.inverterDaily.endTime,
                    "energyToday": this.props.inverterDaily.energyToday,
                    "enteredBy": 0,
                    "inverterDailyDataId": this.props.inverterDaily.inverterDailyDataId,
                    "inverterId": this.props.inverterDaily.inverterId,
                    "isBackfilled": 0,
                    "plantId": this.props.inverterDaily.plantId,
                    "remarks": "",
                    "startTime": this.props.inverterDaily.startTime
            }
        }

        this.hanldChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        // document.title = 'Plant Fault Data';
        if (this.state.postData && this.state.postData.length > 0 && this.state.postData["plantTypes"] && this.state.postData["plantTypes"] !== "SELECT PLANT TYPE") {
            this.props.getPlantByType(this.state.postData["plantTypes"]);
        }
        if (this.state.postData && this.state.postData.length > 0 && this.state.postData["inverterName"] && this.state.postData["inverterName"] !== "SELECT INVERTER") {
            this.props.getInverterByPlantId(this.state.postData["inverterName"]);
        }

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== null) {
            this.setState({ plants: nextProps.plants })
            this.setState({ inverterName: nextProps.inverterName })
        }
    }

    timeValidation() {
        if (this.state.postData["startTime"] && this.state.postData["endTime"]) {
            const startTime = this.state.postData["startTime"];
            const endTime = this.state.postData["endTime"];
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
    onSubmit = (e) => {
        e.preventDefault();
        // let sTime = this.state.postData.startTime.setSeconds(00);
        // let eTime = this.state.postData.endTime.setSeconds(00);
        // let _postData = this.state.postData;
        // _postData["startTime"] = sTime;
        // this.setState({ postData: _postData });
        // let _postData1 = this.state.postData;
        // _postData1["endTime"] = eTime;
        // this.setState({ postData: _postData1});
        if (this.state.postData !== null && this.timeValidation() === true && this.fieldValid() === false) {
            this.props.createOrUpdateInverterDailyData({inverterDaily : this.state.postData, type: this.props.pageName});
            //alert('PLANT FAULT DATA has been created successfully');
            this.props.history.push('/inverterDaily');
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
            this.props.getInverterByPlantId(selectedValue);
            this.setState({ postData: _data });
        }
    }

    heandleChangeIN(event) {
        const _data = this.state.postData;
        const selectedValue = event.target.value;
        if (selectedValue && selectedValue.inverterId !== "-1") {
            _data[event.target.name] = selectedValue;
            this.setState({ postData: _data });
        }
    }


    handleChange(event) {
        let _data = this.state.postData;
        _data[event.target.name] = event.target.value;
        this.setState({ postData: _data });
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

    splitDate(editDate) {
        const _editDate = editDate.substr(0, 10);
        return _editDate;
    }



    renderErrortext(fieldID, msg) {
        return (
            this.state.isSubmited === true && !this.state.postData[fieldID] && <p className="errorText" style={{ color: "#CC0000", display: "block", fontSize: "11px", marginTopop: "0.5em" }}>{msg}</p>
        )
    }


    render() {
        return (
            <form onSubmit={this.onSubmit}>
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
                                        {this.props.plantTypes && this.props.plantTypes.map((item, key) => {
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
                                    <Form.Label>Plant Name<span className="form-required">*</span></Form.Label>
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
                                    <Form.Label>Inverter<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <select class="form-control" name="inverterId" type="dropdown" onChange={(item) => this.heandleChangeIN(item)}>
                                        {this.state.inverterName && this.state.inverterName.map((item, key) => {
                                            if (this.state.postData["inverterId"] === item.inverterId) {
                                                return <option value={item.inverterId} selected>{item.inverterName}</option>
                                            }
                                            else {
                                                return <option value={item.inverterId}>{item.inverterName}</option>
                                            }
                                        }

                                        )}
                                    </select>
                                    {this.renderErrortext("inverterId", "The Inverter Name field is required")}
                                </Col>
                                <Col>
                                    <Form.Label>Date<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="date" type="date" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.date ? this.splitDate(this.state.postData.date) : null} />
                                    {this.renderErrortext("date", "The Date Field Is Required.")}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>Start Time<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="startTime" type="time" step="2" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.startTime} />
                                    {this.renderErrortext("startTime", "The start time Field Is Required.")}
                                </Col>
                                <Col>
                                    <Form.Label>Stop Time<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="endTime" type="time" step="2" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.endTime} />
                                    {this.renderErrortext("endTime", "The Stop Time Field Is Required.")}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>Energy Today<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="energyToday" type="text" onChange={(item) => this.handleChangeForDecimal(item)} value={this.state.postData && this.state.postData.energyToday} pattern="^-?[0-9]\d*\.?\d*$" />
                                    {this.renderErrortext("energyToday", "The Energy Today Field Is Required.")}
                                </Col>
                                <Col>
                                    <Form.Label>Ac Real Power<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="acRealPower" type="text" onChange={(item) => this.handleChangeForDecimal(item)} value={this.state.postData && this.state.postData.acRealPower} pattern="^-?[0-9]\d*\.?\d*$" />
                                    {this.renderErrortext("acRealPower", "AC Real Power Field Is Required.")}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>Dc Power<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="dcPower" type="text" onChange={(item) => this.handleChangeForDecimal(item)} value={this.state.postData && this.state.postData.dcPower} pattern="^-?[0-9]\d*\.?\d*$" />
                                    {this.renderErrortext("dcPower", "DC Power Field Is Required.")}
                                </Col>
                                <Col>
                                    <Form.Label>Energy Total<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="eTotal" type="text" onChange={(item) => this.handleChangeForDecimal(item)} value={this.state.postData && this.state.postData.eTotal} pattern="^-?[0-9]\d*\.?\d*$" />
                                    {this.renderErrortext("eTotal", "Energy Total Field Is Required.")}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>Count<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="count" type="text" onChange={(item) => this.handleChangeForDecimal(item)} value={this.state.postData && this.state.postData.count} pattern="^-?[0-9]\d*\.?\d*$" />
                                    {this.renderErrortext("count", "The Count Field Is Required.")}
                                </Col>
                                <Col>
                                </Col>
                                <Col>
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
                                        <Button variant="primary" size="md" onClick={() => { history.push('/inverterDaily') }} block>Back</Button>
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

export default InverterDailyAddEdit;