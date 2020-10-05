import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, withRouter } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Picky from 'react-picky';
import 'react-picky/dist/picky.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import '../../../styles/plant/plantFaultData.scss';
import DropDown from "../../Common/DropDown";

class WeeklyReport extends Component{
    constructor(props){
        super(props);
        this.state={
            addParams1:[],
            addParams2:[],
            addParams3:[],
            showParams1:false,
            showParams2:false,
            showParams3:false,
            params1:{
                s_no:'',
                task1:'',
                desc1:'',
                completionDate1:this.getCurrentDate()
            },
            params2:{
                s_no:'',
                task2:'',
                desc2:'',
                completionDate2:this.getCurrentDate()
            },
            params3:{
                s_no:'',
                task3:'',
                desc3:'',
                completionDate3:this.getCurrentDate()
            }
            
        }
    }
    
    handleChange(event){
        let _data = this.state.params1;
        _data[event.target.name] = event.target.value;
        this.setState({ params1: _data });
        console.log(this.state.params1)
    }
    handleChange2(event){
        let _data = this.state.params2;
        _data[event.target.name] = event.target.value;
        this.setState({ params2: _data });
        console.log(this.state.params2)
    }
    handleChange3(event){
        let _data = this.state.params3;
        _data[event.target.name] = event.target.value;
        this.setState({ params3: _data });
        console.log(this.state.params3)
    }
    handleParams1=(e)=>{
        e.preventDefault();
        var _data=this.state.params1;
        let addParams=this.state.addParams1;
        addParams.push(_data);
        this.setState({showParams1:true,addParams1:addParams});
        // console.log(this.state.addParams1)
        this.setState({params1:{
            s_no:'',
            task1:'',
            desc1:'',
            completionDate1:this.getCurrentDate()
        }})
    }
    handleParams2=(e)=>{
        e.preventDefault();
        var _data=this.state.params2;
        let addParams=this.state.addParams2;
        addParams.push(_data);
        this.setState({addParams2:addParams});
        // console.log(this.state.addParams1)
        this.setState({params2:{
            s_no:'',
            task2:'',
            desc2:'',
            completionDate2:this.getCurrentDate()
        }})
    }
    handleParams3=(e)=>{
        e.preventDefault();
        var _data=this.state.params3;
        let addParams=this.state.addParams3;
        addParams.push(_data);
        this.setState({addParams3:addParams});
        // console.log(this.state.addParams1)
        this.setState({params3:{
            s_no:'',
            task3:'',
            desc3:'',
            completionDate3:this.getCurrentDate()
        }})
    }
    handleDeleteParams1(i){
        let _data=this.state.addParams1;
        _data.splice(i,1);
        console.log(i)
        this.setState({addParams1:_data});

    }
    handleDeleteParams2(i){
        let _data=this.state.addParams2;
        _data.splice(i,1);
        console.log(i)
        this.setState({addParams2:_data});

    }
    handleDeleteParams3(i){
        let _data=this.state.addParams3;
        _data.splice(i,1);
        console.log(i)
        this.setState({addParams3:_data});

    }
    getCurrentDate(){
        var today= new Date();
        var d = today.getDate();
        var m = today.getMonth()+1;
        var y = today.getFullYear();
        var data;

        if(d < 10){
            d = "0"+d;
        };
        if(m < 10){
            m = "0"+m;
        };

        data = y+"-"+m+"-"+d;
        return data;
    }
    generateGraph = () => {
        
    }
render(){
    
    return(
    <>
        <div id="completed">
                <div class="subHead">
                    <h5 style={{ fontSize: "16px" }}>
                        Section 1: Work completed this week
                    </h5>
                </div>
                <div className="top-filters-lender">
                    <div className="row" style={{ alignItems: "center", margin: "0" }} >
                    <Col lg={4} md={4} sm={6} className="x-large_percent_width">
                    <Form.Label>Task:</Form.Label>
                    <Form.Control as="textarea" name="task1" rows="1" onChange={(item) => this.handleChange(item)} value={this.state.params1.task1}/>

                            </Col>
                            <Col lg={4} md={4} sm={6} className="x-large_percent_width">
                    <Form.Label>Description:</Form.Label>
                    <Form.Control as="textarea" rows="1" name="desc1" onChange={(item) => this.handleChange(item)} value={this.state.params1.desc1}/>                           

                            </Col>
                            <Col lg={4} md={4} sm={6} className="x-large_percent_width">
                    <Form.Label>Completion Date:</Form.Label>
                    <Form.Control type="date" style={{height:"48px"}} onChange={(item) => this.handleChange(item)}  name="completionDate1" value={this.state.params1.completionDate1}/>

                            </Col>
                            <Col lg={5} md={5} ></Col>
                            <Col  lg={2} md={2} sm={6} style={{marginTop:"12px"}} className="x=small_percent_width">
                      
                      <Button className="btn btn-orange view_button" variant="primary" size="md" block  onClick={this.handleParams1}>
                                    <img src="/images/icons/fugue/plus-circle.png" alt="add plant" title="Add Plant Fault" style={{ float: "left", marginRight: "3" }}/>
                                    Add
                        </Button>
                        </Col>
                    </div>
                </div>
                {this.state.addParams1.map((item,index)=>{
            return <span key={item.task1} id="rand_1_0">
                    <ul className="editGraphTable-detail" style={{margin:0,border:0,borderTop:'1px dotted #999999',overflow: "hidden"}}>
                    <li style={{width:"5%"}}>
                    <input type="hidden" name="section" value={index + 1}/>{index + 1}
                    </li>
                    <li style={{width:"25%"}}>
                    <input type="hidden" name="task1" value={item.task1}/>{item.task1}
                    </li>
                    <li style={{width:"45%"}}>
                    <input type="hidden" name="desc1" value={item.desc1}/>{item.desc1}
                    </li>
                    <li style={{width:"19%"}}>
                    <input type="hidden" name="completionDate1" value={item.completionDate1}/>{item.completionDate1}
                    </li>
                    <li style={{width:"2%",cursor:"pointer"}} onClick={()=>this.handleDeleteParams1(index)}>
                        <img alt="" src="/images/icons/fugue/cross-circle.png"/>
                    </li>
                   </ul>
                </span>
        })}
                
        </div>
        <div id="planned">
                <div class="subHead">
                    <h5 style={{ fontSize: "16px" }}>
                        Section 2: Work planned for next week
                    </h5>
                </div>
                <div className="top-filters-lender">
                    <div className="row" style={{ alignItems: "center", margin: "0" }} >
                    <Col lg={4} md={4} sm={6} className="x-large_percent_width">
                    <Form.Label>Task:</Form.Label>
                    <Form.Control as="textarea" name="task2" rows="1" onChange={(item) => this.handleChange2(item)} value={this.state.params2.task2}/>

                            </Col>
                            <Col lg={4} md={4} sm={6} className="x-large_percent_width">
                    <Form.Label>Description:</Form.Label>
                    <Form.Control as="textarea" rows="1" name="desc2" onChange={(item) => this.handleChange2(item)} value={this.state.params2.desc2}/>                           

                            </Col>
                            <Col lg={4} md={4} sm={6} className="x-large_percent_width">
                    <Form.Label>Completion Date:</Form.Label>
                    <Form.Control type="date" style={{height:"48px"}} onChange={(item) => this.handleChange2(item)}  name="completionDate1" value={this.state.params2.completionDate2}/>

                            </Col>
                     
                     
                            <Col lg={5} md={5} ></Col>
                            <Col  lg={2} md={2} sm={6} style={{marginTop:"12px"}} className="x=small_percent_width">
                      
                      <Button className="btn btn-orange view_button" variant="primary" size="md" block  onClick={this.handleParams2}>
                                    <img src="/images/icons/fugue/plus-circle.png" alt="add plant" title="Add Plant Fault" style={{ float: "left", marginRight: "3" }}/>
                                    Add
                        </Button>
                        </Col>
                    </div>
                </div>
                {this.state.addParams2.map((item,index)=>{
                    let i=index;
            return <span key={item.task2} id="rand_1_0">
                    <ul className="editGraphTable-detail" style={{margin:0,border:0,borderTop:'1px dotted #999999',overflow: "hidden"}}>
                    <li style={{width:"5%"}}>
                    <input type="hidden" name="section" value={i + 1}/>{i + 1}
                    </li>
                    <li style={{width:"25%"}}>
                    <input type="hidden" name="task2" value={item.task2}/>{item.task2}
                    </li>
                    <li style={{width:"45%"}}>
                    <input type="hidden" name="desc2" value={item.desc2}/>{item.desc2}
                    </li>
                    <li style={{width:"19%"}}>
                    <input type="hidden" name="completionDate2" value={item.completionDate2}/>{item.completionDate2}
                    </li>
                    <li style={{width:"2%",cursor:"pointer"}} onClick={()=>this.handleDeleteParams2(index)}>
                        <img alt="" src="/images/icons/fugue/cross-circle.png"/>
                    </li>
                   </ul>
                </span>
        })}
        </div>
        <div id="critical">
                <div class="subHead">
                    <h5 style={{ fontSize: "16px" }}>
                        Section 3: Critical Items for Manager's notice
                    </h5>
                </div>
                <div className="top-filters-lender">
                    <div className="row" style={{ alignItems: "center", margin: "0" }} >
                    <Col lg={4} md={4} sm={6} className="x-large_percent_width">
                    <Form.Label>Task:</Form.Label>
                    <Form.Control as="textarea" name="task3" rows="1" onChange={(item) => this.handleChange3(item)} value={this.state.params3.task3}/>

                            </Col>
                            <Col lg={4} md={4} sm={6} className="x-large_percent_width">
                    <Form.Label>Description:</Form.Label>
                    <Form.Control type="date" style={{height:"48px"}} onChange={(item) => this.handleChange3(item)}  name="completionDate3" value={this.state.params3.completionDate3}/>

                            </Col>
                            <Col lg={4} md={4} sm={6} className="x-large_percent_width">
                    <Form.Label>Completion Date:</Form.Label>
                    <Form.Control as="textarea" rows="1" name="desc3" onChange={(item) => this.handleChange3(item)} value={this.state.params3.desc3}/>                           

                            </Col>
                     <Col lg={5} md={5} ></Col>
                            <Col  lg={2} md={2} sm={6} style={{marginTop:"12px"}} className="x=small_percent_width">
                      
                        <Button className="btn btn-orange view_button" variant="primary" size="md" block  onClick={this.handleParams3}>
                                    <img src="/images/icons/fugue/plus-circle.png" alt="add plant" title="Add Plant Fault" style={{ float: "left", marginRight: "3" }}/>
                                    Add
                        </Button>
                        </Col>
                    </div>
                </div>
                {this.state.addParams3.map((item,index)=>{
            return <span key={item.task3} id="rand_1_0">
                    <ul className="editGraphTable-detail" style={{margin:0,border:0,borderTop:'1px dotted #999999',overflow: "hidden"}}>
                    <li style={{width:"5%"}}>
                    <input type="hidden" name="section" value={index + 1}/>{index + 1}
                    </li>
                    <li style={{width:"25%"}}>
                    <input type="hidden" name="task3" value={item.task3}/>{item.task3}
                    </li>
                    <li style={{width:"45%"}}>
                    <input type="hidden" name="desc3" value={item.desc3}/>{item.desc3}
                    </li>
                    <li style={{width:"19%"}}>
                    <input type="hidden" name="completionDate3" value={item.completionDate3}/>{item.completionDate3}
                    </li>
                    <li style={{width:"2%",cursor:"pointer"}} onClick={()=>this.handleDeleteParams3(index)}>
                        <img alt="" src="/images/icons/fugue/cross-circle.png"/>
                    </li>
                   </ul>
                </span>
        })}
        </div>
        <Row style={{margin:"0"}}>
                <Col></Col>
                
                            <Col  lg={2} md={2} sm={6} style={{marginTop:"12px"}} className="x=small_percent_width" onClick={this.generateGraph}>
                    <Route render={({ history }) => (
                                <button type="button" className="btn btn-primary view_button" style={{ width: "100%" }} onClick={() => { history.push('weeklyReportGeneratePdf', {details:this.state}) }}>
                                    <img src="/images/icons/fugue/plus-circle.png" alt="add plant" title="Add Plant Fault" style={{ float: "left", marginRight: "3" }} />
                                    Generate PDF
                        </button>)} />
                    </Col>
                <Col></Col>
        </Row>
    </>
    );
}
}
export default WeeklyReport;