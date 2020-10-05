import React, { Component } from 'react';
// import axios from 'axios';
import {createOrUpdatePlant} from "../../../../actions"
import {connect} from 'react-redux'
import { withRouter} from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import '../../../../styles/plant/plantAddEdit.scss';
import { createOrUpdatePageGroup } from '../../../../actions/action-Settings';

class EditPageGroupdetails extends Component{
    constructor(props){
        super(props);
        this.state ={
            pageGroup : this.props.location.pageGroupData,
            pageGroupFlow : this.props.location.pageGroupData.pageGroupFlow===1?'Scroll':'Slider'
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const stateDup = this.state;

        if(event.target.name === 'pageGroupFlow'){
            stateDup[event.target.name] = event.target.value;
            if(event.target.value === 'Scroll'){
            stateDup.pageGroup.pageGroupFlow = 1;
            stateDup.pageGroup.sliderInterval = null;
            }
            else{
                stateDup.pageGroup.pageGroupFlow = 2;   
            }
        }
        else if(event.target.name === 'pageSliderTiming'){
            var sliderTiming = event.target.value;
            stateDup.pageGroup.sliderInterval = sliderTiming.substring(0,2);
        }
        else{
        stateDup.pageGroup[event.target.name] = event.target.value;
        }

        this.setState({ stateDup});
    }
    handleValueChange(event){
        let _data = this.state.pageGroup;
        _data[event.target.name] = event.target.value;
        this.setState({ pageGroup: _data});
      }
    onSubmit = (e) => {
        e.preventDefault();
        this.props.createOrUpdatePageGroup(this.state.pageGroup);
        alert('Page Group details has been updated successfully');
        this.props.history.push({pathname:'/setting/PageGroup'});
    }

    render(){
        return(
            <div>
                <Card className="add-plant-card" style={{width:"60%"}}>
                  <Card.Header as="h5">Page</Card.Header>
                  <Card.Body>
                    <Row>
                        <Col>
                            <Form.Label>Page Group Name<span className="form-required">*</span></Form.Label>
                        </Col>
                        <Col>
                            <Form.Control type="text" name="pageGroupName" value={this.state.pageGroup.pageGroupName} onChange={item => this.handleValueChange(item)}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label>Page Group Flow<span className="form-required">*</span></Form.Label>
                        </Col>
                        <Col>
                        <select className="form-control" width='300px' name="pageGroupFlow" onChange={(item) => this.handleChange(item)} value={this.state.pageGroupFlow}>
                        <option>Select Flow</option>
                        <option>Scroll</option>
                        <option>Slider</option>   
                        </select>
                        </Col>
                    </Row>
                    {this.state.pageGroupFlow==='Slider'?
                    <Row>
                        <Col>
                            <Form.Label>Page Slider Timing<span className="form-required">*</span></Form.Label>
                        </Col>
                        <Col>
                        <select className="form-control" width='300px' name="pageSliderTiming" onChange={(item) => this.handleChange(item)} value={this.state.pageGroup.sliderInterval+" Sec"}>
                        <option>Select Slider</option>
                        <option>5 Sec</option>
                        <option>10 Sec</option>  
                        <option>15 Sec</option>
                        <option>20 Sec</option>
                        <option>25 Sec</option>
                        <option>30 Sec</option>
                        <option>35 Sec</option>
                        <option>40 Sec</option>
                        <option>45 Sec</option>
                        <option>50 Sec</option>
                        <option>55 Sec</option>
                        <option>60 Sec</option> 
                        </select>
                        </Col>
                    </Row>
                    :''}
                    
                    <Row>
                        <Col>
                        </Col>
                        <Col md={2}>
                        <Button variant="primary" size="md" onClick={this.onSubmit} block>Submit</Button>
                        </Col>
                        {/* <Col md={2}>
                        <Link to="/">
                        <Button variant="primary" size="md" block>Back</Button>
                        </Link>
                        </Col> */}
                        <Col>                      
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
        )
    }
}
const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createOrUpdatePageGroup: (pageGroup) => dispatch(createOrUpdatePageGroup(pageGroup))
    }
}
export default  withRouter(connect(mapStateToProps,mapDispatchToProps)(EditPageGroupdetails)) ;