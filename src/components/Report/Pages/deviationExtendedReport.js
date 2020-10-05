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
import { getCSMEXTTDReportForAllPlant, getCSMEXTTDReportForAllPlantRT } from '../../../actions/action-Report';
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

class CellRenderer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div className="products-actions">
            <Link className="products-actions-link"
                to={{
                    pathname: "/performanceAnalysis",
                    index: this.props.data,

                }}>
                {this.props.data.name}
            </Link>
        </div>);
    }
}


class DeviationExtendedReport extends Component {
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
    
    componentDidMount() {
        if (this.props.match.params['type'] && this.props.match.params['quarter']) {
            let isvalid = false

            if (this.props.match.params['type'] == 'QTD') {
                this.state['selectedType'] = '1'
                isvalid = getDatefunc().find(qtd => qtd['value'] == this.props.match.params['quarter'])
                if (isvalid) {
                    this.state['selectedQTD'] = this.props.match.params['quarter']
                }
            }
            else if (this.props.match.params['type'] == 'YTD') {
                this.state['selectedType'] = '2'
                isvalid = this.props.years.find(year => year == this.props.match.params['quarter'])
                if (isvalid) {
                    this.state['selectedYear'] = this.props.match.params['quarter'].toString()
                }
            }

            if (isvalid) {
                this.getRenderDeviationReport()
            }
        }
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

    pinnedTopRowData() {
        console.log(this.props.totalResult)
        return [
            {
                rowIndex: '',
                date: '',
                name: 'GROSS PORTFOLIO',
                plantType: '',
                plfRange: '',
                actualGeneration: this.props.totalResultRT && this.props.totalResultRT.totalGrossActualGeneration ? this.props.totalResultRT.totalGrossActualGeneration : 0,
                budgetGeneration: this.props.totalResultRT && this.props.totalResultRT.totalGrossBudgetGeneration ? this.props.totalResultRT.totalGrossBudgetGeneration : 0,
                actualPlf: '',
                budgetPlf: '',
                deviation: this.props.totalResultRT && this.props.totalResultRT.totalGrossDeviation ? this.props.totalResultRT.totalGrossDeviation : 0,
                commentsdate: '',
                revenue: this.props.totalResultRT && this.props.totalResultRT.totalGrossRevenue ? this.props.totalResultRT.totalGrossRevenue : 0,
            },
            {
                rowIndex: '',
                date: '',
                name: 'GROUNDMOUNT PORTFOLIO',
                plantType: '',
                plfRange: '',
                actualGeneration: this.props.totalResult && this.props.totalResult.totalActualGeneration ? this.props.totalResult.totalActualGeneration : 0,
                budgetGeneration: this.props.totalResult && this.props.totalResult.totalBudgetGeneration ? this.props.totalResult.totalBudgetGeneration : 0,
                actualPlf: '',
                budgetPlf: '',
                deviation: this.props.totalResult && this.props.totalResult.totalDeviation ? this.props.totalResult.totalDeviation : 0,
                commentsdate: '',
                revenue: this.props.totalResult && this.props.totalResult.totalRevenue ? this.props.totalResult.totalRevenue : 0,
            }
        ]
    }

    pinnedTopRowDataRT() {
        return [
            {
                rowIndex: '',
                date: '',
                name: 'ROOFTOP PORTFOLIO',
                plantType: '',
                plfRange: '',
                actualGeneration: this.props.totalResultRT && this.props.totalResultRT.totalActualGenerationRT ? this.props.totalResultRT.totalActualGenerationRT : 0,
                budgetGeneration: this.props.totalResultRT && this.props.totalResultRT.totalBudgetGenerationRT ? this.props.totalResultRT.totalBudgetGenerationRT : 0,
                actualPlf: '',
                budgetPlf: '',
                deviation: this.props.totalResultRT && this.props.totalResultRT.totalDeviationRT ? this.props.totalResultRT.totalDeviationRT : 0,
                commentsdate: '',
                revenue: this.props.totalResultRT && this.props.totalResultRT.totalRevenueRT ? this.props.totalResultRT.totalRevenueRT : 0,
            }
        ]
    }

    createColumnDefs() {
        return [
            {
                headerName: "Sr No", ockPosition: true, valueGetter: rowIndex, cellClass: 'cell-wrap',
                autoHeight: true, width: 70, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Date", field: "date", cellClass: 'cell-wrap',
                autoHeight: true, width: 70, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Plant Name", field: "name", cellClass: 'cell-wrap',
                autoHeight: true, width: 70, cellStyle: { 'white-space': 'normal' },
                cellRendererFramework: CellRenderer
            }, {
                headerName: "Plant Type", field: "plantType", cellClass: 'cell-wrap',
                autoHeight: true, width: 80, cellStyle: { 'white-space': 'normal' }
            }, {
                headerName: "PLF Range", field: "plfRange", cellClass: 'cell-wrap',
                autoHeight: true, width: 80, cellStyle: { 'white-space': 'normal' }
            }, {
                headerName: "Actual Generation", field: "actualGeneration", cellClass: 'cell-wrap',
                autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
            }, {
                headerName: "Budget Generation", field: "budgetGeneration", cellClass: 'cell-wrap',
                autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
            }, {
                headerName: "Actual PLF", field: "actualPlf", cellClass: 'cell-wrap',
                autoHeight: true, width: 80, cellStyle: { 'white-space': 'normal' }
            }, {
                headerName: "Budget PLF", field: "budgetPlf", cellClass: 'cell-wrap',
                autoHeight: true, width: 80, cellStyle: { 'white-space': 'normal' }
            }, {
                headerName: "Generation/PLF Deviation", field: "deviation", cellClass: 'cell-wrap',
                autoHeight: true, width: 90, cellStyle: { 'white-space': 'normal' }
            }, {
                headerName: "Comments Added Date", field: "commentCreationDate", cellClass: 'cell-wrap',
                autoHeight: true, width: 90, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Revenue(INR)", field: "revenue", cellClass: 'cell-wrap',
                autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Previous Comments", field: "comments", cellClass: 'cell-wrap',
                autoHeight: true, width: 150, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Comments", field: "comments", cellClass: 'cell-wrap',
                autoHeight: true, width: 70, cellRendererFramework: ActionCellRenderer, cellStyle: { 'white-space': 'normal' }
            },
        ];
    }

    createColumnDefsRT() {
        return [
            {
                headerName: "Sr No", ockPosition: true, valueGetter: rowIndex, cellClass: 'cell-wrap',
                autoHeight: true, width: 70, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Date", field: "date", cellClass: 'cell-wrap',
                autoHeight: true, width: 70, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Plant Name", field: "name", cellClass: 'cell-wrap',
                autoHeight: true, width: 70, cellStyle: { 'white-space': 'normal' }
            }, {
                headerName: "Plant Type", field: "plantType", cellClass: 'cell-wrap',
                autoHeight: true, width: 80, cellStyle: { 'white-space': 'normal' }
            }, {
                headerName: "PLF Range", field: "plfRange", cellClass: 'cell-wrap',
                autoHeight: true, width: 80, cellStyle: { 'white-space': 'normal' }
            }, {
                headerName: "Actual Generation", field: "actualGeneration", cellClass: 'cell-wrap',
                autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
            }, {
                headerName: "Budget Generation", field: "budgetGeneration", cellClass: 'cell-wrap',
                autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
            }, {
                headerName: "Actual PLF", field: "actualPlf", cellClass: 'cell-wrap',
                autoHeight: true, width: 80, cellStyle: { 'white-space': 'normal' }
            }, {
                headerName: "Budget PLF", field: "budgetPlf", cellClass: 'cell-wrap',
                autoHeight: true, width: 80, cellStyle: { 'white-space': 'normal' }
            }, {
                headerName: "Generation/PLF Deviation", field: "deviation", cellClass: 'cell-wrap',
                autoHeight: true, width: 90, cellStyle: { 'white-space': 'normal' }
            }, {
                headerName: "Comments Added Date", field: "commentCreationDate", cellClass: 'cell-wrap',
                autoHeight: true, width: 90, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Revenue(INR)", field: "revenue", cellClass: 'cell-wrap',
                autoHeight: true, width: 70, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Previous Comments", field: "comments", cellClass: 'cell-wrap',
                autoHeight: true, width: 150, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Comments", field: "comments", cellClass: 'cell-wrap',
                autoHeight: true, width: 70, cellRendererFramework: ActionCellRenderer, cellStyle: { 'white-space': 'normal' }
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
                        value={this.state.selectedYear}
                        handleChange={(item) => this.handleChangeYears(item)}
                    />
                </Col>
            </React.Fragment>
        )
    }


    getRenderDeviationReport() {
        if (this.state.selectedType == "1") {
            const splitYear = this.state.selectedQTD.split(":");
            const fromDate = splitYear[0];
            const toDate = splitYear[1];
            this.props.getCSMEXTTDReportForAllPlant({ type: "GROUNDMOUNT", fromDate: fromDate, toDate: toDate });
            this.props.getCSMEXTTDReportForAllPlantRT({ type: "ROOFTOP", fromDate: fromDate, toDate: toDate });
        } else if (this.state.selectedType == "2") {
            const splitYear = this.state.selectedYear.split("-");
            const fromDate = splitYear[0] + "-" + "01" + "-" + "01";
            const toDate = splitYear[1] + "-" + "12" + "-" + "31";
            // this.props.getCSMEXTTDReportForAllPlant({type:this.state.selectedType,fromDate:fromDate,toDate:toDate});
            this.props.getCSMEXTTDReportForAllPlant({ plantType: "GROUNDMOUNT", fromDate: fromDate, toDate: toDate });
            this.props.getCSMEXTTDReportForAllPlantRT({ plantType: "ROOFTOP", fromDate: fromDate, toDate: toDate });
            // this.props.getCSMEXTTDReportForAllPlant({type:this.state.selectedType,fromDate:fromDate,toDate:toDate});
        }
        this.submitFilter();
    }

    render() {
        return (
            <div>
                <div className="subHead">
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
                        {this.state.selectedType && (this.state.selectedType == "1") && this.renderQuarterlyReport()}
                        {this.state.selectedType && (this.state.selectedType == "2") && this.renderYearlyReport()}
                        <Col></Col>
                        <Col lg={2} md={2} sm={6} className="large_percent_width">                                <Route render={({ history }) => (
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
        type: [{ displayText: "Select Type", value: "-1" }, { displayText: "QTD Report", value: "1" }, { displayText: "YTD Report", value: "2" }],
        QTDReport: getDatefunc(),
        years: getData(),
        reportData: state.ReportReducers.reportDeviationExtData,
        reportDataRT: state.ReportReducers.reportDeviationExtDataRT,
        totalResult: state.ReportReducers.totalResult,
        totalResultRT: state.ReportReducers.totalResultRT,
        // totalGrossResultRT:state.ReportReducers.totalGrossResultRT,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCSMEXTTDReportForAllPlant: (data) => dispatch(getCSMEXTTDReportForAllPlant(data)),
        getCSMEXTTDReportForAllPlantRT: (data) => dispatch(getCSMEXTTDReportForAllPlantRT(data)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DeviationExtendedReport));