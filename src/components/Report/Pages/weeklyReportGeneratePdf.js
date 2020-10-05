import React, { Component } from 'react';
import { Card, Button, Table } from 'react-bootstrap';
import PrintButton from '../../plant/PrintButton';

class WeeklyReportGeneratePdf extends Component{
    constructor(props){
        super(props);
        if(this.props.location.state.details !== undefined){
            this.state={
                ...this.props.location.state.details,
    
            }
        }
        else{
            this.state={

            }
        }
        
    }
    onGeneratePdf = (e) => {
        e.preventDefault();
            this.props.history.push('/pdfDownload');
    }
    componentDidMount(){
        console.log(this.state);
    }
    render(){
        return(
            <>
               <Card className="add-plant-card">
              <Card.Body>
              <Button variant="primary" size="md" block style={{width:"150px",float:"right"}}><PrintButton id={"WeeklyReport"} label={"Download PDF"} /></Button>
              <div id={"WeeklyReport"} style={{padding:"40px"}}>
              <div style={{width:"780px",margin:"10px 20px"}}>
                   <img src="data:image/png;base64,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" 
                      alt="Icon" width="150px" height="auto"/>
                  <h2 style={{textAlign:"center",fontFamily:"serif",fontWeight: "700",color:"rgb(62, 64, 105)"}}>Weekly Report</h2>
                  <hr style={{margin: "-5px 0px 20px",borderTop:"2px solid rgb(145, 146, 247)"}}/> 
                
                <ol style={{color:"#000",fontWeight:"600",listStyle:"none"}}>
                    <li>
                        {this.state.addParams1.length > 0 ? <>
                            <Table striped bordered>
                                <tr>
                                    <th style={{maxWidth:"25%"}}>Task</th>
                                    <th style={{maxWidth:"50%"}}>Work completed this week</th>
                                    <th style={{maxWidth:"25%"}}>Completion date</th>
                                </tr>
                                {this.state.addParams1.map((item,index)=>{
                                    return <tr>
                                        <td>{item.task1}</td>
                                        <td>{item.desc1}</td>
                                        <td>{item.completionDate1}</td>
                                    </tr>
                                })

                                }
                            </Table>
                        </>:''}
                    </li>
                    <li>
                    {this.state.addParams2.length > 0 ? <>
                        <Table striped bordered>
                            <tr>
                                <th style={{maxWidth:"25%"}}>Task</th>
                                <th style={{maxWidth:"50%"}}>Work completed this week</th>
                                <th style={{maxWidth:"25%"}}>Completion date</th>
                            </tr>
                            {this.state.addParams2.map((item,index)=>{
                                return <tr>
                                    <td>{item.task2}</td>
                                    <td>{item.desc2}</td>
                                    <td>{item.completionDate2}</td>
                                </tr>
                            })

                            }
                        </Table>
                    </>:''}
                    </li>
                    <li>
                    {this.state.addParams3.length > 0 ? <>
                        <Table striped bordered>
                            <tr>
                                <th style={{maxWidth:"25%"}}>Task</th>
                                <th style={{maxWidth:"50%"}}>Work completed this week</th>
                                <th style={{maxWidth:"25%"}}>Completion date</th>
                            </tr>
                            {this.state.addParams3.map((item,index)=>{
                                return <tr>
                                    <td>{item.task3}</td>
                                    <td>{item.desc3}</td>
                                    <td>{item.completionDate3}</td>
                                </tr>
                            })

                            }
                        </Table>
                    </>:''}
                    </li>
                    
                   
                </ol>
                </div>
                </div>
                </Card.Body>
                </Card>
            </>
        )
    }
}
export default WeeklyReportGeneratePdf;