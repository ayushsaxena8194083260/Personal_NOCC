import React, { Component } from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { withRouter, Link } from 'react-router-dom';
import 'react-picky/dist/picky.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import DropDown from '../../../../../Common/DropDown';
import { createUpdateFTPMappings, clearSettingPlantMapping } from '../../../../../../actions/action-Settings';
import { connect } from 'react-redux';
import { getPlantByType } from "../../../../../../actions/PlantActions";
import Picky from 'react-picky';
import { Route } from 'react-router-dom';


class FTPInverterMappingEdit extends Component {
        constructor(props) {
        super(props);
        if(this.props.location.ftpInvMapp!=undefined){
        this.state = {
            selectedPlanType: null,
            plantTypes: this.props.plantTypes,
            selectedPlantOptions: [],
            // postData: this.props.location && this.props.location.ftpInvMapp? this.props.location.ftpInvMapp : {},
            postData: this.props.location && this.props.location.ftpInvMapp ? this.props.location.ftpInvMapp : {},
            // alternateAdapter: this.props.alternateAdapter,
            plantName: this.props.location.plantName,
            type: this.props.location.type,
            plantId: this.props.location.plantId,
            pageName: 'Edit Inverter Mapping',
            selectedPlantType:null
        };
    }
    else{
        this.state = {
            selectedPlantType: null,
            selectedPlant: null,
            plantType:["GROUNDMOUNT", "ROOFTOP"],
            plantTypes: this.props.plantTypes,
            selectedPlantOptions: [],
            // postData: this.props.location && this.props.location.ftpInvMapp? this.props.location.ftpInvMapp : {},
            // alternateAdapter: this.props.alternateAdapter,
            plantName: this.props.plantName,
            type: this.props.plantType,
            plantId: '',
            pageName: 'Add Inverter Mapping',
            postData:{
            plantId:'',
            adapterId:'',
            alternateAdapterId:'',
            sourcePath:'',
            filePath:''
            }


        }
    }
        this.selectMultipleOption = this.selectMultipleOption.bind(this);
        this.handleChangePlant = this.handleChangePlant.bind(this);
    }

    componentDidMount() {
        // document.title = 'Plant Fault Data';
        // this.props.clearSettingPlantMapping();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.postData!=null){
            this.setState({
            plantTypes: nextProps.plantTypes,
            postData: nextProps.postData,
            alternateAdapter: nextProps.alternateAdapter,
        });
        }
        else{
        this.setState({
            plantTypes: nextProps.plantTypes,
            plantsByType: nextProps.plantsByType,
            alternateAdapter: nextProps.alternateAdapter,
            // displayMessage: nextProps.displayMessage
        });
    }
    }

    handleChangePlantType(event) {
        const selectedValue = event.target.value;
        if (selectedValue !== this.state.selectedPlantType) {
            this.props.getPlantByType(selectedValue);
            this.setState({ selectedPlantType: selectedValue, selectedPlantOptions: [] });
        }
    }

    handleChangePlants(event) {
        const selectedValue = event.target.value;
        this.setState({ selectedPlantOptions: selectedValue });
    }

    // getDropDownPlants() {
    //     let plants = [];
    //     plants.push({ displayText: "Select Plant", value: "0" })
    //     this.state.plantTypes && this.state.plantTypes.map((item) => {
    //         plants.push({ displayText: item.plantName, value: item.plantId })
    //     });

    //     return plants;
    // }

    getPlantTypesDropDownOptions() {
        const options = this.state.plantTypes && this.state.plantTypes.map((plantTypes, key) => { return { id: plantTypes.plantId, name: plantTypes.plantName } });
        return options;
    }

    selectMultipleOption(value) {
        if (value) {
            this.setState({ selectedPlantOptions: value });
        }
    }

    handleChange(event) {
        let _data = this.state.postData;
        _data[event.target.name] = event.target.value;
        this.setState({ postData: _data });
    }

    renderErrortext(fieldID, msg) {
        return (
            this.state.isSubmited === true && !this.state.postData[fieldID] && <p className="errorText" style={{ color: "#CC0000", display: "block", fontSize: "11px", marginTopop: "0.5em" }}>{msg}</p>
        )
    }

    handleChangeAdapter(event) {
        const _data = this.state.postData;
        const selectedValue = event.target.value;
        if (selectedValue && selectedValue.adapterId !== "-1") {
            _data[event.target.name] = selectedValue;
            this.setState({ postData: _data });
        }
    }

    handleChangeAdapterNme(event){
        const _data = this.state.postData;
        const selectedValue = event.target.value;
        if (selectedValue && selectedValue.adapterId !== "-1") {
            _data[event.target.name] = selectedValue;
            this.setState({ postData: _data });
        }
    }

    handleChangePlant(event) {
        if(event.target.name === "plant_type" ){
            const stateDup = this.state;
            stateDup.selectedPlantType = event.target.value;
            this.setState({ stateDup });
          
            this.props.getPlantByType(stateDup.selectedPlantType);
        }
        else{
            const stateDup1 = this.state; 
            let plantsByType = this.props.plantsByType; 
            stateDup1.selectedPlant = event.target.value;
            for(var i=0;i<plantsByType.length;i++){
                if(plantsByType[i].plantName === event.target.value){
                    stateDup1.postData.plantId = plantsByType[i].plantId;
                    stateDup1.plantId = plantsByType[i].plantId;
                    break;
                }
            }
            
            this.setState({stateDup1});

            //this.props.getPlantTiltByPlantId(stateDup1.plant_id,stateDup1.selectedPlant,stateDup1.selectedPlantType);
        }
    }
    
    onSubmit = (e) => {
        e.preventDefault();
        this.state.postData["type"] = "INV";
        this.state.postData["plantId"] = this.state.plantId;
        if (this.state.postData != null) {
            this.props.createUpdateFTPMappings({input:{...this.state.postData}, type:this.props.pageName});
            this.props.history.push('/setting/FTPInverterMapping');
        }
    }

    render() {
        return (
            <form>
                <div>
                    <Card className="add-fault-card">
                        <Card.Header as="h5">{this.state.pageName}</Card.Header>
                        <Card.Body>
                            <Row>
                                <Col>
                                    <Form.Label>Type<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                {this.state.pageName==='Edit Inverter Mapping'?
                                    <div>{this.state.type}</div>
                                    :
                                    <select className="top-search-input form-control" width='300px' name="plant_type" onChange={(item) => this.handleChangePlant(item)}>
                        value={this.state.selectedPlantType} plant_type={this.state.selectedPlantType}    
                        <option >Select Plant Type</option>
                        {this.state.plantType.map((plantType, key) => <option key={plantType}>{plantType}</option>)}
                        </select>
                                    }
                                </Col>
                                <Col>
                                    <Form.Label>Plant<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                {this.state.pageName==='Edit Inverter Mapping'?
                                <div>{this.state.plantName}</div>
                                :
                                <select required class="form-control" name="plant_id" type="dropdown" name="plant_name" onChange={(item) => this.handleChangePlant(item)} >
                            value={this.state.selectedPlant} plant_name={this.state.selectedPlant}
                            <option>Select Plant</option>
                            {/* <option>{this.state.plans[0].plant_name}</option> */}
                            {this.props.plantsByType === undefined?<option>default</option>:this.props.plantsByType.map((plant, key) => <option key={plant.plantId}>{plant.plantName}</option>)}
                        </select>
                                }
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>Adapter<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                <select class="form-control" name="adapterId" type="dropdown" onChange={(item) => this.handleChangeAdapterNme(item)}>
                                        {this.props.alternateAdapter && this.props.alternateAdapter.map((item, key) => {
                                            if (this.state.postData && this.state.postData["adapterId"] == item.value) {
                                                return <option value={item.value} selected>{item.adapterName}</option>
                                            }
                                            else {
                                                return <option value={item.value}>{item.adapterName}</option>
                                            }
                                        }

                                        )}
                                    </select>
                                </Col>
                                <Col>
                                    <Form.Label>Alternate Adapter<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                <select class="form-control" name="alternateAdapterId" type="dropdown" onChange={(item) => this.handleChangeAdapter(item)}>
                                        {this.props.alternateAdapter && this.props.alternateAdapter.map((item, key) => {
                                            if (this.state.postData && this.state.postData["alternateAdapterId"] == item.value) {
                                                return <option value={item.value} selected>{item.adapterName}</option>
                                            }
                                            else {
                                                return <option value={item.value}>{item.adapterName}</option>
                                            }
                                        }

                                        )}
                                    </select>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>Source Path<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="sourcePath" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.sourcePath} />
                                </Col>
                                <Col>
                                    <Form.Label>File Path<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="filePath" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.filePath} />
                                </Col>
                            </Row>                            
                            <Row>
                                <Col>
                                </Col>
                                <Col md={2}>
                                    <Button type="submit" variant="primary" size="lg" onClick={this.onSubmit} block>Submit</Button>
                                </Col>
                                <Col md={2}>
                                <Link to="/setting/FTPInverterMapping">
                                    <Button variant="primary" size="lg" block>Back</Button>
                                </Link>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </div>
            </form >
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        pageName: props.location.ftpInvMapp ? props.location.ftpInvMapp.adapterId ? "Edit FTP" : "Add FTP" : null,
        plantsByType: state.plants.plantsByType,
        plantTypes: state.projectTypes.plantTypes,
        plants: state.plants.plants,
        // plantType: [{ displayText: "Select Plant Type", value: "-1" }, { displayText: "GROUNDMOUNT", value: "GROUNDMOUNT" }, { displayText: "ROOFTOP", value: "ROOFTOP" }],
        data: state.SettingsReducer.data,
        submitedFields: ["designName", "actualName", "dcLoading"],
        alternateAdapter: [{adapterName: "Select Adapter", value:"-1"},{adapterName: "csvImportAdapter", value:"1"},{adapterName: "csvImportAdapterRoofTop", value:"2"},
        {adapterName: "xmlImportAdapter", value:"3"},{adapterName: "xmlImportAdapterPkZip", value:"4"},
        {adapterName: "xmlImportMeanAdapter", value:"5"},{adapterName: "xmlImportMeanGuajratRoofTopAdapter", value:"6"},
        {adapterName: "csvImportRoofTopNewAdapter", value:"7"},{adapterName: "csvImportAdapterIPTPS", value:"8"},
        {adapterName: "csvImportAdapterFromDirectory", value:"9"},{adapterName: "csvImportAdapterRamnager", value:"10"},
        {adapterName: "xmlImportStringInverterAdapter", value:"11"},{adapterName: "csvImportAlternateAdapter", value:"12"},
        {adapterName: "csvImportAdapterPunjab", value:"13"}]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPlantByType: (plantsByType) => dispatch(getPlantByType(plantsByType)),
        clearSettingPlantMapping: () => dispatch(clearSettingPlantMapping()),
        createUpdateFTPMappings:(input) => dispatch(createUpdateFTPMappings(input))

    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FTPInverterMappingEdit));