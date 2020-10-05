import React, { Component } from 'react'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { AgGridReact } from 'ag-grid-react'
import Picky from 'react-picky';
import 'react-picky/dist/picky.css';
import Button from 'react-bootstrap/Button';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import '../../styles/plant/plantFaultData.scss';
import DropDown from "../Common/DropDown";
import PlantGenerationAdd from './PlantGenerationAdd';
import PlantGenerationUpload from './PlantGenerationUpload';
import ModelPopUp from '../Common/ModelPopUp';

const rowIndex = (params) => params.node.rowIndex + 1;

class ActionCellRenderer extends React.Component {
    constructor(props) {
        super(props);
        this.invokeDelete = this.invokeDelete.bind(this);
        this.invokeEdit = this.invokeEdit.bind(this);
    }
    invokeEdit() {
        this.props.context.componentParent.editPlantGeneration(this.props.node.data);
    }
    invokeDelete() {
        this.props.context.componentParent.onDelete(this.props.node.data.plantGenerationId);
    }
    render() {
        return (<div className="products-actions">
            <Link to="#" onClick={() => this.invokeEdit()} title="Edit">
                <img src="/images/editIcon.png" alt="Edit" />
            </Link>
            <Link to="#" onClick={this.invokeDelete} title="Delete" >
                <img src="/images/cross-circle.png" alt="Delete" />
            </Link>
        </div>);
    }
}

class PlantGeneration extends Component {

    constructor(props) {
        super(props);
        this.state = {
            plfType: this.props.plfType,
            displayMessage: null,
            selectedPlfType: null,
            lgShow: false,
            uploadShow: false,
            selectedFromDate: this.getMonthStartDate(),
            selectedToDate: this.getCurrentDate(),
            gridOptions: this.createGridOptions(),
            selectedPlantType: null,
            selectedProjectTypes: null,
            selectedYear: null,
            projectTypes: this.props.projectTypes,
            plantTypes: this.props.plantTypes,
            plantDailyGen: this.props.plantDailyGen,
            selectedPlantOptions: [],
            showPopUp: false,
            deleteID: null,
            plant_id: '',
            selectedPlant: "",
            fromDate: '',
            toDate: '',
            value: null,
            context: { componentParent: this },
            suppressHorizontalScroll: true,
            selectedCurrencyType: null,
            gridRefersh: true
        };
        this.selectMultipleOption = this.selectMultipleOption.bind(this);
    }

    getCurrentDate() {
        var today = new Date();
        var d = today.getDate();
        var day;
        if (d > 1) {
            day = d - 1;
        } else {
            day = d
        }
        var m = today.getMonth() + 1;
        var y = today.getFullYear();
        var data;

        if (day < 10) {
            day = "0" + day;
        };
        if (m < 10) {
            m = "0" + m;
        };

        data = y + "-" + m + "-" + day;
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

    editPlantGeneration(data) {
        this.invokeActualGeneration(data);
    }

    PlantGeneration(lgShowValue, data) {
        this.setState({
            ...this.state,
            lgShow: lgShowValue,
            postData: data
        })
    }
    PlantGenerationUpload(uploadShowValue) {
        this.setState({
            ...this.state,
            uploadShow: uploadShowValue
        })
    }
    componentDidMount() {
        this.props.clearPlantDailyGeneration();
        // document.title = 'Plant Fault Data';
    }

    componentDidUpdate() {
        this.state.gridRefersh === false && this.setState({ gridRefersh: true });
    }

    handleChangeFromDate(event) {
        let fromDate = event.target.value;
        this.setState({ selectedFromDate: fromDate });
    }

    handleChangeToDate(event) {
        let toDate = event.target.value;
        this.setState({ selectedToDate: toDate });
    }

    handleChangePLFType(event) {
        const selectedValue = event.target.value;
        this.setState({ selectedPlfType: selectedValue, gridOptions: this.createGridwithOptions(selectedValue, this.state.selectedCurrencyType) });
    }

    handleChangeCurrencyType(event) {
        const selectedValue = event.target.value;
        this.setState({ selectedCurrencyType: selectedValue, gridOptions: this.createGridwithOptions(this.state.selectedPlfType, selectedValue) });
    }

    handleChangePlant(event) {
        const selectedValue = event.target.value;
    }

    handleChangePlantType(event) {
        const selectedValue = event.target.value;
        if (selectedValue !== this.state.selectedPlantType) {
            this.props.getProjectNames(selectedValue);
            this.setState({ selectedPlantType: selectedValue, selectedProjectTypes: null, selectedPlantOptions: [] });
        }
    }
    getRenderDailyGeneration() {

        let plantIds = [];
        let dataFlag = 0;
        this.setState({ gridRefersh: false });
        this.state.selectedPlantOptions && this.state.selectedPlantOptions.length > 0 && this.state.selectedPlantOptions.map((item) => { plantIds.push(item.id) });
        plantIds.length > 0 && this.props.getDailyPlantActualGeneration({ plantIds: plantIds, fromDate: this.state.selectedFromDate, toDate: this.state.selectedToDate, dataFlag: 1, plfType: this.state.selectedPlfType === null ? 'AC Capacity' : this.state.selectedPlfType, ruppee: this.state.selectedCurrencyType === null ? 'INR' : this.state.selectedCurrencyType });
    }

    onGridReady = (params) => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
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
    onBtExport() {
        var params = {
            fileName: document.querySelector("#myGrid").value,
            sheetName: document.querySelector("#myGrid").value
        };
        this.gridApi.exportDataAsCsv(params);
    }
    getDropDownPlfType() {
        let plfType = [];
        this.props.plfType && this.props.plfType.map((item) => {
            plfType.push({ displayText: item.name, value: item.value })
        });

        return plfType;
    }

    getDropDownCurrencyType() {
        let currencyType = [];
        this.props.currencyType && this.props.currencyType.map((item) => {
            currencyType.push({ displayText: item.name, value: item.value })
        });

        return currencyType;
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
        this.getRenderDailyGeneration();

    }

    ModalClose() {
        this.setState({ commGF: false });
    }
    deleteRecord() {
        if (this.state.deleteID !== null) {
            this.props.deletePlantGen(this.state.deleteID);
            this.onHide();
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps,"nextProps")
        if (nextProps !== null) {
            this.setState({
                projectTypes: nextProps.projectTypes,
                plantTypes: nextProps.plantTypes,
                plantDailyGen: nextProps.plantDailyGen,
                displayMessage: nextProps.displayMessage
            })
        }
    }


    handleChange(event) {
        const stateDup = this.state;
        stateDup[event.target.name] = event.target.value;
        this.setState({ stateDup });

    }

    createGridwithOptions(plf, currency) {
        return {
            columnDefs: [
                {
                    headerName: "Plant", field: "plantName", cellClass: 'cell-wrap',
                    autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
                },
                {
                    headerName: "Date", field: "date", cellClass: 'cell-wrap',
                    autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
                },
                {
                    headerName: "Connected Capacity", field: "connectedCapacity", cellClass: 'cell-wrap',
                    autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
                },

                {
                    headerName: "Pyranometer Tilt", field: "pyranometerTilt", cellClass: 'cell-wrap',
                    autoHeight: true, width: 110, cellStyle: { 'white-space': 'normal' }
                },
                {
                    headerName: "Plant Tilt", field: "tilt", cellClass: 'cell-wrap',
                    autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
                },
                {
                    headerName: plf === null ? "PLF(AC)" : plf === "AC Capacity" ? "PLF(AC)" : "PLF(DC)", field: "plfAC", cellClass: 'cell-wrap',
                    autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
                },
                {
                    headerName: plf === null ? "PR(AC)" : plf === "AC Capacity" ? "PR(AC)" : "PR(DC)", field: "pr", cellClass: 'cell-wrap',
                    autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
                },
                // {
                //     headerName: "PR", field: "pr", cellClass: 'cell-wrap',
                //     autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
                // },
                 {
                    headerName: "Export", field: "export", cellClass: 'cell-wrap',
                    autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
                },
                {
                    headerName: "Import", field: "importData", cellClass: 'cell-wrap',
                    autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
                },
                {
                    headerName: "Net Generation", field: "netGeneration", cellClass: 'cell-wrap',
                    autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
                },
                {
                    headerName: currency === null ? "Revenue(Mn INR)" : currency === "INR" ? "Revenue(Mn INR)" : "Revenue(Mn USD)", field: "revenue", cellClass: 'cell-wrap',
                    autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
                },
                {
                    headerName: "Action",
                    field: '',
                    cellRendererFramework: ActionCellRenderer,
                    cellRendererParams: {
                        lgShow: this.lgShow,
                        uploadShow: this.uploadShow
                    },
                    width: 100,
                }
            ],
            suppressHorizontalScroll: false
        };


    }

    createGridOptions() {
        return {
            columnDefs: [
                {
                    headerName: "Plant", field: "plantName", cellClass: 'cell-wrap',
                    autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
                },
                {
                    headerName: "Date", field: "date", cellClass: 'cell-wrap',
                    autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
                },
                {
                    headerName: "Connected Capacity", field: "connectedCapacity", cellClass: 'cell-wrap',
                    autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
                },

                {
                    headerName: "Pyranometer Tilt", field: "pyranometerTilt", cellClass: 'cell-wrap',
                    autoHeight: true, width: 110, cellStyle: { 'white-space': 'normal' }
                },
                {
                    headerName: "Plant Tilt", field: "tilt", cellClass: 'cell-wrap',
                    autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
                },
                {
                    headerName: "PLF(AC)", field: "plfAC", cellClass: 'cell-wrap',
                    autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
                },
                {
                    headerName: "PR(AC)", field: "pr", cellClass: 'cell-wrap',
                    autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
                }, {
                    headerName: "Export", field: "export", cellClass: 'cell-wrap',
                    autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
                },
                {
                    headerName: "Import", field: "importData", cellClass: 'cell-wrap',
                    autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
                },
                {
                    headerName: "Net Generation", field: "netGeneration", cellClass: 'cell-wrap',
                    autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
                },
                {
                    headerName: "Revenue(Mn INR)", field: "revenue", cellClass: 'cell-wrap',
                    autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
                },
                {
                    headerName: "Action",
                    field: '',
                    cellRendererFramework: ActionCellRenderer,
                    cellRendererParams: {
                        lgShow: this.lgShow,
                        uploadShow: this.uploadShow
                    },
                    width: 100,
                }
            ],
            suppressHorizontalScroll: false
        };
    }

    invokeActualGeneration(data = {}) {
        this.PlantGeneration(true, data);

    }
    invokeUploadGeneration() {
        const uploadShow = true;
        this.PlantGenerationUpload(uploadShow);
    }
    pinnedTopRowData() {
        
        return [
        
            { 
                plantName: "Total",
                importData: Math.trunc (this.props.totalResult && this.props.totalResult.importData ? this.props.totalResult.importData : 0),
                export: Math.trunc (this.props.totalResult && this.props.totalResult.exportData ? this.props.totalResult.exportData : 0),
                netGeneration:Math.trunc (this.props.totalResult && this.props.totalResult.netGeneration ? this.props.totalResult.netGeneration : 0),
                revenue: this.props.totalResult && this.props.totalResult.revenue ? this.props.totalResult.revenue : 0
            }
        ]
    }
    render() {

        const ModalClose = () => {
            
            this.getRenderDailyGeneration()
            this.setState({ lgShow: false });
            this.setState({ uploadShow: false });
            this.setState({ deleteShow: false });
        }
        let placeholder = "Search";
        return (
            <div>
                <div className="top-filter">
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
                        <Col  lg={1} md={1} sm={6}>
                            <Form.Label>Currency:</Form.Label>
                        </Col>
                        <Col lg={2} md={2} sm={6} className="input_group full__width" >
                            <DropDown
                                className="top-search-input form-control"
                                Name="Currency"
                                itemSource={this.getDropDownCurrencyType()}
                                value={this.state.selectedPlfType}
                                handleChange={(item) => this.handleChangeCurrencyType(item)}
                            />
                        </Col>


                        <Col lg={1} md={1} sm={6}>
                            <Form.Label>From:</Form.Label>


                        </Col>
                        <Col lg={2} md={2} sm={6} className="input_group full__width">
                            <Form.Control className="top-search-input" name="fromDate" type="date" onChange={(item) => this.handleChangeFromDate(item)} value={this.state.selectedFromDate} />
                        </Col>

                        <Col  lg={1} md={1} sm={6}>
                            <Form.Label>To:</Form.Label>
                        </Col>
                        <Col className="input_group full__width" lg={2} md={2} sm={6}>
                            <Form.Control className="top-search-input" name="toDate" type="date" onChange={(item) => this.handleChangeToDate(item)} value={this.state.selectedToDate} />
                        </Col>
                        <Col  lg={1} md={1} sm={6}>
                            <Form.Label>PLF Type:</Form.Label>
                        </Col>
                        <Col className="input_group full__width" lg={2} md={2} sm={6}>
                            <DropDown
                                className="top-search-input form-control"
                                Name="plfType"
                                itemSource={this.getDropDownPlfType()}
                                value={this.state.selectedPlfType}
                                handleChange={(item) => this.handleChangePLFType(item)}
                            />
                        </Col>
                       
                        <div  className=" col-3 designMargin" style={{marginTop: "65px"}}></div>
                        <div  className=" col-4 designMargin" style={{marginTop: "65px"}}></div>


                       <Col lg={2} md={2} sm={6} className="small_percent_width">
                            <button type="button" style={{ marginTop: "19px" }} className="btn btn-orange view_button" onClick={() => this.getRenderDailyGeneration()}>
                                Go
                        </button>
                        </Col>
                        <Col lg={2} md={2} sm={6} className="large_percent_width">
                            <Route render={({ history }) => (

                                <button type="button" className="btn btn-primary view_button" style={{ width: "100%" }} onClick={() => { this.invokeUploadGeneration() }}>
                                    <img src="/images/icons/fugue/arrow-090.png" alt="Upload" />
                                    Upload Generation
                                </button>)} />
                        </Col>
                        <Col lg={2} md={2} sm={6} className="large_percent_width">
                            <Route render={({ history }) => (
                                <button type="button" className="btn btn-primary view_button" style={{ width: "100%" }} onClick={() => { this.invokeActualGeneration() }}>
                                    <img src="/images/icons/fugue/plus-circle.png" alt="add plant" title="Add Plant Fault" style={{ float: "left", marginRight: "3" }} />
                                    Actual Generation
                                </button>)} />
                        </Col>
                       

                    </div>
                    <Row style={{ margin: "0" }}>
               
                 

                </Row>

                </div>
                <div>
                    <p className="message success" style={{ marginTop: "15px" }}>{this.state.displayMessage}</p>
                </div>
                   <div>
                        <button type="submit" className="download-button-plant" name="submit" onClick={this.onBtExport.bind(this)} value="submit" title="Download"></button>
                    </div>
                    <div id="myGrid"
                        style={{
                            height: '500px',
                            maxWidth: "1222px",
                            margin: "auto"
                        }}
               
                    className="ag-theme-material ag-first-row-color">
                    {this.state.gridRefersh && <AgGridReact
                        gridOptions={this.state.gridOptions}
                        pinnedTopRowData={this.state.plantDailyGen && this.state.plantDailyGen.length > 0 ? this.pinnedTopRowData() : null}
                        rowData={this.state.plantDailyGen}
                        context={this.state.context}
                        onGridReady={this.onGridReady}
                        enableRangeSelection={true}
                    >
                    </AgGridReact>}
                    {this.state.lgShow && <PlantGenerationAdd
                        show={this.state.lgShow}
                        onHide={ModalClose}
                        data={this.state.postData}
                        selectedPlantType={this.state.selectedPlantType}
                        selectedProjectTypes={this.state.selectedProjectTypes}
                    />}
                    <PlantGenerationUpload
                        show={this.state.uploadShow}
                        onHide={ModalClose}
                    />
                    <ModelPopUp title="Delete"
                        id={"plantActualGenDelete"}
                        bodyContent="Are you sure want to delete this Plant Actual Generation?"
                        showPopUp={this.state.showPopUp}
                        secondaryBtnName="No"
                        onSecondaryAction={this.onHide.bind(this)}
                        primaryBtnName="Delete"
                        onPrimaryAction={this.deleteRecord.bind(this)}
                    />

                </div>
            </div>
        );
    }
}


export default PlantGeneration;
