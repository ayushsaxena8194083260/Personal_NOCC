
import React, { Component } from "react";
import { Link, withRouter, Route } from 'react-router-dom';
import { renderProjectDetails, deleteProject } from '../../../../actions/action-Settings';
import { connect } from 'react-redux';
import {AgGridReact} from "ag-grid-react"
import ModelPopUp from '../../../Common/ModelPopUp';

const rowIndex = (params) => params.node.rowIndex + 1;

class ActionCellRenderer extends React.Component {
    constructor(props) {
        super(props);
        this.invokeDelete = this.invokeDelete.bind(this);
        //this.invokeActive = this.invokeActive.bind(this);

    }

    invokeDelete() {
        this.props.context.componentParent.onDelete(this.props.node.data.projectId);
    }
    render() {
        const isActive = this.props.data &&this.props.data.status == "0"? true : false;
        return (<div className="products-actions">
         <Link to="#" title="IsActive" >
             <img src={isActive? "/images/icons/fugue/status.png": "/images/icons/fugue/status-offline.png"} alt={isActive? "Active User":"Inactive User"} />
        </Link>
            <Link className="products-actions-link"
                to={{
                    pathname: "/setting/addEditProject",
                    project: this.props.data
                }}>
                <img src="/images/editIcon.png" alt="Edit" />
            </Link>
            <Link to="#" onClick={this.invokeDelete} title="Delete" >
                <img src="/images/cross-circle.png" alt="Delete" />
            </Link>

        </div>);
    }
}

class ProjectsComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            projects: this.props.projects,
            selectedRowId: null,
            showPopUp: false,
            deleteID: null,
        }
    }
    componentDidMount() {
        // document.title = 'Plant Fault Data';
        this.props.renderProjectDetails();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ projects: nextProps.projects });
    }

    createColumnDefs() {
        return [
            {
                headerName: "Sr No", ockPosition: true, valueGetter: rowIndex, width:80,cellClass: 'cell-wrap',
                autoHeight: true, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Project Name", field: "projectName", cellClass: 'cell-wrap',
                autoHeight: true, width: 500, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Description", field: "description", cellClass: 'cell-wrap',
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
    onDelete(_id) {
        this.setState({ deleteModalShow: true, deleteID: _id });

    }

    onHide() {
        this.setState({ deleteModalShow: false, deleteID: null });
    }

    deleteRecord() {
        if (this.state.deleteID !== null) {
            this.props.deleteProject(this.state.deleteID);
            this.onHide();
        }
    }


    render() {
        return (
            <div>
                <section className="top-filter">
                    <div id="filter-table">
                        <div valign="middle" style={{ textAlign: "right" }}>
                            <Route render={({ history }) => (
                                <button type="button" className="btn btn-primary" style={{ width: "10%" }} onClick={() => { history.push('/setting/addEditProject') }}>
                                    <img src="/images/icons/fugue/plus-circle.png" alt="Add User" title="Add User" style={{ float: "left", marginRight: "3" }} />
                                    Add Project
                                                                        </button>)} />
                        </div>
                    </div>
                </section>
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
                        rowData={this.state.projects}
                        context={{ componentParent: this }}
                        onGridReady={this.onGridReady}>

                    </AgGridReact></div>
                    <ModelPopUp title="Delete"
                            id={"hubDelete"}
                            bodyContent="Are you sure want to delete this Project Delete?"
                            showPopUp={this.state.deleteModalShow}
                            secondaryBtnName="No"
                            onSecondaryAction={this.onHide.bind(this)}
                            primaryBtnName="Delete"
                            onPrimaryAction={this.deleteRecord.bind(this)}
                        />
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {

        projects: state.SettingsReducer.projects,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        renderProjectDetails: () => dispatch(renderProjectDetails()),
        deleteProject: (id) => dispatch(deleteProject(id))
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProjectsComponent));
