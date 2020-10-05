import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import '../../../../styles/plant/plantAddEdit.scss';
import { createUpdateProjectDetails } from '../../../../actions/action-Settings';

class AddEditProject extends Component{
    constructor(props) {
        super(props);
        this.state = {
            selectedPlanType: null,
            plantTypes: this.props.plantTypes,
            selectedPlantOptions: [],
            postData: this.props.location.project!=undefined?this.props.location.project:{
                projectName : '',
                description : '',
                type : '',
                status :''
            },
            alternateAdapter: this.props.alternateAdapter
        };
        this.selectMultipleOption = this.selectMultipleOption.bind(this);
    }

    componentDidMount() {
        // document.title = 'Plant Fault Data';
        // this.props.clearSettingPlantMapping();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            plantTypes: nextProps.plantTypes,
            postData: nextProps.postData,
            published: nextProps.published,
            // displayMessage: nextProps.displayMessage
        });
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
        _data[event.target.name] = selectedValue;
        this.setState({ postData: _data });
    }

    handleChangeAdapterNme(event){
        const _data = this.state.postData;
        const selectedValue = event.target.value;
        _data[event.target.name] = selectedValue;
        this.setState({ postData: _data });
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.state.postData["type"] = "INV";
        if (this.state.postData != null) {
            this.props.createUpdateFTPMappings({input:this.state.postData, type:this.props.pageName});
            this.props.history.push('/setting/FTPInverterMapping');
        }
    }

    handleChangeplantType(event){
        const _data = this.state.postData;
        const selectedValue = event.target.value;
        _data[event.target.name] = selectedValue;
        this.setState({ postData: _data });
    }

    handleChangestatus(event) {
        const _data = this.state.postData;
        const selectedValue = event.target.value;
        _data[event.target.name] = selectedValue;
        this.setState({ postData: _data });
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.postData != null) {
            this.props.createUpdateProjectDetails({input:this.state.postData, type:this.props.pageName});
            this.props.history.push('/setting/Projects');
        }
    }

    render(){
        return(
            <form onSubmit={this.onSubmit}>
            <div>
                <Card className="add-fault-card">
                    <Card.Header as="h5">Project</Card.Header>
                    <Card.Body>
                        <Row>
                        <Col></Col>
                            <Col>
                                <Form.Label>Project Name<span className="form-required">*</span></Form.Label>
                            </Col>
                            <Col>
                                <Form.Control name="projectName" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.projectName} />
                            </Col>
                            <Col></Col>
                        </Row>
                        <Row>
                        <Col></Col>
                            <Col>
                                <Form.Label>Description<span className="form-required">*</span></Form.Label>
                            </Col>
                            <Col>
                                <Form.Control name="description" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.description} />
                            </Col>
                            <Col></Col>
                        </Row>
                        <Row>
                        <Col></Col>
                            <Col>
                                <Form.Label>Type<span className="form-required">*</span></Form.Label>
                            </Col>
                            <Col>
                            <select class="form-control" name="plantType" type="dropdown" onChange={(item) => this.handleChangeplantType(item)}>
                                        {this.props.plantType && this.props.plantType.map((item, key) => {
                                            if (this.state.postData!=undefined?this.state.postData["plantType"] == item.value:false) {
                                                return <option value={item.value} selected>{item.plantType}</option>
                                            }
                                            else {
                                                return <option value={item.value}>{item.plantType}</option>
                                            }
                                        }

                                        )}
                                    </select>
                            </Col>
                            <Col></Col>
                            </Row>
                        <Row>
                        <Col></Col>
                            <Col>
                                <Form.Label>Status<span className="form-required">*</span></Form.Label>
                            </Col>
                            <Col>
                            <select class="form-control" name="status" type="dropdown" onChange={(item) => this.handleChangestatus(item)}>
                                        {this.props.status && this.props.status.map((item, key) => {
                                            if (this.state.postData!=undefined?this.state.postData["status"] == item.value:false) {
                                                return <option value={item.value} selected>{item.status}</option>
                                            }
                                            else {
                                                return <option value={item.value}>{item.status}</option>
                                            }
                                        }

                                        )}
                                    </select>
                            </Col>
                            <Col></Col>
                        </Row>
                        <Row>
                                <Col>
                                </Col>
                                <Col md={2}>
                                    <Button type="submit" variant="primary" size="md" block>Submit</Button>
                                </Col>
                                <Col></Col>
                            </Row>
                    </Card.Body>
                </Card>
            </div>
        </form >
        )
    }
}
const mapStateToProps = state => {
    return {

        plant: state.plant,
        plants: state.plants.allplants,
        plantType: [{plantType:"GROUNDMOUNT",value:"GROUNDMOUNT"},{plantType:"ROOFTOP",value:"ROOFTOP"}],
        status:[{status:"ACTIVE",value:"0"},{status:"INACTIVE",value:"1"}]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createUpdateProjectDetails: (hub) => dispatch(createUpdateProjectDetails(hub))
    }
}
export default  withRouter(connect(mapStateToProps,mapDispatchToProps)(AddEditProject)) ;
