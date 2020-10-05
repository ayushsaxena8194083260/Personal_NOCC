import React, { Component } from 'react';
import { AgGridReact } from "ag-grid-react";
import exportFromJSON from 'export-from-json';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom'

const rowIndex = (params) => params.node.rowIndex + 1;

class StatusCellRenderer extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        let renderImage = null;
        if (this.props.data.plantId && this.props.column.colDef.headerName === "Status") {
            let _img = 'circle_green.png';
            if (this.props.data.plantDeviation >= 0) {
                _img = 'circle_green.png';
            }
            else if (this.props.data.plantDeviation >= -3 && this.props.data.plantDeviation < 0) {
                _img = 'weather.png';
            }
            else {
                _img = 'circle_red.png';
            }
            renderImage = <img src={"/images/" + _img} alt={this.props.node.data._id} />;
        } else if (this.props.data.plantId && this.props.column.colDef.headerName === "Today") {
            renderImage = <img className="weatherImage" src={"http://openweathermap.org/img/w/" + this.props.data.todayicon + ".png"} alt="Today" />;
        }
        else if (this.props.data.plantId && this.props.column.colDef.headerName === "Tomorrow") {
            renderImage = <img className="weatherImage" src={"http://openweathermap.org/img/w/" + this.props.data.tmwicon + ".png"} alt="Tomorrow" />;
        }

        return (<div>
            {renderImage}
        </div>);
    }
}

class ActionCellRenderer extends React.Component {
    render() {
        return (<div className="products-actions">
            <Link className="products-actions-link"
                to={{
                    pathname: "/graph",
                    index: this.props.data.plantId,
                    plantGraph: this.props.data.plantId
                }} title={this.props.data.plantName}>
                {this.props.data.plantName}
            </Link>
        </div>);
    }
}


class GirdDisplay extends Component {
    constructor(props) {
        super(props);

        this.state = {
            plants: this.props.plants ? this.props.plants : [],
            total: this.props.total ? this.props.total : []
        }
    }

    componentDidMount() {
        //this.props.getForcastWeatherInfo();
        // document.title = 'Plant Fault Data';
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ plants: nextProps.allPlants, total: nextProps.total });
    }

    createColumnDefs() {
        var pageName = this.props.pageName === 'HubDashboard' ? 'HUB/Plant Name' : 'Plant Name'
        return [
            {
                headerName: "Sr No", field: 'sr_no', ockPosition: true, valueGetter: rowIndex, width: 50, cellClass: 'cell-wrap',
                autoHeight: true, cellStyle: { 'white-space': 'normal' }
            },
            // {
            //     headerName: pageName, field: "plantName", cellClass: 'cell-wrap',
            //     autoHeight: true, width: 130, cellStyle: { 'white-space': 'normal' }
            // },
            {
                headerName: pageName, field: "plantName", cellClass: 'cell-wrap',
                cellRendererFramework: ActionCellRenderer,
                autoHeight: true, width: 130,
            },
            {
                headerName: "Status", field: "plantDashboardStatus", cellClass: 'cell-wrap',
                cellRendererFramework: StatusCellRenderer,
                autoHeight: true, width: 50, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "PPA Capacity (MW)", field: "ppa_capacity_mw", cellClass: 'cell-wrap',
                autoHeight: true, width: 63, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Insolation (W/m²)", field: "insolation", cellClass: 'cell-wrap',
                autoHeight: true, width: 69, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Today", field: "today", cellClass: 'cell-wrap',
                cellRendererFramework: StatusCellRenderer,
                autoHeight: true, width: 55, cellStyle: { 'white-space': 'normal' }
                // headerName: "Today",
                // field: '',

                // width: 150,
            },
            {
                headerName: "Tomorrow", field: "tomorrow", cellClass: 'cell-wrap',
                cellRendererFramework: StatusCellRenderer,
                autoHeight: true, width: 68, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Previous Day(kwh)", field: "previous_day_kwh", cellClass: 'cell-wrap',
                autoHeight: true, width: 65, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Day-Ahead(kwh)", field: "day_ahead_kwh", cellClass: 'cell-wrap',
                autoHeight: true, width: 80, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Energy Till Date (GWh)", field: "eTillDate", cellClass: 'cell-wrap',
                autoHeight: true, width: 90, cellStyle: { 'white-space': 'normal' }
            }
        ];
    }
    // pinnedTopRowData() {
    //     return [
    //         {
    //             sr_no:null,
    //             eTillDate: this.state.total ? this.state.total.totalGMETillDate:0,
    //             day_ahead_kwh: this.state.total ?this.state.total.totalGMDayAhead:0,
    //             previous_day_kwh: this.state.total ?this.state.total.totalGMPrevDay:0,
    //             tomorrow: null,
    //             today: null,
    //             insolation_wm2: null,
    //             ppa_capacity_mw: this.state.total ?this.state.total.totalGMPPA:0,
    //             plantDashboardStatus: null,
    //             plantName: "Gross Portfolio",
    //             plantId: null,
    //         },
    // {
    //     sr_no:null,
    //     eTillDate: this.state.total ? this.state.total.totalGMETillDate:0,
    //     day_ahead_kwh: this.state.total ?this.state.total.totalGMDayAhead:0,
    //     previous_day_kwh: this.state.total ?this.state.total.totalGMPrevDay:0,
    //     tomorrow: null,
    //     today: null,
    //     insolation_wm2: null,
    //     ppa_capacity_mw: this.state.total ?this.state.total.totalGMPPA:0,
    //     plantDashboardStatus: null,
    //     plantName: "Ground mount Portfolio",
    //     plantId: null,
    // }
    // ]
    // }
    // pinnedTopRowDataForHub() {
    //     return [

    //     ]
    // }

    getRowStyleScheduled(param) {
        if (
            [
                'Gross Portfolio',
                'Ground mount Portfolio',
                'Roof top Portfolio'
            ].includes(param.data.plantName)
        ) {
            return 'highlighted_row'
        }
    }

    render() {
        return (
            <div>
                <span className="darkBlueFont txtSdw">Weather & Generation</span>
                <div style={{ padding: "2px", borderRadius: "5px", border: ' 2px solid #dedede' }}>
                    <div style={{ height: '583px' }} className="ag-theme-material dashboard-grid">
                        <AgGridReact
                            columnDefs={this.createColumnDefs()}
                            rowData={this.state.plants}
                            context={{ componentParent: this }}
                            onGridReady={this.props.onGridReady}
                            getRowClass={this.getRowStyleScheduled}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default GirdDisplay;