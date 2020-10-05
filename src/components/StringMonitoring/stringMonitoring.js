import React, { Component } from 'react'

// import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { Route } from 'react-router-dom'
import {AgGridReact} from "ag-grid-react"
// import Picky from 'react-picky';
import 'react-picky/dist/picky.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import '../../styles/plant/plantFaultData.scss';
// import DropDown from "../Common/DropDown";
import { getInverterByPlantId} from "../../actions/InverterDailyActions";
import {getPlantByType} from "../../actions/PlantActions";
import { getAllStrings } from "../../actions/action-StringMonitoring";
import { getSMUBySMUId, getSMUByInverterId, deleteSMU } from "../../actions/action-smu";
import { getStringsBySMUId } from "../../actions/action-strings";
const rowIndex = (params) => params.node.rowIndex + 1;


class ActionCellRenderer extends React.Component {
    constructor(props) {
        super(props);
        this.invokeDelete = this.invokeDelete.bind(this);
    }

    invokeDelete() {
        this.props.context.componentParent.onDelete(this.props.node.data.smuId);
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

class StringMonitoring extends Component {

    constructor(props) {
        super(props);
        this.state = {
            plantTypes: ["GROUNDMOUNT", "ROOFTOP"],
            selectedPlantType: null,
            seletedPlant : null,
            selectedInverter : null,
            inverterName: null,
            selectedSMU : null,
            SMU : [],
            stringsList: false,
            dummyList : []
            
        };
        this.handleChangePlant = this.handleChangePlant.bind(this);
        this.submitGo = this.submitGo.bind(this);
    }

    componentDidMount() {
        // document.title = 'Plant Fault Data';
        // this.props.clearPlantFaultData();
    }
    componentDidUpdate() {
        //this.props.getProjectNames(this.state.selectedValue);
    }

    handleChangePlant(event) {
        if(event.target.name === "plant_type" ){
            const stateDup = this.state;
            stateDup.selectedPlantType = event.target.value;
            this.setState({ stateDup });
          
            this.props.getPlantByType(stateDup.selectedPlantType);
        }
        else if(event.target.name === "plant_name" ){
            const stateDup1 = this.state;  
            let plantsByType = this.props.plantsByType; 
            stateDup1.selectedPlant = event.target.value;
            for(var i=0;i<plantsByType.length;i++){
                if(plantsByType[i].plantName === event.target.value){
                    stateDup1.plantId = plantsByType[i].plantId;
                    break;
                }
            }
            stateDup1.stringsList = false;
            this.setState({stateDup1});

            this.props.getInverterByPlantId(stateDup1.plantId);
        }
        else if(event.target.name === "inverterName"){
            const stateDup = this.state;
            let inverterId = '';
            //stateDup.SMU = [{smu_name:'1.2.6',smu_id:'358'},{smu_name:'1.2.7',smu_id:'358'}];
            for(var i=0; i<this.props.invertedByPlantId.length; i++){
                if(this.props.invertedByPlantId[i].inverterName === event.target.value){
                    stateDup.selectedInverter = this.props.invertedByPlantId[i];
                    stateDup.inverterName = this.props.invertedByPlantId[i].inverterName;
                    //inverterId = this.props.invertedByPlantId[i].inverter_id;
                    break;
                }
            }
            stateDup.stringsList = false;
            this.setState({stateDup});
            
            this.props.getSMUByInverterId(stateDup.selectedInverter.inverterId);
         
        }
        else {
            const stateDup = this.state;
            
            for(var i=0;i<this.props.allSMUByInvId.length;i++){
                if(this.props.allSMUByInvId[i].smuName === event.target.value){
                    stateDup.selectedSMU = this.props.allSMUByInvId[i];

                    break;
                }
            }
            stateDup.stringsList = false;
            this.setState({stateDup});
            //this.props.getAllStrings();
            this.props.getSMUBySMUId(stateDup.selectedSMU.smuId);
            this.props.getStringsBySMUId(stateDup.selectedSMU.smuId);
        }
       
    }

    handleChange(event) {
        const stateDup = this.state;
        stateDup[event.target.name] = event.target.value;
        stateDup.stringsList = false;
        this.setState({ stateDup });

      }  

    submitGo () {
        const stateDup = this.state;
        let allStringNames = '';
        let allStringIdBySMU = '';
        for(var i=0;i<this.props.allStringsBySMUId.length;i++){
            if(i==0){
                allStringNames = this.props.allStringsBySMUId[i].stringName;
                allStringIdBySMU = this.props.allStringsBySMUId[i].stringId;
            }
            else{
            allStringNames = allStringNames + "|"+this.props.allStringsBySMUId[i].stringName;
            allStringIdBySMU = allStringIdBySMU + "|" +this.props.allStringsBySMUId[i].stringId;
            }
        }
        this.props.allSMUBySMUId.map(smuStrings => {
           smuStrings['string'] = allStringNames;
           smuStrings['stringId'] = allStringIdBySMU;
           smuStrings['plant_type']=stateDup.selectedPlantType;
           smuStrings['plant_name']=stateDup.selectedPlant;
           smuStrings['inverter_name']=stateDup.inverterName;
        });
        stateDup.stringsList = true;
        
       this.setState({stateDup});
    }

    onDelete(_id) {
        const stateDup = this.state;
        let isConfirm = window.confirm("Are you sure want to delete this SMU?");
        if (isConfirm)
            this.props.deleteSMU(_id);
            stateDup.stringsList = false;
            this.setState({stateDup});
            alert('SMU has been deleted successfully');
    }

    createColumnDefs() {
        return [
            {
                headerName: "Sr No.", lockPosition: true, valueGetter: rowIndex, width:80,cellClass: 'cell-wrap',
                    autoHeight: true,cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Date", field: "date", cellClass: 'cell-wrap',
                autoHeight: true, width: 80, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Time", field: "time", cellClass: 'cell-wrap',
                autoHeight: true, width: 80, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Smu Name", field: "smuName", cellClass: 'cell-wrap',
                autoHeight: true, width: 85, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Smu Number", field: "smuNumber", cellClass: 'cell-wrap',
                autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Wet Cleaning String", field: "wetCleaningString", cellClass: 'cell-wrap',
                autoHeight: true, width: 120, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Dry Cleaning String", field: "dryCleaningString", cellClass: 'cell-wrap',
                autoHeight: true, width: 120, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Uncleaned String", field: "uncleanedString", cellClass: 'cell-wrap',
                autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
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

    
    render() {

        // const classes = makeStyles(theme => ({
        //     root: {
        //         width: '100%',
        //         marginTop: theme.spacing(3),
        //         overflowX: 'auto',
        //     },
        //     table: {
        //         minWidth: 650,
        //     },
        // }));

        return (
            <div>
                <div className="top-filter">
                    <div className="row" style={{ alignItems: "center", margin: "0" }} >
                        <Col xs={1} style={{ maxWidth: "5%" }}>
                            <Form.Label>Type:</Form.Label>
                        </Col>
                        <Col style={{ maxWidth: "15%" }}>
                        <select className="top-search-input form-control" width='300px' name="plant_type" onChange={(item) => this.handleChangePlant(item)}>
                        value={this.state.selectedPlantType} plant_type={this.state.selectedPlantType}    
                        <option >Select Plant Type</option>
                        {this.state.plantTypes.map((plantType, key) => <option key={plantType}>{plantType}</option>)}
                        </select>
                        </Col>
                        <Col xs={1} style={{ maxWidth: "5%" }}>
                            <Form.Label>Plant:</Form.Label>
                        </Col>
                        <Col style={{ maxWidth: "15%" }}>
                        <select required class="form-control" type="dropdown" name="plant_name" onChange={(item) => this.handleChangePlant(item)} >
                        value={this.state.selectedPlant} plant_name={this.state.selectedPlant}
                        <option>Select Plant</option>
                        {/* <option>{this.state.plans[0].plant_name}</option> */}
                        {this.props.plantsByType === undefined?<option>default</option>:this.props.plantsByType.map((plant, key) => <option key={plant.plantId}>{plant.plantName}</option>)}
                        </select>
                        </Col>
                        <Col xs={1} style={{ maxWidth: "5%" }}>
                            <Form.Label>Inverter:</Form.Label>
                        </Col>
                        <Col style={{ maxWidth: "15%" }}>
                        <select required class="form-control" type="dropdown" name="inverterName" onChange={(item) => this.handleChangePlant(item)} >
                        value={this.state.selectedInverter === null?'':this.state.selectedInverter.inverterName} plant_name={this.state.selectedInverter === null?'':this.state.selectedInverter.inverterName}
                        <option>Select Inverter</option>
                        {/* <option>{this.state.plans[0].plant_name}</option> */}
                        {this.props.invertedByPlantId === undefined?<option>default</option>:this.props.invertedByPlantId.map((plant, key) => <option key={plant.inverterId}>{plant.inverterName}</option>)}
                        </select>
                        </Col>
                        <Col xs={1} style={{ maxWidth: "5%" }}>
                            <Form.Label>SMU:</Form.Label>
                        </Col>
                        <Col xs={2} style={{ maxWidth: "15%" }} >
                        <select required class="form-control" name="SMU" type="dropdown" onChange={(item) => this.handleChangePlant(item)} >
                        value={this.state.selectedSMU === null?'':this.state.selectedSMU.smu_name} plant_name={this.state.selectedSMU === null?'':this.state.selectedSMU.smuName}
                        <option>Select SMU</option>
                        {/* <option>{this.state.plans[0].plant_name}</option> */}
                        {this.props.allSMUByInvId === undefined?<option>default</option>:this.props.allSMUByInvId.map((smu, key) => <option key={smu.smuId}>{smu.smuName}</option>)}
                        </select>
                        </Col>
                        <Col xs={2} style={{ maxWidth: "7%" }}>
                            <button type="button" className="btn btn-orange" onClick={() => this.submitGo()}>
                                Go
                        </button>
                        </Col>
                        <Col xs={2} style={{ maxWidth: "15%" }}>
                            <Route render={({ history }) => (
                                <button type="button" className="btn btn-primary" style={{ width: "100%" }} onClick={() => { history.push('/addEditSMUComponent') }}>
                                    <img src="/images/icons/fugue/plus-circle.png" alt="add plant" title="Add Plant Fault" style={{ float: "left", marginRight: "3" }} />
                                    Add SMU
                        </button>)} />
                        </Col>
                    </div>
                </div>
                <div>
                    <p className="message success" style={{ marginTop: "15px" }}>{this.props.displayMessage}</p>
                </div>
                <div
                    style={{
                        height: '500px',
                    }}
                    className="ag-theme-material">
                    <AgGridReact
                        columnDefs={this.createColumnDefs()}
                        rowData={this.state.stringsList === false?this.state.dummyList:this.props.allSMUBySMUId}
                        context={{ componentParent: this }}
                        onGridReady={this.onGridReady}>
                    </AgGridReact>
                </div>
                {/* <Route render={({ history}) => (
		        <div onClick={() => { history.push('/addEditJmrComponent')}} className="float" title="Add Plant">
		        <i className="fa fa-plus my-float"></i>
		        </div>
		        )} /> */}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      plantsByType: state.plants.plantsByType,
      invertedByPlantId: state.inverterDailyReducer.inverterName,
      allStringsBySMU : state.stringMonitoring.allStringsBySMU,
      allSMUBySMUId : state.allSMU.allSMUBySMUId,
      allSMUByInvId : state.allSMU.allSMUByInvId,
      allStringsBySMUId : state.allStringsBySMUId.allStringsBySMUId


    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      getPlantByType: (plantsByType) => dispatch(getPlantByType(plantsByType)),
      getInverterByPlantId: (plant_id) => dispatch(getInverterByPlantId(plant_id)),
      getAllStrings : () => dispatch(getAllStrings()),
      getSMUBySMUId : (smu_id) => dispatch(getSMUBySMUId(smu_id)),
      getSMUByInverterId : (inverter_id) => dispatch(getSMUByInverterId(inverter_id)),
      getStringsBySMUId : (smu_id) => dispatch(getStringsBySMUId(smu_id)),
      deleteSMU : (id) => dispatch(deleteSMU(id))
   
    }
  }

  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StringMonitoring));