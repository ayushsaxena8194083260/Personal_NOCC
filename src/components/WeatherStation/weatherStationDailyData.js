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
// import { AllModules } from '@ag-grid-enterprise/all-modules';
const rowIndex = (params) => params.node.rowIndex + 1;

class ActionCellRenderer extends React.Component {
    constructor(props) {
        super(props);
        this.invokeDelete = this.invokeDelete.bind(this);
    }

    invokeDelete() {
        this.props.context.componentParent.onDelete(this.props.node.data.weatherDailyDataId);
    }
    render() {
        return (<div className="products-actions">
            <Link className="products-actions-link"
                to={{
                    pathname: "/weatherStationAddEdit",
                    weatherStation: this.props.data
                }}>
                <img src="/images/editIcon.png" alt="Edit" />
            </Link>
            <Link to="#" onClick={this.invokeDelete} title="Delete" >
                <img src="/images/cross-circle.png" alt="Delete" />
            </Link>
        </div>);
    }
}

class WeatherStation extends Component {

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
            selectedPlanType: null,
            selectedProjectTypes: null,
            selectedFromDate: this.getMonthStartDate(),
            selectedToDate: this.getCurrentDate(),
            projectTypes: this.props.projectTypes,
            plantTypes: this.props.plantTypes,
            weatherStation: this.props.weatherStation,
            weatherStationName: this.props.weatherStationName,
            selectedPlantOptions: [],
            headerHeight: "autoHeight",
            deleteID: null,
            showPopUp: false,
            gridRefersh: true
        };
        this.selectMultipleOption = this.selectMultipleOption.bind(this);
    }
    componentDidUpdate() {
        this.state.gridRefersh === false && this.setState({ gridRefersh: true });
    }
    componentDidMount() {
        
        // document.title = 'Plant Fault Data';
        this.props.clearWeatherStationData();
    }
    // componentWillReceiveProps(nextProps) {
    //     if (nextProps !== null) {
    //         this.setState({
    //             projectTypes: nextProps.projectTypes,
    //             plantTypes: nextProps.plantTypes,
    //             weatherStation: nextProps.weatherStation
    //         })
    //     }
    // }
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


    handleChangeFromDate(event) {
        let fromDate = event.target.value;
        this.setState({ selectedFromDate: fromDate });
    }

    handleChangeToDate(event) {
        console.log("Current date", this.state.selectedToDate)
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

    handleChangePlantFault(event) {
        const plantId = event.target.value;
        this.setState({ plantId });
    }
    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        params.api.setHeaderHeight(100);
    };

    onBtExport() {
        var params = {
            fileName: document.querySelector("#myGrid").value,
            sheetName: document.querySelector("#myGrid").value
        };
        this.gridApi.exportDataAsCsv(params);
    }
    getRenderWeatherStation() {
        // console.log(this.state)
        this.setState({ gridRefersh: false });
        let plantIds = [];
        this.state.selectedPlantOptions && this.state.selectedPlantOptions.length > 0 && this.state.selectedPlantOptions.map((item) => { plantIds.push(item.id) });
        plantIds.length > 0 && this.props.getWeatherDailyDetailsWithPlantIds({ plantIds: plantIds, fromDate: this.state.selectedFromDate, toDate: this.state.selectedToDate });
        console.log(this.state.weatherStation);

    }

    handleChangeType(event) {
        const selectedValue = event.target.value;
        this.props.getProjectNames(selectedValue);
        this.setState({ selectedValue });
        // console.log(selectedValue)
    }

    // handleChangePlantFault(event) {
    //     const plantId = event.target.value;
    //     this.setState({ plantId });
    //     console.log(plantId)
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
                headerName: "Sr No", valueGetter: rowIndex, cellClass: 'cell-wrap',
                autoHeight: true, width: 40, cellStyle: { 'white-space': 'normal' }, sortable: false
            },
            {
                headerName: "Plant Name", field: "plantName", cellClass: 'cell-wrap',
                autoHeight: true, width: 56, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Weather Station Name", field: "weatherStationName", cellClass: 'cell-wrap',
                autoHeight: true, width: 76, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Date", field: "date", cellClass: 'cell-wrap',
                autoHeight: true, width: 50, sort: "desc", cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Irrad. At Horiz.", field: "horizontalIrradiationWh", cellClass: 'cell-wrap',
                autoHeight: true, width: 52, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Irrad. At Array Tilt", field: "tiltIrradiationWh", cellClass: 'cell-wrap',
                autoHeight: true, width: 52, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Ambient Temp During Inverter", field: "ambientTempWh", cellClass: 'cell-wrap',
                autoHeight: true, width: 76, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Ambient Temp Averaged 24", field: "ambientTemp24", cellClass: 'cell-wrap',
                autoHeight: true, width: 83, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Module Temp During Inverter", field: "moduleTempWh", cellClass: 'cell-wrap',
                autoHeight: true, width: 72, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Wind Speed", field: "windSpeed24", cellClass: 'cell-wrap',
                autoHeight: true, width: 64, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Start Time", field: "startTime", cellClass: 'cell-wrap',
                autoHeight: true, width: 56, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Stop Time", field: "endTime", cellClass: 'cell-wrap',
                autoHeight: true, width: 56, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Count", field: "count", cellClass: 'cell-wrap',
                autoHeight: true, width: 63, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Time In Hrs", field: "timeInHrs", cellClass: 'cell-wrap',
                autoHeight: true, width: 62, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Time In Decimal", field: "timeInDec", cellClass: 'cell-wrap',
                autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Insol. At Horiz.", field: "horizontalInso", cellClass: 'cell-wrap',
                autoHeight: true, width: 80, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Insol. At Tilt", field: "tiltInso", cellClass: 'cell-wrap',
                autoHeight: true, width: 80, cellStyle: { 'white-space': 'normal' }
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
        
        let weatherStation = nextProps.weatherStation
        if (nextProps.weatherStationName  && nextProps.weatherStation ) {
            weatherStation = weatherStation.map(ws => {
                let currentWeatherStation = nextProps.weatherStationName.find(wsn => wsn['weatherStationId'] == ws['weatherStationId'])
                if(currentWeatherStation){
                    return {
                        ...ws,
                        weatherStationName: currentWeatherStation['weatherStationName']
                    }
                }else{
                    return {
                        ...ws,
                        weatherStationName: 'weatherStationName'
                    } 
                }
              
            })
        }

        if (nextProps !== null) {
            this.setState({
                projectTypes: nextProps.projectTypes,
                plantTypes: nextProps.plantTypes,
                weatherStation: weatherStation
            })
        }

        console.log(this.state, 'state');
        console.log(nextProps, 'nextProps')
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

    deleteRecord() {
        if (this.state.deleteID !== null) {
            this.props.deleteWeatherStationDailyData(this.state.deleteID);
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
                            <Col style={{ maxWidth: "12%", padding: "0" }}>
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
                            <Col style={{ maxWidth: "12%", padding: "0" }}>
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
                            <Col style={{ maxWidth: "13%", padding: "0" }}>
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
                            <Col xs={1} style={{ maxWidth: "14%", padding: "0" }}>
                                <Form.Control name="fromDate" type="date" onChange={(item) => this.handleChangeFromDate(item)} value={this.state.selectedFromDate} />
                            </Col>
                            <Col xs={1} style={{ maxWidth: "5%" }}>
                                <Form.Label>To Date:</Form.Label>
                            </Col>
                            <Col xs={1} style={{ maxWidth: "14%", padding: "0" }}>
                                <Form.Control name="toDate" type="date" onChange={(item) => this.handleChangeToDate(item)} value={this.state.selectedToDate} />
                            </Col>
                            <Col xs={2} style={{ maxWidth: "6%" }}>
                                <button type="button" className="btn btn-orange" style={{ width: "100%" }} onClick={() => this.getRenderWeatherStation()}>
                                    Go
                        </button>
                            </Col>
                            <Col xs={2} style={{ maxWidth: "8%" }}>

                                <Route render={({ history }) => (
                                    <button type="button" className="btn btn-primary" style={{ width: "100%" }} onClick={() => { history.push('/WeatherStationAddEdit') }}>
                                        <img src="/images/icons/fugue/plus-circle.png" alt="add Grid Failure" title="Add Grid Failure" style={{ float: "left", marginRight: "3" }} />
                                    Add
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
                        className="ag-theme-material">
                          {this.state.gridRefersh && <AgGridReact
                            // modules={this.state.modules}
                            defaultColDef={this.state.defaultColDef}
                            rowSelection={this.state.rowSelection}
                            excelStyles={this.state.excelStyles}
                            columnDefs={this.createColumnDefs()}
                            rowData={this.state.weatherStation}
                            context={{ componentParent: this }}
                            headerHeight={this.state.headerHeight}
                            onGridReady={this.onGridReady}
                        >

                        </AgGridReact>}
                    </div>
                    <ModelPopUp title="Delete"
                        id={"weatherStationDelete"}
                        bodyContent="Are you sure want to delete this Weather Station?"
                        showPopUp={this.state.showPopUp}
                        secondaryBtnName="No"
                        onSecondaryAction={this.onHide.bind(this)}
                        primaryBtnName="Reject"
                        onPrimaryAction={this.deleteRecord.bind(this)}
                    />
                </div>
            </div>
        );
    }
}

export default WeatherStation;