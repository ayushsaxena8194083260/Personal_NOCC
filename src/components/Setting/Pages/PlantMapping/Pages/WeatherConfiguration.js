
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
import { getWeatherConfiguration, clearSettingPlantMapping, deleteWeather } from '../../../../../actions/action-Settings';
import { connect } from 'react-redux';
import { getPlantByType } from "../../../../../actions/moduleCleaningAnalysisActions";
import Picky from 'react-picky';
import ModelPopUp from '../../../../Common/ModelPopUp';
import Alert from 'react-bootstrap/Alert';
import exportFromJSON from 'export-from-json'

const rowIndex = (params) => params.node.rowIndex + 1;

class ActionCellRenderer extends React.Component {
    constructor(props) {
        super(props);
        this.invokeDelete = this.invokeDelete.bind(this);
    }

    invokeDelete() {
        this.props.context.componentParent.onDelete(this.props.node.data.weatherStationId);
    }
    render() {
        return (<div className="products-actions">
            <Link className="products-actions-link"
                to={{
                    pathname: "/setting/WeatherConfigurationEdit",
                    WeatherConfiguration: this.props.data,
                    weatherStationSerialNumber: this.props.data.weatherStationNumber && this.props.data.weatherStationNumber.split(" ").length>1 ? this.props.data.weatherStationNumber.split(" ")[0] : null,
                    weatherStationNumber: this.props.data.weatherStationNumber && this.props.data.weatherStationNumber.split(" ").length>1 ? this.props.data.weatherStationNumber.split(" ")[1] : null            
            }}>
                <img src="/images/editIcon.png" alt="Edit" />
            </Link>
            <Link to="#" onClick={this.invokeDelete} title="Delete" >
                <img src="/images/cross-circle.png" alt="Delete" />
            </Link>
            <Link className="products-actions-link"
                to={{
                    pathname: "/setting/WeatherConfigurationEdit",
                    WeatherConfiguration: [],
                    plantId: this.props.data.plantId
                }}>
                <img src="/images/icons/fugue/plus-circle.png" alt="Add Weather Configuration" />
            </Link>
            <Link className="products-actions-link"
                to={{
                    pathname: "/setting/WeatherConfigurationShare",
                    WeatherConfiguration: this.props.data,
                    weatherStationSerialNumber: this.props.data.weatherStationNumber && this.props.data.weatherStationNumber.split(" ").length>1 ? this.props.data.weatherStationNumber.split(" ")[0] : null,
                    weatherStationNumber: this.props.data.weatherStationNumber && this.props.data.weatherStationNumber.split(" ").length>1 ? this.props.data.weatherStationNumber.split(" ")[1] : null            
                }}>
                <img src="/images/approve_icon.png" alt="Share" />
            </Link>
        </div>);
    }
}
class WeatherConfiguration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            selectedPlanType: null,
            plantTypes: this.props.plantTypes,
            selectedPlantOptions: [],
            showPopUp: false,
            deleteID: null,
            deleteModalShow: false

        };
    }

    componentDidMount() {
        // document.title = 'Plant Fault Data';
        this.props.clearSettingPlantMapping();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            data: nextProps.data,
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
                autoHeight: true, width: 150, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Weather Station Name", field: "weatherStationName", cellClass: 'cell-wrap',
                autoHeight: true, width: 300, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Weather Station Number", field: "weatherStationNumber", cellClass: 'cell-wrap',
                autoHeight: true, width: 300, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Weather Station Type", field: "weatherStationType", cellClass: 'cell-wrap',
                autoHeight: true, width: 200, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Action",
                field: '',
                cellRendererFramework: ActionCellRenderer,
                width: 170,
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
        let plantIds = [];
        this.state.selectedPlantOptions && this.state.selectedPlantOptions.length > 0 && this.state.selectedPlantOptions.map((item) => { plantIds.push(item.id) });
        plantIds.length > 0 && this.props.getWeatherConfiguration({ plantIds: plantIds });

        // this.props.getWeatherConfiguration({ plantIds: [this.state.selectedPlantOptions] });

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
            this.props.deleteWeather(this.state.deleteID);
            this.onHide();
        }
    }

    render() {
        let placeholder = "Search";
        const data = this.state.data
        const fileName = 'Share_List_Report_'
        const exportType = 'xls'
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
                        <Col xs={2} style={{ maxWidth: "7%" }}>
                            <button type="button" className="btn btn-orange" onClick={() => this.getRenderInverterConfiguration()}>
                                Go
                        </button>
                        </Col>
                        <Col xs={2} style={{ maxWidth: "13%" }}>
                            <button type="button" className="btn btn-primary" style={{ width: "100%" }} onClick={()=>{data.length>0?exportFromJSON({ data, fileName, exportType }):alert('No data to download')}}>
                                Download
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
                        rowData={this.state.data}
                        context={{ componentParent: this }}
                        onGridReady={this.onGridReady}>
                    </AgGridReact>
                    <div>
                        <ModelPopUp title="Delete"
                            id={"WeatherConfigurationDelete"}
                            bodyContent="Are you sure want to delete this Weather Configuration?"
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
        data: state.SettingsReducer.data,
        displayMessage: state.SettingsReducer.displayMessage,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getWeatherConfiguration: (plantIds) => dispatch(getWeatherConfiguration(plantIds)),
        getPlantByType: (plantsByType) => dispatch(getPlantByType(plantsByType)),
        clearSettingPlantMapping: () => dispatch(clearSettingPlantMapping()),
        deleteWeather: (id) => dispatch(deleteWeather(id))
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WeatherConfiguration));