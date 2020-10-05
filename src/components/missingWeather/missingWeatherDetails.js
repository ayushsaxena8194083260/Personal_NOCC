import React, {Component} from 'react';
import {AgGridReact} from "ag-grid-react";
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import queryString from 'query-string';
import {getWeatherDailyDetails1} from "../../actions/missingWeatherActions";
import { Card } from 'react-bootstrap';

const rowIndex = (params) => params.node.rowIndex + 1;

class MissingWeatherDetails extends Component{ 
    constructor(props) {
        super(props);
        this.state={
            weatherStation:this.props.location.missingWeatherDetailsData,
            weatherStationDetails: null
    }

}

componentWillReceiveProps(nextProps) {
    if (nextProps.weatherStationDetails) {
        this.setState({ weatherStationDetails: nextProps.weatherStationDetails })
    }
}

componentDidMount() {
    // document.title = 'Plant Fault Data';
    //const values = queryString.parse(this.props.location.search);
    const data = {
        "fromDate": this.state.weatherStation.date,
        "weatherStationId": this.state.weatherStation.weatherStationId,
        "plantId": this.state.weatherStation.plantId
    }
    this.props.getWeatherDailyDetails1(data)
}


createColumnDefs() {
    return [
        {
            headerName: "Sr No.", ockPosition: true, valueGetter: rowIndex, cellClass: 'cell-wrap',
            autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
        },
        {
            headerName: "Date", field: "date", cellClass: 'cell-wrap',
            autoHeight: true, width: 120, cellStyle: { 'white-space': 'normal' }
        },
        {
            headerName: "Weather Station", field: "weatherStationName", cellClass: 'cell-wrap',
            autoHeight: true, width: 140, cellStyle: { 'white-space': 'normal' }
        },
        {
            headerName: "Time", field: "insolationTime", cellClass: 'cell-wrap',
            autoHeight: true, width: 130, cellStyle: { 'white-space': 'normal' }
        },
        {
            headerName: "Tilt Irradiation", field: "insolation", cellClass: 'cell-wrap',
            autoHeight: true, width: 140, cellStyle: { 'white-space': 'normal' }
        },
        {
            headerName: "Ambient Temp", field: "ambientTempWh", cellClass: 'cell-wrap',
            autoHeight: true, width: 140, cellStyle: { 'white-space': 'normal' }
        },
        {
            headerName: "Module Temp", field: "moduleTempWh", cellClass: 'cell-wrap',
            autoHeight: true, width: 140, cellStyle: { 'white-space': 'normal' }
        },
        {
            headerName: "Wind Speed", field: "windSpeed24", cellClass: 'cell-wrap',
            autoHeight: true, width: 140, cellStyle: { 'white-space': 'normal' }
        },
        {
            headerName: "Horizontal Irradiation", field: "horizontalInsolation", cellClass: 'cell-wrap',
            autoHeight: true, width: 150, cellStyle: { 'white-space': 'normal' }
        }
       
    ];
}
onGridReady(){
    
}

render(){
    return(
        <Card style={{ maxWidth: "1264px", margin: "auto" }}>
            <Card.Body>
        <div
        style={{
               height: '500px',
               maxWidth:"1222px",
               margin:"auto"
           }}
       className="ag-theme-material">
       <AgGridReact
           columnDefs={this.createColumnDefs()}
           rowData={this.state.weatherStationDetails}
           context={{ componentParent: this }}
           onGridReady={this.onGridReady}>
       </AgGridReact>
       
   </div>
   </Card.Body>
   </Card>

    )
}
}
const mapStateToProps = (state, props) => {
    return {
        //weatherStation: state.missingWeatherReducer.weatherStation,
        weatherStationDetails: state.missingWeatherReducer.weatherStationDetails
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        //getWeatherDailyDetails: (data) => dispatch(getWeatherDailyDetails(data)),
        getWeatherDailyDetails1: (data) => dispatch(getWeatherDailyDetails1(data))
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MissingWeatherDetails));