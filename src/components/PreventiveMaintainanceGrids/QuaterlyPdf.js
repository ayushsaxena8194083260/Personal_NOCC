import React, { Component } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../../styles/PreventiveMaintainance/YearlyPmCheckList.scss';

class QuarterlyPmCheckList extends Component{

  constructor(props) {
    super(props);
    this.state = this.props.data;
    
}

    render(){
        return(
            <div>
                <Card className="add-plant-card" style={{width:"100%"}}>
                    <Card.Header as="h5">Quarterly Preventive Maintenance Tasks</Card.Header>
                </Card>
                <div id="pMLIstTable" class="pMLIstTable">
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
                        <td valign="middle" colspan="7" align="center">
                            <Button style={{margin:"10px",fontSize:"17px"}} variant="primary" size="md">Save</Button>
                            <Button style={{margin:"10px",fontSize:"17px"}} variant="primary" size="md">PDF</Button>
                        </td>
                        </tr>
                        </tbody></table>
                        </div>
                        </form>
                       
                        </div>
                </div>
        );
    }
}
export default QuarterlyPmCheckList;
