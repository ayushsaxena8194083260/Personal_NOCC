
import React, { Component } from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { withRouter } from 'react-router-dom';
import 'react-picky/dist/picky.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import DropDown from '../../../../../Common/DropDown';
import { getInverterConfiguration, clearSettingPlantMapping } from '../../../../../../actions/action-Settings';
import { connect } from 'react-redux';
import { getPlantByType } from "../../../../../../actions/moduleCleaningAnalysisActions";
import Picky from 'react-picky';
import { Route } from 'react-router-dom';


class AddCombinerBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inverterConfiguration: this.props.inverterConfiguration,
            selectedPlanType: null,
            plantTypes: this.props.plantTypes,
            selectedPlantOptions: [],
            showPopUp: false,
            deleteID: null,
            postData: {
                designName:null,
                actualName:null,
                dcLoading:null
            }
        };
        this.selectMultipleOption = this.selectMultipleOption.bind(this);
    }

    componentDidMount() {
        // document.title = 'Plant Fault Data';
        this.props.clearSettingPlantMapping();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            inverterConfiguration: nextProps.inverterConfiguration,
            plantTypes: nextProps.plantTypes
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

    getDropDownPlants() {
        let plants = [];
        plants.push({ displayText: "Select Plant", value: "0" })
        this.state.plantTypes && this.state.plantTypes.map((item) => {
            plants.push({ displayText: item.plantName, value: item.plantId })
        });

        return plants;
    }

    getRenderInverterConfiguration() {
        let plantIds = [];
        this.state.selectedPlantOptions && this.state.selectedPlantOptions.length > 0 && this.state.selectedPlantOptions.map((item) => { plantIds.push(item.id) });
        plantIds.length > 0 && this.props.getInverterConfiguration({ plantIds: plantIds });
    }

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

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.postData != null){
            this.props.createUpdateCombinerBox({input:this.state.postData,type:"Add Combiner Box"});
            this.props.history.push("/setting/InverterConfiguration")
        }

    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <div>
                    <Card className="add-fault-card">
                        <Card.Header as="h5">Add Combiner Box</Card.Header>
                        <Card.Body>
                            <Row>
                                <Col>
                                    <Form.Label>Combiner Box Name As Per Design:<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="designName" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.designName} />
                                    {this.renderErrortext("designName", "The Combiner Box Name As Per Design Field Is Required.")}
                                </Col>
                                <Col>
                                    <Form.Label>Combiner Box Name As Per Actual:<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="actualName" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.actualName} />
                                    {this.renderErrortext("actualName", "Combiner Box Name As Per Actual:*")}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>DC Loading<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="dcLoading" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.dcLoading} />
                                    {this.renderErrortext("dcLoading", "The DC Loading Field Is Required.")}
                                </Col>
                                <Col></Col>
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
                            <table id="t-list">
                        <tbody><tr>
                            <th class="txtSdw">Sr No.</th>
                            <th class="txtSdw">Plant name</th>
                            <th class="txtSdw">Inverter name</th>
                            <th class="txtSdw">Combiner Box Name As Per Design</th>
                            <th class="txtSdw">Combiner Box Name As Per Actual</th>
                            <th class="txtSdw">DC Loading</th>
                            <th class="txtSdw">Action</th>

                        </tr>
                        <tr>
                                    <td>1</td>
                                    <td>Punjab 1</td>
                                    <td>INV-1</td>
                                    <td>CB_CURRENT_1</td>
                                    <td>CB_CURRENT_1</td>
                                    <td>14.625</td>
                                    <td>
                                            <a href="" title="Edit CB"><img src="https://nocc.azurepower.com/images/editIcon.png"/></a>
                                            <a title="Delete" href="javascript:void(0)" onclick="ConfirmDeleteCombinerBox('1765');"><img src="https://nocc.azurepower.com/images/deleteIcon.png"/></a>
                                    </td>

                                </tr>                     
                                                                                        
                    </tbody></table>
                        </Card.Body>
                    </Card>
                </div>
            </form >
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        plantsByType: state.plants.plantsByType,
        plantTypes: state.projectTypes.plantTypes,
        plants: state.plants.plants,
        plantType: [{ displayText: "Select Plant Type", value: "-1" }, { displayText: "GROUNDMOUNT", value: "GROUNDMOUNT" }, { displayText: "ROOFTOP", value: "ROOFTOP" }],
        inverterConfiguration: state.SettingsReducer.inverterConfiguration,
        submitedFields: ["designName", "actualName", "dcLoading"]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getInverterConfiguration: (plantIds) => dispatch(getInverterConfiguration(plantIds)),
        getPlantByType: (plantsByType) => dispatch(getPlantByType(plantsByType)),
        clearSettingPlantMapping: () => dispatch(clearSettingPlantMapping())

    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddCombinerBox));