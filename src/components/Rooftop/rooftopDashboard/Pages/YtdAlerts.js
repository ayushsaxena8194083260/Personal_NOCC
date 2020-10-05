import React, { Component } from "react";
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../../../../styles/Dashboard.scss';
import AlertPortfolioCharts from "../Charts/alertPortfolioCharts";
import PortfolioDTDCharts from "../Charts/portfolioDTDCharts";
import YtsAlertsCharts from "../Charts/YtsAlertsCharts";
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getMakeGraph } from '../../../../actions/action-MakeGraphForRooftopDashboard';
import ModelPopUpRTDBINVCONF from '../../../Common/ModelPopUpDiagnosisRoofTopDashBoardInvConf';

class PorfoliaDTD extends Component {
    constructor(props) {
        super(props);
        this.state = {
            graphs0: [],
            graphs1: [],
            graphs2: [],
            graphs3: [],
            apiResponseData:null,
            apiResponse0: this.props.apiResponse0,
            apiResponse1: this.props.apiResponse1,
            apiResponse2: this.props.apiResponse2,
            apiResponse3: this.props.apiResponse3,
            popupGraph: null,
        }
    }


    componentWillReceiveProps(nextProps) {
        this.setState({
            graphs0: nextProps.graphs0,
            graphs1: nextProps.graphs1,
            graphs2: nextProps.graphs2,
            graphs3: nextProps.graphs3,
            apiResponse0: nextProps.apiResponse0,
            apiResponse1: nextProps.apiResponse1,
            apiResponse2: nextProps.apiResponse2,
        })
    }

    componentDidMount() {
        this.props.getMakeGraph({ pageID: 1, subPageID: 3 });
    }

    onDoubleClick(index) {
        const graph = this.state["graphs" + index];
        const apiResponse = this.state["apiResponse" + index];
        this.setState({ popupGraph: graph,apiResponseData:apiResponse })

    }

    onHide(){
        this.setState({ popupGraph: null })
        this.props.getMakeGraph({ pageID: 1, subPageID: 3 });
    }

    render() {
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
        return (
            <div>
                <Card style={{ maxWidth: "1264px", margin: "auto" }}>
                    <Card.Body style={{ padding: "0", height: "550px", overflow: "auto" }}>
                        <Row>
                            <Col style={{ padding: "0.5%", paddingTop: "20px" }}>

                                <Card className="fieldset-chart">
                                    <legend className="boxShw" id="5dd212491cda8" style={{ overflow: "hidden" }}>Portfolio DTD - Rooftop</legend>
                                    <div style={{ width: "90%", margin: "auto" }}>
                                        {this.state.graphs0 && this.state.graphs0.series ? <YtsAlertsCharts {...this.state.graphs0} {...defaultProps} index="0" /> :
                                            <Loader type="Oval" color="#00BFFF" height={80} width={80} />}
                                    </div>
                                </Card>
                            </Col>
                            <Col style={{ padding: "0.5%", paddingTop: "20px" }}>

                                <Card className="fieldset-chart">
                                    <legend className="boxShw" id="5dd212491cda8" style={{ overflow: "hidden" }}>Portfolio MTD - Rooftop</legend>
                                    <div style={{ width: "90%", margin: "auto" }}>
                                        {this.state.graphs1 && this.state.graphs1.series ? <YtsAlertsCharts {...this.state.graphs1} {...defaultProps} index="1" /> :
                                            <Loader type="Oval" color="#00BFFF" height={80} width={80} />}
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{ padding: "0.5%", paddingTop: "20px" }}>

                                <Card className="fieldset-chart">
                                    <legend className="boxShw" id="5dd212491cda8" style={{ overflow: "hidden" }}>Portfolio QTD - Rooftop</legend>
                                    <div style={{ width: "90%", margin: "auto" }}>
                                        {this.state.graphs2 && this.state.graphs2.series ? <YtsAlertsCharts {...this.state.graphs2} {...defaultProps} index="2" /> :
                                            <Loader type="Oval" color="#00BFFF" height={80} width={80} />}
                                    </div>
                                </Card>
                            </Col>
                            <Col style={{ padding: "0.5%", paddingTop: "20px" }}>

                                <Card className="fieldset-chart">
                                    <legend className="boxShw" id="5dd212491cda8" style={{ overflow: "hidden" }}>Portfolio YTD - Rooftop</legend>
                                    <div style={{ width: "90%", margin: "auto" }}>
                                        {this.state.graphs3 && this.state.graphs3.series ? <YtsAlertsCharts {...this.state.graphs3} {...defaultProps} index="3" /> :
                                            <Loader type="Oval" color="#00BFFF" height={80} width={80} />}
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                        {this.state.popupGraph && <ModelPopUpRTDBINVCONF title={this.state.popupGraph.graphName}
                            id="popUpModal"
                            bodyContent={this.state.popupGraph && this.state.popupGraph.series ? <YtsAlertsCharts {...this.state.popupGraph} {...defaultProps} onDoubleClickEvent={null} /> :
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
        graphsResult: state.ChartsReducer.graphs,
        graphs0: state.ChartsReducer.graphs0,
        graphs1: state.ChartsReducer.graphs1,
        graphs2: state.ChartsReducer.graphs2,
        graphs3: state.ChartsReducer.graphs3,
        apiResponse0: state.ChartsReducer.apiResponse0,
        apiResponse1: state.ChartsReducer.apiResponse1,
        apiResponse2: state.ChartsReducer.apiResponse2,
        apiResponse3: state.ChartsReducer.apiResponse3,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getMakeGraph: (graphData) => dispatch(getMakeGraph(graphData))
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PorfoliaDTD));

