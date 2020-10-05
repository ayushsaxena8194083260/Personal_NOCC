import React, { Component } from 'react'

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import {AgGridReact} from "ag-grid-react"
import Picky from 'react-picky';
import 'react-picky/dist/picky.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import '../../styles/plant/plantFaultData.scss';
import DropDown from "../Common/DropDown";
import {getAllPlants, getPlantByProjectId} from "../../actions/PlantActions";
import { getPlantByType,getModuleCleaningByPlantId, getModuleCleaningAnalysisDataByDate, clearModuleAnalysisData, createOrUpdateModuleCleaningAnalysis } from "../../actions/moduleCleaningAnalysisActions";
import ModuleCleaningAnalysisEdit from './moduleCleaningAnalysisEdit';
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

const rowIndex = (params) => params.node.rowIndex + 1;


class ActionCellRenderer extends React.Component {
    constructor(props) {
        super(props);
        this.invokeDelete = this.invokeDelete.bind(this);
        this.involkeEdit = this.involkeEdit.bind(this);
    }
    involkeEdit(){
        const commGF = true;
        this.props.context.componentParent.editModuleAnalysis(commGF, this.props.node.data);
    }
    invokeDelete() {
        this.props.context.componentParent.onDelete(this.props.node.data._id);
    }
    render() {
        return (<div className="products-actions">
            <Link className="products-actions-link"
                to="#" onClick={this.involkeEdit} title="Edit" >
                <img src="/images/editIcon.png" alt="Edit" />
            </Link>
            <Link className="products-actions-link" to="#" title="Clean" >
                <img src="/images/clean.png" style={{width:"15px"}} alt="Clean" />
            </Link>
            <Link className="products-actions-link"
                to={{
                    pathname: "/moduleCleaningUpload",
                }}>
                <img src="/images/icons/fugue/navigation-090-white.png" alt="Upload" />
            </Link>
            {/* <Link className="products-actions-link" to="#" title="Upload" >
                <img src="/images/icons/fugue/navigation-090-white.png" alt="Upload" />
            </Link> */}
        </div>);
    }
}

class ModuleCleaningAnalysis extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedPlanType: null,
            selectedProjectTypes: null,
            selectedFromDate: this.getMonthStartDate(),
            selectedToDate: this.getCurrentDate(),
            projectTypes: this.props.projectTypes,
            plantTypes: this.props.plantTypes,
            moduleCleaningAnalysis: this.props.moduleCleaningAnalysis,
            selectedPlantOptions: [],
            showPopUp: false,
            deleteID: null,
            cleanedEnergy:null,
            UncleanedEnergy:null,
            id:null,
            postData:[]
        };
        this.selectMultipleOption = this.selectMultipleOption.bind(this);
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
        this.props.clearModuleAnalysisData();
    }
    componentDidUpdate() {
        //this.props.getProjectNames(this.state.selectedValue);
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
            this.setState({ selectedPlantType: selectedValue, selectedPlantOptions: null,selectedPlantOptions: [] });
        }
    }

    handleChangePlants(event) {
        const selectedValue = event.target.value;
        this.setState({ selectedPlantOptions: selectedValue });
    }

    getDropDownPlants() {
        let plants = [];
        plants.push({ displayText: "Select Plant", value: "0" })
        this.state.plantTypes && this.state.plantTypes.map((item) => {
            plants.push({ displayText: item.plantName, value: item.plantId })
        });

        return plants;
    }

    // editModuleAnalysis(gfShowValue) {
    //     this.setState({
    //         ...this.state,
    //         editModal: gfShowValue,
    //         //showPopUpMsg: msg
    //     })
    // }

    getRenderModuleCleaning() {
        let plantIds = [];
        this.state.selectedPlantOptions && this.state.selectedPlantOptions.length > 0 
        && this.state.selectedPlantOptions.map((item) => { plantIds.push(item.id) });
        plantIds.length > 0 
        && this.props.getModuleCleaningAnalysisDataByDate({ plantIds: plantIds, fromDate: this.state.selectedFromDate, toDate: this.state.selectedToDate });
        // var postData = {
        //         "fromDate": this.state.selectedFromDate,
        //         "plantIds": [
        //           this.state.selectedPlantOptions
        //         ],
        //         "toDate": this.state.selectedToDate
        // }
        // this.props.getModuleCleaningAnalysisDataByDate(postData);
       
        console.log(this.state.moduleCleaningAnalysis)
    }

    handleChangeType(event) {
        const selectedValue = event.target.value;
        this.props.getProjectNames(selectedValue);
        this.setState({ selectedValue });
        console.log(selectedValue)
    }
    onGridReady = (params) => {
        params.api.setHeaderHeight(70);
      }


    handleChangeYear(event) {
        const selectedYear = event.target.value;
        this.setState({ selectedYear });
    }

    selectOption(value) {
        console.log("Vals", value);
        this.setState({ value });
    }

    selectMultipleOption(value) {
        this.setState({ selectedPlantOptions: value });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== null) {
            this.setState({
                projectTypes: nextProps.projectTypes,
                plantTypes: nextProps.plantTypes,
                moduleCleaningAnalysis: nextProps.moduleCleaningAnalysis
            })
        }
    }

    getPlantTypesDropDownOptions() {
        const options = this.state.plantTypes && this.state.plantTypes.map((plantTypes, key) => { return { id: plantTypes.plantId, name: plantTypes.plantName } });
        return options;
    }

    getDropDownProjectTypes() {
        let projectName = [];
        projectName.push({ displayText: "Select Project", value: "0" })
        this.state.projectTypes && this.state.projectTypes.map((item) => {
            projectName.push({ displayText: item.projectName, value: item.projectId })
        });

        return projectName;
    }

    onDelete(_id) {
        this.setState({ showPopUp: true, deleteID: _id });

    }
    
    onHide() {
        this.setState({ showPopUp: false, deleteID: null });
    }

    deleteRecord() {
        if (this.state.deleteID !== null) {
            this.props.deleteModuleCleaning(this.state.deleteID);
            //alert("deleted id"+ this.state.deleteID);
            this.onHide();
        }
    }
    createColumnDefs() {
        return [
                {
                    headerName: "Date", field: "date", cellClass: 'cell-wrap',
                    autoHeight: true, width: 80, cellStyle: { 'white-space': 'normal' }
                },
                {
                    headerName: "Insolation", field: "insolation", cellClass: 'cell-wrap',
                    autoHeight: true, width: 90, cellStyle: { 'white-space': 'normal' }
                },
                {
                    headerName: "Module Temperature", field: "moduleTempWh", cellClass: 'cell-wrap',
                    autoHeight: true, width: 102, cellStyle: { 'white-space': 'normal' }
                },
                {
                    headerName: "Cleaned Energy", field: "cleanedEnergy", cellClass: 'cell-wrap',
                    autoHeight: true, width: 140, cellStyle: { 'white-space': 'normal' }
                },
                
                {
                    headerName: "Uncleaned Energy", field: "uncleanedEnergy", cellClass: 'cell-wrap',
                    autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
                },
                {
                    headerName: "Generation Loss", field: "genLoss", cellClass: 'cell-wrap',
                    autoHeight: true, width: 130, cellStyle: { 'white-space': 'normal' }
                },
                {
                    headerName: "Revenue Loss", field: "revLoss", cellClass: 'cell-wrap',
                    autoHeight: true, width: 120, cellStyle: { 'white-space': 'normal' }
                },
                {
                    headerName: "Cleaning Cycle", field: "cleaningCycle", cellClass: 'cell-wrap',
                    autoHeight: true, width: 120, cellStyle: { 'white-space': 'normal' }
                },
                {
                    headerName: "Total Loss", field: "totalLoss", cellClass: 'cell-wrap',
                    autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
                },
                {
                    headerName: "Cleaning Alert", field: "cleaningAlert", cellClass: 'cell-wrap',
                    autoHeight: true, width: 120, cellStyle: { 'white-space': 'normal' }
                },
                {
                    headerName: "Action",
                    field: '',
                    cellRendererFramework: ActionCellRenderer,
                    width: 100,
                }
            ];
        }

        ModalClose() {
            this.setState({ commGF: false });
        }
        onSubmit = () => {
            if (this.state.postData !== null) {
                this.props.createOrUpdateModuleCleaningAnalysis(this.state.postData);
                this.ModalClose();
                this.props.getModuleCleaningAnalysisDataByDate({ plant_id: this.state.selectedPlantOptions, fromDate: this.state.selectedFromDate, toDate: this.state.selectedToDate });
            }
        }

        editModuleAnalysis(gfShowValue, data) {
            this.setState({
                ...this.state,
                commGF: gfShowValue,
                postData: data
            })
        }
    
        handleChangeForDecimal(event) {
            let _data = this.props.data;
            const re = /^[0-9]+\.?[0-9]*$/;
            if (event.target.value === '' || re.test(event.target.value)) {
                _data[event.target.name] = event.target.value;
            }
            this.setState({ data: _data });
    
        }

        handleChange(data, field) {
            let postDataDup = this.state.postData;
            postDataDup[field] = data.target.value;
            this.setState({postData: postDataDup});
            // if (field === "cleaned_energy"){
            //     postDataDup["cleaned_energy": data.target.value]
            //     //this.setState({postDataDup: data.target.value})
            // }else if (field === "Uncleaned_energy"){
            //     this.setState({UncleanedEnergy: data.target.value})
            // }
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
            this.setState({ commGF: false });
        }

        
        return (
            <div>
            <div>
                <div className="top-filter">
                    <div className="row" style={{ alignItems: "center", margin: "0" }} >
                    <Col xs={1} style={{ maxWidth: "5%" }}>
                            <Form.Label>Type:</Form.Label>
                        </Col>
                        <Col style={{ maxWidth: "15%",padding:"0" }}>
                            <DropDown
                                className="top-search-input form-control"
                                Name="plantType"
                                itemSource={this.props.plantType}
                                value={this.state.selectedPlantType}
                                handleChange={(item) => this.handleChangePlantType(item)}
                            />
                        </Col>
                        
                        {/* <Col xs={1} style={{ maxWidth: "5%" }}>
                            <Form.Label>Plant:</Form.Label>
                        </Col> */}
                        <Col xs={1} style={{ maxWidth: "5%" }}>
                            <Form.Label>Plant:</Form.Label>
                        </Col>
                        <Col style={{ maxWidth: "13%" ,padding:"0"}}>
                        <Picky
                                    value={this.state.selectedPlantOptions}
                                    options={this.getPlantTypesDropDownOptions()}
                                    onChange={(val) => this.selectMultipleOption(val)}
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
                        {/* <Col style={{ maxWidth: "15%",padding:"0" }}>
                            <Picky
                                value={this.state.selectedPlantOptions}
                                options={this.getPlantTypesDropDownOptions()}
                                onChange={(val) => this.selectMultipleOption(val)}
                                open={false}
                                valueKey="id"
                                labelKey="name"
                                multiple={true}
                                includeSelectAll={true}
                                includeFilter={true}
                                dropdownHeight={250}
                                filterPlaceholder="Search"
                                filterPlaceholder="Search"
                            />
                        </Col> */}
                        <Col xs={1} style={{ maxWidth: "5%" }}>
                            <Form.Label>From:</Form.Label>
                        </Col>
                        <Col xs={2} style={{ maxWidth: "20%" }} >
                            <Form.Control name="fromDate" type="date" onChange={(item) => this.handleChangeFromDate(item)} value={this.state.selectedFromDate} />
                        </Col>
                        <Col xs={1} style={{ maxWidth: "5%" }}>
                            <Form.Label>To:</Form.Label>
                        </Col>
                        <Col xs={2} style={{ maxWidth: "20%" }} >
                            <Form.Control name="toDate" type="date" onChange={(item) => this.handleChangeToDate(item)} value={this.state.selectedToDate} />
                        </Col>
                        <Col xs={2} style={{ maxWidth: "7%" }}>
                            <button type="button" className="btn btn-orange" onClick={() => this.getRenderModuleCleaning()}>
                                Go
                        </button>
                        </Col>
                    </div>
                </div>
                <div>
                    <p className="message success" style={{ marginTop: "15px" }}>{this.props.displayMessage}</p>
                </div>
                <div
                    style={{
                            height: '500px',
                            maxWidth:"1222px",
		                    margin:"auto"
                        }}
                    className="ag-theme-material">
                    <AgGridReact
                        //gridOptions={this.state.gridOptions}
                        columnDefs={this.createColumnDefs()}
                        rowData={this.state.moduleCleaningAnalysis}
                        //context={this.state.context}
                        context={{ componentParent: this }}
                        onGridReady={this.onGridReady}
                        >
                    </AgGridReact>
                    <Modal id="moduleCleaningAnalysis" show={this.state.commGF} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                                {/* <Modal.Header closeButton> */}
                                    <Modal.Title>Module Cleaning Analysis</Modal.Title>
                                {/* </Modal.Header> */}
                                <Modal.Body>
                                <Row>
                                    <Col>
                                    <Form.Label>Cleaned Energy</Form.Label>
                                    {/* </Col>
                                    <Col> */}
                                    <Form.Control name="cleanedEnergy" type="text" onChange={(item) => this.handleChange(item, "cleanedEnergy")} value={this.state.postData.cleanedEnergy} pattern="^-?[0-9]\d*\.?\d*$" />
                                    </Col>
                                    <Col>
                                    <Form.Label>UnCleaned Energy</Form.Label>
                                    {/* </Col>
                                    <Col> */}
                                    <Form.Control name="uncleanedEnergy" type="text" onChange={(item) => this.handleChange(item,"uncleanedEnergy")} value={this.state.postData.uncleanedEnergy} pattern="^-?[0-9]\d*\.?\d*$" />
                                    </Col>
                                    </Row>
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
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        plantsByType: state.plants.plantsByType,
        plantTypes:state.projectTypes.plantTypes,
        plants: state.plants.plants,
        moduleAnalysisCleaningPlantID: state.plants.moduleAnalysisCleaningPlantID,
        moduleCleaningAnalysis: state.mcAnalysisReducer.moduleCleaningAnalysis,
        displayMessage: state.moduleCleaningReducer.displayMessage,
        plantType: [{displayText: "Select Plant Type" , value: "-1"}, {displayText: "GROUNDMOUNT" , value: "GROUNDMOUNT"},{displayText: "ROOFTOP" , value: "ROOFTOP"}]
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      getPlantByType: (plantsByType) => dispatch(getPlantByType(plantsByType)),
      getAllPlants: () => dispatch(getAllPlants()),
      getModuleCleaningByPlantId: (moduleAnalysisCleaningPlantID,plantName,plant_type) => dispatch(getModuleCleaningByPlantId(moduleAnalysisCleaningPlantID,plantName,plant_type)),
      getModuleCleaningAnalysisDataByDate: (plantId) => dispatch(getModuleCleaningAnalysisDataByDate(plantId)),
      clearModuleAnalysisData: () => dispatch(clearModuleAnalysisData()),
      createOrUpdateModuleCleaningAnalysis: (data) => dispatch(createOrUpdateModuleCleaningAnalysis(data))
    }
  }

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ModuleCleaningAnalysis));

