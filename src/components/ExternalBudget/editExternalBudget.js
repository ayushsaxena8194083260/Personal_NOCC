import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Route } from 'react-router-dom';
import { createOrUpdateExternalBudget } from '../../actions/action-ExternalBudget';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
//const previewImg = require('../../noRecordGraph.png');

class ExternalBudgetEdit extends Component {

    constructor(props) {
        super(props);

        this.state = {
            //plants: this.props.plants,
            postData: this.props.location.externalBudget,
            isSubmited: false
        }

        this.hanldChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        // document.title = 'Plant Fault Data';
        // if (this.state.postData && this.state.postData.length > 0 && this.state.postData["plantTypes"] && this.state.postData["plantTypes"] !== "SELECT PLANT TYPE") {
        //     // this.props.getPlantByType(this.state.postData["plantTypes"]);
        // }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== null) {
            //this.setState({ plants: nextProps.plants })
            this.setState({ externalBudget: nextProps.externalBudget})
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.postData !== null && this.state.postData.budgetGeneration) {
            this.props.createOrUpdateExternalBudget({externalBudget:this.state.postData, type:"External Budget Details"});
            this.props.history.push('/externalBudget');
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

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <div>
                    <Card className="add-fault-card">
                        <Card.Header as="h5">{this.props.pageName}</Card.Header>
                        <Card.Body>
                            <Row>
                                <Col></Col>
                                <Col>
                                    <Form.Label>Plant Name<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                <Form.Control name="plantName" type="text" value={this.state.postData && this.state.postData.plantName} readOnly/>
                                </Col>
                                <Col>
                                    <Form.Label>Month<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                <Form.Control name="month" type="text" value={this.state.postData && this.state.postData.month} readOnly/>
                                    </Col>
                                    <Col></Col>
                            </Row>
                            <Row>
                                <Col></Col>
                            <Col>
                                    <Form.Label>Year<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                <Form.Control name="year" type="text" value={this.state.postData && this.state.postData.year} readOnly />
                                    </Col>
                                    <Col>
                                    <Form.Label>Budget Generation<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                <Form.Control name="budgetGeneration" type="text" onChange={(item) => this.handleChangeForDecimal(item)} value={this.state.postData && this.state.postData.budgetGeneration} pattern="^-?[0-9]\d*\.?\d*$" />
                                    {this.renderErrortext("budgetGeneration", "The Budget Generation Is Required.")}
                                    </Col>
                                    <Col></Col>
                                    </Row>
                                    <Row>
                                        <Col></Col>
                                        <Col></Col>
                                        <Col></Col>
                            <Col md={2}>
                                <Button type="submit" variant="primary" size="md" block>Submit</Button>
                            </Col>
                            <Route render={({ history }) => (
                                <Col md={2}>
                                    <Button variant="primary" size="md" onClick={() => { history.push('/externalBudget') }} block>Back</Button>
                                </Col>
                            )} />
                            <Col>
                            </Col>
                            <Col></Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </div>
            </form >
        )
    }
}

const mapStateToProps = state => {
    return {
        externalBudget: state.ExternalBudgetReducer.externalBudget,
        displayMessage: state.ExternalBudgetReducer.displayMessage,
        //pageName: this.state.postData.plant_id ? "External Budget Details" : "",
        //externalBudget: state.ExternalBudgetReducer.externalBudget,
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        createOrUpdateExternalBudget: (externalBudget) => dispatch(createOrUpdateExternalBudget(externalBudget)),
    }
  }

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ExternalBudgetEdit));