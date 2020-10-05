import React, { Component } from 'react';
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
import DropDown from "../../../Common/DropDown";
import { renderAllUserDetails, getInverterConfiguration, clearSettingPlantMapping, createUpdateInverter, createUpdateCleaningAlertUser } from '../../../../actions/action-Settings';
import { getAllPlants } from '../../../../actions/PlantActions';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class AddEditCleaningUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedPlant: null,
            plants: this.props.plants,
            users: this.props.users,
            postData: {}
        };
        this.selectMultipleOption = this.selectMultipleOption.bind(this);
    }

    componentDidMount() {
        // document.title = 'Plant Fault Data';
        this.props.getAllPlants();
        this.props.renderAllUserDetails();
    }
    componentDidUpdate() {
        //this.props.getProjectNames(this.state.selectedValue);
    }


    selectOption(value) {
        console.log("Vals", value);
        this.setState({ value });
    }

    selectMultipleOption(value) {
        this.setState({ selectedPlantOptions: value });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== null) {
            this.setState({
                plants: nextProps.plants,
                users: nextProps.users
            })
        }
    }

    handleChangePlants(event) {
        // const _data = this.state.postData;
        const selectedValue = event.target.value;
        if (selectedValue && selectedValue.plantId !== "-1") {
            this.setState({ selectedPlant: selectedValue });
            // _data[event.target.name] = selectedValue;
            // this.setState({ postData: _data });
        }
        // const selectedValue = event.target.value;
        // this.setState({ selectedPlant: selectedValue });
    }

    handleChangePlant(event) {
        const _data = this.state.postData;
        const selectedValue = event.target.value;
        if (selectedValue && selectedValue.plantId !== "-1") {
            _data[event.target.name] = selectedValue;
            this.state.postData["alertId"] = selectedValue;
            this.setState({ postData: _data });
        }
    }

    handleChangeUser(event) {
        const _data = this.state.postData;
        const selectedValue = event.target.value;
        if (selectedValue && selectedValue.userId !== "-1") {
            _data[event.target.name] = selectedValue;
            this.setState({ postData: _data });
        }
    }
    getPlantTypesDropDownOptions() {
        const options = this.state.plants && this.state.plants.map((plants, key) => { return { id: plants.plantId, name: plants.plantName } });
        return options;
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.postData !== null) {
            this.state.postData["isPublished"] = 1;
            this.state.postData["alertUserId"] = 0;
            this.props.createUpdateCleaningAlertUser({input:this.state.postData, type:this.props.pageName});
            this.props.history.push('/setting/alertCleaning');
        }

        this.setState({ isSubmited: true });
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <div>
                    <Card className="add-plant-card" style={{ width: "50%" }}>
                        <Card.Header as="h5">Analytic Alert User Setting</Card.Header>
                        <Card.Body>
                            <Row>
                                <Col xs={1} style={{ maxWidth: "200%" }}>
                                    <Form.Label>Plant<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <select class="form-control" name="plantId" type="dropdown" onChange={(item) => this.handleChangePlant(item)}>
                                        {this.props.plants && this.props.plants.map((item, key) => {
                                            return <option value={item.plantId}>{item.plantName}</option>
                                        }
                                        )}
                                    </select>
                                </Col>
                                {/* <Col style={{ maxWidth: "50%" }}>
                                    <DropDown
                                        className="top-search-input form-control"
                                        Name="id"
                                        itemSource={this.getPlantTypesDropDownOptions()}
                                        value={this.state.selectedPlant}
                                        handleChange={(item) => this.handleChangePlants(item)}
                                    />
                                </Col> */}
                            </Row>
                            <Row>
                                <Col xs={1} style={{ maxWidth: "200%" }}>
                                    <Form.Label>User<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <select class="form-control" name="userId" type="dropdown" onChange={(item) => this.handleChangeUser(item)}>
                                        {this.props.users && this.props.users.map((item, key) => {
                                            return <option value={item.userId}>{item.name}</option>
                                        }
                                        )}
                                    </select>
                                </Col>
                                {/* <Col style={{ maxWidth: "50%" }}>
                                    <DropDown
                                        className="top-search-input form-control"
                                        Name="plantName"
                                        itemSource={this.getPlantTypesDropDownOptions()}
                                        value={this.state.selectedPlant}
                                        handleChange={(item) => this.handleChangePlants(item)}
                                    />
                                </Col> */}
                            </Row>

                            <Row>
                                <Col>
                                </Col>
                                <Col md={3}>
                                    <Button type="submit" variant="primary" size="md" block>Submit</Button>
                                </Col>
                                {/* <Col md={2}>
                        <Link to="/">
                        <Button variant="primary" size="lg" block>Back</Button>
                        </Link>
                        </Col> */}
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
    let users = [{ name: "SELECT USERS", userId: "-1" }];
    state.SettingsReducer.userManagements && state.SettingsReducer.userManagements.length > 0 && state.SettingsReducer.userManagements.map((item) => users.push(item));
    return {
        pageName: props.location.cleaningConfig ? props.location.cleaningConfig.id ? "Edit Module Cleaning Config" : "Add Module Cleaning Config" : null,
        plantsByType: state.plants.plantsByType,
        plantTypes: state.projectTypes.plantTypes,
        plants: plants,
        users: users,
        cleaningConfig: state.SettingsReducer.cleaningConfig,
        submitedFields: ["sourcePath", "filePath"],
        userManagements: state.SettingsReducer.userManagements,

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getInverterConfiguration: (plantIds) => dispatch(getInverterConfiguration(plantIds)),
        // getPlantByType: (plantsByType) => dispatch(getPlantByType(plantsByType)),
        getAllPlants: () => dispatch(getAllPlants()),
        clearSettingPlantMapping: () => dispatch(clearSettingPlantMapping()),
        createUpdateInverter: (data) => dispatch(createUpdateInverter(data)),
        createUpdateCleaningAlertUser: (data) => dispatch(createUpdateCleaningAlertUser(data)),
        renderAllUserDetails:() => dispatch(renderAllUserDetails())

    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddEditCleaningUser));
