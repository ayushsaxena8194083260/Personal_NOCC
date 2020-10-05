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
import '../../../App.scss';
import { clearFieldUserInput , getPlantBasedTicketDetailsWithDate} from "../../../actions/action-FieldUserReport";
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import { Route } from 'react-router-dom';

const rowIndex = (params) => params.node.rowIndex + 1;

class ViewTicketsByHubPlantTickets extends Component{
    constructor(props) {
        super(props);
        this.state = {
            selectedFromDate: this.getMonthStartDate(),
            selectedToDate: this.getCurrentDate(),
            hubPlantIdDate: this.props.location && this.props.location.hubTicketsPlant ? this.props.location.hubTicketsPlant:[],
            overlayLoadingTemplate: '<span class="ag-overlay-loading-center"><div class="loader"></div><div style="text-align:center">Loading!</div></span>',
            overlayNoRowsTemplate: "<span style=\"padding: 10px; border: 2px solid #444; background: lightgoldenrodyellow;\">This is a custom 'no rows' overlay</span>",
            defaultColDef: {
            sortable: false,
            filter: false,
            searchFromDate: this.props.location.fromDate,
            searchToDate: this.props.location.toDate 
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
        this.props.getPlantBasedTicketDetailsWithDate({fromDate:this.state.defaultColDef.searchFromDate,toDate:this.state.defaultColDef.searchToDate,plantId:this.state.hubPlantIdDate.plantId});
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
                headerName:"Ticket Created Date", field: "createdAt", cellClass: 'cell-wrap',
                autoHeight: true, width: 140, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Ticket Assigned To", field: "ticketAssignedTo", cellClass: 'cell-wrap',
                autoHeight: true, width: 240, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Severity (kwh)", field: "severity", cellClass: 'cell-wrap',
                autoHeight: true, width:140, cellStyle: { 'white-space': 'normal' }
            },
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
                hubPlantIdDate: nextProps.hubPlantIdDate,
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
        this.props.getPlantBasedTicketDetailsWithDate({fromDate:this.state.selectedFromDate,toDate:this.state.selectedToDate,plantId:this.state.hubPlantIdDate.plantId});
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
                        {/* <Col></Col> */}
                        <Col xs={2} style={{ maxWidth: "7%" }}>
                            <button type="button" className="btn btn-orange" onClick={() => this.getRenderViewTicketsByHub()}>
                                Go
                        </button>
                        </Col>
                        <Col>
                        <Route render={({ history }) => (
                                <Col md={2}>
                                    <Button variant="primary" size="md" onClick={() => { history.push('/fieldUserReport/viewTicketsByHubPlant') }} block>Back</Button>
                                </Col>
                            )} />                        
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
                        rowData={this.props.hubPlantIdDate}
                        pinnedTopRowData={this.props.hubPlantIdDate && this.props.hubPlantIdDate.length>0?this.pinnedTopRowData():null}
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
    return {
        hubPlantIdDate: state.FieldUserReportReducers.hubPlantIdDate,
        displayMessage: state.moduleCleaningReducer.displayMessage,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        clearFieldUserInput: () => dispatch(clearFieldUserInput()),
        getPlantBasedTicketDetailsWithDate: (data) => dispatch(getPlantBasedTicketDetailsWithDate(data)) 
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ViewTicketsByHubPlantTickets));