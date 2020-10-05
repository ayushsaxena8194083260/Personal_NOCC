import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form, } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createUpdateGraphGroup, renderGraphGroupDetails } from '../../../../actions/action-Settings';

class GraphGroupComponentAddEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
        graphGroups: this.props.graphGroups,
        postData: {
            graphGroupId:this.props.data.graphGroupId,
            graphGroupName:this.props.data.graphGroupName,
            sequence:this.props.data.sequence,
            isPublished:1
        }
    }
    this.grapGroupsAddEdit = this.grapGroupsAddEdit.bind(this);
  }

  componentDidMount() {
    // document.title = 'Plant Fault Data';
  }

  grapGroupsAddEdit() {
    this.onSubmit();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== null) {
      this.setState({
        graphGroups: nextProps.graphGroups,
      })
    }
  }


  onSubmit = () => {
    this.props.createUpdateGraphGroup({ graphGroups: this.state.postData , type: this.props.pageName });
    this.props.onHide();
  }

//   handleChange(event) {
//     let _data = this.state.postData;
//     _data[event.target.name] = event.target.value;
//     this.setState({ postData: _data });
//   }

  handleChange(event){
    let _data = this.state.postData;
    _data[event.target.name] = event.target.value;
    this.setState({ postData: _data});
  }

  render() {
    return (
      <div className="modal-main">
        <Modal {...this.props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
          <Modal.Title>{this.props.pageName}</Modal.Title>
          <Modal.Body>
            <Row>
            <Col>
                <Form.Label>Group Name:<span className="form-required">*</span></Form.Label>
                <Form.Control name="graphGroupName" type="text" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.graphGroupName} />
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={this.props.onHide}>
              Close
          </Button>
            <Button variant="primary" onClick={this.grapGroupsAddEdit}>
              Save Changes
          </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state,props) => {
    return {
        pageName: props.data ? props.data.graphGroupId ? "Edit Graph Group" : "Add Graph Group" : null,
        graphGroups: state.SettingsReducer.graphGroup,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        renderGraphGroupDetails: () => dispatch(renderGraphGroupDetails()),
        // clearSettingPlantMapping: () => dispatch(clearSettingPlantMapping()),
        createUpdateGraphGroup: (graphGroups) => dispatch(createUpdateGraphGroup(graphGroups))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GraphGroupComponentAddEdit));