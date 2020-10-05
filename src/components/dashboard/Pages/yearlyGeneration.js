import React, { Component } from "react";
import Card from 'react-bootstrap/Card';
import GaugeSpeedoMeter from "../../Charts/gaugeSpeedoMeter";
// import ReportFieldset from "../../Common/ReportFieldset";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../../../styles/Dashboard.scss';
import ThreeDpie from "../../Charts/3dpie";
import { makeGraphfyrgauge } from '../../../actions/action-makeGraphfyrgauge';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import CompareModal from "./compareModal";

class YearlyGeneration extends Component {

    constructor(props) {
        super(props);

        this.state = {
            runApi: false,
            showModal: false,
            pageContent: this.props.pageContent,
            gaugeGraphsResult: this.props.gaugeGraphsResult,
            selectedPlant: [],
            chartInfo: this.props.chartInfo,
            gaugeGraphs0: [],
            gaugeGraphs1: [],
            gaugeGraphs2: [],


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
        let inputParams = { pageID: 1, subPageID: 4 };
        //this.props.getMakeGraphGauge({ ...defaultprops, ...inputParams }, "makeFGauge");
        this.props.makeGraphfyrgauge({ ...defaultprops, ...inputParams });
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
        let inputParams = { pageID: 1, subPageID: 4 };
        this.props.makeGraphfyrgauge({ ...defaultprops, ...inputParams });
        // this.props.makeGraphfyrgauge({ pageID: 1, subPageID: 4 });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            gaugeGraphs0: nextProps.gaugeGraphs0,
            gaugeGraphs1: nextProps.gaugeGraphs1,
            gaugeGraphs2: nextProps.gaugeGraphs2,

        })
    }

    handleCompare = (index) => {
        this.setState({ showModal: true, selectedGraph: index, runApi: true })
        // this.props.makeGraphfgauge({ pageID: 1, subPageID: 1 });
    }

    selectMultiplePlants(graphId, plants) {
        this.getGraphResponse(graphId, plants);
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
                                    <legend className="boxShw" id="5dd212491cda8">Yearly Generation</legend>

                                    {this.state.gaugeGraphs0 && this.state.gaugeGraphs0.series ? <GaugeSpeedoMeter type="YTD" showFilter={true} plantsShow={true} selectMultiplePlants={(graphId, plants) => this.selectMultiplePlants(graphId, plants)} gIndex="0" handleCompare={(index) => this.handleCompare(index)} {...this.state.gaugeGraphs0} /> :
                                        <Loader type="Oval" color="#00BFFF" height={80} width={80} />}
                                </Card>
                            </Col>
                            <Col lg={6} md={6} sm={12} style={{ display: "inline-block", padding: "0.5%", float: "right", paddingTop: "20px" }}>
                                <Card className="fieldset-chart">
                                    <legend className="boxShw" id="5dd212491cda8">Yearly Mn USD Revenue</legend>
                                    {this.state.gaugeGraphs1 && this.state.gaugeGraphs1.series ? <GaugeSpeedoMeter type="YTD" showFilter={true} plantsShow={true} selectMultiplePlants={(graphId, plants) => this.selectMultiplePlants(graphId, plants)} gIndex="1" handleCompare={(index) => this.handleCompare(index)} {...this.state.gaugeGraphs1} /> :
                                        <Loader type="Oval" color="#00BFFF" height={80} width={80} />}

                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{ padding: "0.5%", paddingTop: "20px" }}>
                                <Card className="fieldset-chart">
                                    <legend className="boxShw" id="5dd212491cda8">Yearly Mn INR Revenue</legend>
                                    {this.state.gaugeGraphs2 && this.state.gaugeGraphs2.series ? <GaugeSpeedoMeter type="YTD" showFilter={true} plantsShow={true} selectMultiplePlants={(graphId, plants) => this.selectMultiplePlants(graphId, plants)} gIndex="2" handleCompare={(index) => this.handleCompare(index)} {...this.state.gaugeGraphs2} /> :
                                        <Loader type="Oval" color="#00BFFF" height={80} width={80} />}

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

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        makeGraphfyrgauge: (graphData) => dispatch(makeGraphfyrgauge(graphData))
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(YearlyGeneration));
