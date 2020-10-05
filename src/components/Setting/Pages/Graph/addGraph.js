import React,{Component} from 'react';
import {
    Link, withRouter,
  } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../../../../styles/graphComponent.scss';
import { connect } from 'react-redux';
import { getAllPlants } from '../../../../actions';
import { renderGraphGroupDetails } from '../../../../actions/action-Settings';
import { getAllGraphGroupData, getYValueByGraphId, createUpdateGraphYValue, deleteYValueId, createUpdateGraph } from '../../../../actions/action-Settings';
import { getAllInverters } from '../../../../actions/InverterDailyActions';
import { getAllSMU } from '../../../../actions/action-smu';
import { getAllWeatherStation } from '../../../../actions/WeatherStationDataActions';
import { Route } from 'react-router-dom';
class AddGraph extends Component{
    constructor(props){
        super(props);
        if(this.props.location.graphData!=undefined){
        this.state = {
            selectedPlant:'',
            page:'Edit Graph',
            timeGroup:this.props.location.graphData.timePeriod === 'rolling_year' || this.props.location.graphData.timePeriod==='fyear' || this.props.location.graphData.timePeriod==='halfyearly' || this.props.location.graphData.timePeriod==='year' || this.props.location.graphData.timePeriod==='quarterly'?['month','year']:this.props.location.graphData.timePeriod==='month' || this.props.location.graphData.timePeriod==='bimonthly'?['day','month','year']:this.props.location.graphData.timePeriod==='day'?['hour','15 minute','day']:['hour','15 minute'],
            graph:this.props.location.graphData === undefined? '': this.props.location.graphData,
            graphGroups:this.props.location.graphGroup === undefined? '': this.props.location.graphGroup,
            graphType: this.props.location.graphData.graphType,
            yValue:'',
            yValue1:'',
            yValue21:'',
            yValue22:'',
            yValue23:'',
            yValueMeter: [],
            yValueTilt: [],
            showYAxis1:true,
            showYAxis21:true,
            showYAxis22:true,
            showYAxis23:true,
            // allSMU:this.props.getAllSMU(),
            // allInverters:  this.props.getAllInverters(),
            // allWeatherStation: this.props.getAllWeatherStation(),
            graphGroupName:'',
            graphName:'',
            ExternalParams:'',
            hub:'',
            graphType:'',
            plantName_y1:'',
            plantId_y1:'',
            deviceName_y1:'',
            channel_y1:'',
            aggregate_y1:'',
            percentage_y1:'',
            chart_y1:'',
            color_y1:'',

            plantName_y21:'',
            plantId_y21:'',
            deviceName_y21:'',
            channel_y21:'',
            aggregate_y21:'',
            percentage_y21:'',
            chart_y21:'',
            color_y21:'',

            plantName_y22:'',
            plantId_y22:'',
            deviceName_y22:'',
            channel_y22:'',
            aggregate_y22:'',
            percentage_y22:'',
            chart_y22:'',
            color_y22:'',

            plantName_y23:'',
            plantId_y23:'',
            deviceName_y23:'',
            channel_y23:'',
            aggregate_y23:'',
            percentage_y23:'',
            chart_y23:'',
            color_y23:'',

            plantName_meter:'',
            plantId_meter:'',
            deviceName_meter:'',
            channel_meter:'',

            plantName_tilt:'',
            plantId_tilt:'',
            month_tilt:'',
            year_tilt:''
        };
    }
    else{
        this.state = {
            selectedPlant:'',
            timeGroup:['month','year'],
            page:'Add Graph',
            graph: {
                    graphId: 0,
                    graphGroupId: 0,
                    graphType: "basic",
                    graphName: '',
                    externalParam: 0,
                    legend: 0,
                    hubCheck: 0,
                    endDate: "",
                    selectedDate: "",
                    selectedTime: null,
                    timePeriod: "rolling_year",
                    timeInterval: 0,
                    timeGroup: "month",
                    xAxisData: "time",
                    y1Title: "",
                    y1Unit: "",
                    y1BaseColor: "",
                    y1Min: "",
                    y1Max: "",
                    y21Title: "",
                    y21Unit: "",
                    y21BaseColor: null,
                    y21Min: "",
                    y21Max: "",
                    y22Title: "",
                    y22Unit: "",
                    y22BaseColor: null,
                    y22Min: "",
                    y22Max: "",
                    y23Title: null,
                    y23Unit: null,
                    y23BaseColor: null,
                    y23Min: null,
                    y23Max: null,
                    meterTitle: null,
                    meterUnit: null,
                    meterMin: null,
                    meterMax: null,
                    redStartValue: null,
                    redEndValue: null,
                    yellowStartValue: null,
                    yellowEndValue: null,
                    greenStartValue: null,
                    greenEndValue: null
            },
            graphGroups: '',
            graphType: '',
            yValue:'',
            yValue1:'',
            yValue21:'',
            yValue22:'',
            yValue23:'',
            yValueMeter: [],
            yValueTilt: [],
            showYAxis1:true,
            showYAxis21:true,
            showYAxis22:true,
            showYAxis23:true,
            // allSMU:this.props.getAllSMU(),
            // allInverters:  this.props.getAllInverters(),
            // allWeatherStation: this.props.getAllWeatherStation(),
            graphGroupName:'',
            graphName:'',
            ExternalParams:'',
            hub:'',
            graphType:'',
            plantName_y1:'',
            plantId_y1:'',
            deviceName_y1:'',
            channel_y1:'',
            aggregate_y1:'',
            percentage_y1:'',
            chart_y1:'',
            color_y1:'',

            plantName_y21:'',
            plantId_y21:'',
            deviceName_y21:'',
            channel_y21:'',
            aggregate_y21:'',
            percentage_y21:'',
            chart_y21:'',
            color_y21:'',

            plantName_y22:'',
            plantId_y22:'',
            deviceName_y22:'',
            channel_y22:'',
            aggregate_y22:'',
            percentage_y22:'',
            chart_y22:'',
            color_y22:'',

            plantName_y23:'',
            plantId_y23:'',
            deviceName_y23:'',
            channel_y23:'',
            aggregate_y23:'',
            percentage_y23:'',
            chart_y23:'',
            color_y23:'',

            plantName_meter:'',
            plantId_meter:'',
            deviceName_meter:'',
            channel_meter:'',

            plantName_tilt:'',
            plantId_tilt:'',
            month_tilt:'',
            year_tilt:''
        };
    }
        this.handleAddYValue = this.handleAddYValue.bind(this);
        this.handleChangePlant = this.handleChangePlant.bind(this);
        this.handleYAxisTables = this.handleYAxisTables.bind(this);
        this.handleChangeGraphData = this.handleChangeGraphData.bind(this);
        this.handleAddMeter = this.handleAddMeter.bind(this);
        this.handleAddTilt = this.handleAddTilt.bind(this);
        this.deleteMeter = this.deleteMeter.bind(this);
        this.deleteTilt = this.deleteTilt.bind(this);
    }

    handleAddMeter() {
        const stateDup = this.state;

        stateDup.yValueMeter.push({
                "channel": this.state.channel_meter,
                "channelText": this.state.channel_meter,
                "device": this.state.deviceName_meter,
                "deviceText": this.state.deviceName_meter,
                "plantId": this.state.plantId_meter,
                "plantText": this.state.plantName_meter===''?'All Plants':this.state.plantName_meter
        });

        this.setState({ stateDup});
    }

    handleAddTilt() {
        const stateDup = this.state;

        stateDup.yValueTilt.push({
                "month": this.state.month_tilt,
                "year": this.state.year_tilt,
                "plantId": this.state.plantId_tilt,
                "plantText": this.state.plantName_tilt===''?'All Plants':this.state.plantName_tilt
        });

        this.setState({ stateDup});
    }

    deleteMeter(event) {
        const stateDup1 = this.state;
        if(stateDup1.yValueMeter.length != 1){
        stateDup1.yValueMeter = stateDup1.yValueMeter.splice(parseInt(event._targetInst.key),1);
        }
        else{
            stateDup1.yValueMeter = [];
        }
     
        this.setState({ stateDup1 });
    }

    deleteTilt(event) {
        const stateDup1 = this.state;
        if(stateDup1.yValueTilt.length != 1){
        stateDup1.yValueTilt = stateDup1.yValueTilt.splice(parseInt(event._targetInst.key),1);   
        }
        else{
            stateDup1.yValueTilt = [];   
        }
        this.setState({ stateDup1 });
    }
    
    handleChangeGraphData(event) {
        const stateDup = this.state;
        if(event.target.name === 'timePeriod'){
            stateDup.graph[event.target.name] = event.target.value;
            if(event.target.value === 'rolling_year' || event.target.value==='fyear' || event.target.value==='halfyearly' || event.target.value==='year' || event.target.value==='quarterly'){
                stateDup.timeGroup = ['month','year'];
            }
            else if(event.target.value==='month' || event.target.value==='bimonthly'){
                stateDup.timeGroup = ['day','month','year'];
            }
            else if(event.target.value==='day'){
                stateDup.timeGroup = ['hour','15 minute','day'];
               
            }
            else{
                stateDup.timeGroup = ['hour','15 minute'];
            }
            
        }
        else{
        stateDup.graph[event.target.name] = event.target.value;
        }
        this.setState({ stateDup });
    }

    onSubmit = (e) => {
        e.preventDefault();
        const graphDup = this.state.graph;
        delete graphDup.id;
        delete graphDup.graphGroupName;

        this.props.createUpdateGraph(graphDup);
        alert('Graph details has been created/updated');
        this.props.history.push('/setting');

    }

    handleChangePlant(event) {
        if(event.target.name != "plantName_y1" || event.target.name != "plantName_y21" || event.target.name != "plantName_y22" || event.target.name != "plantName_y23" || event.target.name != "plantName_meter" || event.target.name != "plantName_tilt"){
            const stateDup = this.state;
            let plants = this.props.plants; 
            stateDup[event.target.name] = event.target.value;

            for(var i=0;i<plants.length;i++){
                if(plants[i].plantName === event.target.value){
                    
                    if(event.target.name === "plantName_y1"){
                        stateDup.plantId_y1 = plants[i].plantId;
                        break;
                        }
                        else if(event.target.name === "plantName_y21"){
                            stateDup.plantId_y21 = plants[i].plantId;
                            break;
                            }
                            else if(event.target.name === "plantName_y22"){
                                stateDup.plantId_y22 = plants[i].plantId;
                                break;
                                }
                                else if(event.target.name === "plantName_y23"){
                                    stateDup.plantId_y23 = plants[i].plantId;
                                    break;
                                    }
                                    else if(event.target.name === "plantName_meter"){
                                        stateDup.plantId_meter = plants[i].plantId;
                                        break;
                                        }
                                        else if(event.target.name === "plantName_tilt"){
                                            stateDup.plantId_tilt = plants[i].plantId;
                                            break;
                                            }
                }
            }

            this.setState({ stateDup });
          
        }
        else{
            const stateDup1 = this.state;  
            
            stateDup1[event.target.name] = event.target.value;
           
            
        
            this.setState({stateDup1});
        }
    }

    handleAddYValue(yAxis){
        let yValueDetails ='';
        if(yAxis === 0){
        yValueDetails = {
            "aggregation": this.state.aggregate_y1===''?'Actual':this.state.aggregate_y1,
            "channel": this.state.channel_y1,
            "channelText": this.state.channel_y1,
            "chartType": this.state.chart_y1===''?'Bar':this.state.chart_y1,
            "coefficient": 1.00,
            "colorCode": this.state.color_y1===''?'#DA0D0D':this.state.color_y1,
            "device": this.state.deviceName_y1,
            "deviceText": this.state.deviceName_y1,
            "graphId": this.state.graph.graphId,
            "label": this.state.deviceName_y1,
            "plantId": this.state.plantId_y1,
            "plantText": this.state.plantName_y1===''?'All Plants':this.state.plantName_y1,
            "yAxis": yAxis,
            "yValueId": 0
          }
        }
        else if(yAxis === 1) {
            yValueDetails = {
                "aggregation": this.state.aggregate_y21===''?'Actual':this.state.aggregate_y21,
                "channel": this.state.channel_y21,
                "channelText": this.state.channel_y21,
                "chartType": this.state.chart_y21===''?'Bar':this.state.chart_y21,
                "coefficient": 1.00,
                "colorCode": this.state.color_y21===''?'#DA0D0D':this.state.color_y21,
                "device": this.state.deviceName_y21,
                "deviceText": this.state.deviceName_y21,
                "graphId": this.state.graph.graphId,
                "label": this.state.deviceName_y21,
                "plantId": this.state.plantId_y21,
                "plantText": this.state.plantName_y21===''?'All Plants':this.state.plantName_y21,
                "yAxis": yAxis,
                "yValueId": 0
              }
        }
        else if(yAxis === 2) {
            yValueDetails = {
                "aggregation": this.state.aggregate_y22===''?'Actual':this.state.aggregate_y22,
                "channel": this.state.channel_y22,
                "channelText": this.state.channel_y22,
                "chartType": this.state.chart_y22===''?'Bar':this.state.chart_y22,
                "coefficient": 1.00,
                "colorCode": this.state.color_y22===''?'#DA0D0D':this.state.color_y22,
                "device": this.state.deviceName_y22,
                "deviceText": this.state.deviceName_y22,
                "graphId": this.state.graph.graphId,
                "label": this.state.deviceName_y22,
                "plantId": this.state.plantId_y22,
                "plantText": this.state.plantName_y22===''?'All Plants':this.state.plantName_y22,
                "yAxis": yAxis,
                "yValueId": 0
              }
        }
        else if(yAxis === 3) {
            yValueDetails = {
                "aggregation": this.state.aggregate_y23===''?'Actual':this.state.aggregate_y23,
                "channel": this.state.channel_y23,
                "channelText": this.state.channel_y23,
                "chartType": this.state.chart_y23===''?'Bar':this.state.chart_y23,
                "coefficient": 1.00,
                "colorCode": this.state.color_y23===''?'#DA0D0D':this.state.color_y23,
                "device": this.state.deviceName_y23,
                "deviceText": this.state.deviceName_y23,
                "graphId": this.state.graph.graphId,
                "label": this.state.deviceName_y23,
                "plantId": this.state.plantId_y23,
                "plantText": this.state.plantName_y23===''?'All Plants':this.state.plantName_y23,
                "yAxis": yAxis,
                "yValueId": 0
              }
        }
        
        this.props.createUpdateGraphYValue(yValueDetails);

    }

    componentDidMount(){
        this.props.getAllPlants();
        this.props.renderGraphGroupDetails();
        if(this.state.graph.graphId!=undefined){
        this.props.getYValueByGraphId(this.state.graph.graphId);
        }
        this.props.getAllInverters();
        this.props.getAllSMU();
        this.props.getAllWeatherStation();
        //this.props.getAllGraphGroupData();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps!=null){
            if(nextProps.yValueDetails.length!=0){
                const yValueY1Axis = nextProps.yValueDetails.filter(item => item.yAxis === 0);
                const yValueY21Axis = nextProps.yValueDetails.filter(item => item.yAxis === 1);
                const yValueY22Axis = nextProps.yValueDetails.filter(item => item.yAxis === 2);
                const yValueY23Axis = nextProps.yValueDetails.filter(item => item.yAxis === 3);

                this.setState({ yValue1: yValueY1Axis, yValue21: yValueY21Axis, yValue22: yValueY22Axis, yValue23: yValueY23Axis, showYAxis1:yValueY1Axis.length!=0?true:false,showYAxis21:yValueY21Axis.length!=0?true:false, showYAxis22:yValueY22Axis.length!=0?true:false,showYAxis23:yValueY23Axis.length!=0?true:false});
            }

            this.setState({ yValue: nextProps.yValueDetails, allSMU: nextProps.allSMU, allInverters: nextProps.allInverters, allWeatherStation: nextProps.allWeatherStation });
            // this.setState({ yValue: nextProps.yValueDetails });
        }
        
    }

    handleYAxisTables(yAxis) {
        const stateDup = this.state;
        if(yAxis === 1){
            if(this.state.yValue1 != '' && this.state.yValue1.length >0){
                stateDup.showYAxis21 = true; 
            }
            else{
                alert('Please add atleast one combination in Y1');
            }
        }
        else if(yAxis === 21){
            if(this.state.yValue21 != '' && this.state.yValue21.length >0){
                stateDup.showYAxis22 = true; 
            }
            else{
                alert('Please add atleast one combination in Y2.1');
            }
        }
        else if(yAxis === 22){
            if(this.state.yValue22 != '' && this.state.yValue22.length >0){
                stateDup.showYAxis23 = true; 
            }
            else{
                alert('Please add atleast one combination in Y2.2');
            }
        }
        this.setState({ stateDup });
    }

    handleChange(event) {
        var stateDup = this.state.graph;
        // stateDup[event.target.name]=event.target.value;
        if (event.target.name === "multipleAdaptorUsed"){
            stateDup[event.target.name]=event.target.value === "1"?1:(event.target.value === "0"?0:null);
        } else {
            stateDup[event.target.name]=event.target.value;
        }
        this.setState({stateDup});
    }

    deleteYValue(yValueID) {
        this.props.deleteYValueId(yValueID,this.state.graph.graphId);
    }

    getPreview(){

    }

    render(){
        return(
            <div>
                <div className="top-filter">
                <Row style={{margin:"0"}}>
                    <Col>
                        <Form.Label>Select Group:</Form.Label>
                        <select required class="form-control" type="dropdown" name="graphGroupName" onChange={(item) => this.handleChangeGraphData(item)} >
                                    {/* value={this.state.graphGroups}  */}
                                    <option>{this.state.graph.graphGroupName}</option>
                                    {/* <option>{this.state.plans[0].plant_name}</option> */}
                                    {this.props.graphGroups === undefined?<option>default</option>:this.props.graphGroups.map((plant, key) => <option key={plant.graphGroupId}>{plant.graphGroupName}</option>)}
                        </select>
                    </Col>
                    <Col>
                        <Form.Label>Graph Title:</Form.Label>
                        <Form.Control name="graphName" onChange={this.handleChangeGraphData}  value={this.state.graph.graphName}/>
                    </Col>
                    <Col style={{maxWidth:"11%"}}>
                        <Form.Label>External Params:</Form.Label>
                        <Form.Check type="checkbox" name="ExternalParams" onChange={this.handleChangeGraphData}/>
                    </Col>
                    <Col style={{maxWidth:"11%"}}>
                        <Form.Label>HUB:</Form.Label>
                        <Form.Check type="checkbox" name="hub" onChange={this.handleChangeGraphData}/>
                    </Col>
                    <Col>
                        <Form.Label>Graph Type:</Form.Label>
                        {/* <Form.Control name="graphType" onChange={this.handleChangePlant}  value={this.state.graph.graphType}/> */}
                        <select class="form-control" type="dropdown" name="graphType" id="graphType" onChange={this.handleChangeGraphData}>
                        <option value={this.state.graph.graphType}>{this.state.graph.graphType==='basic'?'Basic':this.state.graph.graphType==='meter'?'Meter':this.state.graph.graphType==='tilt'?'Tilt':this.state.graph.graphType==='stacked'?'Stacked Bar':'Pie'}</option>    
                        <option value="basic">Basic</option>
                        <option value="meter">Meter</option>
                        <option value="tilt">Tilt</option>
                        <option value="stacked">Stacked Bar</option>
                        <option value="pie">Pie</option>
                        </select>
                    </Col>
                    <Col>
                        <Form.Label>Recently used:</Form.Label>
                        <ul className="graphColorPick">
                        <li className='graph-pick-color' style={{background:'#DA0D0D'}}>#DA0D0D</li>
                        <li className='graph-pick-color' style={{background:'#F0FF1C'}}>#F0FF1C</li>
                        <li className='graph-pick-color' style={{background:'#0FFF47'}}>#0FFF47</li>
                        </ul>
                    </Col>
                </Row>
                </div>
                {this.state.graph.graphType==='basic' || this.state.graph.graphType ==='stacked' || this.state.graph.graphType==='pie'?
                <div>
                <div className="subTable">
                    <div className="subHead">
                        Y1 Axis
                    </div>
                    <div className="subTableInner">
                        <Row style={{margin:"0"}}>
                            <Col style={{maxWidth:"14%",padding:"2px"}}>
                                <select required class="form-control" type="dropdown" name="plantName_y1" onChange={(item) => this.handleChangePlant(item)} >
                                    {/* value={this.state.selectedPlant} plant_name={this.state.selectedPlant} */}
                                    <option>All plants</option>
                                    {/* <option>{this.state.plans[0].plant_name}</option> */}
                                    {this.props.plants === undefined?<option>default</option>:this.props.plants.map((plant, key) => <option key={plant.plantId}>{plant.plantName}</option>)}
                                </select>
                            </Col>
                            <Col style={{maxWidth:"17%",padding:"2px"}}>
                            <select required class="form-control" type="dropdown" name="deviceName_y1" onChange={(item) => this.handleChangePlant(item)} >
                                    {/* value={this.state.selectedPlant} plant_name={this.state.selectedPlant} */}
                                    <option value="">Select Device</option>
                                    <optgroup label="Parameter">
                                    <option value="actual_generation">Actual Generation</option>
                                    <option value="net_generation">Net Generation</option>
                                    <option value="generation_budget">Budget Generation</option>
                                    <option value="forecast_generation">Forecast Generation</option>
                                    <option value="net_generation_revenue">Net Generation Revenue</option>
                                    <option value="generation_budget_revenue">Budget Generation Revenue</option>
                                    <option value="forecast_generation_revenue">Forecast Generation Revenue</option>
                                    <option value="import">Import</option>
                                    <option value="grid_outage">Grid Outage</option>
                                    <option value="plant_downtime">Plant Downtime</option>
                                    <option value="forecast_insolation_value">Forecast Insolation</option>
                                    <option value="forecast_sunshine_hours">Forecast Sunshine</option>
                                    <option value="forecast_ambient_temp">Forecast Ambient Temperature</option>
                                    <option value="seasonal_tilt">Forecast Seasonal Tilt</option>
                                    <option value="generation_lender">Lender Generation</option>
                                    <option value="generation_provisional">AOP Budget Generation</option>
                                    <option value="plf">PLF Actual</option>
                                    <option value="plf_con_cap">PLF Actual on Connected Capacity</option>
                                    <option value="act_plf_con_cap">Actual PLF on Connected Capacity</option>
                                    <option value="act_plf_ppa_cap">Actual PLF on PPA Capacity</option>
                                    <option value="bdt_plf_con_cap">Budget PLF on Connected Capacity</option>
                                    <option value="bdt_plf_ppa_cap">Budget PLF on PPA Capacity</option>
                                    <option value="lie_plf_con_cap">LIE PLF on Connected Capacity</option>
                                    <option value="lie_plf_ppa_cap">LIE PLF on PPA Capacity</option>
                                    <option value="modeled_generation">Modeled Generation</option>
                                    <option value="pm_completed">PM Task Completed</option>
                                    <option value="pm_not_completed">PM Task Not Completed</option>
                                    <option value="pm_task_plantwise">PM Task - Plantwise</option>
                                    <option value="custom">More Parameters</option>
                                    </optgroup>
                                    <optgroup label="Inverter">
                                        {this.props.allWeatherStation === undefined?<option></option>:this.props.allWeatherStation.map((weaStation, key) => <option key={weaStation.weatherStationId}>{weaStation.weatherStationName}</option>)}
                                    </optgroup>
                                    <optgroup label="OST">
                        <option value="ost_mca"> OST - Module cleaning analysis</option>
                        <option value="ost_cpd">OST - Complete plant down</option>
                        <option value="ost_ppd">OST - Partial plant down</option>
                        <option value="ost_alert_plants"> OST - Alert plants</option>
                    </optgroup>
                    <optgroup label="HUB">
                      <option value="hub_net_generation">Net Generation</option>
                      <option value="hub_generation_budget">Budget Generation</option>
                    </optgroup>
                                </select>
                            </Col>
                            <Col style={{maxWidth:"3%",padding:"2px"}}>
                            <Link to="/">
                            <img alt="Add Group" src="/images/addGroupDis.png"/>
                            </Link>
                            </Col>
                            <Col style={{maxWidth:"17%",padding:"2px"}}>
                            <select id="channel_y1" name="channel_y1" onChange={(item) => this.handleChangePlant(item)}>
                            <option value="Select">Select Channel</option>
                                <option value="Daily">Daily</option>
                                <option value="Monthly">Monthly</option>
                            </select>
                            </Col>
                            <Col style={{maxWidth:"13%",padding:"2px"}}>
                            <select id="aggregate_y1" name="aggregate_y1" onChange={(item) => this.handleChangePlant(item)}>
                            <option value="">Actual</option>
                            <option value="avg">Mean</option>
                            <option value="max">Max</option>
                            <option value="min">Min</option>
                            <option value="sum">Sum</option>
                            </select>
                            </Col>
                            <Col style={{maxWidth:"7%",padding:"2px"}}>
                            <select name="percentage_y1" id="percentage_y1" onChange={(item) => this.handleChangePlant(item)}>
            	                	<option value="0.01">1%</option>
                                	<option value="0.02">2%</option>
                                	<option value="0.03">3%</option>
                                	<option value="0.04">4%</option>
                                	<option value="0.05">5%</option>
                                	<option value="0.06">6%</option>
                                	<option value="0.07">7%</option>
                                	<option value="0.08">8%</option>
                                	<option value="0.09">9%</option>
                                	<option value="0.1">10%</option>
                                	<option value="0.11">11%</option>
                                	<option value="0.12">12%</option>
                                	<option value="0.13">13%</option>
                                	<option value="0.14">14%</option>
                                	<option value="0.15">15%</option>
                                	<option value="0.16">16%</option>
                                	<option value="0.17">17%</option>
                                	<option value="0.18">18%</option>
                                	<option value="0.19">19%</option>
                                	<option value="0.2">20%</option>
                                	<option value="0.21">21%</option>
                                	<option value="0.22">22%</option>
                                	<option value="0.23">23%</option>
                                	<option value="0.24">24%</option>
                                	<option value="0.25">25%</option>
                                	<option value="0.26">26%</option>
                                	<option value="0.27">27%</option>
                                	<option value="0.28">28%</option>
                                	<option value="0.29">29%</option>
                                	<option value="0.3">30%</option>
                                	<option value="0.31">31%</option>
                                	<option value="0.32">32%</option>
                                	<option value="0.33">33%</option>
                                	<option value="0.34">34%</option>
                                	<option value="0.35">35%</option>
                                	<option value="0.36">36%</option>
                                	<option value="0.37">37%</option>
                                	<option value="0.38">38%</option>
                                	<option value="0.39">39%</option>
                                	<option value="0.4">40%</option>
                                	<option value="0.41">41%</option>
                                	<option value="0.42">42%</option>
                                	<option value="0.43">43%</option>
                                	<option value="0.44">44%</option>
                                	<option value="0.45">45%</option>
                                	<option value="0.46">46%</option>
                                	<option value="0.47">47%</option>
                                	<option value="0.48">48%</option>
                                	<option value="0.49">49%</option>
                                	<option value="0.5">50%</option>
                                	<option value="0.51">51%</option>
                                	<option value="0.52">52%</option>
                                	<option value="0.53">53%</option>
                                	<option value="0.54">54%</option>
                                	<option value="0.55">55%</option>
                                	<option value="0.56">56%</option>
                                	<option value="0.57">57%</option>
                                	<option value="0.58">58%</option>
                                	<option value="0.59">59%</option>
                                	<option value="0.6">60%</option>
                                	<option value="0.61">61%</option>
                                	<option value="0.62">62%</option>
                                	<option value="0.63">63%</option>
                                	<option value="0.64">64%</option>
                                	<option value="0.65">65%</option>
                                	<option value="0.66">66%</option>
                                	<option value="0.67">67%</option>
                                	<option value="0.68">68%</option>
                                	<option value="0.69">69%</option>
                                	<option value="0.7">70%</option>
                                	<option value="0.71">71%</option>
                                	<option value="0.72">72%</option>
                                	<option value="0.73">73%</option>
                                	<option value="0.74">74%</option>
                                	<option value="0.75">75%</option>
                                	<option value="0.76">76%</option>
                                	<option value="0.77">77%</option>
                                	<option value="0.78">78%</option>
                                	<option value="0.79">79%</option>
                                	<option value="0.8">80%</option>
                                	<option value="0.81">81%</option>
                                	<option value="0.82">82%</option>
                                	<option value="0.83">83%</option>
                                	<option value="0.84">84%</option>
                                	<option value="0.85">85%</option>
                                	<option value="0.86">86%</option>
                                	<option value="0.87">87%</option>
                                	<option value="0.88">88%</option>
                                	<option value="0.89">89%</option>
                                	<option value="0.9">90%</option>
                                	<option value="0.91">91%</option>
                                	<option value="0.92">92%</option>
                                	<option value="0.93">93%</option>
                                	<option value="0.94">94%</option>
                                	<option value="0.95">95%</option>
                                	<option value="0.96">96%</option>
                                	<option value="0.97">97%</option>
                                	<option value="0.98">98%</option>
                                	<option value="0.99">99%</option>
                                	<option value="1" selected="selected">100%</option>
                                </select>
                            </Col>
                            <Col style={{maxWidth:"15%",padding:"2px"}}>
                            <select id="chart_y1" name="chart_y1" onChange={(item) => this.handleChangePlant(item)}>
                            <option value="column">Bar</option>
                            <option value="area">Area</option>
                            <option value="line">Line</option>
                            <option value="spline">Line with marker</option>
                            <option value="marker">Marker without line</option>
                            </select>
                            </Col>
                            <Col style={{maxWidth:"8%",padding:"2px"}}>
                                <Form.Control type="color" name="color_y1" onChange={(item) => this.handleChangePlant(item)}/>
                            </Col>
                            <Col style={{maxWidth:"6%",padding:"2px"}}>
                                <button type="button" className="btn btn-primary" style={{ width: "100%" }} onClick={() =>this.handleAddYValue(0)}>
                                    <img src="/images/icons/fugue/plus-circle.png" alt="add plant" title="Add Y Value" style={{ float: "left", marginRight: "3" }} />
                                    Add
                                </button>
                            </Col>
                        </Row>
                        {this.state.yValue1!=''?(this.state.yValue1.map((yValue,key) => 
                        <Row style={{margin:"0"}}>
                        <ul class="editGraphTable-detail">
                        <li style={{width:"5%"}}>{(key+1)}</li>
                        <li>
                        {yValue.plantText}
                        </li>
                        <li>
                        {yValue.label}
                        </li>
                        <li>
                            {yValue.channelText}
                        </li>
                        <li>
                            {yValue.aggregation+'(100%)'}
                        </li>
                        <li>
                            {yValue.chartType}
                        </li>
                        <li>
                        <div style={{width:"20px",height:"20px",backgroundColor:yValue.colorCode}}>&nbsp;</div>
                        </li>
                        <li>
                        <img alt="delete" onClick={this.deleteYValue(yValue.yValueId)} src="https://nocc.azurepower.com//images/icons/fugue/cross-circle.png"/>
                        </li>
                        {/* <li>
                        <input type="hidden" name="labelArr[]" value="Forecast">
                        <input type="hidden" name="deviceArr[]" value="actual_generation">
                        <input type="hidden" name="deviceTextArr[]" value="Actual Generation">Actual Generation
                        </li> */}
                        {/* <li><input type="hidden" name="channelTextArr[]" value="Daily"><input type="hidden" name="channelArr[]" value="Daily">Daily</li><li><input type="hidden" name="percentArr[]" value="1"><input type="hidden" name="aggregateArr[]" value="">Actual(100%)</li><li><input type="hidden" name="chartArr[]" value="column">Bar</li><li><input type="hidden" name="colorArr[]" value="#A4A3FF"><div style="width:20px;height:20px;background-color:#A4A3FF">&nbsp;</div></li><li><input type="hidden" name="yaxisArr[]" value="0"><a href="javascript:void(0)" onclick="deleteQuery('https://nocc.azurepower.com/','0','y1')"><img src="https://nocc.azurepower.com//images/icons/fugue/cross-circle.png"></a></li>*/}
                        </ul> 
                        </Row>)):''
                        }
                        <Row style={{margin:"0"}}>
                            <Col style={{maxWidth:"3%",padding:"2px"}}>
                                <Form.Label>Title:</Form.Label>
                            </Col>
                            <Col style={{maxWidth:"12%",padding:"2px"}}>
                                <Form.Control name="y1Title" onChange={this.handleChangeGraphData}  value={this.state.graph.y1Title}/>
                            </Col>
                            <Col style={{maxWidth:"3%",padding:"2px"}}>
                                <Form.Label>Unit:</Form.Label>
                            </Col>
                            <Col style={{maxWidth:"12%",padding:"2px"}}>
                                {/* <Form.Control name="y1Unit" onChange={this.handleChange}  value={this.state.graph.y1Unit}/> */}
                                <select required class="form-control" type="dropdown" name="y1Unit" onChange={(item) => this.handleChangeGraphData(item)}
                                    value={this.state.graph.y1Unit}>
                                    <option>Select Unit</option>
                                    <option value='Blank'>Blank</option>
                                    <option value='W'>W</option>
                                    <option value='kW'>kW</option>
                                    <option value='MW'>MW</option>
                                    <option value='GW'>GW</option>
                                    <option value='kWh'>kWh</option>
                                    <option value='kWh'>kWh</option>
                                    <option value='MWh'>MWh</option>
                                    <option value='GWh'>GWh</option>
                                    <option value='GWh'>GWh</option>
                                    <option value='GWh'>GWh</option>
                                    <option value='GWh'>GWh</option>
                                    <option value="W/m²">W/m²</option>
                                    <option value="kWh/m²">kWh/m²</option>
                                    <option value="°C">°C</option>
                                    <option value="°F">°F</option>
                                    <option value="Hz">Hz</option>
                                    <option value="A">A</option>
                                    <option value="Ω">Ω</option>
                                    <option value="kΩ">kΩ</option>
                                    <option value="V">V</option>
                                    <option value="kV">kV</option>
                                    <option value="kg">kg</option>
                                    <option value="Seconds">Seconds</option>
                                    <option value="Minutes">Minutes</option>
                                    <option value="Hours">Hours</option>
                                    <option value="Days">Days</option>
                                    <option value="Weeks">Weeks</option>
                                    <option value="Months">Months</option>
                                    <option value="Years">Years</option>
                                    <option value="₹">₹</option>
                                    <option value="$">$</option>
                                    <option value="€">€</option>
                                    <option value="%">%</option>
                                    <option value="tonne">tonne</option>
                                    <option value="Degree tilt">Degree tilt</option>
                                </select>
                            </Col>
                            <Col>
                                <div className="inner-scaling">
                                <Row style={{margin:"0"}}>
                                    <Col style={{maxWidth:"18%"}}>
                                        <h6 className="scalingTitle">Scaling</h6>
                                    </Col>
                                    <Col style={{maxWidth:"9%",padding:"2px"}}>
                                        <Form.Label style={{margin:"0"}}>Automatic:</Form.Label>
                                    </Col>
                                    <Col style={{maxWidth:"5%",padding:"2px"}}>
                                        <Form.Check type="checkbox" checked={this.state.graph.y1Min!=null?true:false}/>
                                    </Col>
                                    <Col style={{maxWidth:"9%",padding:"2px"}}>
                                        <Form.Label style={{margin:"0"}}>Min Value:</Form.Label>
                                    </Col>
                                    <Col style={{maxWidth:"16%",padding:"2px"}}>
                                        <Form.Control type="number" name='y1Min' onChange={this.handleChangeGraphData}  value={this.state.graph.y1Min}/>
                                    </Col>
                                    <Col style={{maxWidth:"10%",padding:"2px"}}>
                                        <Form.Label style={{margin:"0"}}>Automatic:</Form.Label>
                                    </Col>
                                    <Col style={{maxWidth:"5%",padding:"2px"}}>
                                        <Form.Check type="checkbox" checked={this.state.graph.y1Max!=null?true:false}/>
                                    </Col>
                                    <Col style={{maxWidth:"10%",padding:"2px"}}>
                                        <Form.Label style={{margin:"0"}}>Max Value:</Form.Label>
                                    </Col>
                                    <Col style={{maxWidth:"15%",padding:"2px"}}>
                                        <Form.Control type="number" name='y1Max' onChange={this.handleChangeGraphData}  value={this.state.graph.y1Max}/>
                                    </Col>
                                </Row>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className="subHead">
                    <div className="subHead" >
                        Y2.1 Axis
                    </div>
                    {this.state.yValue1!=''?
                    <div className="subTableInner">
                    <Row style={{margin:"0"}}>
                            <Col style={{maxWidth:"14%",padding:"2px"}}>
                                <select required class="form-control" type="dropdown" name="plantName_y21" onChange={(item) => this.handleChangePlant(item)} >
                                    {/* value={this.state.selectedPlant} plant_name={this.state.selectedPlant} */}
                                    <option>All plants</option>
                                    {/* <option>{this.state.plans[0].plant_name}</option> */}
                                    {this.props.plants === undefined?<option>default</option>:this.props.plants.map((plant, key) => <option key={plant.plantId}>{plant.plantName}</option>)}
                                </select>
                            </Col>
                            <Col style={{maxWidth:"17%",padding:"2px"}}>
                            <select required class="form-control" type="dropdown" name="deviceName_y21" onChange={(item) => this.handleChangePlant(item)} >
                                    {/* value={this.state.selectedPlant} plant_name={this.state.selectedPlant} */}
                                    <option value="">Select Device</option>
                                    <optgroup label="Parameter">
                                    <option value="actual_generation">Actual Generation</option>
                                    <option value="net_generation">Net Generation</option>
                                    <option value="generation_budget">Budget Generation</option>
                                    <option value="forecast_generation">Forecast Generation</option>
                                    <option value="net_generation_revenue">Net Generation Revenue</option>
                                    <option value="generation_budget_revenue">Budget Generation Revenue</option>
                                    <option value="forecast_generation_revenue">Forecast Generation Revenue</option>
                                    <option value="import">Import</option>
                                    <option value="grid_outage">Grid Outage</option>
                                    <option value="plant_downtime">Plant Downtime</option>
                                    <option value="forecast_insolation_value">Forecast Insolation</option>
                                    <option value="forecast_sunshine_hours">Forecast Sunshine</option>
                                    <option value="forecast_ambient_temp">Forecast Ambient Temperature</option>
                                    <option value="seasonal_tilt">Forecast Seasonal Tilt</option>
                                    <option value="generation_lender">Lender Generation</option>
                                    <option value="generation_provisional">AOP Budget Generation</option>
                                    <option value="plf">PLF Actual</option>
                                    <option value="plf_con_cap">PLF Actual on Connected Capacity</option>
                                    <option value="act_plf_con_cap">Actual PLF on Connected Capacity</option>
                                    <option value="act_plf_ppa_cap">Actual PLF on PPA Capacity</option>
                                    <option value="bdt_plf_con_cap">Budget PLF on Connected Capacity</option>
                                    <option value="bdt_plf_ppa_cap">Budget PLF on PPA Capacity</option>
                                    <option value="lie_plf_con_cap">LIE PLF on Connected Capacity</option>
                                    <option value="lie_plf_ppa_cap">LIE PLF on PPA Capacity</option>
                                    <option value="modeled_generation">Modeled Generation</option>
                                    <option value="pm_completed">PM Task Completed</option>
                                    <option value="pm_not_completed">PM Task Not Completed</option>
                                    <option value="pm_task_plantwise">PM Task - Plantwise</option>
                                    <option value="custom">More Parameters</option>
                                    </optgroup>
                                    <optgroup label="Inverter">
                                    <option value="individual">All Individual Inverter</option>
                                    <option value="cumulative">All Cumulative Inverter</option>
                                    <option value="maxinvid">Max Inverter</option>
                                    {this.props.allInverters === undefined?<option></option>:this.props.allInverters.map((inv, key) => <option key={inv.inverterId}>{inv.inverterName}</option>)}
                                        </optgroup>
                                        <optgroup label="Smu">
                        <option value="cumulative">All Smu</option>
                        {this.props.allSMU === undefined?<option></option>:this.props.allSMU.map((smu, key) => <option key={smu.smuId}>{smu.smuName}</option>)}       
                                        </optgroup>
                                        <optgroup label="Weather Station">
                        <option value="individual">All Individual Weather</option>
                        <option value="cumulative">All Cumulative Weather</option>
                        {this.props.allWeatherStation === undefined?<option></option>:this.props.allWeatherStation.map((weaStation, key) => <option key={weaStation.weatherStationId}>{weaStation.weatherStationName}</option>)}       
                                        </optgroup>
                                        <optgroup label="OST">
                        <option value="ost_mca"> OST - Module cleaning analysis</option>
                        <option value="ost_cpd">OST - Complete plant down</option>
                        <option value="ost_ppd">OST - Partial plant down</option>
                        <option value="ost_alert_plants"> OST - Alert plants</option>
                    </optgroup>
                    <optgroup label="HUB">
                      <option value="hub_net_generation">Net Generation</option>
                      <option value="hub_generation_budget">Budget Generation</option>
                    </optgroup>
                                </select>
                            </Col>
                            <Col style={{maxWidth:"3%",padding:"2px"}}>
                            <Link to="/">
                            <img alt="Add Group" src="/images/addGroupDis.png"/>
                            </Link>
                            </Col>
                            <Col style={{maxWidth:"17%",padding:"2px"}}>
                            <select id="channel_y1" name="channel_y21" onChange={(item) => this.handleChangePlant(item)}>
                            <option value="Select">Select Channel</option>
                                <option value="Daily">Daily</option>
                                <option value="Monthly">Monthly</option>
                            </select>
                            </Col>
                            <Col style={{maxWidth:"13%",padding:"2px"}}>
                            <select id="aggregate_y1" name="aggregate_y21" onChange={(item) => this.handleChangePlant(item)}>
                            <option value="">Actual</option>
                            <option value="avg">Mean</option>
                            <option value="max">Max</option>
                            <option value="min">Min</option>
                            <option value="sum">Sum</option>
                            </select>
                            </Col>
                            <Col style={{maxWidth:"7%",padding:"2px"}}>
                            <select name="percentage_y1" id="percentage_y21" onChange={(item) => this.handleChangePlant(item)}>
            	                	<option value="0.01">1%</option>
                                	<option value="0.02">2%</option>
                                	<option value="0.03">3%</option>
                                	<option value="0.04">4%</option>
                                	<option value="0.05">5%</option>
                                	<option value="0.06">6%</option>
                                	<option value="0.07">7%</option>
                                	<option value="0.08">8%</option>
                                	<option value="0.09">9%</option>
                                	<option value="0.1">10%</option>
                                	<option value="0.11">11%</option>
                                	<option value="0.12">12%</option>
                                	<option value="0.13">13%</option>
                                	<option value="0.14">14%</option>
                                	<option value="0.15">15%</option>
                                	<option value="0.16">16%</option>
                                	<option value="0.17">17%</option>
                                	<option value="0.18">18%</option>
                                	<option value="0.19">19%</option>
                                	<option value="0.2">20%</option>
                                	<option value="0.21">21%</option>
                                	<option value="0.22">22%</option>
                                	<option value="0.23">23%</option>
                                	<option value="0.24">24%</option>
                                	<option value="0.25">25%</option>
                                	<option value="0.26">26%</option>
                                	<option value="0.27">27%</option>
                                	<option value="0.28">28%</option>
                                	<option value="0.29">29%</option>
                                	<option value="0.3">30%</option>
                                	<option value="0.31">31%</option>
                                	<option value="0.32">32%</option>
                                	<option value="0.33">33%</option>
                                	<option value="0.34">34%</option>
                                	<option value="0.35">35%</option>
                                	<option value="0.36">36%</option>
                                	<option value="0.37">37%</option>
                                	<option value="0.38">38%</option>
                                	<option value="0.39">39%</option>
                                	<option value="0.4">40%</option>
                                	<option value="0.41">41%</option>
                                	<option value="0.42">42%</option>
                                	<option value="0.43">43%</option>
                                	<option value="0.44">44%</option>
                                	<option value="0.45">45%</option>
                                	<option value="0.46">46%</option>
                                	<option value="0.47">47%</option>
                                	<option value="0.48">48%</option>
                                	<option value="0.49">49%</option>
                                	<option value="0.5">50%</option>
                                	<option value="0.51">51%</option>
                                	<option value="0.52">52%</option>
                                	<option value="0.53">53%</option>
                                	<option value="0.54">54%</option>
                                	<option value="0.55">55%</option>
                                	<option value="0.56">56%</option>
                                	<option value="0.57">57%</option>
                                	<option value="0.58">58%</option>
                                	<option value="0.59">59%</option>
                                	<option value="0.6">60%</option>
                                	<option value="0.61">61%</option>
                                	<option value="0.62">62%</option>
                                	<option value="0.63">63%</option>
                                	<option value="0.64">64%</option>
                                	<option value="0.65">65%</option>
                                	<option value="0.66">66%</option>
                                	<option value="0.67">67%</option>
                                	<option value="0.68">68%</option>
                                	<option value="0.69">69%</option>
                                	<option value="0.7">70%</option>
                                	<option value="0.71">71%</option>
                                	<option value="0.72">72%</option>
                                	<option value="0.73">73%</option>
                                	<option value="0.74">74%</option>
                                	<option value="0.75">75%</option>
                                	<option value="0.76">76%</option>
                                	<option value="0.77">77%</option>
                                	<option value="0.78">78%</option>
                                	<option value="0.79">79%</option>
                                	<option value="0.8">80%</option>
                                	<option value="0.81">81%</option>
                                	<option value="0.82">82%</option>
                                	<option value="0.83">83%</option>
                                	<option value="0.84">84%</option>
                                	<option value="0.85">85%</option>
                                	<option value="0.86">86%</option>
                                	<option value="0.87">87%</option>
                                	<option value="0.88">88%</option>
                                	<option value="0.89">89%</option>
                                	<option value="0.9">90%</option>
                                	<option value="0.91">91%</option>
                                	<option value="0.92">92%</option>
                                	<option value="0.93">93%</option>
                                	<option value="0.94">94%</option>
                                	<option value="0.95">95%</option>
                                	<option value="0.96">96%</option>
                                	<option value="0.97">97%</option>
                                	<option value="0.98">98%</option>
                                	<option value="0.99">99%</option>
                                	<option value="1" selected="selected">100%</option>
                                </select>
                            </Col>
                            <Col style={{maxWidth:"15%",padding:"2px"}}>
                            <select id="chart_y1" name="chart_y21" onChange={(item) => this.handleChangePlant(item)}>
                            <option value="column">Bar</option>
                            <option value="area">Area</option>
                            <option value="line">Line</option>
                            <option value="spline">Line with marker</option>
                            <option value="marker">Marker without line</option>
                            </select>
                            </Col>
                            <Col style={{maxWidth:"8%",padding:"2px"}}>
                                <Form.Control type="color" name="color_y21" onChange={(item) => this.handleChangePlant(item)}/>
                            </Col>
                            <Col style={{maxWidth:"6%",padding:"2px"}}>
                                <button type="button" className="btn btn-primary" style={{ width: "100%" }} name="1" onClick={() =>this.handleAddYValue(1)}>
                                    <img src="/images/icons/fugue/plus-circle.png" alt="add plant" title="Add Y Value" style={{ float: "left", marginRight: "3" }} />
                                    Add
                                </button>
                            </Col>
                        </Row>
                        {this.state.yValue21!=''?(this.state.yValue21.map((yValue,key) => 
                        <Row style={{margin:"0"}}>
                        <ul class="editGraphTable-detail">
                        <li style={{width:"5%", color: 'black'}}>{(key+1)}</li>
                        <li style={{ color: 'black'}}>
                        {yValue.plantText}
                        </li>
                        <li style={{ color: 'black'}}>
                        {yValue.label}
                        </li>
                        <li style={{ color: 'black'}}>
                            {yValue.channelText}
                        </li>
                        <li style={{ color: 'black'}}>
                            {yValue.aggregation+'(100%)'}
                        </li>
                        <li style={{ color: 'black'}}>
                            {yValue.chartType}
                        </li>
                        <li>
                        <div style={{width:"20px",height:"20px",backgroundColor:yValue.colorCode}}>&nbsp;</div>
                        </li>
                        <li>
                        <img alt="delete" onClick={this.deleteYValue(yValue.yValueId)} src="https://nocc.azurepower.com//images/icons/fugue/cross-circle.png"/>
                        </li>
                        {/* <li>
                        <input type="hidden" name="labelArr[]" value="Forecast">
                        <input type="hidden" name="deviceArr[]" value="actual_generation">
                        <input type="hidden" name="deviceTextArr[]" value="Actual Generation">Actual Generation
                        </li> */}
                        {/* <li><input type="hidden" name="channelTextArr[]" value="Daily"><input type="hidden" name="channelArr[]" value="Daily">Daily</li><li><input type="hidden" name="percentArr[]" value="1"><input type="hidden" name="aggregateArr[]" value="">Actual(100%)</li><li><input type="hidden" name="chartArr[]" value="column">Bar</li><li><input type="hidden" name="colorArr[]" value="#A4A3FF"><div style="width:20px;height:20px;background-color:#A4A3FF">&nbsp;</div></li><li><input type="hidden" name="yaxisArr[]" value="0"><a href="javascript:void(0)" onclick="deleteQuery('https://nocc.azurepower.com/','0','y1')"><img src="https://nocc.azurepower.com//images/icons/fugue/cross-circle.png"></a></li>*/}
                        </ul> 
                        </Row>)):''
                        }
                        <Row style={{margin:"0"}}>
                            <Col style={{maxWidth:"3%",padding:"2px"}}>
                                <Form.Label>Title:</Form.Label>
                            </Col>
                            <Col style={{maxWidth:"12%",padding:"2px"}}>
                                <Form.Control name="y21Title" onChange={this.handleChangeGraphData}  value={this.state.graph.y21Title}/>
                            </Col>
                            <Col style={{maxWidth:"3%",padding:"2px"}}>
                                <Form.Label>Unit:</Form.Label>
                            </Col>
                            <Col style={{maxWidth:"12%",padding:"2px"}}>
                                {/* <Form.Control name="y1Unit" onChange={this.handleChange}  value={this.state.graph.y1Unit}/> */}
                                <select required class="form-control" type="dropdown" name="y21Unit" onChange={(item) => this.handleChangeGraphData(item)}
                                    value={this.state.graph.y21Unit}>
                                    <option>Select Unit</option>
                                    <option value='Blank'>Blank</option>
                                    <option value='W'>W</option>
                                    <option value='kW'>kW</option>
                                    <option value='MW'>MW</option>
                                    <option value='GW'>GW</option>
                                    <option value='kWh'>kWh</option>
                                    <option value='kWh'>kWh</option>
                                    <option value='MWh'>MWh</option>
                                    <option value='GWh'>GWh</option>
                                    <option value='GWh'>GWh</option>
                                    <option value='GWh'>GWh</option>
                                    <option value='GWh'>GWh</option>
                                    <option value="W/m²">W/m²</option>
                                    <option value="kWh/m²">kWh/m²</option>
                                    <option value="°C">°C</option>
                                    <option value="°F">°F</option>
                                    <option value="Hz">Hz</option>
                                    <option value="A">A</option>
                                    <option value="Ω">Ω</option>
                                    <option value="kΩ">kΩ</option>
                                    <option value="V">V</option>
                                    <option value="kV">kV</option>
                                    <option value="kg">kg</option>
                                    <option value="Seconds">Seconds</option>
                                    <option value="Minutes">Minutes</option>
                                    <option value="Hours">Hours</option>
                                    <option value="Days">Days</option>
                                    <option value="Weeks">Weeks</option>
                                    <option value="Months">Months</option>
                                    <option value="Years">Years</option>
                                    <option value="₹">₹</option>
                                    <option value="$">$</option>
                                    <option value="€">€</option>
                                    <option value="%">%</option>
                                    <option value="tonne">tonne</option>
                                    <option value="Degree tilt">Degree tilt</option>
                                </select>
                            </Col>
                            <Col>
                                <div className="inner-scaling">
                                <Row style={{margin:"0"}}>
                                    <Col style={{maxWidth:"18%"}}>
                                        <h6 className="scalingTitle">Scaling</h6>
                                    </Col>
                                    <Col style={{maxWidth:"9%",padding:"2px"}}>
                                        <Form.Label style={{margin:"0"}}>Automatic:</Form.Label>
                                    </Col>
                                    <Col style={{maxWidth:"5%",padding:"2px"}}>
                                        <Form.Check type="checkbox" checked={this.state.graph.y21Min!=null?true:false}/>
                                    </Col>
                                    <Col style={{maxWidth:"9%",padding:"2px"}}>
                                        <Form.Label style={{margin:"0"}}>Min Value:</Form.Label>
                                    </Col>
                                    <Col style={{maxWidth:"16%",padding:"2px"}}>
                                        <Form.Control type="number" name='y21Min' onChange={this.handleChangeGraphData}  value={this.state.graph.y21Min}/>
                                    </Col>
                                    <Col style={{maxWidth:"10%",padding:"2px"}}>
                                        <Form.Label style={{margin:"0"}}>Automatic:</Form.Label>
                                    </Col>
                                    <Col style={{maxWidth:"5%",padding:"2px"}}>
                                        <Form.Check type="checkbox" checked={this.state.graph.y21Max!=null?true:false}/>
                                    </Col>
                                    <Col style={{maxWidth:"10%",padding:"2px"}}>
                                        <Form.Label style={{margin:"0"}}>Max Value:</Form.Label>
                                    </Col>
                                    <Col style={{maxWidth:"15%",padding:"2px"}}>
                                        <Form.Control type="number" name='y21Max' onChange={this.handleChangeGraphData}  value={this.state.graph.y21Max}/>
                                    </Col>
                                </Row>
                                </div>
                            </Col>
                        </Row>
                    </div>
                :<div></div>}
                    </div>
                <div className="subTable">
                <div className="subHead">
                        Y2.2 Axis
                    </div>
                    {this.state.yValue21!=''?
                    <div className="subTableInner">
                        <Row style={{margin:"0"}}>
                            <Col style={{maxWidth:"14%",padding:"2px"}}>
                                <select required class="form-control" type="dropdown" name="plantName_y22" onChange={(item) => this.handleChangePlant(item)} >
                                    {/* value={this.state.selectedPlant} plant_name={this.state.selectedPlant} */}
                                    <option>All plants</option>
                                    {/* <option>{this.state.plans[0].plant_name}</option> */}
                                    {this.props.plants === undefined?<option>default</option>:this.props.plants.map((plant, key) => <option key={plant.plantId}>{plant.plantName}</option>)}
                                </select>
                            </Col>
                            <Col style={{maxWidth:"17%",padding:"2px"}}>
                            <select required class="form-control" type="dropdown" name="deviceName_y22" onChange={(item) => this.handleChangePlant(item)} >
                                    {/* value={this.state.selectedPlant} plant_name={this.state.selectedPlant} */}
                                    <option value="">Select Device</option>
                                    <optgroup label="Parameter">
                                    <option value="actual_generation">Actual Generation</option>
                                    <option value="net_generation">Net Generation</option>
                                    <option value="generation_budget">Budget Generation</option>
                                    <option value="forecast_generation">Forecast Generation</option>
                                    <option value="net_generation_revenue">Net Generation Revenue</option>
                                    <option value="generation_budget_revenue">Budget Generation Revenue</option>
                                    <option value="forecast_generation_revenue">Forecast Generation Revenue</option>
                                    <option value="import">Import</option>
                                    <option value="grid_outage">Grid Outage</option>
                                    <option value="plant_downtime">Plant Downtime</option>
                                    <option value="forecast_insolation_value">Forecast Insolation</option>
                                    <option value="forecast_sunshine_hours">Forecast Sunshine</option>
                                    <option value="forecast_ambient_temp">Forecast Ambient Temperature</option>
                                    <option value="seasonal_tilt">Forecast Seasonal Tilt</option>
                                    <option value="generation_lender">Lender Generation</option>
                                    <option value="generation_provisional">AOP Budget Generation</option>
                                    <option value="plf">PLF Actual</option>
                                    <option value="plf_con_cap">PLF Actual on Connected Capacity</option>
                                    <option value="act_plf_con_cap">Actual PLF on Connected Capacity</option>
                                    <option value="act_plf_ppa_cap">Actual PLF on PPA Capacity</option>
                                    <option value="bdt_plf_con_cap">Budget PLF on Connected Capacity</option>
                                    <option value="bdt_plf_ppa_cap">Budget PLF on PPA Capacity</option>
                                    <option value="lie_plf_con_cap">LIE PLF on Connected Capacity</option>
                                    <option value="lie_plf_ppa_cap">LIE PLF on PPA Capacity</option>
                                    <option value="modeled_generation">Modeled Generation</option>
                                    <option value="pm_completed">PM Task Completed</option>
                                    <option value="pm_not_completed">PM Task Not Completed</option>
                                    <option value="pm_task_plantwise">PM Task - Plantwise</option>
                                    <option value="custom">More Parameters</option>
                                    </optgroup>
                                    <optgroup label="Inverter">
                                    <option value="individual">All Individual Inverter</option>
                                    <option value="cumulative">All Cumulative Inverter</option>
                                    <option value="maxinvid">Max Inverter</option>
                                    {this.props.allInverters === undefined?<option></option>:this.props.allInverters.map((inv, key) => <option key={inv.inverterId}>{inv.inverterName}</option>)}
                                        </optgroup>
                                        <optgroup label="Smu">
                        <option value="cumulative">All Smu</option>
                        {this.props.allSMU === undefined?<option></option>:this.props.allSMU.map((smu, key) => <option key={smu.smuId}>{smu.smuName}</option>)}       
                                        </optgroup>
                                        <optgroup label="Weather Station">
                        <option value="individual">All Individual Weather</option>
                        <option value="cumulative">All Cumulative Weather</option>
                        {this.props.allWeatherStation === undefined?<option></option>:this.props.allWeatherStation.map((weaStation, key) => <option key={weaStation.weatherStationId}>{weaStation.weatherStationName}</option>)}       
                                        </optgroup>
                                        <optgroup label="OST">
                        <option value="ost_mca"> OST - Module cleaning analysis</option>
                        <option value="ost_cpd">OST - Complete plant down</option>
                        <option value="ost_ppd">OST - Partial plant down</option>
                        <option value="ost_alert_plants"> OST - Alert plants</option>
                    </optgroup>
                    <optgroup label="HUB">
                      <option value="hub_net_generation">Net Generation</option>
                      <option value="hub_generation_budget">Budget Generation</option>
                    </optgroup>
                                </select>
                            </Col>
                            <Col style={{maxWidth:"3%",padding:"2px"}}>
                            <Link to="/">
                            <img alt="Add Group" src="/images/addGroupDis.png"/>
                            </Link>
                            </Col>
                            <Col style={{maxWidth:"17%",padding:"2px"}}>
                            <select id="channel_y1" name="channel_y22" onChange={(item) => this.handleChangePlant(item)}>
                            <option value="Select">Select Channel</option>
                                <option value="Daily">Daily</option>
                                <option value="Monthly">Monthly</option>
                            </select>
                            </Col>
                            <Col style={{maxWidth:"13%",padding:"2px"}}>
                            <select id="aggregate_y1" name="aggregate_y22" onChange={(item) => this.handleChangePlant(item)}>
                            <option value="">Actual</option>
                            <option value="avg">Mean</option>
                            <option value="max">Max</option>
                            <option value="min">Min</option>
                            <option value="sum">Sum</option>
                            </select>
                            </Col>
                            <Col style={{maxWidth:"7%",padding:"2px"}}>
                            <select name="percentage_y1" id="percentage_y22" onChange={(item) => this.handleChangePlant(item)}>
            	                	<option value="0.01">1%</option>
                                	<option value="0.02">2%</option>
                                	<option value="0.03">3%</option>
                                	<option value="0.04">4%</option>
                                	<option value="0.05">5%</option>
                                	<option value="0.06">6%</option>
                                	<option value="0.07">7%</option>
                                	<option value="0.08">8%</option>
                                	<option value="0.09">9%</option>
                                	<option value="0.1">10%</option>
                                	<option value="0.11">11%</option>
                                	<option value="0.12">12%</option>
                                	<option value="0.13">13%</option>
                                	<option value="0.14">14%</option>
                                	<option value="0.15">15%</option>
                                	<option value="0.16">16%</option>
                                	<option value="0.17">17%</option>
                                	<option value="0.18">18%</option>
                                	<option value="0.19">19%</option>
                                	<option value="0.2">20%</option>
                                	<option value="0.21">21%</option>
                                	<option value="0.22">22%</option>
                                	<option value="0.23">23%</option>
                                	<option value="0.24">24%</option>
                                	<option value="0.25">25%</option>
                                	<option value="0.26">26%</option>
                                	<option value="0.27">27%</option>
                                	<option value="0.28">28%</option>
                                	<option value="0.29">29%</option>
                                	<option value="0.3">30%</option>
                                	<option value="0.31">31%</option>
                                	<option value="0.32">32%</option>
                                	<option value="0.33">33%</option>
                                	<option value="0.34">34%</option>
                                	<option value="0.35">35%</option>
                                	<option value="0.36">36%</option>
                                	<option value="0.37">37%</option>
                                	<option value="0.38">38%</option>
                                	<option value="0.39">39%</option>
                                	<option value="0.4">40%</option>
                                	<option value="0.41">41%</option>
                                	<option value="0.42">42%</option>
                                	<option value="0.43">43%</option>
                                	<option value="0.44">44%</option>
                                	<option value="0.45">45%</option>
                                	<option value="0.46">46%</option>
                                	<option value="0.47">47%</option>
                                	<option value="0.48">48%</option>
                                	<option value="0.49">49%</option>
                                	<option value="0.5">50%</option>
                                	<option value="0.51">51%</option>
                                	<option value="0.52">52%</option>
                                	<option value="0.53">53%</option>
                                	<option value="0.54">54%</option>
                                	<option value="0.55">55%</option>
                                	<option value="0.56">56%</option>
                                	<option value="0.57">57%</option>
                                	<option value="0.58">58%</option>
                                	<option value="0.59">59%</option>
                                	<option value="0.6">60%</option>
                                	<option value="0.61">61%</option>
                                	<option value="0.62">62%</option>
                                	<option value="0.63">63%</option>
                                	<option value="0.64">64%</option>
                                	<option value="0.65">65%</option>
                                	<option value="0.66">66%</option>
                                	<option value="0.67">67%</option>
                                	<option value="0.68">68%</option>
                                	<option value="0.69">69%</option>
                                	<option value="0.7">70%</option>
                                	<option value="0.71">71%</option>
                                	<option value="0.72">72%</option>
                                	<option value="0.73">73%</option>
                                	<option value="0.74">74%</option>
                                	<option value="0.75">75%</option>
                                	<option value="0.76">76%</option>
                                	<option value="0.77">77%</option>
                                	<option value="0.78">78%</option>
                                	<option value="0.79">79%</option>
                                	<option value="0.8">80%</option>
                                	<option value="0.81">81%</option>
                                	<option value="0.82">82%</option>
                                	<option value="0.83">83%</option>
                                	<option value="0.84">84%</option>
                                	<option value="0.85">85%</option>
                                	<option value="0.86">86%</option>
                                	<option value="0.87">87%</option>
                                	<option value="0.88">88%</option>
                                	<option value="0.89">89%</option>
                                	<option value="0.9">90%</option>
                                	<option value="0.91">91%</option>
                                	<option value="0.92">92%</option>
                                	<option value="0.93">93%</option>
                                	<option value="0.94">94%</option>
                                	<option value="0.95">95%</option>
                                	<option value="0.96">96%</option>
                                	<option value="0.97">97%</option>
                                	<option value="0.98">98%</option>
                                	<option value="0.99">99%</option>
                                	<option value="1" selected="selected">100%</option>
                                </select>
                            </Col>
                            <Col style={{maxWidth:"15%",padding:"2px"}}>
                            <select id="chart_y1" name="chart_y22" onChange={(item) => this.handleChangePlant(item)}>
                            <option value="column">Bar</option>
                            <option value="area">Area</option>
                            <option value="line">Line</option>
                            <option value="spline">Line with marker</option>
                            <option value="marker">Marker without line</option>
                            </select>
                            </Col>
                            <Col style={{maxWidth:"8%",padding:"2px"}}>
                                <Form.Control type="color" name="color_y22" onChange={(item) => this.handleChangePlant(item)}/>
                            </Col>
                            <Col style={{maxWidth:"6%",padding:"2px"}}>
                                <button type="button" className="btn btn-primary" style={{ width: "100%" }} name="2" onClick={() =>this.handleAddYValue(2)}>
                                    <img src="/images/icons/fugue/plus-circle.png" alt="add plant" title="Add Y Value" style={{ float: "left", marginRight: "3" }} />
                                    Add
                                </button>
                            </Col>
                        </Row>
                        {this.state.yValue22!=''?(this.state.yValue22.map((yValue,key) => 
                        <Row style={{margin:"0"}}>
                        <ul class="editGraphTable-detail">
                        <li style={{width:"5%",color:'black'}}>{(key+1)}</li>
                        <li style={{ color: 'black'}}>
                        {yValue.plantText}
                        </li>
                        <li style={{ color: 'black'}}>
                        {yValue.label}
                        </li>
                        <li style={{ color: 'black'}}>
                            {yValue.channelText}
                        </li>
                        <li style={{ color: 'black'}}>
                            {yValue.aggregation+'(100%)'}
                        </li>
                        <li style={{ color: 'black'}}>
                            {yValue.chartType}
                        </li>
                        <li>
                        <div style={{width:"20px",height:"20px",backgroundColor:yValue.colorCode}}>&nbsp;</div>
                        </li>
                        <li>
                        <img alt="delete" onClick={this.deleteYValue(yValue.yValueId)} src="https://nocc.azurepower.com//images/icons/fugue/cross-circle.png"/>
                        </li>
                        {/* <li>
                        <input type="hidden" name="labelArr[]" value="Forecast">
                        <input type="hidden" name="deviceArr[]" value="actual_generation">
                        <input type="hidden" name="deviceTextArr[]" value="Actual Generation">Actual Generation
                        </li> */}
                        {/* <li><input type="hidden" name="channelTextArr[]" value="Daily"><input type="hidden" name="channelArr[]" value="Daily">Daily</li><li><input type="hidden" name="percentArr[]" value="1"><input type="hidden" name="aggregateArr[]" value="">Actual(100%)</li><li><input type="hidden" name="chartArr[]" value="column">Bar</li><li><input type="hidden" name="colorArr[]" value="#A4A3FF"><div style="width:20px;height:20px;background-color:#A4A3FF">&nbsp;</div></li><li><input type="hidden" name="yaxisArr[]" value="0"><a href="javascript:void(0)" onclick="deleteQuery('https://nocc.azurepower.com/','0','y1')"><img src="https://nocc.azurepower.com//images/icons/fugue/cross-circle.png"></a></li>*/}
                        </ul> 
                        </Row>)):''
                        }
                        <Row style={{margin:"0"}}>
                            <Col style={{maxWidth:"3%",padding:"2px"}}>
                                <Form.Label>Title:</Form.Label>
                            </Col>
                            <Col style={{maxWidth:"12%",padding:"2px"}}>
                                <Form.Control name="y22Title" onChange={this.handleChangeGraphData}  value={this.state.graph.y22Title}/>
                            </Col>
                            <Col style={{maxWidth:"3%",padding:"2px"}}>
                                <Form.Label>Unit:</Form.Label>
                            </Col>
                            <Col style={{maxWidth:"12%",padding:"2px"}}>
                                {/* <Form.Control name="y1Unit" onChange={this.handleChange}  value={this.state.graph.y1Unit}/> */}
                                <select required class="form-control" type="dropdown" name="y22Unit" onChange={(item) => this.handleChangeGraphData(item)}
                                    value={this.state.graph.y22Unit}>
                                    <option>Select Unit</option>
                                    <option value='Blank'>Blank</option>
                                    <option value='W'>W</option>
                                    <option value='kW'>kW</option>
                                    <option value='MW'>MW</option>
                                    <option value='GW'>GW</option>
                                    <option value='kWh'>kWh</option>
                                    <option value='kWh'>kWh</option>
                                    <option value='MWh'>MWh</option>
                                    <option value='GWh'>GWh</option>
                                    <option value='GWh'>GWh</option>
                                    <option value='GWh'>GWh</option>
                                    <option value='GWh'>GWh</option>
                                    <option value="W/m²">W/m²</option>
                                    <option value="kWh/m²">kWh/m²</option>
                                    <option value="°C">°C</option>
                                    <option value="°F">°F</option>
                                    <option value="Hz">Hz</option>
                                    <option value="A">A</option>
                                    <option value="Ω">Ω</option>
                                    <option value="kΩ">kΩ</option>
                                    <option value="V">V</option>
                                    <option value="kV">kV</option>
                                    <option value="kg">kg</option>
                                    <option value="Seconds">Seconds</option>
                                    <option value="Minutes">Minutes</option>
                                    <option value="Hours">Hours</option>
                                    <option value="Days">Days</option>
                                    <option value="Weeks">Weeks</option>
                                    <option value="Months">Months</option>
                                    <option value="Years">Years</option>
                                    <option value="₹">₹</option>
                                    <option value="$">$</option>
                                    <option value="€">€</option>
                                    <option value="%">%</option>
                                    <option value="tonne">tonne</option>
                                    <option value="Degree tilt">Degree tilt</option>
                                </select>
                            </Col>
                            <Col>
                                <div className="inner-scaling">
                                <Row style={{margin:"0"}}>
                                    <Col style={{maxWidth:"18%"}}>
                                        <h6 className="scalingTitle">Scaling</h6>
                                    </Col>
                                    <Col style={{maxWidth:"9%",padding:"2px"}}>
                                        <Form.Label style={{margin:"0"}}>Automatic:</Form.Label>
                                    </Col>
                                    <Col style={{maxWidth:"5%",padding:"2px"}}>
                                        <Form.Check type="checkbox" checked={this.state.graph.y22Min!=null?true:false}/>
                                    </Col>
                                    <Col style={{maxWidth:"9%",padding:"2px"}}>
                                        <Form.Label style={{margin:"0"}}>Min Value:</Form.Label>
                                    </Col>
                                    <Col style={{maxWidth:"16%",padding:"2px"}}>
                                        <Form.Control type="number" name='y22Min' onChange={this.handleChangeGraphData}  value={this.state.graph.y22Min}/>
                                    </Col>
                                    <Col style={{maxWidth:"10%",padding:"2px"}}>
                                        <Form.Label style={{margin:"0"}}>Automatic:</Form.Label>
                                    </Col>
                                    <Col style={{maxWidth:"5%",padding:"2px"}}>
                                        <Form.Check type="checkbox" checked={this.state.graph.y22Max!=null?true:false}/>
                                    </Col>
                                    <Col style={{maxWidth:"10%",padding:"2px"}}>
                                        <Form.Label style={{margin:"0"}}>Max Value:</Form.Label>
                                    </Col>
                                    <Col style={{maxWidth:"15%",padding:"2px"}}>
                                        <Form.Control type="number" name='y22Max' onChange={this.handleChangeGraphData}  value={this.state.graph.y22Max}/>
                                    </Col>
                                </Row>
                                </div>
                            </Col>
                        </Row>
                    </div>:<div></div>}
                </div>
                <div className="subTable">
                <div className="subHead">
                        Y2.3 Axis
                    </div>
                    {this.state.yValue22!=''?
                    <div className="subTableInner">
                        <Row style={{margin:"0"}}>
                            <Col style={{maxWidth:"14%",padding:"2px"}}>
                                <select required class="form-control" type="dropdown" name="plantName_y23" onChange={(item) => this.handleChangePlant(item)} >
                                    {/* value={this.state.selectedPlant} plant_name={this.state.selectedPlant} */}
                                    <option>All plants</option>
                                    {/* <option>{this.state.plans[0].plant_name}</option> */}
                                    {this.props.plants === undefined?<option>default</option>:this.props.plants.map((plant, key) => <option key={plant.plantId}>{plant.plantName}</option>)}
                                </select>
                            </Col>
                            <Col style={{maxWidth:"17%",padding:"2px"}}>
                            <select required class="form-control" type="dropdown" name="deviceName_y23" onChange={(item) => this.handleChangePlant(item)} >
                                    {/* value={this.state.selectedPlant} plant_name={this.state.selectedPlant} */}
                                    <option value="">Select Device</option>
                                    <optgroup label="Parameter">
                                    <option value="actual_generation">Actual Generation</option>
                                    <option value="net_generation">Net Generation</option>
                                    <option value="generation_budget">Budget Generation</option>
                                    <option value="forecast_generation">Forecast Generation</option>
                                    <option value="net_generation_revenue">Net Generation Revenue</option>
                                    <option value="generation_budget_revenue">Budget Generation Revenue</option>
                                    <option value="forecast_generation_revenue">Forecast Generation Revenue</option>
                                    <option value="import">Import</option>
                                    <option value="grid_outage">Grid Outage</option>
                                    <option value="plant_downtime">Plant Downtime</option>
                                    <option value="forecast_insolation_value">Forecast Insolation</option>
                                    <option value="forecast_sunshine_hours">Forecast Sunshine</option>
                                    <option value="forecast_ambient_temp">Forecast Ambient Temperature</option>
                                    <option value="seasonal_tilt">Forecast Seasonal Tilt</option>
                                    <option value="generation_lender">Lender Generation</option>
                                    <option value="generation_provisional">AOP Budget Generation</option>
                                    <option value="plf">PLF Actual</option>
                                    <option value="plf_con_cap">PLF Actual on Connected Capacity</option>
                                    <option value="act_plf_con_cap">Actual PLF on Connected Capacity</option>
                                    <option value="act_plf_ppa_cap">Actual PLF on PPA Capacity</option>
                                    <option value="bdt_plf_con_cap">Budget PLF on Connected Capacity</option>
                                    <option value="bdt_plf_ppa_cap">Budget PLF on PPA Capacity</option>
                                    <option value="lie_plf_con_cap">LIE PLF on Connected Capacity</option>
                                    <option value="lie_plf_ppa_cap">LIE PLF on PPA Capacity</option>
                                    <option value="modeled_generation">Modeled Generation</option>
                                    <option value="pm_completed">PM Task Completed</option>
                                    <option value="pm_not_completed">PM Task Not Completed</option>
                                    <option value="pm_task_plantwise">PM Task - Plantwise</option>
                                    <option value="custom">More Parameters</option>
                                    </optgroup>
                                    <optgroup label="Inverter">
                                    <option value="individual">All Individual Inverter</option>
                                    <option value="cumulative">All Cumulative Inverter</option>
                                    <option value="maxinvid">Max Inverter</option>
                                    {this.props.allInverters === undefined?<option></option>:this.props.allInverters.map((inv, key) => <option key={inv.inverterId}>{inv.inverterName}</option>)}
                                        </optgroup>
                                        <optgroup label="Smu">
                        <option value="cumulative">All Smu</option>
                        {this.props.allSMU === undefined?<option></option>:this.props.allSMU.map((smu, key) => <option key={smu.smuId}>{smu.smuName}</option>)}       
                                        </optgroup>
                                        <optgroup label="Weather Station">
                        <option value="individual">All Individual Weather</option>
                        <option value="cumulative">All Cumulative Weather</option>
                        {this.props.allWeatherStation === undefined?<option></option>:this.props.allWeatherStation.map((weaStation, key) => <option key={weaStation.weatherStationId}>{weaStation.weatherStationName}</option>)}       
                                        </optgroup>
                                        <optgroup label="OST">
                        <option value="ost_mca"> OST - Module cleaning analysis</option>
                        <option value="ost_cpd">OST - Complete plant down</option>
                        <option value="ost_ppd">OST - Partial plant down</option>
                        <option value="ost_alert_plants"> OST - Alert plants</option>
                    </optgroup>
                    <optgroup label="HUB">
                      <option value="hub_net_generation">Net Generation</option>
                      <option value="hub_generation_budget">Budget Generation</option>
                    </optgroup>
                                </select>
                            </Col>
                            <Col style={{maxWidth:"3%",padding:"2px"}}>
                            <Link to="/">
                            <img alt="Add Group" src="/images/addGroupDis.png"/>
                            </Link>
                            </Col>
                            <Col style={{maxWidth:"17%",padding:"2px"}}>
                            <select id="channel_y1" name="channel_y23" onChange={(item) => this.handleChangePlant(item)}>
                            <option value="Select">Select Channel</option>
                                <option value="Daily">Daily</option>
                                <option value="Monthly">Monthly</option>
                            </select>
                            </Col>
                            <Col style={{maxWidth:"13%",padding:"2px"}}>
                            <select id="aggregate_y1" name="aggregate_y23" onChange={(item) => this.handleChangePlant(item)}>
                            <option value="">Actual</option>
                            <option value="avg">Mean</option>
                            <option value="max">Max</option>
                            <option value="min">Min</option>
                            <option value="sum">Sum</option>
                            </select>
                            </Col>
                            <Col style={{maxWidth:"7%",padding:"2px"}}>
                            <select name="percentage_y1" id="percentage_y23" onChange={(item) => this.handleChangePlant(item)}>
            	                	<option value="0.01">1%</option>
                                	<option value="0.02">2%</option>
                                	<option value="0.03">3%</option>
                                	<option value="0.04">4%</option>
                                	<option value="0.05">5%</option>
                                	<option value="0.06">6%</option>
                                	<option value="0.07">7%</option>
                                	<option value="0.08">8%</option>
                                	<option value="0.09">9%</option>
                                	<option value="0.1">10%</option>
                                	<option value="0.11">11%</option>
                                	<option value="0.12">12%</option>
                                	<option value="0.13">13%</option>
                                	<option value="0.14">14%</option>
                                	<option value="0.15">15%</option>
                                	<option value="0.16">16%</option>
                                	<option value="0.17">17%</option>
                                	<option value="0.18">18%</option>
                                	<option value="0.19">19%</option>
                                	<option value="0.2">20%</option>
                                	<option value="0.21">21%</option>
                                	<option value="0.22">22%</option>
                                	<option value="0.23">23%</option>
                                	<option value="0.24">24%</option>
                                	<option value="0.25">25%</option>
                                	<option value="0.26">26%</option>
                                	<option value="0.27">27%</option>
                                	<option value="0.28">28%</option>
                                	<option value="0.29">29%</option>
                                	<option value="0.3">30%</option>
                                	<option value="0.31">31%</option>
                                	<option value="0.32">32%</option>
                                	<option value="0.33">33%</option>
                                	<option value="0.34">34%</option>
                                	<option value="0.35">35%</option>
                                	<option value="0.36">36%</option>
                                	<option value="0.37">37%</option>
                                	<option value="0.38">38%</option>
                                	<option value="0.39">39%</option>
                                	<option value="0.4">40%</option>
                                	<option value="0.41">41%</option>
                                	<option value="0.42">42%</option>
                                	<option value="0.43">43%</option>
                                	<option value="0.44">44%</option>
                                	<option value="0.45">45%</option>
                                	<option value="0.46">46%</option>
                                	<option value="0.47">47%</option>
                                	<option value="0.48">48%</option>
                                	<option value="0.49">49%</option>
                                	<option value="0.5">50%</option>
                                	<option value="0.51">51%</option>
                                	<option value="0.52">52%</option>
                                	<option value="0.53">53%</option>
                                	<option value="0.54">54%</option>
                                	<option value="0.55">55%</option>
                                	<option value="0.56">56%</option>
                                	<option value="0.57">57%</option>
                                	<option value="0.58">58%</option>
                                	<option value="0.59">59%</option>
                                	<option value="0.6">60%</option>
                                	<option value="0.61">61%</option>
                                	<option value="0.62">62%</option>
                                	<option value="0.63">63%</option>
                                	<option value="0.64">64%</option>
                                	<option value="0.65">65%</option>
                                	<option value="0.66">66%</option>
                                	<option value="0.67">67%</option>
                                	<option value="0.68">68%</option>
                                	<option value="0.69">69%</option>
                                	<option value="0.7">70%</option>
                                	<option value="0.71">71%</option>
                                	<option value="0.72">72%</option>
                                	<option value="0.73">73%</option>
                                	<option value="0.74">74%</option>
                                	<option value="0.75">75%</option>
                                	<option value="0.76">76%</option>
                                	<option value="0.77">77%</option>
                                	<option value="0.78">78%</option>
                                	<option value="0.79">79%</option>
                                	<option value="0.8">80%</option>
                                	<option value="0.81">81%</option>
                                	<option value="0.82">82%</option>
                                	<option value="0.83">83%</option>
                                	<option value="0.84">84%</option>
                                	<option value="0.85">85%</option>
                                	<option value="0.86">86%</option>
                                	<option value="0.87">87%</option>
                                	<option value="0.88">88%</option>
                                	<option value="0.89">89%</option>
                                	<option value="0.9">90%</option>
                                	<option value="0.91">91%</option>
                                	<option value="0.92">92%</option>
                                	<option value="0.93">93%</option>
                                	<option value="0.94">94%</option>
                                	<option value="0.95">95%</option>
                                	<option value="0.96">96%</option>
                                	<option value="0.97">97%</option>
                                	<option value="0.98">98%</option>
                                	<option value="0.99">99%</option>
                                	<option value="1" selected="selected">100%</option>
                                </select>
                            </Col>
                            <Col style={{maxWidth:"15%",padding:"2px"}}>
                            <select id="chart_y1" name="chart_y23" onChange={(item) => this.handleChangePlant(item)}>
                            <option value="column">Bar</option>
                            <option value="area">Area</option>
                            <option value="line">Line</option>
                            <option value="spline">Line with marker</option>
                            <option value="marker">Marker without line</option>
                            </select>
                            </Col>
                            <Col style={{maxWidth:"8%",padding:"2px"}}>
                                <Form.Control type="color" name="color_y23" onChange={(item) => this.handleChangePlant(item)}/>
                            </Col>
                            <Col style={{maxWidth:"6%",padding:"2px"}}>
                                <button type="button" className="btn btn-primary" style={{ width: "100%" }} name="3" onClick={() =>this.handleAddYValue(3)}>
                                    <img src="/images/icons/fugue/plus-circle.png" alt="add plant" title="Add Y Value" style={{ float: "left", marginRight: "3" }} />
                                    Add
                                </button>
                            </Col>
                        </Row>
                        {this.state.yValue23!=''?(this.state.yValue23.map((yValue,key) => 
                        <Row style={{margin:"0"}}>
                        <ul class="editGraphTable-detail">
                        <li style={{width:"5%",color:'black'}}>{(key+1)}</li>
                        <li style={{ color: 'black'}}>
                        {yValue.plantText}
                        </li>
                        <li style={{ color: 'black'}}>
                        {yValue.label}
                        </li>
                        <li style={{ color: 'black'}}>
                            {yValue.channelText}
                        </li>
                        <li style={{ color: 'black'}}>
                            {yValue.aggregation+'(100%)'}
                        </li>
                        <li style={{ color: 'black'}}>
                            {yValue.chartType}
                        </li>
                        <li>
                        <div style={{width:"20px",height:"20px",backgroundColor:yValue.colorCode}}>&nbsp;</div>
                        </li>
                        <li>
                        <img alt="delete" onClick={this.deleteYValue(yValue.yValueId)} src="https://nocc.azurepower.com//images/icons/fugue/cross-circle.png"/>
                        </li>
                        {/* <li>
                        <input type="hidden" name="labelArr[]" value="Forecast">
                        <input type="hidden" name="deviceArr[]" value="actual_generation">
                        <input type="hidden" name="deviceTextArr[]" value="Actual Generation">Actual Generation
                        </li> */}
                        {/* <li><input type="hidden" name="channelTextArr[]" value="Daily"><input type="hidden" name="channelArr[]" value="Daily">Daily</li><li><input type="hidden" name="percentArr[]" value="1"><input type="hidden" name="aggregateArr[]" value="">Actual(100%)</li><li><input type="hidden" name="chartArr[]" value="column">Bar</li><li><input type="hidden" name="colorArr[]" value="#A4A3FF"><div style="width:20px;height:20px;background-color:#A4A3FF">&nbsp;</div></li><li><input type="hidden" name="yaxisArr[]" value="0"><a href="javascript:void(0)" onclick="deleteQuery('https://nocc.azurepower.com/','0','y1')"><img src="https://nocc.azurepower.com//images/icons/fugue/cross-circle.png"></a></li>*/}
                        </ul> 
                        </Row>)):''
                        }
                        <Row style={{margin:"0"}}>
                            <Col style={{maxWidth:"3%",padding:"2px"}}>
                                <Form.Label>Title:</Form.Label>
                            </Col>
                            <Col style={{maxWidth:"12%",padding:"2px"}}>
                                <Form.Control name="y23Title" onChange={this.handleChangeGraphData}  value={this.state.graph.y23Title}/>
                            </Col>
                            <Col style={{maxWidth:"3%",padding:"2px"}}>
                                <Form.Label>Unit:</Form.Label>
                            </Col>
                            <Col style={{maxWidth:"12%",padding:"2px"}}>
                                {/* <Form.Control name="y1Unit" onChange={this.handleChange}  value={this.state.graph.y1Unit}/> */}
                                <select required class="form-control" type="dropdown" name="y23Unit" onChange={(item) => this.handleChangeGraphData(item)}
                                    value={this.state.graph.y23Unit}>
                                    <option>Select Unit</option>
                                    <option value='Blank'>Blank</option>
                                    <option value='W'>W</option>
                                    <option value='kW'>kW</option>
                                    <option value='MW'>MW</option>
                                    <option value='GW'>GW</option>
                                    <option value='kWh'>kWh</option>
                                    <option value='kWh'>kWh</option>
                                    <option value='MWh'>MWh</option>
                                    <option value='GWh'>GWh</option>
                                    <option value='GWh'>GWh</option>
                                    <option value='GWh'>GWh</option>
                                    <option value='GWh'>GWh</option>
                                    <option value="W/m²">W/m²</option>
                                    <option value="kWh/m²">kWh/m²</option>
                                    <option value="°C">°C</option>
                                    <option value="°F">°F</option>
                                    <option value="Hz">Hz</option>
                                    <option value="A">A</option>
                                    <option value="Ω">Ω</option>
                                    <option value="kΩ">kΩ</option>
                                    <option value="V">V</option>
                                    <option value="kV">kV</option>
                                    <option value="kg">kg</option>
                                    <option value="Seconds">Seconds</option>
                                    <option value="Minutes">Minutes</option>
                                    <option value="Hours">Hours</option>
                                    <option value="Days">Days</option>
                                    <option value="Weeks">Weeks</option>
                                    <option value="Months">Months</option>
                                    <option value="Years">Years</option>
                                    <option value="₹">₹</option>
                                    <option value="$">$</option>
                                    <option value="€">€</option>
                                    <option value="%">%</option>
                                    <option value="tonne">tonne</option>
                                    <option value="Degree tilt">Degree tilt</option>
                                </select>
                            </Col>
                            <Col>
                                <div className="inner-scaling">
                                <Row style={{margin:"0"}}>
                                    <Col style={{maxWidth:"18%"}}>
                                        <h6 className="scalingTitle">Scaling</h6>
                                    </Col>
                                    <Col style={{maxWidth:"9%",padding:"2px"}}>
                                        <Form.Label style={{margin:"0"}}>Automatic:</Form.Label>
                                    </Col>
                                    <Col style={{maxWidth:"5%",padding:"2px"}}>
                                        <Form.Check type="checkbox" checked={this.state.graph.y23Min!=null?true:false}/>
                                    </Col>
                                    <Col style={{maxWidth:"9%",padding:"2px"}}>
                                        <Form.Label style={{margin:"0"}}>Min Value:</Form.Label>
                                    </Col>
                                    <Col style={{maxWidth:"16%",padding:"2px"}}>
                                        <Form.Control type="number" name='y23Min' onChange={this.handleChangeGraphData}  value={this.state.graph.y23Min}/>
                                    </Col>
                                    <Col style={{maxWidth:"10%",padding:"2px"}}>
                                        <Form.Label style={{margin:"0"}}>Automatic:</Form.Label>
                                    </Col>
                                    <Col style={{maxWidth:"5%",padding:"2px"}}>
                                        <Form.Check type="checkbox" checked={this.state.graph.y23Min!=null?true:false}/>
                                    </Col>
                                    <Col style={{maxWidth:"10%",padding:"2px"}}>
                                        <Form.Label style={{margin:"0"}}>Max Value:</Form.Label>
                                    </Col>
                                    <Col style={{maxWidth:"15%",padding:"2px"}}>
                                        <Form.Control type="number" name='y23Max' onChange={this.handleChangeGraphData}  value={this.state.graph.y23Max}/>
                                    </Col>
                                </Row>
                                </div>
                            </Col>
                        </Row>
                        </div>:<div></div>}
                        </div>
                        
                        <div className="subTable">
                        <div className="subHead">
                        Timing
                    </div>
                    <div className="subTableInner">
            <Row style={{margin:"0"}}>
                    <Col style={{maxWidth:"40%"}}>Depicted time period:</Col>
                    <Col style={{maxWidth:"40%"}}>
                        <select id="time" name="timePeriod" onChange={(item) => this.handleChangeGraphData(item)}>
                    <option value={this.state.graph.timePeriod}>{this.state.graph.timePeriod==='rolling_year'?'Rolling Year':this.state.graph.timePeriod==='fyear'?'Financial Year':this.state.graph.timePeriod==='halfyearly'?'Half Yearly':this.state.graph.timePeriod==='year'?'Year':this.state.graph.timePeriod==='quarterly'?'Quarterly':this.state.graph.timePeriod==='month'?'Month':this.state.graph.timePeriod==='bimonthly'?'BiMonthly':this.state.graph.timePeriod==='day'?'Day':'Hour'}</option>
                            <option value="rolling_year" >Rolling Year</option>
                            <option value="fyear" >Financial Year</option>
                            <option value="halfyearly" >Half Yearly</option>
                            <option value="year" >Year</option>
                            <option value="quarterly" >Quarterly</option>
                            <option value="month" >Month</option>
                            <option value="bimonthly" >BiMonthly</option>
                            <option value="day" >Day</option>
                            <option value="hour" >Hour</option>
                        </select>
                    </Col>
                    <Col width="10%"><input type="radio" name="endDate" value="current" onChange={this.handleChangeGraphData}/></Col>
                    <Col width="30%">Current Day</Col>
                </Row>
                <Row style={{margin:"0"}}>
                    <Col style={{maxWidth:"40%"}}>Count of intervals:</Col>
                    <Col style={{maxWidth:"40%"}}>
                        <select id="interval"  name="timeInterval" onChange={(item) => this.handleChangeGraphData(item)}>
                               <option value="0" >0</option>
                               <option value="1" >1</option>
                               <option value="2" >2</option>
                               <option value="3" >3</option>
                               <option value="4" >4</option>
                               <option value="5" >5</option>
                               <option value="6" >6</option>
                               <option value="7" >7</option>
                               <option value="8" >8</option>
                               <option value="9" >9</option>
                               <option value="10" >10</option>
                        </select>
                    </Col>
                    <Col width="10%" valign="middle"><input type="radio" name="endDate" value="previous" onChange={this.handleChangeGraphData}/></Col>
                    <Col width="30%" >Previous Day</Col>
                </Row>
                <Row style={{margin:"0"}}>
                    <Col style={{maxWidth:"40%"}}>Time unit:</Col>
                    <Col style={{maxWidth:"40%"}}>
                        <select id="unit" name="timeGroup" onChange={(item) => this.handleChangeGraphData(item)}>
                        {this.state.timeGroup && this.state.timeGroup.map((item,key) => 
                            <option value={item}>{item}</option>
                        )}
                        </select>
                    </Col>
                    <Col width="10%"><input type="radio" name="endDate" value="selected" checked={this.state.graph.selectedDate!=undefined?true:false} onChange={this.handleChangeGraphData}/></Col>
                    <Col width="30%">Selected Date</Col>
                </Row>
                {this.state.graph.endDate==='selected'?   
                <Row id="time_selected" style={{margin:"0"}}>
                <Col style={{maxWidth:"40%"}}></Col>
                <Col style={{maxWidth:"40%"}}></Col>
                <Col width="10%">End date of the display:</Col>
                <Col xs={2} style={{ maxWidth: "20%" }} >
                            <Form.Control type="date" name="selectedDate" onChange={this.handleChangeGraphData} value={this.state.graph.selectedDate}/>
                        </Col>    
                </Row>
                :<Row></Row>    }
                </div>
                </div>
        <div className="subTable">
                        <div className="subHead">
                        X Axis
                    </div>
                    <div className="subTableInner">
            <Row style={{margin:"0"}}>
            <Col>
                <select name="x_axis" id="x_axis" onChange={(item) => this.handleChangeGraphData(item)} >
                <option value={this.state.graph.xAxisData}>{this.state.graph.xAxisData}</option>
                <option value="time" >Time</option>
                <option value="plant" >Plant</option>
                <option value="inverter" >Inverter</option>
                </select>
                </Col>         
            </Row>
            <Row>
                <Col>
                <div ><input type="checkbox" checked={this.state.graph.legend===1?true:false} name="legend" id="legend" value="1"  /> Show Legend</div>
                </Col>
            </Row>
            </div>
            </div>
            </div>:<div>
                {this.state.graph.graphType==='meter'?<div>
                <div class="subTable">
        <div class="subHead">Meter Graph</div>
        <div class="subTableInner">
        <Row style={{margin:"0"}}>
            <Col style={{maxWidth:"14%",padding:"2px"}}>
                <select required class="form-control" type="dropdown" name="plantName_meter" onChange={(item) => this.handleChangePlant(item)} >
                    {/* value={this.state.selectedPlant} plant_name={this.state.selectedPlant} */}
                    <option>All plants</option>
                    {/* <option>{this.state.plans[0].plant_name}</option> */}
                    {this.props.plants === undefined?<option>default</option>:this.props.plants.map((plant, key) => <option key={plant.plantId}>{plant.plantName}</option>)}
                </select>
            </Col>
            <Col style={{maxWidth:"17%",padding:"2px"}}>
                            <select required class="form-control" type="dropdown" name="deviceName_meter" onChange={(item) => this.handleChangePlant(item)} >
                                    {/* value={this.state.selectedPlant} plant_name={this.state.selectedPlant} */}
                                    <option value="">Select Device</option>
                                    
                                    <optgroup label="Inverter">
                                    <option value="individual">All Individual Inverter</option>
                                    <option value="cumulative">All Cumulative Inverter</option>
                                    <option value="maxinvid">Max Inverter</option>
                                    {this.props.allInverters === undefined?<option></option>:this.props.allInverters.map((inv, key) => <option key={inv.inverterId}>{inv.inverterName}</option>)}
                                        </optgroup>
                    </select>
                </Col>
                <Col style={{maxWidth:"17%",padding:"2px"}}>
                <select id="channel_meter" name="channel_meter" onChange={(item) => this.handleChangePlant(item)}>
            	<option>Select Channel</option>
                <option value="Status Of Inverter">Status Of Inverter</option>
                <option value="Inverter efficiency">Inverter efficiency</option>
                <option value="Lower Limit">Lower Limit</option>
                <option value="Peak Power">Peak Power</option>
                <option value="Total PAC">Total PAC</option>
                <option value="Power DC-capacity">Power DC-capacity</option>
                <option value="Energy Today">Energy Today</option>
                <option value="Energy Total">Energy Total</option>
                <option value="AC Frequency">AC Frequency</option>
                <option value="AC Current">AC Current</option>
                <option value="DC Current">DC Current</option>
                <option value="Mode">Mode</option>
                <option value="AC Real Power">AC Real Power</option>
                <option value="Power Factor">Power Factor</option>
                <option value="DC Power">DC Power</option>
                <option value="Reactive Power">Reactive Power</option>
                <option value="Insulation Resistance">Insulation Resistance</option>
                <option value="Active Power">Active Power</option>
                <option value="AC Voltage">AC Voltage</option>
                <option value="DC Voltage">DC Voltage</option>
                <option value="External Temperature(C)">External Temperature(C)</option>
                <option value="Internal Temperature(C)">Internal Temperature(C)</option>
                <option value="others">Others</option>
            </select>
                </Col>
                <Col style={{maxWidth:"6%",padding:"2px"}}>
                                <button type="button" className="btn btn-primary" name="3" onClick={this.handleAddMeter}>
                                    <img src="/images/icons/fugue/plus-circle.png" alt="add plant" title="Add Y Value" style={{ float: "left", marginRight: "3" }} />
                                    Add
                                </button>
                            </Col>
               </Row>
              
               {this.state.yValueMeter.length != 0?(this.state.yValueMeter.map((yValue,key) => 
                        <Row style={{margin:"0"}}>
                        <ul class="editGraphTable-detail">
                        <li style={{width:"5%", color: 'black'}}>{(key+1)}</li>
                        <li style={{ color: 'black'}}>
                        {yValue.plantText}
                        </li>
                        <li style={{ color: 'black'}}>
                        {yValue.deviceText}
                        </li>
                        <li style={{ color: 'black'}}>
                            {yValue.channelText}
                        </li>
                        <li>
                        <img alt="delete" key={key} onClick={this.deleteMeter} src="https://nocc.azurepower.com//images/icons/fugue/cross-circle.png"/>
                        </li>
                        {/* <li>
                        <input type="hidden" name="labelArr[]" value="Forecast">
                        <input type="hidden" name="deviceArr[]" value="actual_generation">
                        <input type="hidden" name="deviceTextArr[]" value="Actual Generation">Actual Generation
                        </li> */}
                        {/* <li><input type="hidden" name="channelTextArr[]" value="Daily"><input type="hidden" name="channelArr[]" value="Daily">Daily</li><li><input type="hidden" name="percentArr[]" value="1"><input type="hidden" name="aggregateArr[]" value="">Actual(100%)</li><li><input type="hidden" name="chartArr[]" value="column">Bar</li><li><input type="hidden" name="colorArr[]" value="#A4A3FF"><div style="width:20px;height:20px;background-color:#A4A3FF">&nbsp;</div></li><li><input type="hidden" name="yaxisArr[]" value="0"><a href="javascript:void(0)" onclick="deleteQuery('https://nocc.azurepower.com/','0','y1')"><img src="https://nocc.azurepower.com//images/icons/fugue/cross-circle.png"></a></li>*/}
                        </ul> 
                        </Row>)):''
                        }
               
            <Row>
            <Col style={{maxWidth:"3%",padding:"2px"}}>
                <Form.Label>Title:</Form.Label>
            </Col>
            <Col style={{maxWidth:"12%",padding:"2px"}}>
                <Form.Control name="meterTitle" onChange={this.handleChangeGraphData}  value={this.state.graph.meterTitle}/>
            </Col>
            <Col style={{maxWidth:"3%",padding:"2px"}}>
                                <Form.Label>Unit:</Form.Label>
                            </Col>
                            <Col style={{maxWidth:"12%",padding:"2px"}}>
                                {/* <Form.Control name="y1Unit" onChange={this.handleChange}  value={this.state.graph.y1Unit}/> */}
                                <select required class="form-control" type="dropdown" name="meterUnit" onChange={(item) => this.handleChangeGraphData(item)}
                                    value={this.state.graph.meterUnit}>
                                    <option>Select Unit</option>
                                    <option value='Blank'>Blank</option>
                                    <option value='W'>W</option>
                                    <option value='kW'>kW</option>
                                    <option value='MW'>MW</option>
                                    <option value='GW'>GW</option>
                                    <option value='kWh'>kWh</option>
                                    <option value='kWh'>kWh</option>
                                    <option value='MWh'>MWh</option>
                                    <option value='GWh'>GWh</option>
                                    <option value='GWh'>GWh</option>
                                    <option value='GWh'>GWh</option>
                                    <option value='GWh'>GWh</option>
                                    <option value="W/m²">W/m²</option>
                                    <option value="kWh/m²">kWh/m²</option>
                                    <option value="°C">°C</option>
                                    <option value="°F">°F</option>
                                    <option value="Hz">Hz</option>
                                    <option value="A">A</option>
                                    <option value="Ω">Ω</option>
                                    <option value="kΩ">kΩ</option>
                                    <option value="V">V</option>
                                    <option value="kV">kV</option>
                                    <option value="kg">kg</option>
                                    <option value="Seconds">Seconds</option>
                                    <option value="Minutes">Minutes</option>
                                    <option value="Hours">Hours</option>
                                    <option value="Days">Days</option>
                                    <option value="Weeks">Weeks</option>
                                    <option value="Months">Months</option>
                                    <option value="Years">Years</option>
                                    <option value="₹">₹</option>
                                    <option value="$">$</option>
                                    <option value="€">€</option>
                                    <option value="%">%</option>
                                    <option value="tonne">tonne</option>
                                    <option value="Degree tilt">Degree tilt</option>
                                </select>
                            </Col>
                        <Col style={{maxWidth:"18%"}}>
                            <h6 className="scalingTitle">Scaling</h6>
                        </Col>
                        <Col style={{maxWidth:"9%",padding:"2px"}}>
                            <Form.Label style={{margin:"0"}}>Min Value:</Form.Label>
                        </Col>
                        <Col style={{maxWidth:"16%",padding:"2px"}}>
                            <Form.Control type="number" name='meterMin' onChange={this.handleChangeGraphData}  value={this.state.graph.meterMin}/>
                        </Col>
                        <Col style={{maxWidth:"10%",padding:"2px"}}>
                            <Form.Label style={{margin:"0"}}>Max Value:</Form.Label>
                        </Col>
                        <Col style={{maxWidth:"15%",padding:"2px"}}>
                            <Form.Control type="number" name='meterMax' onChange={this.handleChangeGraphData}  value={this.state.graph.meterMax}/>
                        </Col> 
            </Row>
            <Row>
            <Col style={{maxWidth:"3%",padding:"2px"}}>
                        <div style={{width:"20px",height:"20px",backgroundColor:"red"}}></div>
                        </Col>
                      <Col style={{maxWidth:"10%",padding:"2px"}}>
                            <Form.Label style={{margin:"0"}}>Start Value:</Form.Label>
                        </Col>
                        <Col style={{maxWidth:"15%",padding:"2px"}}>
                            <Form.Control type="number" name='redStartValue' onChange={this.handleChangeGraphData}  value={this.state.graph.redStartValue}/>
                        </Col>
                        <Col style={{maxWidth:"10%",padding:"2px"}}>
                            <Form.Label style={{margin:"0"}}>End Value:</Form.Label>
                        </Col>
                        <Col style={{maxWidth:"15%",padding:"2px"}}>
                            <Form.Control type="number" name='redEndValue' onChange={this.handleChangeGraphData}  value={this.state.graph.redEndValue}/>
                        </Col>
                        <Col style={{maxWidth:"3%",padding:"2px"}}>
                        <div style={{width:"20px",height:"20px",backgroundColor:"yellow"}}></div>
                        </Col>
                        <Col style={{maxWidth:"10%",padding:"2px"}}>
                            <Form.Label style={{margin:"0"}}>Start Value:</Form.Label>
                        </Col>
                        <Col style={{maxWidth:"15%",padding:"2px"}}>
                            <Form.Control type="number" name='yellowStartValue' onChange={this.handleChangeGraphData}  value={this.state.graph.yellowStartValue}/>
                        </Col>
                        <Col style={{maxWidth:"10%",padding:"2px"}}>
                            <Form.Label style={{margin:"0"}}>End Value:</Form.Label>
                        </Col>
                        <Col style={{maxWidth:"15%",padding:"2px"}}>
                            <Form.Control type="number" name='yellowEndValue' onChange={this.handleChangeGraphData}  value={this.state.graph.yellowEndValue}/>
                        </Col>
                        <Col style={{maxWidth:"3%",padding:"2px"}}>
                        <div style={{width:"20px",height:"20px",backgroundColor:"green"}}></div>
                        </Col>
                        <Col style={{maxWidth:"10%",padding:"2px"}}>
                            <Form.Label style={{margin:"0"}}>Start Value:</Form.Label>
                        </Col>
                        <Col style={{maxWidth:"15%",padding:"2px"}}>
                            <Form.Control type="number" name='greenStartValue' onChange={this.handleChangeGraphData}  value={this.state.graph.greenStartValue}/>
                        </Col>
                        <Col style={{maxWidth:"10%",padding:"2px"}}>
                            <Form.Label style={{margin:"0"}}>End Value:</Form.Label>
                        </Col>
                        <Col style={{maxWidth:"15%",padding:"2px"}}>
                            <Form.Control type="number" name='greenEndValue' onChange={this.handleChangeGraphData}  value={this.state.graph.greenEndValue}/>
                        </Col>
            </Row>

            </div>
            </div>
            <div className="subTable">
                        <div className="subHead">
                        Timing
                    </div>
                    <div className="subTableInner">
            <Row style={{margin:"0"}}>
                    <Col style={{maxWidth:"40%"}}>Depicted time period:</Col>
                    <Col style={{maxWidth:"40%"}}>
                        <select id="time" name="timePeriod" onChange={(item) => this.handleChangeGraphData(item)}>
                    <option value={this.state.graph.timePeriod}>{this.state.graph.timePeriod==='rolling_year'?'Rolling Year':this.state.graph.timePeriod==='fyear'?'Financial Year':this.state.graph.timePeriod==='halfyearly'?'Half Yearly':this.state.graph.timePeriod==='year'?'Year':this.state.graph.timePeriod==='quarterly'?'Quarterly':this.state.graph.timePeriod==='month'?'Month':this.state.graph.timePeriod==='bimonthly'?'BiMonthly':this.state.graph.timePeriod==='day'?'Day':'Hour'}</option>
                            <option value="rolling_year" >Rolling Year</option>
                            <option value="fyear" >Financial Year</option>
                            <option value="halfyearly" >Half Yearly</option>
                            <option value="year" >Year</option>
                            <option value="quarterly" >Quarterly</option>
                            <option value="month" >Month</option>
                            <option value="bimonthly" >BiMonthly</option>
                            <option value="day" >Day</option>
                            <option value="hour" >Hour</option>
                        </select>
                    </Col>
                    <Col width="10%"><input type="radio" name="endDate" value="current" onChange={this.handleChangeGraphData}/></Col>
                    <Col width="30%">Current Day</Col>
                </Row>
                <Row style={{margin:"0"}}>
                    <Col style={{maxWidth:"40%"}}>Count of intervals:</Col>
                    <Col style={{maxWidth:"40%"}}>
                        <select id="interval"  name="timeInterval" onChange={(item) => this.handleChangeGraphData(item)}>
                               <option value="0" >0</option>
                               <option value="1" >1</option>
                               <option value="2" >2</option>
                               <option value="3" >3</option>
                               <option value="4" >4</option>
                               <option value="5" >5</option>
                               <option value="6" >6</option>
                               <option value="7" >7</option>
                               <option value="8" >8</option>
                               <option value="9" >9</option>
                               <option value="10" >10</option>
                        </select>
                    </Col>
                    <Col width="10%" valign="middle"><input type="radio" name="endDate" value="previous" onChange={this.handleChangeGraphData}/></Col>
                    <Col width="30%" >Previous Day</Col>
                </Row>
                <Row style={{margin:"0"}}>
                    <Col style={{maxWidth:"40%"}}>Time unit:</Col>
                    <Col style={{maxWidth:"40%"}}>
                        <select id="unit" name="timeGroup" onChange={(item) => this.handleChangeGraphData(item)}>
                        {this.state.timeGroup && this.state.timeGroup.map((item,key) => 
                            <option value={item}>{item}</option>
                        )}
                        </select>
                    </Col>
                    <Col width="10%"><input type="radio" name="endDate" checked={this.state.graph.selectedDate!=undefined?true:false} value="selected" onChange={this.handleChangeGraphData}/></Col>
                    <Col width="30%">Selected Date</Col>
                </Row>
                {this.state.graph.endDate==='selected'?   
                <Row id="time_selected" style={{margin:"0"}}>
                <Col style={{maxWidth:"40%"}}></Col>
                <Col style={{maxWidth:"40%"}}></Col>
                <Col width="10%">End date of the display:</Col>
                <Col xs={2} style={{ maxWidth: "20%" }} >
                            <Form.Control type="date" name="selectedDate" onChange={this.handleChangeGraphData} value={this.state.graph.selectedDate}/>
                        </Col>    
                </Row>
                :<Row></Row>    }
                </div>
                </div>
                </div>:<div>
                <div class="subTable">
        <div class="subHead">Tilt Graph</div>
            <div class="subTableInner">
            <div class="subDropdown">
            <Row>
            <Col style={{maxWidth:"14%",padding:"2px"}}>
                <select required class="form-control" type="dropdown" name="plantName_tilt" onChange={(item) => this.handleChangePlant(item)} >
                    {/* value={this.state.selectedPlant} plant_name={this.state.selectedPlant} */}
                    <option>Select Plant</option>
                    {/* <option>{this.state.plans[0].plant_name}</option> */}
                    {this.props.plants === undefined?<option>default</option>:this.props.plants.map((plant, key) => <option key={plant.plantId}>{plant.plantName}</option>)}
                </select>
            </Col>
            <Col style={{maxWidth:"14%",padding:"2px"}}>
            <select required class="form-control" type="dropdown"  name="month_tilt" id="month_tilt" onChange={(item) => this.handleChangePlant(item)}>
                <option value="">Select Month</option>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
               
            </select>
            </Col>
            <Col style={{maxWidth:"14%",padding:"2px"}}>
            <select required class="form-control" type="dropdown" id="year_tilt" onChange={(item) => this.handleChangePlant(item)}>
            	<option value="">Select Year</option>
                <option value="2011">2011</option>
                <option value="2012">2012</option>
                <option value="2013">2013</option>
                <option value="2014">2014</option>
                <option value="2015">2015</option>
                <option value="2016">2016</option>
                <option value="2017">2017</option>
                <option value="2018">2018</option>
                <option value="2019">2019</option>
                <option value="2020">2020</option>
          
            </select>
            </Col>
            <Col style={{maxWidth:"6%",padding:"2px"}}>
            <button type="button" className="btn btn-primary" name="addTilt" onClick={this.handleAddTilt}>
                <img src="/images/icons/fugue/plus-circle.png" alt="add plant" title="Add Y Value" style={{ float: "left", marginRight: "3" }} />
                Add
            </button>
        </Col>                
                </Row>    
                {this.state.yValueTilt.length != 0?(this.state.yValueTilt.map((yValue,key) => 
                        <Row style={{margin:"0"}}>
                        <ul class="editGraphTable-detail">
                        <li style={{width:"5%", color: 'black'}}>{(key+1)}</li>
                        <li style={{ color: 'black'}}>
                        {yValue.plantText}
                        </li>
                        <li style={{ color: 'black'}}>
                        {yValue.month}
                        </li>
                        <li style={{ color: 'black'}}>
                            {yValue.year}
                        </li>
                        <li>
                        <img alt="delete" key={key} onClick={this.deleteTilt} src="https://nocc.azurepower.com//images/icons/fugue/cross-circle.png"/>
                        </li>
                        {/* <li>
                        <input type="hidden" name="labelArr[]" value="Forecast">
                        <input type="hidden" name="deviceArr[]" value="actual_generation">
                        <input type="hidden" name="deviceTextArr[]" value="Actual Generation">Actual Generation
                        </li> */}
                        {/* <li><input type="hidden" name="channelTextArr[]" value="Daily"><input type="hidden" name="channelArr[]" value="Daily">Daily</li><li><input type="hidden" name="percentArr[]" value="1"><input type="hidden" name="aggregateArr[]" value="">Actual(100%)</li><li><input type="hidden" name="chartArr[]" value="column">Bar</li><li><input type="hidden" name="colorArr[]" value="#A4A3FF"><div style="width:20px;height:20px;background-color:#A4A3FF">&nbsp;</div></li><li><input type="hidden" name="yaxisArr[]" value="0"><a href="javascript:void(0)" onclick="deleteQuery('https://nocc.azurepower.com/','0','y1')"><img src="https://nocc.azurepower.com//images/icons/fugue/cross-circle.png"></a></li>*/}
                        </ul> 
                        </Row>)):''
                        }  
            </div>
            </div>
            </div>
            </div>
               }
                </div>}

                      
                        <Row>
                        
                            <Col style={{maxWidth:"6%",padding:"2px"}}>
                        <Button class="align-self-center mx-auto" type="submit" name="submit" value="Save" onClick={this.onSubmit}>Save</Button>
                        </Col>
                        <Col style={{maxWidth:"6%",padding:"2px"}}>
                        <Button class="align-self-center mx-auto" href="" onClick={this.getPreview()}>Preview</Button>
                        </Col>
                        <Col style={{maxWidth:"6%",padding:"2px"}}>
                        <Route render={({ history }) => (
                                  
                                    <Button class="align-self-center mx-auto" onClick={() => { history.push('/setting') }} block>Back</Button>
                               
                                )} />
                                </Col>
                      
                        </Row>
                        
                        
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        plants: state.plants.allplants,
        graphGroups: state.SettingsReducer.graphGroups,
        yValueDetails: state.SettingsReducer.yValueDetails,
        allSMU: state.allSMU.allSMUs, 
        allInverters: state.inverterDailyReducer.allInverters, 
        allWeatherStation: state.weatherStationReducer.allWeatherStations
    }
}

const mapDispatchToProps = (dispatch) => { 
	return {
        getAllPlants: () => dispatch(getAllPlants()),
        renderGraphGroupDetails: () => dispatch(renderGraphGroupDetails()),
        getAllGraphGroupData: () => dispatch(getAllGraphGroupData()),
        getYValueByGraphId: (graphId, yAxis) => dispatch(getYValueByGraphId(graphId, yAxis)),
        createUpdateGraphYValue: (yValueDetails) => dispatch(createUpdateGraphYValue(yValueDetails)),
        getAllInverters: () => dispatch(getAllInverters()),
        getAllSMU:() => dispatch(getAllSMU()),
        getAllWeatherStation: () => dispatch(getAllWeatherStation()),
        deleteYValueId : (yValueId) => dispatch(deleteYValueId(yValueId)),
        createUpdateGraph : (data) => dispatch(createUpdateGraph(data))
		// deletePlant: (_id) => dispatch(deletePlant(_id)),
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddGraph))