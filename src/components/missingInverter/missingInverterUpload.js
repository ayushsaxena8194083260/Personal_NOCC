import React, { Component } from 'react';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Route } from 'react-router-dom';


class MissingInverterUpload extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <div>
                    <Card className="add-fault-card">
                        <Card.Header as="h5">File Upload For Inverter</Card.Header>
                        <Card.Body>
                            <Row>
                                <Col>
                                </Col>
                                <Col>
                                    <Form.Label>Select File Location<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <select className="top-search-input form-control" name="selectPath" width='300px'>
                                        <option>Path 1</option>
                                        <option>Path 2</option>
                                        <option>Path 3</option>
                                    </select>

                                </Col>
                                <Col></Col>
                            </Row>
                            <Row>
                                <Col>
                                </Col>
                                <Col>
                                    <Form.Label>File Type<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Check name="fileType" type="radio" label="XML/ZIP [DEFAULT]" />
                                    <Form.Check name="fileType" type="radio" label="CSV [ALTERNATE]" />
                                </Col>
                                <Col></Col>
                            </Row>
                            <Row>
                                <Col>
                                </Col>
                                <Col>
                                    <Form.Label>Upload File<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control type="file" />
                                </Col>
                                <Col></Col>
                            </Row>
                            <Row>
                                <Col>
                                </Col>
                                <Col md={2}>
                                    <Button variant="primary" size="md" block>Submit</Button>
                                </Col>
                                <Route render={({ history }) => (
                                    <Col md={2}>
                                        <Button variant="primary" size="md" onClick={() => { history.push('/checkMissingDataForInverter') }} block>Back</Button>
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

export default MissingInverterUpload;