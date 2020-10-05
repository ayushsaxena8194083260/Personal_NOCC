import React, { Component } from 'react'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
// import { connect } from 'react-redux'
import { Link, } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { AgGridReact } from "ag-grid-react"
import Picky from 'react-picky';
import 'react-picky/dist/picky.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import '../../styles/plant/plantFaultData.scss';
import Button from 'react-bootstrap/Button';
import DropDown from "../Common/DropDown";
import Alert from 'react-bootstrap/Alert';
import ModelPopUp from '../Common/ModelPopUp';
import { Modal } from 'react-bootstrap';
// import { AllModules } from '@ag-grid-enterprise/all-modules';
const rowIndex = (params) => params.node.rowIndex + 1;

class ActionCellRenderer extends React.Component {
    constructor(props) {
        super(props);
        this.invokeDelete = this.invokeDelete.bind(this);
        this.invokeComments = this.invokeComments.bind(this);
    }

    invokeDelete() {
        
        this.props.context.componentParent.onDelete(this.props.node.data.gridFaliureId);
    }
    invokeComments() {
        const commGF = true;
        this.props.context.componentParent.commentsGridFailure(commGF, this.props.node.data.reason);
    }
    componentDidUpdate() {
        this.state.gridRefersh === false && this.setState({ gridRefersh: true });
    }

    render() {
        return (<div className="products-actions">
            <Link className="products-actions-link"
                to={{
                    pathname: "/gridFailureAddEdit",
                    gridFailure: this.props.data
                }}>
                <img src="/images/editIcon.png" alt="Edit" />
            </Link>
            <Link to="#" onClick={this.invokeDelete} title="Delete" >
                <img src="/images/cross-circle.png" alt="Delete" />
            </Link>
            <Link to="#" onClick={this.invokeComments} title="Comments" >
                <img src="/images/icons/fugue/magnifier.png" alt="Comment" />
            </Link>
        </div>);
    }
}

class GridFailure extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // modules: AllModules,
            defaultColDef: {
                // sortable: false,
                // filter: false
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
            selectedPlanType: null,
            selectedProjectTypes: null,
            selectedYear: null,
            projectTypes: this.props.projectTypes,
            plantTypes: this.props.plantTypes,
            gridFailure: this.props.gridFailure,
            selectedPlantOptions: [],
            showPopUp: false,
            showCommentPopUp: false,
            showPopUpMsg: null,
            generationLost: this.props.gridFailure,
            hoursLost: 0,
            recoveryTime: this.props.gridFailure,
            deleteID: null,
            overlayLoadingTemplate: '<span class="ag-overlay-loading-center"><div class="loader"></div><div style="text-align:center">Loading!</div></span>',
        };
        this.selectMultipleOption = this.selectMultipleOption.bind(this);
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
        // document.title = 'Plant Fault Data';
        this.props.clearGridFailureData();
    }
    componentDidUpdate() {
    }

    handleChangePlantType(event) {
        const selectedValue = event.target.value;
        if (selectedValue !== this.state.selectedPlantType) {
            this.props.getProjectNames(selectedValue);

            this.setState({ selectedPlantType: selectedValue, selectedProjectTypes: null, selectedPlantOptions: [] });
        }
    }

    handleChangePlantFault(event) {
        const plantId = event.target.value;
        this.setState({ plantId });
    }

    getRenderGridFailure() {
        
        let plantIds = [];
        this.state.selectedPlantOptions && this.state.selectedPlantOptions.length > 0 && this.state.selectedPlantOptions.map((item) => { plantIds.push(item.id) });
        plantIds.length > 0 && this.props.getGridFailureDataByPlantId({ plantIds: plantIds, year: this.state.selectedYear });
    }

    handleChangeType(event) {
        const selectedValue = event.target.value;
        this.props.getProjectNames(selectedValue);
        this.setState({ selectedValue });
        console.log(selectedValue)
    }

    // handleChangePlantFault(event) {
    //     const plantId = event.target.value;
    //     this.setState({ plantId });
    //     console.log(plantId)
    // }
    // onGridReady = (params) => {

    // }

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

    createColumnDefs() {
        return [
            {
                headerName: "Sr No", lockPosition: true, valueGetter: rowIndex, cellClass: 'cell-wrap',
                autoHeight: true, width: 47, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Plant Name", field: "plantName", cellClass: 'cell-wrap',
                autoHeight: true, width: 73, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Date", field: "date", cellClass: 'cell-wrap',
                autoHeight: true, width: 80, cellStyle: { 'white-space': 'normal' }, 
            },
            {
                headerName: "Affected Capactiy", field: "affectedCapacity1", cellClass: 'cell-wrap',
                autoHeight: true, width: 83, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Start Time", field: "startTime", cellClass: 'cell-wrap',
                autoHeight: true, width: 65, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Stop Time", field: "stopTime", cellClass: 'cell-wrap',
                autoHeight: true, width: 65, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Irradiation At Array Tilt", field: "tiltIrradiationOh", cellClass: 'cell-wrap',
                autoHeight: true, width: 90, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Module Temp", field: "moduleTempOh", cellClass: 'cell-wrap',
                autoHeight: true, width: 70, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Count", field: "countOh", cellClass: 'cell-wrap',
                autoHeight: true, width: 60, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Time in Hrs", field: "timeInHours", cellClass: 'cell-wrap',
                autoHeight: true, width: 70, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Time in Decimal", field: "timeInDecimal", cellClass: 'cell-wrap',
                autoHeight: true, width: 70, cellStyle: { 'white-space': 'normal' }
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
                autoHeight: true, width: 70, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Revenue Loss (INR)", field: "revenueLoss", cellClass: 'cell-wrap',
                autoHeight: true, width: 90, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Action",
                field: '',
                cellRendererFramework: ActionCellRenderer,
                width: 100,
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
            }
        ]
    }

    componentWillReceiveProps(nextProps) {

            
        let gridFailure = nextProps.gridFailure;
        // console.log(gridFailure,'gridFailure')
        if (nextProps !== null) {
            this.setState({
                projectTypes: nextProps.projectTypes,
                plantTypes: nextProps.plantTypes,
                gridFailure: gridFailure
            })
        }
        console.log(this.state.gridFailure, "nextProps");
        // console.log(this.state, "state")
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

    onDelete(_id) {
        this.setState({ showPopUp: true, deleteID: _id });

    }

    onHide() {
        this.setState({ showPopUp: false, deleteID: null });
    }

    ModalClose() {
        this.setState({ commGF: false });
        this. getRenderGridFailure();

    }
    deleteRecord() {
    
        if (this.state.deleteID !== null) {
            this.props.deleteGridFailureData(this.state.deleteID);
            this.onHide();
        }
    }

    commentsGridFailure(gfShowValue, msg) {
        this.setState({
            ...this.state,
            commGF: gfShowValue,
            showPopUpMsg: msg
        })
    }

    render() {
        // const ModalClose = () => {
        //     this.setState({ commGF: false });
        // }

        return (
            <div>
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
                                        filterPlaceholder="Search"
                                    />
                                </Col>
                                <Col lg={1} md={1} sm={6} className="small_percent_width">
                                    <Form.Label>Year:</Form.Label>
                                </Col>
                                <Col lg={2} md={2} sm={6} className="large_percent_width">                                    <DropDown
                                        className="top-search-input form-control"
                                        Name="year"
                                        itemSource={this.getDropDownYear()}
                                        value={this.state.selectedYear}
                                        handleChange={(item) => this.handleChangeYear(item)}
                                    />
                                </Col>
                                <div style={{ padding: "5px", maxWidth: "1100px" }}>
                                    <button type="button" className="btn btn-orange" onClick={() => this.getRenderGridFailure()}>
                                        Go
                        </button>
                                </div>
                                <div >

                                    <Route render={({ history }) => (
                                        <button type="button" className="btn btn-primary" style={{ width: "100%" }} onClick={() => { history.push('/GridFailureAddEdit') }}>
                                            <img src="/images/icons/fugue/plus-circle.png" alt="add Grid Failure" title="Add Grid Failure" style={{ float: "left", marginRight: "3" }} />
                                            Add Grid Failure
                                        </button>)} />
                                </div>
                            </div>
                        </div>
                        <div>
                            {this.props.displayMessage ? <Alert className="message success" variant="success" style={{ marginTop: "15px" }}>{this.props.displayMessage}</Alert> : null}
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
                            <AgGridReact
                                // modules={this.state.modules}
                                defaultColDef={this.state.defaultColDef}
                                rowSelection={this.state.rowSelection}
                                excelStyles={this.state.excelStyles}
                                columnDefs={this.createColumnDefs()}
                                // pinnedTopRowData={this.state.gridFailure && this.state.gridFailure.length > 0 ? this.pinnedTopRowData() : null}
                                rowData={this.state.gridFailure}
                                context={{ componentParent: this }}
                                enableRangeSelection={true}
                                overlayLoadingTemplate={this.state.overlayLoadingTemplate}
                                onGridReady={this.onGridReady}>
                            </AgGridReact>
                            <Modal id="gridFailureComments" show={this.state.commGF} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                                {/* <Modal.Header closeButton> */}
                                <Modal.Title>Comments</Modal.Title>
                                {/* </Modal.Header> */}
                                <Modal.Body>
                                    <p>{this.state.showPopUpMsg}</p>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="danger" onClick={() => this.ModalClose()}>
                                        Close
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                        <ModelPopUp title="Delete"
                            id={"gridFailureDelete"}
                            bodyContent="Are you sure want to delete this Grid Failure?"
                            showPopUp={this.state.showPopUp}
                            secondaryBtnName="No"
                            onSecondaryAction={this.onHide.bind(this)}
                            primaryBtnName="Delete"
                            onPrimaryAction={this.deleteRecord.bind(this)}
                        />
                    </div>
                </div>


            </div>
        );
    }
}

export default GridFailure;