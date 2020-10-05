
import React, { Component } from "react";
import { Link, withRouter, Route } from 'react-router-dom';
import { renderAlertUserDetails, clearSettingPlantMapping , deleteCleaningAlertUser} from '../../../../actions/action-Settings';
import { connect } from 'react-redux';
import {AgGridReact} from "ag-grid-react"
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import DropDown from "../../../Common/DropDown";
import ModelPopUp from '../../../Common/ModelPopUp';
import Alert from 'react-bootstrap/Alert';

const rowIndex = (params) => params.node.rowIndex + 1;

class ActionCellRenderer extends React.Component {
    constructor(props) {
        super(props);
        this.invokeDelete = this.invokeDelete.bind(this);
    }

    invokeDelete() {
        this.props.context.componentParent.onDelete(this.props.node.data.alertUserId);
    }
    render() {
        const isActive = this.props.data &&this.props.data.isActive === "true"? true : false; 
        return (<div className="products-actions">           
            
            <Link className="products-actions-link"
                to="#" onClick = {()=> this.invokeDelete()} title = "Delete">
                <img src="/images/cross-circle.png" alt="Delete User" />
            </Link>
            
        </div>);
    }
}

class AlertUserComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            alertUser: this.props.alertUser,
            selectedAlertType: null,
            deleteModalShow: false,
            deleteID:0
        }
    }
    componentDidMount() {
        this.props.clearSettingPlantMapping();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ alertUser: nextProps.alertUser,
            displayMessage: nextProps.displayMessage });
    }

    createColumnDefs() {
        return [
            {
                headerName: "Sr No", ockPosition: true, valueGetter: rowIndex, width:80,cellClass: 'cell-wrap',
                autoHeight: true, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "User", field: "name", cellClass: 'cell-wrap',
                autoHeight: true, width: 800, cellStyle: { 'white-space': 'normal' }
            },
            
            {
                headerName: "Action",
                field: '',
                cellRendererFramework: ActionCellRenderer,
                width: 200,
            }
        ];
    }

    handleChangeAlertType(event) {
        const selectedValue = event.target.value;
        if (selectedValue !== this.state.selectedAlertType) {
            // this.props.getPlantByType(selectedValue);
            this.setState({ selectedAlertType: selectedValue});
        }
    }

    getRenderAlertUser(){
        this.props.renderAlertUserDetails(this.state.selectedAlertType);
    }

    onDelete(_id) {
        this.setState({ deleteModalShow: true, deleteID: _id });

    }

    onHide() {
        this.setState({ deleteModalShow: false, deleteID: null });
    }

    deleteRecord() {
        if (this.state.deleteID !== null) {
            this.props.deleteCleaningAlertUser(this.state.deleteID);
            this.onHide();
        }
    }

    ModalClose(){
        this.setState({ deleteModalShow: false});
    }

    render() {
        return (
            <div>
                <div className="top-filter">
                    <div className="row" style={{ alignItems: "center", margin: "0" }} >
                    <Col xs={1} style={{ maxWidth: "5%" }}>
                            <Form.Label>Alert:</Form.Label>
                        </Col>
                        <Col style={{ maxWidth: "30%",padding:"0" }}>
                            <DropDown
                                className="top-search-input form-control"
                                Name="AlertType"
                                itemSource={this.props.alertType}
                                value={this.state.selectedAlertType}
                                handleChange={(item) => this.handleChangeAlertType(item)}
                            />
                        </Col>
                        <Col xs={2} style={{ maxWidth: "7%" }}>
                            <button type="button" className="btn btn-orange" onClick={() => this.getRenderAlertUser()}>
                                Go
                        </button>
                        </Col>
                        <Col xs={2} style={{ maxWidth: "20%" }}>
                        <Link
                            to={{
                                pathname: "/setting/addUser",
                                alertUser: this.state.alertUser,
                                alertType: this.props.alertType,
                                selectedAlertType: this.state.selectedAlertType
                            }}>
                        <button type="button" className="btn btn-primary" style={{ width: "100%" }} >
                                    <img src="/images/icons/fugue/plus-circle.png" alt="add user" title="Add User" style={{ float: "left", marginRight: "3" }} />
                                    Add User
                        </button>
                        </Link>
                           
                        </Col>
                        <div>
                {this.props.displayMessage ? <Alert className="message success" variant="success" style={{ marginTop: "15px" }}>{this.props.displayMessage}</Alert> : null}
            </div>

                        </div>
                        </div>
 
            <div
                style={{
                    height: '500px',
                    maxWidth: "1222px",
                    margin: "auto"
                }}
                className="ag-theme-material">
                <AgGridReact
                    key="grid"
                    columnDefs={this.createColumnDefs()}
                    rowData={this.state.alertUser}
                    context={{ componentParent: this }}
                    onGridReady={this.onGridReady}>                   

                </AgGridReact>
                <div>
                        <ModelPopUp title="Delete"
                            id={"alertUserDelete"}
                            bodyContent="Are you sure want to delete this Alert User?"
                            showPopUp={this.state.deleteModalShow}
                            secondaryBtnName="No"
                            onSecondaryAction={this.onHide.bind(this)}
                            primaryBtnName="Delete"
                            onPrimaryAction={this.deleteRecord.bind(this)}
                        />
                        </div>
                </div>
                </div>                
        )
    }
}
const mapStateToProps = state => {
    return {
        alertType: [{displayText: "Alert Type" , value: "-1"}, {displayText: "Daily Generation Report" , value: "1"},{displayText: "Daily Swipein & Swipeout Report" , value: "21"},
        {displayText: "MTD Comparision Between Actual & Forecast Generation" , value: "19"},
        {displayText: "Rajasthan Raw Data Report" , value: "11"},
        {displayText: "Tilt Change Due" , value: "5"},
        {displayText: "YTD Comparision Between Actual & Forecast Generation" , value: "17"}],
        alertUser: state.SettingsReducer.alertUser,
        displayMessage: state.SettingsReducer.displayMessage,

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        renderAlertUserDetails: (id) => dispatch(renderAlertUserDetails(id)), 
        clearSettingPlantMapping: () => dispatch(clearSettingPlantMapping()),
        deleteCleaningAlertUser: (id) => dispatch(deleteCleaningAlertUser(id))
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AlertUserComponent));



