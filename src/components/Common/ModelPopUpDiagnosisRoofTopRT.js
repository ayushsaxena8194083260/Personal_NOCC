import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { getMakeGraph } from '../../actions/action-ModelPopUpGraph';
import { BrowserRouter, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import LineBasicChart from '../Charts/lineBasic';
import Loader from 'react-loader-spinner';
import exportCsv from './exportToCsvRoofTop';
import exportFromJSON from 'export-from-json';

class ModelPopUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFromDate: null,
            selectedToDate: null,
            gaugeGraphs0: this.props.gaugeGraphs0,
            showModelGraph: false,
            apiResponse:this.props.apiResponse,
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
            apiResponse: nextProps.apiResponse
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

    getGraph(){
        let defaultprops = {
            "allPlants": "",
            "canvas": "",
            "dataFlag": 1,
            "externalDate": "",
            "externalParam": "",
            "externalPlant": [],
            "fromDate": this.state.selectedFromDate,
            "graphId": this.props.graphId,
            "plant": [

            ],
            "toDate": this.state.selectedToDate
        }
        this.setState({showModelGraph: true});
        let inputParams = { pageID: 1, subPageID: 1};
        this.props.getMakeGraph({ ...defaultprops, ...inputParams });
        // this.state.gaugeGraphs0 && this.state.gaugeGraphs0.series ? this.state.showModelGraph = true : this.state.showModelGraph = false;
    }
    exportData(){
        this.exportToCSV(exportCsv.exportCsv(this.state.apiResponse),this.state.apiResponse.graphName);
    }
    exportToCSV(csvData, fName) {
        const data = csvData;
        const fileName = fName
        const exportType = 'xls'
        data.length > 0 ? exportFromJSON({ data, fileName, exportType }) : alert('No data to download')
    }

    render() {
        return (
            <Modal id={this.props.id} show={this.props.showPopUp} onHide={() => this.props.onSecondaryAction()} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                {/* <Modal.Header closeButton> */}
                {this.props.title && <Modal.Title>{this.props.title}</Modal.Title>}
                {/* </Modal.Header> */}
                <Modal.Body>
                <button style={{padding: "0.5%", 
                                position:"absolute",
                                zIndex:"100",
                                right:0,
                                top:'-1px',
                                border: 'none',
                                background: 'none'}}>
                    <img src="https://nocc.azurepower.com/images/csvIcon.png" onClick={(e) => { this.exportData() }} />
                </button>

                <Row className="top-filter">
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
                <button className="btn btn-orange" onClick={() => this.getGraph()}>
                        GO
                    </button>
                </Row>
                    <p>{this.state.showModelGraph ? this.state.gaugeGraphs0 && this.state.gaugeGraphs0.series ? <LineBasicChart {...this.state.gaugeGraphs0} /> :
                            <Loader type="Oval" color="#00BFFF" height={80} width={80} /> : this.props.bodyContent}</p>
                </Modal.Body>
                <Modal.Footer>
                    {this.props.secondaryBtnName && <Button variant="danger" onClick={() => this.props.onSecondaryAction()}>
                        {this.props.secondaryBtnName}
                    </Button>}
                    {/* {this.props.primaryBtnName && <Button variant="primary" onClick={() => this.exportData()}>
                        {this.props.primaryBtnName}
                    </Button>} */}
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
        getMakeGraph: (graphData) => dispatch(getMakeGraph(graphData))
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(ModelPopUp));

// export default ModelPopUp;
