import React, { Component } from 'react';
import { createOrUpdateAzureLoss } from '../../actions/AzureLossAction';
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import '../../styles/plant/plantAddEdit.scss';
import DropDown from "../Common/DropDown";
import { getPlantByType } from '../../actions/GridFailureActions';
import { Route } from 'react-router-dom';

class AddEditAzureLossComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            plants: this.props.plants,
            postData: this.reFormatRecords(this.props.postData),
            selectedYear: null,
            isSubmited: false,
            selectedMonth: null,
            azureLoss: this.props.azureLoss,
            selctPlantType: this.props.selctPlantType,
            selctPlantId: this.props.selctPlantId,
        }
        if (this.props.pageName === "Add Azure Loss") {

        } else {
            this.state.postData["plantTypes"] = this.props.selctPlantType && this.props.selctPlantType.selectedPlantType;
            this.state.postData["plantId"] = this.props.selctPlantType && this.props.selctPlantType.plantIds[0];
        }

        this.hanldChange = this.handleChange.bind(this);
    }

    reFormatRecords(postData) {

        const data = [
            "inverterCliping",
            "dcLosses",
            "acCablelosses",
            "transformerLosses",
            "moduleQuality",
            "moduleMismatchLosses",
            "soilingLosses",
            "auxilaryLosses",
            "inverterEfficiency",
            "linearDerate",
            "shadingLosses",
            "gridOutageAndPlantDowntime",
            "transmissionLosses",
            "lossDueToIrradianceLevel",
            "lossDueToTemperature",
            "lamLosses",
            "designLoss",
            "totalSumOfLosses"
        ]

        data.map((item) => {
            postData[item] = postData[item].replace('%', '');
        })

        return postData;
    }

    componentDidMount() {
        // document.title = 'Plant Fault Data';
        if (this.state.postData && this.state.postData.length > 0 && this.state.postData["plantTypes"] && this.state.postData["plantTypes"] !== "SELECT PLANT TYPE") {
            this.props.getPlantByType(this.state.postData["plantTypes"]);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== null) {
            this.setState({ plants: nextProps.plants })
        }
    }

    fieldValid() {
        let inValid = false;

        this.props.submitedFields.map((item) => {
            if (!this.state.postData[item]) {
                inValid = true;
            }
        })
        return inValid;
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.postData !== null && this.fieldValid() === false) {
            this.props.createOrUpdateAzureLoss({ azureLoss: this.state.postData, type: this.props.pageName });
            this.props.history.push('/azureLoss');
        }

        this.setState({ isSubmited: true });
    }

    handleChangePlantType(event) {
        const _data = this.state.postData;
        const selectedValue = event.target.value;
        if (selectedValue) {
            _data[event.target.name] = selectedValue;
            this.props.getPlantByType(selectedValue);
            this.setState({ postData: _data });
        }
    }

    handleChange(event) {
        let _data = this.state.postData;
        _data[event.target.name] = event.target.value;
        this.setState({ postData: _data });
    }

    handleChangeForNumber(event) {
        let _data = this.state.postData;
        const re = /^[0-9\b]+$/;
        if (event.target.value === '' || re.test(event.target.value)) {
            _data[event.target.name] = event.target.value;
        }
        this.setState({ postData: _data });
    }

    handleChangeForDecimal(event) {
        let _data = this.state.postData;
        const re = /^[0-9]+\.?[0-9]*$/;
        if (event.target.value === '' || re.test(event.target.value)) {
            _data[event.target.name] = event.target.value;
        }
        this.setState({ postData: _data });

    }


    handleChangePlant(event) {
        const _data = this.state.postData;
        const selectedValue = event.target.value;
        if (selectedValue && selectedValue.plantId !== "-1") {
            _data[event.target.name] = selectedValue;
            this.setState({ postData: _data });
        }
    }

    renderErrortext(fieldID, msg) {
        return (
            this.state.isSubmited === true && !this.state.postData[fieldID] && <p className="errorText" style={{ color: "#CC0000", display: "block", fontSize: "11px", marginTopop: "0.5em" }}>{msg}</p>
        )
    }

    getDropDownYear() {
        return this.props.years && this.props.years.map((item) => { return { displayText: item, value: item } });
    }

    getDropDownMonth() {
        return this.props.month && this.props.month.map((item) => { return { displayText: item.displayText, value: item.value } });
    }

    handleChangeYear(event) {
        let _data = this.state.postData;
        const selectedYear = event.target.value;
        if (selectedYear !== "-1") {
            _data[event.target.name] = selectedYear;
            this.setState({ postData: _data });
        }
        // this.setState({ selectedYear });
    }

    handleChangeMonth(event) {
        let _data = this.state.postData;
        const selectedMonth = event.target.value;
        if (selectedMonth !== "-1") {
            _data[event.target.name] = selectedMonth;
            this.setState({ postData: _data });
        }
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <div>
                    <Card className="add-plant-card">
                        <Card.Header as="h5">{this.props.pageName}</Card.Header>
                        <Card.Body>
                            <Row>
                                <Col>
                                    <Form.Label>Plant Type<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <select className=" form-control" name="plantTypes" width='300px' onChange={(item) => this.handleChangePlantType(item)}>
                                        {this.props.plantTypes && this.props.plantTypes.map((item, key) => {
                                            if (this.state.postData["plantTypes"] === item) {
                                                return <option key={item} selected>{item}</option>
                                            }
                                            else {
                                                return <option key={item} >{item}</option>
                                            }
                                        }
                                        )}
                                    </select>
                                </Col>
                                <Col>
                                    <Form.Label>Plant<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <select class="form-control" name="plantId" type="dropdown" onChange={(item) => this.handleChangePlant(item)}>
                                        {this.state.plants && this.state.plants.map((item, key) => {
                                            if (this.state.postData["plantId"] === item.plantId) {
                                                return <option value={item.plantId} selected>{item.plantName}</option>
                                            }
                                            else {
                                                return <option value={item.plantId}>{item.plantName}</option>
                                            }
                                        }

                                        )}
                                    </select>
                                    {this.renderErrortext("plantId", "The Plant field is required")}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>Month:</Form.Label>
                                </Col>
                                <Col>
                                    <DropDown
                                        className=" form-control"
                                        Name="month"
                                        itemSource={this.getDropDownMonth()}
                                        value={this.state.postData["month"]}
                                        handleChange={(item) => this.handleChangeMonth(item)}
                                    />
                                </Col>
                                <Col>
                                    <Form.Label>Year:</Form.Label>
                                </Col>
                                <Col>
                                    <DropDown
                                        className=" form-control"
                                        Name="year"
                                        itemSource={this.getDropDownYear()}
                                        value={this.state.postData.year}
                                        handleChange={(item) => this.handleChangeYear(item)}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>Inverter Cliping<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="inverterCliping" type="text" onChange={(item) => this.handleChangeForDecimal(item)} value={this.state.postData && this.state.postData.inverterCliping} pattern="^-?[0-9]\d*\.?\d*$" />
                                    {this.renderErrortext("inverterCliping", "The Inverter Clipping Field Is Required.")}
                                </Col>
                                <Col></Col>
                                <Col></Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>DC Losses<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="dcLosses" type="text" onChange={(item) => this.handleChangeForDecimal(item)} value={this.state.postData && this.state.postData.dcLosses} pattern="^-?[0-9]\d*\.?\d*$" />
                                    {this.renderErrortext("dcLosses", "The DC Losses Field Is Required.")}
                                </Col>
                                <Col>
                                    <Form.Label>Ac Cablelosses<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="acCablelosses" type="text" onChange={(item) => this.handleChangeForDecimal(item)} value={this.state.postData && this.state.postData.acCablelosses} pattern="^-?[0-9]\d*\.?\d*$" />
                                    {this.renderErrortext("acCablelosses", "The AC Losses Field Is Required.")}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>Transformer Losses<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="transformerLosses" type="text" onChange={(item) => this.handleChangeForDecimal(item)} value={this.state.postData && this.state.postData.transformerLosses} pattern="^-?[0-9]\d*\.?\d*$" />
                                    {this.renderErrortext("transformerLosses", "The Transformer Losses Field Is Required.")}
                                </Col>
                                <Col>
                                    <Form.Label>Module Quality<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="moduleQuality" type="text" onChange={(item) => this.handleChangeForDecimal(item)} value={this.state.postData && this.state.postData.moduleQuality} pattern="^-?[0-9]\d*\.?\d*$" />
                                    {this.renderErrortext("moduleQuality", "The Module Quality Field Is Required.")}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>Module Mismatch Losses<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="moduleMismatchLosses" type="text" onChange={(item) => this.handleChangeForDecimal(item)} value={this.state.postData && this.state.postData.moduleMismatchLosses} pattern="^-?[0-9]\d*\.?\d*$" />
                                    {this.renderErrortext("moduleMismatchLosses", "The Module Mismatch Losses Field Is Required.")}
                                </Col>
                                <Col>
                                </Col>
                                <Col>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>Soiling Losses <span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="soilingLosses" type="text" onChange={(item) => this.handleChangeForDecimal(item)} value={this.state.postData && this.state.postData.soilingLosses} pattern="^-?[0-9]\d*\.?\d*$" />
                                    {this.renderErrortext("soilingLosses", "The Soiling Losses Field Is Required.")}
                                </Col>
                                <Col>
                                    <Form.Label>Auxilary Losses<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="auxilaryLosses" type="text" onChange={(item) => this.handleChangeForDecimal(item)} value={this.state.postData && this.state.postData.auxilaryLosses} pattern="^-?[0-9]\d*\.?\d*$" />
                                    {this.renderErrortext("auxilaryLosses", "The Auxilary Losses Field Is Required.")}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>Inverter Efficiency<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="inverterEfficiency" type="text" onChange={(item) => this.handleChangeForDecimal(item)} value={this.state.postData && this.state.postData.inverterEfficiency} pattern="^-?[0-9]\d*\.?\d*$" />
                                    {this.renderErrortext("inverterEfficiency", "The Inverter Efficiency Field Is Required.")}
                                </Col>
                                <Col>
                                    <Form.Label>Linear Derate<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="linearDerate" type="text" onChange={(item) => this.handleChangeForDecimal(item)} value={this.state.postData && this.state.postData.linearDerate} pattern="^-?[0-9]\d*\.?\d*$" />
                                    {this.renderErrortext("linearDerate", "The Linear Derate Field Is Required.")}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>Shading Losses<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="shadingLosses" type="text" onChange={(item) => this.handleChangeForDecimal(item)} value={this.state.postData && this.state.postData.shadingLosses} pattern="^-?[0-9]\d*\.?\d*$" />
                                    {this.renderErrortext("shadingLosses", "The Shadding Losses Field Is Required.")}
                                </Col>
                                <Col>
                                </Col>
                                <Col>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>Grid Outage And Plant Downtime<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="gridOutageAndPlantDowntime" type="text" onChange={(item) => this.handleChangeForDecimal(item)} value={this.state.postData && this.state.postData.gridOutageAndPlantDowntime} pattern="^-?[0-9]\d*\.?\d*$" />
                                    {this.renderErrortext("gridOutageAndPlantDowntime", "The Grid Outage And Plant Downtime Field Is Required.")}
                                </Col>
                                <Col>
                                    <Form.Label>Transmission Losses<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="transmissionLosses" type="text" onChange={(item) => this.handleChangeForDecimal(item)} value={this.state.postData && this.state.postData.transmissionLosses} pattern="^-?[0-9]\d*\.?\d*$" />
                                    {this.renderErrortext("transmissionLosses", "The Transmission Losses Field Is Required.")}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>Irradiance Level<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="lossDueToIrradianceLevel" type="text" onChange={(item) => this.handleChangeForDecimal(item)} value={this.state.postData && this.state.postData.lossDueToIrradianceLevel} pattern="^-?[0-9]\d*\.?\d*$" />
                                    {this.renderErrortext("lossDueToIrradianceLevel", "The Irrdiance Level Field Is Required.")}
                                </Col>
                                <Col>
                                    <Form.Label>Temperature<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="lossDueToTemperature" type="text" onChange={(item) => this.handleChangeForDecimal(item)} value={this.state.postData && this.state.postData.lossDueToTemperature} pattern="^-?[0-9]\d*\.?\d*$" />
                                    {this.renderErrortext("lossDueToTemperature", "The Temperature Field Is Required.")}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>IAM<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="lamLosses" type="text" onChange={(item) => this.handleChangeForDecimal(item)} value={this.state.postData && this.state.postData.lamLosses} pattern="^-?[0-9]\d*\.?\d*$" />
                                    {this.renderErrortext("lamLosses", "The IAM Field Is Required.")}
                                </Col>
                                <Col>
                                    <Form.Label>Total Sum Of Losses<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="totalSumOfLosses" type="text" onChange={(item) => this.handleChangeForDecimal(item)} value={this.state.postData && this.state.postData.totalSumOfLosses} pattern="^-?[0-9]\d*\.?\d*$" />
                                    {this.renderErrortext("totalSumOfLosses", "The IAM Field Is Required.")}
                                </Col>
                            </Row>
                            {/* Total Sum Of Losses */}
                            <Row>
                                <Col>
                                </Col>
                                <Col md={2}>
                                    <Button type="submit" variant="primary" size="md" block>Submit</Button>
                                </Col>
                                <Route render={({ history }) => (
                                    <Col md={2}>
                                        <Button variant="primary" size="md" onClick={() => { history.push('/azureLoss') }} block>Back</Button>
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

function getYearFromToday() {
    let years = [];
    const todayDate = new Date();
    const strYear = todayDate.getFullYear();
    {
        if (strYear) {
            let year = parseInt(strYear) - 5;
            const endYear = parseInt(strYear) + 2;
            let i;
            years.push("Select Year");
            for (i = parseInt(year); i <= endYear; i++) {
                let addoneYear = parseInt(i) + 1;
                years.push(addoneYear);
            }

        }
    }
    return years;
}

const mapStateToProps = (state, props) => {
    const plantLoss = props.location && props.location.plantLoss ? props.location.plantLoss : [];
    let plants = [{ plantName: "SELECT PLANTS", plantId: "-1" }];
    state.projectTypes.plantTypes && state.projectTypes.plantTypes.length > 0 && state.projectTypes.plantTypes.map((item) => plants.push(item));
    return {
        pageName: plantLoss.plantId ? "Edit Azure Loss" : "Add Azure Loss",
        plantTypes: ["SELECT PLANT TYPE", "GROUNDMOUNT", "ROOFTOP"],
        plants: plants,
        postData: props.location && props.location.plantLoss ? props.location.plantLoss : {},
        month: [{ displayText: "SELECT MONTH", value: "-1" }, { displayText: "Jan", value: "1" }, { displayText: "Feb", value: "2" }, { displayText: "March", value: "3" }, { displayText: "April", value: "4" }, { displayText: "May", value: "5" }, { displayText: "June", value: "6" }, { displayText: "July", value: "7" }, { displayText: "August", value: "8" }, { displayText: "September", value: "9" }, { displayText: "October", value: "10" }, { displayText: "November", value: "11" }, { displayText: "December", value: "12" }],
        years: getYearFromToday(),
        selctPlantType: state.azureLossReducer.azureLoss,
        submitedFields: ["plantId", "inverterCliping", "dcLosses", "acCablelosses", "transformerLosses", "moduleQuality", "moduleMismatchLosses", "soilingLosses", "auxilaryLosses", "inverterEfficiency", "linearDerate", "shadingLosses", "gridOutageAndPlantDowntime", "transmissionLosses", "lossDueToIrradianceLevel", "lossDueToTemperature", "lamLosses", "month", "year"]

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createOrUpdateAzureLoss: (plant) => dispatch(createOrUpdateAzureLoss(plant)),
        getPlantByType: (plantType) => dispatch(getPlantByType(plantType))

    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddEditAzureLossComponent));