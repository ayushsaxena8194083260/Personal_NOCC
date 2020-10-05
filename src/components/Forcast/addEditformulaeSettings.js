import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import 'react-picky/dist/picky.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { createOrUpdateFormulaSetting, viewAllTimeSlotSetting } from '../../actions/action-Forecasting';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import DropDown from '../Common/DropDown';
import { getAllPlants } from '../../actions';


class FormulaeSettingsAddEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeSlots: this.props.timeSlots,
            postData: this.props.location && this.props.location.input ? this.props.location.input : {},
            selectedPlantOptions: [],
            checkBoxSelected: [],
            formula: this.props.location.input && this.props.location.input.formula ? this.props.location.input.formula : "",
            // soltName: [{ displayText: '-- Select time slot --', value: 0 }, { displayText: 't1', value: 't1' }, { displayText: 't2', value: 't2' }, { displayText: 't3', value: 't3' }, { displayText: 't4', value: 't4' }],
            preFormula: [{ displayText: '-- Select Variable --', value: -1 }, { displayText: 'Active Power', value: 1 }, { displayText: 'Ambient Temperature', value: 2 }, { displayText: 'Insolation', value: 3 }, { displayText: 'Module Temperature', value: 4 }],
            displayName: this.props.location && this.props.location.input ? 'Edit Formulae Settings' : 'Add Formulae Settings',
            intialFormula: this.props.location.input && this.props.location.input.formula ? this.props.location.input.formula : "",
            preFormulaValue: ["p", "a", "i", "m"],
            selectedTimeSlot: this.props.location && this.props.location.input ? this.props.location.input.timeSlotName : "",
        };
    }

    getDropDownTimeSlots() {
        let timeSlots = [];
        timeSlots.push({ displayText: "--Select Time Slots--", value: "0" })
        this.state.timeSlots && this.state.timeSlots.map((item) => {
            timeSlots.push({ displayText: item.timeSlotName, value: item.timeSlotId })
        });

        return timeSlots;
    }

    getDropDownValue(data, value) {
        const selected = data && data.filter((item) => item.displayText == value)[0];
        return  selected && selected.value ? selected.value :-1  ;

    }

    getDropDownPlantName(data, value) {
        const selected = data && data.filter((item) => item.plantName == value)[0];
        const _value = selected && selected.plantId ? selected.plantId :-1;
        return  _value;
    }

    getDropDownValueSlot(data, value) {
        const selected = data && data.filter((item) => item.value == value)[0];
        return  selected && selected.value ? selected.value :-1  ;
    }


    componentDidMount() {
        // document.title = 'Plant Fault Data';
        this.props.getAllPlants();
        this.props.viewAllTimeSlotSetting();
        if (this.props.location.input != undefined){
            const _data = this.state.postData;
            const selected = this.props.plants && this.props.plants.filter((item) => item.plantName == this.props.location.input.plantName)[0];
            const _value = selected && selected.plantId ? selected.plantId :-1;
            _data["plantId"] = _value;
            const selectedTimeSlot = this.props.timeSlots && this.props.timeSlots.filter((item) => item.timeSlotName == this.props.location.input.timeSlotName)[0];
            const  _val = selectedTimeSlot.timeSlotId ? selectedTimeSlot.timeSlotId :-1  ;
            _data["timeSlotId"] = _val;
            const value = this.getDropDownValueSlot(this.state.preFormula, (this.state.preFormulaValue.indexOf(this.props.location.input.variable)+1));
            // const selectedFormula = this.state.preFormula && this.state.preFormula.filter((item) => item.displayText == this.props.location.input.variable)[0];
            // const  _val1 = selectedFormula.value ? selectedFormula.value :-1  ;
            _data["variableId"] = value;
            this.setState({postData: _data});    
        }
    }

    componentDidUpdate() {
        //this.props.getProjectNames(this.state.selectedValue);
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps !== null) {
            this.setState({
                  timeSlots: nextProps.timeSlots,
            })
        }
    }
    // handleChangePlant(event) {
    //     const _data = this.state.postData;
    //     const selectedValue = event.target.value;
    //     if (selectedValue && selectedValue.plantId !== "-1") {
    //         _data[event.target.name] = selectedValue;
    //         this.setState({ postData: _data });
    //     }
    // }

    handleChangePlant(event) {
        const stateDup1 = this.state.postData;
        let plants = this.props.plants;
        stateDup1.plantId = event.target.value;
        for (var i = 0; i < plants.length; i++) {
            if (plants[i].plantName === event.target.value) {
                stateDup1.plantId = plants[i].plantId;
                break;
            }
        }
        console.log(stateDup1)
        // this.setState(stateDup1);
        this.setState({postData: stateDup1});
    }
    handleChangeTimeSlot(event) {
        console.log(this.props.input)
        const stateDup1 = this.state.postData;
        stateDup1.timeSlotId = event.target.value;
        this.setState(stateDup1)
    }

    handleChangePreFormula(event) {
        const stateDup1 = this.state.postData;
        let input = this.state.preFormula;
        stateDup1.variableId = event.target.value;
        for (var i = 0; i < input.length; i++) {
            if (input[i].variable === event.target.value) {
                stateDup1.variableId = input[i].variableId;
                break;
            }
        }
        console.log(stateDup1)
        this.setState(stateDup1)
    }
    handleChange(event) {
        let _data = this.state.postData;
        let checkBoxValues = this.state.checkBoxSelected;
        checkBoxValues[event.target.name] = event.target.checked;
        let formula = this.state.intialFormula;
        const formulas = ["p1*i1", "(p5*i8*a8)*9", "p5"];
        if (checkBoxValues["formula1"] == true) {
            formula += formulas[0];
        }
        if (checkBoxValues["formula2"] == true) {
            formula += formulas[1];
        }
        if (checkBoxValues["formula3"] == true) {
            formula += formulas[2];
        }
        _data["formula"] = formula;
        this.setState({ checkBoxSelected: checkBoxValues, postData: _data })
    }
    //     if(event.target.name == 'formula1'){
    //         // if(event.target.checked === true){

    //         //     formula.push(this.state.formula);
    //         //     formula.push(event.target.value);
    //         //     // let updatedformula = [...formula, ...selectFormauls]
    //         //     _data[event.target.name] = formula;
    //         }
    //         else{
    //             let formula= this.state.formula
    //             let index = formula.indexOf(event.target.value);
    //             formula.splice(index,1);
    //             let updatedformula = formula.join('');
    //             _data[event.target.name] = updatedformula;
    //         }
    //     }
    //     else{
    //         _data[event.target.name] = event.target.value;

    //     }
    //     this.setState({ postData: _data });
    // }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.postData !== null) {
            this.props.createOrUpdateFormulaSetting({ input: this.state.postData, type: this.state.displayName });
            this.props.history.push('formulaeSettings');
        }
    }



    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <div>
                    <section class="top-filter">
                        <div id="filter-table">
                        </div>
                    </section>

                    <Row>
                        <Col>
                            <Card className="add-plant-card" style={{ width: "100%" }}>
                                <Card.Header as="h5">Formula Setting</Card.Header>
                                <Card.Body style={{ padding: 0 }}>
                                    <Row style={{ marginBottom: "20px" }}>
                                        <Col style={{ maxWidth: "37%" }}>
                                            <Form.Label>Plant Name<span className="form-required">*</span></Form.Label>
                                        </Col>
                                        <Col>
                                        {/* <select class="form-control" name="plantId" type="dropdown" onChange={(item) => this.handleChangePlant(item)}>
                                        {this.props.plants && this.props.plants.map((item, key) => {
                                            if (this.state.postData && this.state.postData["plantId"] === item.plantId) {
                                                return <option value={item.plantId} selected>{item.plantName}</option>
                                            }
                                            else {
                                                return <option value={item.plantId}>{item.plantName}</option>
                                            }
                                        }

                                        )}
                                    </select> */}

                                            <select className="form-control top-search-input" required name="plantId" type="dropdown" onChange={(item) => this.handleChangePlant(item)} 
                                            value={this.getDropDownPlantName(this.props.plants, this.state.postData.plantName)} >
                                                {this.props.plants !== undefined ? this.props.plants.map((plant) => {
                                                    return <option value={plant.plantId}>{plant.plantName}</option>
                                                }) : ''}
                                            </select>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginBottom: "20px" }}>
                                        <Col style={{ maxWidth: "37%" }}>
                                            <Form.Label>Time Slot<span className="form-required">*</span></Form.Label>
                                        </Col>
                                        <Col>
                                            {/* <select className="form-control top-search-input" required name="timeSlotName" type="dropdown" onChange={(item) => this.handleChangeTimeSlot(item)} value={this.state.postData.timeSlotName} >
                                        <option>Select Time Slot</option>
                                        {this.props.input !== undefined? this.props.input.map((plant) =>{
                                           return <option key={plant.timeSlotId}>{plant.timeSlotName}</option>
                                            }):''}
                                    </select> */}
                                            <DropDown
                                                className="top-search-input form-control"
                                                Name="timeSlotId"
                                                itemSource={this.getDropDownTimeSlots()}
                                                value={this.getDropDownValue(this.getDropDownTimeSlots(), this.state.selectedTimeSlot)}
                                                // value={this.state.selectedTimeSlot}
                                                handleChange={(item) => this.handleChangeTimeSlot(item)}
                                            />
                                        </Col>
                                    </Row>
                                    <Row style={{ marginBottom: "20px" }}>
                                        <Col style={{ maxWidth: "37%" }}>
                                            <Form.Label>Predicting Formula For:<span className="form-required">*</span></Form.Label>
                                        </Col>
                                        <Col>
                                            {/* <select className="form-control top-search-input" required name="variable" type="dropdown" onChange={(item) => this.handleChangePreFormula(item)} value={this.state.preFormulaValue.indexOf(this.state.postData.variable).toString()} >
                                                                    &lt;
                                        {this.props.input !== undefined? this.state.preFormula.map((item)=>{
                                            return <option value={item.variableId} selected={(item.variableId-1) == this.state.preFormulaValue.indexOf(this.state.postData.variable).toString()? true : false} > {item.variable}</option>
                                                                      
                                        }):''}
                                         
                                        
                                        
                                    </select> */}
                                            <DropDown
                                                className="top-search-input form-control"
                                                Name="variableId"
                                                itemSource={this.state.preFormula}
                                                value={this.getDropDownValueSlot(this.state.preFormula, (this.state.preFormulaValue.indexOf(this.state.postData.variable)+1))}
                                                handleChange={(item) => this.handleChangePreFormula(item)}
                                            />
                                        </Col>
                                    </Row>
                                    <Row style={{ marginBottom: "20px" }}>
                                        <Col style={{ maxWidth: "37%" }}>
                                            <Form.Label>Formula<span className="form-required">*</span></Form.Label>
                                        </Col>
                                        <Col>
                                            <Form.Control className=" top-search-input" name="formula" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.formula} />
                                        </Col>
                                    </Row>
                                    <Row style={{ margin: 0, padding: "10px 0", background: "rgb(247, 247, 247)" }}>
                                        <Col></Col>
                                        <Col style={{ maxWidth: "30%" }}>
                                            <Button type="submit" variant="primary" size="md" block onClick={this.onSubmit}>Submit</Button>
                                        </Col>
                                        <Route render={({ history }) => (
                                            <Col style={{ maxWidth: "30%" }}>
                                                <Button variant="primary" size="md" onClick={() => { history.push('formulaeSettings') }} block>Back</Button>
                                            </Col>
                                        )} />
                                        <Col></Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <Card.Header as="h5">Formulae History</Card.Header>
                                <Card.Body style={{ height: "268px" }}>
                                    <Row style={{ fontSize: "13px" }}>
                                        <b><br />* p indicates active power value
                                    <br />* i indicates Insolation value
                                    <br /> * m indicates Module Temperature value
                                    <br /> * a indicates Ambient Temperature value
                                    <br />* (0-50) indicates number of days</b>
                                    </Row>
                                    <div style={{ textTransform: "lowercase", display: "block" }}>
                                        <input id="formulaCheck" type="checkbox" name="formula1" style={{ position: "relative", top: "4px", margin: "3px" }} value="p1*i1" onChange={(item) => this.handleChange(item)} />p1*i1</div>
                                    <div style={{ textTransform: "lowercase", display: "block" }}>
                                        <input id="formulaCheck" type="checkbox" name="formula2" style={{ position: "relative", top: "4px", margin: "3px" }} value="(p5*i8*a8)*9" onChange={(item) => this.handleChange(item)} />(p5*i8*a8)*9</div>
                                    <div style={{ textTransform: "lowercase", display: "block" }}>
                                        <input id="formulaCheck" type="checkbox" name="formula3" style={{ position: "relative", top: "4px", margin: "3px" }} value="p5" onChange={(item) => this.handleChange(item)} />p5</div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </form>
        )
    }
}

const mapStateToProps = (state, props) => {
    let plants = [{ plantName: "SELECT PLANTS", plantId: "-1" }];
    state.plants.allplants && state.plants.allplants.length > 0 && state.plants.allplants.map((item) => plants.push(item));
    let timeSlots = [{ plantName: "-- Select time slot --", timeSlotId: "-1" }];
    state.ForecastReducers.input && state.ForecastReducers.input.length > 0 && state.ForecastReducers.input.map((item) => timeSlots.push(item));
    return {
        plantsByType: state.plants.plantsByType,
        plantTypes: state.projectTypes.plantTypes,
        plants: plants,
        timeSlots:timeSlots,
        cleaningConfig: state.SettingsReducer.cleaningConfig,
        input: state.ForecastReducers.input,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        viewAllTimeSlotSetting: () => dispatch(viewAllTimeSlotSetting()),
        getAllPlants: () => dispatch(getAllPlants()),
        createOrUpdateFormulaSetting: (data) => dispatch(createOrUpdateFormulaSetting(data))

    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FormulaeSettingsAddEdit));