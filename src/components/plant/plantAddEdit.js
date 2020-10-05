import React, { Component } from 'react';
// import axios from 'axios';
import { createOrUpdatePlant } from "../../actions"
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import '../../styles/plant/plantAddEdit.scss';
import service from "./../../services/plantService";
import DropDown from "../Common/DropDown";
import Loader from 'react-loader-spinner';

const previewImg = require('../../noRecordGraph.png')
class PlantAddEditComponent extends Component {

    constructor(props) {
        super(props);
        if (this.props.location.plant !== undefined) {
            this.state = {
                pageName: this.props.location.plant === undefined ? 'Add Plant' : "Edit Plant",
                plantPinHeadColorValue: this.props.location.plant === undefined ? 'Default' : '',
                plantTypeValue: this.props.location.plant === undefined ? '--Default--' : this.props.location.plant.type,
                plant: this.props.location.plant,
                projectTypes: [],
                showLoader: false
            };
        }
        else {
            this.state = {
                pageName: this.props.location.plant === undefined ? 'Add Plant' : "Edit Plant",
                plantPinHeadColorValue: this.props.location.plant === undefined ? 'Default' : '',
                plantTypeValue: this.props.location.plant === undefined ? '--Default--' : this.props.location.plant.type,
                isSubmited: false,
                isError: false,
                requiredFields: [
                    'plantName',
                    'siteAddress',
                    'registeredOfficeAddress',
                    'location',
                    'spv',
                    'tehsil',
                    'district',
                    'state',
                    'country',
                    'lat',
                    'lon',
                    'dcWiring',
                    'commissioningDate',
                    'ftpUrl',
                    'ftpUserId',
                    'ftpPassword',
                    'type',
                    'project_type'
                ],
                plant: {
                    country: '',
                    noParallelStrings: '',
                    areaPlantAcres: '',
                    tiltingProvision: '',
                    tmwicon: '',
                    multipleAdaptorUsed: 0,
                    noModulesSeries: '',
                    plantDashboardStatus: 0,
                    avgWindSpeed: '',
                    type: '',
                    //project_type:'',
                    dcWiring: '',
                    moduleMountingStructure: '',
                    minPlf: 0,
                    ftpUserId: '',
                    totalSystemDerate: '',
                    ftpUrl: '',
                    typePvModule: '',
                    inverterDerate: '',
                    state: '',
                    photoUrl: '',
                    plantCapacityAc: '',
                    lat: '',
                    projectLife: '',
                    moduleRatedDegradationFactor: '',
                    ftpPassword: '',
                    moduleRating: '',
                    estimatedSystemEfficiency: '',
                    areaInverterPad: '',
                    avgTemperature: '',
                    inverterOutputVoltage: '',
                    district: '',
                    avgInsolation: '',
                    diodesInterConnections: '',
                    spv: '',
                    temperatureCoefficientPower: 0,
                    plantCapacityDc: '',
                    acWiring: '',
                    moduleMismatch: '',
                    noInverters: '',
                    pvModuleMounting: '',
                    lon: '',
                    todayicon: '',
                    mpptVoltageRange: '',
                    soiling: '',
                    registeredOfficeAddress: '',
                    annualPvGeneration: '',
                    gridInterfacingVoltage: '',
                    tariff: '',
                    maxPlf: 0,
                    powerDivision: 0,
                    mediumVoltageTransformer: '',
                    ticketHelpTopicId: 0,
                    elevation: '',
                    moduleManufacturer: '',
                    maxArrayBusVoltage: '',
                    commissioningDate: '',
                    inverterCapacity: '',
                    tehsil: '',
                    siteAddress: '',
                    totalPostInverterDerate: '',
                    totalNoPvModules: '',
                    location: '',
                    systemDerate: 0,
                    plantName: ''
                },
                projectTypes: [],
                showLoader: false
            };
        }
        this.handleChange = this.handleChange.bind(this);
        //this.handleSubmit = this.handleSubmit.bind(this);
    }

    validate = values => {
        const errors = {};
        if (!values.plant_name) {
            errors.patientName = "Plant Name is Required";
        } else if (!values.phoneno) {
            errors.phoneno = "Phone Number is Required";
        } else if (!values.address) {
            errors.address = "Address is Required";
        } else if (!values.dob) {
            errors.dob = "Date Of Birth is Required";
        } else if (!/^(0|[1-9][0-9]{9})$/i.test(values.phoneno)) {
            errors.phoneno = "Invalid Phone Number";
        } else if (!values.relationship) {
            errors.relationship = "Realtionship is Required";
        } else if (values.phoneno.length < 10) {
            errors.phoneno = "Phone Number must be 10 characters";
        }
        return errors;
    };

    componentDidMount() {
        // document.title = 'Plant Fault Data';
        //this.setState({edit_plant_id: this.props.match.params.plant_id});
        //this.props.getPlantById(this.state.edit_plant_id);
    }


    handleChange(event) {
        var stateDup = this.state.plant;
        // stateDup[event.target.name]=event.target.value;
        if (event.target.name == 'type') {
            // this.props.getProjectNames(event.target.value)
            service.getProjectNames(event.target.value).then(response => {
                if (response.data) {
                    this.setState({ projectTypes: response.data })
                }
                console.log(response)
            }, error => {
                console.log(error)
            })
        }
        if (event.target.name === "multipleAdaptorUsed") {
            stateDup[event.target.name] = event.target.value === "1" ? 1 : (event.target.value === "0" ? 0 : null);
        } else {
            stateDup[event.target.name] = event.target.value;
        }
        this.setState({ stateDup });
    }

    getDropDownProjectTypes() {
        let projectName = [];
        projectName.push({ displayText: "Select Project", value: "0" })
        this.state.projectTypes && this.state.projectTypes.map((item) => {
            projectName.push({ displayText: item.projectName, value: item.projectId })
        });
        return projectName;
    }

    isFormValid() {
        let isValid = true;
        this.state.requiredFields.map((item) => {
            if (!this.state.plant[item]) {
                isValid = false;
            }
        })
        return isValid;
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.setState({ isSubmited: true });
        if (this.isFormValid()) {
            this.setState({ showLoader: true });
            service.createOrUpdatePlant(this.state.plant).then(response => {
                this.setState({ showLoader: false });
                if (response.data) {
                    this.props.history.push('/')
                }
                console.log(response)
            }, error => {
                this.setState({ showLoader: false });
                console.log(error)
            })

            // this.props.createOrUpdatePlant(this.state.plant)
            // this.props.history.push('/')
        } else {
            console.log('Error in form.')
        }
    }

    renderErrortext(fieldID, msg) {
        return this.state.isSubmited && !this.state.plant[fieldID] && <p className="errorText" style={{ color: "#CC0000", display: "block", fontSize: "11px", marginTopop: "0.5em" }}>{msg}</p>
    }



    render() {
        // var pageName = '';
        // var plantPinHeadColorValue ='';
        // var plantTypeValue ='';
        // this.state.edit_plant === ''?pageName='Add Plant':pageName="Edit Plant";
        // this.state.edit_plant === ''?plantPinHeadColorValue='Default':plantPinHeadColorValue=this.state.edit_plant.plantPinHeadColorValue;
        // this.state.edit_plant === ''?plantTypeValue='--Default--':plantTypeValue=this.state.edit_plant.type;
        return (
            <div>
                <Card className="add-plant-card">
                    {/* <div className="loader"></div> */}
                    {
                        this.showLoader
                        && <Loader className="g_loader" type="Oval" color="#00BFFF" height={80} width={80} />
                    }
                    <Card.Header as="h5">{this.state.pageName}</Card.Header>
                    <Card.Body>
                        <Row>
                            <Col>
                                <Form.Label>Plant Name<span className="form-required">*</span></Form.Label>
                            </Col>
                            <Col>
                                <Form.Control name="plantName" type="text" onChange={this.handleChange} value={this.state.plant.plantName} />
                                {this.renderErrortext("plantName", "The Plant Name field is required")}
                            </Col>
                            <Col>
                                <Form.Label>Image</Form.Label>
                            </Col>
                            <Col>
                                <img className="img-preview" src={previewImg} alt="Preview" />
                                <Form.Control type="file" />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Inverter Output Voltage</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control name="inverterOutputVoltage" type="text" onChange={this.handleChange} value={this.state.plant.inverterOutputVoltage} />
                            </Col>
                            <Col>
                                <Form.Label>Side Address<span className="form-required">*</span></Form.Label>
                            </Col>
                            <Col>
                                <Form.Control name="siteAddress" type="text" onChange={this.handleChange} value={this.state.plant.siteAddress} />
                                {this.renderErrortext("siteAddress", "The Side Address field is required")}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Registered Office Address<span className="form-required">*</span></Form.Label>
                            </Col>
                            <Col>
                                <Form.Control name="registeredOfficeAddress" type="text" onChange={this.handleChange} value={this.state.plant.registeredOfficeAddress} />
                                {this.renderErrortext("registeredOfficeAddress", "The Registered Office Address field is required")}
                            </Col>
                            <Col>
                                <Form.Label>Location<span className="form-required">*</span></Form.Label>
                            </Col>
                            <Col>
                                <Form.Control name="location" type="text" onChange={this.handleChange} value={this.state.plant.location} />
                                {this.renderErrortext("location", "The Location field is required")}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>SPV Name<span className="form-required">*</span></Form.Label>
                            </Col>
                            <Col>
                                <Form.Control name="spv" type="text" onChange={this.handleChange} value={this.state.plant.spv} />
                                {this.renderErrortext("spv", "The SPV Name field is required")}
                            </Col>
                            <Col>
                                <Form.Label>Plant Pin Head Color</Form.Label>
                            </Col>
                            <Col>
                                {/* <Form.Control type="text"/> 
                                                */}
                                <Form.Control name="PlantPinHeadColor" as="select" onChange={this.handleChange}>
                                    <option>{this.state.plantPinHeadColorValue}</option>
                                    <option>Green</option>
                                    <option>Yellow</option>
                                    <option>Amber</option>
                                    <option>Red</option>
                                </Form.Control>

                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Tehsil<span className="form-required">*</span></Form.Label>
                            </Col>
                            <Col>
                                <Form.Control name="tehsil" type="text" onChange={this.handleChange} value={this.state.plant.tehsil} />
                                {this.renderErrortext("tehsil", "The Tehsil field is required")}
                            </Col>
                            <Col>
                                <Form.Label>District<span className="form-required">*</span></Form.Label>
                            </Col>
                            <Col>
                                <Form.Control name="district" type="text" onChange={this.handleChange} value={this.state.plant.district} />
                                {this.renderErrortext("district", "The District field is required")}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>State<span className="form-required">*</span></Form.Label>
                            </Col>
                            <Col>
                                <Form.Control name="state" type="text" onChange={this.handleChange} value={this.state.plant.state} />
                                {this.renderErrortext("state", "The State field is required")}
                            </Col>
                            <Col>
                                <Form.Label>Country<span className="form-required">*</span></Form.Label>
                            </Col>
                            <Col>
                                <Form.Control name="country" type="text" onChange={this.handleChange} value={this.state.plant.country} />
                                {this.renderErrortext("country", "The country field is required")}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Plant Capacity DC(KW)</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control name="plantCapacityDc" type="text" onChange={this.handleChange} value={this.state.plant.plantCapacityDc} />
                            </Col>
                            <Col>
                                <Form.Label>Plant Capacity AC(KW)</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control name="plantCapacityAc" type="text" onChange={this.handleChange} value={this.state.plant.plantCapacityAc} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Site Latitude (Decimal)<span className="form-required">*</span></Form.Label>
                            </Col>
                            <Col>
                                <Form.Control name="lat" type="text" onChange={this.handleChange} value={this.state.plant.lat} />
                                {this.renderErrortext("lat", "The Site Latitude field is required")}
                            </Col>
                            <Col>
                                <Form.Label>Site Longitude (Decimal)<span className="form-required">*</span></Form.Label>
                            </Col>
                            <Col>
                                <Form.Control name="lon" type="text" onChange={this.handleChange} value={this.state.plant.lon} />
                                {this.renderErrortext("lon", "The Site Longitude field is required")}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Site Elevation (Feet)</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control name="elevation" type="text" onChange={this.handleChange} value={this.state.plant.elevation} />
                            </Col>
                            <Col>
                                <Form.Label>Avg Insolation (KWh/M2/Day)</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control name="avgInsolation" type="text" onChange={this.handleChange} value={this.state.plant.avgInsolation} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Annual Avg Ambient Temp. (Degree Celcius)</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control name="avgTemperature" type="text" onChange={this.handleChange} value={this.state.plant.avgTemperature} />
                            </Col>
                            <Col>
                                <Form.Label>Annual Avg Wind Speed (M/S)</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control name="avgWindSpeed" type="text" onChange={this.handleChange} value={this.state.plant.avgWindSpeed} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Pre-Inverter Derate- Module Mismatch (%)</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control name="moduleMismatch" type="text" onChange={this.handleChange} value={this.state.plant.moduleMismatch} />
                            </Col>
                            <Col>
                                <Form.Label>Pre-Inverter Derate- Diodes Inter Connections (%)</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control name="diodesInterConnections" type="text" onChange={this.handleChange} value={this.state.plant.diodesInterConnections} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Pre-Inverter Derate- DC Wiring (%)<span className="form-required">*</span></Form.Label>
                            </Col>
                            <Col>
                                <Form.Control name="dcWiring" type="text" onChange={this.handleChange} value={this.state.plant.dcWiring} />
                                {this.renderErrortext("dcWiring", "The Pre-Inverter Derate- DC Wiring field is required")}
                            </Col>
                            <Col>
                                <Form.Label>Date Of Commissioning<span className="form-required">*</span></Form.Label>
                            </Col>
                            <Col>
                                <Form.Control name="commissioningDate" type="date" onChange={this.handleChange} value={this.state.plant.commissioningDate} />
                                {this.renderErrortext("commissioningDate", "The Date Of Commissioning field is required")}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Ftp Url<span className="form-required">*</span></Form.Label>
                            </Col>
                            <Col>
                                <Form.Control name="ftpUrl" type="text" onChange={this.handleChange} value={this.state.plant.ftpUrl} />
                                {this.renderErrortext("ftpUrl", "The Ftp Url field is required")}
                            </Col>
                            <Col>
                                <Form.Label>Ftp User Id<span className="form-required">*</span> </Form.Label>
                            </Col>
                            <Col>
                                <Form.Control name="ftpUserId" type="text" onChange={this.handleChange} value={this.state.plant.ftpUserId} />
                                {this.renderErrortext("ftpUserId", "The Ftp User Id field is required")}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Ftp Password<span className="form-required">*</span></Form.Label>
                            </Col>
                            <Col>
                                <Form.Control name="ftpPassword" type="password" onChange={this.handleChange} value={this.state.plant.ftpPassword} />
                                {this.renderErrortext("ftpPassword", "The Ftp Password field is required")}
                            </Col>
                            <Col>
                                <Form.Label>Pre-Inverter Derate- Soiling (%)</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control name="soiling" type="text" onChange={this.handleChange} value={this.state.plant.soiling} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Inverter Derate (%)</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control name="inverterDerate" type="text" onChange={this.handleChange} value={this.state.plant.inverterDerate} />
                            </Col>
                            <Col>
                                <Form.Label>System Derate Till Inverter(%)</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control name="systemDerate" type="text" onChange={this.handleChange} value={parseInt(this.state.plant.systemDerate)} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Post Inverter Derate- AC Wiring (%)</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control name="acWiring" type="text" onChange={this.handleChange} value={this.state.plant.acWiring} />
                            </Col>
                            <Col>
                                <Form.Label>Medium Voltage Transformer (%)</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control name="mediumVoltageTransformer" type="text" onChange={this.handleChange} value={this.state.plant.mediumVoltageTransformer} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Total Post Inverter Derate (%)</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control name="totalPostInverterDerate" type="text" onChange={this.handleChange} value={this.state.plant.totalPostInverterDerate} />
                            </Col>
                            <Col>
                                <Form.Label>Total System Derate (%)</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control name="totalSystemDerate" type="text" onChange={this.handleChange} value={this.state.plant.totalSystemDerate} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Module Rating (Wp)</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control name="moduleRating" type="text" onChange={this.handleChange} value={this.state.plant.moduleRating} />
                            </Col>
                            <Col>
                                <Form.Label>Type Of PV Module</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control name="typePvModule" type="text" onChange={this.handleChange} value={this.state.plant.typePvModule} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Module Manufacturer</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control name="moduleManufacturer" type="text" onChange={this.handleChange} value={this.state.plant.moduleManufacturer} />
                            </Col>
                            <Col>
                                <Form.Label>Module Rated Regradation Factor Per Annum (%)</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control name="moduleRatedDegradationFactor" type="text" onChange={this.handleChange} value={this.state.plant.moduleRatedDegradationFactor} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Temperature Coefficient Of Power(%)<span className="form-required">Enter Negative Values Only</span></Form.Label>
                            </Col>
                            <Col>
                                <Form.Control name="temperatureCoefficientPower" type="text" onChange={this.handleChange} value={parseInt(this.state.plant.temperatureCoefficientPower)} />
                            </Col>
                            <Col>
                                <Form.Label>Total No Of Pv Modules</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control name="totalNoPvModules" type="text" onChange={this.handleChange} value={this.state.plant.totalNoPvModules} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Max Array Bus Voltage (V)</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control name="maxArrayBusVoltage" type="text" onChange={this.handleChange} value={this.state.plant.maxArrayBusVoltage} />
                            </Col>
                            <Col>
                                <Form.Label>Number Of Modules In Series</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control name="noModulesSeries" type="text" onChange={this.handleChange} value={this.state.plant.noModulesSeries} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Number Of Parallel Strings</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control name="noParallelStrings" type="text" onChange={this.handleChange} value={this.state.plant.noParallelStrings} />
                            </Col>
                            <Col>
                                <Form.Label>PV Module Mounting</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control name="pvModuleMounting" type="text" onChange={this.handleChange} value={this.state.plant.pvModuleMounting} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Tilting Provision</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control name="tiltingProvision" type="text" onChange={this.handleChange} value={this.state.plant.tiltingProvision} />
                            </Col>
                            <Col>
                                <Form.Label>PV Module Mounting Structure</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control name="moduleMountingStructure" type="text" onChange={this.handleChange} value={this.state.plant.moduleMountingStructure} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Inverter Capacity (KW)</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control name="inverterCapacity" type="text" onChange={this.handleChange} value={this.state.plant.inverterCapacity} />
                            </Col>
                            <Col>
                                <Form.Label>Number Of Inverters</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control name="noInverters" type="text" onChange={this.handleChange} value={this.state.plant.noInverters} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>MPPT Voltage Range (V-V)</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control name="mpptVoltageRange" type="text" onChange={this.handleChange} value={this.state.plant.mpptVoltageRange} />
                            </Col>
                            <Col>
                                <Form.Label>Grid Interfacing Voltage (V)</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control name="gridInterfacingVoltage" type="text" onChange={this.handleChange} value={this.state.plant.gridInterfacingVoltage} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Estimated System Efficiency (%)</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control name="estimatedSystemEfficiency" type="text" onChange={this.handleChange} value={this.state.plant.estimatedSystemEfficiency} />
                            </Col>
                            <Col>
                                <Form.Label>Annual PV Generation (MWh)</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control name="annualPvGeneration" type="text" onChange={this.handleChange} value={this.state.plant.annualPvGeneration} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Area Inverter Pad (M2)</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control name="areaInverterPad" type="text" onChange={this.handleChange} value={this.state.plant.areaInverterPad} />
                            </Col>
                            <Col>
                                <Form.Label>Area Plant Acres (In Acres)</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control name="areaPlantAcres" type="text" onChange={this.handleChange} value={this.state.plant.areaPlantAcres} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Project Life (Years)</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control name="projectLife" type="text" onChange={this.handleChange} value={this.state.plant.projectLife} />
                            </Col>
                            <Col>
                                <Form.Label>Tariff (In Rupee Per KW)</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control name="tariff" type="text" onChange={this.handleChange} value={this.state.plant.tariff} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Power Division</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control name="powerDivision" type="text" onChange={this.handleChange} value={parseInt(this.state.plant.powerDivision)} />
                            </Col>
                            <Col>
                                <Form.Label>Min PLF</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control name="minPlf" type="text" onChange={this.handleChange} value={parseInt(this.state.plant.minPlf)} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Plant Type<span className="form-required">*</span></Form.Label>
                            </Col>
                            <Col>
                                <Form.Control name="type" as="select" onChange={this.handleChange}>
                                    <option>{this.state.plantTypeValue}</option>
                                    <option>GROUNDMOUNT</option>
                                    <option>ROOFTOP</option>
                                </Form.Control>
                                {this.renderErrortext("type", "The Plant Type field is required")}
                            </Col>
                            <Col>
                                <Form.Label>Max PLF</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control name="maxPlf" type="text" onChange={this.handleChange} value={parseInt(this.state.plant.maxPlf)} />
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Label>Multiple Adaptor Used!</Form.Label>
                            </Col>
                            <Col>
                                {['radio'].map(type => (
                                    <div key={`inline-${type}`} className="mb-3">
                                        <Form.Check inline label="Yes" type={type} value="1" name="multipleAdaptorUsed" id={`inline-${type}-1`} onChange={this.handleChange} checked={this.state.plant.multipleAdaptorUsed === 1} />
                                        <Form.Check inline label="No" type={type} value="0" name="multipleAdaptorUsed" id={`inline-${type}-2`} onChange={this.handleChange} checked={this.state.plant.multipleAdaptorUsed === 0} />
                                        {/* checked={this.state.plant.multipleAdaptorUsed==="0"} */}
                                    </div>
                                ))}
                            </Col>
                            <Col>
                                <Form.Label>Hub</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control name="hub" as="select" value={this.props.location.plant !== undefined ? 0 : 0} onChange={this.handleChange}>
                                    <option value="0">-- Select hub --</option>
                                    <option value="20">GM_Tahliwala and Korianwali</option>
                                    <option value="21">GM_Vanwala_Bhittiwala_Sikwwala</option>
                                    <option value="22">GM_Jandian_Badal_Killianwali</option>
                                    <option value="23">GM_Bahadurkhera</option>
                                    <option value="24">GM_Andhra Pradesh 1</option>
                                    <option value="25">GM_Raj1_Raj2</option>
                                    <option value="26">GM_Karnataka</option>
                                    <option value="27">GM_Bihar</option>
                                    <option value="28">GM_UP_Hub</option>
                                    <option value="29">GM_UP 2.3 2.4 Hub</option>
                                    <option value="33">GM_Chhattisgarh</option>
                                    <option value="34">GM_Ambajari</option>
                                    <option value="35">GM_Bhandara</option>
                                    <option value="36">GM_Gujarat1</option>
                                    <option value="37">GM_Andhra_Pradesh 2.1 and 2.2_Hub</option>
                                    <option value="38">GM_Telangana</option>
                                    <option value="39">GM_Andhra Pradesh 3</option>
                                    <option value="40">GM_Pavagada</option>
                                    <option value="41">GM_Gujarat 2.7</option>
                                    <option value="42">GM_Gujarat 2.1</option>
                                    <option value="43">GM_Gujarat 2.2</option>
                                    <option value="44">GM_Gujarat 2.3</option>
                                    <option value="45">GM_Gujarat 2.4</option>
                                    <option value="46">GM_Gujarat 2.5</option>
                                    <option value="47">GM_Gujarat 2.6</option>
                                    <option value="4">Ludhiana</option>
                                    <option value="5">Delhi	</option>
                                    <option value="6">kanpur</option>
                                    <option value="7">Gandhinagar</option>
                                    <option value="8">Ajmer</option>
                                    <option value="9">Bhubaneswar</option>
                                    <option value="10">Calcutta &amp; Siliguri</option>
                                    <option value="11">Chennai</option>
                                    <option value="12">Hyderabad</option>
                                </Form.Control>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Project Type<span className="form-required">*</span></Form.Label>
                            </Col>
                            <Col>
                                <DropDown
                                    className="form-control"
                                    name="project_type"
                                    itemSource={this.getDropDownProjectTypes()}
                                    value={this.state.plant.project_type}
                                    handleChange={(event) => this.handleChange({
                                        target: {
                                            name: 'project_type',
                                            value: event.target.value
                                        }
                                    })}
                                />
                                {/* <Form.Control name="project_type" as="select" onChange={this.handleChange} value={this.state.plant.project_type}>
                                    <option>--Default--</option>
                                </Form.Control> */}
                                {this.renderErrortext("project_type", "The Project Type field is required")}
                            </Col>
                            <Col>
                                {/* <Form.Label>District</Form.Label> */}
                            </Col>
                            <Col>
                                {/* <Form.Control type="text"/>                         */}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            </Col>
                            <Col md={2}>
                                <Button variant="primary" size="md" block onClick={this.onSubmit}>Submit</Button>
                            </Col>
                            <Col md={3}>
                                <Button variant="primary" size="md" block>Manage AMR Meter Number</Button>
                            </Col>
                            <Col md={2}>
                                <Link to="/">
                                    <Button variant="primary" size="md" block>Back</Button>
                                </Link>
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

        plant: state.plant,
        plants: state.plants.allplants
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createOrUpdatePlant: (plant) => dispatch(createOrUpdatePlant(plant))
    }
}

// const bindActions = dispatch => ({
//     saveAppointment: (appointment) =>
//       dispatch(AppointmentActions.saveAppointment(appointment))
//   });

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PlantAddEditComponent))
