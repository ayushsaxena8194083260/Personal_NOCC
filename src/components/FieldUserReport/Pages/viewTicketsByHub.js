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
import { BrowserRouter } from 'react-router-dom';
import '../../../App.scss';
import { clearFieldUserInput , getHubBasedTicketsWithDate, getHubBasedTickets} from "../../../actions/action-FieldUserReport";
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import ViewTicketsByHubPlant from './viewTicketsByHubPlant';

const rowIndex = (params) => params.node.rowIndex + 1;

class ActionCellRenderer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div className="products-actions">
            <Link className="products-actions-link"
                to={{
                    pathname: "/fieldUserReport/viewTicketsByHubPlant",
                    hubTicketsPlant: this.props.data,
                    fromDate: this.props.context.componentParent.state.selectedFromDate,
                    toDate: this.props.context.componentParent.state.selectedToDate
            }}>
                {this.props.data.hubName}
            </Link>
        </div>);
    }
}


class ViewTicketsByHub extends Component{
    constructor(props) {
        super(props);
        this.state = {
            selectedFromDate: this.getMonthStartDate(),
            selectedToDate: this.getCurrentDate(),
            hubTicketsDate: this.props.hubTicketsDate,
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
        this.props.clearFieldUserInput();
        //this.props.getHubBasedTickets();
        this.props.getHubBasedTicketsWithDate({fromDate:this.state.selectedFromDate,toDate:this.state.selectedToDate});
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
                headerName: "Hub Name", field: "hubName", cellClass: 'cell-wrap',
                autoHeight: true, width: 400, cellStyle: { 'white-space': 'normal' },
                cellRendererFramework: ActionCellRenderer
                    // <Link className="products-actions-link"
                    // to={{
                    //     pathname: "/viewTicketsByHubPlant",
                    //     hubTicketsPlant: this.props.data
                    // }}>
                    /* <img src="/images/editIcon.png" alt="Edit" /> */
                // </Link>
                    //     var link = document.createElement('a');
                    // link.href = <ViewTicketsByHubPlant/>;
                    // link.innerText = params.value;
                    // link.addEventListener('click', (e) => {
                    //     e.preventDefault();
                    //     console.log(params.data.id);
                    // });
                    // return link;
                
            },
            {
                headerName:"Total Tickets", field: "noOfTickets", cellClass: 'cell-wrap',
                autoHeight: true, width: 240, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Ticket Open", field: "open", cellClass: 'cell-wrap',
                autoHeight: true, width: 240, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Ticket Closed", field: "closed", cellClass: 'cell-wrap',
                autoHeight: true, width: 240, cellStyle: { 'white-space': 'normal' }
            },
        ];
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== null) {            
            this.setState({
                hubTicketsDate: nextProps.hubTicketsDate,
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
        this.props.getHubBasedTicketsWithDate({fromDate:this.state.selectedFromDate,toDate:this.state.selectedToDate});
    }
    
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
                    className="ag-theme-material">
                    <AgGridReact
                        columnDefs={this.createColumnDefs()}
                        rowData={this.state.hubTicketsDate}
                        context={{ componentParent: this }}
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
        hubTicketsDate: state.FieldUserReportReducers.hubTicketsDate,
        displayMessage: state.moduleCleaningReducer.displayMessage,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        clearFieldUserInput: () => dispatch(clearFieldUserInput()),
        getHubBasedTicketsWithDate: (data) => dispatch(getHubBasedTicketsWithDate(data)), 
        getHubBasedTickets:() => dispatch(getHubBasedTickets())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ViewTicketsByHub));