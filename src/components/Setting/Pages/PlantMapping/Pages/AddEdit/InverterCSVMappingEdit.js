
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
import DropDown from '../../../../../Common/DropDown';
import { getInverterConfiguration, clearSettingPlantMapping, createUpdateCSVInverterMap } from '../../../../../../actions/action-Settings';
import { connect } from 'react-redux';
import { getPlantByType } from "../../../../../../actions/moduleCleaningAnalysisActions";
import Picky from 'react-picky';
import { Route } from 'react-router-dom';
import { getalladapters } from '../../../../../../actions/action-Settings';
import { getAllPlants } from '../../../../../../actions';


class InverterCSVMappingEdit extends Component {
    constructor(props) {
        super(props);
        if(this.props.location.invCSVMapp!=undefined){
        this.state = {
            postData: this.props.location.invCSVMapp
        };
    }
    else {
        this.state = {
            postData: {
            csvInverterId:0,
            plantId:'',
            adapterId:'',
            alternateAdapterId:12,
            eTodayKwh:'',
            eTotalKwh:'',
            facHz:'',
            iacAmp:'',
            ipvAmp:'',
            mode:'',
            pacKw:'',
            pf:'',
            ppvKw:'',
            qacKvar:'',
            rInsulKohm:'',
            sacKva:'',
            vac:'',
            vpv:'',
            tmpExt:'',
            tmpInt:'',
            },
            allAdapters:'',
            adapterName:'',
            plantName:'',
        }
    }
    }

    componentDidMount() {
        // document.title = 'Plant Fault Data';
        //this.props.clearSettingPlantMapping();
        this.props.getAllPlants();
        this.props.getalladapters();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            data: nextProps.data,
            //postData: nextProps.postData,
            allAdapters: nextProps.allAdapters,
            

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
            this.props.createUpdateCSVInverterMap(this.state.postData);
            this.props.history.push('/setting/InverterCSVMapping');
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
                        <Card.Header as="h5">Inverter Mapping</Card.Header>
                        <Card.Body>
                            <Row>
                                <Col>
                                    <Form.Label>Adapter</Form.Label>
                                </Col>
                                <Col>
                                {/* <Form.Control disabled={} name="plantName" type="select" value={this.state.postData && this.state.postData.adapterName}
                                <option> /> */}
                                <select required class="form-control" type="dropdown" name="adapterName" onChange={(item) => this.handleChange(item)} disabled={this.props.location.invCSVMapp!=undefined} >
                                    {/* value={this.state.selectedPlant} plant_name={this.state.selectedPlant} */}
                                    <option>{this.state.postData && this.state.postData.adapterName?this.state.postData.adapterName:'Select Adapter'}</option>
                                    {/* <option>{this.state.plans[0].plant_name}</option> */}
                                    {this.props.allAdapters === undefined?<option>default</option>:this.props.allAdapters.map((adapter, key) => <option adapterId={adapter.adapterId}>{adapter.adapterName}</option>)}
                                </select>
                                </Col>
                                <Col>
                                    <Form.Label>Plant</Form.Label>
                                </Col>
                                <Col>
                                {/* <Form.Control disabled name="plantName" type="text" value={this.state.postData && this.state.postData.plantName} /> */}
                                <select required class="form-control" type="dropdown" name="plantName" onChange={(item) => this.handleChange(item)} disabled={this.props.location.invCSVMapp!=undefined}>
                                    {/* value={this.state.selectedPlant} plant_name={this.state.selectedPlant} */}
                                    <option>{this.state.postData && this.state.postData.plantName?this.state.postData.plantName:'Select Plant'}</option>
                                    {/* <option>{this.state.plans[0].plant_name}</option> */}
                                    {this.props.plants === undefined?<option>default</option>:this.props.plants.map((plant, key) => <option key={plant.plantId}>{plant.plantName}</option>)}
                                </select>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>Energy Today<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="eTodayKwh" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.eTodayKwh} />
                                    {/* {this.renderErrortext("eTodayKwh", "The Energy Today Field Is Required.")} */}
                                </Col>
                                <Col>
                                    <Form.Label>Energy Total<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="eTotalKwh" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.eTotalKwh} />
                                    {/* {this.renderErrortext("eTotalKwh", "The Energy Total Field Is Required.")} */}
                                </Col>
                                                            </Row>
                            <Row>
                            <Col>
                                    <Form.Label>AC Frequency<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="facHz" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.facHz} />
                                    {/* {this.renderErrortext("facHz", "The AC Frequency Field Is Required.")} */}
                                </Col>
                                <Col>
                                    <Form.Label>AC Current<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="iacAmp" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.iacAmp} />
                                    {/* {this.renderErrortext("iacAmp", "The AC Current Field Is Required.")} */}
                                </Col>                            
                            </Row>
                            <Row>
                            <Col>
                                    <Form.Label>DC Current<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="ipvAmp" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.ipvAmp} />
                                    {/* {this.renderErrortext("ipvAmp", "The DC Current Field Is Required.")} */}
                                </Col>
                                <Col>
                                    <Form.Label>Mode<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="mode" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.mode} />
                                    {/* {this.renderErrortext("mode", "The Mode Field Is Required.")} */}
                                </Col>                            
                            </Row>
                            <Row>
                            <Col>
                                    <Form.Label>AC Real Power<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="pacKw" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.pacKw} />
                                    {/* {this.renderErrortext("pacKw", "The AC Real Power Field Is Required.")} */}
                                </Col>
                                <Col>
                                    <Form.Label>Power Factor<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="pf" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.pf} />
                                    {/* {this.renderErrortext("pf", "The Power Factor Field Is Required.")} */}
                                </Col>                            
                            </Row>
                            <Row>
                            <Col>
                                    <Form.Label>DC Power <span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="ppvKw" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.ppvKw} />
                                    {/* {this.renderErrortext("ppvKw", "The DC Power Field Is Required.")} */}
                                </Col>
                                <Col>
                                    <Form.Label>Reactive Power<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="qacKvar" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.qacKvar} />
                                    {/* {this.renderErrortext("qacKvar", "The Reactive Power Field Is Required.")} */}
                                </Col>                            
                            </Row>
                            <Row>
                            <Col>
                                    <Form.Label>Insulation Resistance <span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="rInsulKohm" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.rInsulKohm} />
                                    {/* {this.renderErrortext("rInsulKohm", "The Insulation Resistance Field Is Required.")} */}
                                </Col>
                                <Col>
                                    <Form.Label>Active Power<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="sacKva" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.sacKva} />
                                    {/* {this.renderErrortext("sacKva", "The Active Power Field Is Required.")} */}
                                </Col>                            
                            </Row>
                            <Row>
                            <Col>
                                    <Form.Label>AC Voltage <span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="vac" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.vac} />
                                    {/* {this.renderErrortext("vac", "The AC Voltage Field Is Required.")} */}
                                </Col>
                                <Col>
                                    <Form.Label>DC Voltage<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="vpv" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.vpv} />
                                    {/* {this.renderErrortext("vpv", "The DC Voltage Field Is Required.")} */}
                                </Col>                            
                            </Row>
                            <Row>
                            <Col>
                                    <Form.Label>External Temperature (C)<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="tmpExt" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.tmpExt} />
                                    {/* {this.renderErrortext("tmpExt", "The External Temperature (C) Field Is Required.")} */}
                                </Col>
                                <Col>
                                    <Form.Label>	Internal Temperature (C)<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="tmpInt" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.tmpInt} />
                                    {/* {this.renderErrortext("tmpInt", "The Internal Temperature (C) Field Is Required.")} */}
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
                                        <Button variant="primary" size="md" onClick={() => { history.push('/setting/InverterCSVMapping') }} block>Back</Button>
                                    </Col>
                                )} />
                                <Col>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </div>
            </form>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        pageName: props.location.invCSVMapp ? props.location.invCSVMapp.csvInverterId ? "Edit Inverter CSV Mapping" : "Add Inverter CSV Mapping" : null,
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
        createUpdateCSVInverterMap: (data) => dispatch(createUpdateCSVInverterMap(data)),
        getalladapters: () => dispatch(getalladapters()),
        getAllPlants: () => dispatch(getAllPlants())

    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InverterCSVMappingEdit));