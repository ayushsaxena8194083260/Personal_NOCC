import React, { Component } from "react";
import Card from 'react-bootstrap/Card';
import GaugeSpeedoMeter from "../../Charts/gaugeSpeedoMeter";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../../../styles/Dashboard.scss';
import 'react-picky/dist/picky.css';
import GaugeGraph from '../../Common/gaugeGraph';
//import { makeGraphfgauge } from '../../../actions/action-compareModelmakeGraphfgauge';
import { getMakeGraphGauge } from '../../../actions/action-dashboardMakeGraph';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class CompareModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            runAPI: this.props.runAPI,
            selectedGraph: null,
            selectedPlant: [],
            chartInfo: this.props.chartInfo,
            chartInfo1: [],
            chartInfo2: [],
            chartInfo3: [],
            chartInfo4: [],
            pageContent: this.props.pageContent,
            gaugeGraphsResult: this.props.gaugeGraphsResult,
            gaugeGraphs0: this.props.gaugeGraphs0,
            gaugeGraphs1: this.props.gaugeGraphs1
        }

    }

    getGraphResponse(graphID = "", value = []) {
        const plantID = value && value.length > 0 ? value.map((item) => { return item.id }) : [];
        let defaultprops = {
            "allPlants": plantID.length > 0 ? 0 : 1,
            "canvas": "",
            "dataFlag": 0,
            "externalDate": "",
            "externalParam": "",
            "externalPlant": [],
            "fromDate": "",
            "graphId": graphID,
            "plant": plantID,
            "toDate": ""
        }
        let inputParams = { pageID: 1, subPageID: 1 };
        //this.props.getMakeGraphGauge({ ...defaultprops, ...inputParams }, "makeFGauge");
        //this.props.makeGraphfgauge({ ...defaultprops, ...inputParams });
    }

    componentDidMount() {
        let defaultprops = {
            "allPlants": 1,
            "canvas": "",
            "dataFlag": 0,
            "externalDate": "",
            "externalParam": "",
            "externalPlant": [],
            "fromDate": "",
            "graphId": "",
            "plant": [],
            "toDate": ""
        }
        let inputParams = { pageID: 1, subPageID: 1 };
        if (this.state.runAPI) {
            // this.props.makeGraphfgauge({ ...defaultprops, ...inputParams });
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            gaugeGraphs0: nextProps.gaugeGraphs0,
            gaugeGraphs1: nextProps.gaugeGraphs1
        });
    }

    selectMultiplePlants(graphId, plants) {
        this.getGraphResponse(graphId, plants);
    }

    render() {
        return (
            <div className="modal-main">
                <Modal {...this.props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Title>Generation Compare</Modal.Title>
                    <Modal.Body>
                        <Row>
                            <Col style={{ padding: "0.5%", paddingTop: "20px" }}>
                                <Card className="fieldset-chart">
                                    <legend className="boxShw" id="5dd212491cda8" style={{ overflow: "hidden" }}>{this.props.graphName}</legend>
                                    <div style={{ width: "95%", margin: "auto" }}>

                                        {this.state.gaugeGraphs0 && this.state.gaugeGraphs0.series ? <GaugeSpeedoMeter showFilter={false} plantsShow={false} selectMultiplePlants={(graphId, plants) => this.selectMultiplePlants(graphId, plants)} handleCompare={() => this.handleCompare(this.state.gaugeGraphs0)} {...this.state.gaugeGraphs0} /> :
                                            <Loader key="gaugeGraphs0" type="Oval" color="#00BFFF" height={80} width={80} />}
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{ padding: "0.5%", paddingTop: "20px" }}>
                                <Card className="fieldset-chart">
                                    <legend className="boxShw" id="5dd212491cda8" style={{ overflow: "hidden" }}>{this.props.graphName}</legend>
                                    <div style={{ width: "95%", margin: "auto" }}>

                                        {this.state.gaugeGraphs1 && this.state.gaugeGraphs1.series ? <GaugeSpeedoMeter showFilter={true} plantsShow={true} selectMultiplePlants={(graphId, plants) => this.selectMultiplePlants(graphId, plants)} handleCompare={() => this.handleCompare(this.state.gaugeGraphs1)} {...this.state.gaugeGraphs1} /> :
                                            <Loader key="gaugeGraphs0" type="Oval" color="#00BFFF" height={80} width={80} />}
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>
                            Close
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    const compareGaugeGraphs = state.ChartsReducer["compareGaugeGraphs" + props.selectedGraph];

    return {
        gaugeGraphsResult: state.ChartsReducer.gaugeGraphs,
        gaugeGraphs0: compareGaugeGraphs ? compareGaugeGraphs[0] : [],
        gaugeGraphs1: compareGaugeGraphs ? compareGaugeGraphs[1] : [],
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        //makeGraphfgauge: (graphData) => dispatch(makeGraphfgauge(graphData)),
        // getMakeGraphGauge: (graphData, graphId) => dispatch(getMakeGraphGauge(graphData, graphId)),
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CompareModal));