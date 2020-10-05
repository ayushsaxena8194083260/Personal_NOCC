import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Route } from 'react-router-dom';

class WeatherStationAddEdit extends Component {

    constructor(props) {
        super(props);

        this.state = {
            plants: this.props.plants,
            weatherStationName:this.props.weatherStationName,
            postData: this.props.weatherStation,
            isSubmited: false
        }

        this.hanldChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        // document.title = 'Plant Fault Data';
        if (this.state.postData && this.state.postData.length > 0 && this.state.postData["plantTypes"] && this.state.postData["plantTypes"] !== "SELECT PLANT TYPE") {
            this.props.getPlantByType(this.state.postData["plantTypes"]);
        }
        if (this.state.postData && this.state.postData.length > 0 && this.state.postData["weatherStationName"] && this.state.postData["weatherStationName"] !== "SELECT WEATHER STATION") {
            this.props.getWeatherStationByPlantId(this.state.postData["weatherStationName"]);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== null) {
            this.setState({ plants: nextProps.plants })
            this.setState({weatherStationName: nextProps.weatherStationName})
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
        if (this.state.postData !== null && this.timeValidation() === true && this.fieldValid() === false) {
            this.props.createOrUpdateWeatherStationDailyData({weatherStation:this.state.postData, type:this.props.pageName});
            //alert('PLANT FAULT DATA has been created successfully');
            this.props.history.push('/weatherStationDailyData');
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
            this.props.getWeatherStationByPlantId(selectedValue);
            this.setState({ postData: _data });
        }
    }

    heandleChangeWS(event) {
        const _data = this.state.postData;
        const selectedValue = event.target.value;
        if (selectedValue && selectedValue.weatherStationId !== "-1") {
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

    splitDate(editDate){
        const _editDate = editDate.substr(0,10);
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
                                    <select className="form-control" name="plantTypes" width='300px' onChange={(item) => this.handleChangePlantType(item)}>
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
                                    <Form.Label>Weather Station<span className="form-required">*</span></Form.Label>
                                </Col>
                               <Col>
                               <select class="form-control" name="weatherStationId" type="dropdown" onChange={(item) => this.heandleChangeWS(item)}>
                                        {this.state.weatherStationName && this.state.weatherStationName.map((item, key) => {
                                            if (this.state.postData["weatherStationId"] === item.weatherStationId) {
                                                return <option value={item.weatherStationId} selected>{item.weatherStationName}</option>
                                            }
                                            else {
                                                return <option value={item.weatherStationId}>{item.weatherStationName}</option>
                                            }
                                        }

                                        )}
                                    </select>
                                    {this.renderErrortext("weatherStationId", "The Weather Station Name field is required")}
                                        
                                </Col>
                                <Col>
                                    <Form.Label>Date<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="date" type="date" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.date? this.splitDate(this.state.postData.date) : null } />
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
                                    <Form.Label>Irradiation At Horizontal<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="horizontalIrradiationWh" type="text" onChange={(item) => this.handleChangeForDecimal(item)} value={this.state.postData && this.state.postData.horizontalIrradiationWh} pattern="^-?[0-9]\d*\.?\d*$" />
                                    {this.renderErrortext("horizontalIrradiationWh", "The Irradiation At Horizontal Field Is Required.")}
                                </Col>

                                <Col>
                                    <Form.Label>Irradiation At Array Tilt<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="tiltIrradiationWh" type="text" onChange={(item) => this.handleChangeForDecimal(item)} value={this.state.postData && this.state.postData.tiltIrradiationWh} pattern="^-?[0-9]\d*\.?\d*$" />
                                    {this.renderErrortext("tiltIrradiationWh", "The Irradiation At Array Tilt Field Is Required.")}
                                </Col>

                            </Row>

                            <Row>
                                <Col>
                                    <Form.Label>Module Temp During Inverter<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="moduleTempWh" type="text" onChange={(item) => this.handleChangeForDecimal(item)} value={this.state.postData && this.state.postData.moduleTempWh} pattern="^-?[0-9]\d*\.?\d*$" />
                                    {this.renderErrortext("moduleTempWh", "The Module Temp During Inverter Field Is Required.")}
                                </Col>

                                <Col>
                                    <Form.Label>Module Temp Averaged 24<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="moduleTemp24" type="text" onChange={(item) => this.handleChangeForDecimal(item)} value={this.state.postData && this.state.postData.moduleTemp24} pattern="^-?[0-9]\d*\.?\d*$" />
                                    {this.renderErrortext("moduleTemp24", "The Module temp 24 Field Is Required.")}
                                </Col>

                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>Ambient Temp During Inverter<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="ambientTempWh" type="text" onChange={(item) => this.handleChangeForDecimal(item)} value={this.state.postData && this.state.postData.ambientTempWh} pattern="^-?[0-9]\d*\.?\d*$" />
                                    {this.renderErrortext("ambientTempWh", "The Ambient temp Field Is Required.")}
                                </Col>

                                <Col>
                                    <Form.Label>Ambient Temp Averaged 24<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="ambientTemp24" type="text" onChange={(item) => this.handleChangeForDecimal(item)} value={this.state.postData && this.state.postData.ambientTemp24} pattern="^-?[0-9]\d*\.?\d*$" />
                                    {this.renderErrortext("ambientTemp24", "The Ambient Temp 24 Field Is Required.")}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>Wind Speed<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="windSpeed24" type="text" onChange={(item) => this.handleChangeForDecimal(item)} value={this.state.postData && this.state.postData.windSpeed24} pattern="^-?[0-9]\d*\.?\d*$" />
                                    {this.renderErrortext("windSpeed24", "The Wind Speed 24 Field Is Required.")}
                                </Col>

                                <Col>
                                    <Form.Label>Count<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="count" type="text" onChange={(item) => this.handleChangeForDecimal(item)} value={this.state.postData && this.state.postData.count} pattern="^-?[0-9]\d*\.?\d*$" />
                                    {this.renderErrortext("count", "The Count Field Is Required.")}
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
                                        <Button variant="primary" size="md" onClick={() => { history.push('/weatherStationDailyData') }} block>Back</Button>
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

export default WeatherStationAddEdit;