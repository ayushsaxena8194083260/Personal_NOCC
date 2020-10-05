import React, { Component } from 'react'
// import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
// import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import {AgGridReact} from "ag-grid-react"
import Picky from 'react-picky';
import 'react-picky/dist/picky.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import '../../styles/plant/plantFaultData.scss';
import DropDown from "../Common/DropDown";


class ActionCellRenderer extends React.Component {
    constructor(props) {
        super(props);
        this.invokeDelete = this.invokeDelete.bind(this);
    }

    invokeDelete() {
        this.props.context.componentParent.onDelete(this.props.node.data.lenderDetailId);
    }
    render() {
        return (<div className="products-actions">
            <Link className="products-actions-link"
                to={{
                    pathname: "/AddEditBudgetDetail",
                    BudgetDetailRowData: this.props.data
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

class BudgetDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedPlantType: null,
            selectedProjectTypes: null,
            selectedYear: null,
            projectTypes: this.props.projectTypes,
            plantTypes: this.props.plantTypes,
            plantFault: this.props.plantFault,
            budgetDetails : this.props.budgetDetails,
            selectedPlantOptions: [],
            showRow : false
        };
        this.selectMultipleOption = this.selectMultipleOption.bind(this);
    }

    componentDidMount() {
        // this.props.clearPlantFaultData();
        // document.title = 'Plant Fault Data';
    }
    componentDidUpdate() {
        //this.props.getProjectNames(this.state.selectedValue);
    }

    handleChangePlantType(event) {
        const selectedValue = event.target.value;
        if(selectedValue !== this.state.selectedPlantType){
        this.props.getProjectsByPlantType(selectedValue);

        this.setState({ selectedPlantType: selectedValue,selectedProjectTypes:null,selectedPlantOptions:[], showRow: false, selectedYear : null  });
        }
        //console.log(selectedValue)
    }

    handleChangePlantFault(event) {
        const plantId = event.target.value;
        this.setState({ plantId });
        //console.log(plantId)
    }
    jmrGen(jmrGenValue){
        let _jmrGenValue = null;
        if (jmrGenValue === null){
            _jmrGenValue = "0.00";
        } else {
            _jmrGenValue = jmrGenValue;
        }
        return _jmrGenValue;
    }
    Gen(GenValue){
        let _GenValue = null;
        if (GenValue === null){
            _GenValue = "0.00";
        } else {
            _GenValue = GenValue;
        }
        return _GenValue;
    }
        techLoss(techLossValue){
        let _techLossValue = null;
        if (techLossValue === null){
            _techLossValue = "0.00%";
            return _techLossValue;
        } else {
            _techLossValue = techLossValue*100;
            return _techLossValue.toFixed(2)+"%";
        }

    }
    gridOutLoss(gridLoss){
        let _gridOutLoss = null;
        if (gridLoss === null){
            _gridOutLoss = "0.00%";
            return _gridOutLoss;
        } else {
            _gridOutLoss = gridLoss*100;
            return _gridOutLoss.toFixed(2)+"%";
        }

    }
    temp(tempValue){
        let _tempValue = null;
        if (tempValue === null){
            _tempValue = "0.00%";
            return _tempValue;
        } else {
            _tempValue = tempValue*100;
            return _tempValue.toFixed(2)+"%";
        }


    }
    improvedPPA(impPPA){
        let _impPPA = null;
        if (impPPA === null){
            _impPPA = "0.00%";
            return _impPPA;
        } else {
            _impPPA = impPPA*100;
            return _impPPA.toFixed(2)+"%";
        }


    }
    bdcPLF(bdcplf){
        let _bdcplf = null;
        if (bdcplf === null){
            _bdcplf = "0.00%";
            return _bdcplf;
        } else {
            _bdcplf = bdcplf*100;
            return _bdcplf.toFixed(2)+"%";
        }


    }
    getRenderPlantFault() { 

        let plantIds = [];
//<<<<<<< Updated upstream
        this.state.selectedPlantOptions && this.state.selectedPlantOptions.length > 0 && this.state.selectedPlantOptions.map((item) => { plantIds.push(item.id) });
        plantIds.length > 0 && this.props.getBudgetDataByYearPlantIds({ plantIds: plantIds, year: this.state.selectedYear });
        this.setState({ showRow : true });
        // let plantIds = [];
        // let plantNames = [];
        // let monthNames = [
        //     'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        // ];

        // this.state.selectedPlantOptions && this.state.selectedPlantOptions.length > 0 && this.state.selectedPlantOptions.map((item) => { plantIds.push(item.id) });
        // this.state.selectedPlantOptions && this.state.selectedPlantOptions.length > 0 && this.state.selectedPlantOptions.map((item) => { plantNames.push(item.name) });
        // if(this.state.lenderDetailsByYearPlantIds !== undefined){
        //     const stateDup = this.state;

        //     stateDup.lenderDetailsByYearPlantIds = stateDup.lenderDetailsByYearPlantIds.filter(details => details.type === 'Budget');

        //     for(var i=0;i<stateDup.lenderDetailsByYearPlantIds.length;i++){
        //         for(var j=0;j<plantIds.length;j++){
        //         if(stateDup.lenderDetailsByYearPlantIds[i].plantId === plantIds[j]){
        //             stateDup.lenderDetailsByYearPlantIds[i]["plant_name"]=plantNames[j];
        //             stateDup.lenderDetailsByYearPlantIds[i]["no_of_days"]= new Date(stateDup.lenderDetailsByYearPlantIds[i].month,stateDup.lenderDetailsByYearPlantIds[i].year,0).getDate();
        //             stateDup.lenderDetailsByYearPlantIds[i]["monthYearFormat"]=monthNames[stateDup.lenderDetailsByYearPlantIds[i].month-1]+"'"+stateDup.lenderDetailsByYearPlantIds[i].year;
        //             stateDup.lenderDetailsByYearPlantIds[i]["plant_type"]=stateDup.selectedPlantType;
        //             stateDup.lenderDetailsByYearPlantIds[i]["jmr_days"]=stateDup.lenderDetailsByYearPlantIds[i].no_of_days;
        //             stateDup.lenderDetailsByYearPlantIds[i]["technicalLoss1"]=this.techLoss(stateDup.lenderDetailsByYearPlantIds[i].technicalLoss);
        //             stateDup.lenderDetailsByYearPlantIds[i]["gridOutageLoss1"]=this.gridOutLoss(stateDup.lenderDetailsByYearPlantIds[i].gridOutageLoss);
        //             stateDup.lenderDetailsByYearPlantIds[i]["temperature1"]=this.temp(stateDup.lenderDetailsByYearPlantIds[i].temperature);
        //             stateDup.lenderDetailsByYearPlantIds[i]["generation1"]=this.Gen(stateDup.lenderDetailsByYearPlantIds[i].generation);
        //             stateDup.lenderDetailsByYearPlantIds[i]["jmr_generation1"]=this.jmrGen(stateDup.lenderDetailsByYearPlantIds[i].generation_jmr);
        //             stateDup.lenderDetailsByYearPlantIds[i]["improvedPpa1"]=this.improvedPPA(stateDup.lenderDetailsByYearPlantIds[i].improvedPpa);
        //             stateDup.lenderDetailsByYearPlantIds[i]["bDcPlf1"]=this.bdcPLF(stateDup.lenderDetailsByYearPlantIds[i].bDcPlf);
        //         }
        //         }
        //     }
        //     stateDup.budgetDetails = stateDup.lenderDetailsByYearPlantIds;
        //     stateDup.showRow = true;
        //     // stateDup.allAOPBudgetDetails.map((detail)=>{
        //     //     if(detail.plant_id)
        //     //     detail[plant_name] =
        //     // })
        //     this.setState({ stateDup });
        // }


    }

    handleChangeProjectTypes(event) {
        const selectedValue = event.target.value;
        this.props.getPlantByProjectId(selectedValue);
        this.setState({ selectedProjectTypes: selectedValue, showRow : false, selectedPlantOptions: [], selectedYear : null });
    }

    handleChangeYear(event) {
        const selectedYear = event.target.value;
        let plantIds = [];
        //this.props.getAllLenderDetailsData();
        this.state.selectedPlantOptions && this.state.selectedPlantOptions.length > 0 && this.state.selectedPlantOptions.map((item) => { plantIds.push(item.id) });
        let yearPlantIds = {
            "plantIds" : plantIds,
            "year" : event.target.value
        }
        this.props.getLenderDataByYearPlantIds(yearPlantIds);
        this.setState({ selectedYear, showRow : false, lenderDetailsByYearPlantIds : this.props.allLenderDetailsByYearPlantIds });
    }

    selectOption(value) {
        console.log("Vals", value);
        this.setState({ value });
    }

    selectMultipleOption(value) {
        this.setState({ selectedPlantOptions: value, showRow : false, selectedYear : null });
    }

    onDelete(lenderDetailid) {
        let isConfirm = window.confirm("Are you sure want to delete this Budget detail data?");
        if (isConfirm)
            this.props.deleteLenderDetailData(lenderDetailid);
            alert('Budget detail has been deleted successfully');
    }

    createColumnDefs() {
        return [
            {
                headerName: "Plant Name", field: "plant_name", cellClass: 'cell-wrap',
                autoHeight: true, width: 120, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Month", field: "monthYearFormat", cellClass: 'cell-wrap',
                autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "No of Days", field: "no_of_days", cellClass: 'cell-wrap',
                autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "JMR Days", field: "jmr_days", cellClass: 'cell-wrap',
                autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Technical Loss", field: "technicalLoss1", cellClass: 'cell-wrap',
                autoHeight: true, width: 90, cellStyle: { 'white-space': 'normal', 'background-color': 'rgb(204, 255, 255)'}
            },
            {
                headerName: "Grid Outage Loss", field: "gridOutageLoss1", cellClass: 'cell-wrap',
                autoHeight: true, width: 120, cellStyle: { 'white-space': 'normal', 'background-color': 'rgb(204, 255, 255)'}
            },
            {
                headerName: "Temperature Loss", field: "temperature1", cellClass: 'cell-wrap',
                autoHeight: true, width: 110, cellStyle: { 'white-space': 'normal', 'background-color': 'rgb(204, 255, 255)'}
            },
            {
                headerName: "Improved Generation", field: "generation1", cellClass: 'cell-wrap',
                autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal','background-color':'bisque' }
            },
            {
                headerName: "JMR Generation", field: "jmr_generation1", cellClass: 'cell-wrap',
                autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal','background-color':'bisque' }
            },
            {
                headerName: "Improved PPA PLF", field: "improvedPpa1", cellClass: 'cell-wrap',
                autoHeight: true, width: 90, cellStyle: { 'white-space': 'normal','background-color':'bisque' }
            },
            {
                headerName: "DC PLF", field: "bDcPlf1", cellClass: 'cell-wrap',
                autoHeight: true, width: 90, cellStyle: { 'white-space': 'normal','background-color':'bisque' }
            },
            {
                headerName: "Action",
                field: '',
                cellRendererFramework: ActionCellRenderer,
                width: 100,
            }
        ];
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== null) {
            this.setState({
                projectTypes: nextProps.projectTypes,
                plantTypes: nextProps.plantTypes,
                plantFault: nextProps.plantFault,
                lenderDetailsByYearPlantIds : nextProps.allLenderDetailsByYearPlantIds,
                budgetDetails : nextProps.budgetDetails
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
            projectName.push({ displayText: item.project_name, value: item.project_id })
        });

        return projectName;
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

        return (
            <div>
                <div className="top-filter">
                    <div className="row" style={{ alignItems: "center", margin: "0" }} >
                        <Col xs={1} style={{ maxWidth: "5%" }}>
                            <Form.Label>Type:</Form.Label>
                        </Col>
                        <Col style={{ maxWidth: "15%" }}>
                            <DropDown
                                className="top-search-input form-control"
                                Name="plantType"
                                itemSource={this.props.plantType}
                                value={this.state.selectedPlantType}
                                handleChange={(item) => this.handleChangePlantType(item)}
                            />
                        </Col>
                        <Col xs={1} style={{ maxWidth: "5%" }}>
                            <Form.Label>Project:</Form.Label>
                        </Col>
                        <Col style={{ maxWidth: "15%" }}>
                        <select required class="form-control" type="dropdown" Name="plantName" onChange={(item) => this.handleChangeProjectTypes(item)} >
                        value={this.state.selectedProjectTypes}
                        <option>Select Project Type</option>
                        {/* <option>{this.state.plans[0].plant_name}</option> */}
                        {this.props.projectTypes === undefined?<option>default</option>:this.props.projectTypes.map((project, key) => <option key={project.projectId}>{project.projectName}</option>)}
                        </select>
                        </Col>
                        <Col xs={1} style={{ maxWidth: "5%" }}>
                            <Form.Label>Plant:</Form.Label>
                        </Col>
                        <Col style={{ maxWidth: "15%" }}>
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
                        <Col xs={1} style={{ maxWidth: "5%" }}>
                            <Form.Label>Year:</Form.Label>
                        </Col>
                        <Col style={{ maxWidth: "15%" }} >
                            <DropDown
                                className="top-search-input form-control"
                                Name="year"
                                itemSource={this.getDropDownYear()}
                                value={this.state.selectedYear}
                                handleChange={(item) => this.handleChangeYear(item)}
                            />
                        </Col>
                        <Col xs={2} style={{ maxWidth: "6%" }}>
                            <button type="button" className="btn btn-orange"  style={{ width: "100%",minWidth:"50px" }} onClick={() => this.getRenderPlantFault()}>
                                Go
                        </button>
                        </Col>
                        {/* UploadAopBudgetDetail */}
                        <Col xs={2} style={{ maxWidth: "10%" }}>
                            <Route render={({ history }) => (
                                <button type="button" className="btn btn-primary" style={{ width: "100%" }} onClick={() => { history.push('/UploadBudgetDetail') }}>
                                    <img src="/images/icons/fugue/plus-circle.png" alt="Upload" title="Upload" style={{ float: "left", marginRight: "3" }} />
                                    Upload
                                </button>)} />
                        </Col>
                        <Col xs={2} style={{ maxWidth: "15%" }}>
                            <Route render={({ history }) => (
                                <button type="button" className="btn btn-primary" style={{ width: "100%" }} onClick={() => { history.push('/AddEditBudgetDetail') }}>
                                    <img src="/images/icons/fugue/plus-circle.png" alt="add Budget Details" title="Add Budget Details" style={{ float: "left", marginRight: "3" }} />
                                    Add Budget Details
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
                            rowData={this.state.showRow === false?'':this.state.budgetDetails}
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
export default BudgetDetail;
