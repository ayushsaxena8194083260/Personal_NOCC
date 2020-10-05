import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, withRouter } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Picky from 'react-picky';
import 'react-picky/dist/picky.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import '../../../styles/plant/plantFaultData.scss';
import DropDown from "../../Common/DropDown";
import { getAllPlants } from "../../../actions/PlantActions";
import { getPlantByType } from "../../../actions/moduleCleaningAnalysisActions";
import { clearFieldUserInput } from "../../../actions/action-FieldUserReport";
import { connect } from 'react-redux'
import {getAllGraphs} from '../../../actions/action-Report';

const rowIndex = (params) => params.node.rowIndex + 1;

class GenerateGraph extends Component{

    constructor(props) {
        super(props);
        this.state = {
            selectedPlanType: null,
            selectedDate: this.getCurrentDate(),
            selectedGraphs: null,
            plantTypes: this.props.plantTypes,
            graphs: this.props.graphs,
            selectedPlantOptions: [],
            showPopUp: false,
            deleteID: null,
            id: null,
            postData: [],
            overlayLoadingTemplate: '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>',
            overlayNoRowsTemplate: "<p class='message warning'>No Record found.</p>",
            userPerformance: this.props.userPerformance,
        };
    }

    componentDidMount(){
        this.props.getAllGraphs();
    }

    getCurrentDate() {
        var today = new Date();
        var d = today.getDate();
        var m = today.getMonth() + 1;
        var y = today.getFullYear();
        var data;

        if (d < 10) {
            d = "0" + d;
        };
        if (m < 10) {
            m = "0" + m;
        };

        data = y + "-" + m + "-" + d;
        return data;
    }

    handleChangeUser(data) {
        this.setState({selectedUser:data })
    }



    createColumnDefs() {
        return [
            // {
            //     headerName: "",
            //     editable: false,
            //     width: 80,
            //     cellRenderer: function (params) {
            //         var input = document.createElement("input");
            //         input.type = "checkbox";
            //         input.checked = params.value;
            //         input.addEventListener("click", function (event) {
            //             params.value = !params.value;
            //             params.node.data.selected = params.value;
            //             console.log(
            //                 this.state.unassignedTickets.reduce(
            //                     (acc, obj) => (acc.selected || acc) + ", " + obj.selected
            //                 )
            //             );
            //         });
            //         return input;
            //     }
            // },
            {
                headerName: "Sr No", ockPosition: true, valueGetter: rowIndex, width: 80, cellClass: 'cell-wrap',
                autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "OS Ticket ID", field: "osTicketid", cellClass: 'cell-wrap',
                autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Plant Name", field: "plantName", cellClass: 'cell-wrap',
                autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Error Code", field: "errorCode", cellClass: 'cell-wrap',
                autoHeight: true, width: 150, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Ticket Type", field: "issueType", cellClass: 'cell-wrap',
                autoHeight: true, width: 150, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Severity(kwh)", field: "severity", cellClass: 'cell-wrap',
                autoHeight: true, width: 150, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Created Date", field: "createdAt", cellClass: 'cell-wrap',
                autoHeight: true, width: 150, cellStyle: { 'white-space': 'normal' }
            },
            // {
            //     // headerName: "Assign to", field: "assignTo", cellClass: 'cell-wrap',
            //     // autoHeight: true, width: 120, cellStyle: { 'white-space': 'normal' }
            //     headerName: "Assign to",
            //     field: '',
            //     userPerformance:this.state.userPerformance,
            //     cellRendererFramework: DropdownCellRenderer  ,
            //     width: 100,
            // },
            {
                headerName: "Action",
                field: '',
                // cellRendererFramework: ActionCellRenderer,
                width: 100,
            }
        ];
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== null) {
            this.setState({
                plantTypes: nextProps.plantTypes,
                graphs: nextProps.graphs
            })
        }
    }

    handleChangePlantType(event) {
        const selectedValue = event.target.value;
        if (selectedValue !== this.state.selectedPlantType) {
            this.props.getPlantByType(selectedValue);
            this.setState({ selectedPlantType: selectedValue, selectedPlantOptions: null });
        }
    }

    handleChangeGraphs(event){
        const selectedValue = event.target.value;
        this.setState({selectedGraphs: selectedValue});
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

    getDropDownGraphs() {
        let graph = [];
        graph.push({ displayText: "Select Graphs", value: "0" })
        this.state.graphs && this.state.graphs.map((item) => {
            graph.push({ displayText: item.graphName, value: item.graphId })
        });

        return graph;
    }

    handleChangeDate(event) {
        let fromDate = event.target.value;
        this.setState({ selectedDate: fromDate });
    }

    getRenderUnassignedTasks() {
        this.props.getUnassignedTickets({ plantIds: [this.state.selectedPlantOptions], fromDate: this.state.selectedFromDate, toDate: this.state.selectedToDate });
    }

render(){
    return(
        <div>
                <div class="subHead">
                    <h5 style={{ fontSize: "16px" }}>
                    Generate Graph PDF
                </h5>
                </div>
                <div className="top-filters-lender">
                    <div className="row" style={{ alignItems: "center", margin: "0" }} >
                    <Col lg={1} md={1} sm={6} className="small_percent_width">
                            <Form.Label>Graph:</Form.Label>
                            

                            </Col>
                            <Col lg={2} md={2} sm={6} className="large_percent_width">
                                <DropDown
                                    className="top-search-input form-control"
                                    Name="plantType"
                                    itemSource={this.getDropDownGraphs()}
                                    value={this.state.selectedGraphs}
                                    handleChange={(item) => this.handleChangeGraphs(item)}
                                />
                            </Col>
                            <Col lg={1} md={1} sm={6} className="small_percent_width">
                            <Form.Label>Type:</Form.Label>
                            

                            </Col>
                            <Col lg={2} md={2} sm={6} className="large_percent_width">
                                <DropDown
                                    className="top-search-input form-control"
                                    Name="plantType"
                                    itemSource={this.props.plantType}
                                    value={this.state.selectedPlantType}
                                    handleChange={(item) => this.handleChangePlantType(item)}
                                />
                            </Col>
                            <Col lg={1} md={1} sm={6} className="small_percent_width">
                            <Form.Label>Plant:</Form.Label>
                            

                            </Col>
                            <Col lg={2} md={2} sm={6} className="large_percent_width">
                                <DropDown
                                    className="top-search-input form-control"
                                    Name="plants"
                                    itemSource={this.getDropDownPlants()}
                                    value={this.state.selectedPlantOptions}
                                    handleChange={(item) => this.handleChangePlants(item)}
                                />
                            </Col>
                            <Col lg={1} md={1} sm={6} className="small_percent_width">
                            <Form.Label>Date:</Form.Label>
                            

                            </Col>
                            <Col lg={2} md={2} sm={6} className="large_percent_width">
                                <Form.Control name="date" type="date" onChange={(item) => this.handleChangeDate(item)} value={this.state.selectedDate} />
                            </Col>
                            <Col lg={2} md={2} sm={6} className="large_percent_width">
                            </Col>
                            <Col lg={1} md={1} sm={6} className="small_percent_width">
                           
                            

                            </Col>
                            <Col lg={1} md={1} sm={6} className="large_percent_width">
                            <Form.Label>Description:</Form.Label>
                            

                            </Col>
                            <Col lg={2} md={2} sm={6} className="large_percent_width">
                            <Form.Control as="textarea" rows="2"/>
                        </Col>
                        <Col  lg={2} md={2} sm={6} className="large_percent_width">

                        <button type="button" className="btn btn-primary view_button" style={{ width: "90%" ,minWidth:"50px"}}>
                                    <img src="/images/icons/fugue/plus-circle.png" alt="add plant" title="Add Plant Fault" style={{ float: "left", marginRight: "3" }} />
                                    Add
                        </button>
                        </Col>
                    </div>
                </div>
                <Row style={{margin:"0"}}>
                <Col></Col>
                    <Col xs={2} style={{maxWidth:"11%"}}>
                        <Button variant="primary" size="lg" style={{minWidth:"105px"}}>Graph PDF</Button>
                    </Col>
                <Col></Col>
                </Row>
            </div>
    );
}
}

const mapStateToProps = state => {
    return {
        plantsByType: state.plants.plantsByType,
        plantTypes: state.projectTypes.plantTypes,
        plants: state.plants.plants,
        displayMessage: state.moduleCleaningReducer.displayMessage,
        graphs: state.ReportReducers.input,
        plantType: [{ displayText: "Select Plant Type", value: "-1" }, { displayText: "GROUNDMOUNT", value: "GROUNDMOUNT" }, { displayText: "ROOFTOP", value: "ROOFTOP" }]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPlantByType: (plantsByType) => dispatch(getPlantByType(plantsByType)),
        getAllPlants: () => dispatch(getAllPlants()),
        clearFieldUserInput: () => dispatch(clearFieldUserInput()),
        getAllGraphs: () => dispatch(getAllGraphs())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GenerateGraph));
