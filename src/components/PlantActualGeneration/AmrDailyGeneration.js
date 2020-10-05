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
import { getAMRReportData } from "../../actions/plantGenerationActions";
import { deletePlantFaultData } from "../../actions/PlantFaultDataActions";
import {clearPlantFaultData} from "../../actions/PlantFaultDataActions";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const rowIndex = (params) => params.node.rowIndex + 1;

class AmrDailyGeneration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFromDate: null,
            gridOptions: this.createGridOptions(),
            selectedPlantType: null,
            selectedProjectTypes: null,
            selectedYear: null,
            projectTypes: this.props.projectTypes,
            plantTypes: this.props.plantTypes,
            amrGen: this.props.amrGen,
            selectedPlantOptions: [],
            showPopUp: false,
            deleteID: null,
            plantId: '',
            plants: [],
            selectedPlant: "",
            fromDate: '',
            toDate: '',
            value: null,
            suppressHorizontalScroll: true,            
            lgShow: false,
            deleteShow:false,
            gridRefersh: true,

            context: { componentParent: this },
            overlayLoadingTemplate: '<span class="ag-overlay-loading-center"><div class="loader"></div><div style="text-align:center">Loading!</div></span>',
            overlayNoRowsTemplate: "<span style=\"padding: 10px; border: 2px solid #444; background: lightgoldenrodyellow;\">This is a custom 'no rows' overlay</span>"
                    };
        this.selectMultipleOption = this.selectMultipleOption.bind(this);
      

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
        console.log(this.state.context,'state')
        this.state.selectedPlantOptions && this.state.selectedPlantOptions.length > 0 && this.state.selectedPlantOptions.map((item) => { plantIds.push(item.id) });
        plantIds.length > 0 && this.props.getAMRReportData({ plantIds: plantIds, fromDate: this.state.selectedFromDate, toDate: this.state.selectedToDate, dataFlag: 1 });
    }
    exportToCSV (csvData, fName,e) {
        e.preventDefault();
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';
        const ws = XLSX.utils.json_to_sheet(csvData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, fName + fileExtension);
    }
    onGridReady = (params) => {
        params.api.setHeaderHeight(70);
        this.gridApi = params.api;
		this.gridColumnApi = params.columnApi;
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
        console.log(nextProps,'nextProps')
        if (nextProps !== null) {
            this.setState({
                projectTypes: nextProps.projectTypes,
                plantTypes: nextProps.plantTypes,
                amrGen: nextProps.amrGen
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
                    headerName: "Multiplying Factor", field: "multiplyingFactor", cellClass: 'cell-wrap',
                    autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
                },

                {
                    headerName: "Total Export(KWH)", field: "exportReading", cellClass: 'cell-wrap',
                    autoHeight: true, width: 150, cellStyle: { 'white-space': 'normal' }
                },
                {
                    headerName: "Total Import(KWH)", field: "importReading", cellClass: 'cell-wrap',
                    autoHeight: true, width: 150, cellStyle: { 'white-space': 'normal' }
                },
                {
                    headerName: "Net Generation", field: "netGeneration", cellClass: 'cell-wrap',
                    autoHeight: true, width: 150, cellStyle: { 'white-space': 'normal' }
                },
                {
                    headerName: "PLF(AC)", field: "plfAC", cellClass: 'cell-wrap',
                    autoHeight: true, width: 80, cellStyle: { 'white-space': 'normal' }
                },
                {
                    headerName: "PR", field: "pr", cellClass: 'cell-wrap',
                    autoHeight: true, width: 80, cellStyle: { 'white-space': 'normal' }
                },
                {
                    headerName: "Revenue(Mn INR)", field: "revenue", cellClass: 'cell-wrap',
                    autoHeight: true, width: 150, cellStyle: { 'white-space': 'normal' }
                },
            ],
            suppressHorizontalScroll:false
        };
    }

//                     </div>
//                 </div>
//                 </div>
//                 <div>
//                     <p className="message success" style={{ marginTop: "15px" }}>{this.props.displayMessage}</p>
//                 </div>
//                 <div
//                     style={{
//                         height: '500px',
//                     }}
//                     className="ag-theme-material">
//                     <AgGridReact
//                         gridOptions={this.state.gridOptions}
//                         rowData={this.state.amrGen}
//                         context={this.state.context}
//                         onGridReady={this.onGridReady}
//                         >
//                     </AgGridReact>
//                 </div>
//             </div>
//         );
//     }
// }

render() {
    let placeholder="Search";
    return (
        <div>
            <div className="main-content">
                <div className="subHead">
                    <h5 style={{ fontSize: "16px", marginBottom: "0" }}>
                        AMR Daily Report
                    </h5>
                </div>
                <div className="top-filters-lender">
                    <div className="row" style={{ alignItems: "center", margin: "0"}} >
                    <Col lg={1} md={1} sm={6} className="small_percent_width">
                            <Form.Label>Type:</Form.Label>
                            </Col>
                            <Col  lg={3} md={3} sm={6} className="xlarge_percent_width">
                            <DropDown
                                className="top-search-input form-control"
                                Name="plantType"
                                itemSource={this.props.plantType}
                                value={this.state.selectedPlantType}
                                handleChange={(item) => this.handleChangePlantType(item)}
                            />
                        </Col>
                        <Col lg={1} md={1} sm={6} className="small_percent_width">
                            <Form.Label>Project:</Form.Label>
                            </Col>
                            <Col lg={3} md={3} sm={6} className="xlarge_percent_width">
                            <DropDown
                                className="top-search-input form-control"
                                Name="plantName"
                                itemSource={this.getDropDownProjectTypes()}
                                value={this.state.selectedProjectTypes}
                                handleChange={(item) => this.handleChangeProjectTypes(item)}
                            />
                        </Col>
                        <Col lg={1} md={1} sm={6} className="small_percent_width">
                            <Form.Label>Plant:</Form.Label>
                            </Col>
                            <Col lg={3} md={3} sm={6} className="xlarge_percent_width">
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
                            />
                        </Col>
                        <div  className=" col-1 designMargin" style={{marginTop: "65px"}}></div>

                        <Col   className="small_percent_width" lg={1} md={1} sm={6}>
                            <Form.Label>From:</Form.Label>
                            </Col>
                            <Col lg={3} md={3} sm={6} className="xlarge_percent_width">
                        <Form.Control className="top-search-input" name="fromDate" type="date" onChange={(item) => this.handleChangeFromDate(item)} value={this.state.postData && this.state.postData.fromDate} />
                    </Col>
                    <Col  className="small_percent_width" lg={1} md={1} sm={6}>
                            <Form.Label>To:</Form.Label>
                            </Col>
                            <Col  lg={3} md={3} sm={6} className="xlarge_percent_width">
                        <Form.Control  className="top-search-input" name="toDate" type="date" onChange={(item) => this.handleChangeToDate(item)} value={this.state.postData && this.state.postData.toDate} />
                    </Col>
                    <div  className=" col-3 designMargin" style={{marginTop: "65px"}}></div>
                    <div  className=" col-3 designMargin" style={{marginTop: "65px"}}></div>

                    <Col  lg={2} md={2} sm={6} className="large_percent_width">
                            <Route render={({ history }) => (
                                <button type="button" className="btn btn-primary view_button" style={{ width: "100%" }} onClick={() => { this.getAMRReport()}}>
                                    View
                                </button>)} />
                        </Col>
                        <Col  lg={2} md={2} sm={6} className="large_percent_width">
                            <Route render={({ history }) => (
                                // <button type="button" className="btn btn-primary view_button" style={{ width: "100%" }} onClick={() => { history.push('/addEditTilt') }}>
                                //     Download
                                // </button>)} />
                                <button type="button" className="btn btn-primary view_button" style={{ width: "100%" }} onClick={(e) => { this.exportToCSV(this.state.amrGen, "AMRDailyReport", e) }}>
                                    Download
                                </button>)} />
                        </Col>
                        <Col  lg={2} md={2} sm={6} className="large_percent_width">
                             <Route render={({ history }) => (
                                <button type="button" className="btn btn-primary view_button" style={{ width: "100%" }}>
                                    Upload
                        </button>)} />
                        </Col>
                    </div>
                </div>
                <div
                    style={{
                        height: '500px',
                    }}
                  
                    className="ag-theme-material ag-first-row-color">
                    <AgGridReact
                        gridOptions={this.state.gridOptions}
                        rowData={this.state.amrGen}
                        context={this.state.context}
                        onGridReady={this.onGridReady}
                        suppressDragLeaveHidesColumns="true"
						enableCellTextSelection="true"
						// groupMultiAutoColumn={true}
						// events
						// overlayLoadingTemplate={this.state.overlayLoadingTemplate}
        			    overlayNoRowsTemplate={this.state.overlayNoRowsTemplate}                    >
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
                amrGen: state.plantDailyGenerationReducer.amrGen,
                displayMessage: state.projectTypes.displayMessage,
                plantType: [{ displayText: "Select Plant Type", value: "-1" }, { displayText: "GROUNDMOUNT", value: "GROUNDMOUNT" }, { displayText: "ROOFTOP", value: "ROOFTOP" }]
        }
    }
    
    const mapDispatchToProps = (dispatch) => {
        return {
            getProjectNames: (projectTypes) => dispatch(getProjectNames(projectTypes)),
            getPlantByProjectId: (projectId) => dispatch(getPlantByProjectId(projectId)),
            getAMRReportData: (plantId) => dispatch(getAMRReportData(plantId)),
            deletePlantFaultData: (fault_id) => dispatch(deletePlantFaultData(fault_id)),
            clearPlantFaultData: () => dispatch(clearPlantFaultData()),
        }
    }
    

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AmrDailyGeneration));
