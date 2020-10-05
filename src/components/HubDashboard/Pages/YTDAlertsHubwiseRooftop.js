import React, { Component } from "react";
import ReactHighcharts from 'react-highcharts';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getMakeGraph } from '../../../actions/action-MakeGraphForHub';

class YTDAlertsHubwiseRooftop extends Component {
    constructor(props) {
        super(props)
        this.state = {
            gaugeGraphs0: this.props.gaugeGraphs0,
           
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            gaugeGraphs0: nextProps.gaugeGraphs0,
           
        })
    }

    componentDidMount() {
        this.props.getMakeGraph({ pageID: 1, subPageID: 2 });
    }

    showdetailsClick(e) {
        console.log("log", "/alertStatisticsByHub/" + e.point.hub_id + "/" + e.point.date0 );
        const url = "/alertStatisticsByHub/" + e.point.hub_id + "/" + e.point.date0 ;
        window.open(url);
    }

    render() {
        const PortfolioDTDConfig = {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
                height: '460px'
            },
            title: {
                text: ''
            },
            credits: {
                enabled: false
            },
            tooltip: {
                pointFormat: '<div><b>Ticket Number: {point.y}</b> <br/> <font color={point.color}> Module cleaning analysis: {point.mca}</font>  <br/> <font color={point.color}>Partial Plantdown: {point.ppd}</font>  <br/> <font color={point.color}>Complete Plantdown: {point.cpd} </font> </div> '
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                    },
                    events: {
                        click: this.showdetailsClick.bind(this)
                    }
                }
            },
            series: [{
                name: 'Brands',
                colorByPoint: true,
                data: []
            }]
        }

        const result = {...PortfolioDTDConfig, ...this.state.gaugeGraphs0};

        return (<div>
            <Card style={{ maxWidth: "1264px", margin: "auto" }}>
                <Card.Body style={{ padding: "0", height: "550px", overflow: "auto" }}>
                    <Row>
                        <Col style={{ padding: "0.5%", paddingTop: "20px" }}>
                            <Card className="fieldset-chart">
                                <legend className="boxShw" id="5dd212491cda8" style={{ overflow: "hidden" }}>Quarter 1 Mn INR Revenue</legend>
                                <div style={{ width: "95%", margin: "auto" }}>
                                    <ReactHighcharts config={result} />
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

        </div>)
    }
}


const mapStateToProps = state => {
    return {
       
        gaugeGraphs0: state.ChartsReducer.gaugeGraphs0,
        
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getMakeGraph: (graphData) => dispatch(getMakeGraph(graphData))
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(YTDAlertsHubwiseRooftop));
