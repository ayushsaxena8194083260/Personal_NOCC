import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { getMakeGraphGauge } from '../../actions/action-ModelPopUpGraph';
import { BrowserRouter, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import LineBasicChart from '../Charts/lineBasic';
import Loader from 'react-loader-spinner';

class ModelPopUpUserManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModelGraph: false
        }
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
        
    }

    render() {
        return (
            <Modal id={this.props.id} show={this.props.showPopUp} onHide={() => this.props.onSecondaryAction()} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                {this.props.title && <Modal.Title>{this.props.title}</Modal.Title>}
                <Modal.Body>
                    <p>
                        {this.props.bodyContent}
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    {this.props.secondaryBtnName && <Button variant="danger" onClick={() => this.props.onSecondaryAction()}>
                        {this.props.secondaryBtnName}
                    </Button>}
                    {this.props.primaryBtnName && <Button variant="primary" onClick={() => this.props.onPrimaryAction()}>
                        {this.props.primaryBtnName}
                    </Button>}
                </Modal.Footer>
            </Modal>
        )
    }
}

const mapStateToProps = state => {
    return {
        
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(ModelPopUpUserManagement));

