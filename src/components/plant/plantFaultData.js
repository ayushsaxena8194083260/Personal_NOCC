import React, { Component } from 'react'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
// import { } from 'react-router-dom'
import { Link, Route } from 'react-router-dom'
import { AgGridReact } from "ag-grid-react";
import Picky from 'react-picky';
import 'react-picky/dist/picky.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import '../../styles/plant/plantFaultData.scss';
import DropDown from "../Common/DropDown";
import Alert from 'react-bootstrap/Alert';
import ModelPopUp from '../Common/ModelPopUp';
// import { AllModules } from '@ag-grid-enterprise/all-modules';


class ActionCellRenderer extends React.Component {
    constructor(props) {
        super(props);
        this.invokeDelete = this.invokeDelete.bind(this);
    }

    invokeDelete() {
        this.props.context.componentParent.onDelete(this.props.node.data.faultId);
    }
    render() {
        return (<div className="products-actions">
            <Link className="products-actions-link"
                to={{
                    pathname: "/plantFaultDataAddEdit",
                    plantFault: this.props.data
                }}>
                <img src="https://nocc.azurepower.com/images/editIcon.png" alt="Edit" />
            </Link>
            <Link className="products-actions-link"
                to={{
                    pathname: "/plantFaultIncident",
                    plantFault: this.props.data
                }}>
                {this.props.node.data.incidentDataAvailable === false ?
                    <img src="https://nocc.azurepower.com/images/icons/fugue/plus-circle.png" alt="Add Incident" /> :
                    <img src="https://nocc.azurepower.com/images/editIcon.png" alt="Edit Incident" />
                }
            </Link>
            <Link to="#" onClick={this.invokeDelete} title="Delete" >
                <img src="https://nocc.azurepower.com/images/cross-circle.png" alt="Delete" />
            </Link>
        </div>);
    }
}

class PlantFaultData extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // modules: AllModules,
            defaultColDef: {
                sortable: false,
                filter: false
            },
            rowSelection: "multiple",
            excelStyles: [
                {
                    id: "booleanType",
                    dataType: "boolean"
                },
                {
                    id: "stringType",
                    dataType: "string"
                },
                {
                    id: "dateType",
                    dataType: "dateTime"
                }
            ],
            selectedPlantType: null,
            selectedProjectTypes: null,
            selectedYear: null,
            selectedFromDate: null,
            selectedToDate: null,
            projectTypes: this.props.projectTypes,
            plantTypes: this.props.plantTypes,
            plantFault: this.props.plantFault,
            selectedPlantOptions: [],
            showPopUp: false,
            deleteID: null
        };
        //this.selectOption = this.selectOption.bind(this);
        this.selectMultipleOption = this.selectMultipleOption.bind(this);
        //this.handleChange = this.handleChange.bind(this)
    }
    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        params.api.setHeaderHeight(70);
    };

    onBtExport() {
        var params = {
            fileName: document.querySelector("#myGrid").value,
            sheetName: document.querySelector("#myGrid").value
        };
        this.gridApi.exportDataAsCsv(params);
    }

    componentDidMount() {

        this.props.clearPlantFaultData();
        // document.title = 'Plant Fault Data';
    }
    componentDidUpdate() {
        //this.props.getProjectNames(this.state.selectedValue);
    }

    handleChangePlantType(event) {
        const selectedValue = event.target.value;
        if (selectedValue !== this.state.selectedPlantType) {
            this.props.getProjectNames(selectedValue);

            this.setState({ selectedPlantType: selectedValue, selectedProjectTypes: null, selectedPlantOptions: [] });
        }
    }
    // onGridReady = (params) => {

    // }
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
        if (value) {
            this.props.getPlantAvailabilityByPlantId(value);
            this.setState({ selectedPlantOptions: value });
        }
    }

    onDelete(_id) {
        // let isConfirm = window.confirm("Are you sure want to delete this Plant Fault?");
        // if (isConfirm)
        //     this.props.deletePlantFaultData(_id);
        this.setState({ showPopUp: true, deleteID: _id });

    }

    createColumnDefs() {
        return [
            {
                headerName: "Sr No", field: "sr_no", cellClass: 'cell-wrap',
                autoHeight: true, width: 60, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Plant Name", field: "plantName", cellClass: 'cell-wrap',
                autoHeight: true, width: 77, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Date", field: "date", cellClass: 'cell-wrap',
                autoHeight: true, width: 67, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Affected Capactiy", field: "affectedCapacity", cellClass: 'cell-wrap',
                autoHeight: true, width: 83, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Start Time", field: "time", cellClass: 'cell-wrap',
                autoHeight: true, width: 68, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Stop Time", field: "stopTime", cellClass: 'cell-wrap',
                autoHeight: true, width: 68, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Irradiation At Array Tilt", field: "tiltIrradiationOh", cellClass: 'cell-wrap',
                autoHeight: true, width: 90, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Module Temp", field: "moduleTempOh", cellClass: 'cell-wrap',
                autoHeight: true, width: 80, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Count", field: "countOh", cellClass: 'cell-wrap',
                autoHeight: true, width: 65, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Affected Time In Hrs", field: "affectedTimeInHrs", cellClass: 'cell-wrap',
                autoHeight: true, width: 90, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Affected Time In Decimal", field: "affectedTimeInDecimal", cellClass: 'cell-wrap',
                autoHeight: true, width: 90, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Generation Loss For The Period", field: "generationLossForThePeriod", cellClass: 'cell-wrap',
                autoHeight: true, width: 94, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Generation Loss For The Whole Day", field: "generationLossForTheWholeDay", cellClass: 'cell-wrap',
                autoHeight: true, width: 94, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Plant Deviation", field: "plantDeviation", cellClass: 'cell-wrap',
                autoHeight: true, width: 84, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Revenue Loss (INR)", field: "revenueLoss", cellClass: 'cell-wrap',
                autoHeight: true, width: 90, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Action",
                field: 'action',
                cellRendererFramework: ActionCellRenderer,
                width: 106,
            }
        ];
    }
    pinnedTopRowData() {
        
        return [
            {
                sr_no: "Total",
                generationLossForThePeriod: this.props.totalResult && this.props.totalResult.totalgenerationLossForThePeriod ? this.props.totalResult.totalgenerationLossForThePeriod : 0,
                generationLossForTheWholeDay: this.props.totalResult && this.props.totalResult.generationLossForTheWholeDay ? this.props.totalResult.generationLossForTheWholeDay : 0,
                plantDeviation: this.props.totalResult && this.props.totalResult.plantDeviation ? this.props.totalResult.plantDeviation : 0,
                revenueLoss: this.props.totalResult && this.props.totalResult.revenueLoss ? this.props.totalResult.revenueLoss : 0,
                action: null
            },

        ]
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps,'nextProps')
        if (nextProps !== null) {
            this.setState({
                projectTypes: nextProps.projectTypes,
                plantTypes: nextProps.plantTypes,
                plantFault: nextProps.plantFault
            })
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

    getDropDownYear() {
        return this.props.years && this.props.years.map((item) => { return { displayText: item, value: item } });
    }
    onHide() {
        this.setState({ showPopUp: false, deleteID: null });
    }

    deleteRecord() {
        if (this.state.deleteID !== null) {
            this.props.deletePlantFaultData(this.state.deleteID);
            //alert("deleted id"+ this.state.deleteID);
            this.onHide();
        }
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
        // const searchIcon =require('../../icons8-user-100.png')
        let placeholder = "Search";

        return (
            <div>
                <div>
                    <div className="top-filter">
                        <div className="row" style={{ alignItems: "center", margin: "0" }} >
                            <Col lg={1} md={1} sm={6} className="small_percent_width">
                                <Form.Label>Type:</Form.Label>
                            </Col>
                            <Col lg={2} md={2} sm={6} className="large_percent_width">
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
                            <Col lg={2} md={2} sm={6} className="large_percent_width">
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
                            <Col lg={2} md={2} sm={6} className="large_percent_width">
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
                            <Col lg={1} md={1} sm={6} className="small_percent_width">
                                <Form.Label>Year:</Form.Label>
                            </Col>
                            <Col lg={2} md={2} sm={6} className="large_percent_width" >
                                <DropDown
                                    className="top-search-input form-control"
                                    Name="year"
                                    itemSource={this.getDropDownYear()}
                                    value={this.state.selectedYear}
                                    handleChange={(item) => this.handleChangeYear(item)}
                                />
                            </Col>
                            <Col lg={1} md={1} sm={6} className="small_percent_width">
                                <button type="button" className="btn btn-orange view_button" onClick={() => this.getRenderPlantFault()}>
                                    Go
                                </button>
                            </Col>
                            <Col lg={2} md={2} sm={6} className="large_percent_width">
                                <Route render={({ history }) => (
                                    <button type="button" className="btn btn-primary view_button" style={{ width: "100%" }} onClick={() => { history.push('/plantFaultDataAddEdit') }}>
                                        <img src="https://nocc.azurepower.com/images/icons/fugue/plus-circle.png" alt="add plant" title="Add Plant Fault" style={{ float: "left", marginRight: "3" }} />
                                        Add Plant Fault
                                    </button>)} />
                            </Col>
                        </div>
                    </div>
                    <div>
                        {this.props.displayMessage ? <Alert className="message success" variant="success" style={{ marginTop: "15px" }}>{this.props.displayMessage}</Alert> : null}
                    </div>
                    <div>
                        <button type="submit" class="download-button-plant" name="submit" onClick={this.onBtExport.bind(this)} value="submit" title="Download"></button>
                    </div>
                    <div id="myGrid"
                        style={{
                            height: '500px',
                            maxWidth: "1222px",
                            margin: "auto"
                        }}
                        className="ag-theme-material ag-first-row-color">
                        <AgGridReact
                            // modules={this.state.modules}
                            defaultColDef={this.state.defaultColDef}
                            rowSelection={this.state.rowSelection}
                            excelStyles={this.state.excelStyles}
                            columnDefs={this.createColumnDefs()}
                            pinnedTopRowData={this.state.plantFault && this.state.plantFault.length > 0 ? this.pinnedTopRowData() : null}
                            rowData={this.state.plantFault}
                            context={{ componentParent: this }}
                            // headerHeight={"48px"}
                            onGridReady={this.onGridReady}>
                        </AgGridReact>
                    </div>
                    <ModelPopUp title="Delete"
                        id={"plantFaultDataDelete"}
                        bodyContent="Are you sure want to delete this Plant Fault?"
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
export default PlantFaultData;