import React, { Component } from "react";
import Card from 'react-bootstrap/Card';
import CommonGuageMeter from "../../Charts/commonGuageMeter";
import GaugeSpeedoMeter1 from "../../Charts/plantGridAvailability";
import ReportFieldset from "../../Common/ReportFieldset";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../../../styles/Dashboard.scss';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getMakeGraphGauge } from '../../../actions/action-dashboardMakeGraph';
import Loader from 'react-loader-spinner';
import ModelPopUp from '../../Common/ModelPopUp';

class GridAvailability extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // gaugeGraphs0: this.props.gaugeGraphs0,
            // gaugeGraphs1: this.props.gaugeGraphs1,
            // gaugeGraphs2: this.props.gaugeGraphs2,
            // gaugeGraphs3: this.props.gaugeGraphs3
            gaugeGraphs0: [],
            gaugeGraphs1: [],
            gaugeGraphs2: [],
            gaugeGraphs3: [],
            popupGraph: null
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            gaugeGraphs0: nextProps.gaugeGraphs0,
            gaugeGraphs1: nextProps.gaugeGraphs1,
            gaugeGraphs2: nextProps.gaugeGraphs2,
            gaugeGraphs3: nextProps.gaugeGraphs3
        })
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
        let inputParams = { pageID: 1, subPageID: 7 };
        this.props.getMakeGraphGauge({ ...defaultprops, ...inputParams }, "makeGauge");
        // this.props.makeGraphfyrgauge({ pageID: 1, subPageID: 7 });

    }

    selectMultiplePlants(graphId, value) {
        const plantID = value && value.length > 0 ? value.map((item) => { return item.id }) : [];
        let defaultprops = {
            "allPlants": 0,
            "canvas": "",
            "dataFlag": 0,
            "externalDate": "",
            "externalParam": "",
            "externalPlant": [],
            "fromDate": "",
            "graphId": graphId,
            "plant": plantID,
            "toDate": ""
        }
        let inputParams = { pageID: 1, subPageID: 7 };
        this.props.getMakeGraphGauge({ ...defaultprops, ...inputParams }, "makeGauge");
    }

    onDoubleClick(index) {
        const graph = this.state["gaugeGraphs" + index];
        this.setState({ popupGraph: graph })
    }

    onHide() {
        this.setState({ popupGraph: null })
    }


    render() {
        const defaultProps = {
            showFilter: true,
            plantsShow: true,
            statisticsBtn: true,
            statisticsText: "Gird statistics",
            selectMultiplePlants: (graphId, value) => {
                this.selectMultiplePlants(graphId, value);
            },
            onDoubleClickEvent: (index) => {
                this.onDoubleClick(index)
            }

        }
        return (
            <div>
                <Card style={{ maxWidth: "1264px", margin: "auto" }}>
                    <Card.Body style={{ padding: "0", height: "550px", overflow: "auto" }}>
                        <Row>
                            <Col lg={6} md={6} sm={12} style={{ padding: "0.5%", paddingTop: "20px" }}>
                                <Card className="fieldset-chart">
                                    <legend className="boxShw" id="5dd212491cda8" style={{ overflow: "hidden" }}>DTD - Grid availability</legend>
                                    <div style={{ width: "90%", margin: "auto" }}>
                                        {this.state.gaugeGraphs0 && this.state.gaugeGraphs0.series ? <CommonGuageMeter {...this.state.gaugeGraphs0} {...defaultProps} index="0" /> :
                                            <Loader type="Oval" color="#00BFFF" height={80} width={80} />}
                                    </div>
                                </Card>
                            </Col>
                            <Col lg={6} md={6} sm={12} style={{ padding: "0.5%", paddingTop: "20px" }}>
                                <Card className="fieldset-chart">
                                    <legend className="boxShw" id="5dd212491cda8" style={{ overflow: "hidden" }}>MTD - Grid availability</legend>
                                    <div style={{ width: "90%", margin: "auto" }}>
                                        {this.state.gaugeGraphs1 && this.state.gaugeGraphs1.series ? <CommonGuageMeter {...this.state.gaugeGraphs1} {...defaultProps} index="1" /> :
                                            <Loader type="Oval" color="#00BFFF" height={80} width={80} />}
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={6} md={6} sm={12} style={{ padding: "0.5%", paddingTop: "20px" }}>
                                <Card className="fieldset-chart">
                                    <legend className="boxShw" id="5dd212491cda8" style={{ overflow: "hidden" }}>QTD - Grid availability</legend>
                                    <div style={{ width: "90%", margin: "auto" }}>
                                        {this.state.gaugeGraphs2 && this.state.gaugeGraphs2.series ? <CommonGuageMeter {...this.state.gaugeGraphs2} {...defaultProps} index="2" /> :
                                            <Loader type="Oval" color="#00BFFF" height={80} width={80} />}
                                    </div>
                                </Card>
                            </Col>
                            <Col lg={6} md={6} sm={12} style={{ padding: "0.5%", paddingTop: "20px" }}>
                                <Card className="fieldset-chart">
                                    <legend className="boxShw" id="5dd212491cda8" style={{ overflow: "hidden" }}>YTD - Grid availability</legend>
                                    <div style={{ width: "90%", margin: "auto" }}>
                                        {this.state.gaugeGraphs3 && this.state.gaugeGraphs3.series ? <CommonGuageMeter {...this.state.gaugeGraphs3} {...defaultProps} index="3" /> :
                                            <Loader type="Oval" color="#00BFFF" height={80} width={80} />}
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                        {this.state.popupGraph && <ModelPopUp title={this.state.popupGraph.graphName}
                            id="popUpModal"
                            bodyContent={this.state.popupGraph && this.state.popupGraph.series ? <CommonGuageMeter {...this.state.popupGraph} {...defaultProps} onDoubleClickEvent={null} /> :
                                <Loader type="Oval" color="#00BFFF" height={80} width={80} />}
                            showPopUp={this.state.popupGraph ? true : false}
                            secondaryBtnName="Close"
                            onSecondaryAction={this.onHide.bind(this)}
                        />}
                    </Card.Body>
                    <footer className="darkBlueGradient">
                        <span>AFFORDABLE SOLAR POWER FOR GENERATIONS!</span>
                    </footer>
                </Card>
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
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getMakeGraphGauge: (graphData, graphType) => dispatch(getMakeGraphGauge(graphData, graphType)),
        // getPlantByProjectId: (proID)=> dispatch(getPlantByProjectId(15)))
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GridAvailability));