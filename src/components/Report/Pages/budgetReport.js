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
import { getBudgetExcelExport } from '../../../actions/action-Report';
import { connect } from 'react-redux'
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import exportFromJSON from 'export-from-json'

class BudgetReport extends Component {

    constructor(props) {
        super(props);
        this.state = {
            reportData: this.props.reportData,
            selectedPlanType: null,
            selectedFromDate: this.getCurrentDate(),
            selectedToDate: this.getCurrentDate(),
            plantTypes: this.props.plantTypes,
            selectedPlantOptions: [],
            budgetReportStatus: false,
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
                reportData: nextProps.reportData
            })
        }
        if (nextProps.reportData != undefined && this.state.budgetReportStatus === true) {
            nextProps.reportData && nextProps.reportData.length > 0 && this.exportToCSV(nextProps.reportData, "BudgetReport");
            this.setState({ lenderReportStatus: false });
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

    downloadData() {
        this.props.getBudgetExcelExport(this.state.selectedPlantOptions);
        this.setState({ budgetReportStatus: true });
        //this.state.reportData && this.state.reportData.length > 0 && this.exportToCSV(this.state.reportData, "BudgetReport");
    }

    exportToCSV(csvData, fName) {
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';
        const ws = XLSX.utils.json_to_sheet(csvData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fName + fileExtension);
    }

    // exportToCSV (csvData, fName){
    //         const data = csvData
    //         const fileName = fName
    //         const exportType = 'xls'
    //         data.length>0?exportFromJSON({ data, fileName, exportType }):alert('No data to download')
    //      }
    render() {
        return (
            <div>
                <div class="subHead">
                    <h5 style={{ fontSize: "15px", marginBottom: "0" }}>
                        Budget Report
                    </h5>
                </div>
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
                    </div>
                </div>
                <Row style={{ margin: "0" }}>
                <Col lg={5} md={5}></Col>
                    <Col lg={2} md={2} sm={6} className="large_percent_width">
                        <Button variant="primary" size="lg" style={{ width: "100%" }} onClick={() => this.downloadData()}>Download</Button>
                    </Col>
                    <Col></Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        plantsByType: state.plants.plantsByType,
        plantTypes: state.projectTypes.plantTypes,
        plants: state.plants.plants,
        reportData: state.ReportReducers.reportData,
        plantType: [{ displayText: "Select Plant Type", value: "-1" }, { displayText: "GROUNDMOUNT", value: "GROUNDMOUNT" }, { displayText: "ROOFTOP", value: "ROOFTOP" }]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPlantByType: (plantsByType) => dispatch(getPlantByType(plantsByType)),
        getAllPlants: () => dispatch(getAllPlants()),
        getBudgetExcelExport: (id) => dispatch(getBudgetExcelExport(id))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BudgetReport));