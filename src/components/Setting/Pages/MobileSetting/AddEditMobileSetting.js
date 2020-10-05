import React, { Component } from 'react';
// import axios from 'axios';
import { createUpdateMobileSettings } from '../../../../actions/action-Settings';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import '../../../../styles/plant/plantAddEdit.scss';
import { Route } from 'react-router-dom';


class AddEditMobileSetting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedPlanType: null,
            plantTypes: this.props.plantTypes,
            selectedPlantOptions: [],
            postData: this.props.location.mobileSetting,
            alternateAdapter: this.props.alternateAdapter
        };
        // this.selectMultipleOption = this.selectMultipleOption.bind(this);
    }

    handleChange(event) {
        let _data = this.state.postData;
        _data[event.target.name] = event.target.value;
        this.setState({ postData: _data });
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.postData != null) {
            this.props.createUpdateMobileSettings({ input: this.state.postData, type: this.props.pageName });
            this.props.history.push('/setting/mobileSetting');
        }
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
            <div>
                <Card className="add-plant-card" style={{ width: "50%" }}>
                    <Card.Header as="h5">Edit Mobile Setting</Card.Header>
                    <Card.Body>
                        <Row>
                            <Col>
                                <Form.Label>Description<span className="form-required">*</span></Form.Label>
                            </Col>
                            <Col>
                                <Form.Control name="description" type="text" readOnly onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.description} />
                            </Col>

                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Value<span className="form-required">*</span></Form.Label>
                            </Col>
                            <Col md={6}>
                                <Form.Control name="value" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.value} />
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                            </Col>
                            <Col md={3}>
                                    <Button type="submit" variant="primary" size="md" block>Update</Button>
                                </Col>
                            <Route render={({ history }) => (
                                    <Col md={2}>
                                        <Button variant="primary" size="md" onClick={() => { history.push('/setting/mobileSetting') }} block>Back</Button>
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
    return {
        pageName: props.location.mobileSetting ? props.location.mobileSetting.id ? "Edit Mobile Settings" : "Add Mobile Settings" : null,
        plant: state.plant,
        plants: state.plants.allplants
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createUpdateMobileSettings: (mobileSetting) => dispatch(createUpdateMobileSettings(mobileSetting))
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddEditMobileSetting));
