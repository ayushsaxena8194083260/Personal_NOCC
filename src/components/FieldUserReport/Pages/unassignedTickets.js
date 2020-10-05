import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import DropDown from "../../Common/DropDown";
import { AgGridReact } from "ag-grid-react";
import 'react-picky/dist/picky.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import '../../../styles/plant/plantFaultData.scss';
import {
    Link,Route
} from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import '../../../App.scss';
import { getAllPlants } from "../../../actions/PlantActions";
import { getPlantByType, getModuleCleaningByPlantId, getModuleCleaningAnalysisDataByDate, clearModuleAnalysisData, createOrUpdateModuleCleaningAnalysis } from "../../../actions/moduleCleaningAnalysisActions";
import { clearFieldUserInput, getUserTicketDetails } from "../../../actions/action-FieldUserReport";
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getUnassignedTickets, createUpdateUserTicket } from '../../../actions/action-FieldUserReport';

const rowIndex = (params) => params.node.rowIndex + 1;

class ActionCellRenderer extends React.Component { 
    constructor(props) {
        super(props);
        this.invokeDelete = this.invokeDelete.bind(this);
    }

    invokeDelete() {
        this.props.context.componentParent.onDelete(this.props.node.data._id);
    }
    getAssigenedTicket() { 
        this.props.context.componentParent.assignTicketToUser(this.props.node.data); 
    }
    render() {
        return (<div className="products-actions-input">
            <button type="button" className="btn btn-orange" onClick={() => this.getAssigenedTicket()}>
                Assign
            </button>
        </div>);
    }
}
class DropdownCellRenderer extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangeUser = this.handleChangeUser.bind(this);
    }

    handleChangeUser(data) {
        this.props.context.componentParent.handleChangeUser(data.target.value);
    }
    render() {
        return (<div className="products-actions-input">
            <select class="form-control" name="userId" type="dropdown" onChange={(item) => this.handleChangeUser(item)}>
                {this.props.context.componentParent.props.users && this.props.context.componentParent.props.users.map((item, key) => {
                    return <option value={item.userId}>{item.name}</option>
                }
                )}
            </select>
        </div>);
    }
}

class LinkCellRenderer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div className="products-actions">
            <Link className="products-actions-link"
                to={{
                    pathname: "/fieldUserReport/viewTicketDetails/",
                    ticketdetails: this.props.data
                }}>
                {this.props.data.osTicketid}
            </Link>
            {/* <Route render={({ history }) => (
                           
                                <a src="#" onClick={() => { history.push('/viewTicketDetails') }} >{this.props.data.osTicketid}</a>
                            
                            )}/> */}
        </div>);
    }
}

class UnassignedTickets extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedPlantType:null,
            selectedPlantOptions: [],
            showPopUp: false,
            selectedFromDate: this.getMonthStartDate(),
            selectedToDate: this.getCurrentDate(),
            unassignedTickets: this.props.unassignedTickets,
            plantTypes: this.props.plantTypes,
            overlayLoadingTemplate: '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>',
            overlayNoRowsTemplate: "<p class='message warning'>No Record found.</p>",
           
            
            // selectedPlanType: null,
            // selectedProjectTypes: null,
           
            // projectTypes: this.props.projectTypes,
           // plantTypes: this.props.plantTypes,
           // unassignedTickets: this.props.unassignedTickets,
           
            // deleteID: null,
            // cleanedEnergy: null,
            // UncleanedEnergy: null,
            // id: null,
            // postData: [],
            // overlayLoadingTemplate: '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>',
            // overlayNoRowsTemplate: "<p class='message warning'>No Record found.</p>",
             userPerformance: this.props.userPerformance,
            selectedUser: null
        };
        this.assignTicketToUser = this.assignTicketToUser.bind(this);
    }

    assignTicketToUser(data) {
        let userTicket = data;
        userTicket.ticketStatus = 'Assigned';
        userTicket.userId = this.state.selectedUser;
        userTicket['errorCodeId'] = userTicket.errorCode;
        userTicket['rootCause'] = userTicket.root_cause;
        userTicket['imagePath'] = userTicket.image;
        userTicket['currentStatus'] = 'Open';
        delete userTicket.plantName;
        delete userTicket.plantCapacityDC;
        delete userTicket.image;
        delete userTicket.errorCode;
        delete userTicket.root_cause;
        this.props.createUpdateUserTicket(userTicket);
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
    getMonthStartDate() {
        var today = new Date();
        var d = 1;
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
        this.setState({ selectedUser: data })
    }

    componentDidMount(){
        this.props.getUnassignedTickets({ fromDate: this.state.selectedFromDate, toDate: this.state.selectedToDate });
        this.props.getUserTicketDetails();
        
    }

    createColumnDefs() {
        return [
            {
                headerName: "",
                editable: false,
                width: 50,
                cellRenderer: function (params) {
                    var input = document.createElement("input");
                    input.type = "checkbox";
                    input.checked = params.value;
                    input.addEventListener("click", function (event) {
                        params.value = !params.value;
                        params.node.data.selected = params.value;
                        console.log(
                            this.state.unassignedTickets.reduce(
                                (acc, obj) => (acc.selected || acc) + ", " + obj.selected
                            )
                        );
                    });
                    return input;
                }
            },
            {
                headerName: "Sr No", ockPosition: true, valueGetter: rowIndex, width: 50, cellClass: 'cell-wrap',
                autoHeight: true, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "OS Ticket ID", field: "osTicketid", cellClass: 'cell-wrap',
                autoHeight: true, width: 85, cellStyle: { 'white-space': 'normal' },
               cellRendererFramework: LinkCellRenderer
            },
            {
                headerName: "Plant Name", field: "plantName", cellClass: 'cell-wrap',
                autoHeight: true, width: 200, cellStyle: { 'white-space': 'normal' }
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
                autoHeight: true, width: 120, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Created Date", field: "createdAt", cellClass: 'cell-wrap',
                autoHeight: true, width: 90, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Assign to",
                field: '',
                cellRendererFramework: DropdownCellRenderer,
                width: 205,
            },
            {
                headerName: "Action",
                field: '',
                cellRendererFramework: ActionCellRenderer,
                width: 90,
            }
        ];
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== null) {
            this.setState({
                projectTypes: nextProps.projectTypes,
                plantTypes: nextProps.plantTypes,
                unassignedTickets: nextProps.unassignedTickets,
                userPerformance: nextProps.userPerformance
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

    handleChangeFromDate(event) {
        let fromDate = event.target.value;
        this.setState({ selectedFromDate: fromDate });
    }

    handleChangeToDate(event) {
        let toDate = event.target.value;
        this.setState({ selectedToDate: toDate });
    }

    getRenderUnassignedTasks() {
        this.props.getUnassignedTickets({ plantIds: [this.state.selectedPlantOptions], fromDate: this.state.selectedFromDate, toDate: this.state.selectedToDate });
        console.log(this.props.users)
    }

    render() {
        return (
            <div>
                <div className="animated fadeIn">
                    <div className="top-filter" style={{ height: "44px" }}>
                        <div className="row" style={{ alignItems: "center", margin: "0" }} >

                            <Col xs={1} style={{ maxWidth: "5%" }}>
                                <Form.Label>Type:</Form.Label>
                            </Col>
                            <Col style={{ maxWidth: "15%", padding: "0" }}>
                                <DropDown
                                    className="top-search-input form-control"
                                    Name="plantType"
                                    itemSource={this.props.plantType}
                                    value={this.state.selectedPlantType}
                                    handleChange={(item) => this.handleChangePlantType(item)}
                                />
                            </Col>
                            <Col xs={1} style={{ maxWidth: "5%" }}>
                                <Form.Label>Plant:</Form.Label>
                            </Col>
                            <Col style={{ maxWidth: "13%", padding: "0" }}>
                                <DropDown
                                    className="top-search-input form-control"
                                    Name="plants"
                                    itemSource={this.getDropDownPlants()}
                                    value={this.state.selectedPlantOptions}
                                    handleChange={(item) => this.handleChangePlants(item)}
                                />
                            </Col>
                            <Col xs={1} style={{ maxWidth: "5%" }}>
                                <Form.Label>From:</Form.Label>
                            </Col>
                            <Col xs={2} style={{ maxWidth: "20%" }} >
                                <Form.Control name="fromDate" type="date" onChange={(item) => this.handleChangeFromDate(item)} value={this.state.selectedFromDate} />
                            </Col>
                            <Col xs={1} style={{ maxWidth: "5%" }}>
                                <Form.Label>To:</Form.Label>
                            </Col>
                            <Col xs={2} style={{ maxWidth: "20%" }} >
                                <Form.Control name="toDate" type="date" onChange={(item) => this.handleChangeToDate(item)} value={this.state.selectedToDate} />
                            </Col>
                            <Col xs={2} style={{ maxWidth: "7%" }}>
                                <button type="button" className="btn btn-orange" onClick={() => this.getRenderUnassignedTasks()}>
                                    Go
                        </button>
                            </Col>
                        </div>
                        {/* <div>
                            <p className="message success" style={{ marginTop: "15px" }}>{this.props.displayMessage}</p>
                        </div> */}

                    </div>
                    {/* <div
                        style={{
                            height: '500px',
                        }}
                        className="ag-theme-material">
                        <AgGridReact
                            columnDefs={this.createColumnDefs()}
                            rowData={this.state.unassignedTickets}
                            context={{ componentParent: this }}
                            onGridReady={this.onGridReady}>
                        </AgGridReact>
                    </div> */}

                </div>
                <div
                    style={{
                        height: '500px',
                    }}
                    className="ag-theme-material">
                    <AgGridReact
                        columnDefs={this.createColumnDefs()}
                        rowData={this.state.unassignedTickets}
                        context={{ componentParent: this }}
                        overlayLoadingTemplate={this.state.overlayLoadingTemplate}
                        overlayNoRowsTemplate={this.state.overlayNoRowsTemplate}
                        onGridReady={this.onGridReady}>
                    </AgGridReact>
                </div>
            </div>
        );
    }
}

function getDropDownUsers(userPerformance) {
    let users = [];
    users.push({ displayText: "Select User", value: "0" })
    userPerformance && userPerformance.map((item) => {
        users.push({ displayText: item.username, value: item.userId })
    });

    return users;
}

const mapStateToProps = state => {
    let users = [{ name: "SELECT USERS", userId: "-1" }];
    state.FieldUserReportReducers.userTicketsDate && state.FieldUserReportReducers.userTicketsDate.length > 0 && state.FieldUserReportReducers.userTicketsDate.map((item) => users.push(item));
    return {
        unassignedTickets: state.FieldUserReportReducers.unassignedTicket,
        plantsByType: state.plants.plantsByType,
        plantTypes: state.projectTypes.plantTypes,
        plants: state.plants.plants,
        users: users,
        displayMessage: state.moduleCleaningReducer.displayMessage,
        plantType: [{ displayText: "Select Plant Type", value: "-1" }, { displayText: "GROUNDMOUNT", value: "GROUNDMOUNT" }, { displayText: "ROOFTOP", value: "ROOFTOP" }]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserTicketDetails: () => dispatch(getUserTicketDetails()),
        getPlantByType: (plantsByType) => dispatch(getPlantByType(plantsByType)),
        getAllPlants: () => dispatch(getAllPlants()),
        clearFieldUserInput: () => dispatch(clearFieldUserInput()),
        getUnassignedTickets: (data) => dispatch(getUnassignedTickets(data)), 
        createUpdateUserTicket: (data) => dispatch(createUpdateUserTicket(data))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UnassignedTickets));