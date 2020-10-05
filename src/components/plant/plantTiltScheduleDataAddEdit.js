import React, { Component } from 'react';
// import axios from 'axios';
// import {createOrUpdatePlant} from "../../actions"
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import '../../styles/plant/plantAddEdit.scss';
import {getPlantByType} from "../../actions/PlantActions"
import { createOrUpdatePlantTiltSchdeule } from "../../actions/PlantTiltScheduleAction"

class PlantTiltScheduleAddEdit extends Component{
    constructor(props){
        super(props);
        if(this.props.location.plantTiltSchedule !== undefined){
            this.state ={
                pageName: 'Edit Tilt Schedule',
                plant_types:["GROUNDMOUNT", "ROOFTOP"],
                plant_tilt_schedule : this.props.location.plantTiltSchedule
            };
        }
        else{
        this.state ={
            pageName: 'Add Tilt Schedule',
            plant_types:["GROUNDMOUNT", "ROOFTOP"],
            plant_name: 'Select Plant Name',
            plant_type : 'Select Type',
            plant_tilt_schedule : {
            plant_type:'',
            plant_id:'',
            date:'',
            tilt_angle:'',
            rack_count:'',
            rack_tilted:'',
            total_kw:'',
            labor_planned:'',
            labor_used:'',
            remarks:''
            }
        };
    }
        this.handleChangePlant = this.handleChangePlant.bind(this);
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        // document.title = 'Plant Fault Data';
    }

    handleChangePlant(event) {
        if(event.target.name === "plant_type" ){
        const stateDup = this.state.plant_tilt_schedule;
        stateDup[event.target.name]= event.target.value;
        this.setState({ stateDup });
      
        
        this.props.getPlantByType(stateDup.plant_type);
        }
        else{
            const stateDup1 = this.state.plant_tilt_schedule;  
            let plantsByType = this.props.plantsByType; 
            for(var i=0;i<plantsByType.length;i++){
                if(plantsByType[i].plant_name === event.target.value){
                    stateDup1.plant_id = plantsByType[i].plant_id;
                    break;
                }
            }
            
            this.setState({stateDup1});
        }
    }

    handleChange(event) {
        const stateDup = this.state.plant_tilt_schedule;
        stateDup[event.target.name]=event.target.value;
        this.setState({stateDup});
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.createOrUpdatePlantTiltSchdeule(this.state.plant_tilt_schedule);
        alert('Plan has been created/updated');
        this.props.history.push('/plantTiltScheduleData');
      }

    render(){
        return(
            <div>
                <Card className="add-plant-card">
                  <Card.Header as="h5">{this.state.pageName}</Card.Header>
                  <Card.Body>
                    <Row>
                    
                        <Col>
                            <Form.Label>Plant Type</Form.Label>
                        {/* </Col>
                        <Col > */}
                        <select className="form-control" width='300px' name="plant_type" onChange={(item) => this.handleChangePlant(item)}>
                           
                        <option >{this.state.plant_tilt_schedule.plant_type}</option>
                        {this.state.plant_types.map((plantType, key) => <option key={plantType}>{plantType}</option>)}
                        </select>
                        </Col>
                    
                    {/* </Row>
                    <Row> */}
                    
                        <Col>
                            <Form.Label>Plant</Form.Label>
                        {/* </Col>
                        <Col> */}
                            <select className="form-control" width='300px' name="plant_name" onChange={(item) => this.handleChangePlant(item)}>
                            
                            <option>{this.state.plant_tilt_schedule.plant_name}</option>
                            {/* <option>{this.state.plans[0].plant_name}</option> */}
                            {this.props.plantsByType === undefined?<option>default</option>:this.props.plantsByType.map((plant, key) => <option key={plant.plant_id}>{plant.plant_name}</option>)}
                        </select>
                        </Col>
                    
                    {/* </Row>
                    <Row> */}
                    
                        <Col>
                            <Form.Label>Date</Form.Label>
                        {/* </Col>
                        <Col> */}
                        <Form.Control type="date" name="date" onChange={this.handleChange} value={this.state.plant_tilt_schedule.date}/>

                        </Col>
                    
                    </Row>
                    <Row>
                    
                        <Col>
                            <Form.Label>Tilt angle</Form.Label>
                        {/* </Col>
                        <Col> */}
                        <Form.Control type="text" name="tilt_angle" onChange={this.handleChange} value={this.state.plant_tilt_schedule.tilt_angle}/>

                        </Col>
                    
                    {/* </Row>
                    <Row> */}
                    
                        <Col>
                            <Form.Label>No of rack planned for tiltings</Form.Label>
                        {/* </Col>
                        <Col> */}
                        <Form.Control type="text" name="rack_count" onChange={this.handleChange} value={this.state.plant_tilt_schedule.rack_count}/>

                        </Col>
{/*                     
                    </Row>
                    <Row> */}
                    
                        <Col>
                            <Form.Label>Actual No of rack tilted</Form.Label>
                        {/* </Col>
                        <Col> */}
                        <Form.Control type="text" name="rack_tilted" onChange={this.handleChange} value={this.state.plant_tilt_schedule.rack_tilted}/>

                        </Col>
                    
                    </Row>
                    <Row>
                    
                        <Col>
                            <Form.Label>Total in Kw</Form.Label>
                        {/* </Col>
                        <Col> */}
                        <Form.Control type="text" name="total_kw" onChange={this.handleChange} value={this.state.plant_tilt_schedule.total_kw}/>

                        </Col>
                    
                    {/* </Row>
                    <Row> */}
                    
                        <Col>
                            <Form.Label>No of labor planned</Form.Label>
                        {/* </Col>
                        <Col> */}
                        <Form.Control type="text" name="labor_planned" onChange={this.handleChange} value={this.state.plant_tilt_schedule.labor_planned}/>

                        </Col>
                    
                    {/* </Row>
                    <Row> */}
                    
                        <Col>
                            <Form.Label>Actual no of labor used</Form.Label>
                        {/* </Col>
                        <Col> */}
                        <Form.Control type="text" name="labor_used" onChange={this.handleChange} value={this.state.plant_tilt_schedule.labor_used}/>

                        </Col>
                    
                    </Row>
                    <Row>
                    
                        <Col>
                            <Form.Label>Remarks</Form.Label>
                        {/* </Col>
                        <Col> */}
                        <Form.Control style={{width:'97%'}} type="text" name="remarks" onChange={this.handleChange} value={this.state.plant_tilt_schedule.remarks}/>

                        </Col>
                    
                    </Row>
                    
                    <Row>
                        <Col>
                        </Col>
                        <Col md={2}>
                        <Button variant="primary" size="md" block onClick={this.onSubmit}>Submit</Button>
                        </Col>
                        <Col md={2}>
                        <Link to="/plantTiltScheduleData">
                        <Button variant="primary" size="md" block >Back</Button>
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

        plant_tilt_schedule: state.plant_tilt_schedule,
        plantsByType: state.plants.plantsByType
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPlantByType: (plantsByType) => dispatch(getPlantByType(plantsByType)),
        createOrUpdatePlantTiltSchdeule: (plant_tilt_schedule) => dispatch(createOrUpdatePlantTiltSchdeule(plant_tilt_schedule))
    }
}
export default  withRouter(connect(mapStateToProps,mapDispatchToProps)(PlantTiltScheduleAddEdit)) ;