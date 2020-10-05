import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';

class DeletePlantModal extends Component{
constructor(props){
    super(props);
    this.state={

    }
}
render(){
    return(
        <Modal {...this.props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        {/* <Modal.Header closeButton> */}
          <Modal.Title>Delete Plant</Modal.Title>
        {/* </Modal.Header> */}
        <Modal.Body>
            <p>Are You want to delete this Plant?</p>
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
export default DeletePlantModal;