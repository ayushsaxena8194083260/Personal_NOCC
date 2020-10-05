import React, { Component } from "react";
import Card from 'react-bootstrap/Card';
import MapContainer from "../../dashboard/googleMap";
import GirdDisplayContainer from "../../../containers/HubDashboard/girdDisplayContainer";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../../../styles/Dashboard.scss';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getMakeGraph } from '../../../actions/action-MakeGraphForHubDashboard';
import ColumnBarChart from "../../Charts/columnBarHub";
import queryString from 'query-string';

class GraphHub extends Component {
    constructor(props) {
        super(props)
        this.state = {
            gaugeGraphs0: this.props.gaugeGraphs0,
            gaugeGraphs1: this.props.gaugeGraphs1,
            gaugeGraphs2: this.props.gaugeGraphs2,
            gaugeGraphs3: this.props.gaugeGraphs3
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
        const qString =  queryString.parse(this.props.location.search);

        let defaultprops = {
            "allPlants": "",
            "canvas": "",
            "dataFlag": 0,
            "externalDate": "",
            "externalParam": "",
            "externalPlant": qString.index,
            "fromDate": "",
            "graphId": 0,
            "plant": [

            ],
            "toDate": ""
        }
        this.props.getMakeGraph({...defaultprops, pageID: 1, subPageID: 2 });
    }

    onDoubleClick(index) {
        const graph = this.state["gaugeGraphs" + index];
        const apiResponse = this.state["apiResponse" + index];
        this.setState({ popupGraph: graph,apiResponseData:apiResponse })
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
                <Card style={{ height: "621px", maxWidth: "1264px", margin: "auto" }}>
                    <Card.Body style={{ padding: "0" }}>
                        <div>
                            <Card style={{ width: "1264px", margin: "auto" }}>
                                <Card.Body style={{ padding: "0", height: "550px", overflow: "auto" }}>
                                    <Row>
                                        <Col style={{ padding: "0.5%", paddingTop: "20px" }}>
                                            <Card className="fieldset-chart">
                                                <legend className="boxShw" id="5dd212491cda8" style={{ overflow: "hidden" }}>DAILY GENERATION</legend>
                                                <div style={{ width: "90%", margin: "auto" }}>
                                                    <ColumnBarChart {...this.state.gaugeGraphs0} enabled= {false} {...defaultProps} index={0} />}                                                    
                                                </div> 
                                            </Card> 
                                        </Col>
                                        <Col style={{ padding: "0.5%", paddingTop: "20px" }}>
                                            <Card className="fieldset-chart">
                                                <legend className="boxShw" id="5dd212491cda8" style={{ overflow: "hidden" }}>MTD GENERATION</legend>
                                                <div style={{ width: "90%", margin: "auto" }}>
                                                    <ColumnBarChart {...this.state.gaugeGraphs1} />
                                                </div>
                                            </Card>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col style={{ padding: "0.5%", paddingTop: "20px" }}>
                                            <Card className="fieldset-chart">
                                                <legend className="boxShw" id="5dd212491cda8" style={{ overflow: "hidden" }}>QTD GENERATION</legend>
                                                <div style={{ width: "90%", margin: "auto" }}>
                                                    <ColumnBarChart {...this.state.gaugeGraphs2} />
                                                </div>
                                            </Card> 
                                        </Col>
                                        <Col style={{ padding: "0.5%", paddingTop: "20px" }}>
                                            <Card className="fieldset-chart">
                                                <legend className="boxShw" id="5dd212491cda8" style={{ overflow: "hidden" }}>YTD GENERATION</legend>
                                                <div style={{ width: "90%", margin: "auto" }}>
                                                  <ColumnBarChart {...this.state.gaugeGraphs3} />
                                                </div>
                                            </Card>
                                        </Col>
                                    </Row>
                                </Card.Body>
                                <footer className="darkBlueGradient">
                                    <span>AFFORDABLE SOLAR POWER FOR GENERATIONS!</span>
                                </footer>
                            </Card>
                        </div>
                    </Card.Body>
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
        getMakeGraph: (graphData) => dispatch(getMakeGraph(graphData))
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GraphHub));