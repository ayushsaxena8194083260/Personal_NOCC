import React, { Component } from 'react';
// import axios from 'axios';
// import {createOrUpdatePlant} from "../../actions"
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import '../../styles/plant/plantAddEdit.scss';
import { Route } from 'react-router-dom';
import { getInverterByPlantId} from "../../actions/InverterDailyActions";
import {getPlantByType} from "../../actions/PlantActions";
import {  createOrUpdateSmu } from "../../actions/action-smu";
// import {AgGridReact} from "ag-grid-react";
import { createOrUpdateString, deleteString } from "../../actions/action-strings";
const rowIndex = (params) => params.node.rowIndex + 1;

class ActionCellRenderer extends React.Component {
    constructor(props) {
        super(props);
        this.invokeDelete = this.invokeDelete.bind(this);
    }

    invokeDelete() {
        this.props.context.componentParent.onDelete(this.props.node.data._id);
    }

    render() {
        return (<div className="products-actions">
            <Link className="products-actions-link"
                to={{
                    pathname: "/addEditSMUComponent",
                    smuData: this.props.data
                }}>
                <img src="/images/editIcon.png" alt="Edit" />
            </Link>
            {/* <Link className="products-actions-link"
                to={{
                    pathname: "/plantFaultIncident",
                    plantFault: this.props.data
                }}>
                <img src="/images/icons/fugue/plus-circle.png" alt="Add Incident" />
            </Link> */}
            <Link to="#" onClick={this.invokeDelete} title="Delete" >
                <img src="/images/cross-circle.png" alt="Delete" />
            </Link>
        </div>);
    }
}

class AddEditSMUComponent extends Component{

    constructor(props) {
        super(props);
        if(props.location.smuData !== undefined){
            this.state ={
                pageName: 'Edit SMU',
                plant_types:["GROUNDMOUNT", "ROOFTOP"],
                inverterName: props.location.smuData.inverter_name,
                stringListNew : this.props.allStringsBySMUId,
                submitedFields: ["smuName", "smuNumber", "inverterId", "date", "time", "wetCleaningString", "dryCleaningString", "uncleanedString"],
                //strings: props.location.smuData.string.contains("|")?props.location.smuData.string.split("|"):props.location.smuData.string,
                //stringId: props.location.smuData.stringId.contains("|")?props.location.smuData.stringId.split("|"):props.location.smuData.stringId,
                isSubmited: false,
                plant_type: props.location.smuData.plant_type,
                plantName : props.location.smuData.plant_name,
                smuDetails : props.location.smuData,
                smu_serial_number:'',
                showSMUValue: true,
                stringName:'',
                smuId: props.location.smuData.smuId,
                enableStringText : false,
                enablenewStringText : false,
                selectedStringText :null
            };
        }
        else{
        this.state ={
            pageName: 'Add SMU',
            plant_types:["GROUNDMOUNT", "ROOFTOP"],
            plantName: 'Select Plant Name',
            plant_type : 'Select Type',
            inverterName: 'Select Inverter',
            plantId : '',
            isSubmited: false,
            submitedFields: ["smuName", "smuNumber", "inverterId", "date", "time", "wetCleaningString", "dryCleaningString", "uncleanedString"],
            smu_serial_number:'',
            showSMUValue: false,
            smuDetails : {
           
            smuName:'',
            smuNumber:'',
            inverterId:'',
            date:'',
            time:'',
            wetCleaningString:'',
            dryCleaningString:'',
            uncleanedString:''
            }
        };
    }

        this.handleChange = this.handleChange.bind(this);
        this.handleChangePlant = this.handleChangePlant.bind(this);
        this.handleStringUpdate = this.handleStringUpdate.bind(this);
        this.updateStringName = this.updateStringName.bind(this);
        this.handleStringDelete = this.handleStringDelete.bind(this);
        // this.addComponentAffected = this.addComponentsAffected.bind(this);
        // this.removeComponentsAffected = this.removeComponentsAffected.bind(this);
        // this.handleOnChangeforComponentsAffected = this.handleOnChangeforComponentsAffected.bind(this);
    }

    addComponentAffected(){
        //<Form.Control name="component_affected" type="text" />
    }
    componentDidMount() {
       // document.title = 'Plant Fault Data';
    }

    fieldValid() {
        let inValid = false;

        this.state.submitedFields.map((item) => {
            if (!this.state.smuDetails[item]) {
                inValid = true;
            }
        })
        return inValid;
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.smuDetails !== null &&  this.fieldValid() === false) {
            this.props.createOrUpdateSmu(this.state.smuDetails);
            alert('SMU has been created successfully');
            this.props.history.push('/stringMonitoring');
        }

        this.setState({ isSubmited: true });
    }


    handleChange(event) {
        let _data = this.state;
        if(event.target.name === "smuNumber"){
            _data.smuDetails[event.target.name] = _data.smu_serial_number +" "+event.target.value; 
        }
        else if(event.target.name === "smu_serial_number"){
            _data[event.target.name] = event.target.value;
        }
        else {
        _data.smuDetails[event.target.name] = event.target.value;
        }
        this.setState({ _data });
    }

    handleChangePlant(event) {
        if(event.target.name === "plant_type" ){
            const stateDup = this.state;
            stateDup[event.target.name]= event.target.value;
            this.setState({ stateDup });
          
            
            this.props.getPlantByType(stateDup.plant_type);
            }
            else if(event.target.name === "plantName" ){
                const stateDup1 = this.state;  
                let plantsByType = this.props.plantsByType; 
                for(var i=0;i<plantsByType.length;i++){
                    if(plantsByType[i].plantName === event.target.value){
                        stateDup1.plantId = plantsByType[i].plantId;
                        break;
                    }
                }
                
                this.setState({stateDup1});

                this.props.getInverterByPlantId(stateDup1.plantId);
            }
            else if(event.target.name === "inverterName"){
                const stateDup = this.state.smuDetails;
                let inverterId = '';
                //stateDup.SMU = [{smu_name:'1.2.6',smu_id:'358'},{smu_name:'1.2.7',smu_id:'358'}];
                for(var i=0; i<this.props.invertedByPlantId.length; i++){
                    if(this.props.invertedByPlantId[i].inverterName === event.target.value){
                        stateDup.inverterId = this.props.invertedByPlantId[i].inverterId;
                        //inverterId = this.props.invertedByPlantId[i].inverter_id;
                        break;
                    }
                }
                this.setState({stateDup});
                
                
             
            }
    }

    renderErrortext(fieldID, msg) {
        return (
            this.state.isSubmited === true && !this.state.postData[fieldID] && <p className="errorText" style={{ color: "#CC0000", display: "block", fontSize: "11px", marginTopop: "0.5em" }}>{msg}</p>
        )
    }

    createColumnDefs() {
        return [
            {
                headerName: "Sr No.", lockPosition: true, valueGetter: rowIndex, width:80,cellClass: 'cell-wrap',
                    autoHeight: true,cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "String", field: "string", cellClass: 'cell-wrap',
                autoHeight: true, width: 350, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Action",
                field: '',
                cellRendererFramework: ActionCellRenderer,
                width: 100,
            }
        ];
    }

    handleStringUpdate(event){
        const stateDup = this.state;
        if(event.target.name === "enableStringText"){
            stateDup[event.target.name] = true;
            stateDup.selectedStringText = parseInt(event.target.id);
        }
        else if(event.target.name === 'str_name' || event.target.name === 'new_str_name'){
            stateDup.stringName = event.target.value;
        }
        else if(event.target.name === 'addString'){
            stateDup.enablenewStringText = true;
        }
                
        this.setState({stateDup});

    }

    updateStringName(){
        const stringDO = {
            smuId : this.state.smuId,
            stringId: this.state.selectedStringText!=null?this.props.allStringsBySMUId[this.state.selectedStringText].stringId:0,
            stringName : this.state.stringName,
            enableStringText:true
        }

        this.props.createOrUpdateString(stringDO);
        alert('String has been created/updated successfully');
    }

    handleStringDelete(event){
        this.props.deleteString(this.props.allStringsBySMUId[parseInt(event.target.id)].stringId);
        alert('String has been deleted successfully');
    }

    render(){
        return(
            <div>
                <Card className="add-plant-card">
                  <Card.Header as="h5">{this.state.pageName}</Card.Header>
                  <Card.Body>
                    <Row>
                        <Col>
                            <Form.Label>Plant Type</Form.Label>
                        </Col>
                        <Col>
                            <select className="top-search-input form-control" width='300px' name="plant_type" onChange={(item) => this.handleChangePlant(item)}>
                           
                        <option >{this.state.plant_type}</option>
                        {this.state.plant_types.map((plantType, key) => <option key={plantType}>{plantType}</option>)}
                        </select>
                        </Col>
                        <Col>
                            <Form.Label>Plant</Form.Label>
                        </Col>
                        <Col>
                        <select className="top-search-input form-control" width='300px' name="plantName" onChange={(item) => this.handleChangePlant(item)}>
                            
                            <option>{this.state.plantName}</option>
                            {/* <option>{this.state.plans[0].plant_name}</option> */}
                            {this.props.plantsByType === undefined?<option>default</option>:this.props.plantsByType.map((plant, key) => <option key={plant.plantId}>{plant.plantName}</option>)}
                        </select>
                        </Col>
                    </Row>
                    <Row>
                    <Col>
                        <Form.Label>Inverter</Form.Label>
                        </Col>
                        <Col>
                            <select className="top-search-input form-control" width='300px' name="inverterName" onChange={(item) => this.handleChangePlant(item)}>
                           
                        <option >{this.state.inverterName}</option>
                        {this.props.invertedByPlantId === undefined?<option>default</option>:this.props.invertedByPlantId.map((inverter, key) => <option key={inverter.inverterId}>{inverter.inverterName}</option>)}
                        </select>
                        </Col> 
                        <Col>
                            <Form.Label>Date<span className="form-required">*</span></Form.Label>
                        </Col>
                        <Col>
                            <Form.Control type="date" name="date" onChange={this.handleChange} value={this.state.smuDetails.date}/>
                            {this.renderErrortext("date", "The Date Field Is Required.")}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label>Time</Form.Label>
                        </Col>
                        <Col>
                        <Form.Control type="text" name="time" onChange={this.handleChange} value={this.state.smuDetails.time}/>
                        {this.renderErrortext("time", "The Time Field Is Required.")}
                        </Col>
                        <Col>
                            <Form.Label>SMU Name<span className="form-required">*</span></Form.Label>
                        </Col>
                        <Col>
                        <Form.Control type="text" name="smuName" onChange={this.handleChange} value={this.state.smuDetails.smuName}/>
                        {this.renderErrortext("smuName", "The SMU Name Field Is Required.")}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label>SMU Serial Number<span className="form-required">*</span></Form.Label>
                        </Col>
                        <Col>
                        <Form.Control type="text" name="smu_serial_number" onChange={this.handleChange} value={this.state.showSMUValue===true?this.state.smuDetails.smuNumber.split(" ")[0]:this.state.smu_serial_number}/>
                        {this.renderErrortext("smu_serial_number", "The SMU Serial Number Field Is Required.")}
                        </Col>
                        <Col>
                            <Form.Label>SMU Number<span className="form-required">*</span></Form.Label>
                        </Col>
                        <Col>
                        <Form.Control type="text" name="smuNumber" onChange={this.handleChange} value={this.state.smuDetails.smuNumber.split(" ")[1]}/>
                        {this.renderErrortext("smuNumber", "The SMU Number Field Is Required.")}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label>Wet Cleaning String<span className="form-required">*</span></Form.Label>
                        </Col>
                        <Col>
                        <Form.Control type="text" name="wetCleaningString" onChange={this.handleChange} value={this.state.smuDetails.wetCleaningString}/>
                        {this.renderErrortext("wetCleaningString", "The Wet Cleaning String Field Is Required.")}
                        </Col>
                        <Col>
                            <Form.Label>Dry Cleaning String<span className="form-required">*</span></Form.Label>
                        </Col>
                        <Col>
                        <Form.Control type="text" name="dryCleaningString" onChange={this.handleChange} value={this.state.smuDetails.dryCleaningString}/>
                        {this.renderErrortext("dryCleaningString", "The Dry Cleaning String Field Is Required.")}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label>Uncleaned String<span className="form-required">*</span></Form.Label>
                        </Col>
                        <Col>
                        <Form.Control type="text" name="uncleanedString" onChange={this.handleChange} value={this.state.smuDetails.uncleanedString}/>
                        {this.renderErrortext("uncleanedString", "The Uncleaned String Field Is Required.")}
                        </Col>
                        <Col>
                        </Col>
                        <Col>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        </Col>
                        <Col md={2}>
                            <Button variant="primary" size="md" onClick={this.onSubmit} block>Submit</Button>
                        </Col>
                        <Route render={({ history }) => (
                            <Col md={2}>
                                <Button variant="primary"  size="md" onClick={() => { history.push('/stringMonitoring') }} block>Back</Button>
                            </Col>
                            )}/>
                        <Col>                      
                        </Col>
                    </Row>
                    {this.state.pageName==='Edit SMU'?
                    <Row>
                    <Col xs={2} style={{ maxWidth: "15%" }}>
                            <Route render={({ history }) => (
                                <button type="button" className="btn btn-primary" style={{ width: "100%" }} name="addString" onClick={this.handleStringUpdate}>
                                    <img src="/images/icons/fugue/plus-circle.png" alt="add plant" title="Add String" style={{ float: "left", marginRight: "3" }} />
                                    Add String
                        </button>)} />
                        </Col>
                    </Row>:''}
                   
                {this.state.pageName==='Edit SMU'?
                <table id="t-list">
                    <tr>
                        <th>S.NO.</th>
                        <th>String</th>
                        <th>Action</th>
                    </tr>
                    {this.props.allStringsBySMUId===undefined?'':this.props.allStringsBySMUId.map((string,key) => 
                        <tr>
                            <td>{key+1}</td>
                            {this.state.enableStringText===true && this.state.selectedStringText===key?
                            <td>
                            <input type="text" name="str_name" onChange={this.handleStringUpdate} value={this.state.stringName !== ''?this.state.stringName:string.stringName}/></td>:
                            <td>{string.stringName}</td>
                            }
                            {this.state.enableStringText===true && this.state.selectedStringText===key? 
                            <td>
                            <a name="enableStringText" onClick={this.updateStringName}>
                                <img name="enableStringText" id={key} alt='' src="/images/icons/fugue/control.png"/>
                            </a>
                            </td>:
                            <td>
                                <a name="enableStringText" onClick={this.handleStringUpdate}>
                                    <img name="enableStringText" id={key} alt=''  src="/images/editIcon.png"/>
                                </a>
                                <a onClick={this.handleStringDelete}>
                                    <img id={key} alt=''  src="/images/cross-circle.png"/>
                                </a>
                            </td>
                            }
                            
                        </tr>
                    )

                    }
                    {this.state.enablenewStringText===true || this.props.allStringsBySMUId.length===0?
                    <tr>
                    <td>{this.props.allStringsBySMUId.length+1}</td>
                    <td><input type="text" name="new_str_name" onChange={this.handleStringUpdate}/></td>
                    <td>
                            <a name="enableStringText" onClick={this.updateStringName}>
                                <img name="enableStringText" src="/images/icons/fugue/control.png"/>
                            </a>
                            </td>
                            </tr>
                            :''}
                </table>:''}
                </Card.Body>
            </Card>
        </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      plantsByType: state.plants.plantsByType,
      invertedByPlantId: state.inverterDailyReducer.inverterName,
      allStringsBySMUId : state.allStringsBySMUId.allStringsBySMUId
    //   allStringsBySMU : state.stringMonitoring.allStringsBySMU,
    //   allSMUBySMUId : state.allSMU.allSMUBySMUId,
    //   allSMUByInvId : state.allSMU.allSMUByInvId,
    //   allStringsBySMUId : state.allStringsBySMUId.allStringsBySMUId


    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      getPlantByType: (plantsByType) => dispatch(getPlantByType(plantsByType)),
      getInverterByPlantId: (plant_id) => dispatch(getInverterByPlantId(plant_id)),
      createOrUpdateSmu : (smuDetails) => dispatch(createOrUpdateSmu(smuDetails)),
      createOrUpdateString : (stringDO) => dispatch(createOrUpdateString(stringDO)),
      deleteString : (stringId) => dispatch(deleteString(stringId))
    //   getAllStrings : () => dispatch(getAllStrings()),
    //   getSMUBySMUId : (smu_id) => dispatch(getSMUBySMUId(smu_id)),
    //   getSMUByInverterId : (inverter_id) => dispatch(getSMUByInverterId(inverter_id)),
    //   getStringsBySMUId : (smu_id) => dispatch(getStringsBySMUId(smu_id))
   
    }
  }

  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddEditSMUComponent));