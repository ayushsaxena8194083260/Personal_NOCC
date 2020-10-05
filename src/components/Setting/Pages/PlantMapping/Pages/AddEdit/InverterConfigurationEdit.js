
import React, { Component } from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { withRouter } from 'react-router-dom';
import 'react-picky/dist/picky.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import DropDown from '../../../../../Common/DropDown';
import { getInverterConfiguration, clearSettingPlantMapping, createUpdateInverter } from '../../../../../../actions/action-Settings';
import { connect } from 'react-redux';
import { getPlantByType } from "../../../../../../actions/moduleCleaningAnalysisActions";
import {getAllPlants} from "../../../../../../actions/PlantActions";
import Picky from 'react-picky';
import { Route } from 'react-router-dom';


class InverterConfigurationEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            plants: this.props.plants,
            inverterConfiguration: this.props.inverterConfiguration,
            selectedPlanType: null,
            plantTypes: this.props.plantTypes,
            selectedPlantOptions: [],
            showPopUp: false,
            deleteID: null,
            postData: this.props.location && this.props.location.inverterConfiguration ? this.props.location.inverterConfiguration : {},
        };
        this.selectMultipleOption = this.selectMultipleOption.bind(this);
    }

    componentDidMount() {
        // document.title = 'Plant Fault Data';
        // this.props.clearSettingPlantMapping();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            inverterConfiguration: nextProps.inverterConfiguration,
            plantTypes: nextProps.plantTypes,
            plants: nextProps.plants
        });
    }

    handleChangePlantType(event) {
        const selectedValue = event.target.value;
        if (selectedValue !== this.state.selectedPlantType) {
            this.props.getPlantByType(selectedValue);
            this.setState({ selectedPlantType: selectedValue, selectedPlantOptions: [] });
        }
    }

    handleChangePlants(event) {
        const selectedValue = event.target.value;
        this.setState({ selectedPlantOptions: selectedValue });
    }

    getDropDownPlants() {
        let plants = [];
        plants.push({ displayText: "Select Plant", value: "0" })
        this.state.plantTypes && this.state.plantTypes.map((item) => {
            plants.push({ displayText: item.plantName, value: item.plantId })
        });

        return plants;
    }

    getRenderInverterConfiguration() {
        let plantIds = [];
        this.state.selectedPlantOptions && this.state.selectedPlantOptions.length > 0 && this.state.selectedPlantOptions.map((item) => { plantIds.push(item.id) });
        plantIds.length > 0 && this.props.getInverterConfiguration({ plantIds: plantIds });

        // this.props.getInverterConfiguration({ plantIds: [this.state.selectedPlantOptions] });

    }

    getPlantTypesDropDownOptions() {
        const options = this.state.plantTypes && this.state.plantTypes.map((plantTypes, key) => { return { id: plantTypes.plantId, name: plantTypes.plantName } });
        return options;
    }

    selectMultipleOption(value) {
        if (value) {
            this.setState({ selectedPlantOptions: value });
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
        const invNumber = this.state.postData.inverterNumber + " " + this.state.postData.inverterSerialNumber;
        this.state.postData["inverterNumber"] = invNumber;
        e.preventDefault();
        if (this.state.postData !== null) {
            this.props.createUpdateInverter({inverterConf:this.state.postData, type:this.props.pageName});
            this.props.history.push('/setting/InverterConfiguration');
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

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <div>
                    <Card className="add-fault-card">
                        <Card.Header as="h5">{this.props.pageName}</Card.Header>
                        <Card.Body>
                            <Row>
                                <Col>
                                    <Form.Label>Plant<span className="form-required">*</span></Form.Label>
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
                                    {this.renderErrortext("plantId", "The Plant field is required")}
                                </Col>
                                <Col>
                                    <Form.Label>Inverter Name<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="inverterName" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.inverterName} />
                                    {this.renderErrortext("inverterName", "The Inverter Name Field Is Required.")}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>Inverter Number<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="inverterNumber" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.inverterNumber} />
                                    {this.renderErrortext("inverterNumber", "The Inverter Number Field Is Required.")}
                                </Col>
                                <Col>
                                    <Form.Label>Inverter Serial Number<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="inverterSerialNumber" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.inverterSerialNumber} />
                                    {this.renderErrortext("inverterSerialNumber", "The Inverter Serial Number Field Is Required.")}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>AC Capacity *(KW)<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="acCapacity" type="text" onChange={(item) => this.handleChangeForDecimal(item)} value={this.state.postData && this.state.postData.acCapacity} />
                                    {this.renderErrortext("acCapacity", "The AC Capacity Field Is Required.")}
                                </Col>
                                <Col>
                                    <Form.Label>DC Loading *(KW)<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="dcLoading" type="text" onChange={(item) => this.handleChangeForDecimal(item)} value={this.state.postData && this.state.postData.dcLoading} />
                                    {this.renderErrortext("dcLoading", "The DC Loading Field Is Required.")}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>Shed Orientation</Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="shedOrientation" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.shedOrientation} />
                                </Col>
                                <Col>
                                    <Form.Label>Tilt Angle</Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="tiltAngel" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.tiltAngel} />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>Roof Type</Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="roofType" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.roofType} />
                                </Col>
                                <Col>
                                    <Form.Label>Cable Resistance</Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="cableResistance" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.cableResistance} />
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
                                        <Button variant="primary" size="md" onClick={() => { history.push('/setting/InverterConfiguration') }} block>Back</Button>
                                    </Col>
                                )} />
                                {/* <Col xs={2} style={{ maxWidth: "15%" }}>

                                    <Route render={({ history }) => (
                                        <button type="button" class="btn btn-primary" style={{ width: "100%" }} onClick={() => { history.push('/invConfCombinerBoxAdd') }}>
                                            <img src="/images/icons/fugue/plus-circle.png" alt="add Combiner Box" title="Add Combiner Box" style={{ float: "left", marginRight: "3" }} />
                                            Add Combiner Box
                                        </button>)} />
                                </Col> */}
                                <Col>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </div>
            </form >
        )
    }
}

const mapStateToProps = (state, props) => {
    let plants = [{ plantName: "SELECT PLANTS", plantId: "-1" }];
    state.projectTypes.plantTypes && state.projectTypes.plantTypes.length > 0 && state.projectTypes.plantTypes.map((item) => plants.push(item));
    return {
        pageName: props.location.inverterConfiguration ? "Edit Inverter Configuration" : "Add Inverter Configuration",
        plantsByType: state.plants.plantsByType,
        plantTypes: state.projectTypes.plantTypes,
        plants: plants,
        plantType: [{ displayText: "Select Plant Type", value: "-1" }, { displayText: "GROUNDMOUNT", value: "GROUNDMOUNT" }, { displayText: "ROOFTOP", value: "ROOFTOP" }],
        inverterConfiguration: state.SettingsReducer.inverterConfiguration,
        submitedFields: ["sourcePath", "filePath"]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getInverterConfiguration: (plantIds) => dispatch(getInverterConfiguration(plantIds)),
        getPlantByType: (plantsByType) => dispatch(getPlantByType(plantsByType)),
        clearSettingPlantMapping: () => dispatch(clearSettingPlantMapping()),
        createUpdateInverter: (data) => dispatch(createUpdateInverter(data)),
        getAllPlants: () => dispatch(getAllPlants())

    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InverterConfigurationEdit));