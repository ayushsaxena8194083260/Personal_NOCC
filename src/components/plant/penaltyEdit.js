import React, { Component } from 'react';
import axios from 'axios';
import { createOrUpdatePlant } from "../../actions"
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import '../../styles/plant/plantAddEdit.scss';
import { createOrUpdatePenalty } from '../../actions/action-Penalty';
import { Route } from 'react-router-dom';

class PenaltyEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            postData: this.props.location.penaltyData
        }
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount(){
        // document.title = 'Plant Fault Data';
    //     //this.setState({edit_plant_id: this.props.match.params.plant_id});
    //     //this.props.getPlantById(this.state.edit_plant_id);
    }


    handleChange(event) {
        var stateDup = this.state.postData;
        stateDup[event.target.name] = event.target.value;
        this.setState({ postData: stateDup });
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.createOrUpdatePenalty(this.state.postData);
        this.props.history.push('/penaltyData');
    }

    render() {
        return (
            <div>
                <Card className="add-plant-card">
                    <Card.Header as="h5">Penalty Data</Card.Header>
                    <Card.Body>
                        <Row>
                            <Col>
                                <Form.Label>Plant Name<span className="form-required">*</span></Form.Label>
                            </Col>
                            <Col>
                                <Form.Control name="plant_name" type="text" onChange={this.handleChange} value={this.state.postData && this.state.postData.plantName} />
                            </Col>
                            <Col>
                                <Form.Label>Month<span className="form-required">*</span></Form.Label>
                            </Col>
                            <Col>
                                <Form.Control name="month" type="text" onChange={this.handleChange} value={this.state.postData && this.state.postData.month} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Year<span className="form-required">*</span></Form.Label>
                            </Col>
                            <Col>
                                <Form.Control name="year" type="text" onChange={this.handleChange} value={this.state.postData && this.state.postData.year} />
                            </Col>
                            <Col>
                                <Form.Label>Penalty Data<span className="form-required">*</span></Form.Label>
                            </Col>
                            <Col>
                                <Form.Control name="penalty_data" type="text" onChange={this.handleChange} value={this.state.postData && this.state.postData.penaltyData} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Plant Type<span className="form-required">*</span></Form.Label>
                            </Col>
                            <Col>
                                <Form.Control name="type" as="select" onChange={this.handleChange}>
                                    <option>{this.state.plantTypeValue}</option>
                                    <option>Trial</option>
                                    <option>Applicable</option>
                                    <option selected>N/A</option>
                                </Form.Control>
                            </Col>
                            <Col></Col>
                        </Row>
                        <Row>
                            <Col>
                            </Col>
                            <Col md={2}>
                                <Button variant="primary" size="md" block onClick={this.onSubmit}>Submit</Button>
                            </Col>
                            <Route render={({ history }) => (
                                <Col md={2}>
                                    <Button variant="primary" size="md" onClick={() => { history.push('/penaltyData') }} block>Back</Button>
                                </Col>
                            )} />
                            <Col>
                            </Col>
                            <Col>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        data: props.location && props.location.penaltyData

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createOrUpdatePenalty: (plant) => dispatch(createOrUpdatePenalty(plant))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PenaltyEdit))
