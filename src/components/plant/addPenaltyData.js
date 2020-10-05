import React, { Component } from 'react';
// import axios from 'axios';
// import { createOrUpdatePlant } from "../../actions"
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import '../../styles/plant/plantAddEdit.scss';
import DropDown from "../Common/DropDown";
import { Route } from 'react-router-dom';
import {createOrUpdatePenalty} from '../../actions/action-Penalty';

class AddPenaltyData extends Component {

    constructor(props) {
        super(props)
        this.state = {
            plantTypes: this.props.plants,
            selectedPlantOptions: [],
            penaltyPlantType: [],
            selectedPenaltyPT: null,
            isSubmited: false,
            penalty:[],
            postData: [],
        }
    }

        componentWillMount(){
            
            this.setState({penaltyPlantType:[
                {
                    id:1,
                    name:"Trail"
                },{
                    id:2,
                    name:"Applicable"
                },{
                    id:3,
                    name:"N/A"
                }
            ]});
        }

    getDropDownPlants() {
        let plants = [];
        plants.push({ displayText: "Select Plant", value: "0" })
        this.state.plantTypes && this.state.plantTypes.map((item, index) => {
            plants.push({ displayText: item.plantName, value: item.plantId, key: index})
        });

        return plants;
    }

    getDropDownPenaltyPlantType() {
        let penaltyPT = [];
        penaltyPT.push({ displayText: "Select Plant Type", value: "0" })
        this.state.penaltyPlantType && this.state.penaltyPlantType.map((item, index) => {
            penaltyPT.push({ displayText: item.name, value: item.id, key: index})
        });
        return penaltyPT;
    }

    handleChangePlants(event) {
        const selectedValue = event.target.value;
        let _data = this.state.postData;
        
        
            _data[event.target.name] = event.target.value;
        
        this.setState({ postData: _data });
    }

    handleChangePenaltyPT(event) {
        const selectedValue = event.target.value;
       
        let _data = this.state.postData;
        
        
            _data[event.target.name] = event.target.value;
        
        this.setState({ postData: _data });
        //this.setState({ selectedPenaltyPT: selectedValue });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== null) {
            this.setState({
                plantTypes: nextProps.plantTypes,
            })
        }
    }

    handleChangeForNumber(event) {
        let _data = this.state.postData;
        const re = /^[0-9\b]+$/;
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
        if (this.state.postData !== null ) {
            this.props.createOrUpdatePenalty(this.state.postData);
            this.props.history.push('/penaltyData');
        }
        this.setState({ isSubmited: true });
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <div>
                    <Card className="add-plant-card">
                        <Card.Header as="h5">Penalty Data</Card.Header>
                        <Card.Body>
                            <Row>
                                <Col>
                                    <Form.Label>Plant name<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                {/*}style={{ maxWidth: "18%", padding: "0" }}>*/}
                                    <DropDown
                                        className="top-search-input form-control"
                                        Name="plantId"
                                        itemSource={this.getDropDownPlants()}
                                        value={this.state.selectedPlantOptions}
                                        handleChange={(item) => this.handleChangePlants(item)}
                                    />
                                </Col>
                                <Col>
                                    <Form.Label>Month<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="month" type="number" onChange={(item) => this.handleChangeForNumber(item)} value={this.state.postData && this.state.postData.month ? this.state.postData.month : null} />
                                    {this.renderErrortext("month", "The Month Field Is Required.")}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>Year<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="year" type="number" onChange={(item) => this.handleChangeForNumber(item)} value={this.state.postData && this.state.postData.year ? this.state.postData.year : null} />
                                    {this.renderErrortext("year", "The Year Field Is Required.")}
                                </Col>
                                <Col>
                                    <Form.Label>Penalty Data<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="penaltyData" type="number" onChange={(item) => this.handleChangeForNumber(item)} value={this.state.postData && this.state.postData.penalty_data ? this.state.postData.penalty_data : null} />
                                    {this.renderErrortext("penalty_data", "The Penalty Data Field Is Required.")}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>Plant Type<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <DropDown
                                        className="top-search-input form-control"
                                        Name="penaltyDataPlantType"
                                        itemSource={this.getDropDownPenaltyPlantType()}
                                        value={this.state.selectedPenaltyPT}
                                        handleChange={(item) => this.handleChangePenaltyPT(item)}
                                    />
                                    {this.renderErrortext("penalty_data_plant_type", "The Penalty Plant Type field is required")}

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
                                        <Button variant="primary" size="md" onClick={() => { history.push('/penaltyData') }} block>Back</Button>
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
const mapStateToProps = state => {
    return {

        plant: state.plant,
        plants: state.plants.allplants,
        submitedFields: ["plant_id", "penalty_data_plant_type", "penalty_data", "month", "year"],
        penalty:state.penalty
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createOrUpdatePenalty: (penalty) => dispatch(createOrUpdatePenalty(penalty))
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddPenaltyData));