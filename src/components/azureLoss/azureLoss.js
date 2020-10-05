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

class ActionCellRenderer extends React.Component {
    constructor(props) {
        super(props);
        this.invokeDelete = this.invokeDelete.bind(this);
    }

    invokeDelete() {
        this.props.context.componentParent.onDelete(this.props.node.data.azureLossesId);
    }
    render() {
        return (<div className="products-actions">
            <Link className="products-actions-link"
                to={{
                    pathname: "/addAzureLoss",
                    plantLoss: this.props.data,
                    azureLoss: this.props.node.azureLoss
                }}>
                <img src="/images/editIcon.png" alt="Edit" />
            </Link>
            <Link to="#" onClick={this.invokeDelete} title="Delete" >
                <img src="/images/cross-circle.png" alt="Delete" />
            </Link>
        </div>);
    }
}

class AzureLoss extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedPlantType: null,
            selectedProjectTypes: null,
            selectedYear: null,
            projectTypes: this.props.projectTypes,
            plantTypes: this.props.plantTypes,
            plantLoss: this.props.plantLoss,
            plants: this.props.plants,
            selectedPlantOptions: null,
            showPopUp: false,
            deleteID: null,
            month:['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        };
        this.selectMultipleOption = this.selectMultipleOption.bind(this);
    }

    componentDidMount() {
        // document.title = 'Plant Fault Data';
       this.props.clearAzureLoss();
    }
    componentDidUpdate() {
        //this.props.getProjectNames(this.state.selectedValue);
    }
    onGridReady = (params) => {
        params.api.setHeaderHeight(75);
    }

    handleChangePlantType(event) {
        const selectedValue = event.target.value;
        if (selectedValue !== this.state.selectedPlantType) {
            this.props.getPlantByType(selectedValue);
            this.setState({ selectedPlantType: selectedValue, selectedPlantOptions: null});
        }
    }

    handleChangeAzureLoss(event) {
        const plantId = event.target.value;
        this.setState({ plantId });
    }

    getAzureLossData() {
        this.props.getAzureLossByPlantId({ plantIds: this.state.selectedPlantOptions, year: this.state.selectedYear, selectedPlantType: this.state.selectedPlantType });

        // let plantIds = [];
        // this.state.selectedPlantOptions && this.state.selectedPlantOptions.length > 0 && this.state.selectedPlantOptions.map((item) => { plantIds.push(item.id) });
        // plantIds.length > 0 && this.props.getAzureLossByPlantId({ plantIds: plantIds, year: this.state.selectedYear });
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

    onDelete(_id) {
        this.setState({ showPopUp: true, deleteID: _id });

    }

    onHide() {
        this.setState({ showPopUp: false, deleteID: null });
    }

    deleteRecord() {
        if (this.state.deleteID !== null) {
            this.props.deleteAzureLoss(this.state.deleteID);
            this.onHide();
        }
    }

    // onDelete(_id) {
    //     let isConfirm = window.confirm("Are you sure want to delete this Azure Losses?");
    //     //if (isConfirm)
    //     // this.props.deleteAzureLossData(_id);
    // }

    createColumnDefs() {
        return [
            {
                headerName: "Sr No.", field: "sr_no", cellClass: 'cell-wrap',
                autoHeight: true, width: 48, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Year", field: "year", cellClass: 'cell-wrap',
                autoHeight: true, width: 55, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Month", field: "month", cellClass: 'cell-wrap',
                autoHeight: true, width: 75, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Inverter Cliping", field: "inverterCliping", cellClass: 'cell-wrap',
                autoHeight: true, width: 70, cellStyle: { '%white-space': 'normal' }
            },
            {
                headerName: "DC Losses", field: "dcLosses", cellClass: 'cell-wrap',
                autoHeight: true, width: 60, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "AC Losses", field: "acCablelosses", cellClass: 'cell-wrap',
                autoHeight: true, width: 60, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Transformer Losses", field: "transformerLosses", cellClass: 'cell-wrap',
                autoHeight: true, width: 70, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Module Quality", field: "moduleQuality", cellClass: 'cell-wrap',
                autoHeight: true, width: 70, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Module Mismatch Losses", field: "moduleMismatchLosses", cellClass: 'cell-wrap',
                autoHeight: true, width: 74, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Soiling Losses", field: "soilingLosses", cellClass: 'cell-wrap',
                autoHeight: true, width: 60, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Auxilary Losses", field: "auxilaryLosses", cellClass: 'cell-wrap',
                autoHeight: true, width: 60, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Inverter Efficiency", field: "inverterEfficiency", cellClass: 'cell-wrap',
                autoHeight: true, width: 60, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Linear Derate", field: "linearDerate", cellClass: 'cell-wrap',
                autoHeight: true, width: 65, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Shading Losses", field: "shadingLosses", cellClass: 'cell-wrap',
                autoHeight: true, width: 76, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "GridOutage And Plant Downtime", field: "gridOutageAndPlantDowntime", cellClass: 'cell-wrap',
                autoHeight: true, width: 77, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Design Loss", field: "designLoss", cellClass: 'cell-wrap',
                autoHeight: true, width: 70, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Total Sum Of Losses", field: "totalSumOfLosses", cellClass: 'cell-wrap',
                autoHeight: true, width: 67, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Action",
                field: '',
                cellRendererFramework: ActionCellRenderer,
                width: 90,
            }
        ];
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== null) {
            this.setState({
                projectTypes: nextProps.projectTypes,
                plantTypes: nextProps.plantTypes,
                plantLoss: nextProps.plantLoss,
                plants: nextProps.plants
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

    getDropDownYear() {
        return this.props.years && this.props.years.map((item) => { return { displayText: item, value: item } });
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

    formatRecords(data){
      return  data && data.length > 0&& data.map((item)=>{
            return {...item,
                inverterCliping: item.inverterCliping + "%",
                dcLosses: item.dcLosses + "%",
                acCablelosses: item.acCablelosses + "%",
                transformerLosses: item.transformerLosses + "%",
                moduleQuality: item.moduleQuality + "%",
                moduleMismatchLosses: item.moduleMismatchLosses + "%",
                soilingLosses: item.soilingLosses + "%",
                auxilaryLosses: item.auxilaryLosses + "%",
                month:this.state.month[item.month-1],
                inverterEfficiency: item.inverterEfficiency + "%",
                linearDerate: item.linearDerate + "%",
                shadingLosses: item.shadingLosses + "%",
                gridOutageAndPlantDowntime: item.gridOutageAndPlantDowntime + "%",
                transmissionLosses: item.transmissionLosses + "%",
                lossDueToIrradianceLevel: item.lossDueToIrradianceLevel + "%",
                lossDueToTemperature: item.auxilaryLosses + "%",
                lamLosses: item.lamLosses + "%",
              
    
            }
        })
    }
    

    render() {

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
                            <Form.Label>Plant:</Form.Label>
                        </Col>
                        <Col style={{ maxWidth: "13%" ,padding:"0"}}>
                            <DropDown
                                className="top-search-input form-control"
                                Name="plants"
                                itemSource={this.getDropDownPlants()}
                                value={this.state.selectedPlantOptions}
                                handleChange={(item) => this.handleChangePlants(item)}
                            />
                            </Col>

                        {/* <Col xs={1} style={{ maxWidth: "5%" }}>
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
                        </Col> */}
                        <Col xs={1} style={{ maxWidth: "5%" }}>
                            <Form.Label>Year:</Form.Label>
                        </Col>
                        <Col xs={2} style={{ maxWidth: "15%" }} >
                            <DropDown
                                className="top-search-input form-control"
                                Name="year"
                                itemSource={this.getDropDownYear()}
                                value={this.state.selectedYear}
                                handleChange={(item) => this.handleChangeYear(item)}
                            />
                        </Col>
                        <Col xs={2} style={{ maxWidth: "7%" }}>
                            <button type="button" className="btn btn-orange" onClick={() => this.getAzureLossData()}>
                                Go
                        </button>
                        </Col>
                        <Col xs={2} style={{ maxWidth: "16%" }}>
                            <Route render={({ history }) => (
                                <button type="button" className="btn btn-primary" style={{ width: "100%" }} onClick={() => { history.push('/uploadAzureLossCSV') }}>
                                    <img src="/images/icons/fugue/plus-circle.png" alt="add plant" title="Add Plant Fault" style={{ float: "left", marginRight: "3" }} />
                                    Upload Azure Loss-A
                        </button>)} />
                        </Col>
                        <Col xs={2} style={{ maxWidth: "15%" }}>
                            <Route render={({ history }) => (
                                <button type="button" className="btn btn-primary" style={{ width: "100%" }} onClick={() => { history.push('/addAzureLoss') }}>
                                    <img src="/images/icons/fugue/plus-circle.png" alt="add plant" title="Add Plant Fault" style={{ float: "left", marginRight: "3" }} />
                                    Add Azure Loss-A
                        </button>)} />
                        </Col>

                    </div>
                </div>
                <div>
                    {this.props.displayMessage ? <Alert className="message success" variant="success" style={{ marginTop: "15px" }}>{this.props.displayMessage}</Alert> : null}
                </div>
                <div
                    style={{
                        height: '500px',
                        paddingLeft:"5px"
                    }}
                    className="ag-theme-material azure-loss-grid">
                    <AgGridReact
                        columnDefs={this.createColumnDefs()}
                        rowData={this.formatRecords(this.state.plantLoss)}
                        context={{ componentParent: this }}
                        onGridReady={this.onGridReady}>
                    </AgGridReact>
                    <ModelPopUp title="Delete"
                        id={"azureLossDelete"}
                        bodyContent="Are you sure want to delete this Azure Loss?"
                        showPopUp={this.state.showPopUp}
                        secondaryBtnName="No"
                        onSecondaryAction={this.onHide.bind(this)}
                        primaryBtnName="Delete"
                        onPrimaryAction={this.deleteRecord.bind(this)}
                    />
                </div>
            </div>
        );
    }
}

export default AzureLoss;