
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
import { getInverterConfiguration, clearSettingPlantMapping, createUpdateCSVMFMMap } from '../../../../../../actions/action-Settings';
import { connect } from 'react-redux';
import { getPlantByType } from "../../../../../../actions/moduleCleaningAnalysisActions";
import Picky from 'react-picky';
import { Route } from 'react-router-dom';


class MFMCSVMappingEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postData: this.props.location.mfmCSVMapp
        };
    }

    componentDidMount() {
        // document.title = 'Plant Fault Data';
        // this.props.clearSettingPlantMapping();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            data: nextProps.data,
            postData: nextProps.postData
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
        this.state.postData.createdAt = null;
        if (this.state.postData != null) {
            this.props.createUpdateCSVMFMMap({input:this.state.postData, type:this.props.pageName});
            this.props.history.push('/setting/MfmCSVMapping');
        }

        this.setState({ isSubmited: true });
    }

    handleChange(event) {
        let _data = this.state.postData;
        _data[event.target.name] = event.target.value;
        this.setState({ postData: _data });
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <div>
                    <Card className="add-fault-card">
                        <Card.Header as="h5">{this.props.pageName}</Card.Header>
                        <Card.Body>
                            <Row>
                            <Col>
                                    <Form.Label>Adapter</Form.Label>
                                </Col>
                                <Col>
                                <div>{this.state.postData.adapterName} </div>
                                {/* <Form.Control name="plantName" type="text" value={this.state.postData && this.state.postData.adapterName} /> */}
                                </Col>
                                <Col>
                                    <Form.Label>Plant</Form.Label>
                                </Col>
                                <Col>
                                <div>{this.state.postData.plantName} </div>
                                {/* <Form.Control name="plantName" type="text" value={this.state.postData && this.state.postData.plantName} /> */}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>Energy Total Export<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="eTotalExport" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.eTotalExport} />
                                    {/* {this.renderErrortext("eTodayKwh", "The Energy Today Field Is Required.")} */}
                                </Col>
                                <Col>
                                    <Form.Label>Energy Total Import<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="eTotalImport" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.eTotalImport} />
                                    {/* {this.renderErrortext("eTotalKwh", "The Energy Total Field Is Required.")} */}
                                </Col>
                                                            </Row>
                            <Row>
                            <Col>
                                    <Form.Label>AC Frequency<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="acFq" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.acFq} />
                                    {/* {this.renderErrortext("facHz", "The AC Frequency Field Is Required.")} */}
                                </Col>
                                <Col>
                                    <Form.Label>Current R<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="acR" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.acR} />
                                    {/* {this.renderErrortext("iacAmp", "The AC Current Field Is Required.")} */}
                                </Col>                            
                            </Row>
                            <Row>
                            <Col>
                                    <Form.Label>Current B<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="acB" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.acB} />
                                    {/* {this.renderErrortext("ipvAmp", "The DC Current Field Is Required.")} */}
                                </Col>
                                <Col>
                                    <Form.Label>Current Y<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="acY" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.acY} />
                                    {/* {this.renderErrortext("mode", "The Mode Field Is Required.")} */}
                                </Col>                            
                            </Row>
                            <Row>
                            <Col>
                                    <Form.Label>VRY<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="vry" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.vry} />
                                    {/* {this.renderErrortext("pacKw", "The AC Real Power Field Is Required.")} */}
                                </Col>
                                <Col>
                                    <Form.Label>VYB<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="vyb" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.vyb} />
                                    {/* {this.renderErrortext("pf", "The Power Factor Field Is Required.")} */}
                                </Col>                            
                            </Row>
                            <Row>
                            <Col>
                                    <Form.Label>VBR<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="vbr" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.vbr} />
                                    {/* {this.renderErrortext("ppvKw", "The DC Power Field Is Required.")} */}
                                </Col>
                                <Col>
                                </Col>
                                <Col>
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
                                        <Button variant="primary" size="md" onClick={() => { history.push('/setting/MfmCSVMapping') }} block>Back</Button>
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
        pageName: props.location.invCSVMapp ? props.location.invCSVMapp.csvInverterId ? "Edit Inverter CSV Mapping" : "Add Inverter CSV Mapping" : null,
        invCSVMapp: state.SettingsReducer.data,
        submitedFields: ["eTodayKwh", "eTotalKwh","facHz","iacAmp","ipvAmp","mode","pacKw","pf","ppvKw","qacKvar","rInsulKohm","sacKva","vac","vpv","tmpExt","tmpInt"]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getInverterConfiguration: (plantIds) => dispatch(getInverterConfiguration(plantIds)),
        getPlantByType: (plantsByType) => dispatch(getPlantByType(plantsByType)),
        clearSettingPlantMapping: () => dispatch(clearSettingPlantMapping()),
        createUpdateCSVMFMMap: (data) => dispatch(createUpdateCSVMFMMap(data))

    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MFMCSVMappingEdit));