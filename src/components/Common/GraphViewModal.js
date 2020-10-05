import React, { Component } from "react";
import {Modal, Button, Row, Col, Form, Card,} from 'react-bootstrap';
import GaugeSpeedoMeter from "../../Charts/gaugeSpeedoMeter";

class CompareModal extends Component{
    constructor(props){
        super(props);
    }
    
    render(){
        return(
            <div className="modal-main">
                <Modal {...this.props} size="lg"  aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Title>Generation Compare</Modal.Title>
                    <Modal.Body>
                    <Row>
                            <Col style={{ padding: "0.5%", paddingTop: "20px" }}>

                                <Card className="fieldset-chart">
                                    {/* <legend className="boxShw" id="5dd212491cda8" style={{ overflow: "hidden" }}>Quarter 1 Generation</legend> */}
                                    <div style={{ width: "95%", margin: "auto" }}>
                                        <GaugeSpeedoMeter {...this.props.selectedGraph}  showFilter='false'/>
                                    </div> 
                                </Card>
                            </Col>
                    </Row>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="danger" onClick={this.props.onHide}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
export default CompareModal;