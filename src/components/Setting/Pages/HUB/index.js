
import React, { Component } from "react";
import { Link, withRouter, Route } from 'react-router-dom';
import { renderHubMasterDetails, deleteHubMaster } from '../../../../actions/action-Settings';
import { connect } from 'react-redux';
import {AgGridReact} from "ag-grid-react";
import ModelPopUp from '../../../Common/ModelPopUp';

const rowIndex = (params) => params.node.rowIndex + 1;

class ActionCellRenderer extends React.Component {
    constructor(props) {
        super(props);
        this.invokeDelete = this.invokeDelete.bind(this);
        this.invokeActive = this.invokeActive.bind(this);
    }

    invokeDelete() {
        this.props.context.componentParent.onDelete(this.props.node.data.hubId);
    }
    invokeActive() {
        this.props.context.componentParent.onActive(this.props.node.data._id);
    }
    render() {
        const isActive = this.props.data &&this.props.data.isPublished == "0"? true : false; 
        return (<div className="products-actions">   
         <Link to="#" title="IsActive" >
             <img src={isActive? "/images/icons/fugue/status.png": "/images/icons/fugue/status-offline.png"} alt={isActive? "Active User":"Inactive User"} />
        </Link>        
                     
            <Link className="products-actions-link"
                to={{
                    pathname: "/setting/addEditHub",
                    hub: this.props.data
                }}>
                <img src="/images/editIcon.png" alt="Edit" />
            </Link>
            <Link to="#" onClick={this.invokeDelete} title="Delete" >
                <img src="/images/cross-circle.png" alt="Delete" />
            </Link>
            <Link className="products-actions-link"
                to={{
                    pathname: "/setting/hubUsersMapping/",
                    hubData: this.props.data
                }}>
                <img src="/images/icons/fugue/plus-circle-blue.png" alt="Add User" />
            </Link>
        </div>);
    }
}

class HubDetailsComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hubs: [],
            showPopUp: false,
            popUpName: null,
            deleteID: null,
        }
    }
    componentDidMount() {
        // document.title = 'Plant Fault Data';
        this.props.renderHubMasterDetails();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ hubs: nextProps.hubs });
    }

    createColumnDefs() {
        return [
            {
                headerName: "Sr No", ockPosition: true, valueGetter: rowIndex, width:80,cellClass: 'cell-wrap',
                autoHeight: true, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Hub Name", field: "hubName", cellClass: 'cell-wrap',
                autoHeight: true, width: 400, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Description", field: "hubDescription", cellClass: 'cell-wrap',
                autoHeight: true, width: 400, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Latitude", field: "latitude", cellClass: 'cell-wrap',
                autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Longitude", field: "longitude", cellClass: 'cell-wrap',
                autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
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
            this.props.deleteHubMaster(this.state.deleteID);
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
                                <button type="button" className="btn btn-primary" style={{ width: "10%" }} onClick={() => { history.push('/setting/addEditHub') }}>
                                    <img src="/images/icons/fugue/plus-circle.png" alt="Add User" title="Add User" style={{ float: "left", marginRight: "3" }} />
                                    Add Hub
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
                    rowData={this.state.hubs}
                    context={{ componentParent: this }}
                    onGridReady={this.onGridReady}>                   

                </AgGridReact></div>
                <ModelPopUp title="Delete"
                            id={"hubDelete"}
                            bodyContent="Are you sure want to delete this Hub Delete?"
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

        hubs: state.SettingsReducer.hubs,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        renderHubMasterDetails: () => dispatch(renderHubMasterDetails()),
        deleteHubMaster: (id) => dispatch(deleteHubMaster(id))
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HubDetailsComponent));


