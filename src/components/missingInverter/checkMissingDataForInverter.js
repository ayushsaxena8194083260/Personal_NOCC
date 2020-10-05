import React, { Component } from 'react'

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Link, withRouter } from 'react-router-dom'
import { Route } from 'react-router-dom'
import {AgGridReact} from "ag-grid-react"
import Picky from 'react-picky';
import 'react-picky/dist/picky.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import '../../styles/plant/plantFaultData.scss';
import DropDown from "../Common/DropDown";
import Alert from 'react-bootstrap/Alert';
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import MissingInverterUpload from './missingInverterUploadModal';


class ActionCellRenderer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            invID: '',
        }
        this.invokeActualGeneration = this.invokeActualGeneration.bind(this);
     
    }
    onClickMissingInverterDetails(event,_data){
        event.preventDefault(); 
        const data = this.props.context.componentParent.state;
        window.open("/missingInverterDetails?plantId="+_data.plantId+"&inverterId="+_data.inverterId+"&fromDate="+_data.date+"&toDate="+_data.date);
    }


    // Get invertor Details Gaurav
    invokeActualGeneration(event, _data){
        event.preventDefault();
   
        const data = this.props.context.componentParent.state;
     
        localStorage.setItem('invid',_data.inverterId);
     
        this.setState({'invID':_data.inverterId})
  
		const lgshow = true;
		this.props.context.componentParent.faultGeneration(lgshow);
	}
    render() {
        return (<div className="products-actions">
        <Link 
        // to="route" target="_blank" state={this.props.state} onClick={(event) => {this.onClickMissingInverterDetails(event,this.props.data)}} 
        //     className="missing-weather-action"
        to={{
            pathname: "/missingInverterDetails",
            missingInverterDetailsData: this.props.data
        }}    
            > 
            Details
        </Link>
        <Link className="missing-weather-action"
            to="#"  state = {this.props.data} onClick={(event) => {this.invokeActualGeneration(event, this.props.data)}} title="Upload Missing Data">                         
            Upload 
        </Link>
        </div>);
    }
}

class ActionEditCellRenderer extends React.Component {
    constructor(props) {
        super(props);
        this.invokeEdit = this.invokeEdit.bind(this);
    }

    invokeEdit(){
        this.props.context.componentParent.editMissingInverter(true, this.props.node.data);
    }

    render() {
        return (<div className="products-actions">
            <Link to="#" onClick={this.invokeEdit} title="Edit" >
                <img src="/images/editIcon.png" alt="Edit" />
            </Link>
        </div>);
    }
}

class CheckMissingDataForInverter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            plantid: '',
            invID: '',
            selectedPlanType: null,
            selectedInvTypsOptions: [],
            selectedProjectTypes: null,
            selectedFromDate: this.getMonthStartDate(),
            selectedToDate: this.getCurrentDate(),
            inverterName: this.props.inverterName,
            projectTypes: this.props.projectTypes,
            plantTypes: this.props.plantTypes,
            missingInverter: this.props.missingInverter,
            postData:{},
            missingInverter1: [{
                date:'2016-01-01',
                sr_no:'1',
                inverter:'testing',
                total:'0',
                available:'0',
                missing:'0',
            }    
            ],
            selectedPlantOptions: null,
            inverterTypes: [],
            selectedInverterId: [],
            showPopUp: false,
            deleteID: null,
            lgShow:false,
            loader:0

        };
        console.log(this.state, 'cunstroctur');
    }
    faultGeneration(lgShowValue){
		this.setState({
			...this.state,
			lgShow:lgShowValue
		})
	}
    getCurrentDate(){
        var today= new Date();
        var d = today.getDate();
        var day;
        if(d>1){
day=d-1;
        }else{
day =d
        }
        var m = today.getMonth()+1;
        var y = today.getFullYear();
        var data;

        if(day < 10){
            day = "0"+day;
        };
        if(m < 10){
            m = "0"+m;
        };

        data = y+"-"+m+"-"+day;
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
        this.props.clearMissingInverterData();
    }

    ModalClose() {
        this.setState({ commGF: false });
    }

    editMissingInverter(gfShowValue, data) {
        this.setState({
            ...this.state,
            commGF: gfShowValue,
            postData: data
        })
    }

    handleChange(data, field) {
        let postDataDup = this.state.postData;
        postDataDup[field] = data.target.value;
        this.setState({postData: postDataDup});
    }

    onSubmit = () => {
        if (this.state.postData !== null) {
            this.props.createOrUpdateInverterDailyData({inverterDaily : this.state.postData, type: "Edit Missing Inverter"});
            this.ModalClose();
            this.props.getInverterDailyDetails({ fromDate: this.state.selectedFromDate, plantId: this.state.selectedPlantOptions,toDate: this.state.selectedToDate,inverterIds:this.state.selectedInverterId });
        }
    }

    handleChangeFromDate(event) {
        let fromDate = event.target.value;
        this.setState({ selectedFromDate: fromDate});
    }

    handleChangeToDate(event) {
        let toDate = event.target.value;
        this.setState({ selectedToDate: toDate});
    }

    handleChangePlantType(event) {
        const selectedValue = event.target.value;
        if (selectedValue !== this.state.selectedPlantType) {
            this.props.getPlantByType(selectedValue);
            this.setState({ selectedPlantType: selectedValue, selectedPlantOptions: null,selectedInvTypsOptions:[] });
        }
    }

    handleChangePlants(event) {
        const selectedValue = event.target.value;
        this.props.getInverterByPlantId(selectedValue);
        this.setState({ selectedPlantOptions: selectedValue });
    }

    loder ()
{
    return (
        <>
    <div className="spinner-grow text-primary" role="status">
        <span className="sr-only">Loading</span>
      </div>
      </>
  );
    
} 
    // Get inverter ID Gaurav
      getRenderMissingInverter() {
        if(this.state.loader==0){
            this.loder();
                }
          localStorage.setItem('inverter',JSON.stringify(this.state));
          localStorage.setItem('inverterid',this.state.selectedPlantOptions);
       //   this.state.plantid=this.state.selectedPlantOptions;
          let data=  localStorage.getItem('invid');
          this.setState({'plantid':this.state.selectedPlantOptions, 'invID':data })
         console.log(this.state);
        this.props.getInverterDailyDetails({ fromDate: this.state.selectedFromDate, plantId: this.state.selectedPlantOptions,toDate: this.state.selectedToDate,inverterIds:this.state.selectedInverterId });
        console.log(this.state, '1 state');
        console.log(this.props, '1 props');
    }
    
        
    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
      

        params.api.sizeColumnsToFit();
      };
 
    getInverterTypesDropDownOptions(){
        const options = this.state.inverterName && this.state.inverterName.map((inverterName, key) => { return { id: inverterName.inverterId, name: inverterName.inverterName } });
        return options;
   }

   selectInvTypeOptios(value) {
         const inverterIds = value && value.map((item) => item.id);
         this.setState({ selectedInverterId: inverterIds});
        this.setState({ selectedInvTypsOptions: value });
        
    }
    // onBtStopEditing() {
    //     this.gridApi.stopEditing();
    //   }

    //       onEdit(key, char, pinned) {
    //         this.gridApi.setFocusedCell(0, "remarks", pinned);
    //         this.gridApi.startEditingCell({
    //           rowIndex: 0,
    //           colKey: "remarks",
    //           rowPinned: pinned,
    //           keyPress: key,
    //           charPress: char
    //         });
    //       }
    
    
    // getRenderMissingInverter() {
    //      plantIds.length > 0 && this.props.getInverterDailyDetails({ plantIds: plantIds, fromDate: this.state.selectedFromDate, toDate: this.state.selectedToDate, inverterIds : this.state.selectedInverterId });
    // }

    createColumnDefs() {
        return [
            {
                headerName: "Sr No.", field: "sr_no", cellClass: 'cell-wrap',
                autoHeight: true, width: 50, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Date", field: "date", cellClass: 'cell-wrap',
                autoHeight: true, width: 80, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Inverter", field: "inverterName", cellClass: 'cell-wrap',
                autoHeight: true, width: 130, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Total", field: "total", cellClass: 'cell-wrap',
                autoHeight: true, width: 70, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Available", field: "available", cellClass: 'cell-wrap',
                autoHeight: true, width: 87, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Missing", field: "missing", cellClass: 'cell-wrap',
                autoHeight: true, width: 80, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Action",
                field: '',
                cellRendererFramework: ActionCellRenderer,
                width: 200,
            },
            {
                headerName: "Remarks", field: "remarks", cellClass: 'cell-wrap',editable: true,resizable: true,
                autoHeight: true, width: 400, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Edit",
                field: '',
                cellRendererFramework: ActionEditCellRenderer,
                width: 180,
                editable: true,
            },           
        ];
    }

    getDropDownPlants() {
        let plants = [];
        plants.push({ displayText: "Select Plant", value: "0" })
        this.state.plantTypes && this.state.plantTypes.map((item) => {
            plants.push({ displayText: item.plantName, value: item.plantId })
        });

        return plants;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== null) {
          
            this.setState({
                projectTypes: nextProps.projectTypes,
                plantTypes: nextProps.plantTypes,
                inverterName: nextProps.inverterName,
                missingInverter: nextProps.missingInverter
            })
        }
    }

    

    getDropDownYear() {
        return this.props.years && this.props.years.map((item) => { return { displayText: item, value: item } });
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
        const ModalClose = () => {
            this.setState({lgShow:false});
            this.setState({deleteShow:false});
        }
        return (
            <div>
            <div>
                <div className="top-filter">
                    <div className="row" style={{ alignItems: "center", margin: "0" }} >
                        <Col xs={1} style={{ maxWidth: "5%" }}>
                            <Form.Label>Type:</Form.Label>
                        </Col>
                        <Col style={{ maxWidth: "12%",padding:"0" }}>
                            <DropDown
                                className="top-search-input form-control"
                                Name="plantType"
                                itemSource={this.props.plantType}
                                value={this.state.selectedPlantType}
                                handleChange={(item) => this.handleChangePlantType(item)}
                            />
                        </Col>
                        <Col xs={1} style={{ maxWidth: "5%" }}>
                            <Form.Label>Plant:</Form.Label>
                        </Col>
                        <Col style={{ maxWidth: "12%" ,padding:"0"}}>
                            <DropDown
                                className="top-search-input form-control"
                                Name="plants"
                                itemSource={this.getDropDownPlants()}
                                value={this.state.selectedPlantOptions}
                                handleChange={(item) => this.handleChangePlants(item)}
                            />
                        </Col>
                        <Col  xs={1} style={{ maxWidth: "5%" }}>
                            <Form.Label>Inv:</Form.Label>
                        </Col>
                        <Col style={{ maxWidth: "13%" ,padding:"0"}}>
                            <Picky
                                value={this.state.selectedInvTypsOptions}
                                options={this.getInverterTypesDropDownOptions()}
                                onChange={(val) => this.selectInvTypeOptios(val)}
                                open={false}
                                valueKey="id"
                                labelKey="name"
                                multiple={true}
                                includeSelectAll={true}
                                includeFilter={true}
                                dropdownHeight={250}
                                    filterPlaceholder="Search"
                            />
                        </Col>
                        <Col xs={1} style={{ maxWidth: "5%" }}>
                            <Form.Label>From:</Form.Label>
                        </Col>
                        <Col xs={1} style={{ maxWidth: "13%",padding:"0" }}>
                            <Form.Control name="fromDate" type="date" onChange={(item) => this.handleChangeFromDate(item)} value={this.state.selectedFromDate} />
                        </Col>
                        <Col xs={1} style={{ maxWidth: "5%" }}>
                            <Form.Label>To:</Form.Label>
                        </Col>
                        <Col xs={1} style={{ maxWidth: "13%",padding:"0" }}>
                            <Form.Control name="toDate" type="date" onChange={(item) => this.handleChangeToDate(item)} value={this.state.selectedToDate} />
                        </Col>
                        <Col xs={2} style={{ maxWidth: "7%" }}>
                            <button type="button" className="btn btn-orange" onClick={() => this.getRenderMissingInverter()}>
                                Go
                        </button>
                        </Col>
                      
                    </div>
                </div>
                <div>
                    {this.props.displayMessage ? <Alert className="message success"  variant="success" style={{ marginTop: "15px" }}>{this.props.displayMessage}</Alert> : null} 
                </div>
                <div
                     style={{
                            height: '500px',
                            maxWidth:"1222px",
		                    margin:"auto"
                        }}
                    className="ag-theme-material">
                    <AgGridReact
                        columnDefs={this.createColumnDefs()}
                        rowData={this.state.missingInverter}
                        context={{ componentParent: this }}
                        onGridReady={this.onGridReady}>
                    </AgGridReact>
                    <Modal id="editMissingInverter" show={this.state.commGF} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                        <Modal.Title>Check For Missing Inverter</Modal.Title>
                                <Modal.Body>
                                    <Col>
                                    <Form.Label>Remarks<span className="form-required">*</span></Form.Label>
                                    </Col>
                                    <Col>
                                    <Form.Control name="remarks" type="text" onChange={(item) => this.handleChange(item, "remarks")} value={this.state.postData.remarks ? this.state.postData.remarks : null} pattern="^-?[0-9]\d*\.?\d*$" />
                                    </Col>
                                </Modal.Body>
                                <Modal.Footer>
                                <Button variant="primary" onClick={() => this.onSubmit()}>
                                        Save
                                    </Button>
                                    <Button variant="danger" onClick={() => this.ModalClose()}>
                                        Close
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                </div>
        
                {/* send inverter and plant details Gaurav */}
                <MissingInverterUpload invID={this.state.invID} plantid= {this.state.plantid}
                show={this.state.lgShow}
                onHide={ModalClose}
            />
            </div>
            
            </div>
        );
    }
}

export default CheckMissingDataForInverter;