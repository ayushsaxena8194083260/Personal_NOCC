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
import { renderAllUserDetails } from '../../../actions/action-Settings';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { clearFieldUserInput, getUserTicketDetailsWithDate, getUserTicketDetails, getUserTicketDetailsWithDateanduserId } from "../../../actions/action-FieldUserReport";

const rowIndex = (params) => params.node.rowIndex + 1;

class ActionCellRenderer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div className="products-actions">
            <Link className="products-actions-link"
                to={{
                    pathname: "/fieldUserReport/assignFieldUser",
                    hubTicketsPlant: this.props.data,
                    fromDate: this.props.context.componentParent.state.selectedFromDate,
                    toDate: this.props.context.componentParent.state.selectedToDate
            }}>
                {this.props.data.name}
            </Link>
        </div>);
    }
}
class ViewTicketsByUser extends Component{
    constructor(props) {
        super(props);
        this.state = {
            selectedFromDate: this.getMonthStartDate(),
            selectedToDate: this.getCurrentDate(),
            selectedUser: null,
            userTicketsDate: this.props.userTicketsDate,
        };
    }

    componentDidMount() {
        // document.title = 'Plant Fault Data';
        this.props.getUserTicketDetails();
        this.props.clearFieldUserInput();
        this.props.renderAllUserDetails();
        // console.log(this.state.userTicketsDate)
    }
    componentDidUpdate() {
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

    createColumnDefs() {
        return [
            {
                headerName: "Sr No", ockPosition: true, valueGetter: rowIndex, cellClass: 'cell-wrap',
                autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Name", field: "name", cellClass: 'cell-wrap',
                autoHeight: true, width: 240, cellStyle: { 'white-space': 'normal' },
                cellRendererFramework: ActionCellRenderer
            },
            {
                headerName:"Total Tickets", field: "totalNumberOfTickets", cellClass: 'cell-wrap',
                autoHeight: true, width: 220, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName:"Total Tickets Assigned", field: "totalOpen", cellClass: 'cell-wrap',
                autoHeight: true, width: 220, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Ticket Open", field: "open", cellClass: 'cell-wrap',
                autoHeight: true, width: 220, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Ticket Closed", field: "closed", cellClass: 'cell-wrap',
                autoHeight: true, width: 220, cellStyle: { 'white-space': 'normal' }
            },
        ];
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== null) {            
            this.setState({
                users: nextProps.users,
                userTicketsDate: nextProps.userTicketsDate
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

    getRenderViewTicketsByUser() {
        console.log(this.state.selectedUser);
        if(this.state.selectedUser!=null){
        this.props.getUserTicketDetailsWithDateanduserId({fromDate:this.state.selectedFromDate,toDate:this.state.selectedToDate, userId: this.state.selectedUser});
        }
        else{
            alert('Select user');
        }
    }
    
    handleChangeUser(event) {
        // const _data = this.state.postData;
        const selectedValue = event.target.value;
        if (selectedValue && selectedValue.userId !== "-1") {
            this.setState({ selectedUser: selectedValue});
            // _data[event.target.name] = selectedValue;
            // this.setState({ postData: _data });
        }
    }

    render(){
        return(
            // <BrowserRouter>
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
                        <Col xs={1} style={{ maxWidth: "200%" }}>
                                    <Form.Label>User:</Form.Label>
                                </Col>
                                <Col>
                                    <select class="form-control" name="userId" type="dropdown" onChange={(item) => this.handleChangeUser(item)}>
                                        {this.props.users && this.props.users.map((item, key) => {
                                            return <option value={item.userId}>{item.name}</option>
                                        }
                                        )}
                                    </select>
                                </Col>

                        <Col></Col>
                        <Col xs={2} style={{ maxWidth: "7%" }}>
                            <button type="button" className="btn btn-orange" onClick={() => this.getRenderViewTicketsByUser()}>
                                Go
                        </button>
                        </Col>
                    </div>
                    {/* <div>
                    <p className="message success" style={{ marginTop: "15px" }}>{this.props.displayMessage}</p>
                    </div>
                     */}
                </div>
                <div
                    style={{
                        height: '500px',
                    }}
                    className="ag-theme-material">
                    <AgGridReact
                        columnDefs={this.createColumnDefs()}
                        rowData={this.state.userTicketsDate}
                        context={{ componentParent: this }}
                        onGridReady={this.onGridReady}>
                    </AgGridReact>
                </div>
                </div>
                
            // </BrowserRouter>
        );
    }
}
const mapStateToProps = (state, props) => {
    let users = [{ name: "SELECT USERS", userId: "-1" }];
    state.FieldUserReportReducers.userTicketsDate && state.FieldUserReportReducers.userTicketsDate.length > 0 && state.FieldUserReportReducers.userTicketsDate.map((item) => users.push(item));
    return {
        users: users,
        userTicketsDate: state.FieldUserReportReducers.userTicketsDate
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserTicketDetails: () => dispatch(getUserTicketDetails()),
        renderAllUserDetails:() => dispatch(renderAllUserDetails()),
        clearFieldUserInput: () => dispatch(clearFieldUserInput()),
        // getUserTicketDetailsWithDate: (data) => dispatch(getUserTicketDetailsWithDate(data)),
        getUserTicketDetailsWithDateanduserId:(data) => dispatch(getUserTicketDetailsWithDateanduserId(data))
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ViewTicketsByUser));