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
import { createOrUpdatePerformanceLoss } from "../../actions/performanceLossActions";

class performanceLossEdit extends Component{

    constructor(props) {
        super(props);
        this.state = {
            isSubmited: false,
            submitedFields: ["insolation", "downtimeLoss", "gridOutageLoss",  "soilingLoss", "tiltLoss", "commissioningLoss", 
            "dcCableLoss","acCableLoss","inverterEfficiency","auxilaryLoss","transmissionLoss","inverterClippingLoss","Perf_actualGeneration","modelGeneration","actualTempLoss","iamLoss",
            "pvLoss","derate","moduleQuality","arrayMismatch","shadingLoss","budgetInsolationLoss","budgetDowntimeLoss","budgetGridFailureLoss","budgetTemperatureLoss"],
            perfLossRowData : this.props.location.performanceLossRowData,
            pageName: "Performance Loss Data"
            // component_affected:[""]
        }
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
            if (!this.state.perfLossRowData[item] && this.state.perfLossRowData[item]!=0) {
                inValid = true;
            }
        })
        return inValid;
    }
   
    handleChange(event) {
        const stateDup = this.state.perfLossRowData;
        console.log(this.state.perfLossRowData,'performance')
        debugger
        stateDup[event.target.name]=event.target.value;
        this.setState({stateDup});
        if(event.target.name == "insolation"){
            if(stateDup.insolation == event.target.value){
            console.log("value changed")
            stateDup["iseditedinsolation"] = true
            }
        }
        else if(event.target.name == "acCableLoss"){
            if(stateDup.acCableLoss == event.target.value){
            console.log("value changed")
            stateDup["iseditedAcCableLoss"] = true
            }
        }
        else if(event.target.name == "actualGeneration"){
            if(stateDup.actualGeneration == event.target.value){
            console.log("value changed")
            stateDup["iseditedActualGeneration"] = true
            }
        }
        else if(event.target.name == "arrayMismatch"){
            if(stateDup.arrayMismatch == event.target.value){
            console.log("value changed")
            stateDup["iseditedArrayMismatch"] = true
            }
        }
        else if(event.target.name == "auxilaryLoss"){
            if(stateDup.auxilaryLoss == event.target.value){
            console.log("value changed")
            stateDup["iseditedAuxilaryLoss"] = true
            }
        }
     
        else if(event.target.name == "budgetDowntimeLoss"){
            if(stateDup.budgetDowntimeLoss == event.target.value){
            console.log("value changed")
            stateDup["iseditedBudgetDowntimeLoss"] = true
            }
        }
        else if(event.target.name == "downtimeLoss"){
            if(stateDup.downtimeLoss == event.target.value){
            console.log("value changed")
            stateDup["iseditedDowntimeLoss"] = true
            }
        }
        else if(event.target.name == "budgetGridFailureLoss"){
            if(stateDup.budgetGridFailureLoss == event.target.value){
            console.log("value changed")
            stateDup["iseditedBudgetGridFailureLoss"] = true
            }
        }
        else if(event.target.name == "budgetInsolationLoss"){
            if(stateDup.budgetInsolationLoss == event.target.value){
            console.log("value changed")
            stateDup["iseditedBudgetInsolationLoss"] = true
            }
        }
        else if(event.target.name == "budgetTemperatureLoss"){
            if(stateDup.budgetTemperatureLoss == event.target.value){
            console.log("value changed")
            stateDup["iseditedBudgetTemperatureLoss"] = true
            }
        }
        else if(event.target.name == "commissioningLoss"){
            debugger
            if(stateDup.commissioningLoss == event.target.value){
            console.log("value changed")
            stateDup["iseditedCommissioningLoss"] = true
            }
        }
        else if(event.target.name == "dcCableLoss"){
            if(stateDup.dcCableLoss == event.target.value){
            console.log("value changed")
            stateDup["iseditedDcCableLoss"] = true
            }
        }
        else if(event.target.name == "derate"){
            if(stateDup.derate == event.target.value){
            console.log("value changed")
            stateDup["iseditedDerate"] = true
            }
        }
        else if(event.target.name == "dcCableLoss"){
            if(stateDup.dcCableLoss == event.target.value){
            console.log("value changed")
            stateDup["iseditedDcCableLoss"] = true
            }
        }
        else if(event.target.name == "gridOutageLoss"){
            if(stateDup.gridOutageLoss == event.target.value){
            console.log("value changed")
            stateDup["iseditedGridOutageLoss"] = true
            }
        }
       
        else if(event.target.name == "iamLoss"){
            if(stateDup.iamLoss == event.target.value){
            console.log("value changed")
            stateDup["iseditedIamLoss"] = true
            }
        }
        else if(event.target.name == "inverterClippingLoss"){
            if(stateDup.inverterClippingLoss == event.target.value){
            console.log("value changed")
            stateDup["iseditedInverterClippingLoss"] = true
            }
        }
        else if(event.target.name == "inverterEfficiency"){
            if(stateDup.inverterEfficiency == event.target.value){
            console.log("value changed")
            stateDup["iseditedInverterEfficiency"] = true
            }
        }
        else if(event.target.name == "modelGeneration"){
            if(stateDup.modelGeneration == event.target.value){
            console.log("value changed")
            stateDup["iseditedModelGeneration"] = true
            }
        }
        else if(event.target.name == "moduleQuality"){
            if(stateDup.moduleQuality == event.target.value){
            console.log("value changed")
            stateDup["iseditedModuleQuality"] = true
            }
        }
        else if(event.target.name == "pvLoss"){
            if(stateDup.pvLoss == event.target.value){
            console.log("value changed")
            stateDup["iseditedPvLoss"] = true
            }
        }
        else if(event.target.name == "shadingLoss"){
            if(stateDup.shadingLoss == event.target.value){
            console.log("value changed")
            stateDup["iseditedShadingLoss"] = true
            }
        }
        else if(event.target.name == "soilingLoss"){
            if(stateDup.soilingLoss == event.target.value){
            console.log("value changed")
            stateDup["iseditedSoilingLoss"] = true
            }
        }
        else if(event.target.name == "tiltLoss"){
            if(stateDup.tiltLoss == event.target.value){
            console.log("value changed")
            stateDup["iseditedTiltLoss"] = true
            }
        }
        else if(event.target.name == "transmissionLoss"){
            if(stateDup.transmissionLoss == event.target.value){
            console.log("value changed")
            stateDup["iseditedTransmissionLoss"] = true
            }
        }
      
    }

    onSubmit = (e) => {
        e.preventDefault();
        let stateDup = this.state.perfLossRowData;
        stateDup.actualGeneration = stateDup.actualGeneration;

        delete stateDup.plant_name;
        delete stateDup.plantCapacityDc;
        delete stateDup.date;
        delete stateDup.importData;
        delete stateDup.noOfDays;
        delete stateDup.temperatureCoefficientPower;
        delete stateDup.tariff;
        delete stateDup.connectedCapacity;
        delete stateDup.plant_Id;
        delete stateDup.Pavlov;
        delete stateDup.actualGeneration;

        
        if (stateDup !== null) {
            this.props.createOrUpdatePerformanceLoss(stateDup);
            alert('Performance Loss Data has been updated successfully');   
            this.props.history.push('/performanceLoss');
        }

        this.setState({ isSubmited: true });
    }


    renderErrortext(fieldID, msg) {
        return (
            this.state.isSubmited === true && !this.state.perfLossRowData[fieldID] && <p className="errorText" style={{ color: "#CC0000", display: "block", fontSize: "11px", marginTopop: "0.5em" }}>{msg}</p>
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
                            <Form.Label>Plant</Form.Label>
                        </Col>
                        <Col>
                        <Form.Control type="text" name="plant_name" value={this.state.perfLossRowData.plant_name} disabled="true"/>
                        </Col>
                        <Col>
                            <Form.Label>Date</Form.Label>
                        </Col>
                        <Col>
                        <Form.Control type="text" name="period" value={this.state.perfLossRowData.period} disabled="true"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label>Insolation</Form.Label>
                        </Col>
                        <Col>
                        <Form.Control type="text" name="insolation" onChange={this.handleChange} value={this.state.perfLossRowData.insolation}/>
                        {this.renderErrortext("insolation", "The Insolation Field Is Required.")}
                        </Col>
                        <Col>
                            <Form.Label>Downtime Loss</Form.Label>
                        </Col>
                        <Col>
                        <Form.Control type="text" name="downtimeLoss" onChange={this.handleChange} value={this.state.perfLossRowData.downtimeLoss}/>
                        {this.renderErrortext("downtimeLoss", "The Downtime Loss Field Is Required.")}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label>Grid Outage Loss</Form.Label>
                        </Col>
                        <Col>
                        <Form.Control type="text" name="gridOutageLoss" onChange={this.handleChange} value={this.state.perfLossRowData.gridOutageLoss}/>
                        {this.renderErrortext("gridOutageLoss", "The Grid Outage Loss Field Is Required.")}
                        </Col>
                        <Col>
                            <Form.Label>Soiling Loss</Form.Label>
                        </Col>
                        <Col>
                        <Form.Control type="text" name="soilingLoss" onChange={this.handleChange} value={this.state.perfLossRowData.soilingLoss}/>
                        {this.renderErrortext("soilingLoss", "The Soiling Loss Field Is Required.")}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label>Tilt Loss</Form.Label>
                        </Col>
                        <Col>
                        <Form.Control type="text" name="tiltLoss" onChange={this.handleChange} value={this.state.perfLossRowData.tiltLoss}/>
                        {this.renderErrortext("tiltLoss", "The Tilt Loss Field Is Required.")}
                        </Col>
                        <Col>
                            <Form.Label>Commissioning Loss</Form.Label>
                        </Col>
                        <Col>
                        <Form.Control type="text" name="commissioningLoss" onChange={this.handleChange} value={this.state.perfLossRowData.commissioningLoss}/>
                        {this.renderErrortext("commissioningLoss", "The Commissioning Loss Field Is Required.")}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label>DC Cable Loss</Form.Label>
                        </Col>
                        <Col>
                        <Form.Control type="text" name="dcCableLoss" onChange={this.handleChange} value={this.state.perfLossRowData.dcCableLoss}/>
                        {this.renderErrortext("dcCableLoss", "The DC Cable Loss Field Is Required.")}
                        </Col>
                        <Col>
                            <Form.Label>AC Cable Loss</Form.Label>
                        </Col>
                        <Col>
                            <Form.Control type="text" name="acCableLoss" onChange={this.handleChange} value={this.state.perfLossRowData.acCableLoss}/>
                            {this.renderErrortext("acCableLoss", "The AC Cable Loss Field Is Required.")}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label>Inverter Efficiency</Form.Label>
                        </Col>
                        <Col>
                        <Form.Control type="text" name="inverterEfficiency" onChange={this.handleChange} value={this.state.perfLossRowData.inverterEfficiency}/>
                        {this.renderErrortext("inverterEfficiency", "The Inverter Efficiency Field Is Required.")}
                        </Col>
                        <Col>
                            <Form.Label>Auxilary Loss</Form.Label>
                        </Col>
                        <Col>
                            <Form.Control type="text" name="auxilaryLoss" onChange={this.handleChange} value={this.state.perfLossRowData.auxilaryLoss}/>
                            {this.renderErrortext("auxilaryLoss", "The Auxilary Loss Field Is Required.")}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label>Transmission Loss</Form.Label>
                        </Col>
                        <Col>
                        <Form.Control type="text" name="transmissionLoss" onChange={this.handleChange} value={this.state.perfLossRowData.transmissionLoss}/>
                        {this.renderErrortext("transmissionLoss", "The Transmission Loss Field Is Required.")}
                        </Col>
                        <Col>
                            <Form.Label>Inverter Clipping Loss</Form.Label>
                        </Col>
                        <Col>
                            <Form.Control type="text" name="inverterClippingLoss" onChange={this.handleChange} value={this.state.perfLossRowData.inverterClippingLoss}/>
                            {this.renderErrortext("inverterClippingLoss", "The Inverter Clipping Loss Field Is Required.")}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label>IAM Loss</Form.Label>
                        </Col>
                        <Col>
                        <Form.Control type="text" name="iamLoss" onChange={this.handleChange} value={this.state.perfLossRowData.iamLoss}/>
                        {this.renderErrortext("iamLoss", "The IAM Loss Field Is Required.")}
                        </Col>
                        <Col>
                            <Form.Label>PV Loss</Form.Label>
                        </Col>
                        <Col>
                            <Form.Control type="text" name="pvLoss" onChange={this.handleChange} value={this.state.perfLossRowData.pvLoss}/>
                            {this.renderErrortext("pvLoss", "The PV Loss Field Is Required.")}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label>Derate</Form.Label>
                        </Col>
                        <Col>
                        <Form.Control type="text" name="derate" onChange={this.handleChange} value={this.state.perfLossRowData.derate}/>
                        {this.renderErrortext("derate", "The Derate Field Is Required.")}
                        </Col>
                        <Col>
                            <Form.Label>Module Quality</Form.Label>
                        </Col>
                        <Col>
                            <Form.Control type="text" name="moduleQuality" onChange={this.handleChange} value={this.state.perfLossRowData.moduleQuality}/>
                            {this.renderErrortext("moduleQuality", "The Module Quality Field Is Required.")}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label>Array Mismatch</Form.Label>
                        </Col>
                        <Col>
                        <Form.Control type="text" name="arrayMismatch" onChange={this.handleChange} value={this.state.perfLossRowData.arrayMismatch}/>
                        {this.renderErrortext("arrayMismatch", "The Array Mismatch Field Is Required.")}
                        </Col>
                        <Col>
                            <Form.Label>Shading Loss</Form.Label>
                        </Col>
                        <Col>
                            <Form.Control type="text" name="shadingLoss" onChange={this.handleChange} value={this.state.perfLossRowData.shadingLoss}/>
                            {this.renderErrortext("shadingLoss", "The Shading Loss Field Is Required.")}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label>Model Generation</Form.Label>
                        </Col>
                        <Col>
                        <Form.Control type="text" name="modelGeneration" onChange={this.handleChange} value={this.state.perfLossRowData.modelGeneration}/>
                        {this.renderErrortext("modelGeneration", "The Model Generation Field Is Required.")}
                        </Col>
                        <Col>
                            <Form.Label>Actual Temperature Loss</Form.Label>
                        </Col>
                        <Col>
                            <Form.Control type="text" name="actualTempLoss" onChange={this.handleChange} value={this.state.perfLossRowData.actualTempLoss}/>
                            {this.renderErrortext("actualTempLoss", "The Actual Temperature Loss Field Is Required.")}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label>Actual Generation</Form.Label>
                        </Col>
                        <Col>
                        <Form.Control type="text" name="ctualGeneration" onChange={this.handleChange} value={this.state.perfLossRowData.actualGeneration}/>
                        {this.renderErrortext("actualGeneration", "The Actual Generation Field Is Required.")}
                        </Col>
                        <Col>
                            <Form.Label>Budget Insolation</Form.Label>
                        </Col>
                        <Col>
                        <Form.Control type="text" name="budgetInsolationLoss" onChange={this.handleChange} value={this.state.perfLossRowData.budgetInsolationLoss}/>
                        {this.renderErrortext("budgetInsolationLoss", "The Budget Insolation Field Is Required.")}
                        </Col>
                        
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label>Budget Downtime</Form.Label>
                        </Col>
                        <Col>
                        <Form.Control type="text" name="budgetDowntimeLoss" onChange={this.handleChange} value={this.state.perfLossRowData.budgetDowntimeLoss}/>
                        {this.renderErrortext("budgetDowntimeLoss", "The Budget Downtime Field Is Required.")}
                        </Col>
                        <Col>
                            <Form.Label>Budget Grid Outage</Form.Label>
                        </Col>
                        <Col>
                        <Form.Control type="text" name="budgetGridFailureLoss" onChange={this.handleChange} value={this.state.perfLossRowData.budgetGridFailureLoss}/>
                        {this.renderErrortext("budgetGridFailureLoss", "The Budget Grid Outage Field Is Required.")}
                        </Col>
                        
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label>Budget Temperature</Form.Label>
                        </Col>
                        <Col>
                        <Form.Control type="text" name="budgetTemperatureLoss" onChange={this.handleChange} value={this.state.perfLossRowData.budgetTemperatureLoss}/>
                        {this.renderErrortext("budgetTemperatureLoss", "The Budget Temperature Field Is Required.")}
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
                                <Button variant="primary"  size="md" onClick={() => { history.push('/performanceLoss') }} block>Back</Button>
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
        
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createOrUpdatePerformanceLoss: (data) => dispatch(createOrUpdatePerformanceLoss(data))
    }
}
export default  withRouter(connect(mapStateToProps,mapDispatchToProps)(performanceLossEdit)) ;