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
import ModelPopUp from '../Common/ModelPopUp';
import { _ } from 'ag-grid-community';
import axios from 'axios';


class ActionCellRenderer extends React.Component {
    constructor(props) {
        super(props);
        this.invokeDownload = this.invokeDownload.bind(this);
        this.invokeDelete = this.invokeDelete.bind(this);
    }
    invokeDownload(){
        this.props.context.componentParent.onDownload(this.props.data[0]);
    }
    invokeDelete() {
        this.props.context.componentParent.onDelete(this.props.data[0].jmrId);
    }
    render() {
        return (<div className="products-actions">
             <Link to="#"  className="products-actions-link" onClick={this.invokeDownload}>
                <img src="https://nocc.azurepower.com/images/dwnlod.png" alt="Edit" />
            </Link>
            <Link to="#" onClick={this.invokeDelete} title="Delete" >
                <img src="/images/cross-circle.png" alt="Delete" />
            </Link>
        </div>);
    }
}

class JmrMeter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedPlantType: null,
            selectedProjectTypes: null,
            selectedYear: null,
            projectTypes: this.props.projectTypes,
            plantTypes: this.props.plantTypes,
            jmrMeter: this.props.jmrMeter,
            selectedPlantOptions: [],
            showPopUp: false,
        };
        // this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        // document.title = 'Plant Fault Data';
        this.props.clearJmrMeter();
    }
    componentDidUpdate() {
    }

    handleChangePlantType(event) {
        const selectedValue = event.target.value;
        if (selectedValue !== this.state.selectedPlantType) {
            this.props.getProjectNames(selectedValue);
            this.setState({ selectedPlantType: selectedValue, selectedProjectTypes: null, selectedPlantOptions: [] });
        }
    }

    handleChangePlantFault(event) {
        const plantId = event.target.value;
        this.setState({ plantId });
    }

    getRenderJmrMeter() {
        let plantIds = [];
        this.state.selectedPlantOptions && this.state.selectedPlantOptions.length > 0 && this.state.selectedPlantOptions.map((item) => { plantIds.push(item.id) });
        plantIds.length > 0 && this.props.getPlantJMRByPlantIdDate({ plantIds: plantIds, year: this.state.selectedYear });
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
        if (value) {
            this.setState({ selectedPlantOptions: value });
        }
    }

    // onDelete(_id) {
    //     let isConfirm = window.confirm("Are you sure want to delete this JMR Meter?");
    //     if (isConfirm)
    //         this.props.deletePlantJmr(_id);
    // }
    onDownload(_id){
        // console.log(_id)
        debugger
        let value = _id;
        let nextValue = value[0]
        console.log(nextValue,'nextValue');
        let url = 'https://jmrdata.s3.amazonaws.com/' + _id.fileName;
        window.open(url, "_blank");
        // window.location.reload();

        // window.location = 'https://jmrdata.s3.amazonaws.com/download%20(1).jpg';
        // axios.get('https://jmrdata.s3.amazonaws.com' + nextValue.fileName, {
         
        //   })
        //   .then(function (response) {
        //     console.log(response.data);
        
        //   })
        this.props.getPlantJmrById(_id)
        
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
            this.props.deletePlantJmr(this.state.deleteID);
            this.onHide();
        }
    }


    createColumnDefs() {
        return [
            {
                headerName: "Sr No", field: "sr_no", cellClass: 'cell-wrap',
                autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Plant Name", field: "plantName", cellClass: 'cell-wrap',
                autoHeight: true, width: 330, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Month", field: "month", cellClass: 'cell-wrap',
                autoHeight: true, width: 300, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Uploaded File", field: "fileName", cellClass: 'cell-wrap',
                autoHeight: true, width: 350, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Action",
                field: '',
                cellRendererFramework: ActionCellRenderer,
                width: 120,
            }
        ];
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        if (nextProps !== null) {
            this.setState({
                projectTypes: nextProps.projectTypes,
                plantTypes: nextProps.plantTypes,
                jmrMeter: nextProps.jmrMeter
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
                            <Form.Label>Project:</Form.Label>
                        </Col>
                        <Col style={{ maxWidth: "15%" }}>
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
                            <button type="button" className="btn btn-orange" onClick={() => this.getRenderJmrMeter()}>
                                Go
                        </button>
                        </Col>
                        <Col xs={2} style={{ maxWidth: "15%" }}>
                            <Route render={({ history }) => (
                                <button type="button" className="btn btn-primary" style={{ width: "100%" }} onClick={() => { history.push('/jmrMeterAdd') }}>
                                    <img src="/images/icons/fugue/plus-circle.png" alt="add Plant JMR" title="Add Plant JMR" style={{ float: "left", marginRight: "3" }} />
                                    Add Plant JMR
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
                            maxWidth:"1222px",
		                    margin:"auto"
                        }}
                    className="ag-theme-material">
                    <AgGridReact
                        columnDefs={this.createColumnDefs()}
                        rowData={this.state.jmrMeter}
                        context={{ componentParent: this }}
                        onGridReady={this.onGridReady}>
                    </AgGridReact>
                        <ModelPopUp title="Delete"
                            id={"jmrMeterDelete"}
                            bodyContent="Are you sure want to delete this JMR Meter?"
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
export default JmrMeter;