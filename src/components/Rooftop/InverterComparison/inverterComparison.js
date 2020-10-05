import React, {Component} from 'react';
import Nav from 'react-bootstrap/Nav';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Picky from 'react-picky';
import 'react-picky/dist/picky.css';
import '../../../styles/plant/plantFaultData.scss';
import DropDown from "../../Common/DropDown";
import { getPlantByType } from "../../../actions/moduleCleaningAnalysisActions";
import { getAllPlants } from "../../../actions/PlantActions";
import { getMakeGraphGauge } from '../../../actions/action-MakeGraphRoofTopInverterConf';
// import ModelPopUpRTDBINVCONF from '../../../Common/ModelPopUpDiagnosisRoofTopDashBoardInvConf';
import ModelPopUpDiagnosis from '../../Common/ModelPopUpDiagnosis';
import ModelPopUp from '../../Common/ModelPopUpAnalytics';

import Loader from 'react-loader-spinner';


import { 
    Route,
    Link,
    Switch,
    Redirect
  } from 'react-router-dom';
import { BrowserRouter, withRouter } from 'react-router-dom';
import ColumnBarChart from '../../Charts/columnBar';
import { connect } from 'react-redux';
import InverterGenerationBar from '../../Diagnosis/Charts/inverterGenerationChart';

class InverterComparison extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectedPlanType: null,
            selectedDate: this.getCurrentDate(),
            selectedGraphs: null,
            plantTypes: this.props.plantTypes,
            graphs: this.props.graphs,
            selectedPlantOptions: [],
            pageContent: this.props.pageContent,
            gaugeGraphsResult: this.props.gaugeGraphsResult,
            gaugeGraphs0: this.props.gaugeGraphs0,
            apiResponseData:null,
            apiResponse0: this.props.apiResponse0,
            popupGraph: null,
        }

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== null) {
            this.setState({
                plantTypes: nextProps.plantTypes,
                graphs: nextProps.graphs,
                gaugeGraphs0: nextProps.gaugeGraphs0,
                apiResponse0: nextProps.apiResponse0,
            })
        }
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

    handleChangeDate(event) {
        let fromDate = event.target.value;
        this.setState({ selectedDate: fromDate });
    }

    go(){
        let defaultprops = {
            "canvas": "",
            "dataFlag": 0,
            "externalDate": "2015-01-01",
            "externalParam": 1,
            "externalPlant": [this.state.selectedPlantOptions],
            "fromDate": "",
            "graphId": 305,
            "plant": [],//[],
            "toDate": ""
          }
          let inputParams = { pageID: 1, subPageID: 1,externalDate:this.state.selectedDate };
        this.props.getMakeGraphGauge({...defaultprops,...inputParams});    
    }
    onDoubleClick(index) {
        const graph = this.state["gaugeGraphs" + index];
        const apiResponse = this.state["apiResponse" + index];
        this.setState({ popupGraph: graph,apiResponseData:apiResponse })

    }

    onHide(){
        this.setState({ popupGraph: null })
        let defaultprops = {
            "canvas": "",
            "dataFlag": 0,
            "externalDate": "2015-01-01",
            "externalParam": 1,
            "externalPlant": [this.state.selectedPlantOptions],
            "fromDate": "",
            "graphId": 305,
            "plant": [],//[],
            "toDate": ""
          }
          let inputParams = { pageID: 1, subPageID: 1,externalDate:this.state.selectedDate };
        this.props.getMakeGraphGauge({...defaultprops,...inputParams});    
    }

    render(){
        const defaultProps = {
            showFilter: true,
            plantsShow: true,
            statisticsBtn: true,
            selectMultiplePlants: (graphId, value) => {
                this.selectMultiplePlants(graphId, value);
            },
            onDoubleClickEvent: (index) => {
                this.onDoubleClick(index)
            }

        }
        return(
            <BrowserRouter>
                <div className="animated fadeIn">
                <Card style={{maxWidth:"1264px", minHeight:"600px", margin:"auto"}}>
                    <Card.Body style={{ padding:"0"}}>
                        <div className="main-content" style={{ marginTop:"0"}}>
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
                                <Form.Label>Plant:</Form.Label>
                            </Col>
                            <Col style={{ maxWidth: "13%", padding: "0" }}>
                                <DropDown
                                    className="top-search-input form-control"
                                    Name="plants"
                                    itemSource={this.getDropDownPlants()}
                                    value={this.state.selectedPlantOptions}
                                    handleChange={(item) => this.handleChangePlants(item)}
                                />
                            </Col>
                            <Col xs={1} style={{ maxWidth: "5%" }}>
                                <Form.Label>DATE:</Form.Label>
                            </Col>
                            <Col xs={2} style={{ maxWidth: "20%" }} >
                                <Form.Control name="date" type="date" onChange={(item) => this.handleChangeDate(item)} value={this.state.selectedDate} />
                            </Col>
                        <Col></Col>
                        <Col xs={2} style={{ maxWidth: "7%" }}>
                                <button type="button" className="btn btn-orange" onClick= {() => this.go()}>
                                    Go
                            </button>
                        </Col>
                        {/* <Col xs={2} style={{ maxWidth: "8%" }}>

                            <Route render={({ history }) => (
                                <button type="button" class="btn btn-primary" style={{ width: "100%" }} onClick={() => { history.push('/WeatherStationAddEdit') }}>
                                    <img src="/images/icons/fugue/plus-circle.png" alt="add Grid Failure" title="Add Grid Failure" style={{ float: "left", marginRight: "3" }} />
                                    Add
                        </button>)} />
                        </Col> */}
                    </div>
                </div>
                    <Row>
                        <Col style={{ padding: "0.5%", paddingTop: "20px" }}>
                        <span className="leftBorder" style={{lineHeight: "280px"}}>2</span>
                            <Card className="fieldset-chart">
                            <legend className="boxShw" id="5dd212491cda8" style={{overflow:"hidden"}}>Day-Wise Generation This Month</legend>
                            <div style={{width:"95%",margin:"auto"}}>
                                <InverterGenerationBar {...this.state.gaugeGraphs0} {...defaultProps} index="0" />
                            </div> 
                            </Card> 
                        </Col>
                        </Row>
                        </div>
                        {this.state.popupGraph && <ModelPopUp title={this.state.popupGraph.graphName}
                            id="popUpModal"
                            bodyContent={this.state.popupGraph && this.state.popupGraph.series ? <InverterGenerationBar {...this.state.popupGraph} {...defaultProps} onDoubleClickEvent={null} /> :
                            <Loader type="Oval" color="#00BFFF" height={80} width={80} />}
                            apiResponse={this.state.apiResponseData}
                            graphId = {this.state.popupGraph.graphId}
                            showPopUp={this.state.popupGraph ? true : false}
                            secondaryBtnName="Close"
                            onSecondaryAction={this.onHide.bind(this)} 
                            primaryBtnName="ExportToCSV"
                            fromDateAction={this.handleChangeFromDate}
                            toDateAction = {this.handleChangeToDateModal}
                            value={this.state.selectedFromDate}
                            value={this.state.selectedToDate}
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
        plantTypes: state.projectTypes.plantTypes,
        plants: state.plants.plants,
        displayMessage: state.moduleCleaningReducer.displayMessage,
        graphs: state.ReportReducers.input,
        plantType: [{ displayText: "Select Plant Type", value: "-1" }, { displayText: "GROUNDMOUNT", value: "GROUNDMOUNT" }, { displayText: "ROOFTOP", value: "ROOFTOP" }],
        gaugeGraphsResult: state.ChartsReducer.gaugeGraphs,
        gaugeGraphs0: state.ChartsReducer.gaugeGraphs0,
        apiResponse0: state.ChartsReducer.apiResponse0,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPlantByType: (plantsByType) => dispatch(getPlantByType(plantsByType)),
        getAllPlants: () => dispatch(getAllPlants()),
        getMakeGraphGauge: (graphData) => dispatch(getMakeGraphGauge(graphData))     
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InverterComparison));