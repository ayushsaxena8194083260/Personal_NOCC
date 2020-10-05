import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import DropDown from "../../Common/DropDown";
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
import { clearFieldUserInput, getUserTicketDetails, getUserInfoWithDateQuarterly, getUserInfoWithDateYearly, getUserInfoWithDateHalfYearly, getPlantsFromUserId } from "../../../actions/action-FieldUserReport";


class ViewTaskCount extends Component{
    constructor(props) {
        super(props);
        this.state = {
            selectedYear: null,
            selectedUser: 'Quarterly',
            data:this.props.location.data,
            fromDate:(new Date().getFullYear()-1)+'-01-01',
            toDate:(new Date().getFullYear())+'-12-31',
        };
    }

    componentDidMount() {
        this.props.getUserInfoWithDateQuarterly({fromDate:this.state.fromDate,toDate:this.state.toDate,userId:this.state.data.userId})
        this.props.getPlantsFromUserId({userId:this.state.data.userId})
    }
    // componentDidUpdate() {

    // }

    handleChangeYear(event) {
        const selectedYear = event.target.value;
        this.setState({ selectedYear });
        this.setState({fromDate:selectedYear.split('-')[0]+'-01-01',toDate:selectedYear.split('-')[0]+'-12-31'})
    }

    selectOption(value) {
        console.log("Vals", value);
        this.setState({ value });
    }

    createColumnDefs() {
        if(this.state.selectedUser === 'Quarterly'){
        return [
            {
                headerName: "Name", field: "name", cellClass: 'cell-wrap',
                autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Plant Name", field: "plantName", cellClass: 'cell-wrap',
                autoHeight: true, width: 220, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "PM Task Quarter 1 ", field: "quarterly1", cellClass: 'cell-wrap',
                autoHeight: true, width: 220, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "PM Task Quarter 2 ", field: "quarterly2", cellClass: 'cell-wrap',
                autoHeight: true, width: 220, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "PM Task Quarter 3 ", field: "quarterly3", cellClass: 'cell-wrap',
                autoHeight: true, width: 220, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "PM Task Quarter 4 ", field: "quarterly4", cellClass: 'cell-wrap',
                autoHeight: true, width: 220, cellStyle: { 'white-space': 'normal' }
            },
            
        ];
    }
    else if(this.state.selectedUser === 'Half_Yearly') {
        return [
            {
                headerName: "Name", field: "name", cellClass: 'cell-wrap',
                autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Plant Name", field: "plantName", cellClass: 'cell-wrap',
                autoHeight: true, width: 300, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "H 1 ", field: "halfYearly1", cellClass: 'cell-wrap',
                autoHeight: true, width: 300, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "H 2 ", field: "halfYearly2", cellClass: 'cell-wrap',
                autoHeight: true, width: 300, cellStyle: { 'white-space': 'normal' }
            },
        ];
    }
    else if(this.state.selectedUser === 'Yearly'){
        return [
            {
                headerName: "Name", field: "name", cellClass: 'cell-wrap',
                autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Plant Name", field: "plantName", cellClass: 'cell-wrap',
                autoHeight: true, width: 500, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Year ", field: "yearly", cellClass: 'cell-wrap',
                autoHeight: true, width: 220, cellStyle: { 'white-space': 'normal' }
            },
        ]
    }
    }
    // componentWillReceiveProps(nextProps) {
    //     if (nextProps !== null) {            
    //         this.setState({
    //             users: nextProps.users,
    //             userPerformance: nextProps.userPerformance
    //         })
    //     }
    // }


    getDropDownYear() {
        return this.props.years && this.props.years.map((item) => { return { displayText: item, value: item } });
    }

    getRenderUserInfo() {
        console.log(this.state.selectedUser)
        if(this.state.selectedUser === 'Quarterly'){
            this.props.getUserInfoWithDateQuarterly({fromDate:this.state.fromDate,toDate:this.state.toDate,userId:this.state.data.userId})
        }
        else if(this.state.selectedUser === 'Half_Yearly') {
            this.props.getUserInfoWithDateHalfYearly({fromDate:this.state.fromDate,toDate:this.state.toDate,userId:this.state.data.userId})
        }
        else if(this.state.selectedUser === 'Yearly'){
            this.props.getUserInfoWithDateYearly({fromDate:this.state.fromDate,toDate:this.state.toDate,userId:this.state.data.userId})
        }
    }

    handleChangeUser(event) {
        // const _data = this.state.postData;
        const selectedValue = event.target.value;
        if (selectedValue && selectedValue!== "") {
            this.setState({ selectedUser: selectedValue});
            console.log(this.state.selectedUser)
        }
    }

    render(){
        return(
            <>
                {console.log(this.props.userInfo)}

                <div className="animated fadeIn">
                <div className="top-filter" style={{height:"44px"}}>
                    <div className="row" style={{ alignItems: "center", margin: "0" }} >
                        <Col xs={1} style={{ maxWidth: "6%" }}>
                            <Form.Label>Year:</Form.Label>
                        </Col>
                        <Col style={{ maxWidth: "20%", padding: "0"}}>
                            <DropDown
                                className="top-search-input form-control"
                                Name="Duration"
                                itemSource={this.getDropDownYear()}
                                value={this.state.selectedYear}
                                handleChange={(item) => this.handleChangeYear(item)}
                            />
                        </Col>
                        <Col xs={1} style={{ maxWidth: "8%" }}>
                        </Col>
                        <Col style={{ maxWidth: "12%", padding: "0"}}>
                        </Col>
                        <Col xs={1} style={{ maxWidth: "220%" }}>
                                    <Form.Label>Activity<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <select class="form-control" name="activity" type="dropdown" onChange={(item) => this.handleChangeUser(item)}>
                                        <option key="-1" value="">Select Activity</option>
                                        <option key="1" value="Quarterly">Quarterly PM Check List</option>
                                        <option key="2" value="Half_Yearly">Half Yearly PM Check List</option>
                                        <option key="3" value="Yearly">Yearly PM Check List</option>
                                    </select>
                                </Col>
                            <Col></Col>
                            <Col xs={2} style={{ maxWidth: "7%" }}>
                            <button type="button" className="btn btn-orange" onClick={() => this.getRenderUserInfo()}>
                                Go
                        </button>
                        </Col>
                    </div>
                    {/* <div>
                    <p className="message success" style={{ marginTop: "15px" }}>{this.props.displayMessage}</p>
                    </div> */}
                    
                </div>
                <div
                    style={{
                        height: '500px',
                    }}
                    className="ag-theme-material">
                    <AgGridReact
                        columnDefs={this.createColumnDefs()}
                        rowData={this.props.userInfo}
                        context={{ componentParent: this }}
                        onGridReady={this.onGridReady}>
                    </AgGridReact>
                </div>
                </div>
                
            </>
        );
    }
}

function getYearFromToday() {
    let years = [];
    const todayDate = new Date();
    const strYear = todayDate.getFullYear();
        if (strYear) {
            let year = parseInt(strYear);
            const endYear = parseInt(strYear) + 1;
            let i;
            let addoneYear;
            years.push("Select Year");
            for (i = parseInt(year); i < endYear; i++) {
                addoneYear = parseInt(i) + 1;
                years.push(i + "-" + addoneYear);
            }
            
        }
    return years;
}

const mapStateToProps = (state, props) => {
    let users = [{ name: "SELECT USERS", userId: "-1" }];
    state.FieldUserReportReducers.userTicketsDate && state.FieldUserReportReducers.userTicketsDate.length > 0 && state.FieldUserReportReducers.userTicketsDate.map((item) => users.push(item));
    return {
        users: users,
        years: getYearFromToday(),
        userPerformance: state.FieldUserReportReducers.userPerformance,
        userTicketsDate: state.FieldUserReportReducers.userTicketsDate,
        userInfo:state.FieldUserReportReducers.userInfo
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserTicketDetails:() => dispatch(getUserTicketDetails()),
        renderAllUserDetails:() => dispatch(renderAllUserDetails()), 
        clearFieldUserInput: () => dispatch(clearFieldUserInput()),
        getUserInfoWithDateQuarterly: (data) => dispatch(getUserInfoWithDateQuarterly(data)),
        getUserInfoWithDateHalfYearly:(data) => dispatch(getUserInfoWithDateHalfYearly(data)),
        getUserInfoWithDateYearly:(data) => dispatch(getUserInfoWithDateYearly(data)),
        getPlantsFromUserId:(data) => dispatch(getPlantsFromUserId(data))
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ViewTaskCount));