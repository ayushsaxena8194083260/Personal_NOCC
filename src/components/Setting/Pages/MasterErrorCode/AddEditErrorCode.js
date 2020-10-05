import React, { Component } from 'react';
// import axios from 'axios';
import {createOrUpdatePlant} from "../../../../actions"
import {connect} from 'react-redux'
import { withRouter} from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import '../../../../styles/plant/plantAddEdit.scss';

class AddEditErrorCode extends Component{
    render(){
        return(
            <div>
                <Card className="add-plant-card">
                  <Card.Header as="h5">Add Error Code</Card.Header>
                  <Card.Body>
                    <Row>
                        <Col>
                            <Form.Label>Error Code<span className="form-required">*</span></Form.Label>
                        </Col>
                        <Col md={6}>
                            <Form.Control type="text"/>
                        </Col>
                        <Col  md={1}>
                            <Form.Label>Vendor<span className="form-required">*</span></Form.Label>
                        </Col>
                        <Col>
                            <Form.Control type="text"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label>Description<span className="form-required">*</span></Form.Label>
                        </Col>
                        <Col md={6}>
                            <Form.Control as="textarea"/>
                        </Col>
                        <Col md={1}>
                        </Col>
                        <Col>
                        </Col>
                    </Row>
                    
                    <Row>
                        <Col>
                        </Col>
                        <Col md={2}>
                        <Button variant="primary" size="lg" block>Submit</Button>
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
        ...state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createOrUpdatePlant: (errorCode) => dispatch(createOrUpdatePlant(errorCode))
    }
}
export default  withRouter(connect(mapStateToProps,mapDispatchToProps)(AddEditErrorCode)) ;