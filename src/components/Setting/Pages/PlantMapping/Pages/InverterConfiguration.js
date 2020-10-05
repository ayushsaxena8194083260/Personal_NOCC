import React, { Component } from 'react'
import { AgGridReact } from "ag-grid-react"
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import { Link, withRouter } from 'react-router-dom';
import 'react-picky/dist/picky.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import '../../../../../styles/plant/plantFaultData.scss';
import DropDown from "../../../../Common/DropDown";
import { getInverterConfiguration, clearSettingPlantMapping, deleteInverter } from '../../../../../actions/action-Settings';
import { connect } from 'react-redux';
import { getPlantByType } from "../../../../../actions/moduleCleaningAnalysisActions";
import Picky from 'react-picky';
import ModelPopUp from '../../../../Common/ModelPopUp';
import Alert from 'react-bootstrap/Alert';
import { Route } from 'react-router-dom'
import exportFromJSON from 'export-from-json'
const rowIndex = (params) => params.node.rowIndex + 1;

class ActionCellRenderer extends React.Component {
    constructor(props) {
        super(props);
        this.invokeDelete = this.invokeDelete.bind(this);
    }

    invokeDelete() {
        this.props.context.componentParent.onDelete(this.props.node.data.inverterId);
    }
    render() {
        return (<div className="products-actions">
            <Link className="products-actions-link"
                to={{
                    pathname: "/setting/InverterConfigurationEdit",
                    inverterConfiguration: this.props.data
                }}>
                <img src="/images/editIcon.png" alt="Edit" />
            </Link>
            <Link to="#" onClick={this.invokeDelete} title="Delete" >
                <img src="/images/cross-circle.png" alt="Delete" />
            </Link>
            <Link className="products-actions-link"
                to={{
                    pathname: "/setting/AddCombinerBox",
                }}>
                <img src="/images/icons/fugue/plus-circle.png" alt="Add Combiner Box" />
            </Link>
            <Link className="products-actions-link"
                to={{
                    pathname: "/setting/AddFTPCombinerBoxMapping",
                    inverterConfiguration: this.props.data,
                    plantName: this.props.data.plantName,
                    invName: this.props.data.inverterName
                }}>
                <img src="/images/icons/fugue/plus-circle.png" alt="Add FTP Mapping Combiner Box" />
            </Link>
        </div>);
    }
}
class InverterConfiguration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inverterConfiguration: this.props.inverterConfiguration,
            selectedPlanType: null,
            plantTypes: this.props.plantTypes,
            selectedPlantOptions: [],
            showPopUp: false,
            deleteID: null,
            deleteModalShow: false,
            showButton: false
        };
        this.selectMultipleOption = this.selectMultipleOption.bind(this);
    }

    componentDidMount() {
        // document.title = 'Plant Fault Data';
        this.props.clearSettingPlantMapping();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            inverterConfiguration: nextProps.inverterConfiguration,
            plantTypes: nextProps.plantTypes
        });
    }

    createColumnDefs() {
        return [
            {
                headerName: "Sr No", ockPosition: true, valueGetter: rowIndex, width: 80, cellClass: 'cell-wrap',
                autoHeight: true, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Plant Name", field: "plantName", cellClass: 'cell-wrap',
                autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Inverter Name", field: "inverterName", cellClass: 'cell-wrap',
                autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Inverter Number", field: "inverterNumber", cellClass: 'cell-wrap',
                autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Inverter Serial Number", field: "inverterSerialNumber", cellClass: 'cell-wrap',
                autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "AC Loading", field: "acCapacity", cellClass: 'cell-wrap',
                autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "DC Loading", field: "dcLoading", cellClass: 'cell-wrap',
                autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Shed Orientation", field: "shedOrientation", cellClass: 'cell-wrap',
                autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Tilt Angle", field: "tiltAngle", cellClass: 'cell-wrap',
                autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Roof Type", field: "roofType", cellClass: 'cell-wrap',
                autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Cable Resistance", field: "cableResistance", cellClass: 'cell-wrap',
                autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Action",
                field: '',
                cellRendererFramework: ActionCellRenderer,
                width: 200,
            }
        ];
    }

    handleChangePlantType(event) {
        const selectedValue = event.target.value;
        if (selectedValue !== this.state.selectedPlantType) {
            this.props.getPlantByType(selectedValue);
            this.setState({ selectedPlantType: selectedValue, selectedPlantOptions: [] });
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

    getRenderInverterConfiguration() {
        this.setState({showButton: true})
        let plantIds = [];
        this.state.selectedPlantOptions && this.state.selectedPlantOptions.length > 0 && this.state.selectedPlantOptions.map((item) => { plantIds.push(item.id) });
        plantIds.length > 0 && this.props.getInverterConfiguration({ plantIds: plantIds });

        // this.props.getInverterConfiguration({ plantIds: [this.state.selectedPlantOptions] });

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
            this.props.deleteInverter(this.state.deleteID);
            this.onHide();
        }
    }

    render() {
        const data = this.state.inverterConfiguration
        const fileName = 'Share_List_Report_'
        const exportType = 'xls'
        return (
            <div>
            {/* {console.log(data)} */}
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
                                filterPlaceholder='search'
                            />
                        </Col>
                        <Col xs={2} style={{ maxWidth: "7%" }}>
                            <button type="button" className="btn btn-orange" onClick={() => this.getRenderInverterConfiguration()}>
                                Go
                        </button>
                        </Col>
                        {this.state.showButton && this.state.showButton === true ?
                        <Col xs={2} style={{ maxWidth: "15%" }}>
                        <Route render={({ history }) => (
                            <button type="button" class="btn btn-primary" style={{ width: "100%" }} onClick={() => { history.push('/setting/InverterConfigurationEdit') }}>
                                <img src="/images/icons/fugue/plus-circle.png" alt="add inverter" title="Add Inverter" style={{ float: "left", marginRight: "3" }} />
                                Add Inverter
                            </button>)} 
                        />
                    </Col>
                        : null}
                        <Col xs={2} style={{ maxWidth: "13%" }}>
                            <button type="button" className="btn btn-primary" style={{ width: "100%" }} onClick={()=>{data.length>0?exportFromJSON({ data, fileName, exportType }):alert('No data to download')}}>
                                Download
                        </button>
                        </Col>
                        <Col xs={2} style={{ maxWidth: "13%" }}>
                            <button type="button" className="btn btn-primary" style={{ width: "100%" }}>
                                CB Details
                        </button>
                        </Col>
                        
                    </div>
                </div>
                <div>
                        {this.props.displayMessage ? <Alert className="message success" variant="success" style={{ marginTop: "15px" }}>{this.props.displayMessage}</Alert> : null}
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
                        rowData={this.state.inverterConfiguration}
                        context={{ componentParent: this }}
                        onGridReady={this.onGridReady}>

                    </AgGridReact>
                    <div>
                        <ModelPopUp title="Delete"
                            id={"inverterConfigurationDelete"}
                            bodyContent="Are you sure want to delete this Inverter Configuration?"
                            showPopUp={this.state.deleteModalShow}
                            secondaryBtnName="No"
                            onSecondaryAction={this.onHide.bind(this)}
                            primaryBtnName="Delete"
                            onPrimaryAction={this.deleteRecord.bind(this)}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        plantsByType: state.plants.plantsByType,
        plantTypes: state.projectTypes.plantTypes,
        plants: state.plants.plants,
        plantType: [{ displayText: "Select Plant Type", value: "-1" }, { displayText: "GROUNDMOUNT", value: "GROUNDMOUNT" }, { displayText: "ROOFTOP", value: "ROOFTOP" }],
        inverterConfiguration: state.SettingsReducer.inverterConfiguration,
        displayMessage: state.SettingsReducer.displayMessage,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getInverterConfiguration: (plantIds) => dispatch(getInverterConfiguration(plantIds)),
        getPlantByType: (plantsByType) => dispatch(getPlantByType(plantsByType)),
        clearSettingPlantMapping: () => dispatch(clearSettingPlantMapping()),
        deleteInverter: (id) => dispatch(deleteInverter(id))

    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InverterConfiguration));