import React, { Component } from 'react'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Route } from 'react-router-dom'
import {AgGridReact} from "ag-grid-react"
import Picky from 'react-picky';
import 'react-picky/dist/picky.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import '../../styles/plant/plantFaultData.scss';
import DropDown from "../Common/DropDown";
import { getProjectNames } from "../../actions/PlantFaultDataActions";
import { getPlantByProjectId } from "../../actions/PlantFaultDataActions";
import { getAMRMeter } from "../../actions/plantGenerationActions";
import { deletePlantFaultData } from "../../actions/PlantFaultDataActions";
import {clearPlantFaultData} from "../../actions/PlantFaultDataActions";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const rowIndex = (params) => params.node.rowIndex + 1;

class AMRMeter extends Component {

    constructor(props) {
            super(props);
            this.state = {
                selectedFromDate: this.getMonthStartDate(),
                selectedToDate:   this.getCurrentDate(),
                gridOptions: this.createGridOptions(),
                selectedPlantType: null,
                selectedProjectTypes: null,
                selectedYear: null,
                projectTypes: this.props.projectTypes,
                plantTypes: this.props.plantTypes,
                amrMeterGen: this.props.amrMeterGen,
                selectedPlantOptions: [],
                showPopUp: false,
                deleteID: null,
                plantId: '',
                plants: [],
                selectedPlant: "",
                fromDate: '',
                toDate: '',
                value: null,
                context: { componentParent: this },
                suppressHorizontalScroll: true,
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
        componentDidMount() {
            // document.title = 'Plant Fault Data';
            // this.props.clearPlantFaultData();
        }
    
        componentDidUpdate() {
            //this.props.getProjectNames(this.state.selectedValue);
        }
    
        handleChangeFromDate(event) {
            let fromDate = event.target.value;
            this.setState({ selectedFromDate: fromDate });
        }
    
        handleChangeToDate(event) {
            let toDate = event.target.value;
            this.setState({ selectedToDate: toDate });
        }
    
    
        handleChangePlantType(event) {
            const selectedValue = event.target.value;
            if (selectedValue !== this.state.selectedPlantType) {
                this.props.getProjectNames(selectedValue);
                this.setState({ selectedPlantType: selectedValue, selectedProjectTypes: null, selectedPlantOptions: [] });
            }
        }
        getAMRReport() {
            let plantIds = [];
            this.state.selectedPlantOptions && this.state.selectedPlantOptions.length > 0 && this.state.selectedPlantOptions.map((item) => { plantIds.push(item.id) });
            plantIds.length > 0 && this.props.getAMRMeter({ plantIds: plantIds, fromDate: this.state.selectedFromDate, toDate: this.state.selectedToDate, dataFlag: 1 });
        }
    
        onGridReady = (params) => {
            params.api.setHeaderHeight(70);
        }
        handleChangeProjectTypes(event) {
            const selectedValue = event.target.value;
            this.props.getPlantByProjectId(selectedValue);
            this.setState({ selectedProjectTypes: selectedValue });
        }
    
        getDropDownProjectTypes() {
            let projectName = [];
            projectName.push({ displayText: "Select Project", value: "0" })
            this.state.projectTypes && this.state.projectTypes.map((item) => {
                projectName.push({ displayText: item.projectName, value: item.projectId })
            });
    
            return projectName;
        }
    
        getPlantTypesDropDownOptions() {
            const options = this.state.plantTypes && this.state.plantTypes.map((plantTypes, key) => { return { id: plantTypes.plantId, name: plantTypes.plantName } });
            return options;
        }
    
        selectMultipleOption(value) {
            if (value) {
                this.setState({ selectedPlantOptions: value });
            }
        }
    
        onDelete(_id) {
            this.setState({ showPopUp: true, deleteID: _id });
    
        }
    
        onHide() {
            this.setState({ showPopUp: false, deleteID: null });
        }
    
        deleteRecord() {
            if (this.state.deleteID !== null) {
                this.props.deletePlantFaultData(this.state.deleteID);
                this.onHide();
            }
        }
    
        componentWillReceiveProps(nextProps) {
            if (nextProps !== null) {
                this.setState({
                    projectTypes: nextProps.projectTypes,
                    plantTypes: nextProps.plantTypes,
                    amrMeterGen: nextProps.amrMeterGen
                })
            }
        }
    
        handleChange(event) {
            const stateDup = this.state;
            stateDup[event.target.name] = event.target.value;
            this.setState({ stateDup });
    
        }
    
        submitGo() {
            const stateDup = this.state;
            let plantslist = this.props.plantTiltsByPlantID;
            stateDup.plants = plantslist.filter(plant => plant.start_period > stateDup.fromDate && plant.end_period < stateDup.toDate);
            this.setState({ stateDup });
        }
    
        createGridOptions(){
            return{
                columnDefs:[
                    {
                        headerName: "Sr No", ockPosition: true, valueGetter: rowIndex, width:80,cellClass: 'cell-wrap',
                        autoHeight: true,cellStyle: { 'white-space': 'normal' }
                    },
                    {
                        headerName: "Plant", field: "plantName", cellClass: 'cell-wrap',
                        autoHeight: true, width: 90, cellStyle: { 'white-space': 'normal' }
                    },
                    {
                        headerName: "Serial No", field: "meterNumber", cellClass: 'cell-wrap',
                        autoHeight: true, width: 80, cellStyle: { 'white-space': 'normal' }
                    },

                    {
                        headerName: "Date", field: "amrDate", cellClass: 'cell-wrap',
                        autoHeight: true, width: 80, cellStyle: { 'white-space': 'normal' }
                    },
                    {
                        headerName: "Connected Capacity", field: "plantCapacityDc", cellClass: 'cell-wrap',
                        autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
                    },
                    {
                        headerName: "Export Reading", field: "expt", cellClass: 'cell-wrap',
                        autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
                    },
                    {
                        headerName: "Import Reading", field: "impt", cellClass: 'cell-wrap',
                        autoHeight: true, width: 90, cellStyle: { 'white-space': 'normal' }
                    },
                    {
                        headerName: "Multiplying Factor", field: "multiplyingFactor", cellClass: 'cell-wrap',
                        autoHeight: true, width: 120, cellStyle: { 'white-space': 'normal' }
                    },                    
                    {
                        headerName: "Total Export(KWH)", field: "exportReading", cellClass: 'cell-wrap',
                        autoHeight: true, width: 120, cellStyle: { 'white-space': 'normal' }
                    },
                    {
                        headerName: "Total Import(KWH)", field: "importReading", cellClass: 'cell-wrap',
                        autoHeight: true, width: 120, cellStyle: { 'white-space': 'normal' }
                    },
                    {
                        headerName: "Net Generation", field: "netGeneration", cellClass: 'cell-wrap',
                        autoHeight: true, width: 120, cellStyle: { 'white-space': 'normal' }
                    },
                    {
                        headerName: "Revenue(Mn INR)", field: "revenue", cellClass: 'cell-wrap',
                        autoHeight: true, width: 120, cellStyle: { 'white-space': 'normal' }
                    },
                ],
                suppressHorizontalScroll:false
            };
        }
            
    
    render() {
        let placeholder="Search";
        return (
            <div>
                <div className="main-content">
                    <div class="subHead">
                        <h5 style={{ fontSize: "16px", marginBottom: "0" }}>
                            AMR Report
                        </h5>
                    </div>
                    <div className="top-filters-lender">
                        <div className="row" style={{ alignItems: "center", margin: "0" }} >
                            <Col style={{ padding: "5px" }}>
                                <Form.Label>Type:</Form.Label>
                                <DropDown
                                    className="top-search-input form-control"
                                    Name="plantType"
                                    itemSource={this.props.plantType}
                                    value={this.state.selectedPlantType}
                                    handleChange={(item) => this.handleChangePlantType(item)}
                                />
                            </Col>
                            <Col style={{ padding: "5px" }}>
                                <Form.Label>Project:</Form.Label>
                                <DropDown
                                    className="top-search-input form-control"
                                    Name="plantName"
                                    itemSource={this.getDropDownProjectTypes()}
                                    value={this.state.selectedProjectTypes}
                                    handleChange={(item) => this.handleChangeProjectTypes(item)}
                                />
                            </Col>
                            <Col style={{ padding: "5px" }}>
                                <Form.Label>Plant:</Form.Label>
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
                                    filterPlaceholder={placeholder}
                                />                        
                            </Col>
                            <Col style={{ padding: "5px",maxWidth:"14%" }}>
                            <Form.Label>From:</Form.Label>
                            <Form.Control name="fromDate" type="date" onChange={(item) => this.handleChangeFromDate(item)} value={this.state.selectedFromDate} />
                        </Col>
                        <Col style={{ padding: "5px",maxWidth:"14%" }}>
                            <Form.Label>To:</Form.Label>
                            <Form.Control name="toDate" type="date" onChange={(item) => this.handleChangeToDate(item)} value={this.state.selectedToDate} />
                        </Col>
    
                            <Col xs={2} style={{ maxWidth: "9%", padding: "5px" }}>
                                <Route render={({ history }) => (
                                    <button type="button" className="btn btn-primary" style={{ width: "100%" }} onClick={() => { this.getAMRReport()}}>
                                        View
                                    </button>)} />
                            </Col>
                            <Col xs={2} style={{ maxWidth: "9%", padding: "5px" }}>
                                <Route render={({ history }) => (
                                    <button type="button" className="btn btn-primary" style={{ width: "100%" }} onClick={() => { history.push('/addEditTilt') }}>
                                        Download
                                    </button>)} />
                            </Col>
                            <Col xs={2} style={{ maxWidth: "9%", padding: "5px"  }}>
                                 <Route render={({ history }) => (
                                    <button type="button" className="btn btn-primary" style={{ width: "100%" }}>
                                        Upload
                            </button>)} />
                            </Col>
                        </div>
                    </div>
                    <div
                        style={{
                            height: '500px',
                        }}
                        className="ag-theme-material">
                        <AgGridReact
                            gridOptions={this.state.gridOptions}
                            rowData={this.state.amrMeterGen}
                            context={this.state.context}
                            onGridReady={this.onGridReady}
                        >
                        </AgGridReact>
                    </div>
                </div>
            </div>
                );
            }
        }
        
    const mapStateToProps = state => {
        return {
                projectTypes: state.projectTypes.projectTypes,
                plantTypes: state.projectTypes.plantTypes,
                amrMeterGen: state.plantDailyGenerationReducer.amrMeterGen,
                displayMessage: state.projectTypes.displayMessage,
                plantType: [{ displayText: "Select Plant Type", value: "-1" }, { displayText: "GROUNDMOUNT", value: "GROUNDMOUNT" }, { displayText: "ROOFTOP", value: "ROOFTOP" }]
        }
    }
    
    const mapDispatchToProps = (dispatch) => {
        return {
            getProjectNames: (projectTypes) => dispatch(getProjectNames(projectTypes)),
            getPlantByProjectId: (projectId) => dispatch(getPlantByProjectId(projectId)),
            getAMRMeter: (plantId) => dispatch(getAMRMeter(plantId)),
            deletePlantFaultData: (fault_id) => dispatch(deletePlantFaultData(fault_id)),
            clearPlantFaultData: () => dispatch(clearPlantFaultData()),
        }
    }
    
    export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AMRMeter));