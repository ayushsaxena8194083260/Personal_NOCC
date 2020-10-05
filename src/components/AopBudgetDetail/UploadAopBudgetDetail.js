import React, { Component } from 'react';
// import axios from 'axios';
import { createOrUpdatePlantFaultData } from '../../actions'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
// import Card from 'react-bootstrap/Card'
// import Button from 'react-bootstrap/Button'
// import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
// import Modal from 'react-bootstrap/Modal';
import {getPlantByType} from "../../actions/PlantActions";
// import { Route } from 'react-router-dom';
 import DropDown from "../Common/DropDown";
import Picky from 'react-picky';

import 'react-picky/dist/picky.css';
import '../../styles/plant/plantFaultData.scss';

class UploadAopBudgetDetail extends Component{
 
    constructor(props) {
        super(props);
        this.state = {
            plantTypes: ["GROUNDMOUNT", "ROOFTOP"],
            selectedPlantType:'',
            plant_id:'',
            plants: [],
            selectedPlant: "",
        };
        this.handleChangePlant = this.handleChangePlant.bind(this);
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
                    stateDup1.plant_id = plantsByType[i].plantId;
                    break;
                }
            }
            
            this.setState({stateDup1});

            //this.props.getPlantTiltByPlantId(stateDup1.plant_id,stateDup1.selectedPlant,stateDup1.selectedPlantType);
        }
    }
 
    render(){
     return(
        <div>
            <div className="top-filter">
                    <div className="row" style={{ alignItems: "center", margin: "0" }} >
                    <Col xs={1} style={{ maxWidth: "5%" }}>
                            <Form.Label>Type:</Form.Label>
                        </Col>
                        <Col style={{ maxWidth: "15%" }}>
                        <select className="top-search-input form-control" width='300px' name="plant_type" onChange={(item) => this.handleChangePlant(item)}>
                        value={this.state.selectedPlantType} plant_type={this.state.selectedPlantType}    
                        <option >Select Plant Type</option>
                        {this.state.plantTypes.map((plantType, key) => <option key={plantType}>{plantType}</option>)}
                        </select>
                        </Col>
                        
                        <Col xs={1} style={{ maxWidth: "5%" }}>
                            <Form.Label>Plant:</Form.Label>
                        </Col>
                        <Col style={{ maxWidth: "15%" }}>
                        <select required class="form-control" name="plant_id" type="dropdown" name="plant_name" onChange={(item) => this.handleChangePlant(item)} >
                            value={this.state.selectedPlant} plant_name={this.state.selectedPlant}
                            <option>Select Plant</option>
                            {/* <option>{this.state.plans[0].plant_name}</option> */}
                            {this.props.plantsByType === undefined?<option>default</option>:this.props.plantsByType.map((plant, key) => <option key={plant.plantId}>{plant.plantName}</option>)}
                        </select>
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
        plantsByType: state.plants.plantsByType,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createOrUpdatePlantFaultData: (plantFaultData) => dispatch(createOrUpdatePlantFaultData(plantFaultData)),
        getPlantByType: (plantType) => dispatch(getPlantByType(plantType))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UploadAopBudgetDetail))