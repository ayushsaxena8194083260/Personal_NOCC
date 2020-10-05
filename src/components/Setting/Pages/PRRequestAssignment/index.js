import React, { Component } from "react";
import { Link, withRouter } from 'react-router-dom';
import { renderPRRequestDetails, deletePRRequest } from '../../../../actions/action-Settings';
import { connect } from 'react-redux';
import {AgGridReact} from "ag-grid-react"
import ModelPopUp from '../../../Common/ModelPopUp';
import Alert from 'react-bootstrap/Alert';

const rowIndex = (params) => params.node.rowIndex + 1;

class ActionCellRenderer extends React.Component {
    constructor(props) {
        super(props);
        this.invokeDelete = this.invokeDelete.bind(this);
    }

    invokeDelete() {
        this.props.context.componentParent.onDelete(this.props.node.data.prApprovalAuthorityId);
    }
    render() {
        return (<div className="products-actions">
            <Link to="#" onClick={this.invokeDelete} title="Delete" >
                <img src="/images/cross-circle.png" alt="Delete" />
            </Link>
            <Link className="products-actions-link"
                to={{
                    pathname: "/setting/addEditUser",
                    user: this.props.data
                }}>
                <img src="/images/editIcon.png" alt="Edit" />
            </Link>
        </div>);
    }
}
class PRUserManagementComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            prAssignment: this.props.prAssignment,
            showPopUp: false,
            deleteID: null,
            deleteModalShow: false
        }
    }
    componentDidMount() {
        // document.title = 'Plant Fault Data';
        this.props.renderPRRequestDetails();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ prAssignment: nextProps.prAssignment });
    }

    createColumnDefs() {
        return [
            {
                headerName: "Sr No", ockPosition: true, valueGetter: rowIndex, width: 80, cellClass: 'cell-wrap',
                autoHeight: true, width: 70, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Plant Name", field: "plantName", cellClass: 'cell-wrap',
                autoHeight: true, width: 300, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Name", field: "username", cellClass: 'cell-wrap',
                autoHeight: true, width: 300, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Status", field: "status", cellClass: 'cell-wrap',
                autoHeight: true, width: 300, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Action",
                field: '',
                cellRendererFramework: ActionCellRenderer,
                width: 130,
            }
        ];
    }

    onDelete(_id) {
        this.setState({ deleteModalShow: true, deleteID: _id });

    }

    onHide() {
        this.setState({ deleteModalShow: false, deleteID: null });
    }

    deleteRecord() {
        if (this.state.deleteID !== null) {
            this.props.deletePRRequest(this.state.deleteID);
            this.onHide();
        }
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
                    rowData={this.state.prAssignment}
                    context={{ componentParent: this }}
                    onGridReady={this.onGridReady}>

                </AgGridReact>
                <div>
                <ModelPopUp title="Delete"
                            id={"prAssignmentDelete"}
                            bodyContent="Are you sure want to delete this PR Request Assignment?"
                            showPopUp={this.state.deleteModalShow}
                            secondaryBtnName="No"
                            onSecondaryAction={this.onHide.bind(this)}
                            primaryBtnName="Delete"
                            onPrimaryAction={this.deleteRecord.bind(this)}
                        />
                    
                    </div></div>
        )
    }
}

const mapStateToProps = state => {
    return {

        prAssignment: state.SettingsReducer.prAssignment,
        displayMessage: state.SettingsReducer.displayMessage,

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        renderPRRequestDetails: () => dispatch(renderPRRequestDetails()),
        deletePRRequest: (id) => dispatch(deletePRRequest(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PRUserManagementComponent);
