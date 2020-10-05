import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import {AgGridReact} from "ag-grid-react"
import { renderAllRoleDetails } from '../../../../../actions/action-Settings';
import { connect } from 'react-redux';

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
        const isActive = this.props.data && this.props.data.isActive === "true" ? true : false;
        return (<div className="products-actions">
            <Link className="products-actions-link"
                to={{
                    pathname: "/setting/AddEditUserRole",
                    plantFault: this.props.data
                }}>
                <img src="/images/editIcon.png" alt="Edit" />
            </Link>

        </div>);
    }
}

class RoleComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userRoles: this.props.userRoles
        }
    }
    componentDidMount() {
        // document.title = 'Plant Fault Data';
        this.props.renderAllRoleDetails();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ userRoles: nextProps.userRoles , ayush:"ayush"});
        console.log(nextProps)
        // debugger
    }

    createColumnDefs() {
        return [
            {
                headerName: "Sr No", ockPosition: true, valueGetter: rowIndex, width:80,cellClass: 'cell-wrap',
                autoHeight: true,  cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Role Name", field: "roleName", cellClass: 'cell-wrap',
                autoHeight: true, width: 500, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Default Landing Page", field: "defaultLanding", cellClass: 'cell-wrap',
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
                <AgGridReact
                    key="grid"
                    columnDefs={this.createColumnDefs()}
                    rowData={this.state.userRoles}
                    context={{ componentParent: this }}
                    onGridReady={this.onGridReady}>

                </AgGridReact></div>
        )
    }
}
const mapStateToProps = state => {
    return {

        userRoles: state.SettingsReducer.userRoles,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        renderAllRoleDetails: () => dispatch(renderAllRoleDetails())
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RoleComponent));


