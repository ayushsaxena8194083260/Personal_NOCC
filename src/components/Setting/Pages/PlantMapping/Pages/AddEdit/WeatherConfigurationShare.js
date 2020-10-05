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
import { getWeatherConfiguration, clearSettingPlantMapping, createUpdateWeather } from '../../../../../../actions/action-Settings';
import { getPlantByType } from "../../../../../../actions/moduleCleaningAnalysisActions";
import { Route } from 'react-router-dom';
import {getAllPlants} from "../../../../../../actions/PlantActions";

class WeatherConfigurationShare extends Component {
    constructor(props) {
        super(props);
        this.state = {
            plants: this.props.plantTypes,
            data: this.props.data,
            selectedPlanType: null,
            plantTypes: this.props.plantTypes,
            selectedPlantOptions: [],
            showPopUp: false,
            deleteID: null,
            // selectedWeatherStationType: this.props.location.WeatherConfiguration.weatherStationType,
            postData: this.props.location && this.props.location.WeatherConfiguration? this.props.location.WeatherConfiguration : {},
            plantId: this.props.location && this.props.location.plantId? this.props.location.plantId : null,
            weatherStationSerialNumber: this.props.location.weatherStationSerialNumber,
            weatherStationNumber: this.props.location.weatherStationNumber
        };
        this.state.postData.weatherStationSerialNumber = this.state.weatherStationSerialNumber;
        this.state.postData.weatherStationNumber = this.state.weatherStationNumber;
    }

    componentDidMount() {
        // document.title = 'Plant Fault Data';
        // this.props.clearSettingPlantMapping();
        const weatherStationSerialNumber = this.state.postData && this.state.postData.weatherStationNumber && this.state.postData.weatherStationNumber.split(" ").length>1 ? this.state.postData.weatherStationNumber.split(" ")[0] : null;
        const weatherStationNumber1 = this.state.postData && this.state.postData.weatherStationNumber && this.state.postData.weatherStationNumber.split(" ").length>1 ? this.state.postData.weatherStationNumber.split(" ")[1] : null;
        this.state.postData["weatherStationSerialNumber"] = weatherStationSerialNumber;
        this.state.postData["weatherStationNumber"] = weatherStationNumber1;
        // this.setState({postData["weatherStationSerialNumber"]: weatherStationSerialNumber, weatherStationNumber:weatherStationNumber })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            data: nextProps.data,
            plantTypes: nextProps.plantTypes,
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

    handleChangeForDecimal(event) {
        let _data = this.state.postData;
        const re = /^[0-9]+\.?[0-9]*$/;
        if (event.target.value === '' || re.test(event.target.value)) {
            _data[event.target.name] = event.target.value;
        }
        this.setState({ postData: _data });

    }

    onSubmit = (e) => {
        this.state.postData["weatherStationNumber"] = this.state.postData["weatherStationSerialNumber"] + " " + this.state.postData["weatherStationNumber"];
        this.state.postData["plantId"] = this.state.plantId;
        e.preventDefault();
        if (this.state.postData != null) {
            this.props.createUpdateWeather({ weatherConf: {...this.state.postData}, type: this.props.pageName });
            this.props.history.push('/setting/WeatherConfiguration');
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
                        <Card.Header as="h5">Weather Station</Card.Header>
                        <Card.Body>
                        <Row>
                            <Col></Col>
                                <Col>
                                    <Form.Label>Sharing Weather Plant <span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <select class="form-control" name="plantId" type="dropdown" onChange={(item) => this.handleChangePlant(item)}>
                                        {this.state.plants && this.state.plants.map((item, key) => {
                                            if (this.state.postData && this.state.postData["plantId"] === item.plantId) {
                                                return <option value={item.plantId} selected>{item.plantName}</option>
                                            }
                                            else {
                                                return <option value={item.plantId}>{item.plantName}</option>
                                            }
                                        }

                                        )}
                                    </select>
                                </Col>
                                <Col></Col>
                            </Row>
                            <Row>
                            <Col></Col>
                                <Col>
                                    <Form.Label>Deselect Shared Weather Plant <span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <select class="form-control" name="plantId" type="dropdown" onChange={(item) => this.handleChangePlant(item)}>
                                        {this.state.plants && this.state.plants.map((item, key) => {
                                            if (this.state.postData && this.state.postData["plantId"] === item.plantId) {
                                                return <option value={item.plantId} selected>{item.plantName}</option>
                                            }
                                            else {
                                                return <option value={item.plantId}>{item.plantName}</option>
                                            }
                                        }

                                        )}
                                    </select>
                                </Col>
                                <Col></Col>
                            </Row>
                            <Row>
                                <Col></Col>
                                <Col>
                                    <Form.Label>Weather Station Name<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="weatherStationName" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.weatherStationName} />
                                    {this.renderErrortext("weatherStationName", "The Weather Station Name Field Is Required.")}
                                </Col>
                                <Col></Col>
                            </Row>
                            <Row>
                                <Col></Col>
                                <Col>
                                    <Form.Label>Weather Station Serial Number<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="weatherStationSerialNumber" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.weatherStationSerialNumber && this.state.postData.weatherStationSerialNumber ? this.state.postData.weatherStationSerialNumber : null} />
                                    {this.renderErrortext("weatherStationSerialNumber", "The Weather Station Serial Number Field Is Required.")}
                                </Col>
                                <Col></Col>
                            </Row>
                            <Row>
                                <Col></Col>
                                <Col>
                                    <Form.Label>Weather Station Number<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="weatherStationNumber" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData&&this.state.postData.weatherStationNumber? this.state.postData.weatherStationNumber : null} />
                                    {this.renderErrortext("weatherStationNumber", "The Weather Station Number Field Is Required.")}
                                </Col>
                                <Col></Col>
                            </Row>
                            <Row>
                                <Col></Col>
                                <Col>
                                    <Form.Label>Weather Station Type<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col style={{ maxWidth: "15%", padding: "0" }}>
                                    <DropDown
                                        className="top-search-input form-control"
                                        Name="weatherStationType"
                                        itemSource={this.props.weatherStationType}
                                        value={this.state.postData && this.state.postData.weatherStationType?this.state.postData.weatherStationType : null}
                                        handleChange={(item) => this.handleChangeWeatherType(item)}
                                    />
                                </Col>
                                <Col></Col>
                            </Row>
                            <Row>
                                <Col></Col>
                                <Col>
                                    <Form.Label>Primary<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Check
                                        type="radio"
                                        label="Yes"
                                        name="isPrimary"
                                        id="primaryYes"
                                        onClick={(e) => this.handleclick(e)}
                                        checked={this.state.postData && this.state.postData.isPrimary === 0 ? true : false}
                                    /><Form.Check
                                        type="radio"
                                        label="No"
                                        name="isPrimary"
                                        id="primaryNo"
                                        onClick={(e) => this.handleclick(e)}
                                        checked={this.state.postData && this.state.postData.isPrimary === 1 ? true : false}
                                    />
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
                                        <Button variant="primary" size="md" onClick={() => { history.push('/setting/WeatherConfiguration') }} block>Back</Button>
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
    let plants = [{ plantName: "SELECT PLANTS", plantId: "-1" }];
    state.projectTypes.plantTypes && state.projectTypes.plantTypes.length > 0 && state.projectTypes.plantTypes.map((item) => plants.push(item));
    return {
        pageName: props.location.WeatherConfiguration ? props.location.WeatherConfiguration.weatherStationId ? "Edit Weather Configuration" : "Add Weather Configuration" : null,
        plantsByType: state.plants.plantsByType,
        plantTypes: state.projectTypes.plantTypes,
        plants: state.plants,
        weatherStationType: [{ displayText: "Pyranometer", value: "Pyranometer" }, { displayText: "Sensorbox", value: "Sensorbox" }, { displayText: "Webbox", value: "Webbox" }],
        data: state.SettingsReducer.data,
        submitedFields: ["sourcePath", "filePath"]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getWeatherConfiguration: (plantIds) => dispatch(getWeatherConfiguration(plantIds)),
        getPlantByType: (plantsByType) => dispatch(getPlantByType(plantsByType)),
        clearSettingPlantMapping: () => dispatch(clearSettingPlantMapping()),
        createUpdateWeather: (data) => dispatch(createUpdateWeather(data)),
        getAllPlants: () => dispatch(getAllPlants())
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WeatherConfigurationShare));