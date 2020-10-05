import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import { withRouter } from 'react-router-dom';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import DropDown from '../../../../../Common/DropDown';
import { getWeatherConfiguration, clearSettingPlantMapping, createUpdateMFM } from '../../../../../../actions/action-Settings';
import { getPlantByType } from "../../../../../../actions/moduleCleaningAnalysisActions";
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

class MFMConfigurationEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            selectedPlanType: null,
            plantTypes: this.props.plantTypes,
            selectedPlantOptions: [],
            showPopUp: false,
            deleteID: null,
            selectedWeatherStationType: null,
            postData: this.props.location.mfmConfiguration,

        };
    }

    componentDidMount() {
        // document.title = 'Plant Fault Data';
        // this.props.clearSettingPlantMapping();
    }

    // componentWillReceiveProps(nextProps) {
    //     this.setState({
    //         data: nextProps.data,
    //         mfmConfiguration: nextProps.mfmConfiguration
    //     });
    // }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.createUpdateMFM({ mfmConf: this.state.postData, type: this.props.pageName });
        this.props.history.push('/setting/MFMConfiguration');
    }

    handleChange(event) {
        let _data = this.state.postData;
        _data[event.target.name] = event.target.value;
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
                                <Col>
                                    <Form.Label>Plant</Form.Label>
                                </Col>
                                <Col>
                                <div>
                                    {this.state.postData && this.state.postData.plantName}
                                </div>
                                </Col>
                                <Col>
                                    <Form.Label>Meter No.: <span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="meterNumber" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.meterNumber} />
                                </Col>
                                <Col>
                                    <Form.Label>Multiply Factor:<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="multiplyingFactor" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.multiplyingFactor} />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                </Col>
                                <Col md={2}>
                                    <Button type="submit" variant="primary" size="md" block>Update</Button>
                                </Col>
                                <Col></Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </div>
            </form >
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        pageName: props.location.mfmConfiguration ? props.location.mfmConfiguration.mfmId ? "Edit MFM Configuration" : "Add MFM Configuration" : null,
        plantsByType: state.plants.plantsByType,
        plantTypes: state.projectTypes.plantTypes,
        plants: state.plants.plants,
        weatherStationType: [{ displayText: "Pyranometer", value: "Pyranometer" }, { displayText: "Sensorbox", value: "Sensorbox" }, { displayText: "Webbox", value: "Webbox" }],
        data: state.SettingsReducer.data
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getWeatherConfiguration: (plantIds) => dispatch(getWeatherConfiguration(plantIds)),
        getPlantByType: (plantsByType) => dispatch(getPlantByType(plantsByType)),
        clearSettingPlantMapping: () => dispatch(clearSettingPlantMapping()),
        createUpdateMFM: (data) => dispatch(createUpdateMFM(data))
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MFMConfigurationEdit));