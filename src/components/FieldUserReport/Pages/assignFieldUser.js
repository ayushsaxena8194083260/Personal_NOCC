import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import {AgGridReact} from "ag-grid-react";
import 'react-picky/dist/picky.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import '../../../styles/plant/plantFaultData.scss';
import { BrowserRouter, Link } from 'react-router-dom';
import '../../../App.scss';
import { clearFieldUserInput , getPlantBasedTicketDetails, getUserTicketDetails, getUserOpenClosedTicketDetailsWithDate} from "../../../actions/action-FieldUserReport";
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const rowIndex = (params) => params.node.rowIndex + 1;

class AssignCellRenderer extends React.Component {
    constructor(props) {
        super(props);
        this.invokeDelete = this.invokeDelete.bind(this);
    }

    invokeDelete() {
        this.props.context.componentParent.onDelete(this.props.node.data._id);
    }
    getAssigenedTicket() { }
    render() {
        return (<div className="products-actions-input">
        <div style={{width:"150px", display:"inline-block"}}>
            <button type="button" className="btn btn-orange" onClick={() => this.getAssigenedTicket()}>
                Assign
            </button>
        </div>
            {/* <a href="https://nocc.azurepower.com/fielduser/viewTicketDetails/MTU3MDU=" class="view">View Details </a> */}
            <Link className="view"
                to={{
                    pathname: "/",
                }}>
                View Details
            </Link>
        </div>);
    }
}
class DropdownCellRenderer extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangeUser = this.handleChangeUser.bind(this);
    }

    handleChangeUser(data) {
        this.props.context.componentParent.handleChangeUser(data);
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
class AssignFieldUser extends Component{
    constructor(props) {
        super(props);
        this.state = {
            selectedFromDate: this.getMonthStartDate(),
            selectedToDate: this.getCurrentDate(),
            hubTicketsPlant: this.props.location && this.props.location.hubTicketsPlant ? this.props.location.hubTicketsPlant:[],
            userTicketsDateUserId: '',
            overlayLoadingTemplate: '<span class="ag-overlay-loading-center"><div class="loader"></div><div style="text-align:center">Loading!</div></span>',
        overlayNoRowsTemplate: "<span style=\"padding: 10px; border: 2px solid #444; background: lightgoldenrodyellow;\">This is a custom 'no rows' overlay</span>",
        defaultColDef: {
            sortable: false,
            filter: false,
            searchFromDate: this.props.location.fromDate,
            searchToDate: this.props.location.toDate ,
            sampleRow:[{plantName:"asd",ticketType:"ticketType"}]
          },
        };
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

    componentDidMount() {
        // document.title = 'Plant Fault Data';
        // this.props.clearFieldUserInput();
        this.props.getUserTicketDetails();
        this.props.getPlantBasedTicketDetails({fromDate:this.state.searchFromDate,toDate:this.state.selectedToDate,plantId:this.state.hubTicketsPlant.plantId});
        this.props.getUserOpenClosedTicketDetailsWithDate({fromDate:this.state.selectedFromDate,toDate:this.state.selectedToDate,userId:this.state.hubTicketsPlant.userId});
        
    }
    componentDidUpdate() {
        //this.props.getProjectNames(this.state.selectedValue);
    }


    createColumnDefs() {
        return [
            {
                headerName: "Sr No", ockPosition: true, valueGetter: rowIndex, cellClass: 'cell-wrap',
                autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Plant Name", field: "plantName", cellClass: 'cell-wrap',
                autoHeight: true, width: 140, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Ticket Type", field: "issueType", cellClass: 'cell-wrap',
                autoHeight: true, width: 140, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName:"Created Date", field: "createdDate", cellClass: 'cell-wrap',
                autoHeight: true, width: 140, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Assigned To", field: "ticketAssignedTo", 
                cellRendererFramework:DropdownCellRenderer,
                width:220
            },
            {
                headerName: "Severity (kwh)", field: "severity", cellClass: 'cell-wrap',
                autoHeight: true, width:140, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: 'Action',
                field: '',
                cellRendererFramework:AssignCellRenderer,
                width: 300
            }
        ];
    }
    pinnedTopRowData() {
        return [
            {
                sr_no: "",
                plantName:"",
                ticketType:"",
                ticketCreatedDate:"",
                ticketAssignedTo:"Open Tickets",
                severity:""
            }
        ]
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps !== null) {            
            this.setState({
                hubTicketsPlant: nextProps.hubTicketsPlant,
                userTicketsDateUserId: nextProps.userTicketsDateUserId
            })
        }
    }

    handleChangeFromDate(event) {
        let fromDate = event.target.value;
        this.setState({ selectedFromDate: fromDate});
    }
    handleChangeToDate(event) {
        let toDate = event.target.value;
        this.setState({ selectedToDate: toDate});
    }

    getRenderViewTicketsByHub() {
        // this.props.getPlantBasedTicketDetails({fromDate:this.state.hubTicketsPlant.selectedFromDate,toDate:this.state.hubTicketsPlant.selectedToDate,plantId:this.state.hubTicketsPlant.plantId});
    }
    onGridReady = params => {
		this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        // params.api.setHeaderHeight(70);
	  };
    render(){
        return(
            <>
                <div className="animated fadeIn">
                <div className="top-filter" style={{height:"44px"}}>
                    <div className="row" style={{ alignItems: "center", margin: "0" }} >
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
                        <Col></Col>
                        <Col xs={2} style={{ maxWidth: "7%" }}>
                            <button type="button" className="btn btn-orange" onClick={() => this.getRenderViewTicketsByHub()}>
                                Go
                        </button>
                        </Col>
                    </div>                    
                </div>
                <div
                    style={{
                        height: '500px',
                    }}
                    className="ag-theme-material ag-green-top-fix">
                    <AgGridReact
                        defaultColDef={this.state.defaultColDef}
                        columnDefs={this.createColumnDefs()}
                        // rowData={this.props.hubTicketsPlant}
                        rowData={this.state.userTicketsDateUserId}
                        pinnedTopRowData={this.state.sampleRow && this.state.sampleRow.length > 0 ?this.pinnedTopRowData():null}
                        context={{ componentParent: this }}
                        overlayLoadingTemplate={this.state.overlayLoadingTemplate}
                        overlayNoRowsTemplate={this.state.overlayNoRowsTemplate}
                        onGridReady={this.onGridReady}>
                    </AgGridReact>
                </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    let users = [{ name: "SELECT USERS", userId: "-1" }];
    state.FieldUserReportReducers.userTicketsDate && state.FieldUserReportReducers.userTicketsDate.length > 0 && state.FieldUserReportReducers.userTicketsDate.map((item) => users.push(item));
    return {
        users:users,
        hubPlantID: state.FieldUserReportReducers.hubPlantID,
        displayMessage: state.moduleCleaningReducer.displayMessage,
        userTicketsDateUserId: state.FieldUserReportReducers.userTicketsDateUserId
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserTicketDetails: () => dispatch(getUserTicketDetails()),
        clearFieldUserInput: () => dispatch(clearFieldUserInput()),
        getPlantBasedTicketDetails: (data) => dispatch(getPlantBasedTicketDetails(data)),
        getUserOpenClosedTicketDetailsWithDate : (data) => dispatch(getUserOpenClosedTicketDetailsWithDate(data))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AssignFieldUser));