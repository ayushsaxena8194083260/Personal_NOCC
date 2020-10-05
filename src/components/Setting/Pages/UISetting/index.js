import React, { Component } from "react";
import DropDown from "../../../Common/DropDown";

import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import {submitUISettings} from "../../../../actions/action-Settings";

class GraphUIComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            postData: [],
            graphsTheme: null,
        }
    }

    getGraphsTheme() {
        return [
            { displayText: "Default", value: "default.js" },
            { displayText: "Dark-blue", value: "dark-blue.js" },
            { displayText: "Dark-green", value: "dark-green.js" },
            { displayText: "Gray", value: "gray.js" },
            { displayText: "Grid", value: "grid.js" },
            { displayText: "Skies", value: "skies.js" }
        ]
    }
    getColor() {
        return [
            { displayText: "Default", value: "0" },
            { displayText: "Green", value: "1" },
            { displayText: "Yellow", value: "2" },
            { displayText: "Amber", value: "3" },
            { displayText: "Red", value: "4" },
        ]
    }

    getAvailability() {
        return [
            { displayText: "Default", value: "0" },
            { displayText: "Groundmount", value: "1" },
            { displayText: "Rooftop", value: "2" },
        ]
    }
    handleChange(event, key) {
        let _postData = this.state.postData;
        _postData[key] = event.target.value;
        this.setState({ postData: _postData })
    }
    onSubmit(){
        this.props.submitUISettings(this.state.postData)
    }
    render() {
        return (
            <div>
                <Card className="add-plant-card" style={{ width: "50%" }}>
                    <Card.Header as="h5">UI Setting</Card.Header>
                    <Card.Body>
                        <Row>
                            <Col>
                                <Form.Label>Graph Theme<span className="form-required">*</span></Form.Label>
                            </Col>
                            <Col>
                                <DropDown
                                    className="form-control"
                                    Name="themes"
                                    itemSource={this.getGraphsTheme()}
                                    value={this.state.postData["graphsTheme"]}
                                    handleChange={(item) => this.handleChange(item, "graphsTheme")}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Pinhead Color<span className="form-required">*</span></Form.Label>
                            </Col>
                            <Col>
                                <DropDown
                                    className="form-control"
                                    Name="pinhead_color"
                                    itemSource={this.getColor()}
                                    value={this.state.postData["pinhead_color"]}
                                    handleChange={(item) => this.handleChange(item, "pinhead_color")}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Pinhead Availability <span className="form-required">*</span></Form.Label>
                            </Col>
                            <Col>
                                <DropDown
                                    className="form-control"
                                    Name="pinhead_availability"
                                    itemSource={this.getAvailability()}
                                    value={this.state.postData["pinhead_availability"]}
                                    handleChange={(item) => this.handleChange(item, "pinhead_availability")}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            </Col>
                            <Col md={3}>
                                <Button variant="primary" size="lg" onClick={()=> this.onSubmit()} block>Submit</Button>
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
const mapStateToProps = state => {
    return {       
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        submitUISettings: () => dispatch(submitUISettings())
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GraphUIComponent));

