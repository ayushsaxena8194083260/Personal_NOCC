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
import {getPlantByType} from "../../actions/PlantActions";
import {getAllPlantTiltSchedule, deletePlantTiltSchdeule, getTiltScheduleDataByDatePlantId} from "../../actions/PlantTiltScheduleAction";


class ActionCellRenderer extends React.Component {
    constructor(props) {
        super(props);
        this.invokeDelete = this.invokeDelete.bind(this);
    }

    invokeDelete() {
        this.props.context.componentParent.onDelete(this.props.node.data.plantTiltScheduleId);
    }
    render() {
        return (<div className="products-actions">
            <Link className="products-actions-link"
                to={{
                    pathname: "/plantTiltScheduleDataAddEdit",
                    plantTiltSchedule: this.props.data
                }}>
                <img src="https://nocc.azurepower.com/images/editIcon.png" alt="Edit" />
            </Link>
            <Link to="#" onClick={this.invokeDelete} title="Delete" >
                <img src="https://nocc.azurepower.com/images/cross-circle.png" alt="Delete" />
            </Link>
        </div>);
    }
}

class TiltScheduleData extends Component {

    constructor(props) {
        super(props);
        this.state = {
            plantTypes: ["GROUNDMOUNT", "ROOFTOP"],
            selectedPlantType:'',
            plantsTiltSchedule: [],
            selectedPlant: "",
            value: null,
            plant_id:'',
            fromDate:this.getMonthStartDate(),
            toDate:this.getCurrentDate()
        };
        this.handleChangePlant = this.handleChangePlant.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.submitGo = this.submitGo.bind(this);
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
    getMonthStartDate(){
        var today= new Date();
        var d = 1;
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
        else{
            const stateDup1 = this.state;  
            let plantsByType = this.props.plantsByType; 
            stateDup1.selectedPlant = event.target.value;
            for(var i=0;i<plantsByType.length;i++){
                if(plantsByType[i].plantName === event.target.value){
                    stateDup1.plant_id = plantsByType[i].plantId;
                    break;
                }
            }
            
            this.setState({stateDup1});
        }
    }

    onDelete(_id) {
		let isConfirm = window.confirm("Are you sure want to delete this plant tilt schedule data?");
		if (isConfirm)
            this.props.deletePlantTiltSchdeule(_id);
            alert('Tilt Schedule has been created/updated');
            this.props.history.push('/plantTiltScheduleData');
	}

      handleChange(event) {
        const stateDup = this.state;
        stateDup[event.target.name] = event.target.value;
        this.setState({ stateDup });

      }
      
      submitGo () {
       
        let plantTiltData ={
            fromDate:this.state.fromDate,
            plant_id:this.state.plant_id,
            toDate:this.state.toDate
        };
                        
        this.props.getTiltScheduleDataByDatePlantId(plantTiltData);
       
    }

    componentWillReceiveProps(nextProps) {
        //if(nextProps.plantTiltsByPlantIDDate !== undefined && this.props.plantTiltsByPlantIDDate !== undefined){
        if(nextProps.allTiltScheduleByDatePlantId!= null && this.state.plant_id !== ''){
            const stateDup = this.state;
            stateDup.plantsTiltSchedule = nextProps.allTiltScheduleByDatePlantId.map((plant) => {
                plant['plant_name'] = stateDup.selectedPlant;
                plant['plant_type'] = stateDup.selectedPlantType;
            })
                        
            stateDup.plantsTiltSchedule = nextProps.allTiltScheduleByDatePlantId;

            this.setState({ stateDup });

        }
    //}
        
    }

    createColumnDefs() {
        return [
            {
                headerName: "Date", field: "date", cellClass: 'cell-wrap',
                autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }, sort:'desc',sortable:false
            },
            {
                headerName: "Tilt Angle", field: "tiltAngle", cellClass: 'cell-wrap',
                autoHeight: true, width: 120, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "No Of Rack Planned For Tiltings", field: "rackCount", cellClass: 'cell-wrap',
                autoHeight: true, width: 120, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Actual No Of Rack Tilted", field: "rackTilted", cellClass: 'cell-wrap',
                autoHeight: true, width: 120, cellStyle: { 'white-space': 'normal' }
            },
            
            {
                headerName: "Total In KW", field: "totalKw", cellClass: 'cell-wrap',
                autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
            },

            {
                headerName: "No Of Labor Planned", field: "laborPlanned", cellClass: 'cell-wrap',
                autoHeight: true, width: 120, cellStyle: { 'white-space': 'normal' }
            },

            {
                headerName: "Actual No Of Labor Used", field: "laborUsed", cellClass: 'cell-wrap',
                autoHeight: true, width: 120, cellStyle: { 'white-space': 'normal' }
            },

            {
                headerName: "Remarks", field: "remarks", cellClass: 'cell-wrap',
                autoHeight: true, width: 320, cellStyle: { 'white-space': 'normal' }
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
                        <select required class="form-control" name="plant_id" type="dropdown" name="plant_name" onChange={(item) => this.handleChangePlant(item)} >
                            value={this.state.selectedPlant} plant_name={this.state.selectedPlant}
                            <option>Select Plant</option>
                            {/* <option>{this.state.plans[0].plant_name}</option> */}
                            {this.props.plantsByType === undefined?<option>default</option>:this.props.plantsByType.map((plant, key) => <option key={plant.plantId}>{plant.plantName}</option>)}
                        </select>
                        </Col>
                        <Col xs={1} style={{ maxWidth: "5%" }}>
                            <Form.Label>From:</Form.Label>
                        </Col>
                        <Col xs={2} style={{ maxWidth: "20%" }} >
                            <Form.Control type="date" name="fromDate" onChange={this.handleChange} value={this.state.fromDate}/>
                        </Col>
                        <Col xs={1} style={{ maxWidth: "5%" }}>
                            <Form.Label>To:</Form.Label>
                        </Col>
                        <Col xs={2} style={{ maxWidth: "20%" }} >
                            <Form.Control type="date" name="toDate" onChange={this.handleChange} value={this.state.toDate}/>
                        </Col>
                        <Col xs={2} style={{ maxWidth: "7%" }}>
                            <button type="button" className="btn btn-orange" onClick={() => this.submitGo()}>
                                Go
                        </button>
                        </Col>
                                                
                        <Col xs={2} style={{ maxWidth: "15%" }}>
                            <Route render={({ history }) => (
                                <button type="button" className="btn btn-primary" style={{ width: "100%" }} onClick={() => { history.push('/plantTiltScheduleDataAddEdit') }}>
                                    <img src="https://nocc.azurepower.com/images/icons/fugue/plus-circle.png" alt="add plant" title="Add Tilt Schedule" style={{ float: "left", marginRight: "3" }} />
                                    Add Tilt Schedule
                        </button>)} />
                        </Col>
                        
                    </div>
                </div>
                {/* <div>
                    <p className="message success" style={{ marginTop: "15px" }}>{this.props.displayMessage}</p>
                </div> */}
                <div
                    style={{
                        height: '500px',
                    }}
                    className="ag-theme-material">
                    <AgGridReact
                        columnDefs={this.createColumnDefs()}
                        rowData={this.state.plantsTiltSchedule}
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
      allPlantTiltSchedule:state.plantTiltSchedule.allPlantTiltSchedule,
      allTiltScheduleByDatePlantId:state.allTiltScheduleByDatePlantId.allTiltScheduleByDatePlantId
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      getPlantByType: (plantsByType) => dispatch(getPlantByType(plantsByType)),
      getAllPlantTiltSchedule: (plant_type,plant_name,plant_id) => dispatch(getAllPlantTiltSchedule(plant_type,plant_name,plant_id)),
      deletePlantTiltSchdeule: (_id) => dispatch(deletePlantTiltSchdeule(_id)),
      getTiltScheduleDataByDatePlantId: (tiltScheduleData) => dispatch(getTiltScheduleDataByDatePlantId(tiltScheduleData))
   
    }
  }
  
  //export default ActualGenerateModal
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TiltScheduleData));