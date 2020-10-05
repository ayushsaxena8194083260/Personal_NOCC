import React, { Component } from 'react'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
// import { Link, withRouter } from 'react-router-dom'
import {AgGridReact} from "ag-grid-react"
import Picky from 'react-picky';
import 'react-picky/dist/picky.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import '../../styles/plant/plantFaultData.scss';
import DropDown from "../Common/DropDown";



// class ActionCellRenderer extends React.Component {
//     constructor(props) {
//         super(props);
//         this.invokeDelete = this.invokeDelete.bind(this);
//     }

//     invokeDelete() {
//         this.props.context.componentParent.onDelete(this.props.node.data._id);
//     }
//     render() {
//         return (<div className="products-actions">
//             <Link className="products-actions-link"
//                 to={{
//                     pathname: "/plantFaultDataAddEdit",
//                     plantFault: this.props.data
//                 }}>
//                 <img src="https://nocc.azurepower.com/images/editIcon.png" alt="Edit" />
//             </Link>
//             <Link className="products-actions-link"
//                 to={{
//                     pathname: "/plantFaultIncident",
//                     plantFault: this.props.data
//                 }}>
//                 <img src="https://nocc.azurepower.com/images/icons/fugue/plus-circle.png" alt="Add Incident" />
//             </Link>
//             <Link to="#" onClick={this.invokeDelete} title="Delete" >
//                 <img src="https://nocc.azurepower.com/images/cross-circle.png" alt="Delete" />
//             </Link>
//         </div>);
//     }
// }

class WaterConsumption extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedPlantType: null,
            selectedProjectTypes: null,
            selectedYear: null,
            projectTypes: this.props.projectTypes,
            plantTypes: this.props.plantTypes,
            waterConsumptionData: this.props.waterConsumptionData,
            selectedPlantOptions: [],
        };
        this.selectMultipleOption = this.selectMultipleOption.bind(this);
    }

    componentDidMount() {
        // document.title = 'Plant Fault Data';
        this.props.clearPlantFaultData();
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
        //console.log(plantId)
    }

    getRenderPlantFault() {
        // let plantIds = [];
        // this.state.selectedPlantOptions && this.state.selectedPlantOptions.length > 0 && this.state.selectedPlantOptions.map((item) => { plantIds.push(item.id) });
        // plantIds.length > 0 && this.props.getPlantFaultDataByPlantId({ plantIds: plantIds, year: this.state.selectedYear });
        this.props.getAllWaterConsumption()
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
        this.setState({ value });
    }

    selectMultipleOption(value) {
        if (value) {
            this.props.getPlantAvailabilityByPlantId(value);
            this.setState({ selectedPlantOptions: value });
        }
    }

    onDelete(_id) {
        let isConfirm = window.confirm("Are you sure want to delete this Plant Fault?");
        if (isConfirm)
            this.props.deletePlantFaultData(_id);
    }

    createColumnDefs() {
        return [
            {
                headerName: "Sr No.", field: "_id", cellClass: 'cell-wrap',
                autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Date", field: "amr_date", cellClass: 'cell-wrap',
                autoHeight: true, width: 250, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Plant Name", field: "plant_name", cellClass: 'cell-wrap',
                autoHeight: true, width: 250, cellStyle: { 'white-space': 'normal' }
            },
           
            
            {
                headerName: "Water Used(In Ltrs)", field: "affected_capacity", cellClass: 'cell-wrap',
                autoHeight: true, width: 250, cellStyle: { 'white-space': 'normal' }
            },            
        ];
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== null) {
            this.setState({
                projectTypes: nextProps.projectTypes,
                plantTypes: nextProps.plantTypes,
                waterConsumptionData: nextProps.waterConsumptionData
            })
        }
    }

    getPlantTypesDropDownOptions() {
        const options = this.state.plantTypes && this.state.plantTypes.map((plantTypes, key) => { return { id: plantTypes.plant_id, name: plantTypes.plant_name } });
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

    // getDropDownYear() {
    //     return this.props.years && this.props.years.map((item) => { return { displayText: item, value: item } });
    // }
    handleChangeFromDate() {

    }
    handleChangeToDate() {

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
                            <Form.Label>From:</Form.Label>
                        </Col>
                        <Col style={{ maxWidth: "15%" }} >
                            <Form.Control type="date" onChange={(val) => this.handleChangeFromDate(val)} />
                        </Col>
                        <Col xs={1} style={{ maxWidth: "5%" }}>
                            <Form.Label>To:</Form.Label>
                        </Col>
                        <Col style={{ maxWidth: "15%" }} >
                            <Form.Control type="date" onChange={(val) => this.handleChangeToDate(val)} />
                        </Col>
                        <Col xs={2} style={{ maxWidth: "7%" }}>
                            <button type="button" className="btn btn-orange" onClick={() => this.getRenderPlantFault()}>
                                Go
                        </button>
                        </Col>
                    </div>
                </div>
                <div>
                    <p className="message success" style={{ marginTop: "15px" }}>{this.props.displayMessage}</p>
                </div>
                {!this.props.waterConsumptionData && this.props.waterConsumptionData.length<=0?
                    <p className="message success" style={{ marginTop: "15px" }}>Please Select a Plant and Date. </p>:<></>}
                <div
                    style={{
                        height: '500px',
                    }}
                    className="ag-theme-material">
                    <AgGridReact
                        columnDefs={this.createColumnDefs()}
                        rowData={this.state.waterConsumptionData}
                        context={{ componentParent: this }}
                        onGridReady={this.onGridReady}>
                    </AgGridReact>
                </div>
            </div>
        );
    }
}
export default WaterConsumption;