import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';

class ProcessDetailModal extends Component{
constructor(props){
    super(props);
    this.state={

    }
}
render(){
    return(
        <Modal {...this.props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        {/* <Modal.Header closeButton> */}
          <Modal.Title>Process Detail</Modal.Title>
        {/* </Modal.Header> */}
        <Modal.Body>
            <p>Are You want to process this weather daily data?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={this.props.onHide}>
            No
          </Button>
          <Button variant="primary" onClick={this.props.onDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    )
}
}
export default ProcessDetailModal;