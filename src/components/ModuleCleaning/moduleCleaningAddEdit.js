import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Route } from 'react-router-dom';

class ModuleCleaningAddEdit extends Component {

    constructor(props) {
        super(props);

        let postData = this.props.moduleCleaning
        postData['rainingDetail'] = postData['rainingDetail'] == 'NO' ? 'NO' : 'YES'

        this.state = {
            plants: this.props.plants,
            postData: postData,
            raining: postData['rainingDetail'],
            isSubmited: false,
            trueValue: postData['rainingDetail'] == 'YES' ? false : true
        }

        console.log(this.state.postData, 'sasas')

        this.hanldChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        // document.title = 'Plant Fault Data';
        if (this.state.postData && this.state.postData.length > 0 && this.state.postData["plantTypes"] && this.state.postData["plantTypes"] !== "SELECT PLANT TYPE") {
            this.props.getPlantByType(this.state.postData["plantTypes"]);
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        if (nextProps !== null) {
            this.setState({ plants: nextProps.plants })
            //this.setState({weatherStationName: nextProps.weatherStationName})
        }
    }

    timeValidation() {

        if (this.state.postData["startTime"] && this.state.postData["stopTime"]) {
            const startTime = this.state.postData["startTime"];
            const endTime = this.state.postData["stopTime"];
            if (Date.parse("01/01/2019 " + endTime) < Date.parse("01/01/2019 " + startTime)) {
                alert("Stop time should be greater than start time.");
                return false;
            }
            return true;
        }
        return false;
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
        if (this.state.trueValue === true) {
            if (this.state.postData !== null) {
                  
                // if (this.state.postData.date) {
                //     this.state.postData.date = this.state.postData.date;
                //     var a = this.state.postData.date.toString().replace('/', '-')
                //     var b = a.toString().replace('/', '-')
                //     console.log(b)
                  
                //     this.state.postData.date = new Date(b.split("-").reverse().join('-'))
                // }

                this.props.createOrUpdateModuleCleaning({ moduleCleaning: this.state.postData, type: this.props.pageName });
                //alert('PLANT FAULT DATA has been created successfully');
                this.props.history.push('/moduleCleaning');
            }
        }
        else if (this.state.trueValue === false) {

            if (this.state.postData.date) {
                console.log(this.state.postData.date)
                this.state.postData.date = this.state.postData.date;
                var a = this.state.postData.date.toString().replace('/', '-')
                var b = a.toString().replace('/', '-')
                this.state.postData.date = new Date(b.split("-").reverse().join('-'));
                console.log(this.state.postData.date)

            }

            if (this.state.postData !== null && this.timeValidation() === true && this.fieldValid() === false) {
                this.props.createOrUpdateModuleCleaning({ moduleCleaning: this.state.postData, type: this.props.pageName });
                //alert('PLANT FAULT DATA has been created successfully');
                this.props.history.push('/moduleCleaning');
            }
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

    handleChangePlant(event) {
        const _data = this.state.postData;
        const selectedValue = event.target.value;
        if (selectedValue && selectedValue.plantId !== "-1") {
            _data[event.target.name] = selectedValue;
            this.setState({ postData: _data });
        }
    }


    handleChangeMOCRD(event) {
        const _data = this.state.postData;
        const selectedValue = event.target.value;
        if (selectedValue && selectedValue.modeOfCleaning !== "-1") {
            _data[event.target.name] = selectedValue;
            this.setState({ postData: _data });
        }
    }

    // handleChangeMOCRD(event) {
    //     const _data = this.state.postData;
    //     const selectedValue = event.target.value;
    //     let _mode_of_cleaning = "0";
    //     if (selectedValue) {
    //         if (selectedValue === "Wet Cleaning"){
    //             _mode_of_cleaning = "1";
    //         } else if (selectedValue === "Dry Cleaning"){
    //             _mode_of_cleaning = "2";
    //         }
    //         _data[event.target.name] = _mode_of_cleaning;
    //         this.setState({ postData: _data });
    //     }
    // }

    handleChangeRD(event) {
        const data = Boolean;
        const _data = this.state.postData;
        const starttimeData = this.state.postData;
        const stoptimeData = this.state.postData;
        const raniningDetails = this.state.postData;
        const selectedValue = event.target.value;
        console.log(selectedValue)

        this.setState({ raining: event.target.value });

        if (event.target.value == "NO") {
            this.setState({ trueValue: true });
            console.log(this.state.trueValue);
            starttimeData["startTime"] = null;
            this.setState({ postData: starttimeData });
            stoptimeData["stopTime"] = null;
            this.setState({ postData: stoptimeData });
            console.log(this.state.postData, 'perfect')
        }
        else if (event.target.value == "YES") {
            raniningDetails["rainingDetail"] = "YES"
            this.setState({ postData: raniningDetails });
            this.setState({ trueValue: false });
            console.log(this.state.trueValue)
        }
        if (selectedValue) {

            _data[event.target.name] = selectedValue;
            let a = {};
            this.setState({ postData: _data });
            console.log(_data)
        }

    }



    // heandleChangeWS(event) {
    //     const _data = this.state.postData;
    //     const selectedValue = event.target.value;
    //     if (selectedValue && selectedValue.weather_station_id !== "-1") {
    //         _data[event.target.name] = selectedValue;
    //         this.setState({ postData: _data });
    //     }
    // }

    handleChange(event) {
        console.log(event.target.value)
        let _data = this.state.postData;
        _data[event.target.name] = event.target.value;
        console.log(_data)
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

    renderErrortext(fieldID, msg) {
        return (
            this.state.isSubmited === true && !this.state.postData[fieldID] && <p className="errorText" style={{ color: "#CC0000", display: "block", fontSize: "11px", marginTopop: "0.5em" }}>{msg}</p>
        )
    }

    splitDate(editDate) {
        const _editDate = editDate.substr(0, 10);
        return _editDate;
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
                                    <Form.Label>Plant Type</Form.Label>
                                    {/* </Col>
                                <Col> */}
                                    <select className="form-control" name="plantTypes" width='300px' onChange={(item) => this.handleChangePlantType(item)}>
                                        {this.props.plantTypes && this.props.plantTypes.map((item, key) => {
                                            if (this.props.selectedPlantType === item) {
                                                return <option key={item} selected>{item}</option>
                                            }
                                            else {
                                                return <option key={item} >{item}</option>
                                            }
                                        }
                                        )}
                                    </select>
                                    {/*{this.renderErrortext("plant_Type", "The Plant Type is required")}*/}
                                </Col>
                                <Col>
                                    <Form.Label>Plant</Form.Label>
                                    {/* </Col>
                                <Col> */}
                                    <select className="form-control" name="plantId" type="dropdown" onChange={(item) => this.handleChangePlant(item)}>
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
                                <Col>
                                    <Form.Label>Date</Form.Label>
                                    {/* </Col>
                                <Col> */}
                                    <Form.Control name="date" type="date" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.date ? this.splitDate(this.state.postData.date) : null} />
                                    {this.renderErrortext("date", "The Date Field Is Required.")}
                                </Col>
                                {/* <Col>
                                <Form.Label>Date</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control name="date" type="date" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.date ? this.splitDate(this.state.postData.date) : null} />
                                {this.renderErrortext("date", "The Date Field Is Required.")}
                            </Col> */}
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>Cost per Rack:</Form.Label>
                                    {/* </Col>
                                <Col> */}
                                    <Form.Control name="rackPerCost" type="text" onChange={(item) => this.handleChangeForDecimal(item)} value={this.state.postData && this.state.postData.rackPerCost} pattern="^-?[0-9]\d*\.?\d*$" />
                                    {this.renderErrortext("rackPerCost", "The Rack per Cost Field Is Required.")}
                                </Col>
                                <Col>
                                    <Form.Label>No of Rack Planned:</Form.Label>
                                    {/* </Col>
                                <Col> */}
                                    <Form.Control name="rackPlanned" type="text" onChange={(item) => this.handleChangeForDecimal(item)} value={this.state.postData && this.state.postData.rackPlanned} pattern="^-?[0-9]\d*\.?\d*$" />
                                    {this.renderErrortext("rackPlanned", "No of Rack Planned: Field Is Required.")}
                                </Col>
                                <Col>
                                    <Form.Label>Actual no of Rack Cleaned:</Form.Label>
                                    {/* </Col>
                                <Col> */}
                                    <Form.Control name="rackCleaned" type="text" onChange={(item) => this.handleChangeForDecimal(item)} value={this.state.postData && this.state.postData.rackCleaned} pattern="^-?[0-9]\d*\.?\d*$" />
                                    {this.renderErrortext("rackCleaned", "Actual no of Rack Cleaned: Field Is Required.")}
                                </Col>


                            </Row>



                            <Row>
                                <Col>
                                    <Form.Label>Total Cleaning(KW):</Form.Label>
                                    {/* </Col>
                                <Col> */}
                                    <Form.Control name="totalCleaned" type="text" onChange={(item) => this.handleChangeForDecimal(item)} value={this.state.postData && this.state.postData.totalCleaned} pattern="^-?[0-9]\d*\.?\d*$" />
                                    {this.renderErrortext("totalCleaned", "Total Cleaning(KW): Field Is Required.")}
                                </Col>
                                <Col>
                                    <Form.Label>No. of Labor Planned:</Form.Label>
                                    {/* </Col>
                                <Col> */}
                                    <Form.Control name="labourPlanned" type="text" onChange={(item) => this.handleChangeForDecimal(item)} value={this.state.postData && this.state.postData.labourPlanned} pattern="^-?[0-9]\d*\.?\d*$" />
                                    {this.renderErrortext("labourPlanned", "No. of Labor Planned: Field Is Required.")}
                                </Col>
                                <Col>
                                    <Form.Label>Actual No. of Labor Used</Form.Label>
                                    {/* </Col>
                                <Col> */}
                                    <Form.Control name="labourUsed" type="text" onChange={(item) => this.handleChangeForDecimal(item)} value={this.state.postData && this.state.postData.labourUsed} pattern="^-?[0-9]\d*\.?\d*$" />
                                    {this.renderErrortext("labourUsed", "Actual No. of Labor Used Field Is Required.")}
                                </Col>


                            </Row>

                            <Row>
                                <Col>
                                    <Form.Label>Mode of Cleaning:</Form.Label>
                                    {/* </Col>
                                <Col> */}
                                    <select class="form-control" name="modeOfCleaning" type="dropdown" onChange={(item) => this.handleChangeMOCRD(item)}>
                                        {this.props.moduleCleaningName && this.props.moduleCleaningName.map((item, key) => {
                                            if (this.state.postData["modeOfCleaning"] === item.moduleCleaningName) {
                                                return <option value={item.modeOfCleaning} selected>{item.moduleCleaningName}</option>
                                            }
                                            else {
                                                return <option value={item.modeOfCleaning}>{item.moduleCleaningName}</option>
                                            }
                                        }

                                        )}
                                    </select>

                                    {/* <select className="top-search-input form-control" name="mode_of_cleaning" width='300px' onChange={(item) => this.handleChangeMOCRD(item)} value={this.state.postData && this.state.postData.mode_of_cleaning}>
                                    {this.props.moduleCleaningName && this.props.moduleCleaningName.map((item, key) => {
                                            if (this.props.selectedModuleClean === item) {
                                                return <option key={item} selected>{item}</option>
                                            }
                                            else {
                                                return <option key={item} >{item}</option>
                                            }
                                        }
                                        )}
                                    </select> */}
                                    {this.renderErrortext("modeOfCleaning", "Mode of Cleaning field is required")}
                                </Col>
                                <Col>
                                    <Form.Label>Raining Detail:</Form.Label>
                                    {/* </Col>
                                <Col> */}
                                    <select className="form-control" name="rainingDetail" width='300px' onChange={(item) => this.handleChangeRD(item)} value={this.state.raining}>
                                        {this.props.rainingDetail && this.props.rainingDetail.map((item, key) => {
                                            if (this.props.selectedRainingDet === item) {
                                                return <option key={item} selected>{item}</option>
                                            }
                                            else {
                                                return <option key={item} >{item}</option>
                                            }
                                        }
                                        )}
                                    </select>
                                    {this.renderErrortext("rainingDetail", "Raining Detail field is required")}
                                </Col>
                                <Col>
                                    <Form.Label>Start Time</Form.Label>
                                    {/* </Col>
                                <Col> */}
                                    <Form.Control name="startTime" type="time" step="2" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.startTime} readOnly={this.state.trueValue} />
                                    {/* {this.renderErrortext("startTime", "The start time Field Is Required.")} */}
                                </Col>



                            </Row>

                            <Row>

                                <Col>
                                    <Form.Label>Stop Time</Form.Label>
                                    {/* </Col>
                                <Col> */}
                                    <Form.Control name="stopTime" type="time" step="2" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.stopTime} readOnly={this.state.trueValue} />
                                    {/* {this.renderErrortext("stopTime", "The Stop Time Field Is Required.")} */}
                                </Col>

                                <Col>
                                    <Form.Label>Cleaning Frequency:</Form.Label>
                                    {/* </Col>
                                <Col> */}
                                    <Form.Control name="cleaningFrequency" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.cleaningFrequency} />
                                    {this.renderErrortext("cleaningFrequency", "Cleaning Frequency: Field Is Required.")}
                                </Col>
                                <Col>
                                    <Form.Label>Water Used(In Ltrs):</Form.Label>
                                    {/* </Col>
                                <Col> */}
                                    <Form.Control name="waterUsed" type="text" onChange={(item) => this.handleChangeForDecimal(item)} value={this.state.postData && this.state.postData.waterUsed} pattern="^-?[0-9]\d*\.?\d*$" />
                                    {this.renderErrortext("waterUsed", "Water Used(In Ltrs): Field Is Required.")}
                                </Col>

                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>Per Inverter Cleaning Cost:</Form.Label>
                                    {/* </Col>
                                <Col> */}
                                    <Form.Control name="cleaningExpenditure" type="text" onChange={(item) => this.handleChangeForDecimal(item)} value={this.state.postData && this.state.postData.cleaningExpenditure} pattern="^-?[0-9]\d*\.?\d*$" />
                                    {this.renderErrortext("cleaningExpenditure", "Per Inverter Cleaning Cost: Field Is Required.")}
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
                                        <Button variant="primary" size="md" onClick={() => { history.push('/moduleCleaning') }} block>Back</Button>
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

export default ModuleCleaningAddEdit;