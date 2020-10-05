import React, { Component } from "react";
import Card from 'react-bootstrap/Card';
import GaugeSpeedoMeter from "../../Charts/gaugeSpeedoMeter";
// import ReportFieldset from "../../Common/ReportFieldset";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../../../styles/Dashboard.scss';
import { makeGraphplf } from '../../../actions/action-makeGraphplf';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import CompareModal from "./compareModal";

class Quarter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            runApi: false,
            pageContent: this.props.pageContent,
            gaugeGraphsResult: this.props.gaugeGraphs,
            selectedPlant: [],
            chartInfo: this.props.chartInfo,
            gaugeGraphs0: [],
            gaugeGraphs1: [],
            gaugeGraphs2: [],
            gaugeGraphs3: [],

            gaugeGraphs01: [],
            gaugeGraphs02: [],
            gaugeGraphs03: [],

            gaugeGraphs11: [],
            gaugeGraphs12: [],
            gaugeGraphs13: [],

            gaugeGraphs21: [],
            gaugeGraphs22: [],
            gaugeGraphs23: [],

            gaugeGraphs31: [],
            gaugeGraphs32: [],
            gaugeGraphs33: []
        }
    }
    componentDidMount() {
        let defaultprops = {
            "allPlants": 1,
            "canvas": "",
            "dataFlag": 0,
            // "externalDate": "",
            "externalParam": "",
            "externalPlant": [],
            "fromDate": "",
            "graphId": "",
            "plant": [],
            "toDate": ""
        }
        let inputParams = { pageID: 1, subPageID: 5 };
        this.props.makeGraphplf({ ...defaultprops, ...inputParams });
        // this.props.makeGraphplf({ pageID: 1, subPageID: 5 });
    }

    getGraphResponse(graphID = "", value = []) {
        const plantID = value && value.length > 0 ? value.map((item) => { return item.id }) : [];
        let defaultprops = {
            "allPlants": plantID.length > 0 ? 0 : 1,
            "canvas": "",
            "dataFlag": 0,
            // "externalDate": "",
            "externalParam": "",
            "externalPlant": [],
            "fromDate": "",
            "graphId": graphID,
            "plant": plantID,
            "toDate": ""
        }
        let inputParams = { pageID: 1, subPageID: 5 };
        //this.props.getMakeGraphGauge({ ...defaultprops, ...inputParams }, "makeFGauge");
        this.props.makeGraphplf({ ...defaultprops, ...inputParams });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            gaugeGraphs0: nextProps.gaugeGraphs0,
            gaugeGraphs1: nextProps.gaugeGraphs1,
            gaugeGraphs2: nextProps.gaugeGraphs2,
            gaugeGraphs3: nextProps.gaugeGraphs3,

            gaugeGraphs00: nextProps.gaugeGraphs00,
            gaugeGraphs01: nextProps.gaugeGraphs01,
            gaugeGraphs02: nextProps.gaugeGraphs02,

            gaugeGraphs10: nextProps.gaugeGraphs10,
            gaugeGraphs11: nextProps.gaugeGraphs11,
            gaugeGraphs12: nextProps.gaugeGraphs12,

            gaugeGraphs20: nextProps.gaugeGraphs20,
            gaugeGraphs21: nextProps.gaugeGraphs21,
            gaugeGraphs22: nextProps.gaugeGraphs22,

            gaugeGraphs30: nextProps.gaugeGraphs30,
            gaugeGraphs31: nextProps.gaugeGraphs31,
            gaugeGraphs32: nextProps.gaugeGraphs32,
        })
    }

    handleCompare = (index) => {
        this.setState({ showModal: true, selectedGraph: index, runApi: true })
        // this.props.makeGraphfgauge({ pageID: 1, subPageID: 1 });
    }


    selectMultiplePlants(graphId, plants) {
        this.getGraphResponse(graphId, plants);
    }

    renderRow() {
        let graphArray = [];
        let graphs = [];
        let count = 0;
        this.props.pageContent && this.props.pageContent.graphIDs && this.props.pageContent.graphIDs.length > 0 && this.props.pageContent.graphIDs.map((index) => {
            count += 1;
            const graphObj = this.state.pageContent.graphNames && this.state.pageContent.graphNames.length > 0 && this.state.pageContent.graphNames.filter((flt) => flt.graphID == index)[0];
            let pageName = "";
            if (graphObj) {
                pageName = graphObj ? graphObj.graphName : "";
            }

            graphs.push(
                <Col>
                    <Card className="fieldset-chart">
                        <legend className="boxShw" id={index} style={{ overflow: "hidden" }}>{pageName}</legend>
                        <div style={{ width: "90%", margin: "auto" }}>

                        </div>
                    </Card>
                </Col>
            )

            if (count == 2) {
                graphArray.push(graphs);
                graphs = [];
                count = 0;
            }

        })

        return graphArray.map((index) => {
            return <Row>
                {index}
            </Row>
        })
    }


    render() {
        const ModalClose = () => {
            this.setState({ showModal: false });
            // this.setState({deleteShow:false});
        }
        return (
            <div>
                <Card style={{ maxWidth: "1264px", margin: "auto" }}>
                    <Card.Body style={{ padding: "0", height: "550px", overflow: "auto" }}>
                        <Row>
                            <Col lg={6} md={6} sm={12} style={{ padding: "0.5%", paddingTop: "20px" }}>

                                <Card className="fieldset-chart">
                                    <legend className="boxShw" id="5dd212491cda8" style={{ overflow: "hidden" }}>Quarter 1</legend>
                                    <div style={{ width: "95%", margin: "auto" }}>

                                        {this.state.gaugeGraphs0 && this.state.gaugeGraphs0.series ? <GaugeSpeedoMeter gIndex="0" showFilter={true} plantsShow={true} selectMultiplePlants={(graphId, plants) => this.selectMultiplePlants(graphId, plants)} handleCompare={(index) => this.handleCompare(index)} {...this.state.gaugeGraphs0} /> :
                                            <Loader type="Oval" color="#00BFFF" height={80} width={80} />}
                                    </div>
                                    <Row>
                                        <Col lg={4} md={4} sm={12} style={{ border: '0.1px solid #77777726' }}>
                                            <GaugeSpeedoMeter {...this.state.gaugeGraphs00} />

                                        </Col>
                                        <Col lg={4} md={4} sm={12} style={{ border: '0.1px solid #77777726' }}>
                                            <GaugeSpeedoMeter {...this.state.gaugeGraphs01} />

                                        </Col>
                                        <Col lg={4} md={4} sm={12} style={{ border: '0.1px solid #77777726' }}>
                                            <GaugeSpeedoMeter {...this.state.gaugeGraphs02} />

                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                            <Col lg={6} md={6} sm={12} style={{ display: "inline-block", padding: "0.5%", float: "right", paddingTop: "20px" }}>

                                <Card className="fieldset-chart">
                                    <legend className="boxShw1" id="5dd212491cda8" style={{ overflow: "hidden" }}>Quarter 2</legend>
                                    <div style={{ width: "95%", margin: "auto" }}>
                                        {this.state.gaugeGraphs1 && this.state.gaugeGraphs1.series ? <GaugeSpeedoMeter {...this.state.gaugeGraphs1} gIndex="1" id="984" selectMultiplePlants={(graphId, plants) => this.selectMultiplePlants(graphId, plants)} handleCompare={(index) => this.handleCompare(index)} /> :
                                            <Loader type="Oval" color="#00BFFF" height={80} width={80} />}
                                    </div>
                                    <Row>
                                        <Col lg={4} md={4} sm={12} style={{ border: '0.1px solid #77777726' }}>
                                            <GaugeSpeedoMeter {...this.state.gaugeGraphs10} />

                                        </Col>
                                        <Col lg={4} md={4} sm={12} style={{ border: '0.1px solid #77777726' }}>
                                            <GaugeSpeedoMeter {...this.state.gaugeGraphs11} />

                                        </Col>
                                        <Col lg={4} md={4} sm={12} style={{ border: '0.1px solid #77777726' }}>
                                            <GaugeSpeedoMeter {...this.state.gaugeGraphs12} />

                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={6} md={6} sm={12} style={{ padding: "0.5%", paddingTop: "20px" }}>

                                <Card className="fieldset-chart">
                                    <legend className="boxShw" id="5dd212491cda8" style={{ overflow: "hidden" }}>Quarter 3</legend>
                                    <div style={{ width: "95%", margin: "auto" }}>
                                        {this.state.gaugeGraphs2 && this.state.gaugeGraphs2.series ? <GaugeSpeedoMeter {...this.state.gaugeGraphs2} gIndex="2" id="985" selectMultiplePlants={(graphId, plants) => this.selectMultiplePlants(graphId, plants)} handleCompare={(index) => this.handleCompare(index)} /> :
                                            <Loader type="Oval" color="#00BFFF" height={80} width={80} />}

                                    </div>
                                    <Row>
                                        <Col lg={4} md={4} sm={12} style={{ border: '0.1px solid #77777726' }}>
                                            <GaugeSpeedoMeter {...this.state.gaugeGraphs20} />

                                        </Col>
                                        <Col lg={4} md={4} sm={12} style={{ border: '0.1px solid #77777726' }}>
                                            <GaugeSpeedoMeter {...this.state.gaugeGraphs21} />

                                        </Col>
                                        <Col lg={4} md={4} sm={12} style={{ border: '0.1px solid #77777726' }}>
                                            <GaugeSpeedoMeter {...this.state.gaugeGraphs22} />

                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                            <Col lg={6} md={6} sm={12} style={{ display: "inline-block", padding: "0.5%", float: "right", paddingTop: "20px" }}>

                                <Card className="fieldset-chart">
                                    <legend className="boxShw1" id="5dd212491cda8" style={{ overflow: "hidden" }}>Quarter 4</legend>
                                    <div style={{ width: "95%", margin: "auto" }}>
                                        {this.state.gaugeGraphs3 && this.state.gaugeGraphs3.series ? <GaugeSpeedoMeter {...this.state.gaugeGraphs3} gIndex="3" id="987" selectMultiplePlants={(graphId, plants) => this.selectMultiplePlants(graphId, plants)} handleCompare={(index) => this.handleCompare(index)} /> :
                                            <Loader type="Oval" color="#00BFFF" height={80} width={80} />}
                                    </div>
                                    <Row>
                                        <Col lg={4} md={4} sm={12} style={{ border: '0.1px solid #77777726' }}>
                                            <GaugeSpeedoMeter {...this.state.gaugeGraphs30} />

                                        </Col>
                                        <Col lg={4} md={4} sm={12} style={{ border: '0.1px solid #77777726' }}>
                                            <GaugeSpeedoMeter {...this.state.gaugeGraphs31} />

                                        </Col>
                                        <Col lg={4} md={4} sm={12} style={{ border: '0.1px solid #77777726' }}>
                                            <GaugeSpeedoMeter {...this.state.gaugeGraphs32} />

                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                    </Card.Body>
                    <footer className="darkBlueGradient">
                        <span>AFFORDABLE SOLAR POWER FOR GENERATIONS!</span>
                    </footer>
                </Card>
                {this.state.selectedGraph && <CompareModal show={this.state.showModal} onHide={ModalClose} selectedGraph={this.state.selectedGraph} runApi={this.state.runApi} />}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        gaugeGraphsResult: state.ChartsReducer.gaugeGraphs,
        gaugeGraphs0: state.ChartsReducer.gaugeGraphs0,
        gaugeGraphs1: state.ChartsReducer.gaugeGraphs1,
        gaugeGraphs2: state.ChartsReducer.gaugeGraphs2,
        gaugeGraphs3: state.ChartsReducer.gaugeGraphs3,

        gaugeGraphs00: state.ChartsReducer.gaugeGraphs00,
        gaugeGraphs01: state.ChartsReducer.gaugeGraphs01,
        gaugeGraphs02: state.ChartsReducer.gaugeGraphs02,

        gaugeGraphs10: state.ChartsReducer.gaugeGraphs10,
        gaugeGraphs11: state.ChartsReducer.gaugeGraphs11,
        gaugeGraphs12: state.ChartsReducer.gaugeGraphs12,

        gaugeGraphs20: state.ChartsReducer.gaugeGraphs20,
        gaugeGraphs21: state.ChartsReducer.gaugeGraphs21,
        gaugeGraphs22: state.ChartsReducer.gaugeGraphs22,

        gaugeGraphs30: state.ChartsReducer.gaugeGraphs30,
        gaugeGraphs31: state.ChartsReducer.gaugeGraphs31,
        gaugeGraphs32: state.ChartsReducer.gaugeGraphs32,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        makeGraphplf: (graphData) => dispatch(makeGraphplf(graphData))
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Quarter));
