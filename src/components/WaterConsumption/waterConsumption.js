import React, { Component } from 'react'

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import {AgGridReact} from "ag-grid-react"
import Picky from 'react-picky';
import 'react-picky/dist/picky.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import '../../styles/plant/plantFaultData.scss';
import DropDown from "../Common/DropDown";
import Alert from 'react-bootstrap/Alert';
import ModelPopUp from '../Common/ModelPopUp';

class WaterConsumption extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedPlanType: null,
            selectedProjectTypes: null,
            selectedFromDate: this.getCurrentDate(),
            selectedToDate:   this.getCurrentDate(),
            projectTypes: this.props.projectTypes,
            plantTypes: this.props.plantTypes,
            waterConsumption: this.props.waterConsumption !== undefined?this.props.waterConsumption:[],
            selectedPlantOptions: [],
            showPopUp: false,
            deleteID: null,
            totalWaterUsed: null
        };
        this.selectMultipleOption = this.selectMultipleOption.bind(this);
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
        this.props.clearWaterConsumptionData();
    }
    componentDidUpdate() {
    }

    handleChangeFromDate(event) {
        let fromDate = event.target.value;
        this.setState({ selectedFromDate: fromDate });
    }

    handleChangeToDate(event) {
        let toDate = event.target.value;
        this.setState({ selectedToDate: toDate });
    }

    handleChangePlantType(event) {
        const selectedValue = event.target.value;
        if (selectedValue !== this.state.selectedPlantType) {
            this.props.getProjectNames(selectedValue);
            this.setState({ selectedPlantType: selectedValue, selectedProjectTypes: null, selectedPlantOptions: [] });
        }
    }

    getRenderWaterConsumption() {
        let plantIds = [];
        this.state.selectedPlantOptions && this.state.selectedPlantOptions.length > 0 && this.state.selectedPlantOptions.map((item) => { plantIds.push(item.id) });
        plantIds.length > 0 && this.props.getModuleCleaningDataByDate({ plantIds: plantIds, fromDate: this.state.selectedFromDate, toDate: this.state.selectedToDate });
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

    handleChangeProjectTypes(event) {
        const selectedValue = event.target.value;
        this.props.getPlantByProjectId(selectedValue);
        this.setState({ selectedProjectTypes: selectedValue });
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

    createColumnDefs() {
        return [
            {
                headerName: "Sr No.", field: "sr_no", cellClass: 'cell-wrap',
                autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' },
                // children: [
                //     {headerName: "", field: ""}
                // ]
            },
            {
                headerName: "Date", field: "date", cellClass: 'cell-wrap',
                autoHeight: true, width: 350, cellStyle: { 'white-space': 'normal' },
                // children: [
                //     {headerName: "", field: ""}
                // ]
            },
            {
                headerName: "Plant Name", field: "plantName", cellClass: 'cell-wrap',
                autoHeight: true, width: 350, cellStyle: { 'white-space': 'normal' },
                // children: [
                //     {headerName: "Total", field: "total"}
                // ]
            },


            {
                headerName: "Water Used(In Ltrs)", field: "waterUsed", cellClass: 'cell-wrap',
                autoHeight: true, width: 350,  cellStyle: { 'white-space': 'normal' },
                // children: [
                //     {headerName: "12345687", field: "12345698"}
                // ]
            },
        ];
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== null) {
            var totalWaterUsed1=0;
            for(var i=0; i< nextProps.waterConsumption.length;i++){
                totalWaterUsed1 += nextProps.waterConsumption[i].waterUsed;
            }
            this.setState({
                projectTypes: nextProps.projectTypes,
                plantTypes: nextProps.plantTypes,
                waterConsumption: nextProps.waterConsumption,
                totalWaterUsed : totalWaterUsed1
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
                        <Col style={{ maxWidth: "15%", padding: "0" }}>
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
                        <Col style={{ maxWidth: "13%", padding: "0" }}>
                            <DropDown
                                className="top-search-input form-control"
                                Name="plantName"
                                itemSource={this.getDropDownProjectTypes()}
                                value={this.state.selectedProjectTypes}
                                handleChange={(item) => this.handleChangeProjectTypes(item)}
                            />
                        </Col>
                        <Col xs={1} style={{ maxWidth: "5%" }}>
                            <Form.Label>Plant:</Form.Label>
                        </Col>
                        <Col style={{ maxWidth: "13%", padding: "0" }}>
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
                            <Form.Label>From:</Form.Label>
                        </Col>
                        <Col xs={1} style={{ maxWidth: "13%", padding: "0" }}>
                            <Form.Control name="fromDate" type="date" onChange={(item) => this.handleChangeFromDate(item)} value={this.state.selectedFromDate} />
                        </Col>
                        <Col xs={1} style={{ maxWidth: "5%" }}>
                            <Form.Label>To:</Form.Label>
                        </Col>
                        <Col xs={1} style={{ maxWidth: "13%", padding: "0" }}>
                            <Form.Control name="toDate" type="date" onChange={(item) => this.handleChangeToDate(item)} value={this.state.selectedToDate} />
                        </Col>
                        <Col xs={2} style={{ maxWidth: "6%" }}>
                            <button type="button" className="btn btn-orange" style={{ width: "100%" }} onClick={() => this.getRenderWaterConsumption()}>
                                Go
                        </button>
                        </Col>
                    </div>
                    
                </div>
                {this.state.waterConsumption.length<=0?
                    <p className="message success" style={{ marginTop: "15px" }}>Please Select a Plant and Date. </p>:<></>}
                {/* <div
                        style={{
                            height: '500px',
                            maxWidth: "1222px",
                            margin: "auto"
                        }}
                        className="ag-theme-material">
                        <AgGridReact
                            columnDefs={this.createColumnDefs()}
                            rowData={this.state.waterConsumption}
                            context={{ componentParent: this }}
                            onGridReady={this.onGridReady}>
                        </AgGridReact>

                    </div> */}
                    <table id="t-list">
                    <tbody><tr>
                        <th>Sr No.</th>
                        <th>Date</th>
                        <th>Plant Name</th>
                        <th>Water Used(In Ltrs)</th>
                    </tr>
                            <tr>
                            <th></th>
                            <th></th>
                            <th>All plants</th>
                            <th>{this.state.totalWaterUsed}</th>
                        </tr>
                        {this.state.waterConsumption!=undefined?this.state.waterConsumption.map((waterCons,index) => 
                                <tr>
                                        <td>{index+1}</td>
                                        <td>{waterCons.date}</td>
                                        <td>{waterCons.plantName}</td>
                                        <td>{waterCons.waterUsed}</td>
                        </tr>
                        ):''}   
                                
                            </tbody></table>
                                </div>
                );
            }
        }
        
export default WaterConsumption;