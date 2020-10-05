import React, { Component } from 'react'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import {AgGridReact} from "ag-grid-react"
import Picky from 'react-picky';
import 'react-picky/dist/picky.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import '../../styles/plant/plantFaultData.scss';
import DropDown from "../Common/DropDown";
import { getProjectNames } from "../../actions/PlantFaultDataActions";
import { getPlantByProjectId } from "../../actions/PlantFaultDataActions";
import { getPlantFaultDataByPlantId } from "../../actions/PlantFaultDataActions";
// import { deletePlantFaultData } from "../../actions/PlantFaultDataActions";
import {clearPlantDailyGeneration} from "../../actions/plantGenerationActions";
import { withRouter } from 'react-router-dom';
import PlantGenerationAddMonth from './PlantGenerationMonthAdd';
import PlantGenerationUploadMonth from './PlantGenerationUploadMonth';
import {getDailyPlantActualGenerationMonthly, deletePlantGen} from "../../actions/plantGenerationActions";
import ModelPopUp from '../Common/ModelPopUp';
import { Color } from 'ag-grid-community';

// const rowIndex = (params) => params.node.rowIndex + 1;

class ActionCellRenderer extends React.Component {
    constructor(props) {
        super(props);
        this.invokeDelete = this.invokeDelete.bind(this);
        this.invokeEdit = this.invokeEdit.bind(this);
    }
    invokeEdit(){
        this.props.context.componentParent.editPlantGeneration(this.props.node.data);
    }
    invokeDelete() {
        this.props.context.componentParent.onDelete(this.props.node.data.plantGenerationId);
    }
    render() {
        return (<div className="products-actions">
            <Link to="#" onClick = {()=> this.invokeEdit()} title="Edit">
                <img src="https://nocc.azurepower.com/images/editIcon.png" alt="Edit" />
            </Link>
            <Link to="#" onClick={this.invokeDelete} title="Delete" >
                <img src="https://nocc.azurepower.com/images/cross-circle.png" alt="Delete" />
            </Link>
        </div>);
    }
}

class MonthlyGeneration extends Component {

    constructor(props) {
        super(props);
        this.state = {
            plfType: this.props.plfType,
            selectedPlfType: null,
            selectedCurrencyType: null,
            lgShow: false,
            uploadShow: false,
            selectedFromDate: null,
            selectedToDate: null,
            plantDailyGen: this.props.plantDailyGen,
            gridOptions: this.createGridOptions(),
            selectedPlantType: null,
            selectedProjectTypes: null,
            selectedYear: null,
            projectTypes: this.props.projectTypes,
            plantTypes: this.props.plantTypes,
            plantFault: this.props.plantFault,
            selectedPlantOptions: [],
            showPopUp: false,
            deleteID: null,
            plant_id:'',
            plants: [],
            selectedPlant: "",
            fromDate:'',
            toDate:'',
            value: null,
            context: { componentParent: this },
            suppressHorizontalScroll:true,
            gridRefersh: true
        };
        this.selectMultipleOption = this.selectMultipleOption.bind(this);
    }

    // PlantGeneration(lgShowValue){
	// 	this.setState({
	// 		...this.state,
	// 		lgShow:lgShowValue
	// 	})
    // }
    PlantGenerationUpload(uploadShowValue){
		this.setState({
			...this.state,
			uploadShow:uploadShowValue
		})
	}
    handleChangeFromDate(event) {
        let fromDate = event.target.value;
        this.setState({ selectedFromDate: fromDate});
    }

    handleChangeToDate(event) {
        let toDate = event.target.value;
        this.setState({ selectedToDate: toDate});
    }
    componentDidMount() {
        this.props.clearPlantDailyGeneration();
        // document.title = 'Plant Fault Data';
    }

    componentDidUpdate() {
        this.state.gridRefersh === false && this.setState({ gridRefersh: true });
    }

    handleChangePLFType(event) {
        const selectedValue = event.target.value;
        this.setState({ selectedPlfType: selectedValue, gridOptions: this.createGridwithOptions(selectedValue, this.state.selectedCurrencyType) });
    }

    handleChangeCurrencyType(event) {
        const selectedValue = event.target.value;
        this.setState({ selectedCurrencyType: selectedValue, gridOptions: this.createGridwithOptions(this.state.selectedPlfType, selectedValue) });
    }

    editPlantGeneration(data) {
        this.invokeActualGeneration(data);
    }
    invokeActualGeneration(data={}) {
        this.PlantGeneration(true, data);

    }
    PlantGeneration(lgShowValue, data) {
        this.setState({
            ...this.state,
            lgShow: lgShowValue,
            postData:data
        })
    }

    handleChangePlant(event) {
        const selectedValue = event.target.value;
    }

    handleChangePlantType(event) {
        const selectedValue = event.target.value;
        if (selectedValue !== this.state.selectedPlantType) {
            this.props.getProjectNames(selectedValue);
            this.setState({ selectedPlantType: selectedValue, selectedProjectTypes: null, selectedPlantOptions: [] });
        }
    }
    getRenderDailyGeneration() {
        let plantIds = [];
        let dataFlag = 0;
        this.setState({gridRefersh:false});
        this.state.selectedPlantOptions && this.state.selectedPlantOptions.length > 0 && this.state.selectedPlantOptions.map((item) => { plantIds.push(item.id) });
        plantIds.length > 0 && this.props.getDailyPlantActualGenerationMonthly({ plantIds: plantIds, fromDate: this.state.selectedFromDate, toDate: this.state.selectedToDate, dataFlag: 1, plfType: this.state.selectedPlfType===null?'AC Capacity':this.state.selectedPlfType, ruppee: this.state.selectedCurrencyType });
    }

    onGridReady = (params) => {
        params.api.setHeaderHeight(70);
    }
    handleChangeProjectTypes(event) {
        const selectedValue = event.target.value;
        this.props.getPlantByProjectId(selectedValue);
        this.setState({ selectedProjectTypes: selectedValue });
    }

    getDropDownProjectTypes() {
        let projectName = [];
        projectName.push({ displayText: "Select Project", value: "0" })
        this.state.projectTypes && this.state.projectTypes.map((item) => {
            projectName.push({ displayText: item.projectName, value: item.projectId })
        });

        return projectName;
    }

    getDropDownPlfType() {
        let plfType = [];
        this.props.plfType && this.props.plfType.map((item) => {
            plfType.push({ displayText: item.name, value: item.value })
        });

        return plfType;
    }

    getDropDownCurrencyType() {
        let currencyType = [];
        this.props.currencyType && this.props.currencyType.map((item) => {
            currencyType.push({ displayText: item.name, value: item.value })
        });

        return currencyType;
    }

    getPlantTypesDropDownOptions() {
        const options = this.state.plantTypes && this.state.plantTypes.map((plantTypes, key) => { return { id: plantTypes.plantId, name: plantTypes.plantName } });
        return options;
    }

    selectMultipleOption(value) {
        if (value) {
            this.setState({ selectedPlantOptions: value });
        }
    }

    onDelete(_id) {
        this.setState({ showPopUp: true, deleteID: _id });

    }

    onHide() {
        this.setState({ showPopUp: false, deleteID: null });
    }

    ModalClose() {
        this.setState({ commGF: false });
    }
    deleteRecord() {
        if (this.state.deleteID !== null) {
            this.props.deletePlantGen(this.state.deleteID);
            this.onHide();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== null) {
            this.setState({
                projectTypes: nextProps.projectTypes,
                plantTypes: nextProps.plantTypes,
                plantDailyGen: nextProps.plantDailyGen,
                displayMessage: nextProps.displayMessage
            })
        }
    }
    getDropDownYear() {
        return this.props.years && this.props.years.map((item) => { return { displayText: item, value: item } });
    }

    handleChange(event) {
        const stateDup = this.state;
        stateDup[event.target.name] = event.target.value;
        this.setState({ stateDup });

    }
    handleChangeYear(event) {
        const selectedYear = event.target.value;
        this.setState({ selectedYear });
    }
    createGridwithOptions(plf, currency){
        return{
            columnDefs:[
                {
                    headerName: "Plant", field: "plantName", cellClass: 'cell-wrap',
                    autoHeight: true, width: 54, cellStyle: { 'white-space': 'normal' }
                },
                {
                    headerName: "Date", field: "date", cellClass: 'cell-wrap',
                    autoHeight: true, width: 80, cellStyle: { 'white-space': 'normal' }
                },
                {
                    headerName: plf === null ? "PLF(AC)" : plf === "AC Capacity" ? "PLF(AC)" : "PLF(DC)", field: "plfAC", cellClass: 'cell-wrap',
                    autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
                },
                {
                    headerName: "PR", field: "pr", cellClass: 'cell-wrap',
                    autoHeight: true, width: 50, cellStyle: { 'white-space': 'normal' }
                },{
                    headerName: "Export", field: "export", cellClass: 'cell-wrap',
                    autoHeight: true, width: 70, cellStyle: { 'white-space': 'normal' }
                },
                {
                    headerName: "Import", field: "importData", cellClass: 'cell-wrap',
                    autoHeight: true, width: 70, cellStyle: { 'white-space': 'normal' }
                },
                {
                    headerName: "Net Generation", field: "netGeneration", cellClass: 'cell-wrap',
                    autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
                },
                {
                    headerName: "Grid Outage", field: "totalGridOutage", cellClass: 'cell-wrap',
                    autoHeight: true, width: 80, cellStyle: { 'white-space': 'normal' }
                },
                {
                    headerName: "Jmr Date", field: "jmrDate", cellClass: 'cell-wrap',
                    autoHeight: true, width: 80, cellStyle: { 'white-space': 'normal' }
                },
                {
                    headerName: "Total Days", field: "ndays", cellClass: 'cell-wrap',
                    autoHeight: true, width: 80, cellStyle: { 'white-space': 'normal' }
                },
                {
                    headerName: "Source", field: "source", cellClass: 'cell-wrap',
                    autoHeight: true, width: 80, cellStyle: { 'white-space': 'normal' }
                },
                {
                    headerName: currency === null? "Revenue(Mn INR)" : currency === "INR" ? "Revenue(Mn INR)" : "Revenue(Mn USD)", field: "revenue", cellClass: 'cell-wrap',
                    autoHeight: true, width: 63, cellStyle: { 'white-space': 'normal' }
                },
                {
                    headerName: "Action",
                    field: '',
                    cellRendererFramework: ActionCellRenderer,
                    cellRendererParams:{
                        lgShow:this.lgShow,
                        uploadShow:this.uploadShow
                    },
                    width: 100,
                }
            ],
            suppressHorizontalScroll:false
        };
    }

    createGridOptions() {
        return {
            columnDefs: [
                {
                    headerName: "Plant", field: "plantName", cellClass: 'cell-wrap',
                    autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
                },
                {
                    headerName: "Date", field: "date", cellClass: 'cell-wrap',
                    autoHeight: true, width: 80, cellStyle: { 'white-space': 'normal' }
                },
                {
                    headerName: "PLF(AC)", field: "plfAC", cellClass: 'cell-wrap',
                    autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
                },
                {
                    headerName: "PR", field: "pr", cellClass: 'cell-wrap',
                    autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
                },{
                    headerName: "Export", field: "export", cellClass: 'cell-wrap',
                    autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
                },
                {
                    headerName: "Import", field: "importData", cellClass: 'cell-wrap',
                    autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
                },
                {
                    headerName: "Net Generation", field: "netGeneration", cellClass: 'cell-wrap',
                    autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
                },
                {
                    headerName: "Grid Outage", field: "totalGridOutage", cellClass: 'cell-wrap',
                    autoHeight: true, width: 110, cellStyle: { 'white-space': 'normal' }
                },
                {
                    headerName: "JMR Date", field: "jmrDate", cellClass: 'cell-wrap',
                    autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
                },
                {
                    headerName: "Total Days", field: "ndays", cellClass: 'cell-wrap',
                    autoHeight: true, width: 80, cellStyle: { 'white-space': 'normal' }
                },
                {
                    headerName: "Source", field: "source", cellClass: 'cell-wrap',
                    autoHeight: true, width: 80, cellStyle: { 'white-space': 'normal' }
                },
                {
                    headerName: "Revenue(Mn INR)", field: "revenue", cellClass: 'cell-wrap',
                    autoHeight: true, width: 63, cellStyle: { 'white-space': 'normal' }
                },
                {
                    headerName: "Action",
                    field: '',
                    cellRendererFramework: ActionCellRenderer,
                    cellRendererParams: {
                        lgShow: this.lgShow,
                        uploadShow: this.uploadShow
                    },
                    width: 100,
                }
            ],
            suppressHorizontalScroll: false
        };
    }

    // createGridOptions() {
    //     return {
    //         columnDefs: [
    //             {
    //                 headerName: "Plant", field: "plantName", cellClass: 'cell-wrap',
    //                 autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
    //             },
    //             {
    //                 headerName: "Date", field: "date", cellClass: 'cell-wrap',
    //                 autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
    //             },
    //             {
    //                 headerName: "Connected Capacity", field: "connectedCapacity", cellClass: 'cell-wrap',
    //                 autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
    //             },

    //             {
    //                 headerName: "Pyranometer Tilt", field: "pyranometerTilt", cellClass: 'cell-wrap',
    //                 autoHeight: true, width: 110, cellStyle: { 'white-space': 'normal' }
    //             },
    //             {
    //                 headerName: "Plant Tilt", field: "tilt", cellClass: 'cell-wrap',
    //                 autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
    //             },
    //             {
    //                 headerName: "PLF(AC)", field: "plfAC", cellClass: 'cell-wrap',
    //                 autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
    //             },
    //             {
    //                 headerName: "PR", field: "pr", cellClass: 'cell-wrap',
    //                 autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
    //             }, {
    //                 headerName: "Export", field: "export", cellClass: 'cell-wrap',
    //                 autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
    //             },
    //             {
    //                 headerName: "Import", field: "importData", cellClass: 'cell-wrap',
    //                 autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
    //             },
    //             {
    //                 headerName: "Net Generation", field: "netGeneration", cellClass: 'cell-wrap',
    //                 autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
    //             },
    //             {
    //                 headerName: "Revenue(Mn INR)", field: "revenue", cellClass: 'cell-wrap',
    //                 autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
    //             },
    //             {
    //                 headerName: "Action",
    //                 field: '',
    //                 cellRendererFramework: ActionCellRenderer,
    //                 cellRendererParams: {
    //                     lgShow: this.lgShow,
    //                     uploadShow: this.uploadShow
    //                 },
    //                 width: 100,
    //             }
    //         ],
    //         suppressHorizontalScroll: false
    //     };
    // }

    // invokeActualGeneration(data={}) {
    //     this.PlantGeneration(true, data);

    // }
    invokeUploadGeneration() {
        const uploadShow = true;
        this.PlantGenerationUpload(uploadShow);
    }
    // pinnedTopRowData(){ return [
    //     {
    //         plantName: "Total",
    //         importData: this.props.totalResult && this.props.totalResult.importData?this.props.totalResult.importData:0,
    //         export: this.props.totalResult &&this.props.totalResult.exportData? this.props.totalResult.exportData : 0,
    //         netGeneration: this.props.totalResult && this.props.totalResult.netGeneration? this.props.totalResult.netGeneration :0,
    //         revenue: this.props.totalResult && this.props.totalResult.revenue? this.props.totalResult.revenue : 0
    //     }
    //   ]}

    //   handleChangePlant(event) {
    //     const selectedValue = event.target.value;
    // }

    // handleChangePlantType(event) {
    //     const selectedValue = event.target.value;
    //     if (selectedValue !== this.state.selectedPlantType) {
    //         this.props.getProjectNames(selectedValue);

    //         this.setState({ selectedPlantType: selectedValue, selectedProjectTypes: null, selectedPlantOptions: [] });
    //     }
    // }
    // getDropDownPlfType() {
    //     let plfType = [];
    //     this.props.plfType && this.props.plfType.map((item) => {
    //         plfType.push({ displayText: item.name, value: item.value })
    //     });

    //     return plfType;
    // }

    // getDropDownCurrencyType() {
    //     let currencyType = [];
    //     this.props.currencyType && this.props.currencyType.map((item) => {
    //         currencyType.push({ displayText: item.name, value: item.value })
    //     });

    //     return currencyType;
    // }

    // getDropDownYear() {
    //     return this.props.years && this.props.years.map((item) => { return { displayText: item, value: item } });
    // }
    // handleChangeYear(event) {
    //     const selectedYear = event.target.value;
    //     this.setState({ selectedYear });
    // }

    getRenderMonthlyGeneration(){
        let plantIds = [];
        // let dataFlag = 0;
        this.setState({gridRefersh:false});
        this.state.selectedPlantOptions && this.state.selectedPlantOptions.length > 0 && this.state.selectedPlantOptions.map((item) => { plantIds.push(item.id) });
        plantIds.length > 0 && this.props.getDailyPlantActualGenerationMonthly({ plantIds: plantIds, fromDate:`${this.state.selectedYear.split('-')[0]}-04-01`,toDate:`${this.state.selectedYear.split('-')[1]}-03-31`, dataFlag: 2,plfType: this.state.selectedPlfType===null?'AC Capacity':this.state.selectedPlfType, ruppee: this.state.selectedCurrencyType });
    }

    // onGridReady = (params) => {
    //     params.api.setHeaderHeight(70);
    // }
    // handleChangeProjectTypes(event) {
    //     const selectedValue = event.target.value;
    //     this.props.getPlantByProjectId(selectedValue);
    //     this.setState({ selectedProjectTypes: selectedValue });
    // }

    // getDropDownProjectTypes() {
    //     let projectName = [];
    //     projectName.push({ displayText: "Select Project", value: "0" })
    //     this.state.projectTypes && this.state.projectTypes.map((item) => {
    //         projectName.push({ displayText: item.projectName, value: item.projectId })
    //     });

    //     return projectName;
    // }

    // getPlantTypesDropDownOptions() {
    //     const options = this.state.plantTypes && this.state.plantTypes.map((plantTypes, key) => { return { id: plantTypes.plantId, name: plantTypes.plantName } });
    //     return options;
    // }

    // selectMultipleOption(value) {
    //     if (value) {
    //         this.setState({ selectedPlantOptions: value });
    //     }
    // }

    // onDelete(_id) {
    //     this.setState({ showPopUp: true, deleteID: _id });

    // }

    // onHide() {
    //     this.setState({ showPopUp: false, deleteID: null });
    // }

    // ModalClose() {
    //     this.setState({ commGF: false });
    // }
    // deleteRecord() {
    //     if (this.state.deleteID !== null) {
    //         this.props.deletePlantGen(this.state.deleteID);
    //         this.onHide();
    //     }
    // }

    // componentWillReceiveProps(nextProps) {
    //     if (nextProps !== null) {
    //         this.setState({
    //             projectTypes: nextProps.projectTypes,
    //             plantTypes: nextProps.plantTypes,
    //             plantDailyGen: nextProps.plantDailyGen
    //         })
    //     }
    // }

    // handleChangePlant(event) {
    //     if(event.target.name === "plant_type" ){
    //         const stateDup = this.state;
    //         stateDup.selectedPlantType = event.target.value;
    //         this.setState({ stateDup });

    //         this.props.getPlantByType(stateDup.selectedPlantType);
    //     }
    //     else{
    //         const stateDup1 = this.state;
    //         let plantsByType = this.props.plantsByType;
    //         stateDup1.selectedPlant = event.target.value;
    //         for(var i=0;i<plantsByType.length;i++){
    //             if(plantsByType[i].plantName === event.target.value){
    //                 stateDup1.plantId = plantsByType[i].plantId;
    //                 break;
    //             }
    //         }

    //         this.setState({stateDup1});

    //         this.props.getPlantTiltByPlantId(stateDup1.plantId,stateDup1.selectedPlant,stateDup1.selectedPlantType);
    //     }
    // }





    // invokeActualGeneration(){
	// 	const lgshow = true;
	// 	this.PlantGeneration(lgshow);
    // }
    // invokeUploadGeneration(){
    //     const uploadShow = true;
	// 	this.PlantGenerationUpload(uploadShow);
    // }
    pinnedTopRowData(){ return [
        {
            plantName: "Total",
            importData: this.props.totalResult && this.props.totalResult.importData?this.props.totalResult.importData:0,
            export: this.props.totalResult &&this.props.totalResult.exportData? this.props.totalResult.exportData : 0,
            netGeneration: this.props.totalResult && this.props.totalResult.netGeneration? this.props.totalResult.netGeneration :0,
            revenue: this.props.totalResult && this.props.totalResult.revenue? this.props.totalResult.revenue : 0
        }
      ]}
    render() {

        const ModalClose = () => {
            this.setState({ lgShow: false });
            this.setState({ uploadShow: false });
            this.setState({ deleteShow: false });
        }
        let placeholder = "Search";
        return (
            <div>
                <div className="top-filter">
                    <div className="row" style={{ alignItems: "center", margin: "0" }} >
                        <Col lg={1} md={1} sm={6} className="small_percent_width">
                            <Form.Label >Type:</Form.Label>
                            </Col>
                            <Col Col lg={3} md={3} sm={6} className="xlarge_percent_width">
                            <DropDown
                                className="top-search-input form-control"
                                Name="plantType"
                                itemSource={this.props.plantType}
                                value={this.state.selectedPlantType}
                                handleChange={(item) => this.handleChangePlantType(item)}
                            />
                        </Col>
                        <Col lg={1} md={1} sm={6} className="small_percent_width">
                            <Form.Label>Project:</Form.Label>
                            </Col>
                            <Col Col lg={3} md={3} sm={6} className="   xlarge_percent_width">
                            <DropDown
                                className="top-search-input form-control"
                                Name="plantName"
                                itemSource={this.getDropDownProjectTypes()}
                                value={this.state.selectedProjectTypes}
                                handleChange={(item) => this.handleChangeProjectTypes(item)}
                            />
                        </Col>
                        <Col lg={1} md={1} sm={6} className="small_percent_width">
                            <Form.Label>Plant:</Form.Label>
                            </Col>
                            <Col Col lg={3} md={3} sm={6} className="xlarge_percent_width">
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
                                defaultFocusFilter={true}
                                filterPlaceholder={placeholder}
                            />                        </Col>
                            
                         <div  className=" col-1 designMargin" style={{marginTop: "65px"}}></div>
                   <Col lg={1} md={1} sm={6} className="small_percent_width">
                            <Form.Label>Year:</Form.Label>
                            </Col>
                            <Col Col lg={3} md={3} sm={6} className="xlarge_percent_width">
                            <DropDown
                                className="top-search-input form-control"
                                Name="year"
                                itemSource={this.getDropDownYear()}
                                value={this.state.selectedYear}
                                handleChange={(item) => this.handleChangeYear(item)}
                            />
                        </Col>
                        <Col lg={1} md={1} sm={6} className="small_percent_width">
                            <Form.Label>PLF Type:</Form.Label>
                            </Col>
                            <Col Col lg={3} md={3} sm={6} className="xlarge_percent_width">
                            <DropDown
                                className="top-search-input form-control"
                                Name="plfType"
                                itemSource={this.getDropDownPlfType()}
                                value={this.state.selectedPlfType}
                                handleChange={(item) => this.handleChangePLFType(item)}
                            />
                        </Col>
                        <Col lg={1} md={1} sm={6} className="small_percent_width">
                            <Form.Label>Currency:</Form.Label>
                            </Col>
                            <Col Col lg={3} md={3} sm={6} className="xlarge_percent_width">
                            <DropDown
                                className="top-search-input form-control"
                                Name="Currency"
                                itemSource={this.getDropDownCurrencyType()}
                                value={this.state.selectedPlfType}
                                handleChange={(item) => this.handleChangeCurrencyType(item)}
                            />
                        </Col>
                        <div  className=" col-1 designMargin" style={{marginTop: "65px"}}></div>

                        <div  className=" col-3 designMargin" style={{marginTop: "65px"}}></div>


        {/* const ModalClose = () => {
            this.setState({lgShow:false});
            this.setState({uploadShow:false});
            this.setState({deleteShow:false});
            }
        let placeholder="Search";
        return (
            <div>
                <div className="top-filter">
                    <div className="row" style={{ alignItems: "center", margin: "0" }} >
                        <Col style={{ padding: "5px" }}>
                            <Form.Label>Type:</Form.Label>
                             <DropDown
                                    className="top-search-input form-control"
                                    Name="plantType"
                                    itemSource={this.props.plantType}
                                    value={this.state.selectedPlantType}
                                    handleChange={(item) => this.handleChangePlantType(item)}
                                />
                            </Col>
                        <Col style={{ padding: "5px" }}>
                            <Form.Label>Project:</Form.Label>
                            <DropDown
                                    className="top-search-input form-control"
                                    Name="plantName"
                                    itemSource={this.getDropDownProjectTypes()}
                                    value={this.state.selectedProjectTypes}
                                    handleChange={(item) => this.handleChangeProjectTypes(item)}
                                />
                        </Col>
                        <Col style={{ padding: "5px" }}>
                            <Form.Label>Plant:</Form.Label>
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
                                    filterPlaceholder={placeholder}
                                />                        </Col>
                            {/* <Col style={{ padding: "5px" }}>
                                <Form.Label>Year:</Form.Label>
                                <DropDown
                                    className="top-search-input form-control"
                                    Name="year"
                                    itemSource={this.getDropDownYear()}
                                    value={this.state.selectedYear}
                                    handleChange={(item) => this.handleChangeYear(item)}
                                />
                            </Col> */}
                        {/* <Col style={{ padding: "5px"}}>
                            <Form.Label>Year:</Form.Label>
                            <select style={{width:"100%"}} required class="form-control" name="plant_id" type="dropdown" name="plant_name" onChange={(item) => this.handleChangePlant(item)} >
                            value={this.state.selectedPlant} plant_name={this.state.selectedPlant}
                            <option>Select Plant</option>
                            {/* <option>{this.state.plans[0].plant_name}</option> */}
                            {/* {this.props.plantsByType === undefined?<option>default</option>:this.props.plantsByType.map((plant, key) => <option key={plant.plant_id}>{plant.plant_name}</option>)}
                        </select> */}
                       {/*} </Col> */}

                        <Col lg={1} md={1} sm={6} className="small_percent_width">
                        <Form.Label></Form.Label>

                            <button type="button"  className="btn btn-orange view_button" onClick={() => this.getRenderMonthlyGeneration()}>
                                Go
                        </button>
                        </Col>
                        <Col  lg={3} md={3} sm={6} className="xlarge_percent_width">

                            <Route render={({ history }) => (
                                <button type="button" className="btn btn-primary view_button" style={{ width: "100%" }} onClick={() => { this.invokeUploadGeneration() }}>
                                    <img src="https://nocc.azurepower.com/images/icons/fugue/arrow-090.png" alt="Upload"/>
                                    Upload Generation
                        </button>)} />
                        </Col>
                        <Col  lg={3} md={3} sm={6} className="xlarge_percent_width">

                            <Route render={({ history }) => (
                                <button type="button" className="btn btn-primary view_button" style={{ width: "100%" }} onClick={() => { this.invokeActualGeneration() }}>
                                    <img src="https://nocc.azurepower.com/images/icons/fugue/plus-circle.png" alt="add actul generation" title="Add Actual Generation" style={{ float: "left", marginRight: "3" }} />
                                    Actual Generation
                        </button>)} />
                        </Col>

                    </div>
                </div>
                <div>
                    <p className="message success" style={{ marginTop: "15px" }}>{this.state.displayMessage}</p>
                </div>
                <div>
                <button type="submit" class="download-button-plant" name="submit" value="submit" title="Download"></button>
                </div>
                <div
                    style={{
                        height: '1000px',
                    }}
                    className="ag-theme-material ag-first-row-color">
                   {this.state.gridRefersh && <AgGridReact
                        gridOptions={this.state.gridOptions}
                        pinnedTopRowData={this.state.plantDailyGen && this.state.plantDailyGen.length > 0? this.pinnedTopRowData():null}
                        rowData={this.state.plantDailyGen}
                        context={this.state.context}
                        onGridReady={this.onGridReady}
                    >
                    </AgGridReact>}
                    {this.state.lgShow && <PlantGenerationAddMonth
                            show={this.state.lgShow}
                            onHide={ModalClose}
                            data={this.state.postData}
                            selectedPlantType={this.state.selectedPlantType}
                            selectedProjectTypes= {this.state.selectedProjectTypes}
                        />}
                    {/* <PlantGenerationAddMonth
			            show={this.state.lgShow}
                        onHide={ModalClose}
		            /> */}
                    <PlantGenerationUploadMonth
			            show={this.state.uploadShow}
                        onHide={ModalClose}
		            />
                        <ModelPopUp title="Delete"
                            id={"plantActualGenDelete"}
                            bodyContent="Are you sure want to delete this Plant Actual Generation?"
                            showPopUp={this.state.showPopUp}
                            secondaryBtnName="No"
                            onSecondaryAction={this.onHide.bind(this)}
                            primaryBtnName="Delete"
                            onPrimaryAction={this.deleteRecord.bind(this)}
                        />
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

function getYearFromToday() {
    let years = [];
    const todayDate = new Date();
    const strYear = todayDate.getFullYear();
    {
        if (strYear) {
            let year = parseInt(strYear) - 5;
            const endYear = parseInt(strYear) + 2;
            let i;
            years.push("Select Year");
            for (i = parseInt(year); i <= endYear; i++) {
                let addoneYear = parseInt(i) + 1;
                years.push(i + "-" + addoneYear);
            }

        }
    }
    return years;
}

const mapStateToProps = state => {
    return {
        projectTypes: state.projectTypes.projectTypes,
        plantTypes: state.projectTypes.plantTypes,
        plantFault: state.projectTypes.plantFault,
        plantDailyGen:state.plantDailyGenerationReducer.plantDailyGen,
        years: getYearFromToday(),
        displayMessage: state.plantDailyGenerationReducer.displayMessage,
        totalResult: state.plantDailyGenerationReducer.totalResult,
        plantType: [{displayText: "Select Plant Type" , value: "-1"}, {displayText: "GROUNDMOUNT" , value: "GROUNDMOUNT"},{displayText: "ROOFTOP" , value: "ROOFTOP"}],
        plfType: [{name: "AC Capacity", value: "AC Capacity"},{name: "DC Capacity", value: "DC Capacity"}],
        currencyType: [{name: "INR", value: "INR"},{name: "USD", value: "USD"}]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProjectNames: (projectTypes) => dispatch(getProjectNames(projectTypes)),
        getPlantByProjectId: (projectId) => dispatch(getPlantByProjectId(projectId)),
        getPlantFaultDataByPlantId: (plantId) => dispatch(getPlantFaultDataByPlantId(plantId)),
        deletePlantGen: (fault_id) => dispatch(deletePlantGen(fault_id)),
        clearPlantDailyGeneration:() =>dispatch(clearPlantDailyGeneration()),
        getDailyPlantActualGenerationMonthly: (plantId) => dispatch(getDailyPlantActualGenerationMonthly(plantId))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MonthlyGeneration));
