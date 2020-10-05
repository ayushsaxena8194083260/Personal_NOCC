import React, { Component } from 'react'
import {AgGridReact} from "ag-grid-react"
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import { Link, withRouter } from 'react-router-dom';
import 'react-picky/dist/picky.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import '../../../../../styles/plant/plantFaultData.scss';
import DropDown from "../../../../Common/DropDown";
import {getMFMCSVMappingConfiguration, clearSettingPlantMapping, deleteCSVMFMMap} from '../../../../../actions/action-Settings';
import { connect } from 'react-redux';
import { getPlantByType } from "../../../../../actions/moduleCleaningAnalysisActions";
import { getProjectNames } from "../../../../../actions/PlantFaultDataActions";
import { getPlantByProjectId } from "../../../../../actions/PlantFaultDataActions";
import Picky from 'react-picky';
import ModelPopUp from '../../../../Common/ModelPopUp';
import Alert from 'react-bootstrap/Alert';

const rowIndex = (params) => params.node.rowIndex + 1;

class ActionCellRenderer extends React.Component {
    constructor(props) {
        super(props);
        this.invokeDelete = this.invokeDelete.bind(this);
    }

    invokeDelete() {
        this.props.context.componentParent.onDelete(this.props.node.data.csvMfmMapId);
    }
    render() {
        return (<div className="products-actions">
            <Link className="products-actions-link"
                to={{
                    pathname: "/setting/MFMCSVMappingEdit",
                    mfmCSVMapp: this.props.data
                }}>
                <img src="/images/editIcon.png" alt="Edit" />
            </Link>
            <Link to="#" onClick={this.invokeDelete} title="Delete" >
                <img src="/images/cross-circle.png" alt="Delete" />
            </Link>
        </div>);
    }
}
class MfmCSVMapping extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data:this.props.data,
            selectedProjectTypes: null,
            selectedPlanType: null,
            plantTypes: this.props.plantTypes,
            selectedPlantOptions: [],
            showPopUp: false,
            deleteID: null,
        };
    }

    componentDidMount() {
        // document.title = 'Plant Fault Data';
        this.props.clearSettingPlantMapping();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ 
            data: nextProps.data,
            plantTypes: nextProps.plantTypes,
            projectTypes: nextProps.projectTypes,
        });
    }

    createColumnDefs() {
        return [
            {
                headerName: "Sr No", ockPosition: true, valueGetter: rowIndex, width:80,cellClass: 'cell-wrap',
                autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Plant", field: "plantName", cellClass: 'cell-wrap',
                autoHeight: true, width: 250, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Adapter", field: "adapterName", cellClass: 'cell-wrap',
                autoHeight: true, width: 350, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Plant", field: "plantName", cellClass: 'cell-wrap',
                autoHeight: true, width: 350, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Action",
                field: '',
                cellRendererFramework: ActionCellRenderer,
                width: 100,
            }
        ];
    }

    // handleChangePlantType(event) {
    //     const selectedValue = event.target.value;
    //     if (selectedValue !== this.state.selectedPlantType) {
    //         this.props.getPlantByType(selectedValue);
    //         this.setState({ selectedPlantType: selectedValue, selectedPlantOptions: null});
    //     }
    // }

    handleChangePlantType(event) {
        const selectedValue = event.target.value;
        if (selectedValue !== this.state.selectedPlantType) {
            this.props.getProjectNames(selectedValue);
            this.setState({ selectedPlantType: selectedValue, selectedProjectTypes: null, selectedPlantOptions: [] });
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

    getDropDownProjectTypes() {
        let projectName = [];
        projectName.push({ displayText: "Select Project", value: "0" })
        this.state.projectTypes && this.state.projectTypes.map((item) => {
            projectName.push({ displayText: item.projectName, value: item.projectId })
        });

        return projectName;
    }

    handleChangeProjectTypes(event) {
        const selectedValue = event.target.value;
        this.props.getPlantByProjectId(selectedValue);
        this.setState({ selectedProjectTypes: selectedValue });
    }

    getRenderInverterConfiguration() {
        let plantIds = [];
        this.state.selectedPlantOptions && this.state.selectedPlantOptions.length > 0 && this.state.selectedPlantOptions.map((item) => { plantIds.push(item.id) });
        plantIds.length > 0 && this.props.getMFMCSVMappingConfiguration({ plantIds: plantIds});

        // this.props.getMFMCSVMappingConfiguration({ plantIds: [this.state.selectedPlantOptions] });

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
        this.setState({ deleteModalShow: true, deleteID: _id });

    }

    onHide() {
        this.setState({ deleteModalShow: false, deleteID: null });
    }

    deleteRecord() {
        if (this.state.deleteID !== null) {
            this.props.deleteCSVMFMMap(this.state.deleteID);
            this.onHide();
        }
    }


    render() {
        let placeholder = "Search";
        return (
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
                        <Col xs={1} style={{ maxWidth: "5%" }}>
                                <Form.Label>Project:</Form.Label>
                            </Col>
                            <Col style={{ maxWidth: "15%", padding: "0" }}>
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
                                    filterPlaceholder={placeholder}
                                />
                            </Col>
                            <Col></Col>
                        <Col xs={2} style={{ maxWidth: "7%" }}>
                            <button type="button" className="btn btn-orange" onClick={() => this.getRenderInverterConfiguration()}>
                                Go
                        </button>
                        </Col>
                        {/* <Col xs={2} style={{maxWidth:"13%"}}>
                        <button type="button" className="btn btn-primary" style={{ width: "100%"}}>
                            Download
                        </button>
                    </Col> */}
                    </div>
                </div>
                <div
                    style={{
                        height: '500px',
                        maxWidth: "1222px",
                        margin: "auto"
                    }}
                    className="ag-theme-material">
                    <AgGridReact
                        key="grid"
                        columnDefs={this.createColumnDefs()}
                        rowData={this.state.data}
                        context={{ componentParent: this }}
                        onGridReady={this.onGridReady}>
                    </AgGridReact>
                    <ModelPopUp title="Delete"
                            id={"MFMCSVMappingDelete"}
                            bodyContent="Are you sure want to delete this MFM CSV Mapping"
                            showPopUp={this.state.deleteModalShow}
                            secondaryBtnName="No"
                            onSecondaryAction={this.onHide.bind(this)}
                            primaryBtnName="Delete"
                            onPrimaryAction={this.deleteRecord.bind(this)}
                        /></div>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        plantsByType: state.plants.plantsByType,
        plantTypes:state.projectTypes.plantTypes,
        projectTypes: state.projectTypes.projectTypes,
        plants: state.plants.plants,
        plantType: [{displayText: "Select Plant Type" , value: "-1"}, {displayText: "GROUNDMOUNT" , value: "GROUNDMOUNT"},{displayText: "ROOFTOP" , value: "ROOFTOP"}],
        data: state.SettingsReducer.data
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getMFMCSVMappingConfiguration:(plantIds) => dispatch(getMFMCSVMappingConfiguration(plantIds)),
        getPlantByType: (plantsByType) => dispatch(getPlantByType(plantsByType)),
        getProjectNames: (projectTypes) => dispatch(getProjectNames(projectTypes)),
        getPlantByProjectId: (projectId) => dispatch(getPlantByProjectId(projectId)),
        clearSettingPlantMapping: () => dispatch(clearSettingPlantMapping()),
        deleteCSVMFMMap: (id) => dispatch(deleteCSVMFMMap(id))
    }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(MfmCSVMapping));