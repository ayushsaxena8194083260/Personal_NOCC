import React, { Component } from "react";
import Card from 'react-bootstrap/Card';
import GaugeSpeedoMeter from "../../Charts/gaugeSpeedoMeter";
import ReportFieldset from "../../Common/ReportFieldset";
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

class TotalInverterGeneration extends Component {
    constructor(props) {
        super(props)
        this.state = {
            gaugeGraphs0: this.props.gaugeGraphs0,
            gaugeGraphs1: this.props.gaugeGraphs1,
            gaugeGraphs2: this.props.gaugeGraphs2,
            gaugeGraphs3: this.props.gaugeGraphs3,
            popupGraph: null,
            apiResponseData:null,
            selectedFromDate: null,
            selectedToDate: null,
            apiResponse0: this.props.apiResponse0,
            apiResponse1: this.props.apiResponse1,
            apiResponse2: this.props.apiResponse2,
        }
    }

    handleChangeFromDate(event) {
        let fromDate = event.target.value;
        this.setState({ selectedFromDate: fromDate});
    }

    handleChangeToDate(event) {
        console.log("Current date", this.state.selectedToDate)
        let toDate = event.target.value;
        this.setState({ selectedToDate: toDate});
    }

    componentDidMount() {
        this.props.getMakeGraph({ pageID: 1, subPageID: 1 });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            gaugeGraphs0: nextProps.gaugeGraphs0,
            gaugeGraphs1: nextProps.gaugeGraphs1,
            gaugeGraphs2: nextProps.gaugeGraphs2,
            gaugeGraphs3: nextProps.gaugeGraphs3,
            apiResponse0: nextProps.apiResponse0,
            apiResponse1: nextProps.apiResponse1,
            apiResponse2: nextProps.apiResponse2,
        })
    }

    onDoubleClick(index) {
        const graph = this.state["gaugeGraphs" + index];
        const apiResponse = this.state["apiResponse" + index];
        this.setState({ popupGraph: graph,apiResponseData:apiResponse })

    }

    onHide(){
        this.setState({ popupGraph: null })
        this.props.getMakeGraph({ pageID: 1, subPageID: 1 });
    }


    exportToCSV(csvData, fName) {
        const data = csvData
        const fileName = fName
        const exportType = 'xls'
        data.length > 0 ? exportFromJSON({ data, fileName, exportType }) : alert('No data to download')
    }
    
    getExportData(data){
        let _value = [];
        let _data = [];
        let expData = [];
        let i = 0;
        data && data.length > 1 && data.map(item => {
            _value.push({name:item.name});
            item.data && item.data.map(item1 => {
                _data.push({data:item1.y})
            })
            expData.push({name:_value[i].name,data:_data[i].data});
            i += 1;
            
        })
        // data && data.length > 1 && data.map(items => {
        //     _value.push({name:items.name});
        //     let tempdata=[];
        //     items.data.map((item,index) => {tempdata.push(item.y)});
        //     expData.push({[_value[i].name]:[...tempdata]});
        //     i += 1;
        // })
        return expData;
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
                            <legend className="boxShw" id="5dd212491cda8" style={{overflow:"hidden"}}>E Total Inverter Generation Rajasthan 3.1</legend>
                            <div style={{width:"95%",margin:"auto"}}>
                                <InverterGenerationBar {...this.state.gaugeGraphs0} {...defaultProps} index="0" />
                            </div> 
                            </Card>
                        </Col>
                        <Col style={{ padding: "0.5%", paddingTop: "20px" }}>

                            <Card className="fieldset-chart">
                            <legend className="boxShw" id="5dd212491cda8" style={{overflow:"hidden"}}>E Total_Inverter_Rajasthan 3.2</legend>
                            <div style={{width:"95%",margin:"auto"}}>
                                <InverterGenerationBar {...this.state.gaugeGraphs1} {...defaultProps} index="1" /> 
                            </div>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{ padding: "0.5%", paddingTop: "20px" }}>

                            <Card className="fieldset-chart">
                            <legend className="boxShw" id="5dd212491cda8" style={{overflow:"hidden"}}>E Total_Inverter_Rajasthan 3.3</legend>
                            <div style={{width:"95%",margin:"auto"}}>
                                <InverterGenerationBar {...this.state.gaugeGraphs2} {...defaultProps} index="2" />
                            </div>
                            </Card>
                        </Col>
                        <Col style={{ padding: "0.5%", paddingTop: "20px" }}>

                            
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TotalInverterGeneration));
