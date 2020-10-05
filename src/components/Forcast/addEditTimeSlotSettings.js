import React, { Component } from "react";
import { Card, Col, Row, Form, Button } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createOrUpdateTimeSlotSetting } from "../../actions/action-Forecasting";

class AddEditTimeSlotSettings extends Component{
    constructor(props){
        super(props);
        if(this.props.location.input!== undefined){
            this.state={
                data:this.props.location.input,
                displayName:'Edit Time Slot Settings'
            }
        }
        else{
            this.state={
                data:{

                },
                displayName:'Add Time Slot Settings'
            }
        }
    }

    handleChange(event){
        let _data = this.state.data;
        _data[event.target.name] = event.target.value;
        this.setState({ data: _data});
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.createOrUpdateTimeSlotSetting({input:this.state.data,type:this.state.displayName});
        // alert('Tilt Schedule has been created/updated');
        this.props.history.push('timeSlotSettings');
    }
    render(){
        return(
            <>
            {console.log(this.state.data)}
            <section class="top-filter">
            <div id="filter-table">
            </div>
        </section>
                <Card className="add-plant-card" style={{width:"60%"}}>
                    <Card.Header as="h5">{this.state.displayName}</Card.Header>
                    <Card.Body style={{padding:0}}>
                      <Row style={{marginBottom:"20px"}}>
                          <Col style={{maxWidth:"30%"}}>
                              <Form.Label>Time Slot Name<span className="form-required">*</span></Form.Label>
                          </Col>
                          <Col>
                              <Form.Control type="text" name="timeSlotName" value={this.state.data.timeSlotName} onChange={item => this.handleChange(item)}/>
                          </Col>
                      </Row>
                      <Row style={{marginBottom:"20px"}}>
                          <Col style={{maxWidth:"30%"}}>
                              <Form.Label>Slot Start Time<span className="form-required">*</span></Form.Label>
                          </Col>
                          <Col>
                              <Form.Control type='text' name="slotStartTime" value={this.state.data.slotStartTime} onChange={item => this.handleChange(item)} />
                          </Col>
                      </Row>
                      <Row style={{marginBottom:"20px"}}>
                          <Col style={{maxWidth:"30%"}}>
                              <Form.Label>Slot End Time<span className="form-required">*</span></Form.Label>
                          </Col>
                          <Col>
                              <Form.Control type='text' name="slotEndTime" value={this.state.data.slotEndTime} onChange={item => this.handleChange(item)}  />
                          </Col>
                      </Row>

                      <Row  style={{margin:0,padding:"10px 0",background:"rgb(247, 247, 247)"}}>
                          <Col>
                          </Col>
                          <Col md={2}>
                          <Button variant="primary" size="md" block onClick={this.onSubmit}>Submit</Button>
                          </Col>
                          <Col md={2}>
                          <Link to="timeSlotSettings">
                            <Button variant="primary" size="md" block>Back</Button>
                          </Link>
                          </Col>
                          <Col>                      
                          </Col>
                      </Row>

                    </Card.Body>
                </Card>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createOrUpdateTimeSlotSetting: (data) => dispatch(createOrUpdateTimeSlotSetting(data))
    }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(AddEditTimeSlotSettings));