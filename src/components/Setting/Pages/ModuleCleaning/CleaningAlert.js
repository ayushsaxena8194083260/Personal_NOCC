import { connect } from 'react-redux';
import React, { Component } from "react";
import { Link, withRouter } from 'react-router-dom';
import { renderCleaningConfig } from '../../../../actions/action-Settings';
import {AgGridReact} from "ag-grid-react";
import {getAllPlants} from "../../../../actions/PlantActions";
import { clearSettingPlantMapping, createUpdateInverter, deleteCleaningAlertUser } from '../../../../actions/action-Settings';
import { getPlantByType } from "../../../../actions/moduleCleaningAnalysisActions";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import DropDown from "../../../Common/DropDown";
import ModelPopUp from '../../../Common/ModelPopUp';
import Alert from 'react-bootstrap/Alert';
import { Route } from 'react-router-dom'

const rowIndex = (params) => params.node.rowIndex + 1;

class ActionCellRenderer extends React.Component {
    constructor(props) {
        super(props);
        this.invokeDelete = this.invokeDelete.bind(this);
    }

    invokeDelete() {
        this.props.context.componentParent.onDelete(this.props.node.data.alertUserId);
    }
    render() {
        return (<div className="products-actions">
            
            <Link to="#" onClick={this.invokeDelete} title="Delete" >
                <img src="/images/cross-circle.png" alt="Delete" />
            </Link>

        </div>);
    }
}

class ModuleCleaningAlert extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedPlanType: null,
            plantTypes: this.props.plantTypes,
            selectedPlantOptions: [],
            showPopUp: false,
            deleteID: null,
            data: this.props.data
        }
    }
    componentDidMount() {
        // document.title = 'Plant Fault Data';
        this.props.clearSettingPlantMapping();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ 
            cleaningConfig: nextProps.cleaningConfig,
            plantTypes: nextProps.plantTypes,
            data: nextProps.data
        });
    }

    createColumnDefs() {
        return [
            {
                headerName: "Sr No", ockPosition: true, valueGetter: rowIndex, width:80,cellClass: 'cell-wrap',
                autoHeight: true, width: 300, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "user", field: "name", cellClass: 'cell-wrap',
                autoHeight: true, width: 700, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Action",
                field: '',
                cellRendererFramework: ActionCellRenderer,
                width: 130,
            }
        ];
    }

    handleChangePlantType(event) {
        const selectedValue = event.target.value;
        if (selectedValue !== this.state.selectedPlantType) {
            this.props.getPlantByType(selectedValue);
            this.setState({ selectedPlantType: selectedValue, selectedPlantOptions: null});
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

    getRenderCleaningAlert() {
        this.props.renderCleaningConfig({ plantIds: [this.state.selectedPlantOptions] });
        // let plantIds = [];
        // this.state.selectedPlantOptions && this.state.selectedPlantOptions.length > 0 && this.state.selectedPlantOptions.map((item) => { plantIds.push(item.plantId) });
        // plantIds.length > 0 && this.props.renderCleaningConfig({ plantIds: plantIds});

    }

    onDelete(_id) {
        this.setState({ deleteModalShow: true, deleteID: _id });

    }

    onHide() {
        this.setState({ deleteModalShow: false, deleteID: null });
    }

    deleteRecord() {
        if (this.state.deleteID !== null) {
            this.props.deleteCleaningAlertUser(this.state.deleteID);
            this.onHide();
        }
    }

    render() {
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
                        <Col xs={2} style={{ maxWidth: "7%" }}>
                            <button type="button" className="btn btn-orange" onClick={() => this.getRenderCleaningAlert()}>
                                Go
                        </button>
                        </Col>
                        <Col>
                        <Route render={({ history }) => (
                            <button type="button" class="btn btn-primary" style={{ width: "100%" }} onClick={() => { history.push('/setting/AddEditCleaningUser') }}>
                                <img src="/images/icons/fugue/plus-circle.png" alt="add inverter" title="Add Inverter" style={{ float: "left", marginRight: "3" }} />
                                Add User
                            </button>)} 
                        />
                        </Col>
                        <Col></Col>
                        <Col></Col>

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
                            id={"cleaningConfigAlertDelete"}
                            bodyContent="Are you sure want to delete this Module Cleaning Config Alert?"
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
const mapStateToProps = state => {
    return {
        plantsByType: state.plants.plantsByType,
        plantTypes:state.projectTypes.plantTypes,
        plants: state.plants.plants,
        plantType: [{displayText: "Select Plant Type" , value: "-1"}, {displayText: "GROUNDMOUNT" , value: "GROUNDMOUNT"},{displayText: "ROOFTOP" , value: "ROOFTOP"}],
        data: state.SettingsReducer.cleaningConfigAlert,
        displayMessage: state.SettingsReducer.displayMessage,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        renderCleaningConfig: (plantIds) => dispatch(renderCleaningConfig(plantIds)),
        getPlantByType: (plantsByType) => dispatch(getPlantByType(plantsByType)),
        getAllPlants: () => dispatch(getAllPlants()),
        deleteCleaningAlertUser: (id) => dispatch(deleteCleaningAlertUser(id)),
        clearSettingPlantMapping: () => dispatch(clearSettingPlantMapping())
  
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ModuleCleaningAlert));