import React, { Component } from 'react';
import axios from 'axios';
import {createOrUpdatePlant} from "../../actions"
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import '../../styles/plant/plantAddEdit.scss';
import { Route } from 'react-router-dom';
import {getPlantByType} from "../../actions/PlantActions";
import { createOrUpdateLenderDetails } from "../../actions/LenderDetailsAction";

class addEditLenderDetail extends Component{

    constructor(props) {
        super(props);
        if(this.props.location.LenderDetailRowData === undefined){
        this.state = {
            plants: [],
            isSubmited: false,
            plant_type: "Select Type",
            plant_name : "Select Plant",
            plant_types:["GROUNDMOUNT", "ROOFTOP"],
            submitedFields: ["plantId", "month", "year", "acCapacity", "dcCapacity", "insolationOnTilt", 
            "generation","derate","temperature","gridOutageTime","plantDownTime","iam","pvIrradiance","soiling","arrayMissmatch","moduleQuality",
            "ohmic","invEfficiency","invClipping","acOhmic","transformer","transmission","auxiliary","shading"],
            aopRowData : {
                type: "Lender",
                plantId: '',
                month:'Select Month',
                year:'Select Year',
                acCapacity:'',
                dcCapacity:'',
                insolationOnTilt:'',
                generation:'',
                derate:'',
                temperature:'',
                gridOutageTime:'',
                plantDownTime:'',
                iam:'',
                pvIrradiance:'',
                soiling:'',
                arrayMissmatch:'',
                moduleQuality:'',
                ohmic:'',
                invEfficiency:'',
                invClipping:'',
                acOhmic:'',
                transformer:'',
                transmission:'',
                auxiliary:'',
                shading:'',
                bDcPlf:"0",
                actualPlf:null,
                againstLiePlf:null,
                deviationLiePlf:null,
                designLoss:null,
                technicalLoss:null,
                gridOutageLoss:null,
                lieInsolation:null,
                actualInsolatin:null,
                actualGeneration:null,
                technicalImproved:null,
                improvedPpa:null
            },
            pageName: "Add Lender Details"
            // component_affected:[""]
        }
    }
    else{
        this.state = {
            plants: [],
            isSubmited: false,
            plant_type: this.props.location.LenderDetailRowData.plant_type,
            plant_name: this.props.location.LenderDetailRowData.plant_name,
            plant_types:["GROUNDMOUNT", "ROOFTOP"],
            monthYearFormat:this.props.location.LenderDetailRowData.monthYearFormat.substring(0,3),
            submitedFields: ["plantId", "month", "year",  "acCapacity", "dcCapacity", "insolationOnTilt", 
            "generation","derate","temperature","gridOutageTime","plantDownTime","iam","pvIrradiance","soiling","arrayMissmatch","moduleQuality",
            "ohmic","invEfficiency","invClipping","acOhmic","transformer","transmission","auxiliary","shading"],
            aopRowData : {
                //_id:this.props.location.LenderDetailRowData._id,
                lenderDetailId: this.props.location.LenderDetailRowData.lenderDetailId,
                type: this.props.location.LenderDetailRowData.type,
                plantId: this.props.location.LenderDetailRowData.plantId,
                month:this.props.location.LenderDetailRowData.month,
                year:this.props.location.LenderDetailRowData.year,
                acCapacity:this.props.location.LenderDetailRowData.acCapacity,
                dcCapacity:this.props.location.LenderDetailRowData.dcCapacity,
                insolationOnTilt:this.props.location.LenderDetailRowData.insolationOnTilt,
                generation:this.props.location.LenderDetailRowData.generation,
                derate:parseInt(this.props.location.LenderDetailRowData.derate)/100,
                temperature:parseInt(this.props.location.LenderDetailRowData.temperature)/100,
                gridOutageTime:parseInt(this.props.location.LenderDetailRowData.gridOutageTime)/100,
                plantDownTime:parseInt(this.props.location.LenderDetailRowData.plantDownTime)/100,
                iam:parseInt(this.props.location.LenderDetailRowData.iam)/100,
                pvIrradiance:parseInt(this.props.location.LenderDetailRowData.pvIrradiance)/100,
                soiling:parseInt(this.props.location.LenderDetailRowData.soiling)/100,
                arrayMissmatch:parseInt(this.props.location.LenderDetailRowData.arrayMissmatch)/100,
                moduleQuality:parseInt(this.props.location.LenderDetailRowData.moduleQuality)/100,
                ohmic:parseInt(this.props.location.LenderDetailRowData.ohmic)/100,
                invEfficiency:this.props.location.LenderDetailRowData.invEfficiency,
                invClipping:parseInt(this.props.location.LenderDetailRowData.invClipping)/100,
                acOhmic:parseInt(this.props.location.LenderDetailRowData.acOhmic)/100,
                transformer:parseInt(this.props.location.LenderDetailRowData.transformer)/100,
                transmission:parseInt(this.props.location.LenderDetailRowData.transmission)/100,
                auxiliary:parseInt(this.props.location.LenderDetailRowData.auxiliary)/100,
                shading:parseInt(this.props.location.LenderDetailRowData.shading)/100,
                bDcPlf:"0",
                actualPlf:null,
                againstLiePlf:null,
                deviationLiePlf:null,
                designLoss:null,
                technicalLoss:null,
                gridOutageLoss:null,
                lieInsolation:null,
                actualInsolatin:null,
                actualGeneration:null,
                technicalImproved:null,
                improvedPpa:null
            },
            pageName: "Edit Lender Details"
            // component_affected:[""]
        }
        
    }
        this.handleChangePlant = this.handleChangePlant.bind(this);
        this.handleChange = this.handleChange.bind(this)
       
       
    }

    addComponentAffected(){
        //<Form.Control name="component_affected" type="text" />
    }
    componentDidMount() {
        // document.title = 'Plant Fault Data';
    }

   fieldValid() {
        let inValid = false;

        this.state.submitedFields.map((item) => {
            if (!this.state.aopRowData[item] && this.state.aopRowData[item]!== 0) {
                inValid = true;
            }
        })
        return inValid;
    }

    handleChangePlant(event) {
        if(event.target.name === "plant_type" ){
            const stateDup = this.state;
            stateDup.plant_type = event.target.value;
            this.setState({ stateDup });
          
            this.props.getPlantByType(stateDup.plant_type);
        }
        else{
            const stateDup1 = this.state;  
            let plantsByType = this.props.plantsByType; 
            stateDup1.plant_name = event.target.value;
            for(var i=0;i<plantsByType.length;i++){
                if(plantsByType[i].plantName === event.target.value){
                    stateDup1.aopRowData.plantId = plantsByType[i].plantId;
                    break;
                }
            }
            
            this.setState({stateDup1});
           
        }
    }

    handleChange(event) {
        const stateDup = this.state.aopRowData;
        if(event.target.name !== "month"){
        stateDup[event.target.name]=event.target.value;
        }
        else{
            var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
            stateDup[event.target.name]=months.indexOf(event.target.value)+1;
        }
        this.setState({stateDup});
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.aopRowData !== null && this.fieldValid() === false) {
            this.props.createOrUpdateLenderDetails(this.state.aopRowData);
            if(this.props.location.LenderDetailRowData === undefined){
            alert('Lender detail has been created successfully');
            }
            else{
                alert('Lender detail has been updated successfully');   
            }
            this.props.history.push('/lenderDetails');
        }

        this.setState({ isSubmited: true });
    }


    handleChangePlantType(event) {
        const _data = this.state.postData;
        const selectedValue = event.target.value;
        if (selectedValue) {
            _data[event.target.name] = selectedValue;
            this.props.getPlantByType(selectedValue);
            this.setState({ postData: _data });
        }
    }

    renderErrortext(fieldID, msg) {
        return (
            this.state.isSubmited === true && !this.state.aopRowData[fieldID] && <p className="errorText" style={{ color: "#CC0000", display: "block", fontSize: "11px", marginTopop: "0.5em" }}>{msg}</p>
        )
    }

    

    render(){
        return(
            <div>
                <Card className="add-plant-card">
                  <Card.Header as="h5">{this.state.pageName}</Card.Header>
                  <Card.Body>
                    <Row>
                        <Col>
                            <Form.Label>Plant Type<span className="form-required">*</span></Form.Label>
                        </Col>
                        <Col >
                        <select className="form-control" width='300px' name="plant_type" onChange={(item) => this.handleChangePlant(item)} disabled={this.state.pageName==='Edit Lender Details'}>
                        <option>{this.state.plant_type}</option>   
                         {this.state.plant_types.map((plantType, key) => <option key={plantType}>{plantType}</option>)}
                        </select>
                        </Col>
                        <Col>
                            <Form.Label>Plant<span className="form-required">*</span></Form.Label>
                        </Col>
                        <Col>
                            <select className="form-control" width='300px' name="plant_name" onChange={(item) => this.handleChangePlant(item)} disabled={this.state.pageName==='Edit Lender Details'}>
                            
                            <option>{this.state.plant_name}</option>
                            {this.props.plantsByType === undefined?<option>default</option>:this.props.plantsByType.map((plant, key) => <option key={plant.plantId}>{plant.plantName}</option>)}
                        </select>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label>Month<span className="form-required">*</span></Form.Label>
                        </Col>
                        <Col>
                            <select className="form-control" name="month" width='300px' onChange={this.handleChange} disabled={this.state.pageName==='Edit Lender Details'}>
                                <option >{this.state.monthYearFormat}</option>
                                <option >January</option>
                                <option >February</option>
                                <option >March</option>
                                <option >April</option>
                                <option >May</option>
                                <option >June</option>
                                <option >July</option>
                                <option >August</option>
                                <option >September</option>
                                <option >October</option>
                                <option >November</option>
                                <option >December</option>
                                
                            </select>
                        </Col>
                        <Col>
                            <Form.Label>Year<span className="form-required">*</span></Form.Label>
                        </Col>
                        <Col>
                            <select class="form-control" name="year" type="dropdown" width='300px' onChange={this.handleChange} disabled={this.state.pageName==='Edit Lender Details'}>
                            <option >{this.state.aopRowData.year}</option>
                                <option >2014</option>
                                <option >2015</option>
                                <option >2016</option>
                                <option >2017</option>
                                <option >2018</option>
                                <option >2019</option>
                                <option >2020</option>
                                <option >2021</option>
                                <option >2022</option>
                                
                            </select> 
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label>Insolation On Tilt<span className="form-required">*</span></Form.Label>
                        </Col>
                        <Col>
                        <Form.Control type="text" name="insolationOnTilt" onChange={this.handleChange} value={this.state.aopRowData.insolationOnTilt}/>
                        {this.renderErrortext("insolationOnTilt", "The Insolation on Tilt Field Is Required.")}
                        </Col>
                        <Col>
                            <Form.Label>Generation<span className="form-required">*</span></Form.Label>
                        </Col>
                        <Col>
                        <Form.Control type="text" name="generation" onChange={this.handleChange} value={this.state.aopRowData.generation}/>
                        {this.renderErrortext("generation", "The Generation Field Is Required.")}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label>Derate<span className="form-required">*</span></Form.Label>
                        </Col>
                        <Col>
                        <Form.Control type="text" name="derate" onChange={this.handleChange} value={this.state.aopRowData.derate}/>
                        {this.renderErrortext("derate", "The Derate Field Is Required.")}
                        </Col>
                        <Col>
                            <Form.Label>Temperature<span className="form-required">*</span></Form.Label>
                        </Col>
                        <Col>
                        <Form.Control type="text" name="temperature" onChange={this.handleChange} value={this.state.aopRowData.temperature}/>
                        {this.renderErrortext("temperature", "The Temperature Field Is Required.")}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label>IAM<span className="form-required">*</span></Form.Label>
                        </Col>
                        <Col>
                        <Form.Control type="text" name="iam" onChange={this.handleChange} value={this.state.aopRowData.iam}/>
                        {this.renderErrortext("iam", "The IAM Field Is Required.")}
                        </Col>
                        <Col>
                            <Form.Label>PV Irradiance<span className="form-required">*</span></Form.Label>
                        </Col>
                        <Col>
                        <Form.Control type="text" name="pvIrradiance" onChange={this.handleChange} value={this.state.aopRowData.pvIrradiance}/>
                        {this.renderErrortext("pvIrradiance", "The PV Irradiance Field Is Required.")}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label>Soiling<span className="form-required">*</span></Form.Label>
                        </Col>
                        <Col>
                        <Form.Control type="text" name="soiling" onChange={this.handleChange} value={this.state.aopRowData.soiling}/>
                        {this.renderErrortext("soiling", "The Soiling Field Is Required.")}
                        </Col>
                        <Col>
                            <Form.Label>Array Missmatch<span className="form-required">*</span></Form.Label>
                        </Col>
                        <Col>
                            <Form.Control type="text" name="arrayMissmatch" onChange={this.handleChange} value={this.state.aopRowData.arrayMissmatch}/>
                            {this.renderErrortext("arrayMissmatch", "The Array Mismatch Field Is Required.")}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label>Module Quality<span className="form-required">*</span></Form.Label>
                        </Col>
                        <Col>
                        <Form.Control type="text" name="moduleQuality" onChange={this.handleChange} value={this.state.aopRowData.moduleQuality}/>
                        {this.renderErrortext("moduleQuality", "The Module Quantity Field Is Required.")}
                        </Col>
                        <Col>
                            <Form.Label>Ohmic<span className="form-required">*</span></Form.Label>
                        </Col>
                        <Col>
                            <Form.Control type="text" name="ohmic" onChange={this.handleChange} value={this.state.aopRowData.ohmic}/>
                            {this.renderErrortext("ohmic", "The Ohmic Field Is Required.")}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label>Inverter Efficiency<span className="form-required">*</span></Form.Label>
                        </Col>
                        <Col>
                        <Form.Control type="text" name="invEfficiency" onChange={this.handleChange} value={this.state.aopRowData.invEfficiency}/>
                        {this.renderErrortext("invEfficiency", "The Inverter Efficiency Field Is Required.")}
                        </Col>
                        <Col>
                            <Form.Label>Inverter Clipping<span className="form-required">*</span></Form.Label>
                        </Col>
                        <Col>
                            <Form.Control type="text" name="invClipping" onChange={this.handleChange} value={this.state.aopRowData.invClipping}/>
                            {this.renderErrortext("invClipping", "The Inverter Clipping Field Is Required.")}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label>AC Ohmic<span className="form-required">*</span></Form.Label>
                        </Col>
                        <Col>
                        <Form.Control type="text" name="acOhmic" onChange={this.handleChange} value={this.state.aopRowData.acOhmic}/>
                        {this.renderErrortext("acOhmic", "The AC Ohmic Field Is Required.")}
                        </Col>
                        <Col>
                            <Form.Label>Transformer<span className="form-required">*</span></Form.Label>
                        </Col>
                        <Col>
                            <Form.Control type="text" name="transformer" onChange={this.handleChange} value={this.state.aopRowData.transformer}/>
                            {this.renderErrortext("transformer", "The Transformer Field Is Required.")}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label>Transmission<span className="form-required">*</span></Form.Label>
                        </Col>
                        <Col>
                        <Form.Control type="text" name="transmission" onChange={this.handleChange} value={this.state.aopRowData.transmission}/>
                        {this.renderErrortext("transmission", "The Transmission Field Is Required.")}
                        </Col>
                        <Col>
                            <Form.Label>Auxiliary<span className="form-required">*</span></Form.Label>
                        </Col>
                        <Col>
                            <Form.Control type="text" name="auxiliary" onChange={this.handleChange} value={this.state.aopRowData.auxiliary}/>
                            {this.renderErrortext("auxiliary", "The Auxiliary Field Is Required.")}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label>Grid Outage Time<span className="form-required">*</span></Form.Label>
                        </Col>
                        <Col>
                        <Form.Control type="text" name="gridOutageTime" onChange={this.handleChange} value={this.state.aopRowData.gridOutageTime}/>
                        {this.renderErrortext("gridOutageTime", "The Grid Outage Time Field Is Required.")}
                        </Col>
                        <Col>
                            <Form.Label>Plant Down Time<span className="form-required">*</span></Form.Label>
                        </Col>
                        <Col>
                            <Form.Control type="text" name="plantDownTime" onChange={this.handleChange} value={this.state.aopRowData.plantDownTime}/>
                            {this.renderErrortext("plantDownTime", "The Plant Down Time Field Is Required.")}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label>AC Capacity<span className="form-required">*</span></Form.Label>
                        </Col>
                        <Col>
                        <Form.Control type="text" name="acCapacity" onChange={this.handleChange} value={this.state.aopRowData.acCapacity}/>
                        {this.renderErrortext("acCapacity", "The AC Capacity Field Is Required.")}
                        </Col>
                        <Col>
                            <Form.Label>DC Capacity<span className="form-required">*</span></Form.Label>
                        </Col>
                        <Col>
                            <Form.Control type="text" name="dcCapacity" onChange={this.handleChange} value={this.state.aopRowData.dcCapacity}/>
                            {this.renderErrortext("dcCapacity", "The DC Capacity Field Is Required.")}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label>Shading<span className="form-required">*</span></Form.Label>
                        </Col>
                        <Col>
                        <Form.Control type="text" name="shading" onChange={this.handleChange} value={this.state.aopRowData.shading}/>
                        {this.renderErrortext("shading", "The Shading Field Is Required.")}
                        </Col>
                        <Col>
                        </Col>
                        <Col>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        </Col>
                        <Col md={2}>
                            <Button variant="primary" size="md" onClick={this.onSubmit} block>Submit</Button>
                        </Col>
                        <Route render={({ history }) => (
                            <Col md={2}>
                                <Button variant="primary"  size="md" onClick={() => { history.push('/lenderDetails') }} block>Back</Button>
                            </Col>
                            )}/>
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

        lenderDetails: state.lenderDetails,
        plantsByType: state.plants.plantsByType,
        
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPlantByType: (plantsByType) => dispatch(getPlantByType(plantsByType)),
        createOrUpdateLenderDetails: (lenderDetails) => dispatch(createOrUpdateLenderDetails(lenderDetails))
    }
}
export default  withRouter(connect(mapStateToProps,mapDispatchToProps)(addEditLenderDetail)) ;