import React, { Component } from 'react';
// import axios from 'axios';
// import {createOrUpdatePlant} from "../../actions"
import {connect} from 'react-redux'
import { withRouter} from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import '../../styles/plant/plantAddEdit.scss';
import { Route } from 'react-router-dom';
import {getPlantByType} from "../../actions/PlantActions";
import {getLenderDataByPlantIdMonthYear, createOrUpdateLenderDetails } from "../../actions/LenderDetailsAction";
import { getAllAOPBudgetDetailsData } from "../../actions/action-AOPBudgetDetails";

class AddEditBudgetDetail extends Component{

    constructor(props) {
        super(props);
        if(this.props.location.BudgetDetailRowData === undefined){
        this.state = {
            plants: [],
            isSubmited: false,
            plant_type: "Select Type",
            plant_name : "Select Plant",
            plant_types:["GROUNDMOUNT", "ROOFTOP"],
            submitedFields: ["plantId", "month", "year",  "actualPlf", "dcCapacity", "auxiliary", 
            "technicalLoss","gridOutageLoss","designLoss","temperature","actualInsolatin","actualGeneration","generation","soiling","improvedPpa","bDcPlf"],
            aopRowData : {
                type: "Budget",
                plantId: '',
                month:'Select Month',
                year:'Select Year',
                ac_capacity:null,
                dc_capacity:null,
                insolationOnTilt:null,
                generation:null,
                derate:null,
                temperature:null,
                grid_outage_time:null,
                plantDownTime:null,
                iam:null,
                pvIrradiance:null,
                soiling:null,
                arrayMissmatch:null,
                moduleQuality:null,
                ohmic:null,
                invEfficiency:null,
                invClipping:null,
                acOhmic:null,
                transformer:null,
                transmission:null,
                auxiliary:null,
                shading:null,
                b_dc_plf:0,
                actual_plf:null,
                againstLiePlf:null,
                deviationLiePlf:null,
                design_loss:null,
                technical_loss:null,
                grid_outage_loss:null,
                lieInsolation:null,
                actual_insolatin:null,
                actual_generation:null,
                technicalImproved:null,
                improved_ppa:null
            },
            pageName: "Add Budget Details"
            // component_affected:[""]
        }
    }
    else{
        this.state = {
            plants: [],
            isSubmited: false,
            plant_type: this.props.location.BudgetDetailRowData.plant_type,
            plant_name: this.props.location.BudgetDetailRowData.plant_name,
            plant_types:["GROUNDMOUNT", "ROOFTOP"],
            monthYearFormat:this.props.location.BudgetDetailRowData.monthYearFormat.substring(0,3),
            submitedFields: ["plantId", "month", "year",  "actualPlf", "dcCapacity", "auxiliary", 
            "technicalLoss","gridOutageLoss","designLoss","temperature","actualInsolatin","actualGeneration","generation","soiling","improvedPpa","bDcPlf"],
            aopRowData : {
                lenderDetailId: this.props.location.BudgetDetailRowData.lenderDetailId,
                type: this.props.location.BudgetDetailRowData.type,
                plantId: this.props.location.BudgetDetailRowData.plantId,
                month:this.props.location.BudgetDetailRowData.month,
                year:this.props.location.BudgetDetailRowData.year,
                acCapacity:this.props.location.BudgetDetailRowData.acCapacity,
                dcCapacity:this.props.location.BudgetDetailRowData.dcCapacity,
                insolationOnTilt:this.props.location.BudgetDetailRowData.insolationOnTilt,
                generation:this.props.location.BudgetDetailRowData.generation,
                derate:this.props.location.BudgetDetailRowData.derate,
                temperature:this.props.location.BudgetDetailRowData.temperature,
                gridOutageTime:this.props.location.BudgetDetailRowData.gridOutageTime,
                plantDownTime:this.props.location.BudgetDetailRowData.plantDownTime,
                iam:this.props.location.BudgetDetailRowData.iam,
                pvIrradiance:this.props.location.BudgetDetailRowData.pvIrradiance,
                soiling:this.props.location.BudgetDetailRowData.soiling,
                arrayMissmatch:this.props.location.BudgetDetailRowData.arrayMissmatch,
                moduleQuality:this.props.location.BudgetDetailRowData.moduleQuality,
                ohmic:this.props.location.BudgetDetailRowData.ohmic,
                invEfficiency:this.props.location.BudgetDetailRowData.invEfficiency,
                invClipping:this.props.location.BudgetDetailRowData.invClipping,
                acOhmic:this.props.location.BudgetDetailRowData.acOhmic,
                transformer:this.props.location.BudgetDetailRowData.transformer,
                transmission:this.props.location.BudgetDetailRowData.transmission,
                auxiliary:this.props.location.BudgetDetailRowData.auxiliary,
                shading:this.props.location.BudgetDetailRowData.shading,
                bDcPlf:"0",
                actualPlf:this.props.location.BudgetDetailRowData.actualPlf,
                againstLiePlf:this.props.location.BudgetDetailRowData.againstLiePlf,
                deviationLiePlf:this.props.location.BudgetDetailRowData.deviationLiePlf,
                designLoss:this.props.location.BudgetDetailRowData.designLoss,
                technicalLoss:this.props.location.BudgetDetailRowData.technicalLoss,
                gridOutageLoss:this.props.location.BudgetDetailRowData.gridOutageLoss,
                lieInsolation:this.props.location.BudgetDetailRowData.lieInsolation,
                actualInsolatin:this.props.location.BudgetDetailRowData.actualInsolatin,
                actualGeneration:this.props.location.BudgetDetailRowData.actualGeneration,
                technicalImproved:this.props.location.BudgetDetailRowData.technicalImproved,
                improvedPpa:this.props.location.BudgetDetailRowData.improvedPpa
            },
            pageName: "Edit Budget Details"
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
            if (!this.state.aopRowData[item] && this.state.aopRowData[item]!==0) {
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
        if(event.target.name === "year"){
        stateDup[event.target.name]=event.target.value;
        let yearMonthPlantId = {
            "month" : stateDup.month,
            "plantId" : stateDup.plantId,
            "year" : stateDup.year
        };
        this.props.getLenderDataByPlantIdMonthYear(yearMonthPlantId);    
        }
        else if(event.target.name === "month"){
            var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
            let monthStr = months.indexOf(event.target.value)+1
            stateDup[event.target.name]=monthStr.toString();
        }
        else {
            stateDup[event.target.name]=event.target.value;
        }
        this.setState({stateDup});
    }

    onSubmit = (e) => {
        e.preventDefault();
        let aopBudgetDetailFiltered = [];
        if (this.state.aopRowData !== null && this.fieldValid() === false) {
            if(this.props.location.BudgetDetailRowData === undefined){
            const stateDup = this.state;
            aopBudgetDetailFiltered = this.props.lenderDetailsByYearPlantIdMonth.filter(item => item.plantId === stateDup.aopRowData.plantId);
            aopBudgetDetailFiltered = aopBudgetDetailFiltered.filter(item => item.type === 'Budget');
                        
            if(aopBudgetDetailFiltered.length === 1){
            aopBudgetDetailFiltered[0].actualPlf = stateDup.aopRowData.actualPlf;
            aopBudgetDetailFiltered[0].dcCapacity = stateDup.aopRowData.dcCapacity;
            aopBudgetDetailFiltered[0].auxiliary = stateDup.aopRowData.auxiliary;
            aopBudgetDetailFiltered[0].technicalLoss = stateDup.aopRowData.technicalLoss;
            aopBudgetDetailFiltered[0].gridOutageLoss = stateDup.aopRowData.gridOutageLoss;
            aopBudgetDetailFiltered[0].designLoss = stateDup.aopRowData.designLoss;
            aopBudgetDetailFiltered[0].temperature = stateDup.aopRowData.temperature;
            aopBudgetDetailFiltered[0].actualInsolatin = stateDup.aopRowData.actualInsolatin;
            aopBudgetDetailFiltered[0].actualGeneration = stateDup.aopRowData.actualGeneration;
            aopBudgetDetailFiltered[0].generation = stateDup.aopRowData.generation;
            aopBudgetDetailFiltered[0].soiling = stateDup.aopRowData.soiling;
            aopBudgetDetailFiltered[0].improvedPpa = stateDup.aopRowData.improvedPpa;
            aopBudgetDetailFiltered[0].bDcPlf = stateDup.aopRowData.bDcPlf;

            this.props.createOrUpdateLenderDetails(aopBudgetDetailFiltered[0]);
            
            alert('Budget details has been created successfully');
            }
            else{
                this.props.createOrUpdateLenderDetails(this.state.aopRowData);
                alert('Budget details has been updated successfully');   
            }
        }
            else{
                this.props.createOrUpdateLenderDetails(this.state.aopRowData);
                alert('Budget details has been updated successfully');   
            }
        }
        else{
            alert('Duplicate lender details found'); 
        }
            this.props.history.push('/budgetDetail');
        

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
                        <select className=" form-control" width='300px' name="plant_type" onChange={(item) => this.handleChangePlant(item)} disabled={this.state.pageName==='Edit Budget Details'}>
                        <option>{this.state.plant_type}</option>   
                         {this.state.plant_types.map((plantType, key) => <option key={plantType}>{plantType}</option>)}
                        </select>
                        </Col>
                        <Col>
                            <Form.Label>Plant<span className="form-required">*</span></Form.Label>
                        </Col>
                        <Col>
                            <select className=" form-control" width='300px' name="plant_name" onChange={(item) => this.handleChangePlant(item)} disabled={this.state.pageName==='Edit Budget Details'}>
                            
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
                            <select className="form-control" name="month" width='300px' onChange={this.handleChange} disabled={this.state.pageName==='Edit Budget Details'}>
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
                            <select class="form-control" name="year" type="dropdown" width='300px' onChange={this.handleChange} disabled={this.state.pageName==='Edit Budget Details'}>
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
                            <Form.Label>Actual PLF<span className="form-required">*</span></Form.Label>
                        </Col>
                        <Col>
                        <Form.Control type="text" name ="actualPlf" onChange={this.handleChange} value={this.state.aopRowData.actualPlf} />
                        </Col>
                        <Col>
                        </Col>
                        <Col>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label>Connected Capacity<span className="form-required">*</span></Form.Label>
                        </Col>
                        <Col>
                        <Form.Control type="text" name ="dcCapacity" onChange={this.handleChange} value={this.state.aopRowData.dcCapacity}/>
                        </Col>
                        <Col>
                            <Form.Label>Auxiliary loss<span className="form-required">*</span></Form.Label>
                        </Col>
                        <Col>
                        <Form.Control type="text" name ="auxiliary" onChange={this.handleChange} value={this.state.aopRowData.auxiliary}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label>Technical Loss<span className="form-required">*</span></Form.Label>
                        </Col>
                        <Col>
                        <Form.Control type="text" name ="technicalLoss" onChange={this.handleChange} value={this.state.aopRowData.technicalLoss}/>
                        </Col>
                        <Col>
                            <Form.Label>Grid Outage Loss<span className="form-required">*</span></Form.Label>
                        </Col>
                        <Col>
                        <Form.Control type="text" name ="gridOutageLoss" onChange={this.handleChange} value={this.state.aopRowData.gridOutageLoss}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label>Design Loss<span className="form-required">*</span></Form.Label>
                        </Col>
                        <Col>
                        <Form.Control type="text" name ="designLoss" onChange={this.handleChange} value={this.state.aopRowData.designLoss}/>
                        </Col>
                        <Col>
                            <Form.Label>Temperature Loss<span className="form-required">*</span></Form.Label>
                        </Col>
                        <Col>
                            <Form.Control type="text" name ="temperature" onChange={this.handleChange} value={this.state.aopRowData.temperature}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label>Actual Insolation<span className="form-required">*</span></Form.Label>
                        </Col>
                        <Col>
                        <Form.Control type="text" name ="actualInsolatin" onChange={this.handleChange} value={this.state.aopRowData.actualInsolatin}/>
                        </Col>
                        <Col>
                            <Form.Label>Actual Generation In KWh<span className="form-required">*</span></Form.Label>
                        </Col>
                        <Col>
                            <Form.Control type="text" name ="actualGeneration" onChange={this.handleChange} value={this.state.aopRowData.actualGeneration}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label>Soiling Loss<span className="form-required">*</span></Form.Label>
                        </Col>
                        <Col>
                        <Form.Control type="text" name ="soiling" onChange={this.handleChange} value={this.state.aopRowData.soiling}/>
                        </Col>
                        <Col>
                            <Form.Label>Improved Generation<span className="form-required">*</span></Form.Label>
                        </Col>
                        <Col>
                            <Form.Control type="text" name ="generation" onChange={this.handleChange} value={this.state.aopRowData.generation}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label>Improved PPA PLF<span className="form-required">*</span></Form.Label>
                        </Col>
                        <Col>
                        <Form.Control type="text" name ="improvedPpa" onChange={this.handleChange} value={this.state.aopRowData.improvedPpa}/>
                        </Col>
                        <Col>
                            <Form.Label>DC PLF<span className="form-required">*</span></Form.Label>
                        </Col>
                        <Col>
                            <Form.Control type="text" name ="bDcPlf" onChange={this.handleChange} value={this.state.aopRowData.bDcPlf}/>
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
                                <Button variant="primary"  size="md" onClick={() => { history.push('/budgetDetail') }} block>Back</Button>
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

        aopBudgetDetail: state.aopBudgetDetail,
        plantsByType: state.plants.plantsByType,
        allAOPBudgetDetails : state.AOPBudgetDetails.AOPBudgetDetails,
        lenderDetailsByYearPlantIdMonth : state.lenderDetailsByYearPlantIdMonth.lenderDetailsByYearPlantIdMonth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPlantByType: (plantsByType) => dispatch(getPlantByType(plantsByType)),
        createOrUpdateLenderDetails: (aopBudgetDetail) => dispatch(createOrUpdateLenderDetails(aopBudgetDetail)),
        getLenderDataByPlantIdMonthYear: (plantIdMonthYear) => dispatch(getLenderDataByPlantIdMonthYear(plantIdMonthYear))
    }
}
export default  withRouter(connect(mapStateToProps,mapDispatchToProps)(AddEditBudgetDetail)) ;
