import React, { Component } from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { withRouter } from 'react-router-dom';
import 'react-picky/dist/picky.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { getInverterConfiguration, clearSettingPlantMapping, createUpdateCSVWeatherMap } from '../../../../../../actions/action-Settings';
import { connect } from 'react-redux';
import { getPlantByType } from "../../../../../../actions/moduleCleaningAnalysisActions";
import { Route } from 'react-router-dom';
import { getalladapters } from '../../../../../../actions/action-Settings';
import { getAllPlants } from '../../../../../../actions';

class WeatherCSVMappingEdit extends Component {
    constructor(props) {
        super(props);
        if(this.props.location.weatherCSVMapp!=undefined){
            this.state = {
                postData: this.props.location.weatherCSVMapp
            };
        }
        else {
            this.state = {
                postData: {
                    "adapterId": 0,
                    "alternateAdapterId": 12,
                    "csvWeatherId": 0,
                    "horIrradiation1": "",
                    "horizontalAmbTemp": "",
                    "horizontalInsolation": "",
                    "horizontalModTemp": "",
                    "insolation": "",
                    "plantId": 0,
                    "tempAmb": "",
                    "tempAmbient1": "",
                    "tempMdul": "",
                    "tempModule1": "",
                    "tiltIrradiation1": "",
                    "windSpeed": "",
                    "windSpeed1": ""
                },
                allAdapters:'',
                adapterName:'',
                plantName:'',
            }
        }
    }

    componentDidMount() {
        // document.title = 'Plant Fault Data';
        // this.props.clearSettingPlantMapping();
        this.props.getAllPlants();
        this.props.getalladapters();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            allAdapters: nextProps.allAdapters
        });
    }

    renderErrortext(fieldID, msg) {
        return (
            this.state.isSubmited === true && !this.state.postData[fieldID] && <p className="errorText" style={{ color: "#CC0000", display: "block", fontSize: "11px", marginTopop: "0.5em" }}>{msg}</p>
        )
    }

    handleChangeForDecimal(event) {
        let _data = this.state.postData;
        const re = /^[0-9]+\.?[0-9]*$/;
        if (event.target.value === '' || re.test(event.target.value)) {
            _data[event.target.name] = event.target.value;
        }
        this.setState({ postData: _data });

    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.postData != null) {
            this.props.createUpdateCSVWeatherMap(this.state.postData);
            this.props.history.push('/setting/WeatherCSVMapping');
        }

        this.setState({ isSubmited: true });
    }

    handleChange(event) {
        let _data = this.state.postData;
        if(event.target.name === 'adapterName'){
            for(var i=0;i<this.props.allAdapters.length;i++){
                if(this.props.allAdapters[i].adapterName === event.target.value){
                    _data.adapterId = this.props.allAdapters[i].adapterId;
                    break;
                }
            }
        }
        else if(event.target.name === 'plantName'){
            for(var i=0;i<this.props.plants.length;i++){
                if(this.props.plants[i].plantName === event.target.value){
                    _data.plantId = this.props.plants[i].plantId;
                    break;
                }
            }
        }
        else{
        _data[event.target.name] = event.target.value;
        }
        this.setState({ postData: _data });
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <div>
                    <Card className="add-fault-card">
                        <Card.Header as="h5">Weather Mapping</Card.Header>
                        <Card.Body>
                            <Row>
                                <Col>
                                    <Form.Label>Adapter</Form.Label>
                                </Col>
                                <Col>
                                <select required class="form-control" type="dropdown" name="adapterName" onChange={(item) => this.handleChange(item)} disabled={this.props.location.weatherCSVMapp!=undefined} >
                                    {/* value={this.state.selectedPlant} plant_name={this.state.selectedPlant} */}
                                    <option>{this.state.postData && this.state.postData.adapterName?this.state.postData.adapterName:'Select Adapter'}</option>
                                    {/* <option>{this.state.plans[0].plant_name}</option> */}
                                    {this.props.allAdapters === undefined?<option>default</option>:this.props.allAdapters.map((adapter, key) => <option adapterId={adapter.adapterId}>{adapter.adapterName}</option>)}
                                </select>
                                {/* <Form.Control name="plantName" type="text" value={this.state.postData && this.state.postData.adapterName} /> */}
                                </Col>
                                <Col>
                                    <Form.Label>Plant</Form.Label>
                                </Col>
                                <Col>
                                <select required class="form-control" type="dropdown" name="plantName" onChange={(item) => this.handleChange(item)} disabled={this.props.location.weatherCSVMapp!=undefined}>
                                    {/* value={this.state.selectedPlant} plant_name={this.state.selectedPlant} */}
                                    <option>{this.state.postData && this.state.postData.plantName?this.state.postData.plantName:'Select Plant'}</option>
                                    {/* <option>{this.state.plans[0].plant_name}</option> */}
                                    {this.props.plants === undefined?<option>default</option>:this.props.plants.map((plant, key) => <option key={plant.plantId}>{plant.plantName}</option>)}
                                </select>
                                {/* <Form.Control name="plantName" type="text" value={this.state.postData && this.state.postData.plantName} /> */}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>Insolation<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="insolation" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.insolation} />
                                    {/* {this.renderErrortext("eTodayKwh", "The Energy Today Field Is Required.")} */}
                                </Col>
                                <Col>
                                    <Form.Label>Temperature Ambient<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="tempAmb" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.tempAmb} />
                                    {/* {this.renderErrortext("eTotalKwh", "The Energy Total Field Is Required.")} */}
                                </Col>
                                                            </Row>
                            <Row>
                            <Col>
                                    <Form.Label>Temperature Module<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="tempMdul" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.tempMdul} />
                                    {/* {this.renderErrortext("facHz", "The AC Frequency Field Is Required.")} */}
                                </Col>
                                <Col>
                                    <Form.Label>Wind Speed<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="windSpeed" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.windSpeed} />
                                    {/* {this.renderErrortext("iacAmp", "The AC Current Field Is Required.")} */}
                                </Col>                            
                            </Row>
                            <Row>
                            <Col>
                                    <Form.Label>Horizontal Insolation<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="horizontalInsolation" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.horizontalInsolation} />
                                    {/* {this.renderErrortext("ipvAmp", "The DC Current Field Is Required.")} */}
                                </Col>
                                <Col>
                                    <Form.Label>Horizontal Ambient<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="horizontalAmbTemp" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.horizontalAmbTemp} />
                                    {/* {this.renderErrortext("mode", "The Mode Field Is Required.")} */}
                                </Col>                            
                            </Row>
                            <Row>
                            <Col>
                                    <Form.Label>Horizontal Module Ambient<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="horizontalModTemp" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.horizontalModTemp} />
                                    {/* {this.renderErrortext("pacKw", "The AC Real Power Field Is Required.")} */}
                                </Col>
                                <Col>
                                    <Form.Label>Horizontal Irradiation<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="horIrradiation1" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.horIrradiation1} />
                                    {/* {this.renderErrortext("pf", "The Power Factor Field Is Required.")} */}
                                </Col>                            
                            </Row>
                            <Row>
                            <Col>
                                    <Form.Label>Tilt Irradiation<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="tiltIrradiation1" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.tiltIrradiation1} />
                                    {/* {this.renderErrortext("ppvKw", "The DC Power Field Is Required.")} */}
                                </Col>
                                <Col>
                                    <Form.Label>Temperature Ambient 1<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="tempAmbient1" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.tempAmbient1} />
                                    {/* {this.renderErrortext("qacKvar", "The Reactive Power Field Is Required.")} */}
                                </Col>                            
                            </Row>
                            <Row>
                            <Col>
                                    <Form.Label>Temperature Module 1<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="tempModule1" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.tempModule1} />
                                    {/* {this.renderErrortext("rInsulKohm", "The Insulation Resistance Field Is Required.")} */}
                                </Col>
                                <Col>
                                    <Form.Label>Wind Speed 1<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="windSpeed1" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.windSpeed1} />
                                    {/* {this.renderErrortext("sacKva", "The Active Power Field Is Required.")} */}
                                </Col>                            
                            </Row>
                            <Row>
                                <Col>
                                </Col>
                                <Col md={2}>
                                    <Button type="submit" variant="primary" size="md" block>Submit</Button>
                                </Col>
                                <Route render={({ history }) => (
                                    <Col md={2}>
                                        <Button variant="primary" size="md" onClick={() => { history.push('/setting/WeatherCSVMapping') }} block>Back</Button>
                                    </Col>
                                )} />
                                <Col>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </div>
            </form >
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        pageName: props.location.weatherCSVMapp ? props.location.weatherCSVMapp.adapterId ? "Edit Weather CSV Mapping" : "Add Weather CSV Mapping" : null,
        invCSVMapp: state.SettingsReducer.data,
        submitedFields: ["eTodayKwh", "eTotalKwh","facHz","iacAmp","ipvAmp","mode","pacKw","pf","ppvKw","qacKvar","rInsulKohm","sacKva","vac","vpv","tmpExt","tmpInt"],
        allAdapters: state.SettingsReducer.allAdapters,
        plants: state.plants.allplants
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getInverterConfiguration: (plantIds) => dispatch(getInverterConfiguration(plantIds)),
        getPlantByType: (plantsByType) => dispatch(getPlantByType(plantsByType)),
        clearSettingPlantMapping: () => dispatch(clearSettingPlantMapping()),
        createUpdateCSVWeatherMap: (data) => dispatch(createUpdateCSVWeatherMap(data)),
        getalladapters: () => dispatch(getalladapters()),
        getAllPlants: () => dispatch(getAllPlants())

    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WeatherCSVMappingEdit));