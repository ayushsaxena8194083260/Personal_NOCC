import React, { Component } from "react";
import Card from 'react-bootstrap/Card';
// import GaugeSpeedoMeter from "../../Charts/gaugeSpeedoMeter";
// import ReportFieldset from "../../Common/ReportFieldset";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../../../styles/Dashboard.scss';
import InverterGenerationBar from "../Charts/inverterGenerationChart";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getMakeGraph } from '../../../actions/action-MakeGraphForDiagnosis';
import ModelPopUp from '../../Common/ModelPopUpAnalytics';
import Loader from 'react-loader-spinner';
import exportFromJSON from 'export-from-json'

class IndosoalrNodia extends Component {
    constructor(props) {
        super(props)
        this.state = {
            gaugeGraphs0: this.props.gaugeGraphs0,
            gaugeGraphs1: this.props.gaugeGraphs1,
            gaugeGraphs2: this.props.gaugeGraphs2,
            gaugeGraphs3: this.props.gaugeGraphs3,
            popupGraph: null,
            apiResponseData:null,
            apiResponse0: this.props.apiResponse0,
            apiResponse1: this.props.apiResponse1,
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            gaugeGraphs0: nextProps.gaugeGraphs0,
            gaugeGraphs1: nextProps.gaugeGraphs1,
            gaugeGraphs2: nextProps.gaugeGraphs2,
            gaugeGraphs3: nextProps.gaugeGraphs3,
            apiResponse0: nextProps.apiResponse0,
            apiResponse1: nextProps.apiResponse1,
        })
    }

    componentDidMount() {
        this.props.getMakeGraph({ pageID: 1, subPageID: 7 });
    }

    onDoubleClick(index) {
        const graph = this.state["gaugeGraphs" + index];
        const apiResponse = this.state["apiResponse" + index];
        this.setState({ popupGraph: graph,apiResponseData:apiResponse })
    }

    onHide(){
        this.setState({ popupGraph: null })
        this.props.getMakeGraph({ pageID: 1, subPageID: 7 });
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
                <div>
                <Card style={{ maxWidth: "1264px", margin: "auto" }}>
                    <Card.Body style={{ padding: "0",height:"550px",overflow:"auto" }}>
                    <Row>
                        <Col style={{ padding: "0.5%", paddingTop: "20px" }}>

                            <Card className="fieldset-chart">
                            <legend className="boxShw" id="5dd212491cda8" style={{overflow:"hidden"}}>Indosoalr, Greater Nodia- Daily generation.</legend>
                            <div style={{width:"95%",margin:"auto"}}>
                                <InverterGenerationBar {...this.state.gaugeGraphs0} {...defaultProps} index="0" />
                            </div>
                            </Card>
                        </Col>
                        <Col style={{ padding: "0.5%", paddingTop: "20px" }}>

                            <Card className="fieldset-chart">
                            <legend className="boxShw" id="5dd212491cda8" style={{overflow:"hidden"}}>Insolation Curve_Indosolar Noida</legend>
                            <div style={{width:"95%",margin:"auto"}}>
                            <InverterGenerationBar {...this.state.gaugeGraphs1} {...defaultProps} index="1" />
                            </div>
                            </Card>
                        </Col>
                    </Row>
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
        apiResponse0: state.ChartsReducer.apiResponse0,
        apiResponse1: state.ChartsReducer.apiResponse1,
        apiResponse2: state.ChartsReducer.apiResponse2,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getMakeGraph: (graphData) => dispatch(getMakeGraph(graphData))
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(IndosoalrNodia));

