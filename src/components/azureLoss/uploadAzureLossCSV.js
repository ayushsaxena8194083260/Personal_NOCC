import React, { Component } from 'react';
// import axios from 'axios';
import { createOrUpdatePlantFaultData } from '../../actions'
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom'
// import Card from 'react-bootstrap/Card'
// import Button from 'react-bootstrap/Button'
// import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
// import Modal from 'react-bootstrap/Modal';
import { getPlantByType } from '../../actions/PlantFaultDataActions';
// import { Route } from 'react-router-dom';
// import DropDown from "../Common/DropDown";
import Picky from 'react-picky';

import 'react-picky/dist/picky.css';
import '../../styles/plant/plantFaultData.scss';

class UploadAzureLossCSV extends Component{
 render(){
     return(
        <div>
            <div className="top-filter">
                    <div className="row" style={{ alignItems: "center", margin: "0" }} >
                        <Col xs={1} style={{ maxWidth: "5%" }}>
                            <Form.Label>Type:</Form.Label>
                        </Col>
                        <Col style={{ maxWidth: "20%" }}>
                        <Form.Control name="PlantPinHeadColor" as="select">
                              {/* <option>{this.state.plantPinHeadColorValue}</option> */}
                              <option>Green</option>
                              <option>Yellow</option>
                              <option>Amber</option>
                              <option>Red</option>
                            </Form.Control>
                        </Col>
                        
                        <Col xs={1} style={{ maxWidth: "5%" }}>
                            <Form.Label>Plant:</Form.Label>
                        </Col>
                        <Col style={{ maxWidth: "20%" }}>
                            <Picky
                                // value={this.state.selectedPlantOptions}
                                // options={this.getPlantTypesDropDownOptions()}
                                // onChange={(val) => this.selectMultipleOption(val)}
                                open={false}
                                valueKey="id"
                                labelKey="name"
                                multiple={true}
                                includeSelectAll={true}
                                includeFilter={true}
                                dropdownHeight={250}
                                    filterPlaceholder="Search"
                            />
                        </Col>
                        <Col xs={1} style={{ maxWidth: "5%" }}>
                            <Form.Label>Upload:</Form.Label>
                        </Col>
                        <Col xs={4} style={{ maxWidth: "30%" }} >
                            
                            <Form.Control type="file"></Form.Control>
                        </Col>
                        <Col xs={2} style={{ maxWidth: "20%" }}>
                            <button type="button" className="btn btn-orange" onClick={() => this.getRenderPlantFault()}>
                                Go
                        </button>
                        </Col>
                    </div>
                </div>
        </div>
     );
 }
}
const mapStateToProps = state => {
    return {
        plantFaultData: state.plantFaultData,
        edit_plantFault: state.edit_plantFault,
        plantFault: state.plantFault,
        plantTypes: state.projectTypes.plantTypes
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createOrUpdatePlantFaultData: (plantFaultData) => dispatch(createOrUpdatePlantFaultData(plantFaultData)),
        getPlantByType: (plantType) => dispatch(getPlantByType(plantType))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UploadAzureLossCSV))