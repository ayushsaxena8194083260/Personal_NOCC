import React, { Component } from 'react';
import { createOrUpdateVendor, getVendorById } from "../../actions"
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import '../../styles/plant/vendorAddEdit.scss';
import { Route } from 'react-router-dom';
const previewImg = require('../../noRecordGraph.png')

class vendorAddEditComponent extends Component {


    constructor(props) {
        super(props);
        if (this.props.location.vendor !== undefined) {
            this.state = {
                vendor: this.props.location.vendor
            };
        }
        else {
            this.state = {
                vendor:
                {
                    companyName: '',
                    description: '',
                    contactName: '',
                    address: '',
                    emailId: '',
                    contactNo: '',
                    notes: '',
                    websiteUrl: '',
                    vendorId: '',
                    additionalProperties: {}
                }
            };
        }

        this.handleChange = this.handleChange.bind(this);
    }

    validate = values => {
        const errors = {};
        if (!values.companyName) {
            errors.patientName = "Company Name is Required";
        } else if (!values.description) {
            errors.phoneno = "Description is Required";
        }
        return errors;
    };


    handleChange(event) {
        const stateDup = this.state.vendor;
        stateDup[event.target.name] = event.target.value;
        this.setState({ stateDup });
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.createOrUpdateVendor(this.state.vendor);
        alert('Vendor details are updated');
        this.props.history.push('/vendor');
    }

    componentDidMount() {
        // document.title = 'Plant Fault Data';
    }

    render() {
        return (
            <div>
                <Card className="addEdit-vendor-card">
                    <Card.Header as="h5">Vendor</Card.Header>
                    <Card.Body>
                        <Row>
                            <Col>
                                <Form.Label>Company Name<span className="form-required">*</span></Form.Label>
                            </Col>
                            <Col xs={4}>
                                <Form.Control name="companyName" type="text" onChange={this.handleChange} value={this.state.vendor.companyName} />
                            </Col>
                            <Col>
                                <Form.Label>Description<span className="form-required">*</span></Form.Label>
                            </Col>
                            <Col xs={4}>
                                <Form.Control name="description" type="text" onChange={this.handleChange} value={this.state.vendor.description} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Website URL</Form.Label>
                            </Col>
                            <Col xs={4}>
                                <Form.Control name="websiteUrl" type="text" onChange={this.handleChange} value={this.state.vendor.websiteUrl} />
                            </Col>
                            <Col>
                                <Form.Label>Contact Name</Form.Label>
                            </Col>
                            <Col xs={4}>
                                <Form.Control name="contactName" type="text" onChange={this.handleChange} value={this.state.vendor.contactName} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Contact Number</Form.Label>
                            </Col>
                            <Col xs={4}>
                                <Form.Control name="contactNo" type="text" onChange={this.handleChange} value={this.state.vendor.contactNo} />
                            </Col>
                            <Col>
                                <Form.Label>Address</Form.Label>
                            </Col>
                            <Col xs={4}>
                                <Form.Control name="address" type="text" onChange={this.handleChange} value={this.state.vendor.address} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Email</Form.Label>
                            </Col>
                            <Col xs={4}>
                                <Form.Control name="emailId" type="text" onChange={this.handleChange} value={this.state.vendor.emailId} />
                            </Col>
                            <Col>
                                <Form.Label>Note</Form.Label>
                            </Col>
                            <Col xs={4}>
                                <Form.Control name="notes" type="text" onChange={this.handleChange} value={this.state.vendor.notes} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            </Col>
                            <Col md={2}>
                                <Button variant="primary" size="md" block onClick={this.onSubmit}>Submit</Button>
                            </Col>
                            <Col md={2}>

                                <Route render={({ history }) => (
                                    <div>
                                        <Button variant="primary" size="md" block onClick={() => { history.push('/vendor') }}>Back</Button>
                                    </div>
                                )} />

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
        vendor: state.vendor,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        createOrUpdateVendor: (vendor) => dispatch(createOrUpdateVendor(vendor)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(vendorAddEditComponent))
