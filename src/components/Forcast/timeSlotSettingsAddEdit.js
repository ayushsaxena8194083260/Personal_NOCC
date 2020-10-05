import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import 'react-picky/dist/picky.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { createOrUpdateTimeSlotSetting} from '../../actions/action-Forecasting';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';

class TimeSlotSettingsAddEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postData: this.props.location && this.props.location.input ? this.props.location.input : {}
        };
    }

    componentDidMount() {
        // document.title = 'Plant Fault Data';
        // this.props.getAllPlants();
    }
    componentDidUpdate() {
        //this.props.getProjectNames(this.state.selectedValue);
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps !== null) {
            this.setState({
              input: nextProps.input,
            })
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
            this.props.createOrUpdateTimeSlotSetting({input:this.state.postData, type:this.props.pageName});
            this.props.history.push('/forecast/timeSlotSettings');
        }
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <div>
                    <Card className="add-plant-card">
                        <Card.Header as="h5">Time Slot Setting</Card.Header>
                        <Card.Body>
                            <Row>
                                <Col></Col>
                                <Col>
                                    <Form.Label>Time Slot Name<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                <Form.Control name="timeSlotName" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.timeSlotName} />
                                </Col>
                                <Col></Col>
                            </Row>
                            <Row>
                                <Col></Col>
                                <Col>
                                    <Form.Label>Slot Start Time<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                <Form.Control name="slotStartTime" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.slotStartTime} />
                                </Col>
                                <Col></Col>
                            </Row>
                            <Row>
                                <Col></Col>
                                <Col>
                                    <Form.Label>Slot End Time<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                <Form.Control name="slotEndTime" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.slotEndTime} />
                                </Col>
                                <Col></Col>
                            </Row>
                            <Row>
                                <Col>
                                </Col>
                                <Col md={2}>
                                    <Button type="submit" variant="primary" size="md" block>Submit</Button>
                                </Col>
                                <Route render={({ history }) => (
                                    <Col md={2}>
                                        <Button variant="primary" size="md" onClick={() => { history.push('/forecast/timeSlotSettings') }} block>Back</Button>
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
      createOrUpdateTimeSlotSetting: (data) => dispatch(createOrUpdateTimeSlotSetting(data))

    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TimeSlotSettingsAddEdit));