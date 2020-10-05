import React, { Component } from 'react'
import {AgGridReact} from "ag-grid-react"
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import { Link, withRouter } from 'react-router-dom';
import 'react-picky/dist/picky.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import '../../../../../styles/plant/plantFaultData.scss';
import DropDown from "../../../../Common/DropDown";
import {getWeatherConfiguration} from '../../../../../actions/action-Settings';
import { connect } from 'react-redux';
import { getPlantByType } from "../../../../../actions/moduleCleaningAnalysisActions";
import { Button } from 'react-bootstrap';

const rowIndex = (params) => params.node.rowIndex + 1;

class ActionCellRenderer extends React.Component {
    constructor(props) {
        super(props);
        this.invokeDelete = this.invokeDelete.bind(this);
    }

    invokeDelete() {
        this.props.context.componentParent.onDelete(this.props.node.data._id);
    }
    render() {
        return (<div className="products-actions">
            <Link to="#" onClick={this.invokeDelete} title="Delete" >
            <img src="/images/icons/fugue/status.png" title="Active Project" alt="Active Project"/>
            </Link>
            <Link className="products-actions-link"
                to={{
                    pathname: "/plantFaultDataAddEdit",
                    plantFault: this.props.data
                }}>
                <img src="/images/editIcon.png" alt="Edit" />
            </Link>
            <Link to="#" onClick={this.invokeDelete} title="Delete" >
                <img src="/images/cross-circle.png" alt="Delete" />
            </Link>
        </div>);
    }
}
class AlertMapping extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data:this.props.data,
            selectedPlanType: null,
            plantTypes: this.props.plantTypes,
            selectedPlantOptions: [],
            showPopUp: false,
            deleteID: null,
        };
    }

    componentDidMount() {
        // document.title = 'Plant Fault Data';
        // this.props.getAlertCleaningSettings();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ 
            data: nextProps.data,
            plantTypes: nextProps.plantTypes
        });
    }

    createColumnDefs() {
        return [
            {
                headerName: "Sr No", ockPosition: true, valueGetter: rowIndex,cellClass: 'cell-wrap',
                autoHeight: true, width: 80, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Module Temperature Sensor- Top", field: "", cellClass: 'cell-wrap',
                autoHeight: true, width: 150, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Ambient Temperature Sensor- 1", field: "", cellClass: 'cell-wrap',
                autoHeight: true, width: 150, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Wind Speed Sensor", field: "", cellClass: 'cell-wrap',
                autoHeight: true, width: 150, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Air Pressure Sensor", field: "", cellClass: 'cell-wrap',
                autoHeight: true, width: 150, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Humidity Sensor", field: "", cellClass: 'cell-wrap',
                autoHeight: true, width: 150, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Irradiation At Horizontal", field: "", cellClass: 'cell-wrap',
                autoHeight: true, width: 150, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Irradiation At Array Tilt", field: "", cellClass: 'cell-wrap',
                autoHeight: true, width: 150, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Action",
                field: '',
                cellRendererFramework: ActionCellRenderer,
                width: 100,
            }
        ];
    }

    handleChangePlantType(event) {
        const selectedValue = event.target.value;
        if (selectedValue !== this.state.selectedPlantType) {
            this.props.getPlantByType(selectedValue);
            this.setState({ selectedPlantType: selectedValue, selectedPlantOptions: null});
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
        this.props.getWeatherConfiguration({ plantIds: [this.state.selectedPlantOptions] });

    }

    render() {
        return (
            <div>
                <Card className="add-plant-card">
                  <Card.Header as="h5">Level-1 Mapping</Card.Header>
                  <Card.Body>
                    <Row>
                        <h3 style={{color: "#000000",fontSize:"1em",marginLeft:"18px", lineHeight: "0.267em", fontWeight:"600"}}>Assigned Team : Gujarat( 1.1),(1.2)_Team</h3>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label style={{fontSize:"15px",marginBottom:"0"}}>Help Toptic<span className="form-required">*</span></Form.Label>                                               
                        </Col>
                        <Col>
                            <Form.Label style={{fontSize:"15px",marginBottom:"0"}}>Alert Type</Form.Label>                                               
                        </Col>
                    </Row>
                    <Row>
                        <Col >
                        <select className="top-search-input form-control" width='300px' name="plant_type" onChange={(item) => this.handleChangePlant(item)} disabled>
                        <option>Select</option>
                        </select>
                        </Col>
                        <Col>
                            <select className="top-search-input form-control" width='300px' name="plant_name" onChange={(item) => this.handleChangePlant(item)} disabled>
                            
                            <option>Select</option>
                        </select>
                        </Col>
                    </Row>
                    <Row>
                        <Col >
                        <select className="top-search-input form-control" width='300px' name="plant_type" onChange={(item) => this.handleChangePlant(item)} disabled>
                        <option>Select</option>
                        </select>
                        </Col>
                        <Col>
                            <select className="top-search-input form-control" width='300px' name="plant_name" onChange={(item) => this.handleChangePlant(item)} disabled>
                            
                            <option>Select</option>
                        </select>
                        </Col>
                    </Row>
                    <Row>
                        <Col >
                        <select className="top-search-input form-control" width='300px' name="plant_type" onChange={(item) => this.handleChangePlant(item)} disabled>
                        <option>Select</option>
                        </select>
                        </Col>
                        <Col>
                            <select className="top-search-input form-control" width='300px' name="plant_name" onChange={(item) => this.handleChangePlant(item)} disabled>
                            
                            <option>Select</option>
                        </select>
                        </Col>
                    </Row>
                    <Row>
                        <Col >
                        <select className="top-search-input form-control" width='300px' name="plant_type" onChange={(item) => this.handleChangePlant(item)} disabled>
                        <option>Select</option>
                        </select>
                        </Col>
                        <Col>
                            <select className="top-search-input form-control" width='300px' name="plant_name" onChange={(item) => this.handleChangePlant(item)} disabled>
                            
                            <option>Select</option>
                        </select>
                        </Col>
                    </Row>
                    <Row>
                        <Col >
                        <select className="top-search-input form-control" width='300px' name="plant_type" onChange={(item) => this.handleChangePlant(item)} disabled>
                        <option>Select</option>
                        </select>
                        </Col>
                        <Col>
                            <select className="top-search-input form-control" width='300px' name="plant_name" onChange={(item) => this.handleChangePlant(item)} disabled>
                            
                            <option>Select</option>
                        </select>
                        </Col>
                    </Row>
                    <Row>
                        <Col >
                        <select className="top-search-input form-control" width='300px' name="plant_type" onChange={(item) => this.handleChangePlant(item)} disabled>
                        <option>Select</option>
                        </select>
                        </Col>
                        <Col>
                            <select className="top-search-input form-control" width='300px' name="plant_name" onChange={(item) => this.handleChangePlant(item)} disabled>
                            
                            <option>Select</option>
                        </select>
                        </Col>
                    </Row>
                    <Row>
                        <Col >
                        <select className="top-search-input form-control" width='300px' name="plant_type" onChange={(item) => this.handleChangePlant(item)} disabled>
                        <option>Select</option>
                        </select>
                        </Col>
                        <Col>
                            <select className="top-search-input form-control" width='300px' name="plant_name" onChange={(item) => this.handleChangePlant(item)} disabled>
                            
                            <option>Select</option>
                        </select>
                        </Col>
                    </Row>
                    <Row>
                        <Col >
                        <select className="top-search-input form-control" width='300px' name="plant_type" onChange={(item) => this.handleChangePlant(item)} disabled>
                        <option>Select</option>
                        </select>
                        </Col>
                        <Col>
                            <select className="top-search-input form-control" width='300px' name="plant_name" onChange={(item) => this.handleChangePlant(item)} disabled>
                            
                            <option>Select</option>
                        </select>
                        </Col>
                    </Row>
                    <Row>
                        <Col >
                        <select className="top-search-input form-control" width='300px' name="plant_type" onChange={(item) => this.handleChangePlant(item)} disabled>
                        <option>Select</option>
                        </select>
                        </Col>
                        <Col>
                            <select className="top-search-input form-control" width='300px' name="plant_name" onChange={(item) => this.handleChangePlant(item)} disabled>
                            
                            <option>Select</option>
                        </select>
                        </Col>
                    </Row>
                    <Row>
                        <Col >
                        <select className="top-search-input form-control" width='300px' name="plant_type" onChange={(item) => this.handleChangePlant(item)} disabled>
                        <option>Select</option>
                        </select>
                        </Col>
                        <Col>
                            <select className="top-search-input form-control" width='300px' name="plant_name" onChange={(item) => this.handleChangePlant(item)} disabled>
                            
                            <option>Select</option>
                        </select>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label style={{fontSize:"15px",marginBottom:"0"}}>OST - Owner<span className="form-required">*</span></Form.Label>                                               
                        </Col>
                        <Col>
                            <Form.Label style={{fontSize:"15px",marginBottom:"0"}}>NOCC - Owner</Form.Label>                                               
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label style={{fontSize:"15px",marginBottom:"0"}}>Prajapati.Prafulkumar@Azurepower.Com *<span className="form-required">*</span></Form.Label>                                               
                        </Col>
                        <Col>
                            <Form.Label style={{fontSize:"15px",marginBottom:"0"}}>Prajapati.Prafulkumar@Azurepower.Com</Form.Label>                                               
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label style={{fontSize:"15px",marginBottom:"0"}}>Sanjay.Asari@Azurepower.Com <span className="form-required">*</span></Form.Label>                                               
                        </Col>
                        <Col>
                            <Form.Label style={{fontSize:"15px",marginBottom:"0"}}>Sanjay.Asari@Azurepower.Com</Form.Label>                                               
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button variant="primary" size="md" style={{transform:"translate(150%, 0)"}}>Re-Map User</Button>
                        </Col>
                        <Col>
                            <Button variant="primary" size="md" style={{transform:"translate(140%, 0)"}}>Level-2 Mapping</Button>
                        </Col>
                    </Row>
                    </Card.Body>
                    </Card>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        plantsByType: state.plants.plantsByType,
        plantTypes:state.projectTypes.plantTypes,
        plants: state.plants.plants,
        plantType: [{displayText: "Select Plant Type" , value: "-1"}, {displayText: "GROUNDMOUNT" , value: "GROUNDMOUNT"},{displayText: "ROOFTOP" , value: "ROOFTOP"}],
        data: state.SettingsReducer.data
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getWeatherConfiguration:(plantIds) => dispatch(getWeatherConfiguration(plantIds)),
        getPlantByType: (plantsByType) => dispatch(getPlantByType(plantsByType)),

    }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(AlertMapping));