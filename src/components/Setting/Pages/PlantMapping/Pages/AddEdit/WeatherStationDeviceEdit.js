
import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { withRouter } from 'react-router-dom';
import 'react-picky/dist/picky.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { connect } from 'react-redux';
import DropDown from '../../../../../Common/DropDown';
import { getWeatherConfiguration, clearSettingPlantMapping, createUpdateWeatherDevice } from '../../../../../../actions/action-Settings';
import { getPlantByType } from "../../../../../../actions/moduleCleaningAnalysisActions";
import { Route } from 'react-router-dom';

class WeatherStationDeviceEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedPlanType: null,
            plantTypes: this.props.plantTypes,
            selectedPlantOptions: [],
            postData: this.props.location.wethStatDev,
            plantId: this.props.location && this.props.location.plantId? this.props.location.plantId : null
        };
    }

    componentDidMount() {
        // document.title = 'Plant Fault Data';
        // this.props.clearSettingPlantMapping();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            data: nextProps.data,
            plantTypes: nextProps.plantTypes,
            postData: nextProps.postData,
            plants: nextProps.plants
        });
    }

    handleChangeWeatherStationType(event) {
        const selectedValue = event.target.value;
        if (selectedValue !== this.state.selectedWeatherStationType) {
            this.setState({ selectedWeatherStationType: selectedValue });
        }
    }

    renderErrortext(fieldID, msg) {
        return (
            this.state.isSubmited === true && !this.state.postData[fieldID] && <p className="errorText" style={{ color: "#CC0000", display: "block", fontSize: "11px", marginTopop: "0.5em" }}>{msg}</p>
        )
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.postData != null) {
            this.props.createUpdateWeatherDevice({ input: this.state.postData, type: this.props.pageName });
            this.props.history.push('/setting/WeatherStationDevice');
        }

        this.setState({ isSubmited: true });
    }

    handleChange(event) {
        let _data = this.state.postData;
        _data[event.target.name] = event.target.value;
        this.setState({ postData: _data });
    }

    handleChangePlant(event) {
        const _data = this.state.postData;
        const selectedValue = event.target.value;
        if (selectedValue && selectedValue.plantId !== "-1") {
            _data[event.target.name] = selectedValue;
            this.setState({ postData: _data });
        }
    }

    handleChangeWeather(event) {
        const _data = this.state.postData;
        const selectedValue = event.target.value;
        _data[event.target.name] = selectedValue;
        this.setState({ postData: _data });
    }

    handleclick(event) {
        const _data = this.state.postData;
        _data[event.target.name] = event.target.id === "primaryYes" ? 0 : 1;
        this.setState({ postData: _data });
    }

    handleChangeWeatherType(event) {
        const _data = this.state.postData;
        const selectedValue = event.target.value;
        _data[event.target.name] = selectedValue;
        this.setState({ postData: _data });
    }



    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <div>
                    <Card className="add-fault-card">
                        <Card.Header as="h5">{this.props.pageName}</Card.Header>
                        <Card.Body>
                            <Row>
                                <Col></Col>
                                <Col>
                                    <Form.Label>Plant<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <select class="form-control" name="plantId" type="dropdown" onChange={(item) => this.handleChangePlant(item)}>
                                        {this.props.plantTypes && this.props.plantTypes.map((item, key) => {
                                            if (this.state.postData["plantId"] == item.plantId) {
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
                                <Col></Col>
                            </Row>
                            <Row>
                                <Col></Col>
                                <Col>
                                    <Form.Label>Weather Station<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <select class="form-control" name="weatherDeviceId" type="dropdown" onChange={(item) => this.handleChangeWeather(item)}>
                                        {this.props.weatherStationDevice && this.props.weatherStationDevice.map((item, key) => {
                                            if (this.state.postData && this.state.postData["weatherDeviceId"] == item.value) {
                                                return <option value={item.value} selected>{item.displayText}</option>
                                            }
                                            else {
                                                return <option value={item.value}>{item.displayText}</option>
                                            }
                                        }

                                        )}
                                    </select>
                                    {this.renderErrortext("weatherDeviceId", "The Plant field is required")}
                                </Col>
                                {/* <Col style={{ maxWidth: "15%", padding: "0" }}> 
                                    <DropDown
                                        className="top-search-input form-control"
                                        Name="weatherStationDevice"
                                        itemSource={this.props.weatherStationDevice}
                                        value={this.state.postData.weatherStationDevice}
                                        handleChange={(item) => this.handleChangeWeatherType(item)}
                                    />
                                </Col> */}
                                <Col></Col>
                            </Row>
                            <Row>
                                <Col></Col>
                                <Col>
                                    <Form.Label>Module Temperature Sensor- Top<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="topModuleTempSensor" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData&&this.state.postData.topModuleTempSensor? this.state.postData.topModuleTempSensor : null} />
                                    {this.renderErrortext("topModuleTempSensor", "The Module Temperature Sesor Top Field Is Required.")}
                                </Col>
                                <Col></Col>
                            </Row>
                            <Row>
                                <Col></Col>
                                <Col>
                                    <Form.Label>Module Temperature Sensor- Middle<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="middleModuleTempSensor" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData&&this.state.postData.middleModuleTempSensor? this.state.postData.middleModuleTempSensor : null} />
                                    {this.renderErrortext("middleModuleTempSensor", "The Module Temp Sensor Middle Field Is Required.")}
                                </Col>
                                <Col></Col>
                            </Row>
                            <Row>
                                <Col></Col>
                                <Col>
                                    <Form.Label>Module Temperature Sensor-End<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="endModuleTempSensor" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData&&this.state.postData.endModuleTempSensor? this.state.postData.endModuleTempSensor : null} />
                                    {this.renderErrortext("endModuleTempSensor", "The Module Temp Sensor - End Field Is Required.")}
                                </Col>
                                <Col></Col>
                            </Row>
                            <Row>
                                <Col></Col>
                                <Col>
                                    <Form.Label>Ambient Temperature Sensor- 1<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="ambientTempSensor1" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData&&this.state.postData.ambientTempSensor1? this.state.postData.ambientTempSensor1 : null} />
                                    {this.renderErrortext("ambientTempSensor1", "The Ambient Temp Sensor 1 Field Is Required.")}
                                </Col>
                                <Col></Col>
                            </Row>
                            <Row>
                                <Col></Col>
                                <Col>
                                    <Form.Label>Ambient Temperature Sensor- 2<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="ambientTempSensor2" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData&&this.state.postData.ambientTempSensor2? this.state.postData.ambientTempSensor2 : null} />
                                    {this.renderErrortext("ambientTempSensor2", "The Ambient Temp Sensor 2 Field Is Required.")}
                                </Col>
                                <Col></Col>
                            </Row>
                            <Row>
                                <Col></Col>
                                <Col>
                                    <Form.Label>Wind Speed Sensor<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="windSpeedSensor" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData&&this.state.postData.windSpeedSensor? this.state.postData.windSpeedSensor : null} />
                                    {this.renderErrortext("windSpeedSensor", "The Wind Speed Sensor Field Is Required.")}
                                </Col>
                                <Col></Col>
                            </Row>
                            <Row>
                                <Col></Col>
                                <Col>
                                    <Form.Label>Air Pressure Sensor<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="airPressureSensor" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData&&this.state.postData.airPressureSensor? this.state.postData.airPressureSensor : null} />
                                    {this.renderErrortext("airPressureSensor", "The Air Presssure Sensor Field Is Required.")}
                                </Col>
                                <Col></Col>
                            </Row>
                            <Row>
                                <Col></Col>
                                <Col>
                                    <Form.Label>Humidity Sensor<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="humiditySensor" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData&&this.state.postData.humiditySensor? this.state.postData.humiditySensor : null} />
                                    {this.renderErrortext("humiditySensor", "The Humidy Sensor Field Is Required.")}
                                </Col>
                                <Col></Col>
                            </Row>
                            <Row>
                                <Col></Col>
                                <Col>
                                    <Form.Label>Irradiation At Horizontal<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="horizontal" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData&&this.state.postData.horizontal? this.state.postData.horizontal : null} />
                                    {this.renderErrortext("horizontal", "The Irradiation at Horizontal Field Is Required.")}
                                </Col>
                                <Col></Col>
                            </Row>
                            <Row>
                                <Col></Col>
                                <Col>
                                    <Form.Label>Irradiation At Array Tilt<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="arrayTilt" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData&&this.state.postData.arrayTilt? this.state.postData.arrayTilt : null} />
                                    {this.renderErrortext("arrayTilt", "The array tilt Field Is Required.")}
                                </Col>
                                <Col></Col>
                            </Row>
                            <Row>
                                <Col></Col>
                                <Col md={2}>
                                    <Button type="submit" variant="primary" size="md" block>Submit</Button>
                                </Col>
                                <Route render={({ history }) => (
                                    <Col md={2}>
                                        <Button variant="primary" size="md" onClick={() => { history.push('/setting/WeatherStationDevice') }} block>Back</Button>
                                    </Col>
                                )} />
                                <Col></Col>
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
        pageName: props.location.wethStatDev ? props.location.wethStatDev.weatherDeviceId ? "Edit Weather Station" : "Add Weather Station" : null,
        plantsByType: state.plants.plantsByType,
        plantTypes: state.projectTypes.plantTypes,
        plants: state.plants.plants,
        weatherStationType: [{ displayText: "Pyranometer", value: "Pyranometer" }, { displayText: "Sensorbox", value: "Sensorbox" }, { displayText: "Webbox", value: "Webbox" }],
        weatherStationDevice: [{ displayText: "Pyranometer", value: "1" }, { displayText: "Sensorbox", value: "2" }, { displayText: "Webbox", value: "3" }],
        data: state.SettingsReducer.data,
        submitedFields: ["airPressureSensor", "ambientTempSensor1","ambientTempSensor2","arrayTilt",
    ]

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getWeatherConfiguration: (plantIds) => dispatch(getWeatherConfiguration(plantIds)),
        getPlantByType: (plantsByType) => dispatch(getPlantByType(plantsByType)),
        clearSettingPlantMapping: () => dispatch(clearSettingPlantMapping()),
        createUpdateWeatherDevice: (data) => dispatch(createUpdateWeatherDevice(data))
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WeatherStationDeviceEdit));