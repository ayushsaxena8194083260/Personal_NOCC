import React, { Component } from "react";
import Card from 'react-bootstrap/Card';
// import GaugeSpeedoMeter from "../../Charts/gaugeSpeedoMeter";
// import ReportFieldset from "../../Common/ReportFieldset";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../../../../styles/Dashboard.scss'; 
import InverterGenerationBar from "../../../Diagnosis/Charts/inverterGenerationChart";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getMakeGraph } from '../../../../actions/action-MakeGraphForSettingViewGraph';
// import ModelPopUp from '../../Common/ModelPopUp';
import Loader from 'react-loader-spinner';
import exportFromJSON from 'export-from-json'

class DisplayGraph extends Component {
    constructor(props) {
        super(props)
        this.state = {
            gaugeGraphs0: this.props.gaugeGraphs0,
            gaugeGraphs1: this.props.gaugeGraphs1,
            gaugeGraphs2: this.props.gaugeGraphs2,
            gaugeGraphs3: this.props.gaugeGraphs3,
            popupGraph: null,
            selectedFromDate: null,
            selectedToDate: null,
            displayGraph: this.props.location.plantFault
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

    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
    
        return [year, month, day].join('-');
    }
    
    componentDidMount() {
        let today = new Date();
        let lastYear = this.formatDate(this.dateAdd(today, "year", -1));
    
        let defaultprops = {
            "canvas": "id",
            "dataFlag": 0,
            "externalDate": lastYear,//todayDate(),
            "externalParam": 1,
            "externalPlant": [6],
            "fromDate": "",
            "graphId": this.state.displayGraph.graphId,
            "plant": [],
            "toDate": "",
            "pageID": 1,
            "subPageID": 1 
        }
        this.props.getMakeGraph(defaultprops);
    }

    dateAdd(date, interval, units) {
        if (!(date instanceof Date))
            return undefined;
        var ret = new Date(date); //don't change original date
        var checkRollover = function () { if (ret.getDate() != date.getDate()) ret.setDate(0); };
        switch (String(interval).toLowerCase()) {
            case 'year': ret.setFullYear(ret.getFullYear() + units); checkRollover(); break;
            case 'quarter': ret.setMonth(ret.getMonth() + 3 * units); checkRollover(); break;
            case 'month': ret.setMonth(ret.getMonth() + units); checkRollover(); break;
            case 'week': ret.setDate(ret.getDate() + 7 * units); break;
            case 'day': ret.setDate(ret.getDate() + units); break;
            case 'hour': ret.setTime(ret.getTime() + units * 3600000); break;
            case 'minute': ret.setTime(ret.getTime() + units * 60000); break;
            case 'second': ret.setTime(ret.getTime() + units * 1000); break;
            default: ret = undefined; break;
        }
        return ret;
    }
    
    componentWillReceiveProps(nextProps) {
        this.setState({
            gaugeGraphs0: nextProps.gaugeGraphs0,
            gaugeGraphs1: nextProps.gaugeGraphs1,
            gaugeGraphs2: nextProps.gaugeGraphs2,
            gaugeGraphs3: nextProps.gaugeGraphs3
        })
    }

    onDoubleClick(index) {
        const graph = this.state["gaugeGraphs" + index];
        this.setState({ popupGraph: graph })
    }

    onHide(){
        this.setState({ popupGraph: null })
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
                            <legend className="boxShw" id="5dd212491cda8" style={{overflow:"hidden"}}>{this.props.gaugeGraphs0.graphName}</legend>
                            <div style={{width:"95%",margin:"auto"}}>
                                <InverterGenerationBar {...this.state.gaugeGraphs0} {...defaultProps} index="0" />
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DisplayGraph));