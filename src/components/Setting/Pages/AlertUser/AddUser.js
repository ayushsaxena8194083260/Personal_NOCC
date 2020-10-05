import React, { Component } from 'react';
// import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import '../../../../styles/plant/plantAddEdit.scss';
import {AgGridReact} from "ag-grid-react"
import 'react-picky/dist/picky.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import '../../../../styles/plant/plantFaultData.scss';
import DropDown from "../../../Common/DropDown";
import { renderAlertUserDetails, renderAllUserDetails, deleteCleaningAlertUser, createUpdateCleaningAlertUser1} from '../../../../actions/action-Settings';
import { Link, withRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

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
        return (<div className="products-actions">
            <Link to="#" onClick={this.invokeDelete} title="Delete" >
            <img src="/images/cross-circle.png" alt="Delete User" />
            </Link>
        </div>);
    }
}
class AddAlertUser extends Component{
    constructor(props) {
        super(props);
        this.state = {
            selectedAlertType: this.props.location.selectedAlertType,
            userManagements:this.props.userManagements!=undefined?this.props.userManagements:[]
        };
    }

    componentDidMount() {
        // document.title = 'Plant Fault Data';
        // this.props.clearPlantFaultData();
        this.props.renderAllUserDetails();
    }
    componentDidUpdate() {
        //this.props.getProjectNames(this.state.selectedValue);
    }

    handleChangePlantType(event) {
        const selectedValue = event.target.value;
        if(selectedValue !== this.state.selectedPlantType){
        this.props.getProjectNames(selectedValue);
        
        this.setState({ selectedPlantType: selectedValue,selectedProjectTypes:null,selectedPlantOptions:[]  });
        }
        //console.log(selectedValue)
    }

    handleChangePlantFault(event) {
        const plantId = event.target.value;
        this.setState({ plantId });
        //console.log(plantId)
    }

    getRenderPlantFault() {
        let plantIds = [];
        this.state.selectedPlantOptions && this.state.selectedPlantOptions.length > 0 && this.state.selectedPlantOptions.map((item) => { plantIds.push(item.id) });
        plantIds.length > 0 && this.props.getPlantFaultDataByPlantId({ plantIds: plantIds, year: this.state.selectedYear });
    }

    handleChangeProjectTypes(event) {
        const selectedValue = event.target.value;
        this.props.getPlantByProjectId(selectedValue);
        this.setState({ selectedProjectTypes: selectedValue });
    }

    handleChangeYear(event) {
        const selectedYear = event.target.value;
        this.setState({ selectedYear });
    }

    selectOption(value) {
        console.log("Vals", value);
        this.setState({ value });
    }

    selectMultipleOption(value) {
        this.setState({ selectedPlantOptions: value });
    }

    handleChangeAlertType(event) {
        const selectedValue = event.target.value;
        if (selectedValue !== this.state.selectedAlertType) {
            // this.props.getPlantByType(selectedValue);
            this.setState({ selectedAlertType: selectedValue});
        }
    }

    handleChangeUser(event){
        const selectedValue = event.target.value;
        if(selectedValue !== this.state.selectedUser){
            this.setState({ selectedUser : selectedValue});
        }
    }

    onDelete(_id) {
        let isConfirm = window.confirm("Are you sure want to delete this Plant Fault?");
        if (isConfirm)
            this.props.deleteCleaningAlertUser(_id);
    }

    createColumnDefs() {
        return [
            {
                headerName: "Sr No", ockPosition: true, valueGetter: rowIndex, cellClass: 'cell-wrap',
                autoHeight: true, width: 200, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Alert Name", field: "alertName", cellClass: 'cell-wrap',
                autoHeight: true, width: 390, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "User Name", field: "name", cellClass: 'cell-wrap',
                autoHeight: true, width: 190, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Action",
                field: '',
                cellRendererFramework: ActionCellRenderer,
                width: 200,
            }
        ];
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== null) {            
            this.setState({
                userManagements: nextProps.userManagements
            })
        }
    }

    getPlantTypesDropDownOptions() {
        const options = this.state.plantTypes && this.state.plantTypes.map((plantTypes, key) => { return { id: plantTypes.plant_id, name: plantTypes.plant_name } });
        return options;
    }

    getDropDownProjectTypes() {
        let projectName = [];
        projectName.push({ displayText: "Select Project", value: "0" })
        this.state.projectTypes && this.state.projectTypes.map((item) => {
            projectName.push({ displayText: item.project_name, value: item.project_id })
        });

        return projectName;
    }

    getDropDownYear() {
        return this.props.years && this.props.years.map((item) => { return { displayText: item, value: item } });
    }

    onSubmit = (e) => {
        e.preventDefault();
        const data = {
            alertId : this.state.selectedAlertType,
            alertUserId : 0,
            isPublished : 1,
            userId : this.state.selectedUser
        }
        this.props.createUpdateCleaningAlertUser1(data);
        this.props.history.push('/setting/AlertUser');
    }

    render() {

        // const classes = makeStyles(theme => ({
        //     root: {
        //         width: '100%',
        //         marginTop: theme.spacing(3),
        //         overflowX: 'auto',
        //     },
        //     table: {
        //         minWidth: 650,
        //     },
        // }));
        
        return(
            <div>
                 <Card className="add-plant-card" style={{width:"50%"}}>
                  <Card.Header as="h5">Alert User Setting</Card.Header>
                  <Card.Body>
                    <Row>
                        <Col>
                            <Form.Label>Alert<span className="form-required">*</span></Form.Label>
                        </Col>
                        <Col>
                        {/* <Form.Control name="alertType" as="select">
                            <option>{this.props.alertType}</option>
                            {this.props.alertType!=undefined?
                            this.props.alertType.map((alert,key) => 
                            <option key={alert.value}>{alert.displayText}</option>
                            ):<option>default</option>
                        }
                            </Form.Control> */}
                        <DropDown
                                className="top-search-input form-control"
                                Name="AlertType"
                                itemSource={this.props.alertType}
                                value={this.state.selectedAlertType}
                                handleChange={(item) => this.handleChangeAlertType(item)}
                            />    
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label>User<span className="form-required">*</span></Form.Label>
                        </Col>
                        <Col>
                        <select class="form-control" name="alertUser" type="dropdown" onChange={(item) => this.handleChangeUser(item)}>
                            <option>Select User</option>
                                        {this.state.userManagements && this.state.userManagements.map((item, key) => {
                                            return <option value={item.userId}>{item.name}</option>
                                        }
                                        )}
                                    </select>  
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        </Col>
                        <Col md={3}>
                        <Button type="submit" variant="primary" size="lg" onClick={this.onSubmit} block>Submit</Button>
                        </Col>
                        {/* <Col md={3}>
                        <Link to="/">
                        <Button variant="primary" size="md" block>Back</Button>
                        </Link>
                        </Col> */}
                        <Col>                      
                        </Col>
                    </Row>
                </Card.Body>
            </Card> 
                <div
                    style={{
                        height: '500px',
                    }}
                    className="ag-theme-material">
                        <AgGridReact
                            columnDefs={this.createColumnDefs()}
                            rowData={this.props.alertUser}
                            context={{ componentParent: this }}
                            onGridReady={this.onGridReady}>
                        </AgGridReact>
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
        userManagements: state.SettingsReducer.userManagements

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        renderAlertUserDetails: (id) => dispatch(renderAlertUserDetails(id)),
        renderAllUserDetails:() => dispatch(renderAllUserDetails()),
        deleteCleaningAlertUser:(alertUserId) => dispatch(deleteCleaningAlertUser(alertUserId)),
        createUpdateCleaningAlertUser1: (data) => dispatch(createUpdateCleaningAlertUser1(data))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddAlertUser));
