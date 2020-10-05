import React, { Component } from 'react'
;
// import Col from 'react-bootstrap/Col';
// import Form from 'react-bootstrap/Form';
// import { Link, withRouter } from 'react-router-dom'
import {AgGridReact} from "ag-grid-react"
// import Picky from 'react-picky';
import 'react-picky/dist/picky.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import '../../styles/plant/plantFaultData.scss';


class TaskStatistics extends Component {

    constructor(props) {
        super(props);
        this.state = {
            taskStatisticsData: this.props.taskStatisticsData,
        };
    }

    componentDidMount() {
// document.title = 'Plant Fault Data';
        this.props.getAllTaskStatistics();
    }



    createColumnDefs() {
        return [
            {
                headerName: "",
                children: [
            {
                headerName: "Sr No.", field: "_id", cellClass: 'cell-wrap',
                autoHeight: true, width: 50, cellStyle: { 'white-space': 'normal' }
            },            
            {
                headerName: "Plant Name", field: "plant_name", cellClass: 'cell-wrap',
                autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' },
                cellRenderer : function(params) {
                    return '<a class="taskStatistics-action" href="/PreventiveMaintainance">' + params.value.toUpperCase() + '</a>';
                }
            }, 
                ]
            }, 
            {
                headerName: "Daily",
                children: [ 
            {
                headerName: "Requires Completion", field: "requires_Completion", cellClass: 'cell-wrap',
                autoHeight: true, width: 96, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Completed", field: "completed", cellClass: 'cell-wrap',
                autoHeight: true, width: 80, cellStyle: { 'white-space': 'normal' }
            },
            ]
            },
            {
                headerName: "Monthly",
                children: [ 
            {
                headerName: "Requires Completion", field: "requires_Completion1", cellClass: 'cell-wrap',
                autoHeight: true, width: 96, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Completed", field: "completed1", cellClass: 'cell-wrap',
                autoHeight: true, width: 80, cellStyle: { 'white-space': 'normal' }
            },
            ]
            },
            {
                headerName: "Bimonthly",
                children: [ 
            {
                headerName: "Requires Completion", field: "requires_Completion2", cellClass: 'cell-wrap',
                autoHeight: true, width: 96, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Completed", field: "completed2", cellClass: 'cell-wrap',
                autoHeight: true, width: 80, cellStyle: { 'white-space': 'normal' }
            },
            ]
            },
            {
                headerName: "Quarterly",
                children: [ 
            {
                headerName: "Requires Completion", field: "requires_Completion3", cellClass: 'cell-wrap',
                autoHeight: true, width: 96, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Completed", field: "completed3", cellClass: 'cell-wrap',
                autoHeight: true, width: 80, cellStyle: { 'white-space': 'normal' }
            },
            ]
            },
            {
                headerName: "Half Yearly",
                children: [ 
            {
                headerName: "Requires Completion", field: "requires_Completion4", cellClass: 'cell-wrap',
                autoHeight: true, width: 96, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Completed", field: "completed4", cellClass: 'cell-wrap',
                autoHeight: true, width: 80, cellStyle: { 'white-space': 'normal' }
            },
            ]
            },
            {
                headerName: "Yearly",
                children: [ 
            {
                headerName: "Requires Completion", field: "requires_Completion5", cellClass: 'cell-wrap',
                autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Completed", field: "completed5", cellClass: 'cell-wrap',
                autoHeight: true, width: 90, cellStyle: { 'white-space': 'normal' }
            },
            ]
            },      
        ];
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== null) {
            this.setState({                
                taskStatisticsData: nextProps.taskStatisticsData
            })
        }
    }

    getRowStyle= (params) => {
       
            if (params.node.rowIndex === 0) {
                return { background: '#33C1FF', fontWeight: 'bold' }
            }
    }
    // getPlantTypesDropDownOptions() {
    //     const options = this.state.plantTypes && this.state.plantTypes.map((plantTypes, key) => { return { id: plantTypes.plant_id, name: plantTypes.plant_name } });
    //     return options;
    // }

    // getDropDownProjectTypes() {
    //     let projectName = [];
    //     projectName.push({ displayText: "Select Project", value: "0" })
    //     this.state.projectTypes && this.state.projectTypes.map((item) => {
    //         projectName.push({ displayText: item.project_name, value: item.project_id })
    //     });

    //     return projectName;
    // }

    // getDropDownYear() {
    //     return this.props.years && this.props.years.map((item) => { return { displayText: item, value: item } });
    // }
    // handleChangeFromDate() {

    // }
    // handleChangeToDate() {

    // }
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
                <div
                    style={{
                        height: '500px',
                    }}
                    className="ag-theme-material taskStatistics-grid">
                    <AgGridReact
                        columnDefs={this.createColumnDefs()}
                        getRowStyle = {(params )=>this.getRowStyle(params )}
                        rowData={this.state.taskStatisticsData}
                        context={{ componentParent: this }}
                        onGridReady={this.onGridReady}
                        >
                    </AgGridReact>
                </div>
            </div>
        );
    }
}
export default TaskStatistics;