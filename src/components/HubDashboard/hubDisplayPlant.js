import { connect } from 'react-redux';
import React, { Component } from 'react';
import { AgGridReact } from "ag-grid-react";
import { getHubDashboardInfo } from '../../actions/action-HubDashboard';

const rowIndex = (params) => params.node.rowIndex + 1;

// const ppaCap = (params) => this.getPPA(params.node.data);

class StatusCellRenderer extends React.Component {
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


class HubPlantDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            plants: props.location.hubData?props.location.hubData.hubPlantDOList : [],
            total: props.location.hubData?props.location.hubData : []
        }
    }

    getPPA(ppaValue) {
        let value = 0;
        if (!parseFloat(ppaValue)) {
            return 0;
        } else {
            value = (ppaValue / 1000);
            return value.toFixed(2)
        }
    }

    componentDidMount() {
        // this.props.getHubDashboardInfo();
        // this.state.plants && this.state.plants.length > 0  && this.state.plants.map((item, index) => {
        //     this.setState(this.state.plants[index].ppaCapacity=this.getPPA(item.ppaCapacity))
        // })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ plants: nextProps.allPlants, total: nextProps.total });
    }
    createColumnDefs() {
        return [
            {
                headerName: "Sr No", field:'sr_no' , ockPosition: true, valueGetter: rowIndex, width: 50, cellClass: 'cell-wrap',
                autoHeight: true, cellStyle: { 'white-space': 'normal' }
            },
            {   
                headerName: "HUB/Plant Name", field: "plantname", cellClass: 'cell-wrap',
                autoHeight: true, width: 130, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Status", field: "plantDashboardStatus", cellClass: 'cell-wrap',
                cellRendererFramework: StatusCellRenderer,
                autoHeight: true, width: 50, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "PPA Capacity (MW)", field: "ppaCapacity", cellClass: 'cell-wrap',
                autoHeight: true, width: 63, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Insolation (W/m²)", field: "invToday", cellClass: 'cell-wrap',
                autoHeight: true, width: 69, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Today", field: "today", cellClass: 'cell-wrap',
                cellRendererFramework: StatusCellRenderer,
                autoHeight: true, width: 55, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Tomorrow", field: "tomorrow", cellClass: 'cell-wrap',
                cellRendererFramework: StatusCellRenderer,
                autoHeight: true, width: 68, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Previous Day(kwh)", field: "previousDayActualGen", cellClass: 'cell-wrap',
                autoHeight: true, width: 65, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Day-Ahead(kwh)", field: "actualGen", cellClass: 'cell-wrap',
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
                sr_no:null,
                plantname: this.state.total.hubName,
                plantDashboardStatus: "N/A",
                ppaCapacity: this.state.total ?this.state.total.ppa_capacity_mw:0,
                invToday: this.state.total ?this.state.total.insolation_wm2:0,
                today: "N/A",
                tomorrow: "N/A",
                previousDayActualGen: this.state.total ?this.state.total.previous_day_kwh:0,
                actualGen: this.state.total ?this.state.total.day_ahead_kwh:0,
                eTillDate: this.state.total ? this.state.total.eTillDate:0,
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
                            pinnedTopRowData={this.pinnedTopRowData()}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        // plants: data["plantList"],
        onGridReady: true,
        weatherinfo: state.DashboardReducer.allPlantsWeather,
        allPlants: state.DashboardReducer.plants,
        total: state.DashboardReducer.allPlants,
        pageName: "HubDashboard"

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getHubDashboardInfo: () => dispatch(getHubDashboardInfo())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HubPlantDetails);
// export default HubPlantDetails;