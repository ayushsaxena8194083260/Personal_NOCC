import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { AgGridReact } from "ag-grid-react";
import 'react-picky/dist/picky.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import '../../../styles/plant/plantFaultData.scss';
import { BrowserRouter, Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import '../../../App.scss';
import { renderAllUserDetails } from '../../../actions/action-Settings';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux'
import { withRouter, Route } from 'react-router-dom'
import { clearFieldUserInput, getUserTicketDetailsWithDate, getUserTicketDetails, getUserTicketDetailsWithDateanduserId } from "../../../actions/action-FieldUserReport";

const rowIndex = (params) => params.node.rowIndex + 1;

const tableStyle = {
    border: "none",
    boxShadow: "none"
  };

class viewTicketDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ticketsDetails: this.props.location.ticketdetails,
        };
    }

    componentDidMount() {
        // document.title = 'Plant Fault Data';
        // this.props.getUserTicketDetails();
        // this.props.clearFieldUserInput();
        // this.props.renderAllUserDetails();
        // console.log(this.state.userTicketsDate)
    }
    componentDidUpdate() {
    }

    // getCurrentDate() {
    //     var today = new Date();
    //     var d = today.getDate();
    //     var m = today.getMonth() + 1;
    //     var y = today.getFullYear();
    //     var data;

    //     if (d < 10) {
    //         d = "0" + d;
    //     };
    //     if (m < 10) {
    //         m = "0" + m;
    //     };

    //     data = y + "-" + m + "-" + d;
    //     return data;
    // }
    // getMonthStartDate() {
    //     var today = new Date();
    //     var d = 1;
    //     var m = today.getMonth() + 1;
    //     var y = today.getFullYear();
    //     var data;

    //     if (d < 10) {
    //         d = "0" + d;
    //     };
    //     if (m < 10) {
    //         m = "0" + m;
    //     };

    //     data = y + "-" + m + "-" + d;
    //     return data;
    // }



    componentWillReceiveProps(nextProps) {
        if (nextProps !== null) {
            this.setState({

                ticketsDetails: nextProps.ticketsDetails
            })
        }
    }

    // handleChangeFromDate(event) {
    //     let fromDate = event.target.value;
    //     this.setState({ selectedFromDate: fromDate});
    // }

    // handleChangeToDate(event) {
    //     let toDate = event.target.value;
    //     this.setState({ selectedToDate: toDate});
    // }

    // getRenderViewTicketsByUser() {
    //     console.log(this.state.selectedUser)
    //     this.props.getUserTicketDetailsWithDateanduserId({fromDate:this.state.selectedFromDate,toDate:this.state.selectedToDate, userId: this.state.selectedUser});
    // }

    // handleChangeUser(event) {
    //     // const _data = this.state.postData;
    //     const selectedValue = event.target.value;
    //     if (selectedValue && selectedValue.userId !== "-1") {
    //         this.setState({ selectedUser: selectedValue});
    //         // _data[event.target.name] = selectedValue;
    //         // this.setState({ postData: _data });
    //     }
    // }

    render() {
        return (
            <Card className="add-plant-card" style={{width:"100%"}}>
            <Card.Header as="h5">Ticket Details</Card.Header>
            <div id="pMLIstTable" class="pMLIstTable">
            <form method="post" action="https://nocc.azurepower.com/preventivemaintainance/addTaskStatus" name="Save">
            <div class="edit-form-pmtask">
            <table id="t-list">
                <tbody>
                <tr> 
                    <td>OS Ticket ID :</td>  <td>{this.state.ticketsDetails.osTicketid}</td>
                    <td>Issue Type : </td> <td>{this.state.ticketsDetails.issueType}</td>
                </tr>
                <tr> 
                    <td>Plant Capacity DC :</td>  <td>{this.state.ticketsDetails.plantCapacityDC}</td>
                    <td>Priority :</td>  <td></td>
                </tr>
                <tr> 
                    <td>Plant Name : </td> <td>{this.state.ticketsDetails.plantName}</td>
                    <td>Description : </td>  <td>{this.state.ticketsDetails.issueDescription}</td>
                </tr>
                <tr>
                    <td>Severity :(kwh)</td><td>{this.state.ticketsDetails.severity}</td>
                    <td>Ticket Created At :</td><td>{this.state.ticketsDetails.createdAt}</td>
                </tr>
                <tr> 
                    <td>Error Code : </td> <td>{this.state.ticketsDetails.errorCode}</td>
                </tr>
                </tbody>
                </table>
                </div>
                </form>
                </div>
                <Card.Header as="h5">Resolution Details</Card.Header>
                <div>
                    
                </div>
<div id="pMLIstTable" class="pMLIstTable">
<form method="post" action="https://nocc.azurepower.com/preventivemaintainance/addTaskStatus" name="Save">
<div class="edit-form-pmtask">
<table id="t-list">
    <tbody>
    <tr> 
        <td >Reason For The Issue :</td><td >{this.state.ticketsDetails.root_cause!='null'?this.state.ticketsDetails.root_cause:''}</td>
        <td >Resolution : </td> <td>{this.state.ticketsDetails.resolution!='null'?this.state.ticketsDetails.resolution:''}</td>
    </tr>
    <tr>
        <td>Image:</td>
        <td>
            <a href={this.state.ticketsDetails.image}>	<img width="60" height="60" src={this.state.ticketsDetails.image} /></a>
        </td>
    </tr>
    </tbody>
    </table>
    </div>
    </form>
    </div>
                </Card>

            
            // <article className="boxShw">
            //     <div className="content">
            //         <div className="edit-form">
            //             <div className="innerTopHead">
            //                 <h1 className="form-heading">Ticket Details</h1>

            //             </div>
            //             <div className="lbl">
            //         <table style={tableStyle} width="95%" align="center" border="0" cellspacing="0" cellpadding="0" id="tb">
            //       	<tbody>
            //               <tr> 
            //                   <td>OS Ticket ID :</td>  <td>{this.state.ticketsDetails.osTicketid}</td>
            //                   <td>Issue Type : </td> <td>{this.state.ticketsDetails.issueType}</td></tr>
        	//               <tr> 
            //                   <td>Plant Capacity DC :</td>  <td>{this.state.ticketsDetails.plantCapacityDC}</td>
        	//                   <td>Priority :</td>  <td></td></tr>
        	//               <tr> 
            //                   <td>Plant Name : </td> <td>{this.state.ticketsDetails.plantName}</td>
            //                   <td>Description : </td>  <td>{this.state.ticketsDetails.issueDescription}</td></tr>
            //               <tr>
            //                   <td>Severity :(kwh)</td><td>{this.state.ticketsDetails.severity}</td><td>Ticket Created At :</td><td>{this.state.ticketsDetails.createdAt}</td></tr>
            //               <tr> 
            //                   <td>Error Code : </td> <td>{this.state.ticketsDetails.errorCode}</td></tr>
            //         </tbody>
            //         </table>
            //         </div>
            //         </div>
            //         <div className="edit-form">
            //             <div className="innerTopHead">
            //                 <h1 className="form-heading">Resolution Details</h1>

            //             </div>
            //             <div className="lbl">
            //                 <table style={tableStyle} width="95%" align="center" border="0" cellspacing="0" cellpadding="0" id="tb">
            //                     <tbody><tr> <td colspan="3">Reason For The Issue :</td><td colspan="3">{this.state.ticketsDetails.root_cause}</td>
            //                         <td colspan="3">Resolution : </td> <td>{this.state.ticketsDetails.resolution}</td></tr>
            //                         <tr>
            //                             <td>Image:</td>
            //                             <td>
            //                                 <a href={this.state.ticketsDetails.image}>	<img width="60" height="60" src={this.state.ticketsDetails.image} /></a>
            //                             </td>
            //                         </tr>

            //                     </tbody>
            //                 </table>
            //             </div>
            //         </div>
            //         <Route render={({ history }) => (
            //                 <Col md={2}>
            //                     <Button variant="primary"  size="md" onClick={() => { history.push('/fieldUserReport') }} block>Back</Button>
            //                 </Col>
            //                 )}/>
            //     </div>                                    
            // </article >
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
        renderAllUserDetails: () => dispatch(renderAllUserDetails()),
        clearFieldUserInput: () => dispatch(clearFieldUserInput()),
        // getUserTicketDetailsWithDate: (data) => dispatch(getUserTicketDetailsWithDate(data)),
        getUserTicketDetailsWithDateanduserId: (data) => dispatch(getUserTicketDetailsWithDateanduserId(data))
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(viewTicketDetails));