import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import '../../styles/plant/plantAddEdit.scss';
import {getPlantByType} from "../../actions/PlantActions"
import { createOrUpdatePlantTilt } from "../../actions/PlantTiltAction";
import moment from 'moment';

class AddEditTiltComponent extends Component{
    constructor(props){
        super(props);
        if (this.props.location.plantTilt !== undefined) {
            this.state ={
            plant_types:["GROUNDMOUNT", "ROOFTOP"],
            plant_tilt : this.props.location.plantTilt,
            title:"Edit Plant Tilt"
            };
        }
        else{
        this.state ={
            plant_types:["GROUNDMOUNT", "ROOFTOP"],
            plant_tilt : {
            plantId:'',
            userId:'57',
            tiltId:'',    
            tiltAngle:'',
            startPeriod:'',
            endPeriod:'',
            },
            plant_type:'Select Type',
            plant_name:'Select Plant',
            title:"Add Plant Tilt"
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
            const stateDup = this.state;
            stateDup.plant_type = event.target.value;
            this.setState({ stateDup });
          
            this.props.getPlantByType(stateDup.plant_type);
        }
        else{
            const stateDup1 = this.state;  
            let plantsByType = this.props.plantsByType; 
            stateDup1.plantName = event.target.value;
            for(var i=0;i<plantsByType.length;i++){
                if(plantsByType[i].plantName === event.target.value){
                    stateDup1.plant_tilt.plantId = plantsByType[i].plantId;
                    break;
                }
            }
            console.log(stateDup1)
            
            this.setState({stateDup1});
           
        }
    }

    handleChange(event) {
        const stateDup = this.state.plant_tilt;
        if(event.target.name === 'startPeriod' || event.target.name === 'endPeriod'){
            stateDup[event.target.name]=moment(event.target.value).format('YYYY-MM-DDTHH:MM:SS.SSSZ');
        }
        else{
        stateDup[event.target.name]=event.target.value;
        }
        this.setState({stateDup});
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.createOrUpdatePlantTilt(this.state.plant_tilt);
        alert('Tilt Schedule has been created/updated');
        this.props.history.push('/tiltSchedule');
      }

    render(){
        return(
            <div>
                <Card className="add-plant-card" style={{width:'60%'}}>
                  <Card.Header as="h5">{this.state.title}</Card.Header>
                  <Card.Body>
                    <Row>
                    {/*  */}
                        <Col>
                            <Form.Label>Plant Type<span className="form-required">*</span></Form.Label>
                        </Col>
                        <Col >
                        <select className="form-control" width='300px' name="plant_type" onChange={(item) => this.handleChangePlant(item)}>
                        <option>{this.state.plant_tilt.plant_type===undefined?'Select Plant Type':this.state.plant_tilt.plant_type}</option>   
                         {this.state.plant_types.map((plantType, key) => <option key={plantType}>{plantType}</option>)}
                        </select>
                        </Col>
                    {/*  */}
                    </Row>
                    <Row>
                    
                        <Col>
                            <Form.Label>Plant<span className="form-required">*</span></Form.Label>
                        </Col>
                        <Col>
                            <select className="form-control" width='300px' name="plantName" onChange={(item) => this.handleChangePlant(item)}>
                            
                            <option>{this.state.plant_tilt.plant_name===undefined?"Select Plant":this.state.plant_tilt.plant_name}</option>
                            {this.props.plantsByType === undefined?<option>default</option>:this.props.plantsByType.map((plant, key) => <option key={plant.plantId}>{plant.plantName}</option>)}
                        </select>
                        </Col>
                    
                    </Row>
                    <Row>
                    
                        <Col>
                            <Form.Label>Tilt Angle<span className="form-required">*</span></Form.Label>
                        </Col>
                        <Col>
                        <Form.Control type="text" name="tiltAngle" onChange={this.handleChange} value={this.state.plant_tilt.tiltAngle}/>

                        </Col>
                    
                    </Row>
                    <Row>
                    
                        <Col>
                            <Form.Label>Start Period<span className="form-required">*</span></Form.Label>
                        </Col>
                        <Col>
                        <Form.Control type="date" name="startPeriod" onChange={this.handleChange} value={moment(this.state.plant_tilt.startPeriod).format('YYYY-MM-DD')}/>

                        </Col>
                    
                    </Row>
                    <Row>
                    
                        <Col>
                            <Form.Label>End Period<span className="form-required">*</span></Form.Label>
                        </Col>
                        <Col>
                        <Form.Control type="date" name="endPeriod" onChange={this.handleChange} value={moment(this.state.plant_tilt.endPeriod).format('YYYY-MM-DD')}/>

                        </Col>
                    
                    </Row>
                    <Row>
                        <Col>
                        </Col>
                        <Col md={2}>
                        <Button variant="primary" size="md" block onClick={this.onSubmit}>Submit</Button>
                        </Col>
                        <Col md={2}>
                        <Link to="/tiltSchedule">
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

        plant_tilt: state.plant_tilt,
        plantsByType: state.plants.plantsByType,
        
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPlantByType: (plantsByType) => dispatch(getPlantByType(plantsByType)),
        createOrUpdatePlantTilt: (plant_tilt) => dispatch(createOrUpdatePlantTilt(plant_tilt))
    }
}
export default  withRouter(connect(mapStateToProps,mapDispatchToProps)(AddEditTiltComponent)) ;