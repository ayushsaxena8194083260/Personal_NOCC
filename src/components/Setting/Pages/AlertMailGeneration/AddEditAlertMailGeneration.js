import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createUpdateForecastConfig } from "../../../../actions/action-Settings";
import{ Card, Row, Col, Form, Button} from 'react-bootstrap';
import DropDown from "../../../Common/DropDown";
import { getPlantAvailabilityByPlantId } from "../../../../actions/action-PlantAvailability";
import { getProjectNames, getPlantByProjectId } from "../../../../actions";
import Picky from 'react-picky';

class AddEditAlertMailGeneration extends Component{
    constructor(props){
        super(props);
        this.state={
            selectedPlantType: null,
            projectTypes: this.props.projectTypes,
            plantTypes: this.props.plantTypes,
            plantFault: this.props.plantFault,
            plantList:[],
            selectedPlantOptions:[]
        };
        this.selectMultipleOption = this.selectMultipleOption.bind(this);

    }
    handleChangePlantType(event) {
        const selectedValue = event.target.value;
        if (selectedValue !== this.state.selectedPlantType) {
            this.props.getProjectNames(selectedValue);

            this.setState({ selectedPlantType: selectedValue });
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps !== null) {
            this.setState({
                projectTypes: nextProps.projectTypes,
                plantTypes: nextProps.plantTypes,
                plantFault: nextProps.plantFault,
                
            })
        }
    }
    getPlantTypesDropDownOptions() {
        const options = this.state.plantTypes && this.state.plantTypes.map((plantTypes, key) => { return { id: plantTypes.plantId, name: plantTypes.plantName } });
        return options;
    }
    selectMultipleOption(value) {
        if (value) {
            this.props.getPlantAvailabilityByPlantId(value);
            this.setState({ selectedPlantOptions: value });
        }
    }
    handleAddPlant=()=>{
        let selectedplant = [...this.state.selectedPlantOptions]
        // this.setState({plantList:selectedplant})
        console.log(selectedplant)
    }
    handleRemovePlant(event){
        const selectedValue = event.target.value;
    }

    render(){
        let placeholder = "Search";
        return(
            <div>
                <Card className="add-plant-card">
                    <Card.Header as="h5">{this.props.location.forecastSetting !== undefined?'Edit Alert Mail-Generation':'Alert Mail-Generation'}</Card.Header>
                        <Card.Body>
                            {/* <Row>
                                <Col md={2}>
                                    <Form.Label>Name<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control className="top-search-input " type="text" name="name"/>
                                </Col>
                                <Col md={2}>
                                    <Form.Label>E-mail<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control className="top-search-input " type="text" name="email"/>
                                </Col>
                            </Row> */}
                            <Row>
                                <Col md={2}>
                                    <Form.Label>Type:</Form.Label>
                                </Col>
                                <Col>
                                    <DropDown
                                        className="top-search-input form-control"
                                        Name="plantType"
                                        itemSource={this.props.plantType}
                                        value={this.state.selectedPlantType}
                                        handleChange={(item) => this.handleChangePlantType(item)}
                                    />
                                </Col>
                                <Col md={2}>
                                    
                                </Col>
                                <Col>

                                </Col>
                            </Row>
                            <Row>
                                <Col md={2}>
                                    <Form.Label>Plant:</Form.Label>
                                </Col>
                                <Col>
                                <Picky
                                    className="top-search-input "
                                    value={this.state.selectedPlantOptions}
                                    options={this.getPlantTypesDropDownOptions()}
                                    onChange={(val) => this.selectMultipleOption(val)}
                                    open={false}
                                    valueKey="id"
                                    labelKey="name"
                                    multiple={true}
                                    includeSelectAll={true}
                                    includeFilter={true}
                                    dropdownHeight={250}
                                    filterPlaceholder={placeholder}
                                />
                                </Col>
                                <Col md={2}>
                                    <Button type="button" variant="primary" block onClick={this.handleAddPlant}>
                                        Add Plant
                                    </Button>
                                 </Col>
                                <Col></Col>
                            </Row>
                            <Row>
                                <Col md={2}>
                                    <Form.Label>Plant List:</Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control className="top-search-input " as="select" multiple onChange={(item)=>this.handleChangePlantTypes(item)}>
                                    {this.state.plantList.map((item,index) =>{
                                        return <option value={index}>{item}</option>
                                    }
                                    )}
                                    </Form.Control>
                                </Col>
                                <Col md={2}>
                                    <Button type="button" variant="primary" block onClick={(event)=>this.handleRemovePlant(event)}>
                                        Remove Plant
                                    </Button>
                                </Col>
                                <Col>

                                </Col>
                            </Row>
                            <Row>
                            <Col md={2}>
                                    <Button type="button" variant="primary" size="md" block>
                                        Add User
                                    </Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col></Col>
                                <Col md={2}>
                                    <Button type="button" variant="primary" size="md" block>
                                        Submit
                                    </Button>
                                </Col>
                                <Col></Col>
                            </Row>
                        </Card.Body>
                    </Card>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        ...state,
        projectTypes: state.projectTypes.projectTypes,
        plantTypes: state.projectTypes.plantTypes,
        plantFault: state.projectTypes.plantFault,
        plantType: [{displayText: "Select Plant Type" , value: "-1"}, {displayText: "GROUNDMOUNT" , value: "GROUNDMOUNT"},{displayText: "ROOFTOP" , value: "ROOFTOP"}]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProjectNames: (projectTypes) => dispatch(getProjectNames(projectTypes)),
        getPlantByProjectId: (projectId) => dispatch(getPlantByProjectId(projectId)),
        getPlantAvailabilityByPlantId: (plantId) => dispatch(getPlantAvailabilityByPlantId(plantId)),
        createUpdateForecastConfig: (forecastSetting) => dispatch(createUpdateForecastConfig(forecastSetting))
    }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(AddEditAlertMailGeneration));