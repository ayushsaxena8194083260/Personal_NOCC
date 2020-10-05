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
import { getPlantByType } from '../../actions/PlantFaultDataActions';
// import { Route } from 'react-router-dom';
// import DropDown from "../Common/DropDown";
import Picky from 'react-picky';

import 'react-picky/dist/picky.css';
import '../../styles/plant/plantFaultData.scss';
import DropDown from '../Common/DropDown';

class PenaltyDataUpload extends Component{
    constructor(props){
        super(props);
        this.state =  {
            plantTypes: this.props.plantsByType,
            selectedPlantType:'',
            showRow: false,
            selectedPlantOptions: [],
            selectedPlant: "",
            plants: [],
            plant_id:'',
            selectedPlant :'',
            plantsByType:''
            // plantsByType:this.props.plantsByType
        }
    }

    getPlantTypesDropDownOptions() { 
        const options = this.state.plantTypes && this.state.plantTypes.map((plantTypes, key) => { return { id: plantTypes.plantId, name: plantTypes.plantName } });
        console.log("options",options)
        return options;
    }

    selectMultipleOption(value) {
        this.setState({ selectedPlantOptions: value, showRow: false, fromDate:'', toDate:'' });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== null) {
            this.setState({
                plantTypes: nextProps.plantFault.plantTypes
            })
        }
    }
    handleChangePlantType(event) { 
        const selectedValue = event.target.value;
        if (selectedValue !== this.state.selectedPlantType) {
            this.props.getPlantByType(selectedValue);
            this.setState({ selectedPlantType: selectedValue, showRow: false, fromDate : '',toDate : '', selectedPlantOptions:[]  });
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
            //let plantsByType = this.props.plantsByType; 
            stateDup1.selectedPlant = event.target.value;
            for(var i=0;i<this.state.plantTypes.length;i++){
                if(this.state.plantTypes[i].plantName === event.target.value){
                    stateDup1.plant_id = this.state.plantTypes[i].plantId;
                    break;
                }
            }
            
            this.setState({stateDup1});
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
                        <Col style={{ maxWidth: "20%" }}>
                            <DropDown
                                className="top-search-input form-control"
                                Name="plant_type"
                                itemSource={this.props.plantType}
                                value={this.state.selectedPlantType}
                                handleChange={(item) => this.handleChangePlant(item)}
                            />
                        </Col>
                        
                        <Col xs={1} style={{ maxWidth: "5%" }}>
                            <Form.Label>Plant:</Form.Label>
                        </Col>
                        <Col style={{ maxWidth: "20%" }}>
                        <select required class="form-control" name="plant_id" type="dropdown" name="plant_name" onChange={(item) => this.handleChangePlant(item)} >
                            value={this.state.selectedPlant} plant_name={this.state.selectedPlant}
                            <option>Select Plant</option>
                            {/* <option>{this.state.plans[0].plant_name}</option> */}
                            {this.state.plantTypes === undefined?<option>default</option>:this.state.plantTypes.map((plant, key) => <option key={plant.plantId}>{plant.plantName}</option>)}
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
        plantType: [{displayText: "Select Plant Type" , value: "-1"}, {displayText: "GROUNDMOUNT" , value: "GROUNDMOUNT"},{displayText: "ROOFTOP" , value: "ROOFTOP"}],
        plantFaultData: state.plantFaultData,
        edit_plantFault: state.edit_plantFault,
        plantFault: state.plantFault,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createOrUpdatePlantFaultData: (plantFaultData) => dispatch(createOrUpdatePlantFaultData(plantFaultData)),
        getPlantByType: (plantsByType) => dispatch(getPlantByType(plantsByType))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PenaltyDataUpload))