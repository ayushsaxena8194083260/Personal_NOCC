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
import { clearFieldUserInput, getUserTicketDetails } from "../../../actions/action-FieldUserReport";

class ActionCellRenderer extends React.Component {
    constructor(props) {
        super(props);
        this.invokeDelete = this.invokeDelete.bind(this);
    }

    invokeDelete() {
        this.props.context.componentParent.onDelete(this.props.node.data._id);
    }
    render() {
        return (<div className="products-actions-input">
            <Link to={{
                    pathname: "/fieldUserReport/ViewTaskCount/",
                    data: this.props.data
                }} className="btn btn-orange" style={{ width: "150px" }}>
                    PM Task Status
            </Link> 
        </div>);
    }
}

class UserPerformance extends Component{
    constructor(props) {
        super(props);
        this.state = {
            selectedYear: null,
            selectedUser: null,
            userPerformance: [{
                "name":"Achanta Sagar",
                "avgTctClsrTme":"NA"
            },{
                "name":"Aditya",
                "avgTctClsrTme":"NA"
            },{
                "name":"Akanksha Verma",
                "avgTctClsrTme":"NA"
            }]
        };
    }

    componentDidMount() {
        // document.title = 'Plant Fault Data';
        // this.props.clearFieldUserInput();
        // this.props.renderAllUserDetails();
        this.props.getUserTicketDetails();

    }
    componentDidUpdate() {
        // this.props.renderAllUserDetails();
        
        //this.props.getProjectNames(this.state.selectedValue);
    }

    handleChangeYear(event) {
        const selectedYear = event.target.value;
        this.setState({ selectedYear });
    }

    selectOption(value) {
        console.log("Vals", value);
        this.setState({ value });
    }

    createColumnDefs() {
        return [
            {
                headerName: "Name", field: "name", cellClass: 'cell-wrap',
                autoHeight: true, width: 400, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Average Ticket Closure Time", field: "avgTctClsrTme", cellClass: 'cell-wrap',
                autoHeight: true, width: 400, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Action",
                field: '',
                cellRendererFramework: ActionCellRenderer,
                width: 350,
            }
        ];
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== null) {            
            this.setState({
                users: nextProps.users,
                userPerformance: nextProps.userPerformance
            })
        }
    }


    getDropDownYear() {
        return this.props.years && this.props.years.map((item) => { return { displayText: item, value: item } });
    }

    getRenderUserPerformance() {
        this.props.getModuleCleaningAnalysisDataByDate({ plant_id: this.state.selectedPlantOptions, fromDate: this.state.selectedFromDate, toDate: this.state.selectedToDate });
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
            <>
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
                        <Col xs={1} style={{ maxWidth: "200%" }}>
                                    <Form.Label>User<span className="form-required">*</span></Form.Label>
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
                            <button type="button" className="btn btn-orange" onClick={() => this.getRenderUserPerformance()}>
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
                        rowData={this.props.userTicketsDate}
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
    // {
        if (strYear) {
            let year = parseInt(strYear);
            const endYear = parseInt(strYear) + 1;
            let i;
            years.push("Select Year");
            for (i = parseInt(year); i < endYear; i++) {
                let addoneYear = parseInt(i) + 1;
                years.push(i + "-" + addoneYear);
            }

        }
    // }
    return years;
}


const mapStateToProps = (state, props) => {
    let users = [{ name: "SELECT USERS", userId: "-1" }];
    state.FieldUserReportReducers.userTicketsDate && state.FieldUserReportReducers.userTicketsDate.length > 0 && state.FieldUserReportReducers.userTicketsDate.map((item) => users.push(item));
    return {
        users: users,
        years: getYearFromToday(),
        userPerformance: state.FieldUserReportReducers.userPerformance,
        userTicketsDate: state.FieldUserReportReducers.userTicketsDate
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserTicketDetails:() => dispatch(getUserTicketDetails()),
        renderAllUserDetails:() => dispatch(renderAllUserDetails()), 
        clearFieldUserInput: () => dispatch(clearFieldUserInput()),
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserPerformance));