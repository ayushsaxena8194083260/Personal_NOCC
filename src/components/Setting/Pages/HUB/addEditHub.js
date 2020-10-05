import React, { Component } from 'react';
import axios from 'axios';
import {createOrUpdatePlant} from "../../../../actions"
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import '../../../../styles/plant/plantAddEdit.scss';
import { createUpdateHubMaster } from '../../../../actions/action-Settings';


class AddEditHub extends Component{

    constructor(props) {
        super(props);
        this.state = {
            selectedPlanType: null,
            plantTypes: this.props.plantTypes,
            selectedPlantOptions: [],
            postData: this.props.location && this.props.location.hub ? this.props.location.hub : [],
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
        if (this.state.postData != null) {
            this.props.createUpdateHubMaster({input:this.state.postData, type:this.props.pageName});
            this.props.history.push('/setting/HubDetails');
        }
    }

    handleChangePublished(event){
        const _data = this.state.postData;
        const selectedValue = event.target.value;
        _data[event.target.name] = selectedValue;
        this.setState({ postData: _data });
    }
    
    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.postData != null) {
            this.props.createUpdateHubMaster({input:this.state.postData, type:this.props.pageName});
            this.props.history.push('/setting/HubDetails');
        }
    }

    render(){
        return(
            <form onSubmit={this.onSubmit}>
            <div>
                <Card className="add-fault-card">
                    <Card.Header as="h5">HUB</Card.Header>
                    <Card.Body>
                        <Row>
                            <Col>
                                <Form.Label>Name<span className="form-required">*</span></Form.Label>
                            </Col>
                            <Col>
                                <Form.Control name="hubName" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.hubName} />
                            </Col>
                            <Col>
                                <Form.Label>Latitude<span className="form-required">*</span></Form.Label>
                            </Col>
                            <Col>
                                <Form.Control name="latitude" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.latitude} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Longitude<span className="form-required">*</span></Form.Label>
                            </Col>
                            <Col>
                                <Form.Control name="longitude" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.longitude} />
                            </Col>
                            <Col>
                                <Form.Label>Description<span className="form-required">*</span></Form.Label>
                            </Col>
                            <Col>
                                <Form.Control name="hubDescription" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.hubDescription} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Published<span className="form-required">*</span></Form.Label>
                            </Col>
                            <Col>
                            <select class="form-control" name="isPublished" type="dropdown" onChange={(item) => this.handleChangePublished(item)}>
                                        {this.props.published && this.props.published.map((item, key) => {
                                            if (this.state.postData && this.state.postData["isPublished"] == item.value) {
                                                return <option value={item.value} selected>{item.published}</option>
                                            }
                                            else {
                                                return <option value={item.value}>{item.published}</option>
                                            }
                                        }

                                        )}
                                    </select>
                            </Col>
                            <Col>
                            </Col>
                            <Col>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Issue Ticket Radius<span className="form-required">*</span></Form.Label>
                            </Col>
                            <Col>
                                <Form.Control name="issueTicketRadius" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.issueTicketRadius} />
                            </Col>
                            <Col>
                                <Form.Label>PM Ticket Radius<span className="form-required">*</span></Form.Label>
                            </Col>
                            <Col>
                                <Form.Control name="pmTicketRadius" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.pmTicketRadius} />
                            </Col>
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
        published: [{published:"Yes",value:"0"},{published:"No",value:"1"}]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createUpdateHubMaster: (hub) => dispatch(createUpdateHubMaster(hub))
    }
}
export default  withRouter(connect(mapStateToProps,mapDispatchToProps)(AddEditHub)) ;