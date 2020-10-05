import React, { Component } from 'react';
import { AgGridReact } from "ag-grid-react";
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
            renderImage = <img src={"http://openweathermap.org/img/w/" + this.props.data.todayicon + ".png"} alt="Today" />;
        }
        else if (this.props.data.plantId && this.props.column.colDef.headerName === "Tomorrow") {
            renderImage = <img src={"http://openweathermap.org/img/w/" + this.props.data.tmwicon + ".png"} alt="Tomorrow" />;
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
                        pathname: "/hubDisplayPlant",//?index=" + this.props.data.hubId,
                        index: this.props.data.hubId,
                        hubData: this.props.data,
                    }} title={this.props.data.hubName}>
                    {this.props.data.hubName}
                </Link>
            </div>);
    }
}


class GirdDisplay extends Component {
    constructor(props) {
        super(props);

        this.state = {
            plants: this.props.allPlants?this.props.allPlants : [],
            total: this.props.total?this.props.total : [],
            getRowHeight: function(params) {
                return 40
              }
        }
        
    }
//  onGridReady = params => {
//     this.gridApi = params.api;
//     this.gridColumnApi = params.columnApi;

//     const allPlants = data => {
//       var differentHeights = [10];
//       data.forEach(function(dataItem, index) {
//         dataItem.rowHeight = differentHeights[index % 4];
//       });
//       this.setState({ rowData: data });
//     };

// }
    componentDidMount() {
        //this.props.getForcastWeatherInfo();
        // document.title = 'Plant Fault Data';
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ plants: nextProps.allPlants, total: nextProps.total });
    }
    createColumnDefs() {
        var pageName = this.props.pageName === 'HubDashboard' ? '' : 'Plant Name'
        return [
            {
                headerName: "Sr No", field:'sr_no' , ockPosition: true, valueGetter: rowIndex, width: 50, cellClass: 'cell-wrap',
                autoHeight: true,
                 cellStyle: { 'white-space': 'normal' }
            },
            {   
                headerName: "HUB/Plant Name", field: "hubName", cellClass: 'cell-wrap',
                autoHeight: true, width: 130,
                cellRendererFramework: ActionCellRenderer,

                // cellRenderer: (params) => {
                //     var link = document.createElement('a');
                //     link.href = '#';
                //     link.innerText = params.value;
                //     link.addEventListener('click', (e) => {
                //         e.preventDefault();
                //         let hubData= params.data;
                //         this.getData(params.data);
                //     });
                //     return link;
                // }
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
                headerName: "Insolation (W/m²)", field: "insolation_wm2", cellClass: 'cell-wrap',
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
    pinnedTopRowData() {
        return [
            {
                sr_no:"N/A",
                plantName: this.state.total.plantName,
                plantDashboardStatus: "N/A",
                ppa_capacity_mw: this.state.total ?this.state.total.totalPPACapacity:0,
                insolation_wm2: this.state.total ?this.state.total.totalInsolation:0,
                tomorrow: "N/A",
                today: "N/A",
                previous_day_kwh: this.state.total ?this.state.total.totalPreviousDay:0,
                day_ahead_kwh: this.state.total ?this.state.total.totalDayAhead:0,
                eTillDate: this.state.total ? this.state.total.totalEnergyTillDate:0,
            },
        ]
    }
    render() {
        return (
            <div>
                <span className="darkBlueFont txtSdw">Weather & Generation</span>
                <div style={{ padding: "2px", borderRadius: "5px", border: ' 2px solid #dedede' }}>
                    <div style={{ height: '525px' }} className="ag-theme-material dashboard-grid">
                        <AgGridReact
                            columnDefs={this.createColumnDefs()}
                            rowData={this.state.plants}
                            context={{ componentParent: this }}
                            onGridReady={this.props.onGridReady}
                            getRowHeight={this.state.getRowHeight}

                            // pinnedTopRowData={this.pinnedTopRowData()}
                            // pinnedTopRowData={this.pinnedTopRowDataForHub()}//this.props.pageName === "HubDashboard" && this.state.plants.length>0?
                            // this.pinnedTopRowDataForHub() : this.pinnedTopRowData()}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default GirdDisplay;