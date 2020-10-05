import React, { Component } from 'react';
// import axios from 'axios';
import {createOrUpdatePlant} from "../../../../actions"
import {connect} from 'react-redux'
import { Link, withRouter} from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import '../../../../styles/plant/plantAddEdit.scss';
import { createUpdateForecastConfig} from '../../../../actions/action-Settings'

class AddEditForecastSetting extends Component{

    constructor(props){
        super(props);
        this.state = {
            forecastSetting : this.props.location.forecastSetting !== undefined?this.props.location.forecastSetting:{
                forecastConfigId : 0,
                forecastModelName : '',
                minHistoricResult : 0,
                maxDeviationResult : 0,
                isPublished : 1
            }
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const stateDup = this.state.forecastSetting;

        if(event.target.name==='minHistoricResult' || event.target.name === 'maxDeviationResult'){
            stateDup[event.target.name] = parseInt(event.target.value);
        }
        else{
        stateDup[event.target.name] = event.target.value;
        }

        this.setState({ forecastSetting : stateDup });
    }

    onSubmit = (e) => {
        e.preventDefault();
        if(this.state.forecastSetting!=null){

            const forecastConfig = {
                "forecastConfigId": this.state.forecastSetting.forecastConfigId,
                "forecastModelName": this.state.forecastSetting.forecastModelName,
                "minHistoricResult": this.state.forecastSetting.minHistoricResult,
                "maxDeviationResult": this.state.forecastSetting.maxDeviationResult,
                "isPublished": 1
            }
            this.props.createUpdateForecastConfig(forecastConfig);
            alert('Forecast Setting has been added/updated successfully');
            this.props.history.push('/setting/forecastConfig');
        }
    }

    render(){
        return(
            <div>
                <Card className="add-plant-card" style={{width:"50%"}}>
                  <Card.Header as="h5">{this.props.location.forecastSetting !== undefined?'Edit Forecast Configuration':'Add Forecast Configuration'}</Card.Header>
                  <Card.Body>
                    <Row>
                        <Col>
                            <Form.Label>Forecast Mechanism<span className="form-required">*</span></Form.Label>
                        </Col>
                        <Col>
                            <Form.Control type="text" readOnly name="forecastModelName" value={this.state.forecastSetting.forecastModelName} onChange={this.handleChange}/>
                        </Col>
                        </Row>
                        <Row>
                        <Col>
                            <Form.Label>Minimum Historic Result<span className="form-required">*</span></Form.Label>
                        </Col>
                        <Col>
                            <Form.Control type="text" name="minHistoricResult" value={this.state.forecastSetting.minHistoricResult} onChange={this.handleChange}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label>Maximum Deviation<span className="form-required">*</span></Form.Label>
                        </Col>
                        <Col>
                            <Form.Control type="text" name="maxDeviationResult" value={this.state.forecastSetting.maxDeviationResult} onChange={this.handleChange}/>
                        </Col>

                    </Row>

                    <Row>
                        <Col>
                        </Col>
                        <Col md={3}>
                        <Button variant="primary" size="lg" onClick={this.onSubmit} block>Update</Button>
                        </Col>
                        <Col md={3}>
                        <Link to="/setting/forecastConfig">
                        <Button variant="primary" size="lg" block>Back</Button>
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
const mapStateToProps = (state,props) => {
    return {
        ...state,
        pageName: props.location.forecastSetting ? props.location.forecastSetting.forecastConfigId ? "Edit Forecast Settings" : "Add Forecast Settings" : null,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createUpdateForecastConfig: (forecastSetting) => dispatch(createUpdateForecastConfig(forecastSetting))
    }
}
export default  withRouter(connect(mapStateToProps,mapDispatchToProps)(AddEditForecastSetting)) ;
