import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import '../../../../styles/plant/plantAddEdit.scss';
import 'react-picky/dist/picky.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import '../../../../styles/plant/plantFaultData.scss';
import { getInverterConfiguration, clearSettingPlantMapping, createUpdateInverter, createUpdateCleaningConfig } from '../../../../actions/action-Settings';
import { connect } from 'react-redux';
import { getPlantByType } from "../../../../actions/moduleCleaningAnalysisActions";
import { withRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import {getAllPlants} from '../../../../actions/PlantActions';

class AddEditCleaningConfig extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedPlantType: null,
            selectedProjectTypes: null,
            selectedYear: null,
            projectTypes: this.props.projectTypes,
            plantTypes: this.props.plantTypes,
            selectedPlantOptions: [],
            postData: this.props.location && this.props.location.cleaningConfig ? this.props.location.cleaningConfig : {}
        };
    }

    componentDidMount() {
        // document.title = 'Plant Fault Data';
        this.props.getAllPlants();
    }
    componentDidUpdate() {
        //this.props.getProjectNames(this.state.selectedValue);
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps !== null) {
            this.setState({
                projectTypes: nextProps.projectTypes,
                plantTypes: nextProps.plantTypes,
                // postData: nextProps.postData
            })
        }
    }

    getPlantTypesDropDownOptions() {
        const options = this.state.plantTypes && this.state.plantTypes.map((plantTypes, key) => { return { id: plantTypes.plant_id, name: plantTypes.plant_name } });
        return options;
    }

    handleChangePlant(event) {
        const _data = this.state.postData;
        const selectedValue = event.target.value;
        if (selectedValue && selectedValue.plantId !== "-1") {
            _data[event.target.name] = selectedValue;
            this.setState({ postData: _data });
        }
    }

    handleChange(event) {
        let _data = this.state.postData;
        _data[event.target.name] = event.target.value;
        this.setState({ postData: _data });
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.postData !== null) {
            this.props.createUpdateCleaningConfig({input:this.state.postData, type:this.props.pageName});
            this.props.history.push('/setting/MCleaning');
        }

        this.setState({ isSubmited: true });
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <div>
                    <Card className="add-plant-card">
                        <Card.Header as="h5">{this.props.pageName}</Card.Header>
                        <Card.Body>
                            <Row>
                                <Col>
                                    <Form.Label>Plant<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <select class="form-control" name="plantId" type="dropdown" onChange={(item) => this.handleChangePlant(item)}>
                                        {this.props.plants && this.props.plants.map((item, key) => {
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
                                <Col>
                                    <Form.Label>Cleaning Cycle Rate<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="cbCleanRate" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.cbCleanRate} />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>Clean CB Capacity<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="cleanCbCapacity" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.cleanCbCapacity} />
                                </Col>
                                <Col>
                                    <Form.Label>Unclean CB Capacity<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="uncleanCbCapacity" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.uncleanCbCapacity} />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>Clean FTP Path<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="ftpPathSmu1" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.ftpPathSmu1} />
                                </Col>
                                <Col>
                                    <Form.Label>Clean NOCC Path<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="noccPathSmu1" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.noccPathSmu1} />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>Unclean FTP Path<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="ftpPathSmu2" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.ftpPathSmu2} />
                                </Col>
                                <Col>
                                    <Form.Label>Unclean NOCC Path<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="noccPathSmu2" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.noccPathSmu2} />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>Percentage<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="percentage" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.percentage} />
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
                                        <Button variant="primary" size="md" onClick={() => { history.push('/setting/MCleaning') }} block>Back</Button>
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

const mapStateToProps = (state, props) => {
    let plants = [{ plantName: "SELECT PLANTS", plantId: "-1" }];
    state.plants.allplants && state.plants.allplants.length > 0 && state.plants.allplants.map((item) => plants.push(item));
    return {
        pageName: props.location.cleaningConfig ? props.location.cleaningConfig.id ? "Edit Module Cleaning Config" : "Add Module Cleaning Config" : null,
        plantsByType: state.plants.plantsByType,
        plantTypes: state.projectTypes.plantTypes,
        plants: plants,
        cleaningConfig: state.SettingsReducer.cleaningConfig,
        submitedFields: ["sourcePath", "filePath"]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getInverterConfiguration: (plantIds) => dispatch(getInverterConfiguration(plantIds)),
        getPlantByType: (plantsByType) => dispatch(getPlantByType(plantsByType)),
        getAllPlants:() => dispatch(getAllPlants()),
        clearSettingPlantMapping: () => dispatch(clearSettingPlantMapping()),
        createUpdateInverter: (data) => dispatch(createUpdateInverter(data)),
        createUpdateCleaningConfig: (data) => dispatch(createUpdateCleaningConfig(data))

    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddEditCleaningConfig));