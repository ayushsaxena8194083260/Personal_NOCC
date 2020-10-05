import React, { Component } from 'react';
// import axios from 'axios';
// import { createOrUpdatePlant } from "../../../../actions"
// import { connect } from 'react-redux'
// import { Link, withRouter } from 'react-router-dom';
// import FileUploadProgress from 'react-fileupload-progress';
import Card from 'react-bootstrap/Card';
// import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import '../../../../styles/plant/plantAddEdit.scss';


class SafetyVideo extends Component {
    render() {
        return (
            <div>
                <Card className="add-plant-card">
                    <Card.Header as="h5">NOCC safety video upload</Card.Header>
                    <Card.Body style={{ width: "60%", margin: "auto" }}>
                        <Row>
                            <Col>
                                <Form.Label>Title<span className="form-required">*</span></Form.Label>
                            </Col>
                            <Col>
                                <Form.Control />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>File<span className="form-required">*</span></Form.Label>
                            </Col>
                            <Col>
                                <input type="file" id="uploadfile" name="uploadfile" />
                                <div>(You can upload mp4 file only  and maximum size can be 200MB.)</div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>

                            </Col>
                            <Col>
                                <div className="progress">
                                    <div className="bar"></div>
                                    <div className="percent">0%</div>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col align="center" colspan="2">
                                <div id="vidShow">
                                    <h1>Azure Power Safety Video</h1>
                                    <div style={{ position: "relative", paddingTop: "56.25%" }}>
                                        <video controls src='https://nocc.azurepower.com/uploads/safety_video/1484834272safety_video.mp4' style={{ position: "absolute", top: "0", left: "0" }} width='100%' height='100%'/>
                                    </div>

                                </div>

                            </Col>
                        </Row>

                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default SafetyVideo;