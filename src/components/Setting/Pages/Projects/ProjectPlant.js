
import React, { Component } from 'react'
;
import {AgGridReact} from "ag-grid-react"
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
// import Picky from 'react-picky';
import 'react-picky/dist/picky.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import '../../../../styles/plant/plantFaultData.scss';
// import DropDown from "../../../Common/DropDown";

class ActionCellRenderer extends React.Component {
    constructor(props) {
        super(props);
        this.invokeDelete = this.invokeDelete.bind(this);
    }

    invokeDelete() {
        this.props.context.componentParent.onDelete(this.props.node.data._id);
    }
    render() {
        return (<div className="products-actions">
            <Link to="#" onClick={this.invokeDelete} title="Delete" >
            <img src="/images/icons/fugue/status.png" title="Active Project" alt="Active Project"/>
            </Link>
            <Link className="products-actions-link"
                to={{
                    pathname: "/plantFaultDataAddEdit",
                    plantFault: this.props.data
                }}>
                <img src="/images/editIcon.png" alt="Edit" />
            </Link>
            <Link to="#" onClick={this.invokeDelete} title="Delete" >
                <img src="/images/cross-circle.png" alt="Delete" />
            </Link>
        </div>);
    }
}
class ProjectPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            selectedPlantType: null,
            selectedProjectTypes: null,
            selectedYear: null,
            projectTypes: this.props.projectTypes,
            plantTypes: this.props.plantTypes,
            plantFault: this.props.plantFault,
            selectedPlantOptions: [],
        };
        this.selectMultipleOption = this.selectMultipleOption.bind(this);
    }

    componentDidMount() {
        // document.title = 'Plant Fault Data';
        // this.props.clearPlantFaultData();
    }
    componentDidUpdate() {
        //this.props.getProjectNames(this.state.selectedValue);
    }

    handleChangePlantType(event) {
        const selectedValue = event.target.value;
        if(selectedValue !== this.state.selectedPlantType){
        this.props.getProjectNames(selectedValue);
        
        this.setState({ selectedPlantType: selectedValue,selectedProjectTypes:null,selectedPlantOptions:[]  });
        }
        //console.log(selectedValue)
    }

    handleChangePlantFault(event) {
        const plantId = event.target.value;
        this.setState({ plantId });
        //console.log(plantId)
    }

    getRenderPlantFault() {
        let plantIds = [];
        this.state.selectedPlantOptions && this.state.selectedPlantOptions.length > 0 && this.state.selectedPlantOptions.map((item) => { plantIds.push(item.id) });
        plantIds.length > 0 && this.props.getPlantFaultDataByPlantId({ plantIds: plantIds, year: this.state.selectedYear });
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

    onDelete(_id) {
        let isConfirm = window.confirm("Are you sure want to delete this Plant Fault?");
        if (isConfirm)
            this.props.deletePlantFaultData(_id);
    }

    createColumnDefs() {
        return [
            {
                headerName: "Sr No", field: "sr_no", cellClass: 'cell-wrap',
                autoHeight: true, width: 200, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Project Name", field: "project_name", cellClass: 'cell-wrap',
                autoHeight: true, width: 390, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Location", field: "location", cellClass: 'cell-wrap',
                autoHeight: true, width: 190, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "State", field: "state", cellClass: 'cell-wrap',
                autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Plant Capacity AC", field: "location", cellClass: 'cell-wrap',
                autoHeight: true, width: 190, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Action",
                field: '',
                cellRendererFramework: ActionCellRenderer,
                width: 200,
            }
        ];
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== null) {            
            this.setState({
                projectTypes: nextProps.projectTypes,
                plantTypes: nextProps.plantTypes,
                plantFault: nextProps.plantFault
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
        
        return(
            <div>
                <section className="top-filter" style={{height:"44px"}}>
                    <Row style={{margin:"0"}}>
                    <Col style={{maxWidth:"6%"}}>
                        <Form.Label>Type:</Form.Label>
                    </Col>
                    <Col style={{maxWidth:"26%"}}>
                        <Form.Control/>
                    </Col>
                    <Col style={{maxWidth:"6%"}}>
                        <Form.Label>Plant:</Form.Label>
                    </Col>
                    <Col style={{maxWidth:"20%"}}>
                        <Form.Control/>
                    </Col>
                    <Col style={{maxWidth:"10%"}}>
                        <Form.Label>Project Name:</Form.Label>
                    </Col>
                    <Col style={{maxWidth:"19%"}}>
                        <Form.Label>Gujarat Rooftop 2.5</Form.Label>
                    </Col>
                    <Col xs={2} style={{maxWidth:"13px"}}>
                        <button type="button" className="btn btn-primary" style={{ width: "125px"}}>
                            <img src="/images/icons/fugue/plus-circle.png" alt="add plant" title="Add Plant Fault" style={{ float: "left", paddingRight: "5px" }} />
                            Add Project
                        </button>
                    </Col>
                    </Row>
                </section>
                <div
                    style={{
                        height: '500px',
                    }}
                    className="ag-theme-material">
                        <AgGridReact
                            columnDefs={this.createColumnDefs()}
                            rowData={this.state.plantFault}
                            context={{ componentParent: this }}
                            onGridReady={this.onGridReady}>
                        </AgGridReact>
                </div>
            </div>
        )
    }
}
export default ProjectPage;