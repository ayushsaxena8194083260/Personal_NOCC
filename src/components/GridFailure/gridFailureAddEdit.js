import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Route } from 'react-router-dom';
//const previewImg = require('../../noRecordGraph.png');
// import TimePicker from 'react-time-picker';
// import TimePicker from 'react-bootstrap-time-picker';
import Select from 'react-select';
const options = [
    { value: '1:00:00', label: '1:00:00' },
    { value: '2:00:00', label: '2:00:00' },
    { value: '3:00:00', label: '3:00:00' },
    { value: '4:00:00', label: '4:00:00' },
    { value: '5:00:00', label: '5:00:00' },
    { value: '6:00:00', label: '6:00:00' },
    { value: '7:00:00', label: '7:00:00' },
    { value: '8:00:00', label: '8:00:00' },
    { value: '9:00:00', label: '9:00:00' },
    { value: '10:00:00', label: '10:00:00' },
    { value: '11:00:00', label: '11:00:00' },
    { value: '12:00:00', label: '12:00:00' },
    { value: '13:00:00', label: '13:00:00' },
    { value: '14:00:00', label: '14:00:00' },
    { value: '15:00:00', label: '15:00:00' },
    { value: '16:00:00', label: '16:00:00' },
    { value: '17:00:00', label: '17:00:00' },
    { value: '18:00:00', label: '18:00:00' },
    { value: '19:00:00', label: '19:00:00' },
    { value: '20:00:00', label: '20:00:00' },
    { value: '21:00:00', label: '21:00:00' },
    { value: '22:00:00', label: '22:00:00' },
    { value: '23:00:00', label: '23:00:00' },
    { value: '24:00:00', label: '24:00:00' },
];


class GridFailureAddEdit extends Component {

    constructor(props) {
        super(props);

        this.state = {
            plants: this.props.plants,
            postData: this.props.gridFailure,
            selected: null,
            time: 0,
            today: null,
            isSubmited: false
        }

        this.hanldChange = this.handleChange.bind(this);
    }

    addComponentAffected() {
        //<Form.Control name="component_affected" type="text" />
    }
    componentDidMount() {
        // document.title = 'Plant Fault Data';
        if (this.state.postData && this.state.postData.length > 0 && this.state.postData["plantTypes"] && this.state.postData["plantTypes"] !== "SELECT PLANT TYPE") {
            this.props.getPlantByType(this.state.postData["plantTypes"]);
        }
    }
    // handleChange2 = selectedOption => {
    //     this.state.selected = selectedOption.value;
    //     console.log(`Option selected:`, selectedOption.value);
    //     this.hourLost(selectedOption.value)
    // };
    // hourLost(hoursLost) {
    //     let _data = this.state.postData;
    //     _data["hoursLost"] = hoursLost;
    //     this.setState({ postData: _data });
    //     console.log(this.state)
    // }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps, 'Props')
        if (nextProps !== null) {
            this.setState({ plants: nextProps.plants })

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
    handleChangeTime(startTime, name) {
        if (startTime) {
            let _time = this.setDate(startTime);
            _time = new Date(_time.toString().split('GMT')[0] + ' UTC').toISOString().split('.')[0];
            let _postData = this.state.postData;
            _postData[name] = _time;
            this.setState({ postData: _postData });
        }
    }
    setDate(sTime) {
        const startTime = sTime;
        const date = this.state.postData["date"];
        const endTime = this.state.postData["stopTime"];
        return new Date(Date.parse(date + " " + startTime));
    }
    onSubmit = (e) => {
        e.preventDefault();
        // debugger

        this.handleChangeTime(this.state.postData.startTime, "startTime");
        // this.handleChangeTime(this.state.postData.stopTime, "stopTime");
        if (this.state.postData.startTime) {
            this.state.postData.startTime = this.state.postData.startTime.toString().replace('T', ' ')
        }
        // debugger
        // console.log(this.state.postData.hoursLost.length)
        //         if (this.state.postData.hoursLost && this.state.postData.hoursLost.length == 2) {

        //             this.state.postData.hoursLost = this.state.postData.hoursLost + ":00"
        //         }
        //         console.log(this.state.postData.hoursLost.length)

        //         if (this.state.postData.hoursLost && this.state.postData.hoursLost.length == 5) {
        //             this.state.postData.hoursLost = this.state.postData.hoursLost + ":00"
        //         }

        // let nextDate = this.state.postData.date.split(" ");
        // let secondDate = nextDate[0].split("-");
        // let thirdDate = secondDate[2]

        // if (thirdDate > this.state.today) {
        //     alert("Please select a valid date")
        // } else {}
            if (this.state.postData !== null && this.timeValidation() === true && this.fieldValid() === false) {
                this.props.createOrUpdateGridFailureData({ gridFailure: this.state.postData, type: this.props.pageName });
                this.props.history.push('/gridFailure');
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
        console.log(event.target);
        if(this.state.postData.date){
            let nextDate = new Date(this.state.postData.date);
            let birthday = new Date();
            // const date1 = birthday.getDate();
            this.setState({
                today: birthday
            })
            
            
            console.log(nextDate);
            
            console.log(birthday);
            // let secondDate = nextDate[0].split("-");
            // let thirdDate = secondDate[2]
        
            if (nextDate > birthday) {
                alert("Please select a valid date")
                this.state.postData.date = ""
            }
        }
        
    }

    handleChangeForNumber(event) {
        let _data = this.state.postData;
        let newData = this.state.postData;
        newData["generationLost"] = "";
        newData["recoveryTime"] = ""
        const re = /^[0-9\b]+$/;
        if (event.target.value === '' || re.test(event.target.value)) {
            _data[event.target.name] = event.target.value;
        }
        this.setState({ postData: _data });
        this.setState({ postData: newData })
    }

    handleChangeForDecimal(event) {
        let _data = this.state.postData;
        const re = /^[0-9]+\.?[0-9]*$/;
        if (event.target.value === '' || re.test(event.target.value)) {
            _data[event.target.name] = event.target.value;
        }
        this.setState({ postData: _data });

    }
    // handleChangeForDecimalhourLost(event) {
    //     let _data = this.state.postData;
    //     const re = /^[0-9]+\.?[0-9]*$/;
    //     if (event.target.value === '' || re.test(event.target.value)) {
    //         _data[event.target.name] = event.target.value;
    //     }
    //     this.setState({ postData: _data });
    //     console.log(_data)
    // }


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

    render() {

        // const { selectedOption } = this.state.hourLost;

        return (
            <form onSubmit={this.onSubmit}>
                <div>
                    <Card className="add-fault-card">
                        <Card.Header as="h5">{this.props.pageName}</Card.Header>
                        <Card.Body>
                            <div className="row" style={{ alignItems: "center", margin: "0" }} >
                                <Col lg={1} md={1} sm={6}>
                                    <Form.Label>Plant Type<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col lg={2} md={2} sm={6} className="input_group full__width">
                                    <select className="top-search-input form-control" name="plantTypes" width='300px' onChange={(item) => this.handleChangePlantType(item)}>
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
                                </Col>
                                <Col lg={1} md={1} sm={6}>
                                    <Form.Label>Plant<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col lg={2} md={2} sm={6} className="input_group full__width">
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
                                    {this.renderErrortext("plant_id", "The Plant field is required")}
                                </Col>


                                <Col lg={1} md={1} sm={6}>
                                    <Form.Label>Date<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col lg={2} md={2} sm={6} className="input_group full__width">
                                    <Form.Control name="date" type="date" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.date} />
                                    {this.renderErrortext("date", "The Date Field Is Required.")}
                                </Col>
                                <Col lg={1} md={1} sm={6}>
                                    <Form.Label>Start Time<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col lg={2} md={2} sm={6} className="input_group full__width">

                                    <Form.Control name="startTime" type="time" step="2" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.startTime} />
                                    {this.renderErrortext("startTime", "The start time Field Is Required.")}
                                </Col>

                                <Col lg={1} md={1} sm={6}>
                                    <Form.Label>Stop Time<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col lg={2} md={2} sm={6} className="input_group full__width">
                                    <Form.Control name="stopTime" type="time" step="2" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.stopTime} />
                                    {this.renderErrortext("stopTime", "The Stop Time Field Is Required.")}
                                </Col>
                                {/* <Col lg={1} md={1} sm={6}>
                                    <Form.Label>Hour Lost<span className="form-required">*</span></Form.Label>


                                </Col>
                                <Col lg={2} md={2} sm={6} className="input_group full__width2">
                                    <Form.Control name="hoursLost" type="text" onChange={(item) => this.handleChangeForDecimalhourLost(item)} value={this.state.postData && this.state.postData.hoursLost} />
                                
                                    {this.renderErrortext("hoursLost", "The Stop Time Field Is Required.")}
                                </Col> */}
                                <Col lg={1} md={1} sm={6}>
                                    <Form.Label>Irradiation At Array Tilt<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col lg={2} md={2} sm={6} className="input_group full__width">
                                    <Form.Control name="tiltIrradiationOh" type="text" onChange={(item) => this.handleChangeForDecimal(item)} value={this.state.postData && this.state.postData.tiltIrradiationOh} />
                                    {this.renderErrortext("tiltIrradiationOh", "The Irradiation At Array Tilt Field Is Required.")}
                                </Col>


                                <Col lg={1} md={1} sm={6}>
                                    <Form.Label>Module Temp<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col lg={2} md={2} sm={6} className="input_group full__width">
                                    <Form.Control name="moduleTempOh" type="text" onChange={(item) => this.handleChangeForDecimal(item)} value={this.state.postData && this.state.postData.moduleTempOh} />
                                    {this.renderErrortext("moduleTempOh", "The Module Temp Field Is Required.")}
                                </Col>
                                <Col lg={1} md={1} sm={6}>
                                    <Form.Label>Reason<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col lg={2} md={2} sm={6} className="input_group full__width">
                                    <Form.Control name="reason" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.reason} />
                                    {this.renderErrortext("reason", "The Fault Reason Field Is Required.")}
                                </Col>

                                <Col lg={1} md={1} sm={6}>
                                    <Form.Label>Count<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col lg={2} md={2} sm={6} className="input_group full__width">
                                    <Form.Control name="countOh" type="text" onChange={(item) => this.handleChangeForNumber(item)} value={this.state.postData && this.state.postData.countOh ? this.state.postData.countOh : null} />
                                    {this.renderErrortext("countOh", "The Count Field Is Required.")}
                                </Col>
                                <Col lg={1} md={1} sm={6}>
                                    <Form.Label>Affected Capacity<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col lg={2} md={2} sm={6} className="input_group full__width">
                                    <Form.Control name="affectedCapacity" type="text" onChange={(item) => this.handleChangeForDecimal(item)} value={this.state.postData && this.state.postData.affectedCapacity} />
                                    {this.renderErrortext("affectedCapacity", "The Affected Capacity Field Is Required.")}
                                </Col>




                                <Col lg={2} md={2} sm={6} className="large_percent_width">
                                    <Button type="submit" variant="primary" size="md" block>Submit</Button>
                                </Col>
                                <Route render={({ history }) => (

                                    <Col lg={2} md={2} sm={6} className="large_percent_width">
                                        <Button variant="primary" size="md" onClick={() => { history.push('/GRIDFAILURE') }} block>Back</Button>
                                    </Col>
                                )} />
                            </div>


                        </Card.Body>
                    </Card>
                </div>
            </form >
        )
    }
}



export default GridFailureAddEdit;