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
        this.props.context.componentParent.onDelete(this.props.node.data.inverterDailyDataId);
    }
    render() {
        return (<div className="products-actions">
            <Link className="products-actions-link"
                to={{
                    pathname: "/inverterDailyAddEdit",
                    inverterDaily: this.props.data
                }}>
                <img src="/images/editIcon.png" alt="Edit" />
            </Link>
            <Link to="#" onClick={this.invokeDelete} title="Delete" >
                <img src="/images/cross-circle.png" alt="Delete" />
            </Link>
        </div>);
    }
}

class InverterDaily extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedPlanType: null,
            selectedInvTypsOptions: [],
            selectedProjectTypes: null,
            selectedFromDate: this.getMonthStartDate(),
            selectedToDate: this.getCurrentDate(),
            inverterName: this.props.inverterName,
            projectTypes: this.props.projectTypes,
            plantTypes: this.props.plantTypes,
            inverterDaily: this.props.inverterDaily,
            selectedPlantOptions: [],
            inverterTypes: [],
            selectedInverterId: [],
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
        this.props.clearInverterDailyData();
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
            this.setState({ selectedPlantType: selectedValue, selectedProjectTypes: null, selectedPlantOptions: [], selectedInvTypsOptions: [] });
        }
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

    handleChangePlants(value) {
        const selectedValue = value.name;
        if (selectedValue !== this.state.selectedPlantOptions) {
            this.props.getInvertersByPlantId(selectedValue);
            this.setState({ selectedPlantOptions: selectedValue });
        }
    }

    selectMultipleOption(value) {
        let plantIds = value && value.map((item) => item.id);
        // const format1 = {"{"plantIds":["";
        // const format2 = ]};
        // plantIds = format1+plantIds+format2;
        this.props.getInvertersByPlantId({ plantIds: plantIds });
        this.setState({ selectedPlantOptions: value });

    }

    onGridReady = (params) => {
        params.api.setHeaderHeight(70);
    }


    getPlantTypesDropDownOptions() {
        const options = this.state.plantTypes && this.state.plantTypes.map((plantTypes, key) => { return { id: plantTypes.plantId, name: plantTypes.plantName } });
        return options;
    }



    getInverterTypesDropDownOptions() {
        const options = this.state.inverterName && this.state.inverterName.map((inverterName, key) => { return { id: inverterName.inverterId, name: inverterName.inverterName } });
        return options;
    }

    selectInvTypeOptios(value) {
        const inverterIds = value && value.map((item) => item.id);
        this.setState({ selectedInverterId: inverterIds });
        this.setState({ selectedInvTypsOptions: value });

    }

    getRenderInverterDaily() {
        console.log(this.props)
        let plantIds = [];
        this.state.selectedPlantOptions && this.state.selectedPlantOptions.length > 0 && this.state.selectedPlantOptions.map((item) => { plantIds.push(item.id) });
        plantIds.length > 0 && this.props.getinverterDailyDetailsWithPlantIdsAndDate({ plantIds: plantIds, fromDate: this.state.selectedFromDate, toDate: this.state.selectedToDate, inverterIds: this.state.selectedInverterId });
    }

    createColumnDefs() {
        return [
            {
                headerName: "Sr No", field: "sr_no", cellClass: 'cell-wrap',
                autoHeight: true, width: 60, cellStyle: { 'white-space': 'normal' },
                // children: [
                //     {headerName: "Total", field: "gold", width: 60},
                // ]
            },
            {
                headerName: "Plant Name", field: "plantName", cellClass: 'cell-wrap',
                autoHeight: true, width: 123, cellStyle: { 'white-space': 'normal' },
                // children: [
                //     {headerName: "", field: "", width: 123},
                // ]
            },
            {
                headerName: "Inverter Name", field: "inverterName", cellClass: 'cell-wrap',
                autoHeight: true, width: 120, cellStyle: { 'white-space': 'normal' },
                // children: [
                //     {headerName: "", field: "", width: 120},
                // ]
            },
            {
                headerName: "Date", field: "date", cellClass: 'cell-wrap',
                autoHeight: true, width: 90, cellStyle: { 'white-space': 'normal' },
                // children: [
                //     {headerName: "", field: "", width: 90},
                // ]
            },
            {
                headerName: "Start Time", field: "startTime", cellClass: 'cell-wrap',
                autoHeight: true, width: 90, cellStyle: { 'white-space': 'normal' },
                // children: [
                //     {headerName: "", field: "", width: 90},
                // ]
            },
            {
                headerName: "Stop Time", field: "endTime", cellClass: 'cell-wrap',
                autoHeight: true, width: 90, cellStyle: { 'white-space': 'normal' },
                // children: [
                //     {headerName: "", field: "", width: 90},
                // ]
            },
            {
                headerName: "Energy Today", field: "calcEToday", cellClass: 'cell-wrap',
                autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' },
                // children: [
                //     {headerName: "", field: "sumenergy", width: 100},
                // ]
            },
            {
                headerName: "Ac Real Power", field: "acRealPower", cellClass: 'cell-wrap',
                autoHeight: true, width: 120, cellStyle: { 'white-space': 'normal' },
                // children: [
                //     {headerName: "", field: "sumac", width: 120},
                // ]
            },
            {
                headerName: "Dc Power", field: "dcPower", cellClass: 'cell-wrap',
                autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' },
                // children: [
                //     {headerName: "", field: "sumdc", width: 100},
                // ]
            },
            {
                headerName: "Energy Total", field: "eTotal", cellClass: 'cell-wrap',
                autoHeight: true, width: 120, cellStyle: { 'white-space': 'normal' },
                // children: [
                //     {headerName: "", field: "sumtotal", width: 120},
                // ]
            },
            {
                headerName: "Count", field: "count", cellClass: 'cell-wrap',
                autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' },
                // children: [
                //     {headerName: "", field: "", width: 100},
                // ]
            },
            {
                headerName: "Action",
                field: '',
                cellRendererFramework: ActionCellRenderer,
                width: 100,
                // children: [
                //     {headerName: "", field: "",width: 100},
                // ]
            }
        ];
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== null) {
            this.setState({
                projectTypes: nextProps.projectTypes,
                plantTypes: nextProps.plantTypes,
                inverterName: nextProps.inverterName,
                inverterDaily: nextProps.inverterDaily
            })
        }
    }

    onGridReady = (params) => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        params.api.setHeaderHeight(70);
    }

    onBtExport() {
        var params = {
            fileName: document.querySelector("#myGrid").value,
            sheetName: document.querySelector("#myGrid").value
        };
        this.gridApi.exportDataAsCsv(params);
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

    deleteRecord() {
        if (this.state.deleteID !== null) {
            this.props.deleteInverterDailyData(this.state.deleteID);
            //alert("deleted id"+ this.state.deleteID);
            this.onHide();
        }
    }

    pinnedTopRowData() {
        return [
            {
                sr_no: "Total",
                calcEToday: this.props.totalResult && this.props.totalResult.calcEToday ? this.props.totalResult.calcEToday : 0,
                acRealPower: this.props.totalResult && this.props.totalResult.acRealPower ? this.props.totalResult.acRealPower : 0,
                dcPower: this.props.totalResult && this.props.totalResult.dcPower ? this.props.totalResult.dcPower : 0,
                eTotal: this.props.totalResult && this.props.totalResult.eTotal ? this.props.totalResult.eTotal : 0,
                action: null
            }
        ]
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

        return (
            <div>
                <div>
                    <div className="top-filter">
                        <div className="row" style={{ alignItems: "center", margin: "0" }} >
                            <Col xs={1} style={{ maxWidth: "4%", padding: "5px" }}>
                                <Form.Label>Type:</Form.Label>
                            </Col>
                            <Col style={{ maxWidth: "16%", padding: "5px" }}>
                                <DropDown
                                    className="top-search-input form-control"
                                    Name="plantType"
                                    itemSource={this.props.plantType}
                                    value={this.state.selectedPlantType}
                                    handleChange={(item) => this.handleChangePlantType(item)}
                                />
                            </Col>
                            <Col xs={1} style={{ maxWidth: "5%", padding: "5px" }}>
                                <Form.Label>Project:</Form.Label>
                            </Col>
                            <Col style={{ maxWidth: "16%", padding: "5px" }}>
                                <DropDown
                                    className="top-search-input form-control"
                                    Name="plantName"
                                    itemSource={this.getDropDownProjectTypes()}
                                    value={this.state.selectedProjectTypes}
                                    handleChange={(item) => this.handleChangeProjectTypes(item)}
                                />
                            </Col>
                            <Col xs={1} style={{ maxWidth: "4%", padding: "5px" }}>
                                <Form.Label>Plant:</Form.Label>
                            </Col>
                            <Col xs={2} style={{ maxWidth: "10%", padding: "5px" }}>
                                <Picky
                                    value={this.state.selectedPlantOptions}
                                    options={this.getPlantTypesDropDownOptions()}
                                    //onChange={(item) => this.handleChangePlants(item)}
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
                            <Col xs={1} style={{ maxWidth: "3%", padding: "5px" }}>
                                <Form.Label>Inv:</Form.Label>
                            </Col>
                            <Col xs={2} style={{ maxWidth: "10%", padding: "5px" }}>
                                <Picky
                                    value={this.state.selectedInvTypsOptions}
                                    options={this.getInverterTypesDropDownOptions()}
                                    onChange={(val) => this.selectInvTypeOptios(val)}
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
                            <Col xs={1} style={{ maxWidth: "4%", padding: "5px" }}>
                                <Form.Label>From:</Form.Label>
                            </Col>
                            <Col style={{ maxWidth: "13%", padding: "5px" }}>
                                {/* </Col>
                        <Col> */}
                                <Form.Control name="fromDate" type="date" onChange={(item) => this.handleChangeFromDate(item)} value={this.state.selectedFromDate} />
                            </Col>
                            <Col xs={1} style={{ maxWidth: "4%", padding: "5px" }}>
                                <Form.Label>To:</Form.Label>
                            </Col>
                            <Col style={{ maxWidth: "13%", padding: "5px" }}>
                                {/* </Col>
                        <Col> */}
                                <Form.Control name="toDate" type="date" onChange={(item) => this.handleChangeToDate(item)} value={this.state.selectedToDate} />
                            </Col>
                            <Col xs={2} style={{ maxWidth: "5%", padding: "5px" }}>
                                <button type="button" className="btn btn-orange" onClick={() => this.getRenderInverterDaily()}>
                                    Go
                        </button>
                            </Col>
                            <Col xs={1} style={{ maxWidth: "5%", padding: "5px" }}>

                                <Route render={({ history }) => (
                                    <button type="button" class="btn btn-primary" style={{}} onClick={() => { history.push('/inverterDailyAddEdit') }}>
                                        <img src="/images/icons/fugue/plus-circle.png" alt="add Grid Failure" title="Add Grid Failure" style={{ float: "left", marginRight: "3" }} />
                                        {/* Add */}
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
                        className="ag-theme-material  ag-first-row-color">
                        <AgGridReact
                            columnDefs={this.createColumnDefs()}
                            pinnedTopRowData={this.state.inverterDaily && this.state.inverterDaily.length > 0 ? this.pinnedTopRowData() : null}
                            rowData={this.state.inverterDaily}
                            context={{ componentParent: this }}
                            onGridReady={this.onGridReady}>
                        </AgGridReact>

                    </div>
                    <ModelPopUp title="Delete"
                        id={"inverterDailyDelete"}
                        bodyContent="Are you sure want to delete this Inverter Daily?"
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

export default InverterDaily;