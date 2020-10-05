
import React, { Component } from "react";
import { Link, withRouter } from 'react-router-dom';
import { getErrorCodesSettings } from '../../../../actions/action-Settings';
import { connect } from 'react-redux';
import {AgGridReact} from "ag-grid-react";
import { Route } from 'react-router-dom';
import Col from 'react-bootstrap/Col';

const rowIndex = (params) => params.node.rowIndex + 1;

class ErrorCodeComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            errorCodes: []
        }
    }
    componentDidMount() {
        // document.title = 'Plant Fault Data';
        this.props.getErrorCodesSettings('1');
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps!=null){
        for(var i=0;i<nextProps.errorCodes.length;i++){
            if(nextProps.errorCodes[i].vendorId===0){
                nextProps.errorCodes[i].vendorId = 'NA';
            }
            if(nextProps.errorCodes[i].isPublished === 1){
                nextProps.errorCodes[i]['status'] = 'Enabled';
            }
        }

        this.setState({ errorCodes: nextProps.errorCodes });
    }
    }

    createColumnDefs() {
        return [
            {
                headerName: "Sr No", lockPosition: true, valueGetter: rowIndex, width:100,cellClass: 'cell-wrap',
                autoHeight: true,cellStyle: { 'white-space': 'normal' },sortable: true
            },
            {
                headerName: "Error Code", field: "errorCode", cellClass: 'cell-wrap',
                autoHeight: true, width: 400, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Description", field: "errorCodeDesc", cellClass: 'cell-wrap',
                autoHeight: true, width: 400, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Vendor", field: "vendorId", cellClass: 'cell-wrap',
                autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "HelpTopic Id", field: "helptopicId", cellClass: 'cell-wrap',
                autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Status", field: "status", cellClass: 'cell-wrap',
                autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
            },
        ];
    }

    render() {
        return (
            <div>
                <div className="top-filter">
                    <div className="row" style={{ flexDirection: "row-reverse", margin: "0" }} >
                    <Col xs={2} style={{ maxWidth: "15%" }}>
                            <Route render={({ history }) => (
                                <button type="button" className="btn btn-primary" style={{ width: "100%" }} onClick={() => { history.push('/addErrorCode') }}>
                                    <img src="/images/icons/fugue/plus-circle.png" alt="add plant" title="Add Tilt Schedule" style={{ float: "left", marginRight: "3" }} />
                                    Add Error Code
                        </button>)} />
                        </Col>
                        
                    </div>
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
                    rowData={this.state.errorCodes}
                    context={{ componentParent: this }}
                    onGridReady={this.onGridReady}>                   

                </AgGridReact></div>
                </div>
        )
    }
}
const mapStateToProps = state => {
    return {

        errorCodes: state.SettingsReducer.errorCodes,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getErrorCodesSettings: (isPublished) => dispatch(getErrorCodesSettings(isPublished))
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ErrorCodeComponent));

