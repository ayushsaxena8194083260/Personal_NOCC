import React, { Component } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../../styles/PreventiveMaintainance/YearlyPmCheckList.scss';
import PrintButton from './printButton';
const axios = require('axios')
const userDetails = JSON.parse(localStorage.getItem('isAuthenticated'));
class YearlyPmCheckList extends Component{
        constructor(props) {
                super(props);
                this.state = this.props.data;
                
            }
            submit = () =>{
                console.log(this.state,'sate');
                let value = this.state.userStatusDetails[0]
                 
                const data = {
                    "createdDate": value.createdDate,
                    "modifiedDate": value.modifiedDate,
                    "plantId": value.plantId,
                    "pmActivityId": value.pmActivityId,
                    "pmUserStatusId": value.pmUserStatusId,
                    "specialRemarks": value.specialRemarks,
                    "userId":value.userId,
                    "verfierName": value.userName,
                    "verifierDate": new Date(),
                    "verifierId": userDetails.userId 
                }
                axios.post('http://noccwebstaging-env.eba-sutf6wep.us-east-1.elasticbeanstalk.com/preventivemaintainance/createOrUpdatePMUserStatus', data)
                  .then(function (response) {
                    console.log(response);
                    alert("Data Verified");
                    window.location.reload();
            
                  })
            }
            render() {
                return (
                    <Card className="add-plant-card">
                    <Card.Body>
                    <Button variant="primary" size="md" block style={{width:"150px",float:"right"}}><PrintButton id={"pMLIstTable"} label={"Download PDF"} /></Button>
                    <div  id={"pMLIstTable"} style={{padding:"40px"}}>
                    <div style={{width:"780px",margin:"10px 20px"}}>
                         <img src="data:image/png;base64,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" 
                            alt="Icon" width="150px" height="auto"/>
                        <h2 style={{textAlign:"center",fontFamily:"serif",fontWeight: "700",color:"rgb(62, 64, 105)"}}>Yearly Preventive Maintenance Tasks</h2>
                        <hr style={{margin: "-5px 0px 20px",borderTop:"2px solid rgb(145, 146, 247)"}}/>
                        <form method="post" action="https://nocc.azurepower.com/preventivemaintainance/addTaskStatus" name="Save">
                        <div class="edit-form-pmtask">
                        <table id="t-list">
                        <tbody>
                        <tr><td colspan="7">
                        <input type="hidden" name="plant" value="2"/>
                        <div style={{float:'left',width:"50%"}}>
                        <b>Project Name  :  {this.state.selectedPlant}</b>
                        <br/>
                        <b>SPV Name  :   {this.state.spvName}</b>
                        <br/>
                        <b>Project Capacity  :   {this.state.projectCapacity}</b><br/>
                        <b>
                        <font color="red">Image Attached  : </font>  
                        </b><br/>
                        </div><div style={{float:'right'}}>
                        <b>Doc Number  :  O&amp;M-FR-013</b><br/>
                        <b>Rev No  :  01</b><br/><b>Rev Date  :  {this.state.date}</b><br/></div></td>
                        </tr>
                        <input type="hidden" name="pm_activity_id" value="1"/>
                        <input type="hidden" name="to_date" value={this.state.date}/>
                        <tr>
                              <th> Sl.no </th>
                              <th> Description </th>
                              <th> Status/Value </th>
                              <th> AC/DC</th>
                              <th> Permissible Limits/Desired Values </th>
                              <th> If it is ok </th>
                              <th> Remarks </th>
                        </tr>
                        
                         {this.state.taskGroup.map((taskGroupDetails,key) => (
                        <>
                        <tr>
                        <th><b>{String.fromCharCode(97 + key)}</b></th>
                        <th colspan="6">
                        <b>{taskGroupDetails.TaskGroupName}</b>
                        </th>
                        </tr>
                        {taskGroupDetails.map((taskGroupPerId,key1) => (
                        <tr>
                        <td width="3%">{taskGroupPerId.SNO}</td>
                        <td width="25%"> {taskGroupPerId.pmTaskName}</td>
                        <td width="25%"><input type={taskGroupPerId.pmStatusInputType} class="pm-task-text" name="task_status-1" value={taskGroupPerId.pm_remark_status.pmStatus}/></td>
                        <td width="5%">{taskGroupPerId.miscAcDc}</td>
                        <td width="15%">{taskGroupPerId.pmPermissibleLimits}</td>
                        <td width="8%"><input type={taskGroupPerId.pmCheckedInputType} name={'checked-'+(key+1)} value={taskGroupPerId.pm_remark_status.pmChecked} checked={taskGroupPerId.pm_remark_status.pmChecked}  td=""/></td>
                        <td><textarea rows="6" cols="6" name="remarks-1" value={taskGroupPerId.pm_remark_status.pmRemarks}></textarea></td>
                        </tr>
                        ))}
                        </>
                        ))}
                        {/* <tr><th><b>A</b></th><th colspan="6"><b>Inverter</b></th></tr>
                                        <tr>
                                <td width="3%">1</td>
                                <td width="25%"> Checking the Bolted Connections / Tightening of Terminations of Inverter </td>
                                <td width="25%"><input type="text" class="pm-task-text" name="task_status-346" value=""/></td>
                                <td width="3%"> </td>
                                <td width="15%">Torque value to be entered  </td>
                                            <td width="8%"><input type="checkbox" name="checked-346" value="YES"   td=""/>
                                            </td><td><textarea rows="6" cols="6" name="remarks-346"></textarea></td>
                        </tr> */}
                        <tr><td colspan="2"><b>Total No. of Tasks to be completed as per plan</b></td>
                        <td colspan="5"><b>{this.state.taskdetails.length}</b></td></tr>
                        <tr><td colspan="2"><b>Total No. of Tasks completed as per Actual</b></td>
                        <td colspan="5"><b>{this.state.taskdetails.completedTaskCount}</b></td></tr>
                        <tr><td colspan="2"><b> Spares Consumed( component and quantity) </b></td>
                        <td width="25%" colspan="5"><input type="text" name="task_status-21" value=""/></td>
                                    </tr>
                        <tr><td align="right" style={{verticalAlign:"middle"}} colspan="2"><b>Special Remarks</b></td>
                        <td colspan="4"><textarea rows="10" cols="10" name="special-remarks" value={this.state.userStatusDetails[0].specialRemarks}></textarea></td></tr>
                                    <tr><td colspan="7"><b>Prepared by:  <br/> <b>Name : {this.state.userStatusDetails[0].userName}</b><br/>Date:  {this.state.userStatusDetails[0].createdDate} </b><br/>
                        <img src="uploads/signature/signature.png" height="40" width="100" alt=""/><br/>
                        </td></tr>
                        <tr>
                                            
                                            <td valign="middle" colspan="6" align="center">
                                            {this.state.userStatusDetails[0].showVerified == true ?
                                                <Button style={{ margin: "10px", fontSize: "17px" }} variant="primary" size="md"  onClick={this.submit}>Verify</Button>
                                                : <div></div>}
                                            </td>
                                        </tr>
                                        <tr>
                                        {this.state.userStatusDetails[0].showVerified == true ?
                                            <td colspan="6"><b>Verified by:  <br /> <b>Name : {this.state.userStatusDetails[0].verfierName}</b><br />Date:  {this.state.userStatusDetails[0].verifierDate} </b><br />
                                            <img src="uploads/signature/signature.png" height="40" width="100" alt="" /><br />
                                        </td>
                                         : <div></div>}</tr>
                        </tbody></table>
                        </div>
                        </form>
                        
                        
                    </div>
                    </div>
                    </Card.Body>
                    </Card>
          );
    }
}
export default YearlyPmCheckList;