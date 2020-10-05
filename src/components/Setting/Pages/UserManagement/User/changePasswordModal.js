import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
class ChangePasswordModal extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   postData:{
    //     currentPassword:'',
    //     newPassword:'',
    //     confirmPassword:'',
    //   }
    // }
  }

  // handleChanges(event){
  //   let _data = this.state.postData;
  //       _data[event.target.name] = event.target.value;
  //       this.setState({ postData: _data });
  //       console.log(_data)
  // }

  render() {
    {console.log(this.props)}
    return (
      <Card className="changes-psw-card">
        <Card.Body>
          <Row style={{marginBottom:"25px"}}>
            <Col className="fieldset">
              <Form.Label className="legend">Current Password</Form.Label>
            
              <Form.Control type="password" name="currentPassword" className={this.props.messageErrors.passwordWrongMessage !== ''? "error-form":''} value={this.props.postData.currentPassword} onChange={(item)=>this.props.handleChanges(item)}/>

              <Form.Text className="text-muted" >
                <p style={{color:"rgb(255, 89, 104)"}}>{this.props.messageErrors.passwordWrongMessage}</p>
              </Form.Text>
              
            </Col>

          </Row>
          <Row style={{marginBottom:"25px"}}>
            <Col className="fieldset">
              <Form.Label className="legend">New Password</Form.Label>
            
              <Form.Control type="password" name="newPassword"  value={this.props.postData.newPassword} onChange={(item)=>this.props.handleChanges(item)} />
            </Col>

          </Row>
          <Row style={{marginBottom:"25px"}}>
            <Col className="fieldset">
              <Form.Label className="legend">Confirm Password</Form.Label>
            
              <Form.Control type="password" className={this.props.messageErrors.passwordMismatchMessage !== ''? "error-form":''} name="confirmPassword"  value={this.props.postData.confirmPassword} onChange={(item)=>this.props.handleChanges(item)} />

              <Form.Text className="text-muted">
              <p style={{color:"rgb(255, 89, 104)"}}>{this.props.messageErrors.passwordMismatchMessage}</p>
              </Form.Text>
              
            </Col>
          </Row>
        </Card.Body>
      </Card>
    )
  }
}




export default ChangePasswordModal;