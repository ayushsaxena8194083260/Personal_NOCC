import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { withRouter } from 'react-router-dom'
import { Route } from 'react-router-dom'
import 'react-picky/dist/picky.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import '../../../styles/plant/plantFaultData.scss';
import DropDown from "../../Common/DropDown";
import { AgGridReact } from 'ag-grid-react';
import { connect } from 'react-redux';
import { getDeviationReport } from '../../../actions/action-Report';
import { Link, } from 'react-router-dom'

const rowIndex = (params) => params.node.rowIndex + 1;

class ActionCellRenderer extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (<div className="products-actions">
            <Link className="products-actions-link"
                to={{
                    pathname: "/deviationExtendedReport",
                    deviationExtendedReport: this.props.data
                }}>
                <img src="/images/editIcon.png" alt="Edit" />
            </Link>
        </div>);
    }
}

class DeviationReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reportData: this.props.reportData,
            reportDataRT: this.props.reportDataRT,
            selectedType: null,
            selectedDate: this.getCurrentDate(),
            selectedMonthDate: this.getMonthStartDate(),
            selectedQTD: null,
            selectedYear: null,
            selectedFromDate: this.getMonthStartDate(),
            selectedToDate: this.getCurrentDate(),
        }
    }

    pinnedTopRowData() {
        console.log(this.props.totalResult)
        return [
            {
                rowIndex: '',
                plantName: 'GROSS PORTFOLIO',
                plantCapacityAc: this.props.totalResultRT && this.props.totalResultRT.totalAcCapacityGross ? this.props.totalResultRT.totalAcCapacityGross : 0,
                ccap: this.props.totalResultRT && this.props.totalResultRT.totalDcCapacityGross ? this.props.totalResultRT.totalDcCapacityGross : 0,
                insolation: '',
                modelGeneration: '',
                actualGeneration: this.props.totalResultRT && this.props.totalResultRT.totalActualGenerationGross ? this.props.totalResultRT.totalActualGenerationGross : 0,
                genDeviation: '',
                modelPlf: '',
                actualPlf: this.props.totalResultRT && this.props.totalResultRT.totalActualPlfGross ? this.props.totalResultRT.totalActualPlfGross : 0,
                plfDeviation: '',
                modelPR: '',
                actualPr: '',
                prDeviation: '',
            },
            {
                rowIndex: '',
                plantName: 'GROUNDMOUNT PORTFOLIO',
                plantCapacityAc: this.props.totalResult && this.props.totalResult.totalAcCapacity ? this.props.totalResult.totalAcCapacity : 0,
                ccap: this.props.totalResult && this.props.totalResult.totalDcCapacity ? this.props.totalResult.totalDcCapacity : 0,
                insolation: this.props.totalResult && this.props.totalResult.totalInsolation ? this.props.totalResult.totalInsolation : 0,
                modelGeneration: this.props.totalResult && this.props.totalResult.totalModelGeneration ? this.props.totalResult.totalModelGeneration : 0,
                actualGeneration: this.props.totalResult && this.props.totalResult.totalActualGeneration ? this.props.totalResult.totalActualGeneration : 0,
                genDeviation: this.props.totalResult && this.props.totalResult.totalGenDeviation ? this.props.totalResult.totalGenDeviation : 0,
                modelPlf: this.props.totalResult && this.props.totalResult.totalModelPlf ? this.props.totalResult.totalModelPlf : 0,
                actualPlf: this.props.totalResult && this.props.totalResult.totalActualPlf ? this.props.totalResult.totalActualPlf : 0,
                plfDeviation: this.props.totalResult && this.props.totalResult.totalPlfDeviation ? this.props.totalResult.totalPlfDeviation : 0,
                modelPR: this.props.totalResult && this.props.totalResult.totalModelPR ? this.props.totalResult.totalModelPR : 0,
                actualPr: this.props.totalResult && this.props.totalResult.totalActualPr ? this.props.totalResult.totalActualPr : 0,
                prDeviation: this.props.totalResult && this.props.totalResult.totalPrDeviation ? this.props.totalResult.totalPrDeviation : 0,
            }
        ]
    }

    pinnedTopRowDataRT() {
        console.log(this.props.totalResult)
        return [
            {
                rowIndex: '',
                plantName: 'ROOFTOP PORTFOLIO',
                plantCapacityAc: this.props.totalResultRT && this.props.totalResultRT.totalAcCapacityRT ? this.props.totalResultRT.totalAcCapacityRT : 0,
                ccap: this.props.totalResultRT && this.props.totalResultRT.totalDcCapacityRT ? this.props.totalResultRT.totalDcCapacityRT : 0,
                actualGeneration: this.props.totalResultRT && this.props.totalResultRT.totalActualGenerationRT ? this.props.totalResultRT.totalActualGenerationRT : 0,
                budgetGeneration: this.props.totalResultRT && this.props.totalResultRT.totalBudgetGenerationRT ? this.props.totalResultRT.totalBudgetGenerationRT : 0,
                actualPlf: this.props.totalResultRT && this.props.totalResultRT.totalActualPlfRT ? this.props.totalResultRT.totalActualPlfRT : 0,
                plfDeviation: this.props.totalResultRT && this.props.totalResultRT.totalPlfDeviationRT ? this.props.totalResultRT.totalPlfDeviationRT : 0,
                revenue: this.props.totalResultRT && this.props.totalResultRT.totalRevenuePRRT ? this.props.totalResultRT.totalRevenuePRRT : 0,
            }
        ]
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

    createColumnDefs() {
        return [
            {
                headerName: "Sr No", ockPosition: true, valueGetter: rowIndex, cellClass: 'cell-wrap',
                autoHeight: true, cellStyle: { 'white-space': 'normal' }, width: 70
            },
            {
                headerName: "Plant Name", field: "plantName", cellClass: 'cell-wrap',
                autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
            }, {
                headerName: "AC Capacity", field: "plantCapacityAc", cellClass: 'cell-wrap',
                autoHeight: true, width: 80, cellStyle: { 'white-space': 'normal' }
            }, {
                headerName: "DC Capacity", field: "ccap", cellClass: 'cell-wrap',
                autoHeight: true, width: 80, cellStyle: { 'white-space': 'normal' }
            }, {
                headerName: "Insolation (KWH/M2/Day)", field: "insolation", cellClass: 'cell-wrap',
                autoHeight: true, width: 95, cellStyle: { 'white-space': 'normal' }
            }, {
                headerName: "Model Generation (MWH)", field: "modelGeneration", cellClass: 'cell-wrap',
                autoHeight: true, width: 80, cellStyle: { 'white-space': 'normal' }
            }, {
                headerName: "Actual Generation (MWH)", field: "actualGeneration", cellClass: 'cell-wrap',
                autoHeight: true, width: 80, cellStyle: { 'white-space': 'normal' }
            }, {
                headerName: "Deviation", field: "genDeviation", cellClass: 'cell-wrap',
                autoHeight: true, width: 80, cellStyle: { 'white-space': 'normal' }
            }, {
                headerName: "Model PLF(On Dc Capacity)", field: "modelPlf", cellClass: 'cell-wrap',
                autoHeight: true, width: 90, cellStyle: { 'white-space': 'normal' }
            }, {
                headerName: "Actual PLF(On Dc Capacity)", field: "actualPlf", cellClass: 'cell-wrap',
                autoHeight: true, width: 90, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Deviation", field: "plfDeviation", cellClass: 'cell-wrap',
                autoHeight: true, width: 70, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Model PR", field: "modelPR", cellClass: 'cell-wrap',
                autoHeight: true, width: 70, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Actual PR", field: "actualPr", cellClass: 'cell-wrap',
                autoHeight: true, width: 70, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Deviation", field: "prDeviation", cellClass: 'cell-wrap',
                autoHeight: true, width: 70, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Remarks", field: "remarks", cellClass: 'cell-wrap',
                autoHeight: true, width: 70, cellStyle: { 'white-space': 'normal' }
            }
        ];
    }

    createColumnDefsRT() {
        return [
            {
                headerName: "Sr No", ockPosition: true, valueGetter: rowIndex, cellClass: 'cell-wrap',
                autoHeight: true, cellStyle: { 'white-space': 'normal' }, width: 70
            },
            {
                headerName: "Plant Name", field: "plantName", cellClass: 'cell-wrap',
                autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
            }, {
                headerName: "AC Capacity", field: "plantCapacityAc", cellClass: 'cell-wrap',
                autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
            }, {
                headerName: "DC Capacity", field: "ccap", cellClass: 'cell-wrap',
                autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
            }, {
                headerName: "Actual Generation (MWH)", field: "actualGeneration", cellClass: 'cell-wrap',
                autoHeight: true, width: 150, cellStyle: { 'white-space': 'normal' }
            }, {
                headerName: "Budget Generation (MWH)", field: "budgetGeneration", cellClass: 'cell-wrap',
                autoHeight: true, width: 150, cellStyle: { 'white-space': 'normal' }
            }, {
                headerName: "Actual PLF (On Dc Capacity)", field: "actualPlf", cellClass: 'cell-wrap',
                autoHeight: true, width: 150, cellStyle: { 'white-space': 'normal' }
            }, {
                headerName: "Generation/PLF Deviation", field: "plfDeviation", cellClass: 'cell-wrap',
                autoHeight: true, width: 150, cellStyle: { 'white-space': 'normal' }
            }, {
                headerName: "Revenue In MN(INR)", field: "revenue", cellClass: 'cell-wrap',
                autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
            },
        ];
    }

    submitFilter = () => {
        this.setState({ showGrid: true })
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

    handleChangeType(event) {
        const selectedValue = event.target.value;
        if (selectedValue !== this.state.selectedType) {
            this.setState({ selectedType: selectedValue });
        }
    }

    handleChangeDate(event) {
        const selectedDate = event.target.value;
        this.setState({ selectedDate: selectedDate });
    }

    handleChangeMonthDate(event) {
        const selectedDate = event.target.value;
        this.setState({ selectedMonthDate: selectedDate });
    }

    handleChangeQTD(event) {
        const selectedValue = event.target.value;
        if (selectedValue !== this.state.selectedType) {
            this.setState({ selectedQTD: selectedValue });
        }
    }

    handleChangeYears(event) {
        const selectedValue = event.target.value;
        if (selectedValue !== this.state.selectedType) {
            this.setState({ selectedYear: selectedValue });
        }
    }

    handleChangeFromDate(event) {
        let fromDate = event.target.value;
        this.setState({ selectedFromDate: fromDate });
    }

    handleChangeToDate(event) {
        let toDate = event.target.value;
        this.setState({ selectedToDate: toDate });
    }

    renderDailyReport() {
        return (
            <React.Fragment>
                <Col xs={1} style={{ maxWidth: "5%" }}>
                    <Form.Label>Date:</Form.Label>
                </Col>
                <Col xs={2} style={{ maxWidth: "16%" }} >
                    <Form.Control name="date" type="date" value={this.state.selectedDate} onChange={(val) => this.handleChangeDate(val)} />
                </Col>
            </React.Fragment>
        )
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== null) {
            this.setState({
                reportData: nextProps.reportData,
                reportDataRT: nextProps.reportDataRT
            })
        }
    }

    getDropDownYear() {
        return this.props.years && this.props.years.map((item) => { return { displayText: item, value: item } });
    }

    renderMonthlyReport() {
        return (
            <React.Fragment>
                <Col xs={1} style={{ maxWidth: "5%" }}>
                    <Form.Label>Date:</Form.Label>
                </Col>
                <Col xs={2} style={{ maxWidth: "16%" }} >
                    <Form.Control name="date" type="date" value={this.state.selectedMonthDate} onChange={(val) => this.handleChangeMonthDate(val)} />
                </Col>
            </React.Fragment>
        )
    }


    renderQuarterlyReport() {
        return (
            <React.Fragment>
                <Col xs={1} style={{ maxWidth: "5%" }}>
                    <Form.Label>Fiscal Quarter:</Form.Label>
                </Col>
                <Col style={{ maxWidth: "15%", padding: "0" }}>
                    <DropDown
                        className="top-search-input form-control"
                        Name="qtd"
                        itemSource={this.props.QTDReport}
                        value={this.state.selectedQTD}
                        handleChange={(item) => this.handleChangeQTD(item)}
                    />
                </Col>
            </React.Fragment>
        )
    }


    renderYearlyReport() {
        return (
            <React.Fragment>
                <Col xs={1} style={{ maxWidth: "5%" }}>
                    <Form.Label>Year:</Form.Label>
                </Col>
                <Col style={{ maxWidth: "15%", padding: "0" }}>
                    <DropDown
                        className="top-search-input form-control"
                        Name="years"
                        itemSource={this.getDropDownYear()}
                        value={this.state.selectedQTD}
                        handleChange={(item) => this.handleChangeYears(item)}
                    />
                </Col>
            </React.Fragment>
        )
    }

    renderCustomReport() {
        return (
            <React.Fragment>
                <Col xs={1} style={{ maxWidth: "5%" }}>
                    <Form.Label>From:</Form.Label>
                </Col>
                <Col xs={2} style={{ maxWidth: "20%" }} >
                    <Form.Control name="fromDate" type="date" onChange={(item) => this.handleChangeFromDate(item)} value={this.state.selectedFromDate} />
                </Col>
                <Col xs={1} style={{ maxWidth: "5%" }}>
                    <Form.Label>To:</Form.Label>
                </Col>
                <Col xs={2} style={{ maxWidth: "20%" }} >
                    <Form.Control name="toDate" type="date" onChange={(item) => this.handleChangeToDate(item)} value={this.state.selectedToDate} />
                </Col>
            </React.Fragment>
        )
    }

    getRenderDeviationReport() {
        if (this.state.selectedType === "1") {
            this.props.getDeviationReport({ dataFalg: "1", type: this.state.selectedType, from_date: this.state.selectedDate, to_date: this.state.selectedDate });
        } else if (this.state.selectedType === "2") {
            this.props.getDeviationReport({ type: this.state.selectedType, from_date: this.state.selectedDate, to_date: this.state.selectedDate });
        } else if (this.state.selectedType === "3") {
            const splitYear = this.state.selectedQTD.split(":");
            const fromDate = splitYear[0];
            const toDate = splitYear[1];
            this.props.getDeviationReport({ type: this.state.selectedType, from_date: fromDate, to_date: toDate });
        } else if (this.state.selectedType === "4") {
            const splitYear = this.state.selectedYear.split("-");
            const fromDate = splitYear[0] + "-01-01";
            const toDate = splitYear[1] + "-12-31";
            this.props.getDeviationReport({ type: this.state.selectedType, from_date: fromDate, to_date: toDate });
        } else if (this.state.selectedType === "5") {
            this.props.getDeviationReport({ type: this.state.selectedType, from_date: this.state.selectedDate, to_date: this.state.selectedDate });
        }
        this.submitFilter();
    }

    render() {
        return (
            <div>
                <div class="subHead">
                    <h5 style={{ fontSize: "15px", marginBottom: "0" }}>
                        Deviation Report
                </h5>
                </div>
                <div className="top-filters-lender" style={{}}>
                    <div className="row" style={{ alignItems: "center", margin: "0" }} >
                        <Col lg={1} md={1} sm={6} className="small_percent_width">
                            <Form.Label>Type:</Form.Label>


                        </Col>
                        <Col lg={2} md={2} sm={6} className="large_percent_width">
                            <DropDown
                                className="top-search-input form-control"
                                Name="plantType"
                                itemSource={this.props.type}
                                value={this.state.selectedType}
                                handleChange={(item) => this.handleChangeType(item)}
                            />
                        </Col>
                        {this.state.selectedType && (this.state.selectedType === "1") && this.renderDailyReport()}
                        {this.state.selectedType && (this.state.selectedType === "2") && this.renderMonthlyReport()}
                        {this.state.selectedType && (this.state.selectedType === "3") && this.renderQuarterlyReport()}
                        {this.state.selectedType && (this.state.selectedType === "4") && this.renderYearlyReport()}
                        {this.state.selectedType && (this.state.selectedType === "5") && this.renderCustomReport()}
                        <Col></Col>
                        <Col lg={2} md={2} sm={6} className="large_percent_width">
                            <Route render={({ history }) => (
                                <button type="button" className="btn btn-primary view_button" style={{ width: "90%" }} onClick={() => this.getRenderDeviationReport()}>
                                    GO
                                </button>)} />
                        </Col>
                    </div>
                    {this.state.showGrid ? <div>
                        <div
                            style={{
                                height: '500px',
                                maxWidth: "1222px",
                                margin: "auto",
                                marginTop: "20px"
                            }}
                            className="ag-theme-material">
                            <AgGridReact
                                key="grid"
                                columnDefs={this.createColumnDefs()}
                                rowData={this.state.reportData}
                                // pinnedTopRowData={this.pinnedTopRowData()}
                                pinnedTopRowData={this.state.reportData && this.state.reportData.length > 0 ? this.pinnedTopRowData() : null}
                                context={{ componentParent: this }}
                                onGridReady={this.onGridReady}>
                            </AgGridReact></div>
                        <div
                            style={{
                                height: '500px',
                                maxWidth: "1222px",
                                margin: "auto",
                                marginTop: "20px"
                            }}
                            className="ag-theme-material">
                            <AgGridReact
                                key="grid"
                                columnDefs={this.createColumnDefsRT()}
                                rowData={this.state.reportDataRT}
                                // pinnedTopRowData={this.pinnedTopRowDataRT()}//{this.state.reportDataRT && this.state.reportDataRT > 0?this.pinnedTopRowDataRT():null}
                                pinnedTopRowData={this.state.reportDataRT && this.state.reportDataRT.length > 0 ? this.pinnedTopRowDataRT() : null}
                                context={{ componentParent: this }}
                                onGridReady={this.onGridReady}>
                            </AgGridReact></div>
                    </div> : ""
                    }
                </div>

            </div>
        );
    }
}

function getDatefunc() {
    let years = [];
    const todayDate = new Date();
    const currMonth = todayDate.getMonth();
    const strYear = todayDate.getFullYear();
    if (strYear) {
        let year = parseInt(strYear) - 3;
        const endYear = parseInt(strYear) + 1;
        let i;
        years.push({ displayText: "Select Fiscal Year", value: 0 });
        for (i = parseInt(year); i < endYear; i++) {
            years.push({ displayText: i + " Jan-Mar", value: i + "-01-01:" + i + "-03-31" });
            years.push({ displayText: i + " Apr-Jun", value: i + "-04-01:" + i + "-06-30" });
            years.push({ displayText: i + " Jul-Sep", value: i + "-07-01:" + i + "-09-30" });
            years.push({ displayText: i + " Oct-Dec", value: i + "-10-01:" + i + "-12-31" });
        }
    }
    return years;
}

function getData() {
    let displayYears = [];
    const todayDate = new Date();
    const strYear = todayDate.getFullYear();
    if (strYear) {
        let year = parseInt(strYear) - 3;
        const endYear = parseInt(strYear);
        let i;
        displayYears.push("Select Year");
        for (i = parseInt(year); i <= endYear; i++) {
            let addoneYear = parseInt(i) + 1;
            displayYears.push(i + "-" + addoneYear);
        }
    }
    return displayYears;
}

const mapStateToProps = state => {
    return {
        type: [{ displayText: "Select Type", value: "-1" }, { displayText: "Daily Report", value: "1" }, { displayText: "MTD Report", value: "2" }, { displayText: "QTD Report", value: "3" }, { displayText: "YTD Report", value: "4" }, { displayText: "Custom Report", value: "5" }],
        QTDReport: getDatefunc(),
        years: getData(),
        reportData: state.ReportReducers.reportDeviationData,
        reportDataRT: state.ReportReducers.reportDeviationDataRT,
        totalResult: state.ReportReducers.totalResult,
        totalResultRT: state.ReportReducers.totalResultRT,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getDeviationReport: (data) => dispatch(getDeviationReport(data)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DeviationReport));