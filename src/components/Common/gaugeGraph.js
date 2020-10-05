import React, { Component } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { getMakeGraphGauge } from '../../actions/action-MakeGraphGauge';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';


class GaugeGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageContent: [],
            graphID: this.props.graphID,
            graphsResult: this.props.gaugeGraphsResult
        }
    }

    componentDidMount() {

        this.props.getMakeGraphGauge({ "canvas": "canvas5e59af471246f", "graphId": this.state.graphID })
    }

    componentWillReceiveProps(nextProps) {

        this.setState({
            pageContent: nextProps.pageContent,
            graphID: nextProps.graphID,
            graphsResult: nextProps.gaugeGraphsResult
        });
    }


    render() {
        return (
            <Col key={this.props.graphID}>
                <Card className="fieldset-chart" key={this.props.graphID}>
                    <legend className="boxShw" id={this.props.graphID} style={{ overflow: "hidden" }}>{this.state.graphsResult&&this.state.graphsResult.length > 0&&this.state.graphsResult[this.props.graphID].canvas}</legend>
                    <div style={{ width: "90%", margin: "auto" }}>
                        {this.state.graphsResult && <div>{this.state.graphsResult && this.state.graphsResult.length > 0 && this.state.graphsResult[this.props.graphID].canvas}</div>}
                    </div>
                </Card>
            </Col>
        )
    }

}

//export default GaugeGraph;
const mapStateToProps = state => {
    return {
        gaugeGraphsResult: state.ChartsReducer.gaugeGraphs,

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getMakeGraphGauge: (graphData) => dispatch(getMakeGraphGauge(graphData))
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GaugeGraph));

/*
<Col>
                    <Card className="fieldset-chart">
                        <legend className="boxShw" id={index} style={{ overflow: "hidden" }}>{pageName}</legend>
                        <div style={{ width: "90%", margin: "auto" }}>

                        </div>
                    </Card>
                </Col>
                */