import React, { Component } from 'react';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';
// import axios from 'axios';
import {getPlantHistoryByPlantId} from "../../actions/plantHistoryAction"
import {connect} from 'react-redux'
import { withRouter} from 'react-router-dom';
// import {Route} from 'react-router-dom';
import {AgGridReact} from "ag-grid-react";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import '../../styles/plant/plantHistory.scss';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import ModalDialog from 'react-bootstrap/ModalDialog'
// import ModalBody from 'react-bootstrap/ModalBody'
// import ModalFooter from 'react-bootstrap/ModalFooter'
// import Card from 'react-bootstrap/Card';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import Form from 'react-bootstrap/Form';
class PlantHistoryComponent extends Component {

    constructor(props) {
           super(props);
                   this.state = {
           //columnDefs: this.createColumnDefs(),
           plantHistByID: null,
           plantHistoryDetailsHdr: null,
           plantHistoryDetails : null
           }

    }

    componentDidMount() {
        // document.title = 'Plant Fault Data';
        this.props.getPlantHistoryByPlantId(this.props.location.plant.plantId);
        
    }
    
    componentWillReceiveProps(nextProps){
        if(nextProps!= null){
            this.setState({
            plantHistByID: nextProps.plantHistByID,
        plantHistoryDetailsHdr: nextProps.plantHistoryDetailsHdr,
        plantHistoryDetails : nextProps.plantHistoryDetails
    });
        }
    }

    createColumnDefs() {
    //     var header ='';
    //    {this.props.plantHistoryDetailsHdr===undefined?header=[]:this.props.plantHistoryDetailsHdr.map((header,index)=> (
    //        header = header
    //    ))};
        return [
       {headerName: "Plant Details", field: "plantDetails",width:250,cellStyle: { 'white-space': 'normal' }},
       {headerName: "Plant Details", field: "2016-09-26T13:16:46.000+0000",width:250,cellStyle: { 'white-space': 'normal' }},
       {headerName: "Plant Details", field: "2016-09-26T13:10:39.000+0000",width:250,cellStyle: { 'white-space': 'normal' }},
       {headerName: "Plant Details", field: "2016-09-26T13:08:52.000+0000",width:250,cellStyle: { 'white-space': 'normal' }},
       {headerName: "Plant Details", field: "2016-09-26T13:08:10.000+0000",width:250,cellStyle: { 'white-space': 'normal' }},
       {headerName: "Plant Details", field: "2016-09-26T13:07:24.000+0000",width:250,cellStyle: { 'white-space': 'normal' }},
       {headerName: "Plant Details", field: "2016-09-26T12:44:38.000+0000",width:250,cellStyle: { 'white-space': 'normal' }}
    //    {headerName: {header}, field: {header},width:165}
   ];
}
//    componentDidMount() {
//        this.props.getAllPlants();
//    }

   render() {
    //    const classes = makeStyles(theme => ({
    //        root: {
    //            width: '100%',
    //            marginTop: theme.spacing(3),
    //            overflowX: 'auto',
    //        },
    //        table: {
    //            minWidth: 650,
    //        },
    //    }));
       // const [lgShow, setLgShow] = useState(false);		

       return (
           <div 
           style={{ 
   height: '500px', 
   }}
           className="ag-theme-material">
           <AgGridReact
                                   // properties
                                   columnDefs={this.createColumnDefs()}
                                   rowData={this.props.plantHistoryDetails===undefined?'':this.props.plantHistoryDetails}
                                   // events
                                   onGridReady={this.onGridReady}>
                           </AgGridReact>
                           </div>
       );
}
}

const mapStateToProps = state => {
    return {
        plants: state.plants.allplants,
        plantHistByID: state.plantHistByID.plantHistByID,
        plantHistoryDetailsHdr: state.plantHistoryDetailsHdr.plantHistoryDetailsHdr,
        plantHistoryDetails : state.plantHistoryDetails.plantHistoryDetails
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
       getPlantHistoryByPlantId: (plantHistByID) => dispatch(getPlantHistoryByPlantId(plantHistByID))
        
		
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PlantHistoryComponent));