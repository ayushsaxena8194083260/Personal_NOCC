
import React, { Component } from "react";
import { Link, withRouter } from 'react-router-dom';
import { renderMobileSettingDetails } from '../../../../actions/action-Settings';
import { connect } from 'react-redux';
import {AgGridReact} from "ag-grid-react"
import Alert from 'react-bootstrap/Alert';

const rowIndex = (params) => params.node.rowIndex + 1;

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
            <Link className="products-actions-link"
                to={{
                    pathname: "/setting/AddEditMobileSetting",
                    mobileSetting: this.props.data
                }}>
                <img src="/images/editIcon.png" alt="Edit" />
            </Link>
        </div>);
    }
}

class MobileSettingComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mobileSettings: this.props.mobileSettings
        }
    }
    componentDidMount() {
        // document.title = 'Plant Fault Data';
        this.props.renderMobileSettingDetails();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ mobileSettings: nextProps.mobileSettings });
    }

    createColumnDefs() {
        return [
            {
                headerName: "Sr No", ockPosition: true, valueGetter: rowIndex, width:80,cellClass: 'cell-wrap',
                autoHeight: true, cellStyle: { 'white-space': 'normal' }
            },            
            {
                headerName: "Description", field: "description", cellClass: 'cell-wrap',
                autoHeight: true, width: 500, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Value", field: "value", cellClass: 'cell-wrap',
                autoHeight: true, width: 500, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Action",
                field: '',
                cellRendererFramework: ActionCellRenderer,
                width: 130,
            }
        ];
    }

    render() {
        return (
            <div
                style={{
                    height: '500px',
                    maxWidth: "1222px",
                    margin: "auto"
                }}
                className="ag-theme-material">
                                        <div>
                            {this.props.displayMessage ? <Alert className="message success" variant="success" style={{ marginTop: "15px" }}>{this.props.displayMessage}</Alert> : null}
                        </div>

                <AgGridReact
                    key="grid"
                    columnDefs={this.createColumnDefs()}
                    rowData={this.state.mobileSettings}
                    context={{ componentParent: this }}
                    onGridReady={this.onGridReady}>                   

                </AgGridReact></div>
        )
    }
}
const mapStateToProps = state => {
    return {
        mobileSettings: state.SettingsReducer.mobileSettings,
        displayMessage: state.SettingsReducer.displayMessage,

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        renderMobileSettingDetails: () => dispatch(renderMobileSettingDetails())
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MobileSettingComponent));

