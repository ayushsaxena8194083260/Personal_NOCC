import React, { Component } from 'react';
import {AgGridReact} from "ag-grid-react";
import { string } from 'prop-types';
import queryString from 'query-string';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {getInverterDailyDetails1} from "../../actions/missingInverterActions";
import { Card } from 'react-bootstrap';

const rowIndex = (params) => params.node.rowIndex + 1;

class MissingInverterDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            missingInverter: this.props.location.missingInverterDetailsData,
            missingInverterDetails : null
        }
        console.log(this.state, 'missingInverterDetails');
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.missingInverterDetails) {
            this.setState({ missingInverterDetails: nextProps.missingInverterDetails })
        }
        console.log(this.state, 'missingInverterDetails');
    }

    componentDidMount() {
        // document.title = 'Plant Fault Data';
        //const values = queryString.parse(this.props.location.search);
        const data = {
            "fromDate": this.state.missingInverter.date,
            "inverterId": this.state.missingInverter.inverterId,
            "plantId": this.state.missingInverter.plantId
        }
        this.props.getInverterDailyDetails1(data)
    }

    createColumnDefs() {
        return [
            {
                headerName: "Sr No.", ockPosition: true, valueGetter: rowIndex, cellClass: 'cell-wrap',
                autoHeight: true, width: 120, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Date", field: "inverterDate", cellClass: 'cell-wrap',
                autoHeight: true, width: 130, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Inverter Name", field: "inverterName", cellClass: 'cell-wrap',
                autoHeight: true, width: 140, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Time", field: "inverterTime", cellClass: 'cell-wrap',
                autoHeight: true, width: 120, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Energy Today", field: "energyToday", cellClass: 'cell-wrap',
                autoHeight: true, width: 140, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "DC Current", field: "dcCurrent", cellClass: 'cell-wrap',
                autoHeight: true, width: 140, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Ac Real Power", field: "acPower", cellClass: 'cell-wrap',
                autoHeight: true, width: 140, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Dc Power", field: "dcPower", cellClass: 'cell-wrap',
                autoHeight: true, width: 140, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Energy Total", field: "eTotalKwh", cellClass: 'cell-wrap',
                autoHeight: true, width: 140, cellStyle: { 'white-space': 'normal' }
            }

        ];
    }
    onGridReady() {

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
            <Card style={{ maxWidth: "1264px", margin: "auto" }}>
            <Card.Body>
            <div
                style={{
                    height: '500px',
                    maxWidth: "1222px",
                    margin: "auto"
                }}
                className="ag-theme-material">
                <AgGridReact
                    columnDefs={this.createColumnDefs()}
                    rowData={this.state.missingInverterDetails}
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
        //missingInverter: state.missingInverterReducer.missingInverter,
        missingInverterDetails: state.missingInverterReducer.missingInverterDetails
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        //getInverterDailyDetails: (data) => dispatch(getInverterDailyDetails(data)),
        getInverterDailyDetails1: (data) => dispatch(getInverterDailyDetails1(data))
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MissingInverterDetails));