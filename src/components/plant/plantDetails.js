import React, { Component } from 'react';
// import axios from 'axios';
// import {createOrUpdatePlant} from "../../actions"
// import {connect} from 'react-redux'
// import {Link, withRouter} from 'react-router-dom'
import Card from 'react-bootstrap/Card';
// import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import '../../styles/plant/plantDetails.scss';
const previewImg=require('../../noRecordGraph.png');
class PlantDetails extends Component{
    constructor(props){
        super(props);
        this.state = {
            plant: this.props.location.plant
        }
    }
    render(){
        return(
            <Card className="add-plant-card">
            <Card.Header as="h5">Plant Details</Card.Header>
            <Card.Body>
              <Row className="card-row-border">
                  <Col>
                      <Form.Label>Image</Form.Label>
                  </Col>
                  <Col xs={7}>
                    <img className="img-preview" src={previewImg} alt="Preview"/>
                  
                  </Col>
              </Row>
              <Row className="card-row-border">
                  <Col>
                      <Form.Label>Plant Name</Form.Label>
                  </Col>
                  <Col xs={7}>
                  <Form.Label>{this.state.plant.plantName}</Form.Label>
                  </Col>
              </Row>
              <Row className="card-row-border">
                  <Col>
                      <Form.Label>Site Address</Form.Label>
                  </Col>
                  <Col xs={7}>
                  <Form.Label>{this.state.plant.siteAddress}</Form.Label>
                  </Col>
              </Row>
              <Row className="card-row-border">
                  <Col>
                      <Form.Label>Registered Office Address</Form.Label>
                  </Col>
                  <Col xs={7}>
                  <Form.Label>{this.state.plant.registeredOfficeAddress}</Form.Label>
                  </Col>
              </Row>
              <Row className="card-row-border">
                  <Col>
                      <Form.Label>Location</Form.Label>
                  </Col>
                  <Col xs={7}>
                  <Form.Label>{this.state.plant.location}</Form.Label>
                  </Col>
              </Row>
              <Row className="card-row-border">
                  <Col>
                      <Form.Label>Tehsil</Form.Label>
                  </Col>
                  <Col xs={7}>
                  <Form.Label>{this.state.plant.tehsil}</Form.Label>
                  </Col>
              </Row>
              <Row className="card-row-border">
                  <Col>
                      <Form.Label>District</Form.Label>
                  </Col>
                  <Col xs={7}>
                  <Form.Label>{this.state.plant.district}</Form.Label>
                  </Col>
              </Row>
              <Row className="card-row-border">
                  <Col>
                      <Form.Label>State</Form.Label>
                  </Col>
                  <Col xs={7}>
                  <Form.Label>{this.state.plant.state}</Form.Label>
                  </Col>
              </Row>
              <Row className="card-row-border">
                  <Col>
                      <Form.Label>Country</Form.Label>
                  </Col>
                  <Col xs={7}>
                  <Form.Label>{this.state.plant.country}</Form.Label>
                  </Col>
              </Row>
              <Row className="card-row-border">
                  <Col>
                      <Form.Label>Plant Capacity DC</Form.Label>
                  </Col>
                  <Col xs={7}>
                  <Form.Label>{this.state.plant.plantCapacityDc}</Form.Label>
                  </Col>
              </Row>
              <Row className="card-row-border">
                  <Col>
                      <Form.Label>Plant Capacity AC</Form.Label>
                  </Col>
                  <Col xs={7}>
                  <Form.Label>{this.state.plant.plantCapacityAc}</Form.Label>
                  </Col>
              </Row>
              <Row className="card-row-border">
                  <Col>
                      <Form.Label>Latitude</Form.Label>
                  </Col>
                  <Col xs={7}>
                  <Form.Label>{this.state.plant.lat}</Form.Label>
                  </Col>
              </Row>
              <Row className="card-row-border">
                  <Col>
                      <Form.Label>Longitude</Form.Label>
                  </Col>
                  <Col xs={7}>
                  <Form.Label>{this.state.plant._long}</Form.Label>
                  </Col>
              </Row>
              <Row className="card-row-border">
                  <Col>
                      <Form.Label>Elevation</Form.Label>
                  </Col>
                  <Col xs={7}>
                  <Form.Label>{this.state.plant.elevation}</Form.Label>
                  </Col>
              </Row>
              <Row className="card-row-border">
                  <Col>
                      <Form.Label>Average Insolation</Form.Label>
                  </Col>
                  <Col xs={7}>
                  <Form.Label>{this.state.plant.avgInsolation}</Form.Label>
                  </Col>
              </Row>
              <Row className="card-row-border">
                  <Col>
                      <Form.Label>Average Temperature</Form.Label>
                  </Col>
                  <Col xs={7}>
                  <Form.Label>{this.state.plant.avgTemperature}</Form.Label>
                  </Col>
              </Row>
              <Row className="card-row-border">
                  <Col>
                      <Form.Label>Average Wind Speed</Form.Label>
                  </Col>
                  <Col xs={7}>
                  <Form.Label>{this.state.plant.avgWindSpeed}</Form.Label>
                  </Col>
              </Row>
              <Row className="card-row-border">
                  <Col>
                      <Form.Label>Module Mismatch</Form.Label>
                  </Col>
                  <Col xs={7}>
                  <Form.Label>{this.state.plant.moduleMismatch}</Form.Label>
                  </Col>
              </Row>
              <Row className="card-row-border">
                  <Col>
                      <Form.Label>Diodes Inter Connections</Form.Label>
                  </Col>
                  <Col xs={7}>
                  <Form.Label>{this.state.plant.diodesInterConnections}</Form.Label>
                  </Col>
              </Row>
              <Row className="card-row-border">
                  <Col>
                      <Form.Label>DC Wiring</Form.Label>
                  </Col>
                  <Col xs={7}>
                  <Form.Label>{this.state.plant.dcWiring}</Form.Label>
                  </Col>
              </Row>
              <Row className="card-row-border">
                  <Col>
                      <Form.Label>Soiling</Form.Label>
                  </Col>
                  <Col xs={7}>
                  <Form.Label>{this.state.plant.soiling}</Form.Label>
                  </Col>
              </Row>
              <Row className="card-row-border">
                  <Col>
                      <Form.Label>Inverter Derate</Form.Label>
                  </Col>
                  <Col xs={7}>
                  <Form.Label>{this.state.plant.inverterDerate}</Form.Label>
                  </Col>
              </Row>
              <Row className="card-row-border">
                  <Col>
                      <Form.Label>System Derate (In %)</Form.Label>
                  </Col>
                  <Col xs={7}>
                  <Form.Label>{this.state.plant.systemDerate}</Form.Label>
                  </Col>
              </Row>
              <Row className="card-row-border">
                  <Col>
                      <Form.Label>AC Wiring</Form.Label>
                  </Col>
                  <Col xs={7}>
                  <Form.Label>{this.state.plant.acWiring}</Form.Label>
                  </Col>
              </Row>
              <Row className="card-row-border">
                  <Col>
                      <Form.Label>Medium Voltage Transformer</Form.Label>
                  </Col>
                  <Col xs={7}>
                  <Form.Label>{this.state.plant.mediumVoltageTransformer}</Form.Label>
                  </Col>
              </Row>
              <Row className="card-row-border">
                  <Col>
                      <Form.Label>Total Post Inverter Derate</Form.Label>
                  </Col>
                  <Col xs={7}>
                  <Form.Label>{this.state.plant.totalPostInverterDerate}</Form.Label>
                  </Col>
              </Row>
              <Row className="card-row-border">
                  <Col>
                      <Form.Label>Total System Derate (In %)</Form.Label>
                  </Col>
                  <Col xs={7}>
                  <Form.Label>{this.state.plant.totalSystemDerate}</Form.Label>
                  </Col>
              </Row>
              <Row className="card-row-border">
                  <Col>
                      <Form.Label>Module Rating</Form.Label>
                  </Col>
                  <Col xs={7}>
                  <Form.Label>{this.state.plant.moduleRating}</Form.Label>
                  </Col>
              </Row>
              <Row className="card-row-border">
                  <Col>
                      <Form.Label>Type PV Module</Form.Label>
                  </Col>
                  <Col xs={7}>
                  <Form.Label>{this.state.plant.typePvModule}</Form.Label>
                  </Col>
              </Row>
              <Row className="card-row-border">
                  <Col>
                      <Form.Label>Module Manufacturer</Form.Label>
                  </Col>
                  <Col xs={7}>
                  <Form.Label>{this.state.plant.moduleManufacturer}</Form.Label>
                  </Col>
              </Row>
              <Row className="card-row-border">
                  <Col>
                      <Form.Label>Temperature Coefficient Power(In Numeric)</Form.Label>
                  </Col>
                  <Col xs={7}>
                  <Form.Label>{this.state.plant.temperatureCoefficientPower}</Form.Label>
                  </Col>
              </Row>
              <Row className="card-row-border">
                  <Col>
                      <Form.Label>Total No PV Modules</Form.Label>
                  </Col>
                  <Col xs={7}>
                  <Form.Label>{this.state.plant.totalNoPvModules}</Form.Label>
                  </Col>
              </Row>
              <Row className="card-row-border">
                  <Col>
                      <Form.Label>Max Array Bus Voltage</Form.Label>
                  </Col>
                  <Col xs={7}>
                  <Form.Label>{this.state.plant.maxArrayBusVoltage}</Form.Label>
                  </Col>
              </Row>
              <Row className="card-row-border">
                  <Col>
                      <Form.Label>No. Modules Series</Form.Label>
                  </Col>
                  <Col xs={7}>
                  <Form.Label>{this.state.plant.noModulesSeries}</Form.Label>
                  </Col>
              </Row>
              <Row className="card-row-border">
                  <Col>
                      <Form.Label>No. Parallel Strings</Form.Label>
                  </Col>
                  <Col xs={7}>
                  <Form.Label>{this.state.plant.noParallelStrings}</Form.Label>
                  </Col>
              </Row>
              <Row className="card-row-border">
                  <Col>
                      <Form.Label>PV Module Mounting</Form.Label>
                  </Col>
                  <Col xs={7}>
                  <Form.Label>{this.state.plant.pvModuleMounting}</Form.Label>
                  </Col>
              </Row>
              <Row className="card-row-border">
                  <Col>
                      <Form.Label>Tilting Provision</Form.Label>
                  </Col>
                  <Col xs={7}>
                  <Form.Label>{this.state.plant.tiltingProvision}</Form.Label>
                  </Col>
              </Row>
              <Row className="card-row-border">
                  <Col>
                      <Form.Label>Module Mounting Structure</Form.Label>
                  </Col>
                  <Col xs={7}>
                  <Form.Label>{this.state.plant.moduleMountingStructure}</Form.Label>
                  </Col>
              </Row>
              <Row className="card-row-border">
                  <Col>
                      <Form.Label>Inverter Capacity</Form.Label>
                  </Col>
                  <Col xs={7}>
                  <Form.Label>{this.state.plant.inverterCapacity}</Form.Label>
                  </Col>
              </Row>
              <Row className="card-row-border">
                  <Col>
                      <Form.Label>No. Inverters</Form.Label>
                  </Col>
                  <Col xs={7}>
                  <Form.Label>{this.state.plant.noInverters}</Form.Label>
                  </Col>
              </Row>
              <Row className="card-row-border">
                  <Col>
                      <Form.Label>Mppt Moltage Range</Form.Label>
                  </Col>
                  <Col xs={7}>
                  <Form.Label>{this.state.plant.mpptVoltageRange}</Form.Label>
                  </Col>
              </Row>
              <Row className="card-row-border">
                  <Col>
                      <Form.Label>Inverter Output Voltage</Form.Label>
                  </Col>
                  <Col xs={7}>
                  <Form.Label>{this.state.plant.inverterOutputVoltage}</Form.Label>
                  </Col>
              </Row>
              <Row className="card-row-border">
                  <Col>
                      <Form.Label>Grid Interfacing Voltage</Form.Label>
                  </Col>
                  <Col xs={7}>
                  <Form.Label>{this.state.plant.gridInterfacingVoltage}</Form.Label>
                  </Col>
              </Row>
              <Row className="card-row-border">
                  <Col>
                      <Form.Label>Estimated System Efficiency</Form.Label>
                  </Col>
                  <Col xs={7}>
                  <Form.Label>{this.state.plant.estimatedSystemEfficiency}</Form.Label>
                  </Col>
              </Row>
              <Row className="card-row-border">
                  <Col>
                      <Form.Label>Annual PV Generation</Form.Label>
                  </Col>
                  <Col xs={7}>
                  <Form.Label>{this.state.plant.annualPvGeneration}</Form.Label>
                  </Col>
              </Row>
              <Row className="card-row-border">
                  <Col>
                      <Form.Label>Area Plant Acres</Form.Label>
                  </Col>
                  <Col xs={7}>
                  <Form.Label>{this.state.plant.areaPlantAcres}</Form.Label>
                  </Col>
              </Row>
              <Row className="card-row-border">
                  <Col>
                      <Form.Label>Project Life</Form.Label>
                  </Col>
                  <Col xs={7}>
                  <Form.Label>{this.state.plant.projectLife}</Form.Label>
                  </Col>
              </Row>
              <Row className="card-row-border">
                  <Col>
                      <Form.Label>Tariff</Form.Label>
                  </Col>
                  <Col xs={7}>
                  <Form.Label>{this.state.plant.tariff}</Form.Label>
                  </Col>
              </Row>
              <Row className="card-row-border">
                  <Col>
                      <Form.Label>FTP URL</Form.Label>
                  </Col>
                  <Col xs={7}>
                  <Form.Label>{this.state.plant.ftpUrl}</Form.Label>
                  </Col>
              </Row>
              <Row className="card-row-border">
                  <Col>
                      <Form.Label>FTP User Id</Form.Label>
                  </Col>
                  <Col xs={7}>
                  <Form.Label>{this.state.plant.ftpUserId}</Form.Label>
                  </Col>
              </Row>
              <Row className="card-row-border">
                  <Col>
                      <Form.Label>FTP Password</Form.Label>
                  </Col>
                  <Col xs={7}>
                  <Form.Label>{this.state.plant.ftpPassword}</Form.Label>
                  </Col>
              </Row>
              
              </Card.Body>
              </Card>
        )
    }
}
export default PlantDetails;
