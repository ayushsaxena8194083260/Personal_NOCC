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
import Alert from 'react-bootstrap/Alert';

class ActionCellRenderer extends React.Component {
    constructor(props) {
        super(props);
        this.invokeDelete = this.invokeDelete.bind(this);
    }

    invokeDelete() {
        this.props.context.componentParent.onDelete(this.props.node.data.id);
    }
    render() {
        return (<div className="products-actions">
            <Link className="products-actions-link"
                to={{
                    pathname: "/editExternalBudget",
                    externalBudget: this.props.data
                }}>
                <img src="/images/editIcon.png" alt="Edit" />
            </Link>
            <Link to="#" onClick={this.invokeDelete} title="Delete" >
                <img src="/images/cross-circle.png" alt="Delete" />
            </Link>
        </div>);
    }
}

class ExternalBudget extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedPlantType: null,
            selectedProjectTypes: this.props.projectTypes,
            selectedYear: null,
            projectTypes: this.props.projectTypes,
            plantTypes: this.props.plantTypes,
            externalBudget: this.props.externalBudget,
            selectedPlantOptions: [],
        };
        this.selectMultipleOption = this.selectMultipleOption.bind(this);
    }

    componentDidMount() {
        // document.title = 'Plant Fault Data';
        this.props.clearExternalBudgetData();
    }
    componentDidUpdate() {
    }

    handleChangePlantType(event) {
        const selectedValue = event.target.value;
        if(selectedValue !== this.state.selectedPlantType){
        this.props.getProjectNames(selectedValue);
        this.setState({ selectedPlantType: selectedValue,selectedProjectTypes:null,selectedPlantOptions:[]  });
        }
    }

    handleChangeProjectTypes(event) {
        const selectedValue = event.target.value;
        this.props.getPlantByProjectId(selectedValue);
        this.setState({ selectedProjectTypes: selectedValue });
    }
    
    getRenderExternalBudget() {
        let plantIds = [];
        this.state.selectedPlantOptions && this.state.selectedPlantOptions.length > 0 && this.state.selectedPlantOptions.map((item) => { plantIds.push(item.id) });
        plantIds.length > 0 && this.props.getExternalBudgetByYear({ plantIds: plantIds, year: this.state.selectedYear });
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
            this.props.deleteExternalBudget(this.state.deleteID);
            this.onHide();
        }
    }

    createColumnDefs() {
        return [
            {
                headerName: "Plant Name", field: "plantName", cellClass: 'cell-wrap',
                autoHeight: true, width: 250, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Month", field: "month", cellClass: 'cell-wrap',
                autoHeight: true, width: 250, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Year", field: "year", cellClass: 'cell-wrap',
                autoHeight: true, width: 250, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Budget Generation", field: "budgetGeneration", cellClass: 'cell-wrap',
                autoHeight: true, width: 250, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Action",
                field: '',
                cellRendererFramework: ActionCellRenderer,
                width: 150,
            }
        ];
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== null) {
            this.setState({
                projectTypes: nextProps.projectTypes,
                plantTypes: nextProps.plantTypes,
                externalBudget: nextProps.externalBudget
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
                        {/* <Col style={{ maxWidth: "15%" }}>
                            <DropDown
                                className="top-search-input form-control"
                                Name="plantType"
                                itemSource={this.props.plantType}
                                value={this.state.selectedPlantType}
                                handleChange={(item) => this.handleChangePlantType(item)}
                            />
                        </Col> */}
                        
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
                            <button type="button" className="btn btn-orange" onClick={() => this.getRenderExternalBudget()}>
                                Go
                        </button>
                        </Col>
                        <Col xs={2} style={{ maxWidth: "13%" }}>
                            <Route render={({ history }) => (
                                <button type="button" className="btn btn-primary" style={{ width: "100%" }} onClick={() => { history.push('/uploadExternalBudget') }}>
                                    <img src="/images/icons/fugue/plus-circle.png" alt="Upload External Budget" title="Upload External Budget" style={{ float: "left", marginRight: "3" }} />
                                    Upload
                        </button>)} />
                        </Col>
                        
                        
                    </div>
                </div>
                <div>
                    {/* <p className="message success" style={{ marginTop: "15px" }}>{this.props.displayMessage}</p> */}
                    {this.props.displayMessage ? <Alert className="message success" variant="success" style={{ marginTop: "15px" }}>{this.props.displayMessage}</Alert> : null}
                </div>
                <div
                    style={{
                        height: '500px',
                    }}
                    className="ag-theme-material">
                    <AgGridReact
                        columnDefs={this.createColumnDefs()}
                        rowData={this.state.externalBudget}
                        context={{ componentParent: this }}
                        onGridReady={this.onGridReady}>
                    </AgGridReact>
                </div>
                <ModelPopUp title="Delete"
                            id={"externalBudgetDelete"}
                            bodyContent="Are you sure want to delete this External Budget?"
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
export default ExternalBudget;
