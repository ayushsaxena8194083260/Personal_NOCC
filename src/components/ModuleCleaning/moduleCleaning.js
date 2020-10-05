import React, { Component } from 'react'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { AgGridReact } from "ag-grid-react"
import Picky from 'react-picky';
import 'react-picky/dist/picky.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import '../../styles/plant/plantFaultData.scss';
import DropDown from "../Common/DropDown";
import Alert from 'react-bootstrap/Alert';
import ModelPopUp from '../Common/ModelPopUp';

class ActionCellRenderer extends React.Component {
    constructor(props) {
        super(props);
        this.invokeDelete = this.invokeDelete.bind(this);
    }

    invokeDelete() {
        this.props.context.componentParent.onDelete(this.props.node.data.moduleCleaningId);
    }
    render() {
        return (<div className="products-actions">
            <Link className="products-actions-link"
                to={{
                    pathname: "/moduleCleaningAddEdit",
                    moduleCleaning: this.props.data
                }}>
                <img src="/images/editIcon.png" alt="Edit" />
            </Link>
            <Link to="#" onClick={this.invokeDelete} title="Delete" >
                <img src="/images/cross-circle.png" alt="Delete" />
            </Link>
        </div>);
    }
}

class ModuleCleaning extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedPlanType: null,
            selectedProjectTypes: null,
            selectedFromDate: this.getMonthStartDate(),
            selectedToDate: this.getCurrentDate(),
            projectTypes: this.props.projectTypes,
            plantTypes: this.props.plantTypes,
            moduleCleaning: this.props.moduleCleaning,
            selectedPlantOptions: [],
            showPopUp: false,
            deleteID: null
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
    componentDidMount() {
        // document.title = 'Plant Fault Data';
        this.props.clearModuleCleaningData();
    }
    componentDidUpdate() {
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

    getRenderModuleCleaning() {
        let plantIds = [];
        this.state.selectedPlantOptions && this.state.selectedPlantOptions.length > 0 && this.state.selectedPlantOptions.map((item) => { plantIds.push(item.id) });
        plantIds.length > 0 && this.props.getModuleCleaningDataByDate({ plantIds: plantIds, fromDate: this.state.selectedFromDate, toDate: this.state.selectedToDate });
    }

    handleChangeType(event) {
        const selectedValue = event.target.value;
        this.props.getProjectNames(selectedValue);
        this.setState({ selectedValue });
        console.log(selectedValue)
    }
    onGridReady = (params) => {
        params.api.setHeaderHeight(70);
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

    pinnedTopRowData() {
        return [
            {
                plantName: "Total",
                rackPlanned: Math.trunc (this.props.totalResult && this.props.totalResult.rackPlanned ? this.props.totalResult.rackPlanned : 0),
                rackCleaned: Math.trunc (this.props.totalResult && this.props.totalResult.rackCleaned ? this.props.totalResult.rackCleaned : 0),
                totalCleaned: Math.trunc (this.props.totalResult && this.props.totalResult.totalCleaned ? this.props.totalResult.totalCleaned : 0),
                labourPlanned: Math.trunc (this.props.totalResult && this.props.totalResult.labourPlanned ? this.props.totalResult.labourPlanned : 0),
                labourUsed: Math.trunc (this.props.totalResult && this.props.totalResult.labourUsed ? this.props.totalResult.labourUsed : 0),
                waterUsed: Math.trunc (this.props.totalResult && this.props.totalResult.waterUsed ? this.props.totalResult.waterUsed : 0),
                cleaningExpenditure: Math.trunc (this.props.totalResult && this.props.totalResult.cleaningExpenditure ? this.props.totalResult.cleaningExpenditure : 0),
                action: null
            }
        ]
    }


    createColumnDefs() {
        return [
            {
                headerName: "Plant Name", field: "plantName", cellClass: 'cell-wrap',
                autoHeight: true, width: 110, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Date", field: "date", cellClass: 'cell-wrap',
                autoHeight: true, width: 75, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "No Of Rack Planned For Cleaning", field: "rackPlanned", cellClass: 'cell-wrap',
                autoHeight: true, width: 95, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Actual No Of Rack Cleaned", field: "rackCleaned", cellClass: 'cell-wrap',
                autoHeight: true, width: 80, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Total Cleaning In KW", field: "totalCleaned", cellClass: 'cell-wrap',
                autoHeight: true, width: 80, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "No. Of Labor Planned", field: "labourPlanned", cellClass: 'cell-wrap',
                autoHeight: true, width: 103, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Actual No Of Labor Used", field: "labourUsed", cellClass: 'cell-wrap',
                autoHeight: true, width: 113, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Mode Of Cleaning", field: "modeOfCleaning", cellClass: 'cell-wrap',
                autoHeight: true, width: 83, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Rainfall Detail", field: "rainingDetail", cellClass: 'cell-wrap',
                autoHeight: true, width: 74, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Cleaning Frequency", field: "cleaningFrequency", cellClass: 'cell-wrap',
                autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Water Used(In Ltrs)", field: "waterUsed", cellClass: 'cell-wrap',
                autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Per Inverter Cleaning Cost", field: "cleaningExpenditure", cellClass: 'cell-wrap',
                autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Action",
                field: '',
                cellRendererFramework: ActionCellRenderer,
                width: 98,
            }
        ];
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== null) {
            this.setState({
                projectTypes: nextProps.projectTypes,
                plantTypes: nextProps.plantTypes,
                moduleCleaning: nextProps.moduleCleaning
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

    onDelete(_id) {
        this.setState({ showPopUp: true, deleteID: _id });

    }

    onHide() {
        this.setState({ showPopUp: false, deleteID: null });
    }

    deleteRecord() {
        if (this.state.deleteID !== null) {
            this.props.deleteModuleCleaning(this.state.deleteID);
            this.onHide();
        }
    }

    render() {
        return (
            <div>
                <div>
                    <div className="top-filter">
                        <div className="row" style={{ alignItems: "center", margin: "0" }} >
                            <Col xs={1} style={{ maxWidth: "5%" }}>
                                <Form.Label>Type:</Form.Label>
                            </Col>
                            <Col style={{ maxWidth: "15%", padding: "0" }}>
                                <DropDown
                                    className="top-search-input form-control"
                                    Name="plantType"
                                    itemSource={this.props.plantType}
                                    value={this.state.selectedPlantType}
                                    handleChange={(item) => this.handleChangePlantType(item)}
                                />
                            </Col>
                            <Col xs={1} style={{ maxWidth: "5%" }}>
                                <Form.Label>Project:</Form.Label>
                            </Col>
                            <Col style={{ maxWidth: "15%", padding: "0" }}>
                                <DropDown
                                    className="top-search-input form-control"
                                    Name="plantName"
                                    itemSource={this.getDropDownProjectTypes()}
                                    value={this.state.selectedProjectTypes}
                                    handleChange={(item) => this.handleChangeProjectTypes(item)}
                                />
                            </Col>
                            <Col xs={1} style={{ maxWidth: "5%" }}>
                                <Form.Label>Plant:</Form.Label>
                            </Col>
                            <Col style={{ maxWidth: "15%", padding: "0" }}>
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
                            <Col xs={1} style={{ maxWidth: "5%" }}>
                                <Form.Label>From Date:</Form.Label>
                            </Col>
                            <Col xs={1} style={{ maxWidth: "13%", padding: "0" }}>
                                <Form.Control name="fromDate" type="date" onChange={(item) => this.handleChangeFromDate(item)} value={this.state.selectedFromDate} />
                            </Col>
                            <Col xs={1} style={{ maxWidth: "5%" }}>
                                <Form.Label>To Date:</Form.Label>
                            </Col>
                            <Col xs={1} style={{ maxWidth: "13%", padding: "0" }}>
                                <Form.Control name="toDate" type="date" onChange={(item) => this.handleChangeToDate(item)} value={this.state.selectedToDate} />
                            </Col>
                            <Col xs={2} style={{ maxWidth: "6%" }}>
                                <button type="button" className="btn btn-orange" style={{ width: "100%", minWidth: "50px" }} onClick={() => this.getRenderModuleCleaning()}>
                                    Go
                        </button>
                            </Col>
                            <Col xs={2} style={{ maxWidth: "10%" }}>

                                <Route render={({ history }) => (
                                    <button type="button" class="btn btn-primary" style={{ width: "100%", minWidth: "85px" }} onClick={() => { history.push('/moduleCleaningAddEdit') }}>
                                        <img src="/images/icons/fugue/plus-circle.png" alt="add module cleaning" title="Add Module Cleaning" style={{ float: "left", marginRight: "3" }} />
                                        Module Cleaning
                                    </button>)} />
                            </Col>
                        </div>
                    </div>
                    <div>
                        {this.props.displayMessage ? <Alert className="message success" variant="success" style={{ marginTop: "15px" }}>{this.props.displayMessage}</Alert> : null}
                    </div>
                    <div
                        style={{
                            height: '500px',
                            maxWidth: "1222px",
                            margin: "auto"
                        }}
                        className="ag-theme-material   ag-first-row-color">
                        <AgGridReact
                            columnDefs={this.createColumnDefs()}
                            pinnedTopRowData={this.state.moduleCleaning && this.state.moduleCleaning.length > 0 ? this.pinnedTopRowData() : null}
                            rowData={this.state.moduleCleaning}
                            context={{ componentParent: this }}
                            onGridReady={this.onGridReady}>
                        </AgGridReact>

                    </div>
                    <ModelPopUp title="Delete"
                        id={"gridFailureDelete"}
                        bodyContent="Are you sure want to delete this Module Cleaning?"
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

export default ModuleCleaning;
