import React, { Component } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../../styles/PreventiveMaintainance/YearlyPmCheckList.scss';
import PrintButton from './printButton';
import Form from 'react-bootstrap/Form';

class DailyPdfDownload extends Component {

    constructor(props) {
        super(props);
        this.state = this.props.data;
        console.log(this.state,'state')

    }
    onGeneratePdf = (e) => {
        e.preventDefault();
        this.props.history.push('/pdfDownload');
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
                <h2 style={{textAlign:"center",fontFamily:"serif",fontWeight: "700",color:"rgb(62, 64, 105)"}}>Daily Preventive Maintenance Tasks</h2>
                <hr style={{margin: "-5px 0px 20px",borderTop:"2px solid rgb(145, 146, 247)"}}/>
                        <form method="post" action="https://nocc.azurepower.com/preventivemaintainance/addTaskStatus" name="Save">
                            <div class="edit-form-pmtask">
                                <table className="table">
                                 
                                    <tr>
                                        <td colspan="3">Project Name : Punjab 1 <br /> SPV Name : Azure Power Punjab Private Limited <br /> 
                                        Project Capacity : 2318.6</td>



                                        <td colspan="3">Doc Number : O&M-FR-012 <br />
                                        Rev No : 01 <br />
                                        Rev Date : 2020-06-01</td>

                                    </tr>
                                    <tr>
                                        <th>S.No</th>
                                        <th>Description</th>
                                        <th>Status/value</th>
                                        <th>Permissible Limits	  <br></br>/Desired <br></br>Values</th>
                                        <th>If it is ok</th>
                                        <th>Remarks</th>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>Daily Generation entry in NOCC system</td>
                                        <td><input type="text" /></td>
                                        <td></td>
                                        <td>                                            <Form.Check style={{ display: "inline-block", paddingRight: "10px", fontSize: "16px", fontWeight: "700" }} onClick={this.handleAllGroundMountChecked}  />
</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Review prior days production logs and estimated versues actual production on NOCC </td>
                                        <td><input type="text" /></td>
                                        <td>Unforsen Loss </td>
                                        <td>                                            <Form.Check style={{ display: "inline-block", paddingRight: "10px", fontSize: "16px", fontWeight: "700" }} onClick={this.handleAllGroundMountChecked}  />
</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>Cleaning of Pyranometer </td>
                                        <td><input type="text" /></td>
                                        <td>Glass should be crystal clear </td>
                                        <td>                                            <Form.Check style={{ display: "inline-block", paddingRight: "10px", fontSize: "16px", fontWeight: "700" }} onClick={this.handleAllGroundMountChecked}  />
</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>4</td>
                                        <td>Status of LED for Communication Devices (Green or Red) </td>
                                        <td><input type="text" /></td>
                                        <td>Green </td>
                                        <td>                                            <Form.Check style={{ display: "inline-block", paddingRight: "10px", fontSize: "16px", fontWeight: "700" }} onClick={this.handleAllGroundMountChecked}  />
</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>5</td>
                                        <td>Ensure proper cleaning of Modules as per the schedule </td>
                                        <td><input type="text" /></td>
                                        <td>Minimum 90% of offered Quantity</td>
                                        <td>                                            <Form.Check style={{ display: "inline-block", paddingRight: "10px", fontSize: "16px", fontWeight: "700" }} onClick={this.handleAllGroundMountChecked}  />
</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>6</td>
                                        <td>Update grid outage and fault data base in NOCC</td>
                                        <td><input type="text" /></td>
                                        <td>RCA report to be attached </td>
                                        <td>                                            <Form.Check style={{ display: "inline-block", paddingRight: "10px", fontSize: "16px", fontWeight: "700" }} onClick={this.handleAllGroundMountChecked}  />
</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>7</td>
                                        <td>Monitor the performance of individual inverters in NOCC </td>
                                        <td><input type="text" /></td>
                                        <td>Deviatio less than 3% </td>
                                        <td>                                            <Form.Check style={{ display: "inline-block", paddingRight: "10px", fontSize: "16px", fontWeight: "700" }} onClick={this.handleAllGroundMountChecked}  />
</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>8</td>
                                        <td>Visual Inspection of DC field ( Any visible Defects, Vegetation, Loose Connection, Sparking and abnormalities etc ) </td>
                                        <td><input type="text" /></td>
                                        <td>Particular DC field surveyed / visited should be mentioned</td>
                                        <td>                                            <Form.Check style={{ display: "inline-block", paddingRight: "10px", fontSize: "16px", fontWeight: "700" }} onClick={this.handleAllGroundMountChecked}  />
</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>9</td>
                                        <td>Inspect the AC Field ( Any visible Defects, Vegetation, Loose Connection , Sparking, Oil Leakage, SF6 Gas Pressure and abnormalities etc )</td>
                                        <td><input type="text" /></td>
                                        <td>Particular AC field surveyed / visited should be mentioned</td>
                                        <td>                                            <Form.Check style={{ display: "inline-block", paddingRight: "10px", fontSize: "16px", fontWeight: "700" }} onClick={this.handleAllGroundMountChecked}  />
</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>10</td>
                                        <td>Check the oil level in the Inverter transformer</td>
                                        <td><input type="text" /></td>
                                        <td>Between 1/2 to 3/4 </td>
                                        <td>                                            <Form.Check style={{ display: "inline-block", paddingRight: "10px", fontSize: "16px", fontWeight: "700" }} onClick={this.handleAllGroundMountChecked}  />
</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>11</td>
                                        <td>Check the oil level in the Power transformer</td>
                                        <td><input type="text" /></td>
                                        <td>Between 1/2 to 3/4 </td>
                                        <td>                                            <Form.Check style={{ display: "inline-block", paddingRight: "10px", fontSize: "16px", fontWeight: "700" }} onClick={this.handleAllGroundMountChecked}  />
</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>12</td>
                                        <td>Check the OTI and WTI Temperatures of the Power transformers and record in logbook. (Both Alarm and Trip) </td>
                                        <td><input type="text" /></td>
                                        <td>OTI less than 70 Deg WTI less than90 deg </td>
                                        <td>                                            <Form.Check style={{ display: "inline-block", paddingRight: "10px", fontSize: "16px", fontWeight: "700" }} onClick={this.handleAllGroundMountChecked}  />
</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>13</td>
                                        <td>Check the OTI and WTI Temperatures of the Inverter transformers and record in logbook. (Both Alarm and Trip) </td>
                                        <td><input type="text" /></td>
                                        <td>OTI less than 70 Deg WTI less than 90 deg	</td>
                                        <td> 
                                            <Form.Check style={{ display: "inline-block", paddingRight: "10px", fontSize: "16px", fontWeight: "700" }} onClick={this.handleAllGroundMountChecked}  />
</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>14</td>
                                        <td>	Visual inspection of PV Modules </td>
                                        <td><input type="text" /></td>
                                        <td>0 Broken Modules </td>
                                        <td>                                            <Form.Check style={{ display: "inline-block", paddingRight: "10px", fontSize: "16px", fontWeight: "700" }} onClick={this.handleAllGroundMountChecked}  />
</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>15</td>
                                        <td>Visual inspection of Mounting Structures</td>
                                        <td><input type="text" /></td>
                                        <td>All Component installed , Rust Free and Properly Tightened </td>
                                        <td>                                            <Form.Check style={{ display: "inline-block", paddingRight: "10px", fontSize: "16px", fontWeight: "700" }} onClick={this.handleAllGroundMountChecked}  />
</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>16</td>
                                        <td>Inspection of Perimeter Fencing </td>
                                        <td><input type="text" /></td>
                                        <td>All Component installed , Rust Free and Properly Tightened </td>
                                        <td>                                            <Form.Check style={{ display: "inline-block", paddingRight: "10px", fontSize: "16px", fontWeight: "700" }} onClick={this.handleAllGroundMountChecked}  />
</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>17</td>
                                        <td>Inspection of Civil Structures and trenches </td>
                                        <td><input type="text" /></td>
                                        <td>	No Visible Cracks or Breakage </td>
                                        <td>                                            <Form.Check style={{ display: "inline-block", paddingRight: "10px", fontSize: "16px", fontWeight: "700" }} onClick={this.handleAllGroundMountChecked}  />
</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>18</td>
                                        <td>	Visual inspection of Switchyard for any abnormality </td>
                                        <td><input type="text" /></td>
                                        <td>All Healthy </td>
                                        <td>                                            <Form.Check style={{ display: "inline-block", paddingRight: "10px", fontSize: "16px", fontWeight: "700" }} onClick={this.handleAllGroundMountChecked}  />
</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>19</td>
                                        <td>Visual Inspection of switchgears, Trip Circuit in C & R Panel, Relay Flag/Indication in Relay and Panels</td>
                                        <td><input type="text" /></td>
                                        <td>Healthy Relay Status </td>
                                        <td>                                            <Form.Check style={{ display: "inline-block", paddingRight: "10px", fontSize: "16px", fontWeight: "700" }} onClick={this.handleAllGroundMountChecked}  />
</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td colspan="2"> Total No. of Tasks to be completed as per plan</td>
                                        <td colspan="4"> 19</td>
                                    </tr>
                                    <tr>
                                        <td colspan="2"> Total No. of Tasks completed as per Actual </td>
                                        <td colspan="4"> 19</td>
                                    </tr>
                                    <tr>
                                        <td colspan="2"> Spares Consumed( component
                                        and quantity) </td>
                                        <td colspan="4"> </td>
                                    </tr>
                                    <tr>
                                        <td colspan="2"> Special Remarks </td>
                                        <td colspan="4"> All above point visually check</td>
                                    </tr>
                                    <tr>
                                        <td colspan="6">Prepared by: Rajvinder Singh <br /> Date: 2020-06-01 </td>
                                    </tr>
                                    <tr>
                                        <td colspan="6">Verified by: Surjit Singh <br /> Date: 2020-06-01 </td>
                                    </tr>
                                </table>
                            
                            </div>
                        </form>
                   
            </div>
            </div>
            </Card.Body>
            </Card>
            );
       
    }
}
export default DailyPdfDownload;