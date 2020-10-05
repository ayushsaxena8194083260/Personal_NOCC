import React, { Component } from 'react';
// import Nav from 'react-bootstrap/Nav';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import 'react-picky/dist/picky.css';
import '../../styles/plant/plantFaultData.scss';
import { getPlantByType } from "../../actions/PlantActions";
import Picky from 'react-picky';
import { BrowserRouter, withRouter } from 'react-router-dom';
import LineBasicChart from '../Charts/lineBasic';
import ColumnBarChart from '../Charts/columnBar';
import DataDefinedBar from '../Charts/DataDefinedBar';
import { connect } from 'react-redux';
import { getPageDetailAndGraphDetail } from '../../actions/action-analytics';
import { getMakeGraphGauge } from '../../actions/action-MakeGraphAnalytics';
import ColumnCombinedBarChart from '../Charts/columnCombinedBar';
import ModelPopUp from '../Common/ModelPopUpAnalytics';
import Loader from 'react-loader-spinner';
import exportFromJSON from 'export-from-json'

class AnalyticsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            plantTypes: ['GROUNDMOUNT', 'ROOFTOP'],
            plant_type: '',
            plant_name: '',
            selectedPlantOptions: [],
            selectedPlantType: '',
            showModal: false,
            selectedGraph: null,
            chartInfo: this.props.chartInfo,
            chartInfo1: [],
            chartInfo2: [],
            chartInfo3: [],
            chartInfo4: [],
            pageContent: this.props.pageContent,
            gaugeGraphsResult: this.props.gaugeGraphsResult,
            gaugeGraphs0: this.props.gaugeGraphs0,
            gaugeGraphs1: this.props.gaugeGraphs1,
            gaugeGraphs2: this.props.gaugeGraphs2,
            gaugeGraphs3: this.props.gaugeGraphs3,
            gaugeGraphsCat0: this.props.gaugeGraphsCat0,
            selectedDate: null,
            showGraph: false,
            popupGraph: null,
            apiResponseData: null,
            selectedFromDate: null,
            selectedToDate: null,
            apiResponse0: this.props.apiResponse0,
            apiResponse1: this.props.apiResponse1,
            apiResponse2: this.props.apiResponse2,
            apiResponse3: this.props.apiResponse3,
        }

    }


    componentDidMount() {
        // this.props.getMakeGraphGauge({ pageID: 1, subPageID: 1 });
        //    let pageID=2;
        //    this.props.getPageDetailAndGraphDetail(pageID)
        //    console.log(this.props.graphDetails);
    }
    onGo() {
        let defaultprops = {
            "allPlants": "",
            "canvas": "",
            "dataFlag": 0,
            "externalDate": "2019-11-14",
            "externalParam": "1",
            "externalPlant": [],
            "fromDate": "",
            "graphId": 225,
            "plant": [

            ],
            "toDate": ""
        }
        this.setState({ showGraph: true });
        let inputParams = { pageID: 1, subPageID: 1, externalPlant: [this.state.selectedPlantOptions.id], externalDate: this.state.selectedDate };
        this.props.getMakeGraphGauge({ ...defaultprops, ...inputParams });
    }
    handleChangePlantType(event) {
        const selectedValue = event.target.value;
        if (selectedValue !== this.state.selectedPlantType) {
            this.props.getPlantByType(selectedValue);
            this.setState({ selectedPlantType: selectedValue, selectedPlantOptions: null });
        }
    }

    selectMultipleOption(value) {
        this.setState({ selectedPlantOptions: value });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            gaugeGraphs0: nextProps.gaugeGraphs0,
            gaugeGraphs1: nextProps.gaugeGraphs1,
            gaugeGraphs2: nextProps.gaugeGraphs2,
            gaugeGraphs3: nextProps.gaugeGraphs3,
            gaugeGraphsCat0: nextProps.gaugeGraphsCat0,
            apiResponse0: nextProps.apiResponse0,
            apiResponse1: nextProps.apiResponse1,
            apiResponse2: nextProps.apiResponse2,
            apiResponse3: nextProps.apiResponse3,
        })
    }

    getPlantTypesDropDownOptions() {
        console.log("zzz", this.props.plantsByType)
        const options = this.props.plantsByType && this.props.plantsByType.map((plantTypes, key) => { return { id: plantTypes.plantId, name: plantTypes.plantName } });
        return options;
    }
    getDropDownPlants() {
        let plants = [];
        plants.push({ displayText: "Select Plant", value: "0" })
        this.state.plantTypes && this.state.plantTypes.map((item) => {
            plants.push({ displayText: item.plantName, value: item.plantId })
        });

        return plants;
    }
    handleChangeToDate(event) {
        const _selectedDate = event.target.value;
        this.setState({ selectedDate: _selectedDate });
    }

    onDoubleClick(index) {
        const graph = this.state["gaugeGraphs" + index];
        const apiResponse = this.state["apiResponse" + index];
        this.setState({ popupGraph: graph, apiResponseData: apiResponse })
    }

    onHide() {
        let defaultprops = {
            "allPlants": "",
            "canvas": "",
            "dataFlag": 0,
            "externalDate": "2019-11-14",
            "externalParam": "1",
            "externalPlant": [],
            "fromDate": "",
            "graphId": 225,
            "plant": [

            ],
            "toDate": ""
        }
        this.setState({ showGraph: true });
        let inputParams = { pageID: 1, subPageID: 1, externalPlant: [this.state.selectedPlantOptions.id], externalDate: this.state.selectedDate };
        this.props.getMakeGraphGauge({ ...defaultprops, ...inputParams });
        this.setState({ popupGraph: null })
    }


    exportToCSV(csvData, fName) {
        const data = csvData
        const fileName = fName
        const exportType = 'xls'
        data.length > 0 ? exportFromJSON({ data, fileName, exportType }) : alert('No data to download')
    }

    modalGraph() {
        let defaultprops = {
            "allPlants": "",
            "canvas": "",
            "dataFlag": 0,
            "externalDate": "2019-11-14",
            "externalParam": "1",
            "externalPlant": [],
            "fromDate": this.state.selectedFromDate,
            "graphId": 225,
            "plant": [

            ],
            "toDate": this.state.selectedToDate
        }
        this.setState({ showGraph: true });
        let inputParams = { pageID: 1, subPageID: 1, externalPlant: [this.state.selectedPlantOptions.id], externalDate: this.state.selectedDate };
        this.props.getMakeGraphGauge({ ...defaultprops, ...inputParams });
    }
    render() {
        const defaultProps = {
            showFilter: true,
            plantsShow: true,
            statisticsBtn: true,
            // statisticsText: "Plant statistics",
            selectMultiplePlants: (graphId, value) => {
                this.selectMultiplePlants(graphId, value);
            },
            onDoubleClickEvent: (index) => {
                this.onDoubleClick(index)
            }

        }
        return (
            <BrowserRouter>
                <div className="animated fadeIn analytics">
                    <Card className="width-Analytics" style={{ maxWidth: "1264px", minHeight: "600px", marginLeft: "auto" }}>
                        <Card.Body style={{ padding: "0" }}>
                            <div className="main-content" style={{ marginTop: "0" }}>
                                <div className="top-filter">
                                    <div className="row" style={{ alignItems: "center", margin: "0" }} >
                                    <Col lg={1} md={1} sm={6} className="small_percent_width">
                            <Form.Label>Type:</Form.Label>
                            </Col>
                            <Col lg={2} md={2} sm={6} className="large_percent_width">
                                            <select className="top-search-input form-control" width='300px' name="plant_type" onChange={(item) => this.handleChangePlantType(item)}>
                                                value={this.state.plant_type} plant_type={this.state.plant_type}
                                                <option >Select Plant Type</option>
                                                {this.state.plantTypes.map((plantType, key) => <option key={plantType}>{plantType}</option>)}
                                            </select>
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
                                                multiple={false}
                                                includeSelectAll={false}
                                                includeFilter={false}
                                                dropdownHeight={250}
                                            //filterPlaceholder={placeholder}
                                            />
                                        </Col>
                                        <Col lg={1} md={1} sm={6} className="small_percent_width">
                            <Form.Label>Date:</Form.Label>
                            </Col>
                            <Col lg={2} md={2} sm={6} className="large_percent_width">
                                            <Form.Control className="top-search-input"  lg={1} md={1} sm={6} name="toDate" type="date" value={this.state.toDate} onChange={(val) => this.handleChangeToDate(val)} />
                                        </Col>
                                        <Col></Col>
                                        <Col lg={1} md={1} sm={6} className="small_percent_width">
                                            <button type="button" className="btn btn-orange view_button" onClick={() => this.onGo()}>
                                                Go
                            </button>
                                        </Col>
                                    </div>
                                </div>
                                {this.state.showGraph && <div>
                                    <Row>
                                        <Col lg={6} md={6} sm={6} style={{ padding: "0.5%", paddingTop: "20px" }}>
                                            <span className="leftBorder" style={{ lineHeight: "295px" }}>1</span>

                                            <Card className="fieldset-chart">
                                                <legend className="boxShw boxshow" id="5dd212491cda8" style={{ overflow: "hidden" }}>Plant Power Vs Insolation</legend>
                                                <div style={{ width: "95%", margin: "auto" }}>
                                                    {this.state.gaugeGraphs0 && this.state.gaugeGraphs0.series && <LineBasicChart {...this.state.gaugeGraphs0} enabled={false} {...defaultProps} index={0} />}
                                                </div>
                                            </Card>
                                        </Col>
                                        <Col lg={6} md={6} sm={6} style={{ padding: "0.5%", paddingTop: "20px" }}>
                                        <span className="leftBorder" style={{ lineHeight: "295px" }}>2</span>

                                            <Card className="fieldset-chart">
                                                <legend className="boxShw boxshow" id="5dd212491cda8" style={{ overflow: "hidden" }}>Comparative Intelligence-Inverter Level</legend>

                                                <div style={{ width: "95%", margin: "auto" }}>
                                                    {this.state.gaugeGraphs1 && this.state.gaugeGraphs1.series && <LineBasicChart {...this.state.gaugeGraphs1} enabled={false} {...defaultProps} index={1} />}
                                                </div>
                                            </Card>
                                        </Col>
                                   
                                        <Col lg={6} md={6} sm={6} style={{ padding: "0.5%", paddingTop: "20px" }}>
                                            <span className="leftBorder" style={{ lineHeight: "295px" }}>3</span>
                                            <Card className="fieldset-chart">
                                                <legend className="boxShw boxshow" id="5dd212491cda8" style={{ overflow: "hidden" }}>Day-Wise Generation This Month</legend>
                                                <div style={{ width: "95%", margin: "auto" }}>
                                                    {this.state.gaugeGraphs2 && this.state.gaugeGraphs2.series && <LineBasicChart {...this.state.gaugeGraphs2} enabled={false} {...defaultProps} index={2} />}
                                                </div>
                                            </Card>
                                        </Col>
                                        <Col  lg={6} md={6} sm={6} style={{ padding: "0.5%", paddingTop: "20px" }}>
                                            <span className="leftBorder" style={{ lineHeight: "295px" }}>4</span>
                                            <Card className="fieldset-chart">
                                                <legend className="boxShw boxshow" id="5dd212491cda8" style={{ overflow: "hidden" }}>Monthly Generation & PLF</legend>
                                                <div style={{ width: "95%", margin: "auto" }}>
                                                    {this.state.gaugeGraphs3 && this.state.gaugeGraphs3.series && <DataDefinedBar {...this.state.gaugeGraphs3} {...defaultProps} index={3} />}
                                                </div>
                                            </Card>
                                        </Col>
                                   
                                    </Row>
                                    <Row>
                               </Row>
                                </div>
                                }
                                {/* </div> :''} */}
                            </div>
                            {this.state.popupGraph && <ModelPopUp title={this.state.popupGraph.graphName}
                                {...this.state.showGraph = false}
                                id="popUpModal"
                                bodyContent={this.state.popupGraph && this.state.popupGraph.series ? <LineBasicChart {...this.state.popupGraph} {...defaultProps} onDoubleClickEvent={null} /> :
                                    <Loader type="Oval" color="#00BFFF" height={80} width={80} />}
                                apiResponse={this.state.apiResponseData}
                                graphId={this.state.popupGraph.graphId}
                                plantName={this.state.selectedPlantOptions.name}
                                selectedPlantIds={this.state.selectedPlantOptions.id}
                                showPopUp={this.state.popupGraph ? true : false}
                                secondaryBtnName="Close"
                                onSecondaryAction={this.onHide.bind(this)}
                                primaryBtnName="ExportToCSV"
                                fromDateAction={this.handleChangeFromDate}
                                toDateAction={this.handleChangeToDateModal}
                                value={this.state.selectedFromDate}
                                value={this.state.selectedToDate}
                            // goBtnName={this.modalGraph()}
                            // onPrimaryAction={this.exportToCSV(this.props.gaugeGraphs0.series, "diagnosis")}                      
                            />}
                        </Card.Body>
                    </Card>
                </div>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = state => {
    return {
        plantsByType: state.plants.plantsByType,
        graphDetails: state.analyticsReducer.graphDetails,
        plantType: [{ displayText: "Select Plant Type", value: "-1" }, { displayText: "GROUNDMOUNT", value: "GROUNDMOUNT" }, { displayText: "ROOFTOP", value: "ROOFTOP" }],
        gaugeGraphsResult: state.ChartsReducer.gaugeGraphs,
        gaugeGraphs0: state.ChartsReducer.gaugeGraphs0,
        gaugeGraphs1: state.ChartsReducer.gaugeGraphs1,
        gaugeGraphs2: state.ChartsReducer.gaugeGraphs2,
        gaugeGraphs3: state.ChartsReducer.gaugeGraphs3,
        gaugeGraphsCat0: state.ChartsReducer.categories0,
        gaugeGraphsCat1: state.ChartsReducer.categories1,
        gaugeGraphsCat2: state.ChartsReducer.categories2,
        gaugeGraphsCat3: state.ChartsReducer.categories3,
        apiResponse0: state.ChartsReducer.apiResponse0,
        apiResponse1: state.ChartsReducer.apiResponse1,
        apiResponse2: state.ChartsReducer.apiResponse2,
        apiResponse3: state.ChartsReducer.apiResponse3,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPlantByType: (plantsByType) => dispatch(getPlantByType(plantsByType)),
        getPageDetailAndGraphDetail: (pageID) => dispatch(getPageDetailAndGraphDetail(pageID)),
        getMakeGraphGauge: (graphData) => dispatch(getMakeGraphGauge(graphData))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AnalyticsComponent));