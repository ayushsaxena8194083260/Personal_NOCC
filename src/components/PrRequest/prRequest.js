import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import Nav from 'react-bootstrap/Nav';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ModelPopUp from '../Common/ModelPopUp';

import DropDown from "../Common/DropDown";
import AddPrRequestModal from "./addPrRequest";
import ActualGenerateModal from '../plant/actualGenerateModal'
import Picky from 'react-picky';
import {AgGridReact} from "ag-grid-react";
import 'react-picky/dist/picky.css';
import Row from 'react-bootstrap/Row';
import axios from 'axios';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import '../../styles/plant/plantFaultData.scss';
import {
    Route,
    Link,
    Switch,
    Redirect,
    withRouter,
    NavLink
  } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import '../../App.scss';
import actualGenerateModal from '../plant/actualGenerateModal';
import { connect } from 'react-redux';
import { getAllPlants, getPlantByProjectId, getProjectNames } from '../../actions';
import { getAllPrRequest, getPrRequestId } from '../../actions/action-PrRequst';
const userDetails = JSON.parse(localStorage.getItem('isAuthenticated'));

// import { NavLink } from 'react-bootstrap';
class ActionCellRenderer extends React.Component {
    constructor(props) {
        super(props);
        // this.invokeDelete = this.invokeDelete.bind(this);
        this.invokeActualGeneration = this.invokeActualGeneration.bind(this);
        this.invokeApprov = this.invokeApprov.bind(this);

    }
	invokeActualGeneration(){
        const lgshow = true;
		this.props.context.componentParent.faultGeneration(lgshow,this.props.node.data);
    }
    invokeApprov() {
        this.props.context.componentParent.onApprov(this.props.node.data);
    }
    render() {
        return (<div className="products-actions">
            <Link className="products-actions-link"
                to={{
                    // pathname: "#",
                    prRequest: this.props.data
                }}  onClick={()=>this.invokeActualGeneration()} >
                <img src="/images/view_icon.png" style={{height:"16px",width:"16px"}} alt="Edit" />
            </Link>
            {this.props.node.data.showApproveButton ?  <Link to="#" onClick={this.invokeApprov} title="Delete" >
                {this.props.node.data.approveUser != 0 ?
                <img src="/images/tick_button.png" alt="Delete" /> :
                <img src="/images/approve_icon.png" alt="Delete" />
                }
            </Link> 
            : ''}
             {/* <Link to="#" onClick={this.invokeApprov} title="Delete" >
                <img src="/images/approve_icon.png" alt="Delete" />
            </Link>  */}
        </div>);
    }
}
class PrRequestComponent extends Component{
    constructor(props) {
        super(props);

        this.state = {
            selectedPlantType: null,
            selectedProjectTypes: null,
            selectedYear: null,
            lgShow:false,
            prData:null,
            showPopUp: false,
            approvID: null,
            projectTypes: this.props.projectTypes,
            plantTypes: this.props.plantTypes,
            plantJMR: this.props.plantJMR,
            selectedFromDate: this.getMonthStartDate(),
            selectedToDate:   this.getCurrentDate(),
            selectedPlantOptions: [],
            overlayLoadingTemplate: '<span class="ag-overlay-loading-center"><div class="loader"></div><div style="text-align:center">Loading!</div></span>',
		    overlayNoRowsTemplate: "<span style=\"padding: 10px; border: 2px solid #444; background: lightgoldenrodyellow;\">This is a custom 'no rows' overlay</span>"
            // prRequestData:this.props.prRequestData
        };
        this.selectMultipleOption = this.selectMultipleOption.bind(this);
    }
    getCurrentDate(){
        var today= new Date();
        var d = today.getDate();
        var m = today.getMonth()+1;
        var y = today.getFullYear();
        var data;

        if(d < 10){
            d = "0"+d;
        };
        if(m < 10){
            m = "0"+m;
        };

        data = y+"-"+m+"-"+d;
        return data;
    }
    getMonthStartDate(){
        var today= new Date();
        var d = 1;
        var m = today.getMonth()+1;
        var y = today.getFullYear();
        var data;

        if(d < 10){
            d = "0"+d;
        };
        if(m < 10){
            m = "0"+m;
        };

        data = y+"-"+m+"-"+d;
        return data;
    }

    handleChangeFromDate(event) {
        let fromDate = event.target.value;
        this.setState({ selectedFromDate: fromDate });
    }

    handleChangeToDate(event) {
        let toDate = event.target.value;
        this.setState({ selectedToDate: toDate });
    }

    componentDidMount() {
        // document.title = 'Plant Fault Data';
        // this.props.clearPlantFaultData();
        this.props.getAllPrRequest();
    }
    approveRequest(){
        // let data = {
        //     "approve": 0,
        //     "approveTime": new Date(),
        //     "approveUser": 0,
        //     "comment": "string",
        //     "createdDate":,
        //     "date": "string",
        //     "materialServiceDesc": "string",
        //     "plantId": 0,
        //     "plantRequestId": "string",
        //     "prRequestId": 0,
        //     "quantity": 0,
        //     "reason": "string",
        //     "reject": 0,
        //     "specification": "string",
        //     "status": 0,
        //     "unitMeasureCode": "string",
        //     "userId": 0
        // }
        axios.post('http://noccwebstaging-env.eba-sutf6wep.us-east-1.elasticbeanstalk.com/prrequest/addeditprrequest', {
            approve: 1,
            approvedUser: userDetails.userId
                  })
          .then(function (response) {
            console.log(response);
          })
    }
    componentDidUpdate() {
        //this.props.getProjectNames(this.state.selectedValue);
    }


    getDropDownPlants() {
        let plants = [];
        plants.push({ displayText: "Select Plant", value: "0" })
        this.state.plantTypes && this.state.plantTypes.map((item) => {
            plants.push({ displayText: item.plantName, value: item.plantId })
        });

        return plants;
    }
    handleChangePlantFault(event) {
        const plantId = event.target.value;
        this.setState({ plantId });
        //console.log(plantId)
    }
    handleChangePlantType(event) {
        const selectedValue = event.target.value;
        if (selectedValue !== this.state.selectedPlantType) {
            this.props.getProjectNames(selectedValue);
            this.setState({ selectedPlantType: selectedValue, selectedProjectTypes: null, selectedPlantOptions: [] });
        }
    }
    getPlantTypesDropDownOptions() {
        const options = this.state.plantTypes && this.state.plantTypes.map((plantTypes, key) => { return { id: plantTypes.plantId, name: plantTypes.plantName } });
        return options;
    }

    getDropDownProjectTypes() {
        let projectName = [];
        projectName.push({ displayText: "Select Project", value: "0" })
        this.state.projectTypes && this.state.projectTypes.map((item) => {
            projectName.push({ displayText: item.projectName, value: item.projectId })
        });

        return projectName;
    }
    selectMultipleOption(value) {
        if (value) {
            this.setState({ selectedPlantOptions: value });
        }
    }

    getRenderPlantJMR() {
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
        // console.log("Vals", value);
        this.setState({ value });
    }

    onApprov(data) {
        this.setState({ showPopUp: true, approvID: data });
        this.getRenderPlantFault()
    }
    onHide() {
        this.setState({ showPopUp: false, approvID: null });
        this.getRenderPlantFault() 
    }

    approveRecord() {
        // if (this.state.deleteID !== null) {
        //     this.props.deleteWeatherStationDailyData(this.state.deleteID);
        //     this.onHide();
        // }
        // let data = {
            
        //         approve: 1,
        //         approveTime: this.state.approvID.approveTime,
        //         approveUser: userDetails.userId,
        //         comment: this.state.approvID.comment,
        //         createdDate:this.state.approvID.createdDate,
        //         date: this.state.approvID.date,
        //         materialServiceDesc: this.state.approvID.materialServiceDesc,
        //         plantId:  this.state.approvID.plantId,
        //         plantRequestId: this.state.approvID.plantRequestId,
        //         prRequestId: this.state.approvID.prRequestId,
        //         quantity:this.state.approvID.quantity,
        //         reason: this.state.approvID.reason,
        //         reject: this.state.approvID.reject,
        //         specification:this.state.approvID.specification,
        //         status: this.state.approvID.status,
        //         unitMeasureCode: this.state.approvID.unitMeasureCode,
        //         userId: this.state.approvID.userId
              
        // }
        // console.log(this.state.approvID,'approveID')
        axios.post('http://noccwebstaging-env.eba-sutf6wep.us-east-1.elasticbeanstalk.com/prrequest/addeditprrequest', {
            approve: 1,
            approveTime: this.state.approvID.approveTime,
            approveUser: userDetails.userId,
            comment: this.state.approvID.comment,
            createdDate:this.state.approvID.createdDate,
            date: this.state.approvID.date,
            materialServiceDesc: this.state.approvID.materialServiceDesc,
            plantId:  this.state.approvID.plantId,
            plantRequestId: this.state.approvID.plantRequestId,
            prRequestId: this.state.approvID.prRequestId,
            quantity:this.state.approvID.quantity,
            reason: this.state.approvID.reason,
            reject: this.state.approvID.reject,
            specification:this.state.approvID.specification,
            status: this.state.approvID.status,
            unitMeasureCode: this.state.approvID.unitMeasureCode,
            userId: this.state.approvID.userId})
          .then(function (response) {
            console.log(response);
          })
          this.onHide();
         this.getRenderPlantFault()
    }

	faultGeneration(lgShowValue,data){
		this.setState({
            ...this.state,
            prData:data,
            lgShow:lgShowValue,
            
		})
	}
    createColumnDefs() {
        return [
            {
                headerName: "Request ID", field: "plantRequestId", cellClass: 'cell-wrap',
                autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Date", field: "date", cellClass: 'cell-wrap',
                autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' },sort:'decs',sortable:false
            },
            {
                headerName:"Material/Service Description", field: "materialServiceDesc", cellClass: 'cell-wrap',
                autoHeight: true, width: 125, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Specification", field: "specification", cellClass: 'cell-wrap',
                autoHeight: true, width: 120, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Quantity", field: "quantity", cellClass: 'cell-wrap',
                autoHeight: true, width: 120, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Specific Reason Of Requirement", field: "reason", cellClass: 'cell-wrap',
                autoHeight: true, width: 180, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Comment by Scm", field: "comment", cellClass: 'cell-wrap',
                autoHeight: true, width: 120, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Approval Date", field: "approveTime", cellClass: 'cell-wrap',
                autoHeight: true, width: 120, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Status", field: "status", cellClass: 'cell-wrap',
                autoHeight: true, width: 120, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Action",
                field: '',
                cellRendererFramework: ActionCellRenderer,
                width: 100,
            } 
        ];
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== null) {            
            this.setState({
                projectTypes: nextProps.projectTypes,
                plantTypes: nextProps.plantTypes,
                plantJMR: nextProps.plantJMR
            })
        }
    }

 
    getDropDownProjectTypes() {
        let projectName = [];
        projectName.push({ displayText: "Select Project", value: "0" })
        this.state.projectTypes && this.state.projectTypes.map((item) => {projectName.push({ displayText: item.projectName, value: item.projectId })
        });

        return projectName;
    }
    getRenderPlantFault() {
        let plantIds = [];
        this.state.selectedPlantOptions && this.state.selectedPlantOptions.length > 0 && this.state.selectedPlantOptions.map((item) => { plantIds.push(item.id) });
        plantIds.length > 0 && this.props.getPrRequestId({ plantIds: plantIds, fromDate: this.state.selectedFromDate, toDate: this.state.selectedToDate, userId: userDetails.userId});
    }
    getDropDownYear() {
        return this.props.years && this.props.years.map((item) => { return { displayText: item, value: item } });
    }
    render(){
        const ModalClose = () => {
            this.setState({lgShow:false});
            this.setState({deleteShow:false,prData:null});
            this.props.getAllPrRequest();
            }
            let placeholder = "Search";
            const { match } = this.props;
        return(
            <BrowserRouter>
                <div className="animated fadeIn">
                <Card style={{maxWidth:"1264px", margin:"auto"}}>
                    <Card.Body>
                        {/* <div className="main-content"> */}
                            <Nav variant='tabs' defaultActiveKey="/">
                                <NavLink className="link-tab" exact to={match.url}>Pr Request</NavLink>
                            </Nav>
                        {/* </div> */}
                    {console.log(this.props.prRequestData)}
                    
                <div className="main-content">
                <div className="top-filter" >
                    <div className="row" style={{ alignItems: "center", margin: "0" }} >
                        
                    <Col lg={1} md={1} sm={6}>
                            <Form.Label>Type:</Form.Label>


                        </Col>
                        <Col lg={2} md={2} sm={6} className="input_group full__width">
                            <DropDown
                                className="top-search-input form-control"
                                Name="plantType"
                                itemSource={this.props.plantType}
                                value={this.state.selectedPlantType}
                                handleChange={(item) => this.handleChangePlantType(item)}
                            />
                        </Col>
                        <Col lg={1} md={1} sm={6}>
                            <Form.Label>Project:</Form.Label>
                        </Col>
                        <Col lg={2} md={2} sm={6} className="input_group full__width">
                            <DropDown
                                className="top-search-input form-control"
                                Name="plantName"
                                itemSource={this.getDropDownProjectTypes()}
                                value={this.state.selectedProjectTypes}
                                handleChange={(item) => this.handleChangeProjectTypes(item)}
                            />
                        </Col>
                        <Col  lg={1} md={1} sm={6}>
                            <Form.Label>Plant:</Form.Label>
                        </Col>
                        <Col lg={2} md={2} sm={6} className="input_group full__width">
                            <Picky 
                                 
                                value={this.state.selectedPlantOptions}
                                options={this.getPlantTypesDropDownOptions()}
                                onChange={(val) => this.selectMultipleOption(val)}
                                open={false}
                                valueKey="id"
                                labelKey="name"
                                multiple={true}
                                includeSelectAll={true}
                                includeFilter={true}
                                dropdownHeight={250}
                                defaultFocusFilter={true}
                                filterPlaceholder={placeholder}
                            />                        </Col>
                        <Col  lg={1} md={1} sm={6} className="small_percent_width">
                            <Form.Label>From:</Form.Label>
                            </Col>
                            <Col  lg={2} md={2} sm={6} className="input_group full__width" >
                            <Form.Control type="date" onChange={(item) => this.handleChangeFromDate(item)} value={this.state.selectedFromDate} />
                        </Col>
                        {/* <Col  lg={1} md={1} sm={6} className="small_percent_width"></Col> */}

                        <Col  lg={1} md={1} sm={6} >
                            <Form.Label>To:</Form.Label>
                            </Col>
                            <Col  lg={2} md={2} sm={6} className="input_group full__width" >
                        <Form.Control type="date"  onChange={(item) => this.handleChangeToDate(item)} value={this.state.selectedToDate}/>

                        </Col>
                     
                        
                        <Col  lg={1} md={1} sm={6} className="small_percent_width">
                            <button type="button" style={{marginTop: "19px"}} className="btn btn-orange view_button" onClick={()=>{this.getRenderPlantFault()}}>
                                Go
                        </button>
                        </Col>
                        <Col  lg={2} md={2} sm={6} className="large_percent_width">
                            <Route render={({ history }) => (
                               
                                <button type="button" className="btn btn-primary view_button" style={{ width: "100%"}} onClick={()=>{this.setState({lgShow:true})}}>
                                    <img src="/images/icons/fugue/plus-circle.png" alt="add plant" title="Add Plant Fault"  />
                                    Upload Generation
                        </button>)} />
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
                        rowData={this.props.prRequestData}
                        context={{ componentParent: this }}
                        overlayLoadingTemplate={this.state.overlayLoadingTemplate}
                        overlayNoRowsTemplate={this.state.overlayNoRowsTemplate}
                        onGridReady={this.onGridReady}>
                    </AgGridReact>
                    {this.state.lgShow && <AddPrRequestModal
                        show={this.state.lgShow}
                        data={this.state.prData}
			            onHide={ModalClose}
                        allPr={this.props.prRequestData}
                    />}
                    <ModelPopUp title="Delete"
                        id={"weatherStationDelete"}
                        bodyContent="Are you sure want to Approv the request"
                        showPopUp={this.state.showPopUp}
                        secondaryBtnName="Reject"
                        onSecondaryAction={this.onHide.bind(this)}
                        primaryBtnName="Approv"
                        onPrimaryAction={this.approveRecord.bind(this)}
                    />
                </div>
                </div>
                </Card.Body>
                </Card>
                </div>
                
            </BrowserRouter>
        );
    }
}
const mapStateToProps = (state, props) => {
    const { match: { params } } = props;
    return {
        projectTypes: state.projectTypes.projectTypes,
        prRequestData: state.PrRequestReducer.AllPrRequest,
        plantTypes: state.projectTypes.plantTypes,
        plantType: [{displayText: "Select Plant Type" , value: "-1"}, {displayText: "GROUNDMOUNT" , value: "GROUNDMOUNT"},{displayText: "ROOFTOP" , value: "ROOFTOP"}]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllPrRequest: () => dispatch(getAllPrRequest()),
        getProjectNames: (projectTypes) => dispatch(getProjectNames(projectTypes)),
        getPlantByProjectId: (projectId) => dispatch(getPlantByProjectId(projectId)),
        getPrRequestId:(plantId) => dispatch(getPrRequestId(plantId)),
        // renderPageDetails: (pageID) => dispatch(renderPageDetails(pageID))
    }
} 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PrRequestComponent));
