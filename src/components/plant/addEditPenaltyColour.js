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
import { Route } from 'react-router-dom';
import { getAllPenaltyColours } from "../../actions/action-PenaltyColor";
import { createOrUpdatePenaltyColour } from "../../actions/action-PenaltyColor";

class AddEditPenaltyColour extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postData: this.props.penaltyColorData,
            penaltyColor: this.props.penaltyColor
        }
    }
    componentWillReceiveProps(nextProps) {
        let _postData = [];
        nextProps.penaltyColor.map((item) => {
            _postData[item.penaltyType] = item.penaltyColour;
        })

        this.setState({ postData: _postData, penaltyColor: nextProps.penaltyColor });
    }
    UpdatePenaltyColour() {

        this.props.createOrUpdatePenaltyColour(this.state.penaltyColor);
    }
    onSubmit = (e) => {
        e.preventDefault();
        // this.props.createOrUpdatePenalty(this.state.postData);
        //  this.props.history.push('/penaltyData');
    }

    componentDidMount() {
        this.props.getAllPenaltyColours();
        // document.title = 'Plant Fault Data';
    }

    onUpdateColor(event, name) {
        let _postData = this.state.postData;
        let _penaltyColor = this.state.penaltyColor;
        _postData[name] = event.target.value;

        _penaltyColor && _penaltyColor.length > 0 && _penaltyColor.map((item) => {
            if (item.penaltyType === name) {
                item.penaltyColour = event.target.value;
            }
        })

        this.setState({ postData: _postData, penaltyColor: _penaltyColor });
    }

    render() {
        return (
            <div>
                <Card className="add-plant-card">
                    <Card.Header as="h5">Penalty Data Graph Colour</Card.Header>
                    <Card.Body>
                        <Row>
                            <Col></Col>
                            <Col>
                                <Form.Label>Plant Type</Form.Label>
                            </Col>
                            <Col>
                                <Form.Label>Color</Form.Label>
                            </Col>
                            <Col>
                                <Form.Label>Value</Form.Label>
                            </Col>
                        </Row>
                        <Row>
                            <Col></Col>
                            <Col>
                                <Form.Label>All<span className="form-required">*</span></Form.Label>
                            </Col>
                            <Col>
                                <Form.Control name="All" value={this.state.postData["All"]} type="color" style={{ width: "50%"}} onChange={(value) => this.onUpdateColor(value, "All")} />

                            </Col>
                            <Col>
                                <Form.Label>{this.state.postData["All"]}</Form.Label>

                            </Col>
                        </Row>
                        <Row>
                            <Col></Col>
                            <Col>
                                <Form.Label>Applicable<span className="form-required">*</span></Form.Label>
                            </Col>
                            <Col>
                                <Form.Control name="Applicable" value={this.state.postData["Applicable"]} type="color" style={{ width: "50%" }} onChange={(value) => this.onUpdateColor(value, "Applicable")} />

                            </Col>
                            <Col>
                                <Form.Label>{this.state.postData["Applicable"]}</Form.Label>

                            </Col>
                        </Row>
                        <Row>
                            <Col></Col>
                            <Col>
                                <Form.Label>Trial<span className="form-required">*</span></Form.Label>
                            </Col>
                            <Col>
                                <Form.Control name="Trial" value={this.state.postData["Trial"]} type="color" style={{ width: "50%" }} onChange={(value) => this.onUpdateColor(value, "Trial")} />

                            </Col>
                            <Col>
                                <Form.Label>{this.state.postData["Trial"]}</Form.Label>

                            </Col>
                        </Row>
                        <Row>
                            <Col></Col>
                            <Col>
                                <Form.Label>N/A<span className="form-required">*</span></Form.Label>
                            </Col>
                            <Col>
                                <Form.Control name="N/A" value={this.state.postData["N/A"]} type="color" style={{ width: "50%"}} onChange={(value) => this.onUpdateColor(value, "N/A")} />
                            </Col>
                            <Col>
                                <Form.Label>{this.state.postData["N/A"]}</Form.Label>

                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            </Col>
                            <Col md={2}>
                                <Button variant="primary" size="md" onClick={() => { this.UpdatePenaltyColour() }} block>Submit</Button>
                            </Col>
                            <Route render={({ history }) => (
                                <Col md={2}>
                                    <Button variant="primary" size="md" onClick={() => { history.push('/penaltyData') }} block>Back</Button>
                                </Col>
                            )} />
                            <Col>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}
const mapStateToProps = state => {
    let _penaltyColorData = [];
    state.penaltyColorReducer && state.penaltyColorReducer.penaltyColorData && state.penaltyColorReducer.penaltyColorData.length > 0 && state.penaltyColorReducer.penaltyColorData.map((item) => {
        _penaltyColorData[item.penaltyType] = item.penaltyColour;
    })

    return {
        penaltyColorData: _penaltyColorData,
        penaltyColor: state.penaltyColorReducer.penaltyColorData,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllPenaltyColours: () => dispatch(getAllPenaltyColours()),
        createOrUpdatePenaltyColour: (color) => dispatch(createOrUpdatePenaltyColour(color))
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddEditPenaltyColour));