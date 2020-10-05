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

class ModuleCleaningAnalysisEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            postData: this.props.moduleCleaningAnalysis
        }
        this.hanldChange = this.handleChange.bind(this);

    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.postData !== null && this.timeValidation() === true && this.fieldValid() === false) {
            this.props.createOrUpdateExternalBudget({externalBudget:this.state.postData, type:this.props.pageName});
            this.props.history.push('/moduleCleaningAnalysis');
        }
        this.setState({ isSubmited: true });
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


    render() {
        return (
            <div>
                <div>
                    <Col>
                        <Form.Label>Cleaned Energy</Form.Label>
                    {/* </Col>
                    <Col> */}
                        <Form.Control name="cleaned_energy" type="text" onChange={(item) => this.handleChangeForDecimal(item)} value={this.state.postData && this.state.postData.cleaned_energy} pattern="^-?[0-9]\d*\.?\d*$" />
                        {this.renderErrortext("cleaned_energy", "The Cleaned Energy Field Is Required.")}
                    </Col>
                    <Col>
                        <Form.Label>UnCleaned Energy</Form.Label>
                    {/* </Col>
                    <Col> */}
                        <Form.Control name="uncleaned_energy" type="text" onChange={(item) => this.handleChangeForDecimal(item)} value={this.state.postData && this.state.postData.uncleaned_energy} pattern="^-?[0-9]\d*\.?\d*$" />
                        {this.renderErrortext("uncleaned_energy", "The UnCleaned Energy Field Is Required.")}
                    </Col>
                    <Col xs={2} style={{ maxWidth: "6%" }}>
                        <button type="button" className="btn btn-orange" style={{ width: "100%" }} onClick={() => this.getRenderWeatherStation()}>
                            Save
                        </button>
                    </Col>
                    <Col xs={2} style={{ maxWidth: "8%" }}>

                        <Route render={({ history }) => (
                            <button type="button" class="btn btn-primary" style={{ width: "100%" }} onClick={() => { history.push('/moduleCleaningAnalysis') }}>
                                Close
                        </button>)} />
                    </Col>
            </div>
            </div>

        )
    }
}


export default ModuleCleaningAnalysisEdit
