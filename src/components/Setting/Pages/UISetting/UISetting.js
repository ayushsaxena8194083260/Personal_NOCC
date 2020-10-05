import React, { Component } from 'react';
import axios from 'axios';
import {createOrUpdatePlant} from "../../../../actions"
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import '../../../../styles/plant/plantAddEdit.scss';

class UISetting extends Component{
    render(){
        return(
            <div>
                <Card className="add-plant-card" style={{width:"50%"}}>
                  <Card.Header as="h5">UI Setting</Card.Header>
                  <Card.Body>
                    <Row>
                        <Col>
                            <Form.Label>Graph Theme<span className="form-required">*</span></Form.Label>
                        </Col>
                        <Col>
                            <Form.Control name="PlantPinHeadColor" as="select">
                              {/* <option>{this.state.plantPinHeadColorValue}</option> */}
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                            </Form.Control>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label>Pinhead Color<span className="form-required">*</span></Form.Label>
                        </Col>
                        <Col>
                            <Form.Control name="PlantPinHeadColor" as="select">
                              {/* <option>{this.state.plantPinHeadColorValue}</option> */}
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                            </Form.Control>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label>Pinhead Availability <span className="form-required">*</span></Form.Label>
                        </Col>
                        <Col>
                            <Form.Control name="PlantPinHeadColor" as="select">
                              {/* <option>{this.state.plantPinHeadColorValue}</option> */}
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                            </Form.Control>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        </Col>
                        <Col md={3}>
                        <Button variant="primary" size="lg" block>Submit</Button>
                        </Col>
                        {/* <Col md={3}>
                        <Link to="/">
                        <Button variant="primary" size="md" block>Back</Button>
                        </Link>
                        </Col> */}
                        <Col>                      
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
        )
    }
}

export default  UISetting;