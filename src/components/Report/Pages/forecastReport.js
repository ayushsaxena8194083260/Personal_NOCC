import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom'
import 'react-picky/dist/picky.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import '../../../styles/plant/plantFaultData.scss';
import DropDown from "../../Common/DropDown";
import { getPlantByType } from "../../../actions/moduleCleaningAnalysisActions";
import { getAllPlants } from "../../../actions/PlantActions";
import { getForecastReport } from '../../../actions/action-Report';
import { getForecastDashboard } from '../../../actions/action-Report';
import { connect } from 'react-redux'
// import * as FileSaver from 'file-saver';
// import * as XLSX from 'xlsx';
import Card from 'react-bootstrap/Card';
import exportFromJSON from 'export-from-json' ;
//import {ExcelFile, ExcelSheet} from "react-data-export";

class ForecastReport extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedDays: null,
            selectedWeightage: null,
            forecastData: this.props.forecastData,
            reportData: this.props.reportData,
            selectedPlanType: null,
            selectedFromDate: this.getCurrentDate(),
            selectedToDate: this.getCurrentDate(),
            plantTypes: this.props.plantTypes,
            selectedPlantOptions: [],
            overlayLoadingTemplate: '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>',
            overlayNoRowsTemplate: "<p class='message warning'>No Record found.</p>",
        };
    }

    getCurrentDate() {
        var today = new Date();
        var d = today.getDate();
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

    componentWillReceiveProps(nextProps) {
        if (nextProps !== null) {
            this.setState({
                plantTypes: nextProps.plantTypes,
                days: nextProps.days,
                forecastData: nextProps.forecastData
            })
            // if(nextProps.forecastData.length != 0){
            //     nextProps.forecastData && nextProps.forecastData.length > 0 && this.exportToCSV(nextProps.forecastData, "ForecastReport");
            // }
        }
    }

    handleChangePlantType(event) {
        const selectedValue = event.target.value;
        if (selectedValue !== this.state.selectedPlantType) {
            this.props.getPlantByType(selectedValue);
            this.setState({ selectedPlantType: selectedValue, selectedPlantOptions: null });
        }
    }

    handleChangePlants(event) {
        const selectedValue = event.target.value;
        this.setState({ selectedPlantOptions: selectedValue });
    }

    handleChangeDays(event) {
        const selectedValue = event.target.value;
        this.setState({ selectedDays: selectedValue });
    }

    handleChange(event) {
        const selectedValue = event.target.value;
        this.setState({ selectedWeightage: selectedValue });
    }

    getDropDownPlants() {
        let plants = [];
        plants.push({ displayText: "Select Plant", value: "0" })
        this.state.plantTypes && this.state.plantTypes.map((item) => {
            plants.push({ displayText: item.plantName, value: item.plantId })
        });

        return plants;
    }

    handleChangeFromDate(event) {
        let fromDate = event.target.value;
        this.setState({ selectedFromDate: fromDate });
    }

    handleChangeToDate(event) {
        let toDate = event.target.value;
        this.setState({ selectedToDate: toDate });
    }

    dateAdd(date, interval, units) {
        if(!(date instanceof Date))
          return undefined;
        var ret = new Date(date); //don't change original date
        var checkRollover = function() { if(ret.getDate() != date.getDate()) ret.setDate(0);};
        switch(String(interval).toLowerCase()) {
          case 'year'   :  ret.setFullYear(ret.getFullYear() + units); checkRollover();  break;
          case 'quarter':  ret.setMonth(ret.getMonth() + 3*units); checkRollover();  break;
          case 'month'  :  ret.setMonth(ret.getMonth() + units); checkRollover();  break;
          case 'week'   :  ret.setDate(ret.getDate() + 7*units);  break;
          case 'day'    :  ret.setDate(ret.getDate() + units);  break;
          case 'hour'   :  ret.setTime(ret.getTime() + units*3600000);  break;
          case 'minute' :  ret.setTime(ret.getTime() + units*60000);  break;
          case 'second' :  ret.setTime(ret.getTime() + units*1000);  break;
          default       :  ret = undefined;  break;
        }
        return ret;
      }

      getCurrentTime() {
        let currentDate = new Date();

        let seconds = Math.floor(currentDate / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);
        let days = Math.floor(hours / 24);

        hours = hours - (days * 24);
        minutes = minutes - (days * 24 * 60) - (hours * 60);
        minutes = minutes - 30;
        seconds = seconds - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60);

        this.setState({ displayTime: hours + ":" + minutes + ":" + seconds })
    }

    getDate(cDate) {
        const today = new Date(cDate);
        let dd = today.getDate();
        let mm = today.getMonth() + 1;

        const yyyy = today.getFullYear();
        if (dd < 10) {
            dd = "0" + dd;
        }
        if (mm < 10) {
            mm = "0" + mm;
        }
        return yyyy + "-" + mm + "-" + dd;
    }
    downloadData() {
        // const multiDataSet = [
        //     {
        //         columns: ["Name", "Salary", "Sex"],
        //         data: [
        //             ["Johnson", 30000, "Male"],
        //             ["Monika", 355000, "Female"],
        //             ["Konstantina", 20000, "Female"],
        //             ["John", 250000, "Male"],
        //             ["Josef", 450500, "Male"],
        //         ]
        //     },
        //     {
        //         xSteps: 1, // Will start putting cell with 1 empty cell on left most
        //         ySteps: 5, //will put space of 5 rows,
        //         columns: ["Name", "Department"],
        //         data: [
        //             ["Johnson", "Finance"],
        //             ["Monika", "IT"],
        //             ["Konstantina", "IT Billing"],
        //             ["John", "HR"],
        //             ["Josef", "Testing"],
        //         ]
        //     }
        // ];
        // return ( <ExcelFile>
        //     <ExcelSheet dataSet={multiDataSet} name="Organization"/>
        // </ExcelFile>)
        let today = new Date();
        let _todayDate = this.getDate(today);
        let inputParams = {
                "date": "2019-01-01",
                "fromDate": "2019-01-01",
                "insolationDate": "",
                "insolationDates": [
                  ""
                ],
                "insolationTime": [
                  {}
                ],
                "insolationValue1": 0,
                "insolationValue2": 0,
                "pageName": "",
                "plantId": 6,
                "tempMdule1": 0,
                "tempMdule2": 0,
                "time": "",
                "timeSlotId": "",
                "timeSlotName": "",
                "toDate": "2019-01-01",
                "variableId": 0,
                "weatherStationId": 0,
                "weightage": 1
              }
        let selectParams = { plantId: parseInt(this.state.selectedPlantOptions), date: this.state.selectedFromDate,fromDate: this.state.selectedFromDate, toDate: this.state.selectedToDate, tdays: parseInt(this.state.selectedDays), weightage:parseInt(this.state.selectedWeightage)}
        // 
        // this.getCurrentTime();
        let _todayDate1 = new Date();
        let displayTm = this.dateAdd(_todayDate1, "minute", -30);
        let _hours = displayTm.getHours();
        let _minutes = displayTm.getMinutes();
        let _seconds = displayTm.getSeconds();
        this.setState({displayTime: _hours+":"+_minutes+":"+_seconds});
        this.setState({ showPlantDetails: true })
        this.props.getForecastDashboard({ ...inputParams, ...selectParams });
    }
    // downloadData() {
    //     this.props.getForecastReport({ plantIds: [this.state.selectedPlantOptions], fromDate: this.state.selectedFromDate, toDate: this.state.selectedToDate });
    //    // this.state.reportData && this.state.reportData.length > 0 && this.exportToCSV(this.state.reportData, "ForecastReport");
    // }

    // exportToCSV(csvData, fileName) {
    //     const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    //     const fileExtension = '.xlsx';
    //     const ws = XLSX.utils.json_to_sheet(csvData);
    //     const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    //     const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    //     const data = new Blob([excelBuffer], { type: fileType });
    //     FileSaver.saveAs(data, fileName + fileExtension);
    // }
    exportToCSV (csvData, fName){
        const data = csvData;
        const fileName = fName
        const exportType = 'xls'
        data.length>0?exportFromJSON({ data, fileName, exportType }):alert('No data to download')
     }
    getDropDownDays() {
        return this.props.days && this.props.days.map((item) => { return { displayText: item, value: item } });
    }

    render() {
        return (
            <div>
                <Card className="add-fault-card">
                    <Card.Header as="h5">Forecast Report</Card.Header>
                    <Card.Body>
                        <Row>
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
                            <Form.Label>Plant:</Form.Label>


                        </Col>
                        <Col lg={2} md={2} sm={6} className="large_percent_width">
                                <DropDown
                                    className="top-search-input form-control"
                                    Name="plants"
                                    itemSource={this.getDropDownPlants()}
                                    value={this.state.selectedPlantOptions}
                                    handleChange={(item) => this.handleChangePlants(item)}
                                />
                            </Col>
                        
                      
                        <Col lg={1} md={1} sm={6} className="small_percent_width">
                            <Form.Label>No of Days:</Form.Label>


                        </Col>
                        <Col lg={2} md={2} sm={6} className="large_percent_width">
                                <DropDown
                                    className="top-search-input form-control"
                                    Name="days"
                                    itemSource={this.getDropDownDays()}
                                    value={this.state.selectedDays}
                                    handleChange={(item) => this.handleChangeDays(item)}
                                />
                            </Col>
                            <Col lg={1} md={1} sm={6} className="small_percent_width">
                            <Form.Label>Weighted:</Form.Label>


                        </Col>
                        <Col lg={2} md={2} sm={6} className="large_percent_width">
                                <Form.Control className="top-search-input" name="weightage" type="text" onChange={(item) => this.handleChange(item)} value={this.state.selectedWeightage} />
                            </Col>
                        
                            
                        <Col lg={1} md={1} sm={6} className="small_percent_width">
                            <Form.Label>From:</Form.Label>


                        </Col>
                        <Col lg={2} md={2} sm={6} className="large_percent_width">
                                <Form.Control className="top-search-input" name="fromDate" type="date" onChange={(item) => this.handleChangeFromDate(item)} value={this.state.selectedFromDate} />
                            </Col>
                            </Row>
                            <Row>
                            <Col lg={1} md={1} sm={6} className="small_percent_width">
                            <Form.Label>To:</Form.Label>


                        </Col>
                        <Col lg={2} md={2} sm={6} className="large_percent_width">
                                <Form.Control className="top-search-input" name="toDate" type="date" onChange={(item) => this.handleChangeToDate(item)} value={this.state.selectedToDate} />
                            </Col>
                            </Row>
                           
                        
                    <Row style={{ margin: "0" }}>
                        <Col></Col>
                        <Col lg={2} md={2} sm={6} className="large_percent_width">
                        
                                                    <Button variant="primary" size="lg" style={{ width: "100%" }} onClick={() => this.downloadData()}>Download</Button>
                        </Col>
                        <Col></Col>
                    </Row>
                </Card.Body>
                </Card>
            </div>
        );
    }
}

function getDays(){
    let i = 0;
    let days = [];
    days.push("Select Days");
    for (i=1;i<=60;i++){
        days.push(i);
    }
    return days;
}

const mapStateToProps = state => {
    return {
        plantsByType: state.plants.plantsByType,
        plantTypes: state.projectTypes.plantTypes,
        plants: state.plants.plants,
        plantType: [{ displayText: "Select Plant Type", value: "-1" }, { displayText: "GROUNDMOUNT", value: "GROUNDMOUNT" }, { displayText: "ROOFTOP", value: "ROOFTOP" }],
        days: getDays(),
        forecastData:state.ReportReducers.forecastData,
    //     days: [{displayText: "No of Days", value: "-1" },{displayText: "1", value: "1"},{displayText: "2", value: "2"},{displayText: "3", value: "3"},
    //     {displayText: "4", value: "4"},{displayText: "5", value: "5"},{displayText: "6", value: "6"},{displayText: "7", value: "7"},
    //     {displayText: "8", value: "8"},{displayText: "9", value: "9"},{displayText: "10", value: "10"},{displayText: "11", value: "11"}
    //  ]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPlantByType: (plantsByType) => dispatch(getPlantByType(plantsByType)),
        getAllPlants: () => dispatch(getAllPlants()),
        getForecastReport: (data) => dispatch(getForecastReport(data)),
        getForecastDashboard: (data) => dispatch(getForecastDashboard(data)),
    }
} 

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ForecastReport));
