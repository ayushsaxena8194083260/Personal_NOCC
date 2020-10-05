import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { getMakeGraphGauge } from '../../actions/action-ModelPopUpGraph';
import { BrowserRouter, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import LineBasicChart from '../Charts/lineBasic';
import Loader from 'react-loader-spinner';

class ModelPopUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFromDate: null,
            selectedToDate: null,
            gaugeGraphs0: this.props.gaugeGraphs0,
            showModelGraph: false
        }
    }

    componentDidMount() {
        // this.props.getMakeGraphGauge({ pageID: 1, subPageID: 1 });
        //    let pageID=2;
        //    this.props.getPageDetailAndGraphDetail(pageID)
        //    console.log(this.props.graphDetails);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({            
            gaugeGraphs0: nextProps.gaugeGraphs0,
        })
    }

    handleChangeFromDate(event) {
        let fromDate = event.target.value;
        this.setState({ selectedFromDate : fromDate });
    }

    handleChangeToDate(event) {
        let toDate = event.target.value;
        this.setState({ selectedToDate : toDate });
    }

    // getGraph(){
    //     let defaultprops = {
    //         "allPlants": "",
    //         "canvas": "",
    //         "dataFlag": 0,
    //         "externalDate": "2019-11-14",
    //         "externalParam": "1",
    //         "externalPlant": [],
    //         "fromDate": this.state.selectedFromDate,
    //         "graphId": this.props.graphId,
    //         "plant": [

    //         ],
    //         "toDate": this.state.selectedToDate
    //     }
    //     this.setState({showModelGraph: true});
    //     let inputParams = { pageID: 1, subPageID: 1, externalPlant: [this.props.selectedPlantIds], externalDate: this.state.selectedToDate };
    //     this.props.getMakeGraphGauge({ ...defaultprops, ...inputParams });
    //     this.state.gaugeGraphs0 && this.state.gaugeGraphs0.series ? this.state.showModelGraph = true : this.state.showModelGraph = false;
    // }

    render() {
        return (
            <Modal id={this.props.id} show={this.props.showPopUp} onHide={() => this.props.onSecondaryAction()} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                {/* <Modal.Header closeButton> */}
                {this.props.title && <Modal.Title>{this.props.title}</Modal.Title>}
                {/* </Modal.Header> */}
                <Modal.Body>
                {/* <Row className="top-filter">
                <Col xs={2} style={{ maxWidth: "25%" }}>
                    <Form.Label>From Date:</Form.Label>
                </Col>
                <Col xs={2} style={{ maxWidth: "24%",padding:"0" }}>
                    <Form.Control name="fromDate" type="date" onChange={(item) => this.handleChangeFromDate(item)} value={this.state.selectedFromDate} />
                </Col>
                <Col xs={2} style={{ maxWidth: "25%" }}>
                    <Form.Label>To Date:</Form.Label>
                </Col>
                <Col xs={2} style={{ maxWidth: "24%",padding:"0" }}>
                    <Form.Control name="toDate" type="date" onChange={(item) => this.handleChangeToDate(item)} value={this.state.selectedToDate} />
                </Col>
                <Button variant="primary" onClick={() => this.getGraph()}>
                        GO
                    </Button>
                </Row> */}
                    <p>{this.state.showModelGraph ? this.state.gaugeGraphs0 && this.state.gaugeGraphs0.series ? <LineBasicChart {...this.state.gaugeGraphs0} /> :
                            <Loader type="Oval" color="#00BFFF" height={80} width={80} /> : this.props.bodyContent}</p>
                </Modal.Body>
                <Modal.Footer>
                    {this.props.secondaryBtnName && <Button variant="danger" onClick={() => this.props.onSecondaryAction()}>
                        {this.props.secondaryBtnName}
                    </Button>}
                    {this.props.primaryBtnName && <Button variant="primary" onClick={() => this.props.onPrimaryAction()}>
                        {this.props.primaryBtnName}
                    </Button>}
                </Modal.Footer>
            </Modal>
        )
    }
}

const mapStateToProps = state => {
    return {
        graphDetails: state.analyticsReducer.graphDetails,
        gaugeGraphsResult: state.ChartsReducer.gaugeGraphs,
        gaugeGraphs0: state.ChartsReducer.gaugeGraphs0,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getMakeGraphGauge: (graphData) => dispatch(getMakeGraphGauge(graphData))
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(ModelPopUp));

// export default ModelPopUp;
